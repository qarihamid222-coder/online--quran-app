import Image from 'next/image';
import Link from 'next/link';
import { whatsappLink } from '@/lib/academy/contact';
import { getAcademyLogo } from '@/lib/academy/logo';
import { BookmarksNavLink } from './BookmarksNavLink';
import { MobileNavMenu } from './MobileNavMenu';
import { NAV_LINK_CLASSES } from './navStyles';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const logo = getAcademyLogo();

  return (
    <header className="border-card-border bg-background/80 sticky top-0 z-20 border-b backdrop-blur-xl">
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3"
          aria-label="Al-Hameed Online Quran Academy — home"
        >
          {logo ? (
            <Image
              src={logo.src}
              alt=""
              width={176}
              height={44}
              unoptimized={logo.src.endsWith('.svg')}
              className="h-11 w-auto shrink-0"
            />
          ) : null}
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
