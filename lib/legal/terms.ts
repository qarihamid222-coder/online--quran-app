import { CONTACT_EMAIL } from '@/lib/academy/contact';
import type { LegalSection } from '@/components/legal/LegalPage';

export const TERMS_UPDATED = '10 November 2026';

export const TERMS_INTRO =
  'These terms explain how Al-Hameed Online Quran Academy works with students and parents. By contacting us, joining a trial class or enrolling, you agree to them. If anything here is unclear, please ask us before you begin.';

export const TERMS_SECTIONS: LegalSection[] = [
  {
    id: 'our-services',
    title: 'Our services',
    paragraphs: [
      'We offer live online lessons in the Quran and related subjects, as described in the courses section of our website, for children and adults, in English, Urdu or Arabic. Information on the website is a general description of what we teach. The exact course, level, teacher and schedule for a student are confirmed with you directly.',
    ],
  },
  {
    id: 'trial-classes',
    title: 'Free trial classes',
    paragraphs: [
      'We offer a free 3-day trial so that students can experience our classes before deciding to continue. You can request it through the website form or on WhatsApp. Trial timings are confirmed with you by WhatsApp and depend on teacher availability.',
      'Joining a trial does not oblige you to enrol. Any arrangement for classes after the trial is discussed with you and agreed before it starts.',
    ],
  },
  {
    id: 'fees',
    title: 'Fees',
    paragraphs: [
      'This website does not list or promise any fees. If you wish to continue after the trial, we will tell you about any fees and how payment works before you commit, and nothing is charged without your agreement.',
    ],
  },
  {
    id: 'online-classes',
    title: 'How online classes work',
    paragraphs: [
      'Classes are held live online with a teacher, using a video or audio calling platform that we agree with you in advance. To take part, a student needs:',
    ],
    items: [
      'A phone, tablet or computer with a working microphone, and a camera if the teacher asks for one',
      'A reliable internet connection',
      'A quiet place to learn',
      'For younger children, a parent or another adult nearby to help them get started',
    ],
  },
  {
    id: 'student-responsibilities',
    title: 'Student and parent responsibilities',
    items: [
      'Join classes on time and be ready to learn',
      'Practise between classes as the teacher advises',
      'Treat the teacher and other people with respect, as is expected in any place of learning',
      'Give us correct contact details and tell us if they change',
      'For children, parents or guardians are responsible for supervising their child while they use the internet',
    ],
  },
  {
    id: 'scheduling',
    title: 'Scheduling',
    paragraphs: [
      'Because our students live in many countries, we arrange class times with each family and confirm the time zone when we agree a schedule. Class days and times are agreed by WhatsApp. Any change, by you or by us, should be agreed in the same way.',
    ],
  },
  {
    id: 'cancellations',
    title: 'Cancellations and absences',
    paragraphs: [
      "If a student cannot attend a class, please tell us on WhatsApp as early as you can. We will try to arrange another time, depending on the teacher's availability. If a teacher needs to cancel or change a class, we will tell you as soon as possible and offer an alternative time.",
      'The details of rescheduling, missed classes and any refunds for paid classes are agreed with you in writing before paid classes begin, so that both sides understand them.',
    ],
  },
  {
    id: 'communication',
    title: 'Communication',
    paragraphs: [
      'WhatsApp is our main way of communicating with students and parents, for example to confirm times, send reminders and answer questions. We reply as soon as we reasonably can, but not always immediately, as our teachers and students are in different time zones. Please use only the contact details published on this website when you contact us.',
    ],
  },
  {
    id: 'progress',
    title: 'Progress and results',
    paragraphs: [
      'Every student learns at their own pace. We teach carefully and give feedback, but we cannot guarantee a particular level, result or completion date. Progress also depends on regular attendance and practice.',
    ],
  },
  {
    id: 'quran-reader',
    title: 'The Quran reader on this website',
    paragraphs: [
      'The Quran reader is provided for convenience. Its Arabic text, translations and recitation audio come from third-party services. We try to display them accurately, but if you notice a mistake, please tell us. The reader is not a replacement for learning recitation with a teacher.',
    ],
  },
  {
    id: 'website-use',
    title: 'Using this website',
    paragraphs: [
      'You are welcome to use this website for your own learning and to contact us. Please do not misuse it, attempt to disrupt it, or copy its content for commercial purposes without our permission.',
    ],
  },
  {
    id: 'privacy',
    title: 'Your privacy',
    paragraphs: [
      'How we collect, use and protect your personal information is explained in our Privacy Policy, which forms part of these terms.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    paragraphs: [
      'We may update these terms from time to time. The date at the top shows when they were last changed. If you are already a student, we will tell you about important changes.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact us',
    paragraphs: [
      `For any question about these terms, message us on WhatsApp at +92 323 7185867 or email us at ${CONTACT_EMAIL}.`,
    ],
  },
];
