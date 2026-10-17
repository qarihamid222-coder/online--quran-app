import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Naskh_Arabic, Noto_Nastaliq_Urdu } from 'next/font/google';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { THEME_INIT_SCRIPT } from '@/lib/theme';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  variable: '--font-arabic',
  subsets: ['arabic'],
});

// Free, open-licensed substitute for Jameel Noori Nastaleeq (a proprietary
// desktop font not available for web embedding). Swap to next/font/local with
// a licensed Jameel Noori Nastaleeq file here if one becomes available.
const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  variable: '--font-nastaliq',
  subsets: ['arabic'],
});

export const metadata: Metadata = {
  title: 'Al-Hameed Online Quran Academy',
  description:
    'Learn Noorani Qaida, Nazra Quran, Tajweed, Hifz-ul-Quran, and Arabic online — live classes for children, adults, and beginners. Start your free 3-day trial today.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${notoNaskhArabic.variable} ${notoNastaliqUrdu.variable} h-full antialiased`}
    >
      <head>
        {/* Applies the saved theme before first paint, avoiding a flash of the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">
        {/* A thin, site-wide tricolor accent so green, gold, and red are all
            visible on every page without any large color block dominating
            the cream/white background. */}
        <div
          aria-hidden="true"
          className="from-primary via-accent to-danger h-1.5 w-full bg-gradient-to-r"
        />
        <Navbar />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
