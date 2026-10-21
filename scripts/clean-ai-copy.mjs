import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = [
  'src/utils/schema.ts',
  'src/utils/rss.ts',
  'src/data/faq.ts',
  'src/data/blog/posts.ts',
  'src/i18n/en.ts',
  'src/config/site.ts',
];

const reps = [
  ['WarThunderHack Editorial', 'War Thunder Hack'],
  ['WarThunderHack Community Forum', 'War Thunder Hack Forum'],
  ['WarThunderHack Blog', 'War Thunder Hack Blog'],
  ['WarThunderHack Support', 'War Thunder Hack Support'],
  ['Join WarThunderHack on Discord', 'Join War Thunder Hack on Discord'],
  ['WarThunderHack home', 'War Thunder Hack home'],
  ['WarThunderHack', 'War Thunder Hack'],
  ["TITLE_PREFIX = 'War Thunder Hack & Cheats'", "TITLE_PREFIX = 'War Thunder Hack'"],
  ['humanized Aimbot', 'smooth aimbot'],
  ['humanized order', 'smooth order'],
  ['humanized input', 'smooth input'],
  ['humanized', 'smooth'],
  [
    'Climbing ranked play with warthunder aimbot means smooth aimbot—not instant bot bursts that draw reports.',
    'Ranked War Thunder aimbot works better with smooth tracking than instant snaps that get you reported.',
  ],
  [
    'maintains private War Thunder hack for Windows PC Arcade and Realistic Battles—not console lobby codes. Every module ships through the operator portal with secure checkout, Discord support, and live status banners before patch-day queues.',
    'sells War Thunder hack for Windows PC Arcade and Realistic Battles. Check status before you queue after a patch.',
  ],
  [
    'maintains private War Thunder hack for Windows PC Arcade and Realistic Battles. Every module ships through the operator portal with secure checkout, Discord support, and live status banners before patch-day queues.',
    'sells War Thunder hack for Windows PC Arcade and Realistic Battles. Check status before you queue after a patch.',
  ],
  [
    'maintains private War Thunder hack for Windows PC Arcade and Realistic Battles. Check live status before every patch-day queue.',
    'sells War Thunder hack for Windows PC Arcade and Realistic Battles. Check status before you queue after a patch.',
  ],
  [
    'maintains private War Thunder hack for Windows PC Arcade and Realistic Battles.',
    'sells War Thunder hack for Windows PC Arcade and Realistic Battles.',
  ],
  [
    'ships a modular external suite for Windows PC ranked—not lobby cheat codes. Aimbot tracks targets, target assist clears POIs, ESP wallhack exposes third-parties, and utility tools like Radar Hack and Camo Unlocker round out the toolkit. This is the complete feature map across',
    'sells external War Thunder hack for PC Ranked. Aimbot, target assist, ESP wallhack, radar and Camo Unlocker. See',
  ],
];

for (const rel of files) {
  const file = path.join(root, rel);
  let text = fs.readFileSync(file, 'utf8');
  const before = text;
  for (const [from, to] of reps) text = text.split(from).join(to);
  if (text !== before) {
    fs.writeFileSync(file, text);
    console.log('updated', rel);
  } else {
    console.log('noop', rel);
  }
}
