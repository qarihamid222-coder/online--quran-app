import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { CONTACT_EMAIL, PHONE_DISPLAY } from '@/lib/academy/contact';
import { FAQ_ITEMS } from '@/lib/academy/faq';
import { HOME_NAV_LINKS, SECTION_IDS, sectionHref, type SectionKey } from '@/lib/academy/sections';
import { TESTIMONIALS } from '@/lib/academy/testimonials';

const COMPONENT_DIR = path.join(process.cwd(), 'components', 'academy');
const SECTION_SOURCES = [
  'AboutSection',
  'CoursesSection',
  'AudienceSection',
  'TeachersSection',
  'HowItWorks',
  'TrialSection',
  'TestimonialsSection',
  'FaqSection',
  'ContactSection',
].map((name) => readFileSync(path.join(COMPONENT_DIR, `${name}.tsx`), 'utf8'));

describe('homepage section anchors', () => {
  it('has one unique id per section', () => {
    const ids = Object.values(SECTION_IDS);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z][a-z0-9-]*$/);
  });

  it('renders an element with every section id (so no navigation link can be broken)', () => {
    for (const key of Object.keys(SECTION_IDS) as SectionKey[]) {
      const rendered = SECTION_SOURCES.some((source) => source.includes(`id={SECTION_IDS.${key}}`));
      expect(rendered, `no section renders id SECTION_IDS.${key}`).toBe(true);
    }
  });

  it('points every navigation link at a real section', () => {
    for (const link of HOME_NAV_LINKS) {
      expect(SECTION_IDS[link.section]).toBeDefined();
      expect(sectionHref(link.section)).toBe(`/#${SECTION_IDS[link.section]}`);
    }
  });
});

describe('FAQ content', () => {
  it('has complete, unique questions and answers', () => {
    const questions = FAQ_ITEMS.map((item) => item.question);
    expect(new Set(questions).size).toBe(questions.length);
    for (const item of FAQ_ITEMS) {
      expect(item.question.trim().endsWith('?')).toBe(true);
      expect(item.answer.trim().length).toBeGreaterThan(20);
    }
  });

  it('never states a price, and sends fee questions to the academy', () => {
    const text = FAQ_ITEMS.map((item) => `${item.question} ${item.answer}`).join(' ');
    expect(text).not.toMatch(/(?:rs\.?|pkr|usd|\$|£|€)\s?\d/i);
    const fees = FAQ_ITEMS.find((item) => /fees/i.test(item.question));
    expect(fees?.answer).toMatch(/WhatsApp/);
  });

  it('uses the real contact details', () => {
    const contact = FAQ_ITEMS.find((item) => /contact/i.test(item.question));
    expect(contact?.answer).toContain(PHONE_DISPLAY);
    expect(contact?.answer).toContain(CONTACT_EMAIL);
  });
});

describe('testimonials', () => {
  it('only ever contains complete, real entries (the section stays hidden while empty)', () => {
    for (const item of TESTIMONIALS) {
      expect(item.id && item.quote.trim() && item.name.trim() && item.role.trim()).toBeTruthy();
    }
  });

  it('is empty today, so no testimonial or placeholder is shown', () => {
    expect(TESTIMONIALS).toEqual([]);
  });
});
