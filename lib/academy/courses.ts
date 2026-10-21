export type Audience = 'children' | 'adults' | 'beginners';

export interface Course {
  slug: string;
  name: string;
  urduName: string;
  description: string;
  audience: Audience[];
  /**
   * Set once a real photo is added, to show it instead of the "Photo coming
   * soon" placeholder. To add one: drop the file at
   * `public/images/courses/<slug>.<ext>` (e.g. `public/images/courses/noorani-qaida.jpg`
   * for the Noorani Qaida course below — any common image format works, not
   * just `.jpg`) and set this field to
   * `{ src: '/images/courses/<slug>.<ext>', alt: 'A short description of the photo' }`.
   */
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
    // Upload to: public/images/courses/noorani-qaida.jpg
    image: null,
  },
  {
    slug: 'nazra-quran',
    name: 'Nazra Quran',
    urduName: 'ناظرہ قرآن',
    description:
      'Learn to read the Holy Quran fluently in Arabic, ayah by ayah and surah by surah, with a qualified teacher guiding every lesson.',
    audience: ['children', 'adults', 'beginners'],
    // Upload to: public/images/courses/nazra-quran.jpg
    image: null,
  },
  {
    slug: 'quran-tajweed',
    name: 'Quran Tajweed',
    urduName: 'قرآن تجوید',
    description:
      'Master the rules of Tajweed to recite the Quran with the correct pronunciation, exactly as it was revealed.',
    audience: ['children', 'adults'],
    image: {
      src: '/images/courses/quran-tajweed.webp',
      alt: 'A teacher guiding four children through Quran recitation and Tajweed, each reading from their own Quran on a wooden stand',
    },
  },
  {
    slug: 'hifz-ul-quran',
    name: 'Hifz-ul-Quran',
    urduName: 'حفظ القرآن',
    description:
      'Memorize the complete Holy Quran with a structured daily plan, regular revision, and one-on-one guidance from a Hifz teacher.',
    audience: ['children', 'adults'],
    // Upload to: public/images/courses/hifz-ul-quran.webp — still needed: a
    // photo of children memorizing the Quran with their teacher. The two
    // "Hifz" photos supplied so far were identical to each other and to the
    // one used for the homepage hero, and showed no teacher, so this slot
    // is left as a placeholder rather than reusing that photo here too.
    image: null,
  },
  {
    slug: 'arabic-grammar',
    name: 'Arabic Grammar',
    urduName: 'عربی گرامر',
    description:
      'Understand Quranic Arabic grammar (Nahw & Sarf) to connect directly with the meaning of the Quran, beyond translation.',
    audience: ['adults', 'beginners'],
    image: {
      src: '/images/courses/arabic-grammar.webp',
      alt: 'A teacher pointing to an Arabic grammar lesson on a whiteboard, with students writing notes at their desks',
    },
  },
  {
    slug: 'arabic-language',
    name: 'Arabic Language',
    urduName: 'عربی زبان',
    description:
      'Learn to read, write, and speak Arabic for everyday life and for a deeper understanding of the Quran and Islamic texts.',
    audience: ['adults', 'beginners'],
    image: {
      src: '/images/courses/arabic-language.webp',
      alt: 'A teacher pointing to Arabic vocabulary words on a whiteboard, with students writing notes at their desks',
    },
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return COURSES.find((course) => course.slug === slug);
}
