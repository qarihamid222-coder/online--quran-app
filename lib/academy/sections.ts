/**
 * The homepage sections that other parts of the site link to. The navbar,
 * footer, hero and each section's `id` all use these, so a navigation link can
 * never point at a section that does not exist (see tests/lib/academy/sections.test.ts).
 */
export const SECTION_IDS = {
  about: 'about',
  courses: 'courses',
  programs: 'programs',
  teachers: 'teachers',
  howItWorks: 'how-it-works',
  trial: 'free-trial',
  testimonials: 'testimonials',
  faq: 'faq',
  contact: 'contact',
} as const;

export type SectionKey = keyof typeof SECTION_IDS;

/** Homepage links shown in the navbar and footer, in order. */
export const HOME_NAV_LINKS: { label: string; section: SectionKey }[] = [
  { label: 'Courses', section: 'courses' },
  { label: 'Teachers', section: 'teachers' },
  { label: 'FAQ', section: 'faq' },
  { label: 'Contact', section: 'contact' },
];

export function sectionHref(section: SectionKey): string {
  return `/#${SECTION_IDS[section]}`;
}
