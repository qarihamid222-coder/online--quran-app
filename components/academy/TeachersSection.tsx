import { whatsappLink } from '@/lib/academy/contact';
import { SECTION_IDS } from '@/lib/academy/sections';
import { GOLD_BUTTON, OUTLINE_BUTTON } from '@/components/ui/buttonStyles';
import { CheckIcon, UsersIcon } from './icons';
import { SectionHeading } from './SectionHeading';

const TEACHER_TYPES = [
  {
    title: 'Male teachers',
    text: 'Available for students who prefer to learn with a male teacher.',
    request: 'a male teacher',
  },
  {
    title: 'Female teachers',
    text: 'Available for students who prefer to learn with a female teacher.',
    request: 'a female teacher',
  },
];

const STEPS = [
  'Tell us your preference on WhatsApp or in the enquiry form.',
  'We confirm the match with you personally.',
  'Begin with your free 3-day trial class.',
];

export function TeachersSection() {
  return (
    <section id={SECTION_IDS.teachers} className="relative px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Our teachers"
          title="Qualified male and female teachers"
          description="Learn with a teacher you feel comfortable with. Both male and female teachers are available, and you can tell us your preference when you request your free trial."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <ul className="grid gap-6 sm:grid-cols-2">
            {TEACHER_TYPES.map((type) => (
              <li
                key={type.title}
                className="reveal border-card-border bg-surface hover:border-accent/70 flex flex-col rounded-3xl border p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30"
              >
                <span className="bg-accent/15 text-gold-text ring-accent/30 grid size-14 place-items-center rounded-2xl ring-1">
                  <UsersIcon className="size-7" />
                </span>
                <h3 className="font-display text-heading mt-6 text-2xl font-semibold">
                  {type.title}
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {type.text}
                </p>
                <a
                  href={whatsappLink(
                    `Assalam o Alaikum! I would like to request ${type.request} for a free 3-day trial class.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${OUTLINE_BUTTON} mt-6`}
                >
                  Request {type.request.replace('a ', 'a ')}
                </a>
              </li>
            ))}
          </ul>

          <div className="reveal border-accent/40 from-navy-1 to-navy-2 relative overflow-hidden rounded-3xl border bg-gradient-to-br p-8 text-white shadow-2xl shadow-black/30">
            <div aria-hidden="true" className="pattern-islamic absolute inset-0 opacity-40" />
            <div className="relative">
              <h3 className="font-display text-2xl font-semibold">How we match you</h3>
              <ol className="mt-6 space-y-4">
                {STEPS.map((step) => (
                  <li key={step} className="flex gap-3 text-base leading-relaxed text-blue-100">
                    <CheckIcon className="text-accent mt-1 size-5 shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <a
                href={whatsappLink(
                  'Assalam o Alaikum! I would like to start a free 3-day trial class.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={`${GOLD_BUTTON} mt-8`}
              >
                Start Free 3-Day Trial
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
