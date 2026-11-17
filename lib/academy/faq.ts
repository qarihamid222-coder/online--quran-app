import { CONTACT_EMAIL, PHONE_DISPLAY } from './contact';
import { COURSES } from './courses';
import { PREFERRED_LANGUAGES } from './trialForm';

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Answers use only facts already published on the site. Fees, timings and
 * teacher details are deliberately not stated: they are confirmed personally
 * on WhatsApp.
 */
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Who can join Al-Hameed Online Quran Academy?',
    answer:
      'Children, adults and complete beginners. Every class is live and one-on-one, online, so you learn from home at your own level.',
  },
  {
    question: 'Which courses do you offer?',
    answer: `We offer ${COURSES.map((course) => course.name).join(', ')}. Each course is taught live, one-on-one.`,
  },
  {
    question: 'How does the free 3-day trial work?',
    answer:
      'Message us on WhatsApp or fill in the short enquiry form, and we will schedule your first class. The trial is free, with no payment and no commitment.',
  },
  {
    question: 'How do I enrol?',
    answer:
      'Start with the free 3-day trial. Message us on WhatsApp or send the enquiry form, and the academy will guide you through the next steps personally.',
  },
  {
    question: 'What are the fees?',
    answer:
      'We share fees personally so that they match the student’s course and needs. Message us on WhatsApp and we will tell you. The 3-day trial itself costs nothing.',
  },
  {
    question: 'Can I choose a male or a female teacher?',
    answer:
      'Yes. Both male and female teachers are available. Tell us your preference on WhatsApp or in the enquiry form, and we will confirm the match personally.',
  },
  {
    question: 'Do I need any previous knowledge?',
    answer:
      'No. Every course starts from the basics, so complete beginners are welcome, including children who have never read Arabic.',
  },
  {
    question: 'Which languages can I learn in?',
    answer: `When you request the trial you can choose your preferred language: ${PREFERRED_LANGUAGES.join(', ')}.`,
  },
  {
    question: 'Is the Quran reader on this website free?',
    answer:
      'Yes. You can read every surah and juz with Arabic text, English and Urdu translations and audio, and save bookmarks, free of charge.',
  },
  {
    question: 'How can I contact the academy?',
    answer: `On WhatsApp at ${PHONE_DISPLAY}, or by email at ${CONTACT_EMAIL}.`,
  },
];
