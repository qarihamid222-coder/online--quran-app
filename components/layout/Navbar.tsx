import Link from 'next/link';
import { whatsappLink } from '@/lib/academy/contact';
import { BookmarksNavLink } from './BookmarksNavLink';
import { MobileNavMenu } from './MobileNavMenu';
import { NAV_LINK_CLASSES } from './navStyles';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <header className="border-card-border bg-background/80 sticky top-0 z-20 border-b backdrop-blur-xl">
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3"
          aria-label="Al-Hameed Online Quran Academy — home"
        >
          <svg
            viewBox="0 0 48 48"
            aria-hidden="true"
            className="size-11 shrink-0 drop-shadow-md transition-transform duration-500 group-hover:rotate-[22deg]"
          >
            <defs>
              <linearGradient id="emblem-bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#12305f" />
                <stop offset="1" stopColor="#0b2447" />
              </linearGradient>
              <linearGradient id="emblem-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#e6c872" />
                <stop offset="1" stopColor="#b8902e" />
              </linearGradient>
            </defs>
            <circle
              cx="24"
              cy="24"
              r="22.5"
              fill="url(#emblem-bg)"
              stroke="url(#emblem-gold)"
              strokeWidth="1.5"
            />
            <path
              d="M24 7l4.2 10.1L38.3 13l-4.1 10.1L44 24l-9.8 4.9L38.3 35l-10.1-4.1L24 41l-4.2-10.1L9.7 35l4.1-10.1L4 24l9.8-.9L9.7 13l10.1 4.1z"
              fill="none"
              stroke="url(#emblem-gold)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <circle cx="24" cy="24" r="6.5" fill="url(#emblem-gold)" />
            <circle cx="24" cy="24" r="2.6" fill="#0b2447" />
          </svg>
          <span className="leading-none">
            <span className="font-display text-heading block text-xl font-semibold tracking-tight sm:text-2xl">
              Al-Hameed
            </span>
            <span className="text-gold-text mt-1 block text-[0.62rem] font-semibold tracking-[0.22em] uppercase sm:text-[0.66rem]">
              Online Quran Academy
            </span>
          </span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          <Link href="/#courses" className={NAV_LINK_CLASSES}>
            Courses
          </Link>
          <Link href="/quran" className={NAV_LINK_CLASSES}>
            Surahs
          </Link>
          <Link href="/quran/juz" className={NAV_LINK_CLASSES}>
            Juz
          </Link>
          <BookmarksNavLink />
          <span aria-hidden="true" className="bg-card-border mx-2 h-6 w-px" />
          <ThemeToggle />
          <a
            href={whatsappLink(
              'Assalam o Alaikum! I would like to start a free 3-day trial class.',
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-cta text-primary-foreground ring-accent/60 ml-2 inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold shadow-md ring-1 transition-colors hover:brightness-125"
          >
            Free Trial
          </a>
        </div>
        <MobileNavMenu />
      </nav>
    </header>
  );
}
