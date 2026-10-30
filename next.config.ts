import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // The juz pages live under /quran/juz. Short links people commonly try
  // (/juz, /juz/5, /para/5) used to 404 — send them to the real pages.
  async redirects() {
    return [
      { source: '/juz', destination: '/quran/juz', permanent: false },
      { source: '/juz/:juzNumber', destination: '/quran/juz/:juzNumber', permanent: false },
      { source: '/para', destination: '/quran/juz', permanent: false },
      { source: '/para/:juzNumber', destination: '/quran/juz/:juzNumber', permanent: false },
    ];
  },
};

export default nextConfig;
