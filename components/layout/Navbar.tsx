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
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span
            aria-hidden="true"
            className="from-heading to-primary ring-accent/70 grid size-10 place-items-center rounded-full bg-gradient-to-br text-lg text-white shadow-md ring-2"
          >
            ☪
          </span>
          <span className="leading-tight">
            <span className="font-display text-heading block text-lg font-semibold tracking-tight sm:text-xl">
              Al-Hameed Academy
            </span>
            <span className="text-gold-text hidden text-[0.65rem] font-semibold tracking-[0.2em] uppercase sm:block">
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
