import type { Metadata } from 'next';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import { SurahSearch } from '@/components/quran/SurahSearch';
import { EmptyState } from '@/components/ui/EmptyState';
import { fetchSurahList } from '@/lib/quran';
import type { SurahSummary } from '@/lib/quran';

// Surah metadata (names, ayah counts, revelation type) never changes, so it's
// cached and revalidated in the background rather than force-fetched on every
// request. This also means a single transient failure from the upstream API
// can't show visitors a broken page: Next.js keeps serving the last good
// cached version and quietly retries on the next request. `force-dynamic`
// here previously meant one bad request from the third-party API was shown
// directly to every visitor until a hard refresh, which is what caused the
// "Couldn't load the surahs" error to resurface on navigation.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Surahs — Online Quran',
  description: 'Browse all 114 surahs of the Holy Quran.',
};

export default async function QuranSurahListPage() {
  let surahs: SurahSummary[];
  try {
    surahs = await fetchSurahList();
  } catch (error) {
    // This page has no dynamic params, so Next.js prerenders it eagerly at
    // build time. If the upstream API is briefly unreachable right then,
    // don't fail the entire deployment over it — render empty for now and
    // let the first real visit (or the next background revalidation once
    // `revalidate` elapses) fill it in for real. A genuine runtime failure
    // (not at build time) still surfaces through error.tsx as normal.
    if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
      surahs = [];
    } else {
      throw error;
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Surahs</h1>
      {surahs.length === 0 ? (
        <EmptyState
          title="No surahs found"
          description="The Quran data service returned no surahs. Please try again later."
        />
      ) : (
        <SurahSearch surahs={surahs} />
      )}
    </div>
  );
}
