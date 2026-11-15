import { existsSync } from 'node:fs';
import path from 'node:path';

/**
 * The academy's official logo, if one has been supplied.
 *
 * To use it, drop the file at `public/images/brand/logo.<ext>` (svg, png, webp
 * or jpg — a transparent-background SVG or PNG is best) and it appears in the
 * navbar and footer automatically. Until then the site shows the academy name
 * as a text wordmark: no logo is invented or substituted.
 *
 * Server-only (reads the filesystem); import it from Server Components.
 */
const LOGO_EXTENSIONS = ['svg', 'png', 'webp', 'jpg', 'jpeg'] as const;

export interface AcademyLogo {
  src: string;
  alt: string;
}

export function getAcademyLogo(): AcademyLogo | null {
  for (const extension of LOGO_EXTENSIONS) {
    const file = `logo.${extension}`;
    if (existsSync(path.join(process.cwd(), 'public', 'images', 'brand', file))) {
      return { src: `/images/brand/${file}`, alt: 'Al-Hameed Online Quran Academy' };
    }
  }
  return null;
}
