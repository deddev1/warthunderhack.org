/**
 * Copy user War Thunder cheat screenshots into public/images,
 * then write SEO-named PNGs for gameplay + blog with alt text.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const assetsDir =
  'C:\\Users\\3Tee System\\.cursor\\projects\\c-Users-3Tee-System-Downloads-warthunderhack-org-main\\assets';
const importDir = path.resolve('_import');
const gameplayDir = path.resolve('public/images/gameplay');
const blogDir = path.resolve('public/images/blog');

/** Prefer this upload order (matches the 11 screenshots provided). */
const SOURCE_ORDER = [
  'Screenshot_2026-10-21_042129', // air ESP dogfight
  'Screenshot_2026-10-21_042234', // tank optics blue box
  'Screenshot_2026-10-21_042114', // chams + ESP burning
  'Screenshot_2026-10-21_042319', // aimbot lock M2A4
  'Screenshot_2026-10-21_042055', // desert green chams
  'Screenshot_2026-10-21_042045', // tropical multi ESP
  'Screenshot_2026-10-21_042107', // trench full overlay
  'Screenshot_2026-10-21_042311', // red/yellow vehicle ESP
  'Screenshot_2026-10-21_042208', // trajectory + long-range ESP
  'Screenshot_2026-10-21_042422', // valley FOV aimbot
  'Screenshot_2026-10-21_042428', // air ground-target ESP
];

const GAMEPLAY = [
  {
    file: 'warthunder-esp-wallhack.png',
    alt: 'War Thunder air ESP wallhack cheat gameplay with enemy plane name tags, distances, and green aimbot reticle over an island coastline',
    caption: 'Air ESP wallhack',
    captionDesc: 'Enemy and ally plane tags with distances and aimbot reticle.',
  },
  {
    file: 'warthunder-aimbot-combat.png',
    alt: 'War Thunder tank gunner aimbot cheat with blue ESP bounding box, green crosshair lock, and distance marker on an enemy tank',
    caption: 'Tank aimbot',
    captionDesc: 'Gunner optics with ESP box and aimbot lock.',
  },
  {
    file: 'warthunder-vehicle-esp.png',
    alt: 'War Thunder vehicle ESP and chams cheat showing green boxes, purple highlights, and distance labels on enemy tanks through gunner sight',
    caption: 'Vehicle ESP / chams',
    captionDesc: 'ESP boxes and chams with model and distance labels.',
  },
  {
    file: 'warthunder-radar-hack.png',
    alt: 'War Thunder ESP wallhack with yellow bounding box, player name, tank model, health bar, and aimbot circles locked on a light tank',
    caption: 'ESP + aimbot lock',
    captionDesc: 'Name, model, HP bar and aimbot reticle on target.',
  },
  {
    file: 'warthunder-auto-aim.png',
    alt: 'War Thunder desert tank wallhack with bright green enemy silhouette, bounding box, and distance readout through gunner optics',
    caption: 'Wallhack silhouette',
    captionDesc: 'Green chams silhouette and range through cover.',
  },
  {
    file: 'warthunder-target-radar.png',
    alt: 'War Thunder multi-tank ESP cheat with green bounding boxes and distance markers on burning enemies in a tropical map',
    caption: 'Multi-target ESP',
    captionDesc: 'Several enemy tanks boxed with live distances.',
  },
  {
    file: 'warthunder-camo-unlocker.png',
    alt: 'War Thunder third-person tank cheat overlay with player list, green ESP boxes across the map, and large green aimbot reticle',
    caption: 'Full ESP overlay',
    captionDesc: 'Player list, map-wide ESP boxes and aimbot FOV.',
  },
  {
    file: 'warthunder-thermal-esp.png',
    alt: 'War Thunder tank ESP wallhack with red and yellow 3D boxes, player names, and meter distances highlighting enemies through terrain',
    caption: '3D box ESP',
    captionDesc: 'Colored 3D boxes with names and distances.',
  },
  {
    file: 'warthunder-ground-battle-esp.png',
    alt: 'War Thunder ground battle ESP with red target boxes, green aim lines, blue shell trajectory arc, and long-range distance tags',
    caption: 'Trajectory + ESP',
    captionDesc: 'Ballistic arc, aim lines and long-range ESP tags.',
  },
  {
    file: 'warthunder-arena-wallhack.png',
    alt: 'War Thunder valley tank aimbot with purple FOV circle, enemy name tags, tank models, and distance indicators through rocky terrain',
    caption: 'FOV aimbot',
    captionDesc: 'Purple FOV circle with name and model ESP tags.',
  },
  {
    file: 'warthunder-spawn-esp.png',
    alt: 'War Thunder aircraft ESP showing ground targets with Russian vehicle labels, distance markers, and purple aim circle over a forested map',
    caption: 'Air-to-ground ESP',
    captionDesc: 'Ground unit labels and distances from the air.',
  },
  {
    file: 'warthunder-long-range-esp.png',
    alt: 'War Thunder long-range tank ESP cheat with green bounding boxes, model names, and meter distances across an open battlefield',
    caption: 'Long-range ESP',
    captionDesc: 'Distant enemy boxes with model and range text.',
  },
  {
    file: 'warthunder-aimbot-lock.png',
    alt: 'War Thunder aimbot lock on enemy tank with green crosshair, ESP box, and crew distance readout in gunner sight',
    caption: 'Aimbot lock',
    captionDesc: 'Locked aimbot reticle with ESP box overlay.',
  },
  {
    file: 'warthunder-chams-esp.png',
    alt: 'War Thunder chams ESP cheat highlighting enemy tanks in bright green through hills with bounding boxes and distance labels',
    caption: 'Chams ESP',
    captionDesc: 'Bright chams through terrain with range labels.',
  },
  {
    file: 'warthunder-squad-esp.png',
    alt: 'War Thunder squad ESP wallhack showing multiple enemy tanks boxed in green with live distances during a tropical fight',
    caption: 'Squad ESP',
    captionDesc: 'Multiple enemy tanks tracked with ESP boxes.',
  },
  {
    file: 'warthunder-combat-esp.png',
    alt: 'War Thunder combat ESP and aimbot overlay with player list, green boxes on enemies, and FOV reticle during a live tank battle',
    caption: 'Combat ESP',
    captionDesc: 'Full combat overlay with list, boxes and FOV.',
  },
];

const BLOG = [
  'warthunder-cheat-codes-guide.png',
  'warthunder-console-cheats-tips.png',
  'how-to-use-warthunder-cheat-codes.png',
  'warthunder-cheats-features-guide.png',
  'warthunder-console-commands-cheats.png',
  'warthunder-lite-vs-pro.png',
  'warthunder-elite-tier-guide.png',
  'warthunder-aimbot-ranked-guide.png',
  'warthunder-esp-wallhack-setup.png',
  'warthunder-radar-hack-guide.png',
  'warthunder-camo-unlocker-guide.png',
  'gaijin-patch-day-checklist.png',
  'warthunder-hwid-spoofer-after-ban.png',
  'how-to-buy-warthunder-hack-2026.png',
  'warthunder-aimbot-combat-guide.png',
  'gaijin-bypass-warthunder-guide.png',
  'warthunder-external-cheat-guide.png',
  'warthunder-stream-proof-setup.png',
];

function longPath(p) {
  const resolved = path.resolve(p);
  if (resolved.startsWith('\\\\?\\')) return resolved;
  return `\\\\?\\${resolved}`;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function listAssetShots() {
  const entries = fs.readdirSync(longPath(assetsDir));
  const images = entries.filter((f) => /\.(png|jpe?g|webp)$/i.test(f) && f.includes('Screenshot'));

  const ordered = [];
  for (const key of SOURCE_ORDER) {
    const match = images.find((f) => f.includes(key));
    if (match) ordered.push(match);
  }

  // Any leftover screenshots not in the preferred order
  for (const f of images.sort()) {
    if (!ordered.includes(f)) ordered.push(f);
  }
  return ordered;
}

async function writeResizedPng(src, dest) {
  const buf = await sharp(src)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .png({ compressionLevel: 8 })
    .toBuffer();
  fs.writeFileSync(dest, buf);
  console.log('wrote', path.relative(process.cwd(), dest), buf.length);
}

ensureDir(importDir);
ensureDir(gameplayDir);
ensureDir(blogDir);

const sources = listAssetShots();
console.log(`Found ${sources.length} source screenshots`);

const shortFiles = [];
for (let i = 0; i < sources.length; i++) {
  const name = sources[i];
  const short = `shot-${String(i + 1).padStart(2, '0')}.png`;
  const from = longPath(path.join(assetsDir, name));
  const to = path.join(importDir, short);
  await writeResizedPng(from, to);
  shortFiles.push(to);
  console.log('imported', short, '←', name.slice(-50));
}

if (!shortFiles.length) {
  console.error('No screenshots copied.');
  process.exit(1);
}

const alts = [];
for (let i = 0; i < GAMEPLAY.length; i++) {
  const src = shortFiles[i % shortFiles.length];
  const dest = path.join(gameplayDir, GAMEPLAY[i].file);
  await writeResizedPng(src, dest);
  alts.push({
    file: GAMEPLAY[i].file,
    alt: GAMEPLAY[i].alt,
    caption: GAMEPLAY[i].caption,
    captionDesc: GAMEPLAY[i].captionDesc,
    srcIndex: i % shortFiles.length,
  });
}

for (let i = 0; i < BLOG.length; i++) {
  const src = shortFiles[(i + 2) % shortFiles.length];
  await writeResizedPng(src, path.join(blogDir, BLOG[i]));
}

fs.writeFileSync(
  path.join(process.cwd(), 'scripts', 'gameplay-image-alts.json'),
  JSON.stringify({ gameplay: alts, sourceCount: shortFiles.length }, null, 2),
);

// Emit TS-ready gallery snippet hints
console.log('Done. Next: npm run optimize:images');
console.log('Update src/data/products.ts gallery alt/caption from scripts/gameplay-image-alts.json');
