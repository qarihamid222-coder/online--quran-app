'use client';

import { useBookmarks } from '@/hooks/useBookmarks';
import { toggleBookmark, truncateSnippet, type Bookmark } from '@/store/bookmarks';

interface BookmarkButtonProps {
  numberInQuran: number;
  surahNumber: number;
  surahEnglishName: string;
  ayahNumber: number;
  snippet: string;
}

export function BookmarkButton({
  numberInQuran,
  surahNumber,
  surahEnglishName,
  ayahNumber,
  snippet,
}: BookmarkButtonProps) {
  const bookmarks = useBookmarks();
  const isBookmarked = bookmarks.some((bookmark) => bookmark.numberInQuran === numberInQuran);

  function handleToggle() {
    const bookmark: Bookmark = {
      numberInQuran,
      surahNumber,
      surahEnglishName,
      ayahNumber,
      snippet: truncateSnippet(snippet),
      createdAt: new Date().toISOString(),
    };
    toggleBookmark(bookmark);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={isBookmarked}
      aria-label={
        isBookmarked ? `Remove bookmark for ayah ${ayahNumber}` : `Bookmark ayah ${ayahNumber}`
      }
      className={`text-xs font-medium underline-offset-2 hover:underline ${
        isBookmarked ? 'text-gold-text' : 'hover:text-heading text-zinc-500 dark:text-zinc-400'
      }`}
    >
      {isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
    </button>
  );
}
