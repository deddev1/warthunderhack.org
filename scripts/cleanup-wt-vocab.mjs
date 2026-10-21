/**
 * Deep War Thunder vocabulary pass for remaining Fortnite game terms.
 * Run: node scripts/cleanup-wt-vocab.mjs
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
  'cleanup-wt-vocab.mjs',
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
  ['loot assist', 'target assist'],
  ['Loot assist', 'Target assist'],
  ['Loot Assist', 'Target Assist'],
  ['Chest ESP & loot assist', 'Vehicle ESP & target assist'],
  ['Chest highlights, rare drops and Elite loot-assist pathing.', 'Vehicle highlights, priority targets and Elite target-assist pathing.'],
  ['Chest & loot locator', 'Vehicle & objective locator'],
  ['Chest & loot replacer', 'Camo & decal replacer'],
  ['chest and reboot-van locator', 'vehicle and spawn locator'],
  ['chest and reboot markers', 'vehicle and spawn markers'],
  ['chests and reboot vans', 'vehicles and spawns'],
  ['Mark chests and reboot vans', 'Mark vehicles and spawns'],
  ['chest locations and loot timings', 'enemy positions and objective timings'],
  ['chest locator, loot timers', 'vehicle locator, spawn timers'],
  ['chest locator and loot timers', 'vehicle locator and spawn timers'],
  ['chest markers, loot timers', 'vehicle markers, spawn timers'],
  ['Chest respawn timer', 'Spawn / cap timer'],
  ['chests, loot and POI camps', 'vehicles, objectives and airfields'],
  ['ESP, chests, loot', 'ESP, vehicles, objectives'],
  ['ESP, chest and loot information, and zoom', 'ESP, vehicle and objective information, and zoom'],
  ['vehicle ESP, chest and loot information, zoom', 'vehicle ESP, objective information, zoom'],
  ['chest and loot information', 'vehicle and objective information'],
  ['chest positions', 'spawn positions'],
  ['and chest positions', 'and spawn positions'],
  ['Wrap & pickaxe customizer', 'Decal & camo customizer'],
  ['Pickaxe & wrap customizer', 'Decal & camo customizer'],
  ['Outfit skin swap', 'Camo skin swap'],
  ['Skin & wrap preview', 'Camo & decal preview'],
  ['outfit, wrap and pickaxe', 'camo, decal and vehicle skin'],
  ['skins, wraps and exclusive sets', 'camos, decals and exclusive sets'],
  ['Loading screen editor', 'Hangar preview editor'],
  ['Health & shield tracking', 'Crew HP & parts tracking'],
  ['Hotkey macros (heals/shields)', 'Hotkey macros (repairs/parts)'],
  ['hotkey macros for heals and mobility', 'hotkey macros for repairs and mobility'],
  ['Auto Heal', 'Auto Repair'],
  ['Bone Priority', 'Weak-spot Priority'],
  ['bone priority', 'weak-spot priority'],
  ['AR spray, SMG tracking and shotgun timing', 'cannon lead, MG tracking and ATGM timing'],
  ['AR spray, SMG tracking and shotgun push', 'cannon lead, MG tracking and ATGM push'],
  ['AR, SMG, and shotgun drills', 'cannon, MG, and ATGM drills'],
  ['AR, SMG, and shotgun profiles', 'cannon, MG, and ATGM profiles'],
  ['AR, SMG, then shotgun', 'cannon, MG, then ATGM'],
  ['Save AR, SMG, shotgun and sniper presets', 'Save cannon, MG, ATGM and aircraft presets'],
  ['Per-weapon aimbot profiles for Pro tier—AR spray, SMG tracking and shotgun push settings for Ranked.', 'Per-weapon aimbot profiles for Pro tier—cannon lead, MG tracking and ATGM settings for Ranked.'],
  ['Boxes, skeletons, distance and health', 'Boxes, outlines, distance and crew HP'],
  ['Boxes, skeletons, distance, health', 'Boxes, outlines, distance, crew HP'],
  ['skeletons, boxes, and distance', 'outlines, boxes, and distance'],
  ['Skeletons, boxes and distance', 'Outlines, boxes and distance'],
  ['boxes, skeletons, and distances', 'boxes, outlines, and distances'],
  ['boxes, skeletons and distances', 'boxes, outlines and distances'],
  ['vehicle boxes, skeletons, distance and health', 'vehicle boxes, outlines, distance and crew HP'],
  ['enable vehicle boxes, skeletons, distance and health', 'enable vehicle boxes, outlines, distance and crew HP'],
  ['build-fight ESP wallhack through builds', 'ground-battle ESP wallhack through terrain'],
  ['ESP through builds with names', 'ESP through terrain with names'],
  ['through builds with names, HP bars', 'through terrain with names, HP bars'],
  ['weapons through cover', 'ammo types through cover'],
  ['BR, Realistic Battles, Ranked, Test Drive', 'Arcade, Realistic, Ranked, Test Drive'],
  ['bot lobby', 'Test Drive'],
  ['bot lobbies', 'Test Drive sessions'],
  ['Bot lobby', 'Test Drive'],
  ['a Test Drive before', 'Test Drive before'],
  ['in a Test Drive.', 'in Test Drive.'],
  ['in a Test Drive ', 'in Test Drive '],
  ['or a Test Drive', 'or Test Drive'],
  ['and a Test Drive', 'and Test Drive'],
  ['Test Drive or Test Drive', 'Test Drive'],
  ['Create a Test Drive island or Test Drive', 'Use Test Drive'],
  ['Test Drive island or Test Drive', 'Test Drive'],
  ['Test Drive maps for aim practice', 'Test Drive for aim practice'],
  ['ranked gunfights', 'ranked tank fights'],
  ['Full bot suite and priority patches', 'Full assist suite and priority patches'],
  ['adds bots, kill steal', 'adds assists, kill confirm'],
  ['spell and item timing', 'gun and ammo timing'],
  ['player, chest, loot, and smoke information', 'vehicle, objective, and spotting information'],
  ['smoke alerts, and last-seen positions', 'spotting alerts, and last-seen positions'],
  ['Guides & Builds', 'Guides & Setups'],
  ['high-ground angles', 'hull-down angles'],
  ['Practice high ground', 'Practice hull-down'],
  ['warthunder-high-ground', 'warthunder-hull-down'],
  ['UGC recovery', 'account recovery'],
  ['HWID Spoofer, UGC and Camo Unlocker', 'HWID Spoofer, account recovery and Camo Unlocker'],
  ['HWID Spoofer, Camo Unlocker and UGC recovery', 'HWID Spoofer, Camo Unlocker and account recovery'],
  ['tools (HWID Spoofer, UGC, Camo Unlocker', 'tools (HWID Spoofer, account recovery, Camo Unlocker'],
  ['when to use UGC appeal workflows', 'when to use account recovery appeal workflows'],
  ['HWID or UGC products', 'HWID or account recovery products'],
  ['combo aimbot', 'full aimbot'],
  ['enemy names, health bars, and range markers', 'enemy names, crew HP bars, and range markers'],
  ['Enemy name tags, health and range', 'Enemy name tags, crew HP and range'],
  ['enemy names, health, and weapons', 'enemy names, crew HP, and ammo types'],
  ['Long-range enemy names, health and weapons', 'Long-range enemy names, crew HP and ammo types'],
  ['multi-player squad ESP', 'multi-vehicle squad ESP'],
  ['on players.', 'on vehicles.'],
  ['Smoothness sliders tunes cast timing so aimbot stay natural', 'Smoothness sliders tune lead timing so aimbot stays natural'],
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
  const base = path.basename(file);
  const ext = path.extname(file).toLowerCase();
  if (SKIP_FILES.has(base)) continue;
  if (ext && !EXTS.has(ext) && base !== '_redirects' && base !== '_headers') continue;
  if (!ext && base !== '_redirects' && base !== '_headers') continue;

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
