/**
 * Final Fortnite leftover cleanup for War Thunder Hack.
 * Run: node scripts/cleanup-fortnite-leftovers.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');
const SKIP = new Set(['node_modules', '.git', 'dist', '.seo-baseline']);
const SKIP_FILES = new Set([
  'rebrand-fortnite.mjs',
  'vocab-fortnite.mjs',
  'rebrand-warthunder.mjs',
  'vocab-warthunder.mjs',
  'fetch-fortnite-gameplay.mjs',
  'cleanup-fortnite-leftovers.mjs',
]);
const EXTS = new Set([
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

const REPL = [
  ['Zero Build', 'Realistic Battles'],
  ['zero build', 'realistic battles'],
  [' EAC ', ' Gaijin '],
  [' EAC,', ' Gaijin,'],
  [' EAC.', ' Gaijin.'],
  [' EAC-', ' Gaijin-'],
  ['EAC and', 'Gaijin and'],
  ['EAC modules', 'Gaijin modules'],
  ['EAC-proof', 'Gaijin-proof'],
  ['EAC-related', 'Gaijin-related'],
  ['EAC checklist', 'Gaijin checklist'],
  ['& EAC', '& Gaijin'],
  ['maintained for EAC', 'maintained for Gaijin'],
  ['game, EAC, or', 'game, Gaijin, or'],
  ['Epic Games', 'Steam / Gaijin'],
  ['See players through builds', 'See vehicles through terrain'],
  ['through walls and builds', 'through terrain and cover'],
  ['Player boxes, skeletons, HP and distance', 'Vehicle boxes, crew HP and distance'],
  ['when enemies push or go missing', 'when enemies flank or go hull-down'],
  ['storm edge and fights', 'capture points and fights'],
  ['Storm and POI markers', 'Cap point and airfield markers'],
  ['Find chests and loot', 'Spot ground targets and objectives'],
  [
    'Shows chests, floor loot and rare drops with distance so you can loot and leave faster.',
    'Highlights enemy vehicles, capture points and objectives with distance so you can rotate faster.',
  ],
  ['Chest and floor-ground target ESP', 'Vehicle and objective ESP'],
  ['Rare and mythic markers', 'Priority target markers'],
  ['Reboot van and supply drop hints', 'Airfield and spawn hints'],
  ['Loot / Chest ESP', 'Vehicle / Objective ESP'],
  ['Local outfit preview', 'Local camo preview'],
  ['Outfit, wrap and pickaxe preview', 'Camo, decal and vehicle skin preview'],
  ['ARs, SMGs, shotguns and snipers', 'cannons, MGs, ATGMs and aircraft guns'],
  ['Profiles for AR, SMG, shotgun and sniper', 'Profiles for ground, SPAA and air'],
  ['Weak-spot priority: head, chest or closest', 'Weak-spot priority: ammo, breech or closest'],
  ['Know where fights are', 'Know where enemies are'],
  ['chest ESP', 'vehicle ESP'],
  ['name = "warthunder-hack-com"', 'name = "warthunderhack-org"'],
  ['War Thunder Cheat Guides', 'War Thunder Hack Guides'],
  [
    'EAC Unable to Verify War Thunder — Cheat and Appeal Fixes',
    'Gaijin Unable to Verify War Thunder — Hack and Appeal Fixes',
  ],
  ['Test Drive islands reset fights forever', 'Test Drive sessions reset fights forever'],
  ['Ranked Arcade Battles needs', 'Ranked battles need'],
  ["Zero Build's fast pace", "Realistic Battles' pace"],
  ['manual heal timing', 'manual repair timing'],
  ['war thunder hack', 'War Thunder hack'],
  ['Shield Potion', 'Repair kit'],
  ['builds and edits', 'hull-down positions'],
  ['edit spam', 'hull traverse'],
  ['shotgun peek', 'hull-down peek'],
  ['Victory Royale', 'match victory'],
  ['hot drop', 'cap point rush'],
  ['Hot drop', 'Cap point rush'],
  ['zone rotations', 'flank routes'],
  ['Storm circle', 'capture zone'],
  ['storm circle', 'capture zone'],
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

let changed = 0;
for (const file of walk(root)) {
  if (!EXTS.has(path.extname(file).toLowerCase())) continue;
  if (SKIP_FILES.has(path.basename(file))) continue;
  let text = fs.readFileSync(file, 'utf8');
  const before = text;
  for (const [from, to] of REPL) {
    if (text.includes(from)) text = text.split(from).join(to);
  }
  if (text !== before) {
    fs.writeFileSync(file, text);
    changed++;
    console.log('updated', path.relative(root, file));
  }
}

console.log(`Done. Updated ${changed} files.`);
