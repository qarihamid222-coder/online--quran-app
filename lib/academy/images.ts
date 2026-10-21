/**
 * Site-wide image slots that aren't tied to a specific course. Set `HERO_IMAGE`
 * once a real photo is added, to show it instead of the "Photo coming soon"
 * placeholder.
 *
 * Upload to: public/images/academy/hero-children-learning.<ext>
 */
export const HERO_IMAGE: { src: string; alt: string } | null = {
  src: '/images/academy/hero-children-learning.webp',
  alt: 'Four children reading from the Holy Quran together at a table, with a mosque visible through the window behind them',
};
