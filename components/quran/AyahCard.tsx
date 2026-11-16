'use client';

import { useEffect, useState } from 'react';
import type { Ayah } from '@/lib/quran';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useAyahSearch } from '@/hooks/useAyahSearch';
import { BookmarkButton } from './BookmarkButton';

interface AyahCardProps {
  ayah: Ayah;
  index: number;
  surahNumber: number;
  surahEnglishName: string;
}

export function AyahCard({ ayah, index, surahNumber, surahEnglishName }: AyahCardProps) {
  const { currentIndex, isPlaying, isLoading, playFromIndex, togglePlayPause } = useAudioPlayer();
  const { isMatch } = useAyahSearch();
  const isActive = currentIndex === index;
  const isActivePlaying = isActive && isPlaying;
  const isActiveLoading = isActive && isLoading;

  const anchorId = `ayah-${ayah.numberInQuran}`;
  const [isLinked, setIsLinked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // window.location.hash is only known client-side, after mount — the
    // browser has already scrolled to this anchor natively by this point;
    // this just adds a temporary highlight on top of that.
    if (window.location.hash !== `#${anchorId}`) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLinked(true);
    const timeout = setTimeout(() => setIsLinked(false), 3000);
    return () => clearTimeout(timeout);
  }, [anchorId]);

  function handleToggle() {
    if (isActive) {
      togglePlayPause();
    } else {
      playFromIndex(index);
    }
  }

  function handleCopyLink() {
    if (typeof window === 'undefined') return;

    const url = `${window.location.origin}${window.location.pathname}#${anchorId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  }

  if (!isMatch(ayah.numberInQuran)) {
    return null;
  }

  return (
    <li
      id={anchorId}
      className={`border-card-border flex scroll-mt-20 flex-col gap-3 border-b py-6 transition-colors last:border-b-0 ${
        isLinked ? 'bg-accent/10' : isActive ? 'bg-accent/10' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={handleToggle}
          aria-pressed={isActivePlaying}
          aria-label={isActivePlaying ? `Pause ayah ${ayah.number}` : `Play ayah ${ayah.number}`}
          className="bg-primary/10 text-primary dark:bg-primary/20 hover:bg-primary/20 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors"
        >
          {isActiveLoading ? '…' : isActivePlaying ? '❚❚' : ayah.number}
        </button>
        <p
          dir="rtl"
          lang="ar"
          className="font-quran text-arabic-text flex-1 text-right text-3xl leading-[2.2]"
        >
          {ayah.arabicText}
        </p>
      </div>
      {ayah.translations.english ? (
        <p className="pl-10 text-base text-zinc-700 dark:text-zinc-300">
          {ayah.translations.english}
        </p>
      ) : null}
      {ayah.translations.urdu ? (
        <p
          dir="rtl"
          lang="ur"
          className="font-nastaliq text-urdu-text pl-10 text-right text-lg leading-[2.2]"
        >
          {ayah.translations.urdu}
        </p>
      ) : null}
      <div className="ml-10 flex items-center gap-4">
        <BookmarkButton
          numberInQuran={ayah.numberInQuran}
          surahNumber={surahNumber}
          surahEnglishName={surahEnglishName}
          ayahNumber={ayah.number}
          snippet={ayah.translations.english ?? ayah.arabicText}
        />
        <button
          type="button"
          onClick={handleCopyLink}
          className="hover:text-heading text-xs font-medium text-zinc-500 underline-offset-2 hover:underline dark:text-zinc-400"
        >
          {copied ? 'Copied!' : 'Copy link'}
        </button>
      </div>
    </li>
  );
}
