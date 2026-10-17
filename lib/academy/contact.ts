/** Contact details for the Al-Hameed Online Quran Academy. */

// TODO: replace with the real academy WhatsApp number before going live
// (international format, digits only — no "+", spaces, or leading 0).
export const WHATSAPP_NUMBER = '923000000000';

// TODO: replace with the real display phone number.
export const PHONE_DISPLAY = '+92 300 0000000';

// TODO: replace with the real contact email.
export const CONTACT_EMAIL = 'info@example.com';

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
