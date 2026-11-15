import { AudienceSection } from '@/components/academy/AudienceSection';
import { CoursesSection } from '@/components/academy/CoursesSection';
import { Hero } from '@/components/academy/Hero';
import { HowItWorks } from '@/components/academy/HowItWorks';
import { TrialSection } from '@/components/academy/TrialSection';
import { CONTACT_EMAIL, PHONE_DISPLAY } from '@/lib/academy/contact';
import { COURSES } from '@/lib/academy/courses';

// Structured data built only from facts already on the site.
const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Al-Hameed Online Quran Academy',
  description:
    'Live one-on-one online Quran, Tajweed, Hifz and Arabic classes for children, adults and beginners, with a free 3-day trial.',
  email: CONTACT_EMAIL,
  telephone: PHONE_DISPLAY,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Courses',
    itemListElement: COURSES.map((course) => ({
      '@type': 'Course',
      name: course.name,
      description: course.description,
      provider: { '@type': 'EducationalOrganization', name: 'Al-Hameed Online Quran Academy' },
    })),
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ORGANIZATION_JSON_LD).replace(/</g, '\\u003c'),
        }}
      />
      <Hero />
      <AudienceSection />
      <CoursesSection />
      <HowItWorks />
      <TrialSection />
    </>
  );
}
