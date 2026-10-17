export type Audience = 'children' | 'adults' | 'beginners';

export interface Course {
  slug: string;
  name: string;
  urduName: string;
  description: string;
  audience: Audience[];
  /** Set once a real photo is added to public/images/courses/; null shows a placeholder. */
  image: { src: string; alt: string } | null;
}

export const AUDIENCE_LABELS: Record<Audience, string> = {
  children: 'Children',
  adults: 'Adults',
  beginners: 'Beginners',
};

/** Ties each audience tag to one of the three theme colors, so course cards
 *  carry a visible, balanced mix of green, gold, and red rather than one
 *  color dominating. */
export const AUDIENCE_BADGE_CLASSES: Record<Audience, string> = {
  children: 'bg-primary/10 text-primary dark:bg-primary/15',
  adults: 'bg-danger/10 text-danger dark:bg-danger/15',
  beginners: 'bg-accent/10 text-accent-foreground dark:bg-accent/20 dark:text-accent',
};

export const COURSES: Course[] = [
  {
    slug: 'noorani-qaida',
    name: 'Noorani Qaida',
    urduName: 'نورانی قاعدہ',
    description:
      'The first step on the journey: Arabic letters, correct pronunciation, and the basic rules of reading. The right foundation for young children and absolute beginners.',
    audience: ['children', 'beginners'],
    image: null,
  },
  {
    slug: 'nazra-quran',
    name: 'Nazra Quran',
    urduName: 'ناظرہ قرآن',
    description:
      'Learn to read the Holy Quran fluently in Arabic, ayah by ayah and surah by surah, with a qualified teacher guiding every lesson.',
    audience: ['children', 'adults', 'beginners'],
    image: null,
  },
  {
    slug: 'quran-tajweed',
    name: 'Quran Tajweed',
    urduName: 'قرآن تجوید',
    description:
      'Master the rules of Tajweed to recite the Quran with the correct pronunciation, exactly as it was revealed.',
    audience: ['children', 'adults'],
    image: null,
  },
  {
    slug: 'hifz-ul-quran',
    name: 'Hifz-ul-Quran',
    urduName: 'حفظ القرآن',
    description:
      'Memorize the complete Holy Quran with a structured daily plan, regular revision, and one-on-one guidance from a Hifz teacher.',
    audience: ['children', 'adults'],
    image: null,
  },
  {
    slug: 'arabic-grammar',
    name: 'Arabic Grammar',
    urduName: 'عربی گرامر',
    description:
      'Understand Quranic Arabic grammar (Nahw & Sarf) to connect directly with the meaning of the Quran, beyond translation.',
    audience: ['adults', 'beginners'],
    image: null,
  },
  {
    slug: 'arabic-language',
    name: 'Arabic Language',
    urduName: 'عربی زبان',
    description:
      'Learn to read, write, and speak Arabic for everyday life and for a deeper understanding of the Quran and Islamic texts.',
    audience: ['adults', 'beginners'],
    image: null,
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find((course) => course.slug === slug);
}
