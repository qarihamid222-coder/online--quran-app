'use client';

import { ErrorState } from '@/components/ui/ErrorState';
import { isKnownQuranApiErrorMessage } from '@/lib/quran';

export default function QuranListError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  // Only ever show a message we recognize as our own — never raw internal
  // error text (e.g. a minified React error) that could otherwise reach
  // this boundary and get shown to a visitor as-is.
  const message = isKnownQuranApiErrorMessage(error.message)
    ? error.message
    : 'Something went wrong while loading the surah list.';

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <ErrorState title="Couldn't load the surahs" message={message} onRetry={retry} />
    </div>
  );
}
