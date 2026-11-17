import Image from 'next/image';
import Link from 'next/link';
import { whatsappLink } from '@/lib/academy/contact';
import { ACADEMY_LOGO } from '@/lib/academy/logo';
import { HOME_NAV_LINKS, sectionHref } from '@/lib/academy/sections';
import { BookmarksNavLink } from './BookmarksNavLink';
import { MobileNavMenu } from './MobileNavMenu';
import { NAV_LINK_CLASSES } from './navStyles';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <header className="border-card-border bg-background/80 sticky top-0 z-20 border-b backdrop-blur-xl">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="group flex min-w-0 shrink items-center gap-2 sm:gap-3"
          aria-label="Al-Hameed Online Quran Academy — home"
        >
          <span className="ring-accent/70 flex h-10 shrink-0 items-center rounded-xl bg-white px-1 shadow-sm ring-1 sm:h-12 sm:px-1.5">
            <Image
              src={ACADEMY_LOGO.mark.src}
              alt=""
              width={ACADEMY_LOGO.mark.width}
              height={ACADEMY_LOGO.mark.height}
              priority
              className="h-8 w-auto sm:h-10"
            />
          </span>
          <span className="leading-none">
            <span className="font-display text-heading block text-lg font-semibold tracking-tight sm:text-2xl">
              Al-Hameed
            </span>
            <span className="text-gold-text mt-1 block text-[0.55rem] font-semibold tracking-[0.14em] whitespace-nowrap uppercase sm:text-[0.66rem] sm:tracking-[0.22em]">
              Online Quran Academy
            </span>
          </span>
        </Link>
        <div className="hidden items-center gap-0.5 xl:flex">
          {HOME_NAV_LINKS.map((link) => (
            <Link key={link.section} href={sectionHref(link.section)} className={NAV_LINK_CLASSES}>
              {link.label}
            </Link>
          ))}
          <span aria-hidden="true" className="bg-card-border mx-1 h-6 w-px" />
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
