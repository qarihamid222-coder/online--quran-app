import Image from 'next/image';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { AUDIENCE_LABELS, COURSES, type Audience } from '@/lib/academy/courses';
import { AUDIENCE_IMAGE } from '@/lib/academy/images';
import { SECTION_IDS } from '@/lib/academy/sections';
import { SectionHeading } from './SectionHeading';

// Each program lists the courses that suit it, taken from the course data, so the
// two can never disagree. The colours match the course-card audience badges.
const PROGRAMS: {
  audience: Audience;
  title: string;
  description: string;
  colorClass: string;
  glyph: string;
}[] = [
  {
    audience: 'children',
    title: 'Children’s program',
    description:
      'A gentle, encouraging start — Noorani Qaida and Nazra classes paced for young learners.',
    colorClass: 'bg-primary/15 text-primary',
    glyph: '١',
  },
  {
    audience: 'adults',
    title: 'Adults’ program',
    description:
      'Flexible learning for working professionals, parents, and anyone starting (or restarting) their Quran journey.',
    colorClass: 'bg-emerald/15 text-emerald',
    glyph: '٢',
  },
  {
    audience: 'beginners',
    title: 'Beginners’ program',
    description:
      "No prior knowledge needed. Every course starts from the basics, in the language you're most comfortable in.",
    colorClass: 'bg-accent/15 text-gold-text',
    glyph: '٣',
  },
];

export function AudienceSection() {
  return (
    <section
      id={SECTION_IDS.programs}
      className="section-royal relative overflow-hidden px-4 py-20 sm:px-6 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pattern-islamic absolute inset-0 [mask-image:radial-gradient(ellipse_at_right,black,transparent_70%)] opacity-40"
      />
      <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          {/* Offset gold frame behind the photo */}
          <div
            aria-hidden="true"
            className="border-accent/60 absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border-2"
          />
          {AUDIENCE_IMAGE ? (
            <div className="relative h-72 w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-black/40 sm:h-96">
              <Image
                src={AUDIENCE_IMAGE.src}
                alt={AUDIENCE_IMAGE.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
          ) : (
            <ImagePlaceholder
              label="Students in an online class — photo coming soon"
              className="relative h-72 w-full rounded-[2rem] sm:h-96"
            />
          )}
        </div>
        <div>
          <SectionHeading
            align="left"
            eyebrow="Learning programs"
            title="For every age, every level"
          />
          <ul className="mt-10 flex flex-col gap-4">
            {PROGRAMS.map((program) => {
              const courses = COURSES.filter((course) =>
                course.audience.includes(program.audience),
              );
              return (
                <li
                  key={program.audience}
                  className="reveal border-card-border bg-surface/80 hover:border-accent/70 flex gap-4 rounded-2xl border p-5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30"
                >
                  <span
                    aria-hidden="true"
                    className={`font-quran grid size-12 shrink-0 place-items-center rounded-xl text-2xl ${program.colorClass}`}
                  >
                    {program.glyph}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-heading text-lg font-semibold">{program.title}</h3>
                    <p className="mt-1 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {program.description}
                    </p>
                    <p className="sr-only">
                      Courses for {AUDIENCE_LABELS[program.audience]}:{' '}
                      {courses.map((course) => course.name).join(', ')}.
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2" aria-hidden="true">
                      {courses.map((course) => (
                        <li
                          key={course.slug}
                          className="border-card-border text-heading rounded-full border px-3 py-1 text-xs font-medium"
                        >
                          {course.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
