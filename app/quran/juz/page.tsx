import type { Metadata } from 'next';
import Link from 'next/link';
import { TOTAL_JUZ } from '@/lib/quran';

export const metadata: Metadata = {
  title: 'Juz — Online Quran',
  description: 'Browse the Quran by juz (para), all 30 parts.',
};

const JUZ_NUMBERS = Array.from({ length: TOTAL_JUZ }, (_, i) => i + 1);

export default function JuzIndexPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-heading mb-8 text-3xl font-semibold tracking-tight sm:text-4xl">
        Juz
      </h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {JUZ_NUMBERS.map((juzNumber) => (
          <Link
            key={juzNumber}
            href={`/quran/juz/${juzNumber}`}
            className="border-card-border bg-surface text-heading hover:border-accent flex items-center justify-center rounded-lg border px-4 py-6 text-center font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Juz {juzNumber}
          </Link>
        ))}
      </div>
    </div>
  );
}
