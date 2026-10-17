import { describe, expect, it } from 'vitest';
import { COURSES, getCourseBySlug } from '@/lib/academy/courses';

describe('COURSES', () => {
  it('has a unique slug for every course', () => {
    const slugs = COURSES.map((course) => course.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('gives every course at least one audience', () => {
    for (const course of COURSES) {
      expect(course.audience.length).toBeGreaterThan(0);
    }
  });
});

describe('getCourseBySlug', () => {
  it('finds an existing course', () => {
    expect(getCourseBySlug('hifz-ul-quran')?.name).toBe('Hifz-ul-Quran');
  });

  it('returns undefined for an unknown slug', () => {
    expect(getCourseBySlug('not-a-course')).toBeUndefined();
  });
});
