'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookmarksNavLink } from './BookmarksNavLink';
import { ThemeToggle } from './ThemeToggle';

// Each row is a full-width, generously padded block so it's comfortable to
// tap on a phone, not just readable.
const MOBILE_LINK_CLASSES =
  'block w-full rounded-lg px-4 py-3 text-lg font-semibold text-zinc-700 hover:bg-primary/10 hover:text-primary dark:text-zinc-300 dark:hover:bg-primary/15 dark:hover:text-primary';

export function MobileNavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className="flex h-12 w-12 items-center justify-center rounded-lg text-2xl text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
      >
        <span aria-hidden="true">{isOpen ? '✕' : '☰'}</span>
      </button>

      {isOpen ? (
        <div className="absolute inset-x-0 top-full border-b border-card-border bg-white px-3 py-3 shadow-lg dark:bg-black">
          <div className="flex flex-col gap-1">
            <Link href="/#courses" onClick={() => setIsOpen(false)} className={MOBILE_LINK_CLASSES}>
              Courses
            </Link>
            <Link href="/quran" onClick={() => setIsOpen(false)} className={MOBILE_LINK_CLASSES}>
              Surahs
            </Link>
            <Link
              href="/quran/juz"
              onClick={() => setIsOpen(false)}
              className={MOBILE_LINK_CLASSES}
            >
              Juz
            </Link>
            <div onClick={() => setIsOpen(false)}>
              <BookmarksNavLink className={MOBILE_LINK_CLASSES} />
            </div>
            <div className="mt-2 px-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
