interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
}

/** Shared premium heading: gold eyebrow, serif title, ornamental divider. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) {
  const center = align === 'center';
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}>
      <p className="text-accent-foreground dark:text-accent text-xs font-semibold tracking-[0.2em] uppercase">
        {eyebrow}
      </p>
      <h2 className="font-display text-heading mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h2>
      <div
        aria-hidden="true"
        className={`mt-5 flex items-center gap-3 ${center ? 'justify-center' : ''}`}
      >
        <span className="to-accent h-px w-12 bg-gradient-to-r from-transparent" />
        <span className="bg-accent size-2 rotate-45" />
        <span className="to-accent h-px w-12 bg-gradient-to-l from-transparent" />
      </div>
      {description ? (
        <p className="mt-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      ) : null}
    </div>
  );
}
