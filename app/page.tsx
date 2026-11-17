import { AboutSection } from '@/components/academy/AboutSection';
import { AudienceSection } from '@/components/academy/AudienceSection';
import { ContactSection } from '@/components/academy/ContactSection';
import { CoursesSection } from '@/components/academy/CoursesSection';
import { Hero } from '@/components/academy/Hero';
import { FaqSection } from '@/components/academy/FaqSection';
import { HowItWorks } from '@/components/academy/HowItWorks';
import { TeachersSection } from '@/components/academy/TeachersSection';
import { TestimonialsSection } from '@/components/academy/TestimonialsSection';
import { TrialSection } from '@/components/academy/TrialSection';
import { CONTACT_EMAIL, PHONE_DISPLAY } from '@/lib/academy/contact';
import { COURSES } from '@/lib/academy/courses';
import { FAQ_ITEMS } from '@/lib/academy/faq';

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

// FAQPage structured data from the same questions and answers shown on the page.
const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

function jsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(ORGANIZATION_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(FAQ_JSON_LD) }}
      />
      <Hero />
      <AboutSection />
      <CoursesSection />
      <AudienceSection />
      <TeachersSection />
      <HowItWorks />
      <TrialSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
