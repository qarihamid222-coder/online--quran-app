import Link from 'next/link';
import { CONTACT_EMAIL, PHONE_DISPLAY, whatsappLink } from '@/lib/academy/contact';

export interface LegalSection {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
  /** Short paragraph shown after the list. */
  after?: string;
}

interface LegalPageProps {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  contactMessage: string;
  otherPage: { href: string; label: string };
}

export function LegalPage({
  title,
  updated,
  intro,
  sections,
  contactMessage,
  otherPage,
}: LegalPageProps) {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <header className="border-card-border border-b pb-6">
        <p className="text-primary text-sm font-semibold">Al-Hameed Online Quran Academy</p>
        <h1 className="text-heading mt-1 text-3xl font-semibold">{title}</h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Last updated: {updated}</p>
        <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">{intro}</p>
      </header>

      <nav
        aria-label="On this page"
        className="bg-surface-soft border-card-border mt-6 rounded-xl border p-4"
      >
        <p className="text-heading text-sm font-semibold">On this page</p>
        <ol className="mt-1 grid list-decimal gap-x-6 pl-5 text-sm sm:grid-cols-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-primary inline-flex min-h-11 items-center underline-offset-2 hover:underline"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-8 flex flex-col gap-8">
        {sections.map((section, index) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="text-heading text-xl font-semibold">
              {index + 1}. {section.title}
            </h2>
            {section.paragraphs?.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-3 text-base leading-relaxed [overflow-wrap:anywhere] text-zinc-700 dark:text-zinc-300"
              >
                {paragraph}
              </p>
            ))}
            {section.items ? (
              <ul className="mt-3 list-disc space-y-1.5 pl-6 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.after ? (
              <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                {section.after}
              </p>
            ) : null}
          </section>
        ))}
      </div>

      <aside className="bg-surface-soft border-card-border mt-10 rounded-2xl border p-5 sm:p-6">
        <h2 className="text-heading text-lg font-semibold">Questions?</h2>
        <p className="mt-2 text-base text-zinc-700 dark:text-zinc-300">
          Message us on WhatsApp at{' '}
          <a
            href={whatsappLink(contactMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium underline-offset-2 hover:underline"
          >
            {PHONE_DISPLAY}
          </a>
          , or email{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-primary font-medium [overflow-wrap:anywhere] underline-offset-2 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </aside>

      <nav className="border-card-border mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-sm font-medium">
        <Link
          href="/"
          className="hover:text-primary inline-flex min-h-11 items-center text-zinc-600 dark:text-zinc-400"
        >
          ← Back to home
        </Link>
        <Link
          href={otherPage.href}
          className="text-primary inline-flex min-h-11 items-center hover:underline"
        >
          {otherPage.label} →
        </Link>
      </nav>
    </article>
  );
}
