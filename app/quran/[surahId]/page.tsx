import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AudioPlayerProvider } from '@/components/quran/AudioPlayerProvider';
import { AyahCard } from '@/components/quran/AyahCard';
import { AyahSearchInput } from '@/components/quran/AyahSearchInput';
import { AyahSearchProvider } from '@/components/quran/AyahSearchProvider';
import { SurahAudioControls } from '@/components/quran/SurahAudioControls';
import { SurahHeader } from '@/components/quran/SurahHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { TOTAL_SURAHS, fetchSurah, isValidSurahNumber } from '@/lib/quran';

// Pages are generated the first time they are visited, then cached and refreshed
// in the background every hour (incremental static regeneration). Returning an
// empty list from generateStaticParams is what enables this for a dynamic route,
// and it means a visitor is served the cached page even if the Quran data
// service is slow or briefly unavailable. A render that fails is never cached.
export const revalidate = 3600;
export const dynamicParams = true;
// The page makes several calls to a third-party service; allow time for retries
// on hosts that cap function duration.
export const maxDuration = 30;

export function generateStaticParams() {
  return [];
}

function parseSurahNumber(surahId: string): number | null {
  const surahNumber = Number(surahId);
  return isValidSurahNumber(surahNumber) ? surahNumber : null;
}

export async function generateMetadata({
  params,
}: PageProps<'/quran/[surahId]'>): Promise<Metadata> {
  const { surahId } = await params;
  const surahNumber = parseSurahNumber(surahId);

  if (surahNumber === null) {
    return { title: 'Surah not found' };
  }

  return {
    title: `Surah ${surahNumber}`,
    description: `Read surah ${surahNumber} of the Holy Quran with Arabic text and translations.`,
  };
}

export default async function SurahReaderPage({ params }: PageProps<'/quran/[surahId]'>) {
  const { surahId } = await params;
  const surahNumber = parseSurahNumber(surahId);

  if (surahNumber === null) {
    notFound();
  }

  const surah = await fetchSurah(surahNumber);

  const previousSurah = surahNumber > 1 ? surahNumber - 1 : null;
  const nextSurah = surahNumber < TOTAL_SURAHS ? surahNumber + 1 : null;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <SurahHeader surah={surah} />

      {surah.ayahs.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No verses available"
            description="This surah currently has no verses available from the Quran data service."
          />
        </div>
      ) : (
        <AudioPlayerProvider ayahs={surah.ayahs}>
          <AyahSearchProvider ayahs={surah.ayahs}>
            <SurahAudioControls />
            <AyahSearchInput />
            <ol className="mt-2">
              {surah.ayahs.map((ayah, index) => (
                <AyahCard
                  key={ayah.number}
                  ayah={ayah}
                  index={index}
                  surahNumber={surah.number}
                  surahEnglishName={surah.englishName}
                />
              ))}
            </ol>
          </AyahSearchProvider>
        </AudioPlayerProvider>
      )}

      <nav className="border-card-border mt-10 flex items-center justify-between gap-4 border-t pt-6">
        {previousSurah ? (
          <Link
            href={`/quran/${previousSurah}`}
            className="text-heading hover:text-primary text-sm font-semibold dark:text-zinc-300 dark:hover:text-white"
          >
            ← Surah {previousSurah}
          </Link>
        ) : (
          <span />
        )}
        <Link
          href="/quran"
          className="text-heading hover:text-primary text-sm font-semibold dark:text-zinc-300 dark:hover:text-white"
        >
          All Surahs
        </Link>
        {nextSurah ? (
          <Link
            href={`/quran/${nextSurah}`}
            className="text-heading hover:text-primary text-sm font-semibold dark:text-zinc-300 dark:hover:text-white"
          >
            Surah {nextSurah} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
