'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { whatsappLink } from '@/lib/academy/contact';
import { BookmarksNavLink } from './BookmarksNavLink';
import { ThemeToggle } from './ThemeToggle';

// Each row is a full-width, generously padded block so it's comfortable to
// tap on a phone, not just readable.
const MOBILE_LINK_CLASSES =
  'flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-semibold text-heading hover:bg-primary/10 hover:text-primary dark:text-zinc-200 dark:hover:bg-primary/15 dark:hover:text-primary';

export function MobileNavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Escape closes the menu and returns focus to the toggle.
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-controls="mobile-nav-panel"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className="border-card-border text-heading hover:bg-primary/10 flex h-11 w-11 items-center justify-center rounded-full border dark:text-zinc-200"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden="true"
          className="size-5"
        >
          {isOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h10" />}
        </svg>
      </button>

      {isOpen ? (
        <div
          id="mobile-nav-panel"
          className="fade-up border-card-border bg-surface absolute inset-x-0 top-full border-b px-3 py-4 shadow-2xl [--delay:0s]"
        >
          <div className="flex flex-col gap-1">
            <Link href="/#courses" onClick={() => setIsOpen(false)} className={MOBILE_LINK_CLASSES}>
              Courses
              <span aria-hidden="true" className="text-gold-text">
                ›
              </span>
            </Link>
            <Link href="/quran" onClick={() => setIsOpen(false)} className={MOBILE_LINK_CLASSES}>
              Surahs
              <span aria-hidden="true" className="text-gold-text">
                ›
              </span>
            </Link>
            <Link
              href="/quran/juz"
              onClick={() => setIsOpen(false)}
              className={MOBILE_LINK_CLASSES}
            >
              Juz
              <span aria-hidden="true" className="text-gold-text">
                ›
              </span>
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
              className="mx-4 mt-3 inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#e8cd7a] to-[#b8902e] px-6 py-4 text-base font-bold text-[#0b2447] shadow-lg ring-1 ring-[#8a6a1c]/40"
            >
              Start Free 3-Day Trial
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
