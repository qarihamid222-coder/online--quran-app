import { whatsappLink } from '@/lib/academy/contact';
import { TrialForm } from './TrialForm';

export function TrialSection() {
  return (
    <section className="bg-surface-soft px-4 py-16 text-center sm:px-6">
      <div className="mx-auto max-w-2xl">
        <span className="bg-danger text-danger-foreground inline-block rounded-full px-4 py-1 text-xs font-semibold tracking-wide uppercase">
          Limited offer
        </span>
        <h2 className="text-heading mt-4 text-3xl font-semibold sm:text-4xl">
          Start your free 3-day trial class
        </h2>
        <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
          No payment, no commitment. Message us on WhatsApp and we&apos;ll schedule your first class
          today.
        </p>
        <a
          href={whatsappLink('Assalam o Alaikum! I would like to start a free 3-day trial class.')}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground border-accent mt-6 inline-flex items-center justify-center rounded-full border-2 px-8 py-3.5 text-base font-semibold transition-opacity hover:opacity-90"
        >
          Start Free Trial on WhatsApp
        </a>
        <p className="mt-8 text-sm font-medium tracking-wide text-zinc-600 uppercase dark:text-zinc-400">
          Or tell us about the student first
        </p>
      </div>
      <TrialForm />
    </section>
  );
}
