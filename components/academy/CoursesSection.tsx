import { COURSES } from '@/lib/academy/courses';
import { CourseCard } from './CourseCard';
import { SectionHeading } from './SectionHeading';

export function CoursesSection() {
  return (
    <section id="courses" className="bg-surface relative scroll-mt-16 px-4 py-20 sm:px-6 lg:py-28">
      <div
        aria-hidden="true"
        className="pattern-islamic absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_45%)] opacity-40"
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Our curriculum"
          title="Courses for every stage of the journey"
          description="Live, one-on-one online classes — from your first Arabic letters to memorizing the complete Quran."
        />
        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </ul>
      </div>
    </section>
  );
}
