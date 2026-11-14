import { whatsappLink } from '@/lib/academy/contact';
import { TrialForm } from './TrialForm';

export function TrialSection() {
  return (
    <section className="bg-surface-soft px-4 py-20 text-center sm:px-6 lg:py-28">
      <div className="from-heading relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-gradient-to-br to-[#0b2447] px-6 py-14 shadow-2xl shadow-blue-900/25 sm:px-12">
        <div aria-hidden="true" className="pattern-islamic absolute inset-0 opacity-50" />
        <div
          aria-hidden="true"
          className="bg-accent/25 absolute -top-24 -right-24 size-72 rounded-full blur-3xl"
        />
        <div className="relative">
          <span className="bg-danger text-danger-foreground inline-block rounded-full px-4 py-1 text-xs font-semibold tracking-wide uppercase dark:bg-red-900 dark:text-red-100">
            Limited offer
          </span>
          <h2 className="font-display mt-5 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Start your free 3-day trial class
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-blue-100">
            No payment, no commitment. Message us on WhatsApp and we&apos;ll schedule your first
            class today.
          </p>
          <a
            href={whatsappLink(
              'Assalam o Alaikum! I would like to start a free 3-day trial class.',
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-accent-foreground mt-8 inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold shadow-lg transition hover:-translate-y-0.5 hover:brightness-105"
          >
            Start Free Trial on WhatsApp
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <p className="text-heading mt-12 text-sm font-semibold tracking-[0.18em] uppercase dark:text-zinc-300">
        Or tell us about the student first
      </p>
      <TrialForm />
    </section>
  );
}
