import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

// Each audience is tied to one of the three theme colors (matching the
// course-card badges), so green, gold, and red are all clearly present here.
const AUDIENCES = [
  {
    title: 'Children',
    description:
      'A gentle, encouraging start — Noorani Qaida and Nazra classes paced for young learners.',
    colorClass: 'text-primary',
  },
  {
    title: 'Adults',
    description:
      'Flexible class times for working professionals, parents, and anyone starting (or restarting) their Quran journey.',
    colorClass: 'text-danger',
  },
  {
    title: 'Beginners',
    description:
      "No prior knowledge needed. Every course starts from the basics, in the language you're most comfortable in.",
    colorClass: 'text-accent',
  },
];

export function AudienceSection() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
        <ImagePlaceholder
          label="Students in an online class — photo coming soon"
          className="h-64 w-full lg:h-80"
        />
        <div>
          <h2 className="text-3xl font-semibold text-zinc-900 sm:text-4xl dark:text-zinc-50">
            For every age, every level
          </h2>
          <dl className="mt-8 flex flex-col gap-6">
            {AUDIENCES.map((item) => (
              <div key={item.title}>
                <dt className={`text-lg font-semibold ${item.colorClass}`}>{item.title}</dt>
                <dd className="mt-1 text-base text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
