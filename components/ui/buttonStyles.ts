/** Shared button styles, so every call to action on the site looks and behaves the same. */

/** Primary call to action: royal gold, navy text. */
export const GOLD_BUTTON =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#e8cd7a] via-[#d4b45e] to-[#b8902e] px-7 py-3 text-base font-bold text-[#0b2447] shadow-[0_14px_32px_-10px_rgba(184,144,46,0.85)] ring-1 ring-[#8a6a1c]/40 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-10px_rgba(184,144,46,0.95)]';

/** Secondary action: outlined, gold on hover. */
export const OUTLINE_BUTTON =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-heading/25 px-7 py-3 text-base font-semibold text-heading transition-colors hover:border-accent hover:bg-accent/10';

/** Royal-blue action used inside cards. */
export const ROYAL_BUTTON =
  'bg-cta text-primary-foreground ring-accent/50 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-base font-semibold ring-1 transition duration-300 hover:-translate-y-0.5 hover:brightness-125';
