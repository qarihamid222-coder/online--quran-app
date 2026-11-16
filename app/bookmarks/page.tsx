import type { Metadata } from 'next';
import { BookmarksList } from '@/components/bookmarks/BookmarksList';

export const metadata: Metadata = {
  title: 'Bookmarks',
  description: 'Ayahs you have bookmarked for later.',
};

export default function BookmarksPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-heading mb-8 text-3xl font-semibold tracking-tight sm:text-4xl">
        Bookmarks
      </h1>
      <BookmarksList />
    </div>
  );
}
