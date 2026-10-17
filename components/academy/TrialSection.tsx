import { whatsappLink } from '@/lib/academy/contact';

export function TrialSection() {
  return (
    <section className="bg-primary px-4 py-16 text-center sm:px-6">
      <div className="mx-auto max-w-2xl">
        <span className="bg-danger text-danger-foreground inline-block rounded-full px-4 py-1 text-xs font-semibold tracking-wide uppercase">
          Limited offer
        </span>
        <h2 className="text-primary-foreground mt-4 text-3xl font-semibold sm:text-4xl">
          Start your free 3-day trial class
        </h2>
        <p className="text-primary-foreground/90 mt-3 text-base">
          No payment, no commitment. Message us on WhatsApp and we&apos;ll schedule your first class
          today.
        </p>
        <a
          href={whatsappLink('Assalam o Alaikum! I would like to start a free 3-day trial class.')}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary border-accent mt-6 inline-flex items-center justify-center rounded-full border-2 bg-white px-8 py-3.5 text-base font-semibold transition-opacity hover:opacity-90"
        >
          Start Free Trial on WhatsApp
        </a>
      </div>
    </section>
  );
}
