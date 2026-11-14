import Image from 'next/image';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { AUDIENCE_IMAGE } from '@/lib/academy/images';
import { SectionHeading } from './SectionHeading';

// Each audience is tied to one of the three theme colors (matching the
// course-card badges), so blue, gold, and red are all clearly present here.
const AUDIENCES = [
  {
    title: 'Children',
    description:
      'A gentle, encouraging start — Noorani Qaida and Nazra classes paced for young learners.',
    colorClass: 'bg-primary/10 text-primary',
    glyph: '١',
  },
  {
    title: 'Adults',
    description:
      'Flexible class times for working professionals, parents, and anyone starting (or restarting) their Quran journey.',
    colorClass: 'bg-danger/10 text-danger',
    glyph: '٢',
  },
  {
    title: 'Beginners',
    description:
      "No prior knowledge needed. Every course starts from the basics, in the language you're most comfortable in.",
    colorClass: 'bg-accent/15 text-accent-foreground dark:text-accent',
    glyph: '٣',
  },
];

export function AudienceSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          {/* Offset gold frame behind the photo */}
          <div
            aria-hidden="true"
            className="border-accent/60 absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border-2"
          />
          {AUDIENCE_IMAGE ? (
            <div className="relative h-72 w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-blue-900/15 sm:h-96">
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
          <SectionHeading align="left" eyebrow="Who we teach" title="For every age, every level" />
          <dl className="mt-10 flex flex-col gap-4">
            {AUDIENCES.map((item) => (
              <div
                key={item.title}
                className="border-card-border bg-surface flex gap-4 rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span
                  aria-hidden="true"
                  className={`font-quran grid size-12 shrink-0 place-items-center rounded-xl text-2xl ${item.colorClass}`}
                >
                  {item.glyph}
                </span>
                <div>
                  <dt className="text-heading text-lg font-semibold">{item.title}</dt>
                  <dd className="mt-1 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {item.description}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
