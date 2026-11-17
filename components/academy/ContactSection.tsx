import Link from 'next/link';
import { CONTACT_EMAIL, PHONE_DISPLAY, whatsappLink } from '@/lib/academy/contact';
import { SECTION_IDS } from '@/lib/academy/sections';
import { GOLD_BUTTON, OUTLINE_BUTTON } from '@/components/ui/buttonStyles';
import { ChatIcon, MailIcon, SparkIcon } from './icons';
import { SectionHeading } from './SectionHeading';

export function ContactSection() {
  return (
    <section
      id={SECTION_IDS.contact}
      className="section-royal relative overflow-hidden px-4 py-20 sm:px-6 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pattern-zellige animate-pattern-drift absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)] opacity-25"
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact us"
          title="Let’s begin your Quran journey"
          description="Message us on WhatsApp for the quickest reply, or send an email. We are happy to answer every question about classes, teachers and the free trial."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <div className="reveal border-accent/50 from-navy-1 to-navy-2 relative flex flex-col overflow-hidden rounded-3xl border bg-gradient-to-br p-8 text-white shadow-2xl shadow-black/30 lg:col-span-2">
            <div aria-hidden="true" className="pattern-islamic absolute inset-0 opacity-30" />
            <div className="relative flex h-full flex-col lg:justify-center">
              <span className="bg-accent/15 text-accent ring-accent/40 grid size-14 place-items-center rounded-2xl ring-1">
                <ChatIcon className="size-7" />
              </span>
              <h3 className="font-display mt-6 text-3xl font-semibold">Message us on WhatsApp</h3>
              <p className="mt-3 max-w-xl text-lg leading-relaxed text-blue-100">
                The fastest way to ask a question, request a male or female teacher, or book your
                free 3-day trial class.
              </p>
              <p className="mt-8 text-sm tracking-wide text-blue-200">WhatsApp: {PHONE_DISPLAY}</p>
              <div className="mt-4">
                <a
                  href={whatsappLink(
                    'Assalam o Alaikum! I would like to know more about the academy.',
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={GOLD_BUTTON}
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          <ul className="grid gap-6">
            <li className="reveal border-card-border bg-surface hover:border-accent/70 rounded-3xl border p-7 shadow-sm transition duration-300 hover:-translate-y-1">
              <span className="bg-accent/15 text-gold-text ring-accent/30 grid size-12 place-items-center rounded-2xl ring-1">
                <MailIcon className="size-6" />
              </span>
              <h3 className="font-display text-heading mt-4 text-xl font-semibold">Email us</h3>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary mt-2 inline-block text-sm font-medium [overflow-wrap:anywhere] underline-offset-4 hover:underline sm:text-base lg:text-sm xl:text-base"
              >
                {CONTACT_EMAIL}
              </a>
            </li>
            <li className="reveal border-card-border bg-surface hover:border-accent/70 rounded-3xl border p-7 shadow-sm transition duration-300 hover:-translate-y-1">
              <span className="bg-accent/15 text-gold-text ring-accent/30 grid size-12 place-items-center rounded-2xl ring-1">
                <SparkIcon className="size-6" />
              </span>
              <h3 className="font-display text-heading mt-4 text-xl font-semibold">
                Prefer a form?
              </h3>
              <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
                Tell us about the student and we will reach out on WhatsApp.
              </p>
              <Link href={`#${SECTION_IDS.trial}`} className={`${OUTLINE_BUTTON} mt-4`}>
                Open the trial form
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
