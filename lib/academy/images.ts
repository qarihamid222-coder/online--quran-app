/**
 * Site-wide image slots that aren't tied to a specific course. Set `HERO_IMAGE`
 * once a real photo is added, to show it instead of the "Photo coming soon"
 * placeholder.
 *
 * Upload to: public/images/academy/hero-children-learning.<ext>
 */
export const HERO_IMAGE: { src: string; alt: string } | null = {
  src: '/images/academy/hero-children-learning.webp',
  alt: 'A teacher guiding children through Quran reading at a wooden stand while other children study with laptops and headphones, with a mosque visible through the window behind them',
};
