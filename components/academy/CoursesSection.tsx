import { COURSES } from '@/lib/academy/courses';
import { CourseCard } from './CourseCard';

export function CoursesSection() {
  return (
    <section id="courses" className="bg-surface px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-heading text-center text-3xl font-semibold sm:text-4xl">
          Our Courses
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-zinc-600 dark:text-zinc-400">
          Live, one-on-one online classes for every stage of the Quran journey.
        </p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </ul>
      </div>
    </section>
  );
}
