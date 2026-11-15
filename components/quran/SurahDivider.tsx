'use client';

import Link from 'next/link';
import { useAyahSearch } from '@/hooks/useAyahSearch';

interface SurahDividerProps {
  surahNumber: number;
  surahName: string;
  surahEnglishName: string;
  /** Global ayah numbers belonging to this surah within the current group. */
  ayahNumbers: number[];
}

export function SurahDivider({
  surahNumber,
  surahEnglishName,
  surahName,
  ayahNumbers,
}: SurahDividerProps) {
  const { isMatch } = useAyahSearch();

  if (!ayahNumbers.some(isMatch)) {
    return null;
  }

  return (
    <li className="mt-6 mb-2 list-none first:mt-0">
      <Link
        href={`/quran/${surahNumber}`}
        className="border-card-border bg-surface-soft hover:border-accent flex items-center justify-between gap-3 rounded-lg border px-4 py-2 transition-colors"
      >
        <span className="text-heading text-sm font-medium">
          Surah {surahNumber} · {surahEnglishName}
        </span>
        <span dir="rtl" lang="ar" className="font-arabic text-heading text-lg">
          {surahName}
        </span>
      </Link>
    </li>
  );
}
