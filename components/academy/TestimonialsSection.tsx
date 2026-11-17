import { TESTIMONIALS } from '@/lib/academy/testimonials';
import { SECTION_IDS } from '@/lib/academy/sections';
import { QuoteIcon } from './icons';
import { SectionHeading } from './SectionHeading';

/**
 * Real student and parent testimonials. Renders nothing at all until
 * `TESTIMONIALS` (lib/academy/testimonials.ts) has real entries, so the page
 * never shows a placeholder or an invented quote.
 */
export function TestimonialsSection() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section id={SECTION_IDS.testimonials} className="bg-surface px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Testimonials" title="Words from our students and parents" />
        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <li
              key={item.id}
              className="reveal border-card-border bg-background flex flex-col rounded-3xl border p-8 shadow-sm"
            >
              <QuoteIcon className="text-gold-text size-8" />
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                {item.quote}
              </blockquote>
              <p className="text-heading mt-6 font-semibold">{item.name}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {item.role}
                {item.location ? ` · ${item.location}` : ''}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
