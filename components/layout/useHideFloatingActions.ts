'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

/** Routes where the reading column is full-width on small screens (Quran text, bookmarks). */
const READER_ROUTE_PREFIXES = ['/quran', '/bookmarks'];

/**
 * Whether the floating action buttons (WhatsApp, chat) should step aside.
 *
 * They are fixed to the bottom-right corner, so on small screens they can sit on
 * top of content the visitor is using. They hide (via the `max-*` classes the
 * callers apply) when:
 *  - an element marked `data-hide-floating-actions` is on screen (the admission
 *    form), so they never cover a form field; or
 *  - the visitor is reading the Quran or their bookmarks, where they would cover
 *    the verse text and the per-verse buttons. Desktop layouts have room for them.
 */
export function useHideFloatingActions(): { onForm: boolean; onReader: boolean } {
  const pathname = usePathname();
  const [onForm, setOnForm] = useState(false);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll('[data-hide-floating-actions]'));
    if (targets.length === 0 || typeof IntersectionObserver === 'undefined') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOnForm(false);
      return;
    }

    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setOnForm(visible.size > 0);
    });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  const onReader = READER_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  return { onForm, onReader };
}
