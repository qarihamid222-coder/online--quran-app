import Link from 'next/link';
import { BookmarksNavLink } from './BookmarksNavLink';
import { MobileNavMenu } from './MobileNavMenu';
import { NAV_LINK_CLASSES } from './navStyles';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-card-border bg-white/80 backdrop-blur-sm dark:bg-black/80">
      <nav className="relative mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="text-primary shrink-0 text-xl font-bold tracking-tight sm:text-2xl"
        >
          Al-Hameed Academy
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
          <ThemeToggle />
        </div>
        <MobileNavMenu />
      </nav>
    </header>
  );
}
