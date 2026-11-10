import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/LegalPage';
import { PRIVACY_INTRO, PRIVACY_SECTIONS, PRIVACY_UPDATED } from '@/lib/legal/privacyPolicy';

export const metadata: Metadata = {
  title: 'Privacy Policy — Al-Hameed Online Quran Academy',
  description:
    'How Al-Hameed Online Quran Academy collects, uses, stores and protects student and parent information.',
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated={PRIVACY_UPDATED}
      intro={PRIVACY_INTRO}
      sections={PRIVACY_SECTIONS}
      contactMessage="Assalam o Alaikum! I have a question about your Privacy Policy."
      otherPage={{ href: '/terms-and-conditions', label: 'Terms & Conditions' }}
    />
  );
}
