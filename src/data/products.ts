import { t } from '../i18n';
import { checkoutForSlug, checkoutPath } from '../config/checkout';
import type { IconName } from '../components/icons/types';

export interface ProductSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  fullFeatures: string[];
  systemRequirements: SystemRequirement[];
  about?: { type: 'h2' | 'p'; text: string }[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedBlogSlugs: string[];
}

/** Guides paired with each product detail page */
export const productRelatedBlogSlugs: Record<string, string[]> = {
  lite: ['warthunder-esp-wallhack-setup', 'warthunder-lite-vs-pro', 'warthunder-radar-hack-guide', 'gaijin-patch-day-checklist'],
  pro: [
    'warthunder-aimbot-ranked-guide',
    'warthunder-aimbot-combat-guide',
    'warthunder-lite-vs-pro',
    'warthunder-stream-proof-setup',
  ],
  elite: [
    'warthunder-elite-tier-guide',
    'warthunder-cheats-features-guide',
    'warthunder-esp-wallhack-setup',
    'gaijin-patch-day-checklist',
    'how-to-buy-warthunder-hack-2026',
  ],
  'hwid-spoofer': [
    'warthunder-hwid-spoofer-after-ban',
    'gaijin-bypass-warthunder-guide',
    'gaijin-patch-day-checklist',
    'warthunder-external-cheat-guide',
  ],
  ugc: [
    'gaijin-bypass-warthunder-guide',
    'warthunder-hwid-spoofer-after-ban',
    'how-to-buy-warthunder-hack-2026',
  ],
  'unlock-all': [
    'warthunder-camo-unlocker-guide',
    'warthunder-cheats-features-guide',
    'warthunder-stream-proof-setup',
  ],
};

const productBase = '/products/warthunder-hack/';

const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Review current status',
    desc: 'Check the live banner on warthunderhack.org and Discord #status before purchase—especially after a War Thunder or Gaijin update.',
  },
  {
    num: '02',
    title: 'Choose your access tier',
    desc: 'Select Elite War Thunder hack or the utility that matches your goal. Review the feature list before checkout via our secure checkout.',
  },
  {
    num: '03',
    title: 'Contact the team',
    desc: 'Open Discord and confirm availability, Gaijin / Steam platform, and payment details with your order email ready.',
  },
  {
    num: '04',
    title: 'Follow guided setup',
    desc: 'Use only the operator portal, patch loader, and setup guide. Test in a lobby, load presets, then queue ranked or Realistic Battles.',
  },
];

function acquisitionFor(productName: string): ProductAcquisition {
  return {
    title: `How to get ${productName}`,
    steps: defaultAcquisitionSteps,
  };
}

const sharedGoodToKnow =
  'War Thunder and Gaijin receive frequent updates. Confirm module availability on the live status panel at warthunderhack.org before you purchase or launch. Overlay behavior may differ in lobbies, replays and spectator mode after patches.';

const sharedLimitations =
  'Third-party software in War Thunder can violate Gaijin Terms of Service and lead to Gaijin bans or account action. You use this software at your own risk. Compatibility and availability can change after game, Gaijin, or Windows updates without notice.';

const warthunderSystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'Supported 64-bit edition of Windows 10 or Windows 11.' },
  { icon: 'reqSteam', text: 'Current War Thunder client via Steam or Gaijin Launcher with latest patches applied.' },
  { icon: 'reqSettings', text: 'Administrator access for loader installation and patch updates.' },
  { icon: 'reqWifi', text: 'Stable internet connection for portal access and patch delivery.' },
  { icon: 'reqCpu', text: 'A system that meets War Thunder published hardware requirements.' },
];

type GalleryKey = keyof typeof galleryRaw;

const gameplay = '/images/gameplay';

const galleryRaw = {
  gpMapHack: {
    src: `${gameplay}/warthunder-esp-wallhack.png`,
    alt: 'War Thunder air ESP wallhack cheat gameplay with enemy plane name tags, distances, and green aimbot reticle over an island coastline',
    caption: 'Air ESP wallhack',
    captionDesc: 'Enemy and ally plane tags with distances and aimbot reticle.',
  },
  gpScripts: {
    src: `${gameplay}/warthunder-aimbot-combat.png`,
    alt: 'War Thunder tank gunner aimbot cheat with blue ESP bounding box, green crosshair lock, and distance marker on an enemy tank',
    caption: 'Tank aimbot',
    captionDesc: 'Gunner optics with ESP box and aimbot lock.',
  },
  gpZoomHack: {
    src: `${gameplay}/warthunder-radar-hack.png`,
    alt: 'War Thunder ESP wallhack with yellow bounding box, player name, tank model, health bar, and aimbot circles locked on a light tank',
    caption: 'ESP + aimbot lock',
    captionDesc: 'Name, model, HP bar and aimbot reticle on target.',
  },
  gpSkinChanger: {
    src: `${gameplay}/warthunder-camo-unlocker.png`,
    alt: 'War Thunder third-person tank cheat overlay with player list, green ESP boxes across the map, and large green aimbot reticle',
    caption: 'Full ESP overlay',
    captionDesc: 'Player list, map-wide ESP boxes and aimbot FOV.',
  },
  gpAutoKill: {
    src: `${gameplay}/warthunder-auto-aim.png`,
    alt: 'War Thunder desert tank wallhack with bright green enemy silhouette, bounding box, and distance readout through gunner optics',
    caption: 'Wallhack silhouette',
    captionDesc: 'Green chams silhouette and range through cover.',
  },
  gpFarmBot: {
    src: `${gameplay}/warthunder-target-radar.png`,
    alt: 'War Thunder multi-tank ESP cheat with green bounding boxes and distance markers on burning enemies in a tropical map',
    caption: 'Multi-target ESP',
    captionDesc: 'Several enemy tanks boxed with live distances.',
  },
  gpHeroEsp: {
    src: `${gameplay}/warthunder-vehicle-esp.png`,
    alt: 'War Thunder vehicle ESP and chams cheat showing green boxes, purple highlights, and distance labels on enemy tanks through gunner sight',
    caption: 'Vehicle ESP / chams',
    captionDesc: 'ESP boxes and chams with model and distance labels.',
  },
  gpThermal: {
    src: `${gameplay}/warthunder-thermal-esp.png`,
    alt: 'War Thunder tank ESP wallhack with red and yellow 3D boxes, player names, and meter distances highlighting enemies through terrain',
    caption: '3D box ESP',
    captionDesc: 'Colored 3D boxes with names and distances.',
  },
  gpBuildFight: {
    src: `${gameplay}/warthunder-ground-battle-esp.png`,
    alt: 'War Thunder ground battle ESP with red target boxes, green aim lines, blue shell trajectory arc, and long-range distance tags',
    caption: 'Trajectory + ESP',
    captionDesc: 'Ballistic arc, aim lines and long-range ESP tags.',
  },
  gpArena: {
    src: `${gameplay}/warthunder-arena-wallhack.png`,
    alt: 'War Thunder valley tank aimbot with purple FOV circle, enemy name tags, tank models, and distance indicators through rocky terrain',
    caption: 'FOV aimbot',
    captionDesc: 'Purple FOV circle with name and model ESP tags.',
  },
  gpSpawn: {
    src: `${gameplay}/warthunder-spawn-esp.png`,
    alt: 'War Thunder aircraft ESP showing ground targets with Russian vehicle labels, distance markers, and purple aim circle over a forested map',
    caption: 'Air-to-ground ESP',
    captionDesc: 'Ground unit labels and distances from the air.',
  },
  gpLongRange: {
    src: `${gameplay}/warthunder-long-range-esp.png`,
    alt: 'War Thunder long-range tank ESP cheat with green bounding boxes, model names, and meter distances across an open battlefield',
    caption: 'Long range ESP',
    captionDesc: 'Distant enemy boxes with model and range text.',
  },
  gpAimLock: {
    src: `${gameplay}/warthunder-aimbot-lock.png`,
    alt: 'War Thunder aimbot lock on enemy tank with green crosshair, ESP box, and crew distance readout in gunner sight',
    caption: 'Aimbot lock',
    captionDesc: 'Locked aimbot reticle with ESP box overlay.',
  },
  gpChams: {
    src: `${gameplay}/warthunder-chams-esp.png`,
    alt: 'War Thunder chams ESP cheat highlighting enemy tanks in bright green through hills with bounding boxes and distance labels',
    caption: 'Chams ESP',
    captionDesc: 'Bright chams through terrain with range labels.',
  },
  gpSquad: {
    src: `${gameplay}/warthunder-squad-esp.png`,
    alt: 'War Thunder squad ESP wallhack showing multiple enemy tanks boxed in green with live distances during a tropical fight',
    caption: 'Squad ESP',
    captionDesc: 'Multiple enemy tanks tracked with ESP boxes.',
  },
  gpCombat: {
    src: `${gameplay}/warthunder-combat-esp.png`,
    alt: 'War Thunder combat ESP and aimbot overlay with player list, green boxes on enemies, and FOV reticle during a live tank battle',
    caption: 'Combat ESP',
    captionDesc: 'Full combat overlay with list, boxes and FOV.',
  },
};

function slide(...keys: GalleryKey[]): ProductSlide[] {
  return keys.map((k) => {
    const item = galleryRaw[k];
    return {
      src: item.src,
      alt: item.alt,
      caption: item.caption,
      captionDesc: item.captionDesc,
    };
  });
}

function slugFromHref(href: string): string {
  const segment = href.replace(productBase, '').replace(/^\//, '').replace(/\/$/, '');
  return segment || 'warthunder-hack';
}

const tierAbout: Record<string, ProductPage['about']> = {
  lite: [
    {
      type: 'p',
      text: 'War Thunder Lite is built for players who want map awareness first. In ranked, knowing enemy positions, enemy positions and objective timings wins more fights than raw mechanics—Lite gives you that edge without aimbot automation.',
    },
    { type: 'h2', text: 'Ranked-safe by design' },
    {
      type: 'p',
      text: 'Lite skips Aimbot and bot modules entirely. Your gameplay looks natural while ESP, radar hack and loot timers keep you informed. Stream-proof mode hides overlays from OBS capture for content creators.',
    },
  ],
  pro: [
    {
      type: 'p',
      text: 'War Thunder Pro is the sweet spot for ranked grinders. Aimbot, Smooth Aim and Sticky Aim help you win squad fights without obvious bot patterns—when you tune Smoothness sliders using our portal presets.',
    },
    { type: 'h2', text: 'Aimbot + awareness combined' },
    {
      type: 'p',
      text: 'Pro inherits every Lite module and adds Aimbot, Weak-spot Priority, Hotkey macros and FOV and smoothness drawing. You see the fight before it starts and win it with aimbot that stay human at default settings.',
    },
  ],
  elite: [
    {
      type: 'p',
      text: 'War Thunder Elite is the private build for players who want everything—Target Assist, Auto Parts Assist, Auto Repair Assist, Camo Unlocker, full ESP wallhack and direct developer support. Limited slots keep the build maintainable and patch cycles fast.',
    },
    { type: 'h2', text: 'Use Elite responsibly' },
    {
      type: 'p',
      text: 'Elite power demands disciplined profiles. Test in lobbies, start with portal conservative presets, and scale up over days—not minutes. Staff in Discord help Elite users tune before their first ranked queue.',
    },
  ],
};

const tierBodies: Record<string, ProductPage['body']> = {
  lite: [
    { type: 'h2', text: 'Included modules' },
    {
      type: 'p',
      text: 'Vehicle ESP with distance and name tags, vehicle and spawn locator, loot spawn timers, radar hack, and stream-safe overlay hiding. Config presets for Arcade and Realistic Battles ship in the portal—load before your first queue.',
    },
    { type: 'h2', text: 'Upgrade path' },
    {
      type: 'p',
      text: 'Lite license holders can upgrade to Pro or Elite through the portal without losing config backups. Compare tiers on the main product page before checkout via our secure checkout.',
    },
  ],
  pro: [
    { type: 'h2', text: 'Aimbot and automation' },
    {
      type: 'p',
      text: 'Aimbot, Smooth Aim, Sticky Aim with Prediction, Weak-spot Priority and hotkey macros for repairs and mobility. Smoothness sliders tune lead timing so aimbot stays natural in ranked. Start with portal presets, not max sliders.',
    },
    { type: 'h2', text: 'Recommended pairing' },
    {
      type: 'p',
      text: 'Pro is the most popular tier at warthunderhack.org—enough firepower for high-rank lobbies without Elite slot limits. Pair with our aimbot guide in the blog before your first ranked session.',
    },
  ],
  elite: [
    { type: 'h2', text: 'Full bot and finish suite' },
    {
      type: 'p',
      text: 'Target Assist, Rotation Assist AI, Auto Parts Assist, Auto Repair Assist, Camo Unlocker and full ESP wallhack with smoke alerts. Use lobby testing before ranked—Elite power requires disciplined profiles, not rage settings.',
    },
    { type: 'h2', text: 'Availability' },
    {
      type: 'p',
      text: 'Elite shows as limited slots on the status banner. Open a Discord ticket if checkout is gated—staff confirm slot availability before purchase.',
    },
  ],
};

const utilityBodies: Record<string, ProductPage['body']> = {
  'hwid-spoofer': [
    { type: 'h2', text: 'When you need it' },
    {
      type: 'p',
      text: 'Use when fresh Gaijin accounts fail instantly on one PC but work elsewhere—classic HWID enforcement. Do not use for account-only Gaijin cases; see [UGC](/products/warthunder-hack/ugc/) instead.',
    },
    { type: 'h2', text: 'Full workflow' },
    {
      type: 'p',
      text: 'Restore point, driver cleanup, spoof application, cold reboot, identifier verification, then conservative cheat profile before ranked. Full checklist ships in the portal and in our HWID blog guide.',
    },
  ],
  'ugc': [
    { type: 'h2', text: 'What UGC covers' },
    {
      type: 'p',
      text: 'UGC (Unban & Governance Control) is an appeal workspace for Gaijin account restrictions, Gaijin bans, trade holds and security flags. Build custom workflows, automate dispute steps and track case status from one dashboard—not a guaranteed unban service.',
    },
    { type: 'h2', text: 'Realistic expectations' },
    {
      type: 'p',
      text: 'Some Gaijin bans cannot be reversed. UGC organizes evidence and follow-ups for Gaijin review. Pair with [HWID Spoofer](/products/warthunder-hack/hwid-spoofer/) when hardware is flagged, or a new account when reputation is burned.',
    },
  ],
  'unlock-all': [
    { type: 'h2', text: 'Local preview only' },
    {
      type: 'p',
      text: 'Cosmetics display on your client for testing and content creation. Other players in your lobby see your actual inventory, not preview skins.',
    },
    { type: 'h2', text: 'Included with Elite' },
    {
      type: 'p',
      text: 'Camo Unlocker ships inside the Elite tier. Buy standalone here if you want cosmetic preview without full combat modules.',
    },
  ],
};

const productContent: Record<
  string,
  Pick<ProductPage, 'overview' | 'images' | 'fullFeatures' | 'goodToKnow' | 'limitations' | 'systemRequirements'>
> = {
  lite: {
    images: slide('gpHeroEsp', 'gpLongRange', 'gpSquad'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: warthunderSystemRequirements,
    fullFeatures: [
      'Vehicle ESP & vehicle boxes',
      'Vehicle & objective locator',
      'POI awareness',
      'Crew HP & parts tracking',
      'Mini-radar overlay',
      'Streamproof overlay mode',
      'Distance readouts',
      'Team color filter',
      'Loot spawn timers',
      'Radar hack',
      'Realistic Battles preset config',
      'Ranked preset config',
      'Cloud config backup',
      'Patch auto-updater',
    ],
    overview: {
      title: 'War Thunder Lite: ESP and radar',
      paragraphs: [
        'Lite is for vehicle ESP, vehicle markers, spawn timers and radar. No aimbot. Set distance, colors and stream-proof in the portal before you queue.',
        'Best if you want awareness in Arcade and Realistic Battles without combat automation. Overlays are updated after War Thunder patches.',
      ],
    },
  },
  pro: {
    images: slide('gpScripts', 'gpAimLock', 'gpCombat'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: warthunderSystemRequirements,
    fullFeatures: [
      'All Lite ESP & ESP wallhack modules',
      'Aimbot',
      'Smooth Aim',
      'Sticky Aim & Prediction',
      'Weak-spot Priority',
      'Hotkey macros (repairs/parts)',
      'Auto Repair',
      'FOV & smoothness tuning',
      'Per-weapon aimbot profiles',
      'Third-party alert integration',
      'Ranked-safe default presets',
      'Lobby test profile',
      'Cloud config backup',
      'Patch auto-updater',
      'Discord operator support',
    ],
    overview: {
      title: 'War Thunder Pro: aimbot plus ESP',
      paragraphs: [
        'Pro includes everything in Lite, plus Aimbot, Smooth Aim, Sticky Aim and hotkey macros. Aim settings live in one tab. Start with a portal preset, not max sliders.',
        'Most people pick Pro for Arcade and Realistic Battles. Weak-spot priority and macros help in fights while defaults stay smooth.',
      ],
    },
  },
  elite: {
    images: slide('gpAutoKill', 'gpThermal', 'gpBuildFight'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: warthunderSystemRequirements,
    fullFeatures: [
      'All Lite + Pro modules',
      'Target Assist',
      'Rotation Assist AI',
      'Spawn / cap timer',
      'Auto loadout manager',
      'Auto Parts Assist',
      'Auto Repair Assist',
      'Full ESP wallhack suite',
      'Third-party alert system',
      'Visibility detector',
      'Camo Unlocker (Unlock All)',
      'Priority patch queue',
      'Direct dev Discord support',
      'Elite conservative presets',
      'Cloud config backup',
      'Patch auto-updater',
      'Private slot access',
    ],
    overview: {
      title: 'War Thunder Elite: full cheat + extras',
      paragraphs: [
        'Elite includes Lite and Pro modules, plus target assist, Auto Parts Assist, Auto Repair Assist, Camo Unlocker, full ESP wallhack and faster patch priority.',
        'Slots are limited. Discord support helps you set safer profiles before Ranked. Check the status banner on warthunderhack.org before you buy.',
      ],
    },
  },
  'hwid-spoofer': {
    images: slide('gpSpawn', 'gpArena', 'gpChams'),
    goodToKnow:
      'Run the compatibility scan in the portal before spoofing. Create a Windows restore point first. Verify identifiers changed after a cold reboot before launching War Thunder.',
    limitations:
      'Spoofing does not help account-only Gaijin cases. Never stack two spoof tools. Shared or work PCs may not be suitable. You accept all risk from driver-level changes.',
    systemRequirements: [
      { icon: 'reqWindows', text: 'Windows 10 or 11 64-bit with administrator access.' },
      { icon: 'reqRestorePoint', text: 'Ability to create a system restore point before running.' },
      { icon: 'reqShieldGuide', text: 'Follow the portal setup guide before launching War Thunder after spoofing.' },
      { icon: 'reqWifi', text: 'Stable connection for portal verification tools.' },
    ],
    fullFeatures: [
      'Disk serial profile tools',
      'MAC address rotation',
      'Restore point checklist',
      'Compatibility scan',
      'Driver conflict detection',
      'Post-spoof verification',
      'Identifier diff report',
      'Cold reboot guide',
      'Portal step-by-step workflow',
      'Discord recovery support',
    ],
    overview: {
      title: 'HWID Spoofer for War Thunder PC bans',
      paragraphs: [
        'Use the HWID Spoofer when Gaijin anti-cheat flags your PC hardware but the Gaijin account is still fine. Includes disk and MAC tools, a restore-point checklist, a compatibility scan and post-spoof checks.',
        'Use it when new accounts die on one PC but work on another. It does not fix account-only Gaijin bans. After spoofing, use a safer cheat profile before Ranked.',
      ],
    },
  },
  ugc: {
    images: slide('gpZoomHack', 'gpFarmBot', 'gpLongRange'),
    goodToKnow:
      'Gather order email, platform account details and restriction screenshots before opening a ticket. UGC structures appeals—it does not bypass platform review.',
    limitations:
      'UGC does not guarantee account restoration. Results vary by case type. Permanent Gaijin bans may require a new account path instead of appeal.',
    systemRequirements: [
      { icon: 'reqMailOrder', text: 'Order email used at checkout on warthunderhack.org or at checkout on warthunderhack.org.' },
      { icon: 'reqShieldAccount', text: 'Account details and ban or restriction notification if available.' },
      { icon: 'reqWifiPortal', text: 'Internet access for Discord support and case dashboard.' },
    ],
    fullFeatures: [
      'Custom appeal workflows',
      'Restriction dispute automation',
      'Case documentation templates',
      'Status tracking dashboard',
      'Identity verification guide',
      'Evidence upload structure',
      'Timeline tracker',
      'Follow-up response templates',
      'Multi-platform support',
    ],
    overview: {
      title: 'UGC account appeal tools',
      paragraphs: [
        'UGC (Unban & Governance Control) helps you organize appeals for Gaijin restrictions and Gaijin bans. It does not guarantee an unban.',
        'Track cases, keep evidence in one place and follow up from the dashboard. Discord support can walk you through steps when needed.',
      ],
    },
  },
  'unlock-all': {
    images: slide('gpSkinChanger', 'gpChams', 'gpCombat'),
    goodToKnow:
      'Unlock All previews cosmetics locally on your client. Other players in your lobby see your real inventory—not preview skins. Included with Elite tier.',
    limitations:
      'Local preview only—does not modify Gaijin inventory or store state. Other players cannot see previewed skins or sets.',
    systemRequirements: warthunderSystemRequirements,
    fullFeatures: [
      'Camo skin swap',
      'Camo & decal preview',
      'Decal & camo customizer',
      'Hangar preview editor',
      'Cursor & HUD theme',
      'Camo & decal replacer',
      'Favorites list',
      'Loadout export',
    ],
    overview: {
      title: 'Camo Unlocker / Unlock All',
      paragraphs: [
        'Unlock All lets you preview camouflages, decals and vehicle skins on your War Thunder client. It does not change your Gaijin inventory or store purchases.',
        'Only you see the preview skins. Other players see your real inventory. Included with Elite, or buy it alone without combat modules.',
      ],
    },
  },
};

function buildTierPages(): ProductPage[] {
  return t.cheats.items.map((cheat) => {
    const slug = slugFromHref(cheat.href);
    const content = productContent[slug];
    const displayName = cheat.name === 'Lite' ? 'War Thunder Lite' : cheat.name === 'Pro' ? 'War Thunder Pro' : 'War Thunder Elite';
    return {
      slug,
      kind: 'tier',
      badge: cheat.badge,
      tier: cheat.tier,
      name: cheat.name,
      title: cheat.title,
      subtitle: cheat.desc,
      desc: cheat.desc,
      features: cheat.features,
      more: cheat.more,
      variant: cheat.variant,
      buyUrl: checkoutForSlug(slug),
      images: content.images,
      overview: content.overview,
      acquisition: acquisitionFor(displayName),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      systemRequirements: content.systemRequirements,
      about: tierAbout[slug],
      body: tierBodies[slug] ?? [],
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
    };
  });
}

function buildUtilityPages(): ProductPage[] {
  return t.products.items
    .filter((p) => p.href !== productBase)
    .map((product) => {
      const slug = slugFromHref(product.href);
      const content = productContent[slug];
      return {
        slug,
        kind: 'utility',
        badge: product.badge,
        category: product.category,
        name: product.title,
        title: product.title,
        subtitle: product.subtitle,
        desc: product.desc,
        features: product.features,
        more: product.more,
        buyUrl: checkoutForSlug(slug),
        images: content.images,
        overview: content.overview,
        acquisition: acquisitionFor(product.title),
        goodToKnow: content.goodToKnow,
        limitations: content.limitations,
        fullFeatures: content.fullFeatures,
        systemRequirements: content.systemRequirements,
        body: utilityBodies[slug] ?? [],
        relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
      };
    });
}

export const productPages: ProductPage[] = [...buildTierPages(), ...buildUtilityPages()];

export const cheatPages = productPages.filter((p) => p.kind === 'tier');

export function getProductPage(slug: string) {
  return productPages.find((p) => p.slug === slug);
}

export function getCheatPage(slug: string) {
  return cheatPages.find((p) => p.slug === slug);
}

export function getAllProductSlugs() {
  return productPages.map((p) => p.slug);
}

export function getAllCheatSlugs() {
  return cheatPages.map((p) => p.slug);
}

const cheatsHubSlides = slide('gpAimLock', 'gpThermal', 'gpArena');

export const heroSlides = slide(
  'gpMapHack',
  'gpScripts',
  'gpHeroEsp',
  'gpZoomHack',
  'gpAutoKill',
  'gpFarmBot',
  'gpBuildFight',
  'gpSpawn',
  'gpSquad',
  'gpCombat',
  'gpAimLock',
  'gpThermal',
  'gpArena',
  'gpLongRange',
  'gpChams',
  'gpSkinChanger',
);

export const productHub = {
  path: productBase,
  title: t.products.title,
  subtitle: t.products.subtitle,
  description: 'War Thunder Elite hack with aimbot and ESP, plus HWID spoofer, account recovery and Camo Unlocker for PC.',
  buyUrl: checkoutPath('warthunder'),
};
