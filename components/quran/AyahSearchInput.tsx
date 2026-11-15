'use client';

import { useAyahSearch } from '@/hooks/useAyahSearch';

export function AyahSearchInput() {
  const { query, setQuery } = useAyahSearch();

  return (
    <input
      type="search"
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      placeholder="Search this page (Arabic, English, or Urdu)…"
      aria-label="Search verses on this page"
      className="border-card-border bg-surface text-heading focus:border-accent mt-4 w-full rounded-lg border px-4 py-2.5 text-sm shadow-sm placeholder:text-zinc-500 focus:outline-none dark:placeholder:text-zinc-400"
    />
  );
}
