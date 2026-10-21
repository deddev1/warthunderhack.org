/** Checkout destinations keyed by internal product id (affiliate go links). */
export const CHECKOUT_URLS = {
  warthunder: 'https://levocheats.com/go/QRH?to=%2Fwar-thunder-cheats',
  skinChanger: 'https://levocheats.com/go/QRH?to=%2Fwar-thunder-cheats',
  hwidSpoofer: 'https://levocheats.com/go/QRH?to=%2Fhwid-spoofer',
  ugc: 'https://levocheats.com/go/QRH?to=%2Fwar-thunder-cheats',
};

/** Checkout paths → external product URLs (used by Node serve + Astro middleware). */
export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/warthunder', CHECKOUT_URLS.warthunder],
  ['/go/warthunder/', CHECKOUT_URLS.warthunder],
  ['/go/skin-changer', CHECKOUT_URLS.skinChanger],
  ['/go/skin-changer/', CHECKOUT_URLS.skinChanger],
  ['/go/hwid-spoofer', CHECKOUT_URLS.hwidSpoofer],
  ['/go/hwid-spoofer/', CHECKOUT_URLS.hwidSpoofer],
  ['/go/ugc', CHECKOUT_URLS.ugc],
  ['/go/ugc/', CHECKOUT_URLS.ugc],
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}
