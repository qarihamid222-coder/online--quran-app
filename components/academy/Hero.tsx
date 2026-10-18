import Image from 'next/image';
import Link from 'next/link';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { whatsappLink } from '@/lib/academy/contact';
import { HERO_IMAGE } from '@/lib/academy/images';

export function Hero() {
  return (
    <section className="bg-surface px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
        <div className="text-center lg:text-left">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase">
            Al-Hameed Online Quran Academy
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
            Learn the Quran, online, from anywhere
          </h1>
          <p
            dir="rtl"
            lang="ur"
            className="font-nastaliq mt-2 text-xl text-zinc-700 dark:text-zinc-300"
          >
            قرآن سیکھیں، گھر بیٹھے، آن لائن
          </p>
          <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-600 lg:mx-0 dark:text-zinc-400">
            Noorani Qaida, Nazra, Tajweed, Hifz, and Arabic — live one-on-one classes for children,
            adults, and beginners.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <a
              href={whatsappLink(
                'Assalam o Alaikum! I would like to start a free 3-day trial class.',
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground inline-flex w-full items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold transition-opacity hover:opacity-90 sm:w-auto"
            >
              Start Free 3-Day Trial
            </a>
            <Link
              href="#courses"
              className="border-accent text-accent-foreground hover:bg-accent/10 dark:text-accent inline-flex w-full items-center justify-center rounded-full border-2 px-8 py-3.5 text-base font-semibold transition-colors sm:w-auto"
            >
              View Courses
            </Link>
          </div>
        </div>
        {HERO_IMAGE ? (
          <div className="relative h-64 w-full overflow-hidden rounded-2xl lg:h-96">
            <Image
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              className="object-cover"
            />
          </div>
        ) : (
          <ImagePlaceholder
            label="Children learning Quran — photo coming soon"
            className="h-64 w-full lg:h-96"
          />
        )}
      </div>
    </section>
  );
}
