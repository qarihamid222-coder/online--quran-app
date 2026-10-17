'use client';

import Link from 'next/link';
import { useBookmarks } from '@/hooks/useBookmarks';
import { NAV_LINK_CLASSES } from './navStyles';

export function BookmarksNavLink({ className = NAV_LINK_CLASSES }: { className?: string }) {
  const bookmarks = useBookmarks();

  return (
    <Link href="/bookmarks" className={`flex items-center gap-2 ${className}`}>
      Bookmarks
      {bookmarks.length > 0 ? (
        <span className="bg-primary/15 text-primary flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-sm font-semibold">
          {bookmarks.length}
        </span>
      ) : null}
    </Link>
  );
}
