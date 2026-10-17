import Link from 'next/link';
import { CONTACT_EMAIL, PHONE_DISPLAY, whatsappLink } from '@/lib/academy/contact';

export function Footer() {
  return (
    <footer className="bg-surface border-t border-zinc-200 px-4 py-10 sm:px-6 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Al-Hameed Online Quran Academy
          </p>
          <p
            dir="rtl"
            lang="ur"
            className="font-nastaliq mt-1 text-base text-zinc-600 dark:text-zinc-400"
          >
            الحمید آن لائن قرآن اکیڈمی
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <a
            href={whatsappLink('Assalam o Alaikum!')}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            WhatsApp: {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-primary">
            {CONTACT_EMAIL}
          </a>
          <div className="mt-2 flex gap-4">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <Link href="/#courses" className="hover:text-primary">
              Courses
            </Link>
            <Link href="/quran" className="hover:text-primary">
              Read Quran
            </Link>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-5xl text-xs text-zinc-400 dark:text-zinc-500">
        &copy; {new Date().getFullYear()} Al-Hameed Online Quran Academy. All rights reserved.
      </p>
    </footer>
  );
}
