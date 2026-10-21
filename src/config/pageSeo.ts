/**
 * Central titles/descriptions for high-traffic routes.
 * After Search Console shows impressions, edit the matching path here and redeploy.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Buy Undetected War Thunder Hack | Aimbot, ESP & Wallhack',
    description:
      'Buy undetected War Thunder hack for PC — aimbot, ESP, wallhack, radar, ground target ESP and camo unlocker. Updated after every Gaijin anti-cheat patch.',
  },
  '/products/warthunder-hack/': {
    title: 'Buy War Thunder Hack | Elite, HWID Spoofer & Camo Unlocker',
    description:
      'Shop War Thunder hack for PC: Elite aimbot & ESP wallhack, HWID spoofer, account recovery and Camo Unlocker. Instant delivery after checkout.',
  },
  '/products/warthunder-hack/elite/': {
    title: 'Buy War Thunder Elite Hack | Aimbot, ESP & Target Assist',
    description:
      'Buy War Thunder Elite hack with aimbot, ESP wallhack, target assist, Auto Parts Assist, Camo Unlocker and priority Gaijin patch updates.',
  },
  '/products/warthunder-hack/hwid-spoofer/': {
    title: 'Buy War Thunder HWID Spoofer | Hardware Ban Bypass',
    description:
      'Buy a War Thunder HWID spoofer for PC hardware bans — disk/MAC tools, compatibility scan and post-spoof checks before you launch cheats again.',
  },
  '/products/warthunder-hack/ugc/': {
    title: 'Buy War Thunder account recovery | Gaijin & Gaijin Ban Appeal Tools',
    description:
      'Buy War Thunder account recovery (Unban & Governance Control) to organize Gaijin and Gaijin ban appeals, dispute workflows and case tracking.',
  },
  '/products/warthunder-hack/unlock-all/': {
    title: 'Buy War Thunder Camo Unlocker | Unlock All Cosmetics',
    description:
      'Buy War Thunder Camo Unlocker / Unlock All — local camo, decal and vehicle skin previews with your War Thunder hack loadout.',
  },
  '/products/warthunder-hack/utilities/': {
    title: 'Buy War Thunder Cheat Utilities | HWID, UGC & Camo Unlocker',
    description:
      'Buy War Thunder hack utilities: HWID spoofer after hardware bans, account recovery for Gaijin appeals, and local Camo Unlocker / Unlock All.',
  },
  '/blog/': {
    title: 'War Thunder Hack Guides | Aimbot, ESP Wallhack & Gaijin',
    description:
      'Read War Thunder hack guides on aimbot setup, ESP wallhack, Lite vs Pro, Test Drive practice and Gaijin anti-cheat patch-day checks.',
  },
  '/forum/': {
    title: 'War Thunder Hack Forum | Aimbot, ESP & Setup Help',
    description:
      'War Thunder hack forum for aimbot configs, ESP wallhack setup, Gaijin status and product questions before you buy.',
  },
  '/faq/': {
    title: 'War Thunder Hack FAQ | Aimbot, ESP, Bans & Setup',
    description:
      'War Thunder hack FAQ — tiers, aimbot, ESP wallhack, radar, HWID spoofer, Camo Unlocker, bans and loader setup before checkout.',
  },
  '/terms/': {
    title: 'Terms for War Thunder Hack | License & Refunds',
    description:
      'Terms for buying War Thunder hack on warthunderhack.org — license use, delivery, refunds and account risk.',
  },
  '/privacy/': {
    title: 'Privacy Policy | War Thunder Hack Shop',
    description:
      'How the War Thunder hack shop at warthunderhack.org uses analytics, cookies and contact data.',
  },
  '/about/': {
    title: 'About War Thunder Hack | Buy PC Aimbot & ESP',
    description:
      'About War Thunder Hack — we sell PC War Thunder hack (aimbot, ESP, wallhack), guides and utilities at warthunderhack.org.',
  },
  '/support/': {
    title: 'War Thunder Hack Support | Loader, HWID & Checkout',
    description:
      'War Thunder hack support for loader setup, aimbot/ESP configs, HWID spoofing and checkout help — 24/7 Discord.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}
