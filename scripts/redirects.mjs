/** Static path redirects (301). Keys are pathname without query/hash. */
export const PATH_REDIRECTS = new Map([
  ['/blog', '/blog/'],
  ['/about', '/about/'],
  ['/contact', '/support/'],
  ['/contact/', '/support/'],
  ['/support', '/support/'],
  ['/privacy', '/privacy/'],
  ['/terms', '/terms/'],
  ['/faq', '/faq/'],
  ['/cheats', '/products/warthunder-hack/'],
  ['/cheats/', '/products/warthunder-hack/'],
  ['/cheats/lite', '/products/warthunder-hack/'],
  ['/cheats/lite/', '/products/warthunder-hack/'],
  ['/cheats/pro', '/products/warthunder-hack/'],
  ['/cheats/pro/', '/products/warthunder-hack/'],
  ['/cheats/elite', '/products/warthunder-hack/elite/'],
  ['/cheats/elite/', '/products/warthunder-hack/elite/'],
  ['/cheats/compare', '/blog/warthunder-lite-vs-pro/'],
  ['/cheats/compare/', '/blog/warthunder-lite-vs-pro/'],
  ['/products/warthunder-hack/utilities', '/products/warthunder-hack/utilities/'],
  ['/products/warthunder-hack', '/products/warthunder-hack/'],
  ['/products/warthunder-hack/account-recovery', '/products/warthunder-hack/ugc/'],
  ['/products/warthunder-hack/account-recovery/', '/products/warthunder-hack/ugc/'],
  ['/products/dota-2-cheats', '/products/warthunder-hack/'],
  ['/products/dota-2-cheats/', '/products/warthunder-hack/'],
  ['/products/dota-2-cheats/elite', '/products/warthunder-hack/elite/'],
  ['/products/dota-2-cheats/elite/', '/products/warthunder-hack/elite/'],
  ['/products/dota-2-cheats/utilities', '/products/warthunder-hack/utilities/'],
  ['/products/dota-2-cheats/utilities/', '/products/warthunder-hack/utilities/'],
  ['/products/fortnite-cheats', '/products/warthunder-hack/'],
  ['/products/fortnite-cheats/', '/products/warthunder-hack/'],
  ['/products/fortnite-cheats/elite', '/products/warthunder-hack/elite/'],
  ['/products/fortnite-cheats/elite/', '/products/warthunder-hack/elite/'],
  ['/products/fortnite-cheats/utilities', '/products/warthunder-hack/utilities/'],
  ['/products/fortnite-cheats/utilities/', '/products/warthunder-hack/utilities/'],
  ['/go/fortnite', '/go/warthunder/'],
  ['/go/fortnite/', '/go/warthunder/'],
]);

/** Paths that should not receive a forced trailing slash. */
export const TRAILING_SLASH_SKIP = /\.[a-z0-9]+$/i;

export function resolvePathRedirect(pathname) {
  const direct = PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/') && !TRAILING_SLASH_SKIP.test(pathname)) {
    return `${pathname}/`;
  }

  return null;
}
