import { COURSES } from './courses';

export const PREFERRED_LANGUAGES = ['English', 'Urdu', 'Arabic'] as const;
export type PreferredLanguage = (typeof PREFERRED_LANGUAGES)[number];

export interface TrialFormValues {
  studentName: string;
  parentName: string;
  whatsappNumber: string;
  studentAge: string;
  courseSlug: string;
  preferredLanguage: string;
  message: string;
}

export const EMPTY_TRIAL_FORM_VALUES: TrialFormValues = {
  studentName: '',
  parentName: '',
  whatsappNumber: '',
  studentAge: '',
  courseSlug: '',
  preferredLanguage: '',
  message: '',
};

export type TrialFormErrors = Partial<Record<keyof TrialFormValues, string>>;

/** Only digits, spaces, "+", and "-" — permissive about formatting, strict about content. */
const PHONE_PATTERN = /^[0-9+\s-]{7,20}$/;

export function validateTrialForm(values: TrialFormValues): TrialFormErrors {
  const errors: TrialFormErrors = {};

  if (!values.studentName.trim()) {
    errors.studentName = "Please enter the student's name.";
  }

  const whatsappNumber = values.whatsappNumber.trim();
  if (!whatsappNumber) {
    errors.whatsappNumber = 'Please enter a WhatsApp number.';
  } else if (!PHONE_PATTERN.test(whatsappNumber)) {
    errors.whatsappNumber = 'Please enter a valid WhatsApp number.';
  }

  const studentAge = values.studentAge.trim();
  const age = Number(studentAge);
  if (!studentAge) {
    errors.studentAge = "Please enter the student's age.";
  } else if (!Number.isInteger(age) || age < 3 || age > 90) {
    errors.studentAge = 'Please enter a valid age (3–90).';
  }

  if (!values.courseSlug) {
    errors.courseSlug = 'Please select a course.';
  }

  if (!values.preferredLanguage) {
    errors.preferredLanguage = 'Please select a preferred language.';
  }

  return errors;
}

export function isTrialFormValid(values: TrialFormValues): boolean {
  return Object.keys(validateTrialForm(values)).length === 0;
}

/** Builds the WhatsApp message sent on submission, so what's typed is exactly what's sent. */
export function buildTrialEnquiryMessage(values: TrialFormValues): string {
  const course = COURSES.find((c) => c.slug === values.courseSlug);
  const lines = [
    'Assalam o Alaikum! I would like to enquire about the free 3-day trial.',
    `Student name: ${values.studentName.trim()}`,
  ];

  if (values.parentName.trim()) {
    lines.push(`Parent name: ${values.parentName.trim()}`);
  }

  lines.push(`Student age: ${values.studentAge.trim()}`);
  lines.push(`Course: ${course?.name ?? values.courseSlug}`);
  lines.push(`Preferred language: ${values.preferredLanguage}`);
  lines.push(`WhatsApp number: ${values.whatsappNumber.trim()}`);

  if (values.message.trim()) {
    lines.push(`Message: ${values.message.trim()}`);
  }

  return lines.join('\n');
}
