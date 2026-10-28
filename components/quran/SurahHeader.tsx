import type { SurahDetail } from '@/lib/quran';

interface SurahHeaderProps {
  surah: SurahDetail;
}

export function SurahHeader({ surah }: SurahHeaderProps) {
  return (
    <header className="flex flex-col items-center gap-2 border-b border-card-border pb-6 text-center">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Surah {surah.number}</p>
      <h1 dir="rtl" lang="ar" className="font-arabic text-4xl text-heading">
        {surah.name}
      </h1>
      <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {surah.englishName} · {surah.englishNameTranslation}
      </p>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {surah.numberOfAyahs} verses · {surah.revelationType}
      </p>
    </header>
  );
}
