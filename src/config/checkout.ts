import { CHECKOUT_URLS } from './checkout-redirects.mjs';

/** External checkout destinations (Levocheats affiliate links). */
export const CHECKOUT = CHECKOUT_URLS;

export type CheckoutProduct = keyof typeof CHECKOUT;

/** URL slug for /go/[slug]/ checkout redirect pages. */
export const CHECKOUT_SLUGS: Record<CheckoutProduct, string> = {
  warthunder: 'warthunder',
  skinChanger: 'skin-changer',
  hwidSpoofer: 'hwid-spoofer',
  ugc: 'ugc',
};

export const CHECKOUT_SLUG_TO_PRODUCT = Object.fromEntries(
  Object.entries(CHECKOUT_SLUGS).map(([product, slug]) => [slug, product as CheckoutProduct]),
) as Record<string, CheckoutProduct>;

/** Checkout href used on Buy / Get Access buttons (direct affiliate URL). */
export function checkoutPath(product: CheckoutProduct = 'warthunder'): string {
  return CHECKOUT[product];
}

/** Default product checkout URL. */
export const PRIMARY_CHECKOUT_PATH = checkoutPath('warthunder');

/** Map internal product slugs to checkout URLs. */
export function checkoutForSlug(slug: string): string {
  switch (slug) {
    case 'unlock-all':
      return checkoutPath('skinChanger');
    case 'hwid-spoofer':
      return checkoutPath('hwidSpoofer');
    case 'ugc':
    case 'account-recovery':
      return checkoutPath('ugc');
    case 'lite':
    case 'pro':
    case 'elite':
    default:
      return checkoutPath('warthunder');
  }
}

/** Resolve blog CTA or legacy href values to live checkout URLs. */
export function resolveCheckoutHref(href: string): string {
  const normalized = href.startsWith('http') || href.startsWith('/') ? href : `/${href}`;

  // Legacy /go/* paths → external checkout
  const goMatch = normalized.match(/^\/go\/([^/?#]+)\/?/);
  if (goMatch) {
    const product = CHECKOUT_SLUG_TO_PRODUCT[goMatch[1]!];
    if (product) return checkoutPath(product);
  }

  if (normalized.startsWith('http')) {
    for (const [product, url] of Object.entries(CHECKOUT) as [CheckoutProduct, string][]) {
      if (normalized === url || normalized.startsWith(`${url}?`) || normalized.startsWith(`${url}/`)) {
        return checkoutPath(product);
      }
    }

    // Legacy / encoded product paths → checkout
    if (normalized.includes('%2Fproducts%2Fcloud-dma') || normalized.includes('/products/cloud-dma')) {
      return checkoutPath('warthunder');
    }
    if (normalized.includes('%2Fproducts%2Fskin-changer') || normalized.includes('/products/skin-changer')) {
      return checkoutPath('skinChanger');
    }
    if (normalized.includes('%2Fproducts%2Fhwid-spoofer') || normalized.includes('/products/hwid-spoofer')) {
      return checkoutPath('hwidSpoofer');
    }
    if (normalized.includes('%2Fproducts%2Fugc') || normalized.includes('/products/ugc')) {
      return checkoutPath('ugc');
    }
    if (normalized.includes('%2Fproducts%2Fwarthunder') || normalized.includes('/products/warthunder')) {
      return checkoutPath('warthunder');
    }
  }

  return normalized;
}
