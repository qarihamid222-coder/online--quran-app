import { SECTION_IDS } from '@/lib/academy/sections';
import { SectionHeading } from './SectionHeading';

const STEPS = [
  {
    title: 'Book a free trial',
    description: 'Message us on WhatsApp or fill in the short form — no payment, no commitment.',
  },
  {
    title: 'Meet your teacher',
    description:
      "Attend a live one-on-one class so we can understand the student's level and goals.",
  },
  {
    title: 'Learn with confidence',
    description: 'Continue with a steady plan, regular practice, and guidance at every step.',
  },
];

export function HowItWorks() {
  return (
    <section
      id={SECTION_IDS.howItWorks}
      className="section-royal relative overflow-hidden px-4 py-20 sm:px-6 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pattern-islamic absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)] opacity-40"
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Getting started"
          title="Begin in three simple steps"
          description="From your first message to your first class, we keep it easy."
        />
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="reveal border-card-border bg-surface/80 hover:border-accent/70 relative rounded-3xl border p-8 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30"
            >
              <span className="font-display text-gold-text/80 text-6xl leading-none font-semibold">
                {index + 1}
              </span>
              <h3 className="font-display text-heading mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
