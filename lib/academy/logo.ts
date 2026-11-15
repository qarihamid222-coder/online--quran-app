/**
 * The official Al-Hameed Online Quran Academy logo, in the files under
 * `public/images/brand/`:
 *  - `logo.webp`      the full lockup (emblem, name, course icons), transparent background
 *  - `logo-mark.webp` the emblem alone, cropped from the same artwork for small sizes
 *
 * The browser-tab icons (`app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`) and the
 * social-share cards (`app/opengraph-image.png`, `app/twitter-image.png`) are derived from
 * the same artwork. Both logo files have transparent backgrounds with navy lettering, so
 * show them on a light surface (see the Navbar and Footer).
 */
export const ACADEMY_LOGO = {
  alt: 'Al-Hameed Online Quran Academy',
  full: { src: '/images/brand/logo.webp', width: 975, height: 1000 },
  mark: { src: '/images/brand/logo-mark.webp', width: 600, height: 409 },
} as const;
