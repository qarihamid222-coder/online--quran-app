'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useBookmarks } from '@/hooks/useBookmarks';
import {
  isStoragePersistent,
  subscribeToBookmarks,
  toggleBookmark,
  truncateSnippet,
  type Bookmark,
} from '@/store/bookmarks';

interface BookmarkButtonProps {
  numberInQuran: number;
  surahNumber: number;
  surahEnglishName: string;
  ayahNumber: number;
  snippet: string;
}

const CONFIRMATION_MS = 4000;

export function BookmarkButton({
  numberInQuran,
  surahNumber,
  surahEnglishName,
  ayahNumber,
  snippet,
}: BookmarkButtonProps) {
  const bookmarks = useBookmarks();
  const isBookmarked = bookmarks.some((bookmark) => bookmark.numberInQuran === numberInQuran);
  const persistent = useSyncExternalStore(subscribeToBookmarks, isStoragePersistent, () => true);
  const [justSaved, setJustSaved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  function handleToggle() {
    const bookmark: Bookmark = {
      numberInQuran,
      surahNumber,
      surahEnglishName,
      ayahNumber,
      snippet: truncateSnippet(snippet),
      createdAt: new Date().toISOString(),
    };
    const saved = toggleBookmark(bookmark);

    if (timer.current) clearTimeout(timer.current);
    setJustSaved(saved);
    if (saved) {
      timer.current = setTimeout(() => setJustSaved(false), CONFIRMATION_MS);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleToggle}
        aria-pressed={isBookmarked}
        aria-label={
          isBookmarked ? `Remove bookmark for ayah ${ayahNumber}` : `Bookmark ayah ${ayahNumber}`
        }
        className={`inline-flex min-h-9 items-center text-xs font-medium underline-offset-2 hover:underline ${
          isBookmarked ? 'text-gold-text' : 'hover:text-heading text-zinc-500 dark:text-zinc-400'
        }`}
      >
        {isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
      </button>
      {/* Visible and screen-reader confirmation that the verse was saved. */}
      <span role="status" className="text-xs text-zinc-600 dark:text-zinc-400">
        {justSaved && isBookmarked ? (
          <>
            Saved{persistent ? '' : ' for this visit only'} ·{' '}
            <Link
              href="/bookmarks"
              className="text-primary font-medium underline-offset-2 hover:underline"
            >
              View bookmarks
            </Link>
          </>
        ) : null}
      </span>
    </>
  );
}
