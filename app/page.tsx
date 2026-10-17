import { AudienceSection } from '@/components/academy/AudienceSection';
import { CoursesSection } from '@/components/academy/CoursesSection';
import { Hero } from '@/components/academy/Hero';
import { TrialSection } from '@/components/academy/TrialSection';

export default function Home() {
  return (
    <>
      <Hero />
      <AudienceSection />
      <CoursesSection />
      <TrialSection />
    </>
  );
}
