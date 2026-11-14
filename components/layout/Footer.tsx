import Link from 'next/link';
import { CONTACT_EMAIL, PHONE_DISPLAY, whatsappLink } from '@/lib/academy/contact';

const LINK_CLASSES = 'text-blue-100/80 transition-colors hover:text-accent';
const HEADING_CLASSES = 'text-accent text-xs font-semibold tracking-[0.2em] uppercase';

export function Footer() {
  return (
    <footer className="from-navy-1 to-navy-2 relative overflow-hidden bg-gradient-to-b text-blue-100">
      <div aria-hidden="true" className="pattern-islamic absolute inset-0 opacity-30" />
      <div
        aria-hidden="true"
        className="via-accent absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <p
            dir="rtl"
            lang="ar"
            className="font-quran text-accent text-2xl"
            aria-label="Bismillah ir-Rahman ir-Rahim"
          >
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
          <p className="font-display mt-4 text-2xl font-semibold text-white">
            Al-Hameed Online Quran Academy
          </p>
          <p dir="rtl" lang="ur" className="font-nastaliq mt-2 text-lg text-blue-100/80">
            الحمید آن لائن قرآن اکیڈمی
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-blue-100/70">
            Live one-on-one Quran, Tajweed, Hifz, and Arabic classes for children, adults, and
            beginners.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className={HEADING_CLASSES}>Explore</h2>
          <ul className="mt-5 flex flex-col gap-3 text-sm">
            <li>
              <Link href="/" className={LINK_CLASSES}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/#courses" className={LINK_CLASSES}>
                Courses
              </Link>
            </li>
            <li>
              <Link href="/quran" className={LINK_CLASSES}>
                Read Quran
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className={HEADING_CLASSES}>Contact</h2>
          <div className="mt-5 flex flex-col gap-3 text-sm">
            <a
              href={whatsappLink('Assalam o Alaikum!')}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK_CLASSES}
            >
              WhatsApp: {PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className={`${LINK_CLASSES} flex items-start gap-2`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="text-accent mt-0.5 size-4 shrink-0"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              <span className="min-w-0 [overflow-wrap:anywhere]">{CONTACT_EMAIL}</span>
            </a>
            <a
              href={whatsappLink(
                'Assalam o Alaikum! I would like to start a free 3-day trial class.',
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-accent-foreground mt-3 inline-flex w-fit items-center rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition hover:brightness-105"
            >
              Start Free 3-Day Trial
            </a>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-blue-100/60 sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Al-Hameed Online Quran Academy. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <Link href="/privacy-policy" className={LINK_CLASSES}>
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className={LINK_CLASSES}>
              Terms &amp; Conditions
            </Link>
            <Link href="/data-deletion" className={LINK_CLASSES}>
              Data Deletion
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
