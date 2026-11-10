import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/LegalPage';
import { TERMS_INTRO, TERMS_SECTIONS, TERMS_UPDATED } from '@/lib/legal/terms';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Al-Hameed Online Quran Academy',
  description:
    'Terms for online classes, free trial, scheduling, cancellations and communication at Al-Hameed Online Quran Academy.',
};

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated={TERMS_UPDATED}
      intro={TERMS_INTRO}
      sections={TERMS_SECTIONS}
      contactMessage="Assalam o Alaikum! I have a question about your Terms & Conditions."
      otherPage={{ href: '/privacy-policy', label: 'Privacy Policy' }}
    />
  );
}
