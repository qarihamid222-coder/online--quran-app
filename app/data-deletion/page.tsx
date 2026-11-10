import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT_EMAIL, PHONE_DISPLAY, whatsappLink } from '@/lib/academy/contact';

export const metadata: Metadata = {
  title: 'Data Deletion Instructions — Al-Hameed Online Quran Academy',
  description:
    'How students and parents can ask Al-Hameed Online Quran Academy to delete their personal information.',
};

const UPDATED = '10 November 2026';

// The email option is shown only once a real address replaces the placeholder in lib/academy/contact.ts.
const HAS_EMAIL = !CONTACT_EMAIL.toLowerCase().endsWith('@example.com');

const REQUEST_MESSAGE = [
  'Assalam o Alaikum! I would like to request deletion of my information.',
  'Student name:',
  'Parent/guardian name (if any):',
  'WhatsApp number used to contact you:',
  'Course I enquired about:',
  'Approximate date of enquiry:',
  'Please delete: everything / (specify)',
].join('\n');

const STEPS = [
  {
    title: 'Send your request',
    text: 'Contact us using one of the options below. For a child, the request should come from a parent or guardian.',
  },
  {
    title: 'We confirm who you are',
    text: 'We check that the request comes from the person who contacted us, so that nobody can delete or see someone else’s information.',
  },
  {
    title: 'We delete your information',
    text: 'We delete the personal information we hold about the enquiry or student, as described below.',
  },
  {
    title: 'We confirm by message',
    text: 'We tell you when your information has been deleted, using the contact method you used to ask.',
  },
];

const CARD = 'bg-surface border-card-border rounded-2xl border p-5 sm:p-6';
const BODY = 'text-base leading-relaxed text-zinc-700 dark:text-zinc-300';
const H2 = 'text-heading text-xl font-semibold';

export default function DataDeletionPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <header className="border-card-border border-b pb-6">
        <p className="text-primary text-sm font-semibold">Al-Hameed Online Quran Academy</p>
        <h1 className="text-heading mt-1 text-3xl font-semibold">Data Deletion Instructions</h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Last updated: {UPDATED}</p>
        <p className={`mt-4 ${BODY}`}>
          Students and parents can ask us to delete the personal information we hold about them at
          any time. This page explains how to make a request and what happens next. It should be
          read together with our{' '}
          <Link href="/privacy-policy" className="text-primary underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </header>

      <section className="mt-8" aria-labelledby="how-heading">
        <h2 id="how-heading" className={H2}>
          How the process works
        </h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-2">
          {STEPS.map((step, index) => (
            <li key={step.title} className={CARD}>
              <span
                aria-hidden="true"
                className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold"
              >
                {index + 1}
              </span>
              <h3 className="text-heading mt-3 text-lg font-semibold">{step.title}</h3>
              <p className={`mt-1 ${BODY}`}>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className={H2}>
          How to contact us
        </h2>
        <div className={`mt-4 grid gap-4 ${HAS_EMAIL ? 'sm:grid-cols-2' : ''}`}>
          <div className={CARD}>
            <h3 className="text-heading text-lg font-semibold">WhatsApp</h3>
            <p className={`mt-1 ${BODY}`}>
              Message us at {PHONE_DISPLAY}. The button below opens WhatsApp with a message you can
              complete and send.
            </p>
            <a
              href={whatsappLink(REQUEST_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground mt-4 inline-flex min-h-11 items-center rounded-full px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
            >
              Request deletion on WhatsApp
            </a>
          </div>
          {HAS_EMAIL ? (
            <div className={CARD}>
              <h3 className="text-heading text-lg font-semibold">Email</h3>
              <p className={`mt-1 ${BODY}`}>
                Write to{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Data deletion request')}`}
                  className="text-primary font-medium underline-offset-2 hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>{' '}
                with the subject “Data deletion request” and include the details listed below.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="details-heading">
        <h2 id="details-heading" className={H2}>
          Information to include
        </h2>
        <p className={`mt-3 ${BODY}`}>
          So that we can find your enquiry and confirm it is yours, please tell us:
        </p>
        <ul className={`mt-3 list-disc space-y-1.5 pl-6 ${BODY}`}>
          <li>The student’s name</li>
          <li>The parent or guardian’s name, if you gave one</li>
          <li>The WhatsApp number you used when you contacted us</li>
          <li>The course you enquired about</li>
          <li>Roughly when you contacted us</li>
          <li>Whether you want everything deleted or only certain information</li>
        </ul>
        <p className={`mt-3 ${BODY}`}>
          We will not ask for passwords or payment card details. If we cannot match your request to
          an enquiry, we may ask you one or two questions about it before going ahead.
        </p>
      </section>

      <section className="mt-10" aria-labelledby="deleted-heading">
        <h2 id="deleted-heading" className={H2}>
          What we delete
        </h2>
        <p className={`mt-3 ${BODY}`}>
          Once your identity is confirmed, we delete the information we hold about you or your child
          that came from your enquiry and classes. This can include:
        </p>
        <ul className={`mt-3 list-disc space-y-1.5 pl-6 ${BODY}`}>
          <li>Names, age and WhatsApp number</li>
          <li>Your enquiry and course choice</li>
          <li>Our conversations with you, and any class scheduling notes about the student</li>
        </ul>
        <p className={`mt-3 ${BODY}`}>
          We will also stop contacting you, unless you tell us you would like us to continue.
        </p>
      </section>

      <section className="mt-10" aria-labelledby="limits-heading">
        <h2 id="limits-heading" className={H2}>
          Things to know
        </h2>
        <ul className={`mt-3 list-disc space-y-1.5 pl-6 ${BODY}`}>
          <li>
            We can keep a piece of information only if the law requires us to, and we will tell you
            if that applies.
          </li>
          <li>
            Messages also exist on your own phone and in WhatsApp’s own systems, which we do not
            control. You can delete your copy of the chat in WhatsApp yourself.
          </li>
          <li>
            Your theme choice and Quran bookmarks are saved only in your own browser and never reach
            us. To remove them, clear this website’s data in your browser settings.
          </li>
          <li>
            If we stop teaching a student because their information is deleted, we will explain this
            when we confirm your request.
          </li>
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="time-heading">
        <h2 id="time-heading" className={H2}>
          How long it takes
        </h2>
        <p className={`mt-3 ${BODY}`}>
          We deal with requests as soon as we reasonably can, and we will message you to confirm
          when it is done. If we need more information from you first, we will ask.
        </p>
      </section>

      <nav className="border-card-border mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-sm font-medium">
        <Link href="/" className="hover:text-primary text-zinc-600 dark:text-zinc-400">
          ← Back to home
        </Link>
        <Link href="/privacy-policy" className="text-primary hover:underline">
          Privacy Policy →
        </Link>
      </nav>
    </article>
  );
}
