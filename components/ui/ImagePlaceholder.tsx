interface ImagePlaceholderProps {
  label: string;
  className?: string;
}

/** Shown in place of a real photo until one is supplied; swap in a Next <Image> when ready. */
export function ImagePlaceholder({ label, className = '' }: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`border-primary/30 bg-surface dark:border-primary/40 flex items-center justify-center rounded-lg border-2 border-dashed p-6 text-center text-sm font-medium text-zinc-500 dark:text-zinc-400 ${className}`}
    >
      {label}
    </div>
  );
}
