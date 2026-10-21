/**
 * Aggressive blog/FAQ Fortnite combat vocabulary → War Thunder.
 * Run: node scripts/cleanup-wt-blog.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const files = [
  'src/data/blog/posts.ts',
  'src/data/faq.ts',
  'src/data/forum.ts',
  'src/data/products.ts',
  'src/i18n/en.ts',
  'src/config/pageSeo.ts',
  'src/config/seo.ts',
  'README.md',
];

const REPL = [
  ['Chest ESP & target assist', 'Vehicle ESP & target assist'],
  ['label: \'Loot\'', "label: 'Targets'"],
  ['AR mid-range, SMG close, shotgun push', 'cannon mid-range, MG close, ATGM push'],
  ['Shotgun push', 'ATGM push'],
  ['shotgun push', 'ATGM push'],
  ['Head/chest priority under pressure', 'Ammo/breech priority under pressure'],
  ['Cap point rush loot', 'Cap point rush'],
  ['Chest / ground target ESP', 'Vehicle / objective ESP'],
  ['Leave POI fully looted faster', 'Clear the cap and rotate faster'],
  ['SMG close-range tracking, then shotgun push timing', 'MG close-range tracking, then ATGM push timing'],
  ['health bars and distance readouts; turn off portrait spam', 'crew HP bars and distance readouts; turn off name spam'],
  ['Add chest and ground target ESP', 'Add vehicle and objective ESP'],
  ['Practice one weapon profile at a time—AR, then SMG, then shotgun.', 'Practice one weapon profile at a time—cannon, then MG, then ATGM.'],
  [
    'Aimbot chains abilities in smooth order—AR spray into builds, SMG tracking, shotgun push finishes.',
    'Aimbot chains shots in smooth order—cannon lead into cover, MG tracking, ATGM push finishes.',
  ],
  [
    'Smooth Aim keeps attack-move clean during chases without stutter-step misclicks. Sticky Aim locks aim at optimal cursor positions without wasting shots on fogged targets.',
    'Smooth Aim keeps lead clean during chases without snap misclicks. Sticky Aim locks aim at optimal weak spots without wasting shots on angled armor.',
  ],
  [
    'Hotkey macros fires heals, shields, or mobility items before or during aimbot engages based on enemy count radius rules you configure. Overlapping instant heals plus instant aim snaps looks robotic—add 80 to 120 ms offset so item use precedes peeks naturally. Support players bind heals on low HP; fraggers bind mobility when three enemies close distance.',
    'Hotkey macros fire repairs, parts, or mobility binds before or during aimbot engages based on enemy count radius rules you configure. Overlapping instant repairs plus instant aim snaps looks robotic—add 80 to 120 ms offset so actions precede peeks naturally. Support players bind repairs on low crew HP; aggressors bind mobility when three enemies close distance.',
  ],
  [
    'Elite unlocks Target Assist, chest respawn timers, and loadout manager—start conservative per [Elite tier guide](/blog/warthunder-elite-tier-guide/). Bots are not autopilot win buttons; they amplify farming efficiency when you already understand zone timing and POI clears. Enable farm bot only after two weeks of clean Pro script sessions.',
    'Elite unlocks Target Assist, spawn / cap timers, and loadout manager—start conservative per [Elite tier guide](/blog/warthunder-elite-tier-guide/). Assists are not autopilot win buttons; they amplify efficiency when you already understand spawn timing and objective clears. Enable aggressive assists only after two weeks of clean Pro sessions.',
  ],
  [
    'Spawn / cap timers pair with ESP wallhack vehicle ESP so you know when chests respawn safely. loadout manager reduces mid-game loadout swaps—Elite operators use it in high-rank lobbies where tempo wins games. Realistic Battles preset allows slightly more aggressive bot settings than ranked preset.',
    'Spawn / cap timers pair with ESP wallhack vehicle ESP so you know when spawns refresh safely. Loadout manager reduces mid-game ammo swaps—Elite operators use it in high-rank lobbies where tempo wins games. Realistic Battles preset allows slightly more aggressive assist settings than ranked preset.',
  ],
  ['ESP wallhack: vehicle ESP, chests, smoke alerts', 'ESP wallhack: vehicle ESP, objectives, spotting alerts'],
  [
    'ESP wallhack covers vehicle ESP, chest and reboots, smoke alerts, and enemy tracking on Lite and Elite—full setup in [ESP wallhack setup](/blog/warthunder-esp-wallhack-setup/). Start max ESP distance at 1200 units; expand only after a week of clean games. Chest icons use distinct colors for chest vs rare drop so sight lines stay readable.',
    'ESP wallhack covers vehicle ESP, objectives and spawns, spotting alerts, and enemy tracking on Lite and Elite—full setup in [ESP wallhack setup](/blog/warthunder-esp-wallhack-setup/). Start max ESP distance at 1200 units; expand only after a week of clean games. Vehicle icons use distinct colors for tanks vs aircraft so sight lines stay readable.',
  ],
  ['Preview skins and wraps locally', 'Preview camos and decals locally'],
  ['preview skins and wraps locally', 'preview camos and decals locally'],
  ['Chest and ground target ESP', 'Vehicle and objective ESP'],
  [
    'You play ranked or Realistic Battles daily on close-range loadouts—ARs, SMGs, and snipers, Storm. You want Aimbot, Smooth Aim, Sticky Aim, Weak-spot Priority, and Hotkey macros for heal and mobility timing.',
    'You play ranked or Realistic Battles daily on close-range loadouts—medium tanks, SPAA, and casemates. You want Aimbot, Smooth Aim, Sticky Aim, Weak-spot Priority, and Hotkey macros for repair and mobility timing.',
  ],
  [
    'Presets use high aimbot smoothness, chest-priority targeting on players that need it, and Hotkey macros disabled until you enable heal and mobility macros manually once per game to learn timings.',
    'Presets use high aimbot smoothness, ammo-rack priority targeting on vehicles that need it, and Hotkey macros disabled until you enable repair and mobility macros manually once per game to learn timings.',
  ],
  [
    'Set selector to prefer stun targets for supports—Shotgun, Shadow Shaman—not random nearest bot. Carry profiles prefer lowest HP core in script range.',
    'Set selector to prefer soft targets for SPAA—open-tops and aircraft—not random nearest bot. Carry profiles prefer lowest HP vehicle in aimbot range.',
  ],
  [
    'Bind Hotkey macros to fire shield potion before script combo when three enemies are within radius, or shield on channeling cores. Add 80–120 ms delay so item use precedes peeks naturally.',
    'Bind Hotkey macros to fire repair kits before aimbot engages when three enemies are within radius, or parts assist on critical damage. Add 80–120 ms delay so actions precede peeks naturally.',
  ],
  [
    'Overlapping instant heals plus instant aim snaps looks robotic in replays—review one replay weekly with conservative settings.',
    'Overlapping instant repairs plus instant aim snaps looks robotic in replays—review one replay weekly with conservative settings.',
  ],
  [
    'Save separate profiles for assault rifle, SMG, and shotgun—examples in [Weapon aimbot guide](/blog/warthunder-aimbot-combat-guide/). Hotkey swap in player select without reopening loader.',
    'Save separate profiles for cannon, MG, and ATGM—examples in [Weapon aimbot guide](/blog/warthunder-aimbot-combat-guide/). Hotkey swap in hangar select without reopening loader.',
  ],
  [
    'ESP wallhack modules on [Lite](/products/warthunder-hack/) and [Elite](/products/warthunder-hack/elite/) show enemy positions, chests, smokes, and loot timers outside normal vision—if configured cleanly. Cluttered ESP loses games.',
    'ESP wallhack modules on [Lite](/products/warthunder-hack/) and [Elite](/products/warthunder-hack/elite/) show enemy positions, objectives, spotting markers, and spawn timers outside normal vision—if configured cleanly. Cluttered ESP loses games.',
  ],
  ['Chest and loot locator', 'Vehicle and objective locator'],
  [
    'Chest ESP highlights chest and reboots with distinct icons. Filter by chest type so sight lines stay visible without overlay clutter on the whole map.',
    'Vehicle ESP highlights tanks and aircraft with distinct icons. Filter by vehicle type so sight lines stay visible without overlay clutter on the whole map.',
  ],
  [
    'Pair with loot timers from Lite’s radar tab. Support players clear angles with confidence when chest icons match rotate predictions.',
    'Pair with spawn timers from Lite’s radar tab. Support players clear angles with confidence when vehicle icons match rotate predictions.',
  ],
  [
    'Practice chest reads in lobby [cheat codes](/blog/warthunder-cheat-codes-guide/) with -allvision, then apply learned lines in ranked ESP config.',
    'Practice vehicle reads in Test Drive [cheat codes](/blog/warthunder-cheat-codes-guide/) with full ESP, then apply learned lines in ranked ESP config.',
  ],
  [
    'Vehicle ESP, chests, and smoke alerts through secure checkout.',
    'Vehicle ESP, objectives, and spotting alerts through secure checkout.',
  ],
  [
    'Camo Unlocker on [Elite](/products/warthunder-hack/elite/) and the standalone [Unlock All product](/products/warthunder-hack/unlock-all/) let you preview outfits, wraps, and exclusive sets locally in War Thunder.',
    'Camo Unlocker on [Elite](/products/warthunder-hack/elite/) and the standalone [Unlock All product](/products/warthunder-hack/unlock-all/) let you preview camouflages, decals, and exclusive sets locally in War Thunder.',
  ],
  ['Preview skins and wraps locally—secure checkout', 'Preview camos and decals locally—secure checkout'],
  [
    'Run a five-minute private lobby or bot match. Confirm vehicle ESP distances, chest icons, and script combo fire correctly.',
    'Run a five-minute Test Drive or custom battle. Confirm vehicle ESP distances, vehicle icons, and aimbot fire correctly.',
  ],
  [
    '[Pro tier](/products/warthunder-hack/) aimbot shines on timing-heavy loadouts. AR spray into builds, SMG tracking in Realistic Battles, and shotgun push fights are Ranked staples—tune smoothness and weak-spot priority per weapon instead of one global snap.',
    '[Pro tier](/products/warthunder-hack/) aimbot shines on timing-heavy loadouts. Cannon lead into cover, MG tracking in Realistic Battles, and ATGM push fights are Ranked staples—tune smoothness and weak-spot priority per weapon instead of one global snap.',
  ],
  [
    'Save separate portal profiles for assault rifle, SMG, shotgun and sniper. Hotkey swap in-match without reopening the loader. Test each profile in Test Drive before Ranked.',
    'Save separate portal profiles for cannon, MG, ATGM and aircraft guns. Hotkey swap in-match without reopening the loader. Test each profile in Test Drive before Ranked.',
  ],
  [
    'Enable Aimbot with moderate FOV and high smoothness for mid-range sprays. Weak-spot Priority on chest for spray transfer, head for first-shot peeks. Save as ar_ranked; lower delays only in Realistic Battles preset. Practice the spray pattern in Test Drive before enabling aimbot.',
    'Enable Aimbot with moderate FOV and high smoothness for mid-range shots. Weak-spot Priority on ammo rack for follow-ups, breech for first-shot peeks. Save as ground_ranked; lower delays only in Realistic Battles preset. Practice lead in Test Drive before enabling aimbot.',
  ],
  [
    'Closer FOV, sticky aim on, smoothness slightly lower than AR. Hotkey macros can fire heals or mobility when three enemies are within radius—add 80–120 ms delay so item use feels natural.',
    'Closer FOV, sticky aim on, smoothness slightly lower than cannon. Hotkey macros can fire repairs or mobility when three enemies are within radius—add 80–120 ms delay so actions feel natural.',
  ],
  [
    'Tight FOV, weak-spot priority head/chest, short sticky window. Pair with [radar](/blog/warthunder-radar-hack-guide/) so you do not push into a stacked squad.',
    'Tight FOV, weak-spot priority ammo/breech, short sticky window. Pair with [radar](/blog/warthunder-radar-hack-guide/) so you do not push into a stacked squad.',
  ],
  ['AR, SMG, shotgun profiles and more', 'Cannon, MG, ATGM profiles and more'],
  ['no chest dots, vehicle ESP, or script HUD', 'no vehicle dots, ESP overlays, or aimbot HUD'],
  ['Long-range enemy names, health and ammo types', 'Long-range enemy names, crew HP and ammo types'],
  ['enemy names, health, and ammo types', 'enemy names, crew HP, and ammo types'],
  ['# warthunder-hack-com', '# warthunderhack.org'],
  [
    "if (/warthunder\\s*cheat/i.test(trimmed)) return trimmed;",
    "if (/war\\s*thunder\\s*(hack|cheat)/i.test(trimmed)) return trimmed;",
  ],
  ['how-to-learn-weapon-aim-in-creative', 'how-to-learn-weapon-aim-in-test-drive'],
  ['what-to-do-if-eac-cannot-verify', 'what-to-do-if-gaijin-cannot-verify'],
];

for (const rel of files) {
  const file = path.join(process.cwd(), rel);
  if (!fs.existsSync(file)) continue;
  let text = fs.readFileSync(file, 'utf8');
  const before = text;
  for (const [from, to] of REPL) {
    if (text.includes(from)) text = text.split(from).join(to);
  }
  if (text !== before) {
    fs.writeFileSync(file, text);
    console.log('updated', rel);
  } else {
    console.log('noop', rel);
  }
}

console.log('Done.');
