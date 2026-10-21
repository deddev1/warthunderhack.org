/**
 * Second-pass vocabulary cleanup: Fortnite leftovers → War Thunder.
 * Run after rebrand-warthunder.mjs: node scripts/vocab-warthunder.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');
const TEXT_EXTS = new Set([
  '.ts',
  '.tsx',
  '.astro',
  '.mjs',
  '.js',
  '.json',
  '.md',
  '.txt',
  '.svg',
  '.html',
  '.webmanifest',
  '.css',
  '.toml',
]);
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.seo-baseline']);
const SKIP_FILES = new Set([
  'rebrand-fortnite.mjs',
  'vocab-fortnite.mjs',
  'rebrand-warthunder.mjs',
  'vocab-warthunder.mjs',
  'fetch-fortnite-gameplay.mjs',
]);

const REPLACEMENTS = [
  ['War Thunder online', 'War Thunder online'],
  ['Undetected War Thunder Cheats', 'Undetected War Thunder Hack'],
  ['Undetected War Thunder cheats', 'Undetected War Thunder hack'],
  ['Buy War Thunder cheats', 'Buy War Thunder hack'],
  ['buy War Thunder cheats', 'buy War Thunder hack'],
  ['War Thunder cheat modules', 'War Thunder hack modules'],
  ['War Thunder cheat suite', 'War Thunder hack suite'],
  ['War Thunder cheat guides', 'War Thunder hack guides'],
  ['War Thunder cheat menu', 'War Thunder hack menu'],
  ['War Thunder cheat tiers', 'War Thunder hack tiers'],
  ['War Thunder cheat,', 'War Thunder hack,'],
  ['War Thunder cheat.', 'War Thunder hack.'],
  ['War Thunder cheat ', 'War Thunder hack '],
  ['fortnite cheat', 'war thunder hack'],
  ['Fortnite cheat', 'War Thunder hack'],

  ['building fights', 'ground battles'],
  ['build fight', 'ground battle'],
  ['Build fight', 'Ground battle'],
  ['builds and edits', 'hull-down positions'],
  ['edit spam', 'hull traverse'],
  ['shotgun peek', 'hull-down peek'],
  ['hot drop', 'cap point rush'],
  ['Hot drop', 'Cap point rush'],
  ['zone rotations', 'flank routes'],
  ['third-party', 'third-party'],
  ['Storm circle', 'capture zone'],
  ['storm circle', 'capture zone'],
  ['Victory Royale', 'match victory'],
  ['outfits, wraps and pickaxes', 'camouflages, decals and vehicle skins'],
  ['outfits and wraps', 'camouflages and decals'],
  ['pickaxes', 'decals'],
  ['Bone priority', 'Weak-spot priority'],
  ['bone priority', 'weak-spot priority'],
  ['head / neck', 'ammo rack / breech'],
  ['Ranked Arena', 'Ranked Battles'],
  ['ranked Arena', 'ranked Battles'],

  ['Levo-aligned', 'War Thunder Hack'],
  ['Levo blue', 'War Thunder blue'],
  ['cheat-forward copy', 'War Thunder hack copy'],

  ['name = "fortnite-cheats-com"', 'name = "warthunderhack-org"'],
  ['# fortnite-cheats-com', '# warthunderhack.org'],
  ['# fortnite-cheats', '# warthunderhack'],
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function applyText(content) {
  let next = content;
  for (const [from, to] of REPLACEMENTS) {
    if (from === to) continue;
    if (next.includes(from)) next = next.split(from).join(to);
  }
  return next;
}

const files = walk(root).filter((f) => {
  if (!TEXT_EXTS.has(path.extname(f).toLowerCase())) return false;
  if (SKIP_FILES.has(path.basename(f))) return false;
  return true;
});

let changed = 0;
for (const file of files) {
  const before = fs.readFileSync(file, 'utf8');
  const after = applyText(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
    console.log('updated', path.relative(root, file));
  }
}

console.log(`Done. Updated ${changed} text files.`);
