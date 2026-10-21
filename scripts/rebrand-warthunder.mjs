/**
 * Fortnite Cheats → War Thunder Hack rebrand.
 * Run from project root: node scripts/rebrand-warthunder.mjs
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

/** Ordered longest-first brand / path / slug replacements. */
const REPLACEMENTS = [
  ['fortnite-cheats.com', 'warthunderhack.org'],
  ['fortnitecheats.com', 'warthunderhack.org'],
  ['support@fortnite-cheats.com', 'support@warthunderhack.org'],
  ['support@fortnitecheats.com', 'support@warthunderhack.org'],

  ['FortniteCheats', 'WarThunderHack'],
  ['Fortnitecheats', 'Warthunderhack'],
  ['fortnitecheats', 'warthunderhack'],

  ['/products/fortnite-cheats', '/products/warthunder-hack'],
  ['products/fortnite-cheats', 'products/warthunder-hack'],
  ['https://zadeyo.com/products/fortnite', 'https://zadeyo.com/products/warthunder'],
  ['%2Fproducts%2Ffortnite', '%2Fproducts%2Fwarthunder'],
  ['/products/fortnite', '/products/warthunder'],
  ['/go/fortnite/', '/go/warthunder/'],
  ['/go/fortnite', '/go/warthunder'],

  ["checkoutPath('fortnite')", "checkoutPath('warthunder')"],
  ['checkoutPath("fortnite")', 'checkoutPath("warthunder")'],
  ["product: 'fortnite'", "product: 'warthunder'"],
  ["'fortnite'", "'warthunder'"],
  ['"fortnite"', '"warthunder"'],
  ['  fortnite:', '  warthunder:'],
  ['fortnite:', 'warthunder:'],

  ['how-to-buy-fortnite-cheats-2026', 'how-to-buy-warthunder-hack-2026'],
  ['how-to-use-fortnite-cheat-codes', 'how-to-use-warthunder-cheat-codes'],
  ['fortnite-aimbot-combat-guide', 'warthunder-aimbot-combat-guide'],
  ['fortnite-console-commands-cheats', 'warthunder-console-commands-cheats'],
  ['fortnite-cheat-codes-guide', 'warthunder-cheat-codes-guide'],
  ['fortnite-console-cheats-tips', 'warthunder-console-cheats-tips'],
  ['fortnite-cheats-features-guide', 'warthunder-cheats-features-guide'],
  ['fortnite-hwid-spoofer-after-ban', 'warthunder-hwid-spoofer-after-ban'],
  ['fortnite-external-cheat-guide', 'warthunder-external-cheat-guide'],
  ['fortnite-stream-proof-setup', 'warthunder-stream-proof-setup'],
  ['fortnite-aimbot-ranked-guide', 'warthunder-aimbot-ranked-guide'],
  ['fortnite-skin-changer-guide', 'warthunder-camo-unlocker-guide'],
  ['fortnite-elite-tier-guide', 'warthunder-elite-tier-guide'],
  ['fortnite-esp-wallhack-setup', 'warthunder-esp-wallhack-setup'],
  ['fortnite-radar-hack-guide', 'warthunder-radar-hack-guide'],
  ['fortnite-lite-vs-pro', 'warthunder-lite-vs-pro'],
  ['eac-bypass-fortnite-guide', 'gaijin-bypass-warthunder-guide'],
  ['eac-patch-day-checklist', 'gaijin-patch-day-checklist'],
  ['fortnite-auto-aim', 'warthunder-auto-aim'],
  ['fortnite-aimbot-combat', 'warthunder-aimbot-combat'],
  ['fortnite-aimbot-lock', 'warthunder-aimbot-lock'],
  ['fortnite-arena-wallhack', 'warthunder-arena-wallhack'],
  ['fortnite-build-fight-esp', 'warthunder-ground-battle-esp'],
  ['fortnite-chams-esp', 'warthunder-chams-esp'],
  ['fortnite-combat-esp', 'warthunder-combat-esp'],
  ['fortnite-esp-wallhack', 'warthunder-esp-wallhack'],
  ['fortnite-long-range-esp', 'warthunder-long-range-esp'],
  ['fortnite-loot-radar', 'warthunder-target-radar'],
  ['fortnite-player-esp', 'warthunder-vehicle-esp'],
  ['fortnite-radar-hack', 'warthunder-radar-hack'],
  ['fortnite-skin-changer', 'warthunder-camo-unlocker'],
  ['fortnite-spawn-island-esp', 'warthunder-spawn-esp'],
  ['fortnite-squad-esp', 'warthunder-squad-esp'],
  ['fortnite-thermal-esp', 'warthunder-thermal-esp'],
  ['hero-fortnite-dark', 'hero-warthunder-dark'],
  ['fortnite-cheats', 'warthunder-hack'],
  ['Fortnite Elite Cheats', 'War Thunder Elite Hack'],
  ['Fortnite Elite cheats', 'War Thunder Elite hack'],
  ['Fortnite Elite', 'War Thunder Elite'],
  ['Fortnite HWID Spoofer', 'War Thunder HWID Spoofer'],
  ['Fortnite UGC Unban Tools', 'War Thunder Account Recovery'],
  ['Fortnite UGC', 'War Thunder account recovery'],
  ['Fortnite Skin Changer', 'War Thunder Camo Unlocker'],
  ['Fortnite Cheats & Hacks', 'War Thunder Hack & Cheats'],
  ['Fortnite cheats & hacks', 'War Thunder hack & cheats'],
  ['Fortnite Cheats', 'War Thunder Hack'],
  ['Fortnite cheats', 'War Thunder hack'],
  ['fortnite cheats', 'war thunder hack'],
  ['Buy Fortnite', 'Buy War Thunder'],
  ['buy Fortnite', 'buy War Thunder'],
  ['Fortnite', 'War Thunder'],
  ['fortnite', 'warthunder'],

  ['Easy Anti-Cheat', 'Gaijin anti-cheat'],
  ['easy anti-cheat', 'gaijin anti-cheat'],
  ['EAC ban', 'Gaijin ban'],
  ['EAC update', 'Gaijin update'],
  ['EAC patch', 'Gaijin patch'],
  [' after EAC', ' after Gaijin'],
  [' an EAC', ' a Gaijin'],
  ['EAC/', 'Gaijin/'],
  ['/EAC', '/Gaijin'],
  [' EAC ', ' Gaijin '],
  ['(EAC)', '(Gaijin)'],
  ['"EAC"', '"Gaijin"'],
  ["'EAC'", "'Gaijin'"],
  ['EAC-aware', 'Gaijin-aware'],
  ['EAC enforcement', 'Gaijin enforcement'],

  ['Epic Games Launcher', 'Gaijin Launcher / Steam'],
  ['Epic Games platform', 'Gaijin / Steam platform'],
  ['Epic Games,', 'Steam / Gaijin,'],
  ['Epic Games.', 'Steam / Gaijin.'],
  ['Epic Games)', 'Steam / Gaijin)'],
  ['(Epic Games', '(Steam / Gaijin'],
  ['via Epic Games', 'via Steam or Gaijin Launcher'],
  ['through Epic Games', 'through Steam or Gaijin'],
  ['Epic account', 'Gaijin account'],
  ['Epic locker', 'Gaijin inventory'],
  ['Epic overlay', 'Steam overlay'],
  ['Epic Terms of Service', 'Gaijin Terms of Service'],
  ['Epic-approved', 'Gaijin-approved'],
  ['Epic-sanctioned', 'Gaijin-sanctioned'],
  ['Epic review', 'Gaijin review'],
  ['exiting the Epic Games Launcher', 'exiting Steam or the Gaijin Launcher'],
  ['open War Thunder settings in the Epic Games Launcher', 'open War Thunder settings in Steam or the Gaijin Launcher'],
  ['reqEpic', 'reqSteam'],
  ['compatEpic', 'compatSteam'],
  [' Epic ', ' Gaijin '],
  ['Epic,', 'Gaijin,'],
  ['Epic.', 'Gaijin.'],

  ['Battle Royale and Zero Build', 'Arcade and Realistic Battles'],
  ['Battle Royale, Zero Build', 'Arcade, Realistic'],
  ['Battle Royale', 'Arcade Battles'],
  ['Zero Build lobby', 'Realistic Battles lobby'],
  ['Zero Build preset', 'Realistic Battles preset'],
  ['Zero Build-friendly', 'Realistic-friendly'],
  ['and Zero Build', 'and Realistic Battles'],
  ['or Zero Build', 'or Realistic Battles'],
  [' Zero Build', ' Realistic Battles'],
  ['Zero Build ', 'Realistic Battles '],
  ['Creative practice', 'Test Drive practice'],
  ['Creative or Realistic Battles lobbies', 'Test Drive or Custom Battles'],
  ['Creative lobby', 'Custom Battles lobby'],
  ['Creative Tips', 'Test Drive Tips'],
  ['Creative Practice', 'Test Drive Practice'],
  ['Creative vs Ranked', 'Test Drive vs Ranked'],
  ['Creative', 'Test Drive'],
  ['Ranked Arena', 'Ranked Battles'],
  ['Skin Changer / Unlock All', 'Camo Unlocker / Unlock All'],
  ['Skin Changer', 'Camo Unlocker'],
  ['skin changer', 'camo unlocker'],
  ['Unlock All for outfits, wraps and pickaxes', 'Unlock All for camouflages, decals and vehicle skins'],
  ['local preview without Epic store purchases', 'local preview without Gaijin store purchases'],
  ['Auto Shield Break', 'Auto Repair Assist'],
  ['Auto Finish', 'Auto Parts Assist'],
  ['Loot Assist', 'Target Assist'],
  ['loot ESP', 'ground target ESP'],
  ['Loot ESP', 'Ground Target ESP'],
  ['player boxes', 'vehicle boxes'],
  ['Player ESP', 'Vehicle ESP'],
  ['player ESP', 'vehicle ESP'],
  ['AR, SMG and Shotgun', 'cannons, MGs and ATGMs'],
];

const IMAGE_RENAMES = [
  ['how-to-buy-fortnite-cheats-2026', 'how-to-buy-warthunder-hack-2026'],
  ['how-to-use-fortnite-cheat-codes', 'how-to-use-warthunder-cheat-codes'],
  ['fortnite-aimbot-combat-guide', 'warthunder-aimbot-combat-guide'],
  ['fortnite-cheat-codes-guide', 'warthunder-cheat-codes-guide'],
  ['fortnite-cheats-features-guide', 'warthunder-cheats-features-guide'],
  ['fortnite-console-cheats-tips', 'warthunder-console-cheats-tips'],
  ['fortnite-console-commands-cheats', 'warthunder-console-commands-cheats'],
  ['fortnite-elite-tier-guide', 'warthunder-elite-tier-guide'],
  ['fortnite-external-cheat-guide', 'warthunder-external-cheat-guide'],
  ['fortnite-hwid-spoofer-after-ban', 'warthunder-hwid-spoofer-after-ban'],
  ['fortnite-lite-vs-pro', 'warthunder-lite-vs-pro'],
  ['fortnite-esp-wallhack-setup', 'warthunder-esp-wallhack-setup'],
  ['fortnite-aimbot-ranked-guide', 'warthunder-aimbot-ranked-guide'],
  ['fortnite-skin-changer-guide', 'warthunder-camo-unlocker-guide'],
  ['fortnite-stream-proof-setup', 'warthunder-stream-proof-setup'],
  ['fortnite-radar-hack-guide', 'warthunder-radar-hack-guide'],
  ['eac-bypass-fortnite-guide', 'gaijin-bypass-warthunder-guide'],
  ['eac-patch-day-checklist', 'gaijin-patch-day-checklist'],
  ['fortnite-auto-aim', 'warthunder-auto-aim'],
  ['fortnite-aimbot-combat', 'warthunder-aimbot-combat'],
  ['fortnite-aimbot-lock', 'warthunder-aimbot-lock'],
  ['fortnite-arena-wallhack', 'warthunder-arena-wallhack'],
  ['fortnite-build-fight-esp', 'warthunder-ground-battle-esp'],
  ['fortnite-chams-esp', 'warthunder-chams-esp'],
  ['fortnite-combat-esp', 'warthunder-combat-esp'],
  ['fortnite-esp-wallhack', 'warthunder-esp-wallhack'],
  ['fortnite-long-range-esp', 'warthunder-long-range-esp'],
  ['fortnite-loot-radar', 'warthunder-target-radar'],
  ['fortnite-player-esp', 'warthunder-vehicle-esp'],
  ['fortnite-radar-hack', 'warthunder-radar-hack'],
  ['fortnite-skin-changer', 'warthunder-camo-unlocker'],
  ['fortnite-spawn-island-esp', 'warthunder-spawn-esp'],
  ['fortnite-squad-esp', 'warthunder-squad-esp'],
  ['fortnite-thermal-esp', 'warthunder-thermal-esp'],
  ['hero-fortnite-dark', 'hero-warthunder-dark'],
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
    if (next.includes(from)) next = next.split(from).join(to);
  }
  return next;
}

function renameImages() {
  const imageRoots = [
    path.join(root, 'public', 'images'),
    path.join(root, 'public', 'images', 'gameplay'),
    path.join(root, 'public', 'images', 'blog'),
  ];
  for (const dir of imageRoots) {
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      if (fs.statSync(full).isDirectory()) continue;
      for (const [from, to] of IMAGE_RENAMES) {
        if (name.startsWith(from) || name.includes(from)) {
          const dest = name.split(from).join(to);
          const toPath = path.join(dir, dest);
          if (full !== toPath && !fs.existsSync(toPath)) {
            fs.renameSync(full, toPath);
            console.log('rename image', name, '→', dest);
          }
          break;
        }
      }
    }
  }
}

function renameProductDir() {
  const from = path.join(root, 'src', 'pages', 'products', 'fortnite-cheats');
  const to = path.join(root, 'src', 'pages', 'products', 'warthunder-hack');
  if (fs.existsSync(from) && !fs.existsSync(to)) {
    fs.renameSync(from, to);
    console.log('renamed product dir → warthunder-hack');
  }
}

renameProductDir();
renameImages();

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
