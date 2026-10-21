import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

const src = process.argv[2];
const out = path.resolve(process.argv[3] ?? 'public');

if (!src) {
  console.error('Usage: node scripts/apply-brand-icon.mjs <source> [outDir]');
  process.exit(1);
}

spawnSync(process.execPath, ['scripts/make-favicon.mjs', src, out], { stdio: 'inherit' });

async function png(size) {
  return sharp(src)
    .resize(size, size, { fit: 'cover', position: 'centre' })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

for (const [name, size] of [
  ['favicon-48.png', 48],
  ['favicon-192.png', 192],
]) {
  const buf = await png(size);
  fs.writeFileSync(path.join(out, name), buf);
  console.log('wrote', name, buf.length);
}

const logoBuf = await png(128);
const b64 = logoBuf.toString('base64');
const svg = [
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="War Thunder Hack">',
  `  <image href="data:image/png;base64,${b64}" width="128" height="128" />`,
  '</svg>',
  '',
].join('\n');
fs.writeFileSync(path.join(out, 'logo.svg'), svg);
console.log('wrote logo.svg', svg.length);
