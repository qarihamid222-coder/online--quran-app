import {
  ARABIC_EDITION,
  QURAN_API_BASE_URL,
  TOTAL_JUZ,
  TOTAL_SURAHS,
  TRANSLATION_EDITIONS,
} from './constants';
import { getAyahAudioUrl } from './audio';
import type { Ayah, JuzAyah, JuzDetail, RevelationType, SurahDetail, SurahSummary } from './types';

export class QuranApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'QuranApiError';
    this.status = status;
  }
}

/**
 * Every message this module's own errors can carry. A production error
 * boundary (error.tsx) should only ever show one of these to a visitor —
 * never raw internal error text. In production, Next.js's own Server
 * Component error redaction (or, in rarer cases, an unrelated React runtime
 * error reaching the same boundary) can hand the client an `Error` whose
 * `.message` is something like "Minified React error #...", which is not
 * anything a visitor should see. `error.name` isn't a reliable way to tell
 * these apart, because production redaction doesn't preserve a thrown
 * error's subclass — it always reconstructs a plain `Error` client-side.
 * Matching against known message text is what's actually reliable here.
 */
const KNOWN_ERROR_MESSAGE_PREFIXES = [
  'Unable to reach the Quran data service',
  'The Quran data service',
  'Invalid surah number',
  'Invalid juz number',
] as const;

export function isKnownQuranApiErrorMessage(message: string): boolean {
  return KNOWN_ERROR_MESSAGE_PREFIXES.some((prefix) => message.startsWith(prefix));
}

interface AlQuranApiEnvelope<T> {
  code: number;
  status: string;
  data: T;
}

interface RawSurahSummary {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface RawAyah {
  number: number;
  numberInSurah: number;
  text: string;
}

interface RawSurahEdition {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: RawAyah[];
  edition: {
    identifier: string;
  };
}

interface RawJuzAyah {
  number: number;
  numberInSurah: number;
  text: string;
  surah: {
    number: number;
    name: string;
    englishName: string;
  };
}

interface RawJuzEdition {
  number: number;
  ayahs: RawJuzAyah[];
  edition: {
    identifier: string;
  };
}

const FETCH_TIMEOUT_MS = 8000;
const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = [300, 800];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * The upstream API is a third-party service with no uptime guarantee — a
 * single slow or dropped request is common in production and otherwise
 * surfaces as a one-off error page. Since Next.js reuses a page's last
 * render (errors included) on browser back/forward navigation, one
 * transient failure can otherwise look "stuck" until a hard refresh. Retrying
 * transient failures here, before they ever reach the page, is what actually
 * fixes that instead of just prettifying the error message.
 */
async function fetchWithRetry(url: string): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    if (attempt > 0) {
      await delay(RETRY_DELAY_MS[attempt - 1]);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
      // `next.revalidate` engages Next's per-URL Data Cache directly on this
      // fetch call, independent of whether the route itself is statically
      // generated. This matters specifically for /quran/[surahId] and
      // /quran/juz/[juzNumber]: without `generateStaticParams`, the route's
      // own `export const revalidate` has no effect and every request would
      // otherwise hit the live upstream API every single time — exactly the
      // condition that reproduced "Minified React error #441" in production
      // when that live request failed. Caching the underlying fetch means a
      // transient upstream failure can no longer reach rendering at all for
      // previously-visited content.
      const response = await fetch(url, {
        signal: controller.signal,
        next: { revalidate: 3600 },
      });
      // Retry server errors (5xx) — likely transient — but not client errors
      // (4xx, e.g. an invalid path), which a retry can't fix.
      if (response.status >= 500 && attempt < MAX_ATTEMPTS - 1) {
        lastError = new QuranApiError('The Quran data service returned an error.', response.status);
        continue;
      }
      return response;
    } catch (error) {
      lastError = error;
    } finally {
      clearTimeout(timeout);
    }
  }

  throw lastError;
}

async function fetchQuranApi<T>(path: string): Promise<T> {
  let response: Response;
  try {
    response = await fetchWithRetry(`${QURAN_API_BASE_URL}${path}`);
  } catch {
    throw new QuranApiError(
      'Unable to reach the Quran data service. Check your connection and try again.',
    );
  }

  if (!response.ok) {
    throw new QuranApiError('The Quran data service returned an error.', response.status);
  }

  let json: unknown;
  try {
    json = await response.json();
  } catch {
    throw new QuranApiError('The Quran data service returned an unreadable response.');
  }

  // The API's envelope shape isn't guaranteed by TypeScript at runtime — guard
  // against a malformed or unexpected body (e.g. null, an array, or a missing
  // `data` field) so callers get a clear, catchable error instead of a raw
  // crash further down (e.g. calling `.map`/`.find` on something that isn't
  // actually an array).
  if (
    typeof json !== 'object' ||
    json === null ||
    !('code' in json) ||
    (json as { code: unknown }).code !== 200 ||
    !('data' in json) ||
    (json as { data: unknown }).data == null
  ) {
    throw new QuranApiError('The Quran data service returned an unexpected response.');
  }

  return (json as AlQuranApiEnvelope<T>).data;
}

function assertArray<T>(value: T[], errorMessage: string): T[] {
  if (!Array.isArray(value)) {
    throw new QuranApiError(errorMessage);
  }
  return value;
}

function toRevelationType(value: string): RevelationType {
  return value === 'Meccan' ? 'Meccan' : 'Medinan';
}

function mapSurahSummary(raw: RawSurahSummary): SurahSummary {
  return {
    number: raw.number,
    name: raw.name,
    englishName: raw.englishName,
    englishNameTranslation: raw.englishNameTranslation,
    numberOfAyahs: raw.numberOfAyahs,
    revelationType: toRevelationType(raw.revelationType),
  };
}

export function isValidSurahNumber(value: number): boolean {
  return Number.isInteger(value) && value >= 1 && value <= TOTAL_SURAHS;
}

export async function fetchSurahList(): Promise<SurahSummary[]> {
  const data = await fetchQuranApi<RawSurahSummary[]>('/surah');
  return assertArray(data, 'The Quran data service returned an unexpected surah list.').map(
    mapSurahSummary,
  );
}

export async function fetchSurah(surahNumber: number): Promise<SurahDetail> {
  if (!isValidSurahNumber(surahNumber)) {
    throw new QuranApiError(`Invalid surah number: ${surahNumber}.`);
  }

  const editions = [ARABIC_EDITION, TRANSLATION_EDITIONS.english, TRANSLATION_EDITIONS.urdu].join(
    ',',
  );
  const rawData = await fetchQuranApi<RawSurahEdition[]>(
    `/surah/${surahNumber}/editions/${editions}`,
  );
  const data = assertArray(rawData, 'The Quran data service returned an unexpected surah.');

  const arabicEdition = data.find((edition) => edition.edition.identifier === ARABIC_EDITION);
  const englishEdition = data.find(
    (edition) => edition.edition.identifier === TRANSLATION_EDITIONS.english,
  );
  const urduEdition = data.find(
    (edition) => edition.edition.identifier === TRANSLATION_EDITIONS.urdu,
  );

  if (!arabicEdition || !Array.isArray(arabicEdition.ayahs)) {
    throw new QuranApiError(
      'The Quran data service did not return the Arabic text for this surah.',
    );
  }

  const ayahs: Ayah[] = arabicEdition.ayahs.map((ayah, index) => ({
    number: ayah.numberInSurah,
    numberInQuran: ayah.number,
    arabicText: ayah.text,
    translations: {
      english: englishEdition?.ayahs[index]?.text,
      urdu: urduEdition?.ayahs[index]?.text,
    },
    audioUrl: getAyahAudioUrl(ayah.number),
  }));

  return {
    number: arabicEdition.number,
    name: arabicEdition.name,
    englishName: arabicEdition.englishName,
    englishNameTranslation: arabicEdition.englishNameTranslation,
    numberOfAyahs: arabicEdition.numberOfAyahs,
    revelationType: toRevelationType(arabicEdition.revelationType),
    ayahs,
  };
}

export function isValidJuzNumber(value: number): boolean {
  return Number.isInteger(value) && value >= 1 && value <= TOTAL_JUZ;
}

export async function fetchJuz(juzNumber: number): Promise<JuzDetail> {
  if (!isValidJuzNumber(juzNumber)) {
    throw new QuranApiError(`Invalid juz number: ${juzNumber}.`);
  }

  const editions = [ARABIC_EDITION, TRANSLATION_EDITIONS.english, TRANSLATION_EDITIONS.urdu].join(
    ',',
  );
  const rawData = await fetchQuranApi<RawJuzEdition[]>(`/juz/${juzNumber}/editions/${editions}`);
  const data = assertArray(rawData, 'The Quran data service returned an unexpected juz.');

  const arabicEdition = data.find((edition) => edition.edition.identifier === ARABIC_EDITION);
  const englishEdition = data.find(
    (edition) => edition.edition.identifier === TRANSLATION_EDITIONS.english,
  );
  const urduEdition = data.find(
    (edition) => edition.edition.identifier === TRANSLATION_EDITIONS.urdu,
  );

  if (!arabicEdition || !Array.isArray(arabicEdition.ayahs)) {
    throw new QuranApiError('The Quran data service did not return the Arabic text for this juz.');
  }

  const ayahs: JuzAyah[] = arabicEdition.ayahs.map((ayah, index) => {
    if (!ayah.surah) {
      throw new QuranApiError('The Quran data service returned a verse with no surah information.');
    }

    return {
      number: ayah.numberInSurah,
      numberInQuran: ayah.number,
      arabicText: ayah.text,
      translations: {
        english: englishEdition?.ayahs[index]?.text,
        urdu: urduEdition?.ayahs[index]?.text,
      },
      audioUrl: getAyahAudioUrl(ayah.number),
      surahNumber: ayah.surah.number,
      surahName: ayah.surah.name,
      surahEnglishName: ayah.surah.englishName,
    };
  });

  return {
    number: juzNumber,
    ayahs,
  };
}
