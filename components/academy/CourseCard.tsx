import Image from 'next/image';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { whatsappLink } from '@/lib/academy/contact';
import { AUDIENCE_LABELS, type Course } from '@/lib/academy/courses';

export function CourseCard({ course }: { course: Course }) {
  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      {course.image ? (
        <div className="relative h-40 w-full">
          <Image
            src={course.image.src}
            alt={course.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <ImagePlaceholder
          label="Photo coming soon"
          className="h-40 w-full rounded-none border-x-0 border-t-0"
        />
      )}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{course.name}</h3>
          <p dir="rtl" lang="ur" className="font-nastaliq text-primary mt-0.5 text-base">
            {course.urduName}
          </p>
        </div>
        <p className="flex-1 text-sm text-zinc-600 dark:text-zinc-400">{course.description}</p>
        <div className="flex flex-wrap gap-2">
          {course.audience.map((tag) => (
            <span
              key={tag}
              className="bg-primary/10 text-primary dark:bg-primary/15 rounded-full px-3 py-1 text-xs font-medium"
            >
              {AUDIENCE_LABELS[tag]}
            </span>
          ))}
        </div>
        <a
          href={whatsappLink(`Assalam o Alaikum! I'm interested in the ${course.name} course.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground mt-1 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
        >
          Ask on WhatsApp
        </a>
      </div>
    </li>
  );
}
