import { whatsappLink } from '@/lib/academy/contact';
import { FAQ_ITEMS } from '@/lib/academy/faq';
import { SECTION_IDS } from '@/lib/academy/sections';
import { OUTLINE_BUTTON } from '@/components/ui/buttonStyles';
import { ChevronDownIcon } from './icons';
import { SectionHeading } from './SectionHeading';

export function FaqSection() {
  return (
    <section id={SECTION_IDS.faq} className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Frequently asked questions"
          title="Everything you may want to know"
          description="Quick answers about classes, the free trial, teachers and enrolment."
        />

        {/* Native <details> disclosure: keyboard and screen-reader accessible, no script needed. */}
        <div className="mt-12 space-y-3">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="group border-card-border bg-surface open:border-accent/60 rounded-2xl border shadow-sm transition-colors open:shadow-lg"
            >
              <summary className="text-heading flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left text-base font-semibold sm:text-lg [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <ChevronDownIcon className="text-gold-text size-5 shrink-0 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="px-5 pb-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="text-base text-zinc-600 dark:text-zinc-400">Still have a question?</p>
          <a
            href={whatsappLink('Assalam o Alaikum! I have a question about the academy.')}
            target="_blank"
            rel="noopener noreferrer"
            className={OUTLINE_BUTTON}
          >
            Ask us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
