import Link from 'next/link';
import { whatsappLink } from '@/lib/academy/contact';
import { SECTION_IDS } from '@/lib/academy/sections';
import { GOLD_BUTTON, OUTLINE_BUTTON } from '@/components/ui/buttonStyles';
import { BookIcon, SparkIcon, UsersIcon, VideoIcon } from './icons';
import { SectionHeading } from './SectionHeading';

const PILLARS = [
  {
    icon: VideoIcon,
    title: 'Live one-on-one classes',
    text: 'Every lesson is live and personal, so the teacher can give the student their full attention.',
  },
  {
    icon: BookIcon,
    title: 'Quran and Arabic',
    text: 'Noorani Qaida, Nazra, Tajweed, Hifz, Arabic Grammar and Arabic Language.',
  },
  {
    icon: UsersIcon,
    title: 'All ages and levels',
    text: 'Children, adults and complete beginners are all welcome, whatever their starting point.',
  },
  {
    icon: SparkIcon,
    title: 'Free 3-day trial',
    text: 'Try a class first, with no payment and no commitment.',
  },
];

export function AboutSection() {
  return (
    <section
      id={SECTION_IDS.about}
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pattern-zellige absolute inset-0 [mask-image:radial-gradient(ellipse_at_left,black,transparent_65%)] opacity-30"
      />
      <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <div>
          <SectionHeading
            align="left"
            eyebrow="About the academy"
            title="Learn the Quran with focus, care and clarity"
            description="Al-Hameed Online Quran Academy teaches the Quran and Arabic through live one-on-one online classes, for children, adults and complete beginners, from the comfort of home."
          />
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href={whatsappLink(
                'Assalam o Alaikum! I would like to start a free 3-day trial class.',
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={GOLD_BUTTON}
            >
              Start Free 3-Day Trial
            </a>
            <Link href={`#${SECTION_IDS.courses}`} className={OUTLINE_BUTTON}>
              Explore Courses
            </Link>
          </div>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2">
          {PILLARS.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="reveal border-card-border bg-surface/80 hover:border-accent/70 group rounded-3xl border p-6 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30"
            >
              <span className="bg-accent/15 text-gold-text ring-accent/30 grid size-12 place-items-center rounded-2xl ring-1 transition-transform duration-300 group-hover:scale-110">
                <Icon className="size-6" />
              </span>
              <h3 className="font-display text-heading mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
