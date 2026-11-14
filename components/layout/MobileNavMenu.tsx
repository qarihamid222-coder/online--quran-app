'use client';

import { useState } from 'react';
import Link from 'next/link';
import { whatsappLink } from '@/lib/academy/contact';
import { BookmarksNavLink } from './BookmarksNavLink';
import { ThemeToggle } from './ThemeToggle';

// Each row is a full-width, generously padded block so it's comfortable to
// tap on a phone, not just readable.
const MOBILE_LINK_CLASSES =
  'block w-full rounded-2xl px-4 py-3 text-lg font-semibold text-heading hover:bg-primary/10 hover:text-primary dark:text-zinc-200 dark:hover:bg-primary/15 dark:hover:text-primary';

export function MobileNavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className="border-card-border text-heading hover:bg-primary/10 flex h-11 w-11 items-center justify-center rounded-full border text-xl dark:text-zinc-200"
      >
        <span aria-hidden="true">{isOpen ? '✕' : '☰'}</span>
      </button>

      {isOpen ? (
        <div className="border-card-border bg-surface absolute inset-x-0 top-full border-b px-3 py-4 shadow-2xl">
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
            <div className="mt-2 flex items-center justify-between gap-3 px-4">
              <ThemeToggle />
            </div>
            <a
              href={whatsappLink(
                'Assalam o Alaikum! I would like to start a free 3-day trial class.',
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="bg-primary text-primary-foreground ring-accent/60 mx-4 mt-3 inline-flex items-center justify-center rounded-full px-6 py-3.5 text-base font-semibold ring-1"
            >
              Start Free 3-Day Trial
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
