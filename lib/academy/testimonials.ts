export interface Testimonial {
  /** Stable key. */
  id: string;
  /** What the student or parent said, in their own words. */
  quote: string;
  /** Name, or initials if they prefer not to share their name. */
  name: string;
  /** For example "Parent of a Noorani Qaida student" or "Adult student". */
  role: string;
  /** Optional, for example "United Kingdom". */
  location?: string;
}

/**
 * Real testimonials only. The homepage shows the testimonials section ONLY when
 * this list has entries; while it is empty nothing is rendered, and no
 * placeholder or invented quote is ever shown. Add an entry only with the
 * person's permission to publish their words.
 */
export const TESTIMONIALS: Testimonial[] = [];
