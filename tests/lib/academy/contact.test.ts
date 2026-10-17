import { describe, expect, it } from 'vitest';
import { WHATSAPP_NUMBER, whatsappLink } from '@/lib/academy/contact';

describe('whatsappLink', () => {
  it('builds a wa.me link with the academy number and an encoded message', () => {
    expect(whatsappLink('Hello there!')).toBe(
      `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20there!`,
    );
  });

  it('encodes special characters in the message', () => {
    const link = whatsappLink('A & B?');
    expect(link).toContain(encodeURIComponent('A & B?'));
  });
});
