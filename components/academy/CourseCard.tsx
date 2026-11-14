import Image from 'next/image';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { whatsappLink } from '@/lib/academy/contact';
import { AUDIENCE_BADGE_CLASSES, AUDIENCE_LABELS, type Course } from '@/lib/academy/courses';

export function CourseCard({ course }: { course: Course }) {
  return (
    <li className="group border-card-border bg-background hover:border-accent/70 flex flex-col overflow-hidden rounded-3xl border shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-900/10">
      {course.image ? (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={course.image.src}
            alt={course.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="from-accent via-accent/50 absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r to-transparent"
          />
        </div>
      ) : (
        <ImagePlaceholder
          label="Photo coming soon"
          className="h-48 w-full rounded-none border-x-0 border-t-0"
        />
      )}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="font-display text-heading text-xl font-semibold">{course.name}</h3>
          <p dir="rtl" lang="ur" className="font-nastaliq text-primary mt-1 text-lg">
            {course.urduName}
          </p>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {course.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {course.audience.map((tag) => (
            <span
              key={tag}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${AUDIENCE_BADGE_CLASSES[tag]}`}
            >
              {AUDIENCE_LABELS[tag]}
            </span>
          ))}
        </div>
        {/* Sized to match the hero and free-trial CTAs, so every WhatsApp
            button on the site is equally easy to tap. */}
        <a
          href={whatsappLink(`Assalam o Alaikum! I'm interested in the ${course.name} course.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground hover:bg-heading mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold transition-colors"
        >
          Ask on WhatsApp
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </li>
  );
}
