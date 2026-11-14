import { CONTACT_EMAIL } from '@/lib/academy/contact';
import type { LegalSection } from '@/components/legal/LegalPage';

export const PRIVACY_UPDATED = '10 November 2026';

export const PRIVACY_INTRO =
  'Al-Hameed Online Quran Academy teaches the Quran and related subjects online to students of all ages around the world. This page explains what personal information we collect when you contact us, how we use it, and the choices you have. We have written it in plain language and have tried to describe only what actually happens.';

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: 'information-we-collect',
    title: 'Information we collect',
    paragraphs: [
      'We collect only what we need to answer your enquiry and organise classes. When you use the free trial enquiry form, or message us on WhatsApp, this may include:',
    ],
    items: [
      "The student's name",
      "A parent or guardian's name (optional)",
      "The student's age",
      'Your WhatsApp number',
      'The course you are interested in and your preferred language (English, Urdu or Arabic)',
      'Any message you choose to write to us',
    ],
    after:
      'The website does not have user accounts, and we do not ask for passwords, payment card details or identity documents through the enquiry form.',
  },
  {
    id: 'how-the-form-works',
    title: 'How the enquiry form works',
    paragraphs: [
      'The enquiry form on this website does not save your details in a website database. When you submit it, the website prepares a WhatsApp message containing what you typed and opens WhatsApp so that you can review it and press send. Your details reach us only if you send that message. If you do not send it, nothing is delivered to us.',
      'You can also contact us on WhatsApp directly without using the form.',
    ],
  },
  {
    id: 'how-we-use-information',
    title: 'How we use your information',
    items: [
      'To reply to your enquiry and answer your questions',
      'To arrange a trial class and to schedule regular classes',
      'To communicate with students and parents about classes, timings and changes',
      'To place the student in a suitable course and teacher, based on age, level and language',
    ],
    after:
      'We do not use your information for advertising by third parties, and we do not make decisions about you using automated profiling.',
  },
  {
    id: 'children',
    title: 'Children',
    paragraphs: [
      'Many of our students are children. We ask that enquiries for young students are made by a parent or guardian, who should also take part in arranging classes. We ask for only the minimum information about a child that is needed to teach them well.',
    ],
  },
  {
    id: 'sharing',
    title: 'Sharing your information',
    paragraphs: [
      'We do not sell your personal information, and we do not rent it or trade it.',
      'We share it only in these limited cases:',
    ],
    items: [
      'With the teacher assigned to the student, so that they can prepare and teach the class',
      'With WhatsApp (Meta), because messages are sent and received through WhatsApp and are handled under its own terms and privacy policy',
      'Where the law requires us to disclose it, or to protect the safety of a student',
    ],
  },
  {
    id: 'storage-and-protection',
    title: 'Storage and protection',
    paragraphs: [
      'Information you send us is held in our WhatsApp conversations and in any simple records we keep to schedule classes. We limit access to the people who need it to run classes, and we ask them to treat it as confidential.',
      'We keep information only for as long as it is needed for your enquiry or for teaching the student. You may ask us at any time to delete it (see "Your choices"), unless we have a legal reason to keep it.',
      'No method of sending or storing information is completely secure, so we cannot promise absolute security. Please do not send sensitive information that we do not ask for.',
    ],
  },
  {
    id: 'on-your-device',
    title: 'Information stored on your device',
    paragraphs: [
      "The website saves two things in your own browser, and nowhere else: your light or dark theme choice, and the Quran verses you bookmark. This information stays on your device and is not sent to us. You can remove it at any time by clearing this site's data in your browser settings.",
      'We have not added advertising or tracking cookies, or analytics tools, to this website. Our hosting provider may keep standard technical logs (for example, your IP address and the pages requested) in order to deliver the site securely.',
    ],
  },
  {
    id: 'third-party-quran-content',
    title: 'Quran text and audio from other services',
    paragraphs: [
      'The Quran reader loads Arabic text and translations from the Al Quran Cloud service, and verse recitation audio from the Islamic Network audio service. When you read or play audio, your device or our server contacts those services, which may see technical details such as your IP address. They operate under their own privacy practices.',
    ],
  },
  {
    id: 'your-choices',
    title: 'Your choices',
    paragraphs: ['You may contact us at any time to:'],
    items: [
      'Ask what information we hold about you or your child',
      'Ask us to correct information that is wrong',
      'Ask us to delete your information or stop contacting you',
    ],
    after:
      'We will respond as soon as we reasonably can. Depending on where you live, you may also have rights under your local data protection laws, and we will respect them.',
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    paragraphs: [
      'We may update this page from time to time. The date at the top shows when it was last changed. If we make an important change, we will make it clear on the website.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact us about privacy',
    paragraphs: [
      `If you have a question about this policy or about your information, message us on WhatsApp at +92 323 7185867 or email us at ${CONTACT_EMAIL}. Please mention that your message is about privacy, and we will reply as soon as we can.`,
    ],
  },
];
