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
            className="rise font-display text-heading mt-6 text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Learn the <span className="text-primary italic">Quran</span>, beautifully
            <span className="text-accent">.</span>
          </h1>

          <p
            dir="rtl"
            lang="ur"
            className="font-nastaliq mt-4 text-xl leading-loose text-zinc-700 sm:text-2xl dark:text-zinc-300"
          >
            قرآن سیکھیں، گھر بیٹھے، آن لائن
          </p>

          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-zinc-600 lg:mx-0 dark:text-zinc-400">
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
              className="bg-cta text-primary-foreground ring-accent/60 group inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold shadow-lg ring-2 shadow-blue-900/15 ring-offset-2 ring-offset-transparent transition hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
            >
              Start Free 3-Day Trial
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <Link
              href="#courses"
              className="border-heading/25 text-heading hover:border-accent hover:bg-accent/10 inline-flex w-full items-center justify-center rounded-full border px-8 py-4 text-base font-semibold transition-colors sm:w-auto dark:border-white/25 dark:text-zinc-100"
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
                  className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
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
