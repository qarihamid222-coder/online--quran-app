/**
 * Site-wide image slots that aren't tied to a specific course. Set `HERO_IMAGE`
 * once a real photo is added, to show it instead of the "Photo coming soon"
 * placeholder.
 *
 * Upload to: public/images/academy/hero-banner.<ext>
 */
export const HERO_IMAGE: { src: string; alt: string } | null = {
  src: '/images/academy/hero-banner.webp',
  alt: 'Al-Hameed Academy — Online Quran, Arabic & Islamic Studies banner, with icons for Quran Reading, Arabic Language, Tajweed Classes, and For All Ages, a Quran on a wooden stand, golden lanterns, and a mosque visible through an arched window',
};

/**
 * Shown beside the "For every age, every level" audience section, once a real
 * photo is added, instead of the "Photo coming soon" placeholder.
 *
 * Upload to: public/images/academy/audience-online-class.<ext>
 */
export const AUDIENCE_IMAGE: { src: string; alt: string } | null = {
  src: '/images/academy/audience-online-class.webp',
  alt: 'A teacher guiding children through Quran reading at a wooden stand while other children study with laptops and headphones, with a mosque visible through the window behind them',
};
