import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { whatsappLink } from '@/lib/academy/contact';
import { COURSES } from '@/lib/academy/courses';
import { HERO_IMAGE } from '@/lib/academy/images';

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="text-gold-text size-5 shrink-0"
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6 10.3l2.6 2.6L14 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const TRUST_POINTS = ['Live one-on-one classes', 'Free 3-day trial', 'Children & adults'];

const STATS = [
  { value: '1-on-1', label: 'Live online classes' },
  { value: '3 days', label: 'Free trial, no payment' },
  { value: `${COURSES.length}`, label: 'Courses, beginner to advanced' },
  { value: 'All ages', label: 'Children, adults & beginners' },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Backdrop: soft sky gradient, gold glow, and a faint geometric lattice. */}
      <div
        aria-hidden="true"
        className="from-surface-soft via-background to-background absolute inset-0 -z-10 bg-gradient-to-b"
      />
      <div
        aria-hidden="true"
        className="pattern-islamic absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)] opacity-60"
      />
      <div
        aria-hidden="true"
        className="bg-accent/10 absolute -top-32 -right-32 -z-10 size-[28rem] rounded-full blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl gap-14 px-4 pt-14 pb-10 sm:px-6 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10 lg:pt-24">
        <div className="text-center lg:text-left">
          <p
            dir="rtl"
            lang="ar"
            className="font-quran text-gold-text rise text-2xl sm:text-3xl"
            aria-label="Bismillah ir-Rahman ir-Rahim"
          >
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>

          <p
            style={{ '--delay': '0.1s' } as CSSProperties}
            className="rise border-accent/40 bg-surface/70 text-heading mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase shadow-sm backdrop-blur"
          >
            <span className="bg-accent size-1.5 rounded-full" aria-hidden="true" />
            Al-Hameed Online Quran Academy
          </p>

          <h1
            style={{ '--delay': '0.2s' } as CSSProperties}
            className="rise font-display text-heading mt-7 text-5xl leading-[1.08] font-semibold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Learn the <span className="text-primary italic">Quran</span>, beautifully
            <span className="text-accent">.</span>
          </h1>

          <p
            dir="rtl"
            lang="ur"
            className="font-nastaliq text-heading mt-5 text-2xl leading-[2.2] font-medium sm:text-3xl dark:text-zinc-200"
          >
            قرآن سیکھیں، گھر بیٹھے، آن لائن
          </p>

          <p className="mx-auto mt-3 max-w-xl text-lg leading-8 text-zinc-600 lg:mx-0 dark:text-zinc-400">
            Noorani Qaida, Nazra, Tajweed, Hifz, and Arabic — live one-on-one classes with qualified
            teachers, for children, adults, and beginners, from the comfort of home.
          </p>

          <div
            style={{ '--delay': '0.35s' } as CSSProperties}
            className="rise mt-9 flex flex-col items-center gap-4 sm:flex-row lg:items-center"
          >
            <a
              href={whatsappLink(
                'Assalam o Alaikum! I would like to start a free 3-day trial class.',
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-b from-[#e8cd7a] via-[#d4b45e] to-[#b8902e] py-2 pr-2 pl-8 text-base font-bold text-[#0b2447] shadow-[0_14px_32px_-10px_rgba(184,144,46,0.85)] ring-1 ring-[#8a6a1c]/40 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-10px_rgba(184,144,46,0.95)] sm:w-auto"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-white/40 opacity-0 blur-md transition-all duration-700 group-hover:left-[110%] group-hover:opacity-100 motion-reduce:hidden"
              />
              <span className="relative py-2">Start Free 3-Day Trial</span>
              <span
                aria-hidden="true"
                className="relative grid size-11 place-items-center rounded-full bg-[#0b2447] text-lg text-[#e8cd7a] transition-transform duration-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
            <Link
              href="#courses"
              className="border-heading/25 text-heading hover:border-accent hover:bg-accent/10 inline-flex w-full items-center justify-center rounded-full border px-8 py-[1.1rem] text-base font-semibold transition-colors sm:w-auto dark:border-white/25 dark:text-zinc-100"
            >
              Explore Courses
            </Link>
          </div>

          <ul className="mt-8 flex flex-col items-center gap-x-6 gap-y-3 text-sm font-medium text-zinc-700 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start dark:text-zinc-300">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <CheckIcon />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Mihrab-arch framed photo with a gold ring and two floating cards. */}
        <div
          style={{ '--delay': '0.3s' } as CSSProperties}
          className="rise relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div
            aria-hidden="true"
            className="border-accent/50 absolute inset-x-6 -top-4 bottom-4 mx-auto max-w-md rounded-t-[999px] rounded-b-[2rem] border"
          />
          <div className="from-accent via-accent/40 to-accent/80 relative mx-auto aspect-[4/5] w-full max-w-md rounded-t-[999px] rounded-b-[2rem] bg-gradient-to-b p-1.5 shadow-2xl shadow-blue-900/20">
            {HERO_IMAGE ? (
              <div className="bg-surface relative h-full w-full overflow-hidden rounded-t-[999px] rounded-b-[1.6rem]">
                <Image
                  src={HERO_IMAGE.src}
                  alt={HERO_IMAGE.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  priority
                  className="origin-right scale-125 object-cover object-right"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-t-[999px] rounded-b-[1.6rem] bg-gradient-to-t from-[#0b2447]/35 via-transparent to-[#e8cd7a]/10 ring-1 ring-white/40 ring-inset"
                />
              </div>
            ) : (
              <ImagePlaceholder
                label="Children learning Quran — photo coming soon"
                className="h-full w-full rounded-t-[999px]"
              />
            )}
          </div>

          <div className="animate-float-slow border-card-border bg-surface/95 absolute bottom-10 -left-2 flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-xl backdrop-blur sm:-left-6">
            <span className="bg-primary/10 text-primary grid size-10 place-items-center rounded-full text-lg">
              ✦
            </span>
            <div className="text-left">
              <p className="text-heading text-sm font-semibold">Free 3-day trial</p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">No payment needed</p>
            </div>
          </div>

          <div className="border-card-border bg-surface/95 absolute top-16 -right-2 hidden items-center gap-2 rounded-full border px-4 py-2 shadow-lg backdrop-blur sm:flex lg:-right-4">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-heading text-xs font-semibold">Live online classes</span>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="to-background pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent"
      />

      {/* Credibility strip */}
      <div className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:pb-20">
        <dl className="border-card-border bg-surface/90 grid grid-cols-2 divide-x divide-y divide-[var(--card-border)] overflow-hidden rounded-3xl border shadow-xl shadow-blue-900/5 backdrop-blur lg:grid-cols-4 lg:divide-y-0">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-5 py-6 text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="font-display text-heading block text-3xl font-semibold">
                  {stat.value}
                </span>
                <span className="mt-1 block text-sm text-zinc-600 dark:text-zinc-400">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
