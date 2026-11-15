import Link from 'next/link';

export default function JuzNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-3 px-4 py-24 text-center sm:px-6">
      <h1 className="text-heading text-2xl font-semibold">Juz not found</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        The juz you&rsquo;re looking for doesn&rsquo;t exist. The Quran has 30 juz, numbered 1 to
        30.
      </p>
      <Link
        href="/quran/juz"
        className="bg-cta text-primary-foreground ring-accent/60 mt-2 rounded-full px-5 py-2.5 text-sm font-semibold ring-1 transition hover:brightness-125"
      >
        Browse all Juz
      </Link>
    </div>
  );
}
