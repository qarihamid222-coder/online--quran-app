import { describe, expect, it } from 'vitest';
import {
  EMPTY_TRIAL_FORM_VALUES,
  buildTrialEnquiryMessage,
  isTrialFormValid,
  validateTrialForm,
  type TrialFormValues,
} from '@/lib/academy/trialForm';

const VALID_VALUES: TrialFormValues = {
  studentName: 'Ali',
  parentName: 'Hamid',
  whatsappNumber: '03237185867',
  studentAge: '10',
  courseSlug: 'nazra-quran',
  preferredLanguage: 'Urdu',
  message: 'Looking for weekend classes.',
};

describe('validateTrialForm', () => {
  it('reports no errors for fully valid values', () => {
    expect(validateTrialForm(VALID_VALUES)).toEqual({});
  });

  it('requires a student name', () => {
    const errors = validateTrialForm({ ...VALID_VALUES, studentName: '  ' });
    expect(errors.studentName).toBeDefined();
  });

  it('requires a WhatsApp number and rejects an invalid one', () => {
    expect(validateTrialForm({ ...VALID_VALUES, whatsappNumber: '' }).whatsappNumber).toBeDefined();
    expect(
      validateTrialForm({ ...VALID_VALUES, whatsappNumber: 'not a number' }).whatsappNumber,
    ).toBeDefined();
  });

  it('requires a valid student age', () => {
    expect(validateTrialForm({ ...VALID_VALUES, studentAge: '' }).studentAge).toBeDefined();
    expect(validateTrialForm({ ...VALID_VALUES, studentAge: '0' }).studentAge).toBeDefined();
    expect(validateTrialForm({ ...VALID_VALUES, studentAge: '200' }).studentAge).toBeDefined();
    expect(validateTrialForm({ ...VALID_VALUES, studentAge: '7.5' }).studentAge).toBeDefined();
  });

  it('requires a course and a preferred language', () => {
    expect(validateTrialForm({ ...VALID_VALUES, courseSlug: '' }).courseSlug).toBeDefined();
    expect(
      validateTrialForm({ ...VALID_VALUES, preferredLanguage: '' }).preferredLanguage,
    ).toBeDefined();
  });

  it('does not require a parent name or a message', () => {
    const errors = validateTrialForm({ ...VALID_VALUES, parentName: '', message: '' });
    expect(errors).toEqual({});
  });
});

describe('isTrialFormValid', () => {
  it('matches validateTrialForm returning no errors', () => {
    expect(isTrialFormValid(VALID_VALUES)).toBe(true);
    expect(isTrialFormValid(EMPTY_TRIAL_FORM_VALUES)).toBe(false);
  });
});

describe('buildTrialEnquiryMessage', () => {
  it('includes every filled field and the course name, not just its slug', () => {
    const message = buildTrialEnquiryMessage(VALID_VALUES);
    expect(message).toContain('Student name: Ali');
    expect(message).toContain('Parent name: Hamid');
    expect(message).toContain('Student age: 10');
    expect(message).toContain('Course: Nazra Quran');
    expect(message).toContain('Preferred language: Urdu');
    expect(message).toContain('WhatsApp number: 03237185867');
    expect(message).toContain('Message: Looking for weekend classes.');
  });

  it('omits the parent name and message lines when not provided', () => {
    const message = buildTrialEnquiryMessage({ ...VALID_VALUES, parentName: '', message: '' });
    expect(message).not.toContain('Parent name:');
    expect(message).not.toContain('Message:');
  });
});
