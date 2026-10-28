'use client';

import { useState, type FormEvent } from 'react';
import { whatsappLink } from '@/lib/academy/contact';
import { COURSES } from '@/lib/academy/courses';
import {
  EMPTY_TRIAL_FORM_VALUES,
  PREFERRED_LANGUAGES,
  buildTrialEnquiryMessage,
  validateTrialForm,
  type TrialFormErrors,
  type TrialFormValues,
} from '@/lib/academy/trialForm';

const FIELD_CLASSES =
  'w-full rounded-lg border border-card-border bg-white px-4 py-2.5 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-primary focus:outline-none dark:bg-zinc-900 dark:text-zinc-100';
const LABEL_CLASSES = 'text-sm font-medium text-zinc-700 dark:text-zinc-300';

export function TrialForm() {
  const [values, setValues] = useState<TrialFormValues>(EMPTY_TRIAL_FORM_VALUES);
  const [errors, setErrors] = useState<TrialFormErrors>({});
  const [status, setStatus] = useState<'idle' | 'success' | 'blocked'>('idle');
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  function update<K extends keyof TrialFormValues>(key: K, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateTrialForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle');
      return;
    }

    const url = whatsappLink(buildTrialEnquiryMessage(values));
    const opened = window.open(url, '_blank', 'noopener,noreferrer');

    if (opened) {
      setStatus('success');
      setFallbackUrl(null);
      setValues(EMPTY_TRIAL_FORM_VALUES);
    } else {
      // The popup was blocked — be honest that nothing was sent yet, and give
      // a direct link the visitor can open themselves.
      setStatus('blocked');
      setFallbackUrl(url);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 flex max-w-xl flex-col gap-4 rounded-2xl border border-card-border bg-white p-6 text-left shadow-sm sm:p-8 dark:bg-zinc-950"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="trial-student-name" className={LABEL_CLASSES}>
            Student name
          </label>
          <input
            id="trial-student-name"
            type="text"
            value={values.studentName}
            onChange={(e) => update('studentName', e.target.value)}
            className={FIELD_CLASSES}
            aria-invalid={Boolean(errors.studentName)}
            aria-describedby={errors.studentName ? 'trial-student-name-error' : undefined}
          />
          {errors.studentName ? (
            <p id="trial-student-name-error" className="text-danger text-sm">
              {errors.studentName}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="trial-parent-name" className={LABEL_CLASSES}>
            Parent name <span className="text-zinc-400">(if applicable)</span>
          </label>
          <input
            id="trial-parent-name"
            type="text"
            value={values.parentName}
            onChange={(e) => update('parentName', e.target.value)}
            className={FIELD_CLASSES}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="trial-whatsapp" className={LABEL_CLASSES}>
            WhatsApp number
          </label>
          <input
            id="trial-whatsapp"
            type="tel"
            value={values.whatsappNumber}
            onChange={(e) => update('whatsappNumber', e.target.value)}
            className={FIELD_CLASSES}
            placeholder="03XXXXXXXXX"
            aria-invalid={Boolean(errors.whatsappNumber)}
            aria-describedby={errors.whatsappNumber ? 'trial-whatsapp-error' : undefined}
          />
          {errors.whatsappNumber ? (
            <p id="trial-whatsapp-error" className="text-danger text-sm">
              {errors.whatsappNumber}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="trial-age" className={LABEL_CLASSES}>
            Student age
          </label>
          <input
            id="trial-age"
            type="number"
            min={3}
            max={90}
            value={values.studentAge}
            onChange={(e) => update('studentAge', e.target.value)}
            className={FIELD_CLASSES}
            aria-invalid={Boolean(errors.studentAge)}
            aria-describedby={errors.studentAge ? 'trial-age-error' : undefined}
          />
          {errors.studentAge ? (
            <p id="trial-age-error" className="text-danger text-sm">
              {errors.studentAge}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="trial-course" className={LABEL_CLASSES}>
            Course
          </label>
          <select
            id="trial-course"
            value={values.courseSlug}
            onChange={(e) => update('courseSlug', e.target.value)}
            className={FIELD_CLASSES}
            aria-invalid={Boolean(errors.courseSlug)}
            aria-describedby={errors.courseSlug ? 'trial-course-error' : undefined}
          >
            <option value="">Select a course…</option>
            {COURSES.map((course) => (
              <option key={course.slug} value={course.slug}>
                {course.name}
              </option>
            ))}
          </select>
          {errors.courseSlug ? (
            <p id="trial-course-error" className="text-danger text-sm">
              {errors.courseSlug}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="trial-language" className={LABEL_CLASSES}>
            Preferred language
          </label>
          <select
            id="trial-language"
            value={values.preferredLanguage}
            onChange={(e) => update('preferredLanguage', e.target.value)}
            className={FIELD_CLASSES}
            aria-invalid={Boolean(errors.preferredLanguage)}
            aria-describedby={errors.preferredLanguage ? 'trial-language-error' : undefined}
          >
            <option value="">Select a language…</option>
            {PREFERRED_LANGUAGES.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
          {errors.preferredLanguage ? (
            <p id="trial-language-error" className="text-danger text-sm">
              {errors.preferredLanguage}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="trial-message" className={LABEL_CLASSES}>
          Message <span className="text-zinc-400">(optional)</span>
        </label>
        <textarea
          id="trial-message"
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
          rows={3}
          className={FIELD_CLASSES}
          placeholder="Anything else we should know?"
        />
      </div>

      <button
        type="submit"
        className="bg-primary text-primary-foreground mt-2 inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold transition-opacity hover:opacity-90"
      >
        Send Enquiry on WhatsApp
      </button>

      {status === 'success' ? (
        <p role="status" className="text-primary text-center text-sm font-medium">
          Your enquiry is ready — we&apos;ve opened WhatsApp with your details filled in. Please tap
          Send there to complete it.
        </p>
      ) : null}

      {status === 'blocked' && fallbackUrl ? (
        <p role="alert" className="text-danger text-center text-sm font-medium">
          Your browser blocked the WhatsApp pop-up, so nothing has been sent yet.{' '}
          <a href={fallbackUrl} target="_blank" rel="noopener noreferrer" className="underline">
            Tap here to open WhatsApp
          </a>{' '}
          and send your enquiry.
        </p>
      ) : null}
    </form>
  );
}
