import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { resolvePathRedirect } from './redirects.mjs';
import { resolveCheckoutPathRedirect } from '../src/config/checkout-redirects.mjs';

const CANONICAL_HOST = 'warthunderhack.org';
const distDir = path.resolve('dist');
const port = Number(process.env.PORT) || 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
};

const COMPRESSIBLE = new Set([
  '.html',
  '.css',
  '.js',
  '.mjs',
  '.json',
  '.svg',
  '.xml',
  '.txt',
  '.webmanifest',
]);

if (!fs.existsSync(distDir)) {
  console.error('Missing dist/ folder. Run npm run build before starting the server.');
  process.exit(1);
}

function getRequestHost(req) {
  const raw = req.headers['x-forwarded-host'] ?? req.headers.host ?? '';
  return raw.split(',')[0].trim().split(':')[0].toLowerCase();
}

function getCanonicalRedirect(req) {
  const host = getRequestHost(req);
  if (host !== CANONICAL_HOST && host !== `www.${CANONICAL_HOST}`) {
    return null;
  }

  const forwardedProto = (req.headers['x-forwarded-proto'] ?? '').split(',')[0].trim().toLowerCase();
  const needsHttps = forwardedProto === 'http';
  const needsWwwStrip = host === `www.${CANONICAL_HOST}`;

  if (needsWwwStrip || needsHttps) {
    return `https://${CANONICAL_HOST}${req.url ?? '/'}`;
  }

  return null;
}

function splitUrl(url) {
  const [pathPart, hash = ''] = (url ?? '/').split('#');
  const [pathname, search = ''] = pathPart.split('?');
  const query = search ? `?${search}` : '';
  const fragment = hash ? `#${hash}` : '';
  return { pathname: pathname || '/', query, fragment };
}

/** Keep resolved paths under dist/ (Linux path.join drops the base if a segment is absolute). */
function isInsideDist(filePath) {
  const resolved = path.resolve(filePath);
  const root = path.resolve(distDir);
  return resolved === root || resolved.startsWith(root + path.sep);
}

function existingFile(filePath) {
  if (!isInsideDist(filePath)) return null;
  try {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) return filePath;
  } catch {
    return null;
  }
  return null;
}

/**
 * Map URL pathname → file under dist/.
 * Critical: never pass a leading "/" into path.join/resolve as a second arg on Linux.
 */
function resolveFile(pathname) {
  let normalized = decodeURIComponent(pathname || '/');
  if (!normalized.startsWith('/')) normalized = `/${normalized}`;

  // Strip leading slash so joins stay inside distDir on Linux.
  const rel = normalized.slice(1);

  // Exact static assets: /sitemap.xml, /robots.txt, /favicon.ico, /_astro/..., /images/...
  if (rel && path.extname(rel) && !rel.endsWith('/')) {
    const exact = existingFile(path.resolve(distDir, rel));
    if (exact) return exact;
  }

  // Directory indexes: / → index.html, /about/ → about/index.html
  const dirRel = rel.replace(/\/+$/, '');
  const indexFile = existingFile(path.resolve(distDir, dirRel, 'index.html'));
  if (indexFile) return indexFile;

  // Rare flat HTML fallback: /about → about.html
  if (dirRel && !path.extname(dirRel)) {
    const flat = existingFile(path.resolve(distDir, `${dirRel}.html`));
    if (flat) return flat;
  }

  return null;
}

function getCacheControl(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const basename = path.basename(filePath);

  if (/_\w{6,}\./.test(basename) || basename.startsWith('_astro/')) {
    return 'public, max-age=31536000, immutable';
  }

  if (['.webp', '.png', '.jpg', '.jpeg', '.svg', '.ico', '.woff2'].includes(ext)) {
    return 'public, max-age=31536000, immutable';
  }

  if (['.js', '.css'].includes(ext)) {
    return 'public, max-age=31536000, immutable';
  }

  if (ext === '.html') {
    return 'public, max-age=3600, must-revalidate';
  }

  if (ext === '.webmanifest' || ext === '.xml') {
    return 'public, max-age=86400';
  }

  return 'public, max-age=86400';
}

function pickEncoding(acceptEncoding = '') {
  const ae = acceptEncoding.toLowerCase();
  if (ae.includes('br')) return 'br';
  if (ae.includes('gzip')) return 'gzip';
  return null;
}

function sendFile(req, res, filePath, statusCode = 200) {
  const ext = path.extname(filePath).toLowerCase();
  const headers = {
    'Content-Type': MIME[ext] ?? 'application/octet-stream',
    'Cache-Control': getCacheControl(filePath),
    Vary: 'Accept-Encoding',
    'X-Content-Type-Options': 'nosniff',
  };

  const encoding =
    COMPRESSIBLE.has(ext) && !res.getHeader?.('Content-Encoding')
      ? pickEncoding(req.headers['accept-encoding'] ?? '')
      : null;

  const stream = fs.createReadStream(filePath);
  stream.on('error', () => {
    if (!res.headersSent) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    }
    res.end('Not found');
  });

  if (encoding === 'br') {
    headers['Content-Encoding'] = 'br';
    res.writeHead(statusCode, headers);
    stream.pipe(zlib.createBrotliCompress()).pipe(res);
    return;
  }

  if (encoding === 'gzip') {
    headers['Content-Encoding'] = 'gzip';
    res.writeHead(statusCode, headers);
    stream.pipe(zlib.createGzip()).pipe(res);
    return;
  }

  res.writeHead(statusCode, headers);
  stream.pipe(res);
}

function handleRequest(req, res) {
  const canonicalRedirect = getCanonicalRedirect(req);
  if (canonicalRedirect) {
    res.writeHead(301, { Location: canonicalRedirect });
    res.end();
    return;
  }

  const { pathname, query, fragment } = splitUrl(req.url);
  const checkoutRedirect = resolveCheckoutPathRedirect(pathname);
  if (checkoutRedirect) {
    res.writeHead(302, { Location: checkoutRedirect });
    res.end();
    return;
  }

  const pathRedirect = resolvePathRedirect(pathname);
  if (pathRedirect) {
    res.writeHead(301, { Location: `${pathRedirect}${query}${fragment}` });
    res.end();
    return;
  }

  const filePath = resolveFile(pathname);
  if (filePath) {
    sendFile(req, res, filePath);
    return;
  }

  const fallback = path.resolve(distDir, '404.html');
  if (existingFile(fallback)) {
    sendFile(req, res, fallback, 404);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found');
}

const server = http.createServer((req, res) => {
  try {
    handleRequest(req, res);
  } catch (err) {
    console.error('request error', req.url, err);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    }
    res.end('Internal Server Error');
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Serving ${distDir} on http://0.0.0.0:${port} (gzip/br enabled)`);
  // Smoke-check critical SEO files so deploy logs show sitemap health.
  for (const p of ['/sitemap.xml', '/robots.txt', '/']) {
    const f = resolveFile(p);
    console.log(`  resolve ${p} → ${f ? path.relative(distDir, f) : 'MISSING'}`);
  }
});
