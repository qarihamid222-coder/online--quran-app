/** Contact details for the Al-Hameed Online Quran Academy. */

export const WHATSAPP_NUMBER = '923237185867';

export const PHONE_DISPLAY = '+92 323 7185867';

export const CONTACT_EMAIL = 'alhameedonlinequranacademy2026@gmail.com';

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
