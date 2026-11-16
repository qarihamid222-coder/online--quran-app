import Link from 'next/link';

export default function SurahNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-3 px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-heading text-3xl font-semibold">Surah not found</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        The surah you&rsquo;re looking for doesn&rsquo;t exist. The Quran has 114 surahs, numbered 1
        to 114.
      </p>
      <Link
        href="/quran"
        className="bg-cta text-primary-foreground ring-accent/60 mt-2 rounded-full px-5 py-2.5 text-sm font-semibold ring-1 transition hover:brightness-125"
      >
        Browse all Surahs
      </Link>
    </div>
  );
}
