import Link from 'next/link';
import type { SurahSummary } from '@/lib/quran';

interface SurahCardProps {
  surah: SurahSummary;
}

export function SurahCard({ surah }: SurahCardProps) {
  return (
    <Link
      href={`/quran/${surah.number}`}
      className="group border-card-border bg-surface hover:border-accent flex items-center justify-between gap-4 rounded-lg border px-4 py-3 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        <span className="bg-primary/10 text-primary dark:bg-primary/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
          {surah.number}
        </span>
        <div>
          <p className="text-heading font-medium">{surah.englishName}</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {surah.englishNameTranslation} · {surah.numberOfAyahs} verses · {surah.revelationType}
          </p>
        </div>
      </div>
      <span dir="rtl" lang="ar" className="font-arabic text-heading shrink-0 text-xl">
        {surah.name}
      </span>
    </Link>
  );
}
