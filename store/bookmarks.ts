export interface Bookmark {
  numberInQuran: number;
  surahNumber: number;
  surahEnglishName: string;
  ayahNumber: number;
  snippet: string;
  createdAt: string;
}

const STORAGE_KEY = 'quran-bookmarks';
const SNIPPET_MAX_LENGTH = 140;
const EMPTY_BOOKMARKS: Bookmark[] = [];

type Listener = () => void;

let listeners: Listener[] = [];
let cachedSnapshot: Bookmark[] | null = null;

function isBookmark(value: unknown): value is Bookmark {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Bookmark).numberInQuran === 'number' &&
    typeof (value as Bookmark).surahNumber === 'number' &&
    typeof (value as Bookmark).ayahNumber === 'number' &&
    typeof (value as Bookmark).snippet === 'string'
  );
}

/**
 * Bookmarks live in localStorage so they persist across refreshes and visits.
 *
 * Some browsers refuse to store data for a site (private/incognito windows,
 * in-app browsers, "block all cookies" settings, a full quota). Rather than
 * silently doing nothing in that case, the list is also held in memory, so
 * bookmarking, the navbar count and the Bookmarks page keep working for the
 * current visit; `isStoragePersistent()` lets the UI say that they won't be
 * kept after the tab is closed.
 */
let memoryBookmarks: Bookmark[] = EMPTY_BOOKMARKS;
let storageFailed = false;

/** localStorage, or null if there is none. Merely touching it throws when cookies/storage are blocked. */
function getStorage(): Storage | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage;
  } catch {
    storageFailed = true;
    return null;
  }
}

function readFromStorage(): Bookmark[] {
  if (storageFailed) return memoryBookmarks;
  const storage = getStorage();
  if (!storage) return memoryBookmarks;

  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_BOOKMARKS;

    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isBookmark) : EMPTY_BOOKMARKS;
  } catch {
    // Unreadable (blocked storage or corrupted JSON): fall back to what we hold in memory.
    return memoryBookmarks;
  }
}

function writeToStorage(bookmarks: Bookmark[]): void {
  cachedSnapshot = null;
  memoryBookmarks = bookmarks;

  const storage = getStorage();
  if (storage) {
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
      storageFailed = false;
    } catch {
      // Storage unavailable (quota exceeded, private mode, etc.): keep them in memory.
      storageFailed = true;
    }
  }

  for (const listener of listeners) listener();
}

/** Whether bookmarks will survive closing the tab (false when the browser blocks storage). */
export function isStoragePersistent(): boolean {
  if (typeof window === 'undefined') return true; // server render: nothing to report yet
  if (storageFailed) return false;
  const storage = getStorage();
  if (!storage) return false;

  try {
    const probeKey = `${STORAGE_KEY}:probe`;
    storage.setItem(probeKey, '1');
    storage.removeItem(probeKey);
    return true;
  } catch {
    storageFailed = true;
    return false;
  }
}

export function truncateSnippet(text: string): string {
  if (text.length <= SNIPPET_MAX_LENGTH) return text;
  return `${text.slice(0, SNIPPET_MAX_LENGTH).trimEnd()}…`;
}

export function getBookmarksSnapshot(): Bookmark[] {
  if (cachedSnapshot === null) {
    cachedSnapshot = [...readFromStorage()].sort((a, b) => a.numberInQuran - b.numberInQuran);
  }
  return cachedSnapshot;
}

export function getServerBookmarksSnapshot(): Bookmark[] {
  return EMPTY_BOOKMARKS;
}

export function isBookmarked(numberInQuran: number): boolean {
  return readFromStorage().some((bookmark) => bookmark.numberInQuran === numberInQuran);
}

export function addBookmark(bookmark: Bookmark): void {
  const current = readFromStorage();
  if (current.some((existing) => existing.numberInQuran === bookmark.numberInQuran)) return;
  writeToStorage([...current, bookmark]);
}

export function removeBookmark(numberInQuran: number): void {
  const current = readFromStorage();
  writeToStorage(current.filter((bookmark) => bookmark.numberInQuran !== numberInQuran));
}

/** Adds the bookmark if it isn't already saved, otherwise removes it. Returns the new state. */
export function toggleBookmark(bookmark: Bookmark): boolean {
  const nowBookmarked = !isBookmarked(bookmark.numberInQuran);
  if (nowBookmarked) {
    addBookmark(bookmark);
  } else {
    removeBookmark(bookmark.numberInQuran);
  }
  return nowBookmarked;
}

// Another tab changed the saved bookmarks: refresh this tab's view of them.
function handleStorageEvent(event: StorageEvent): void {
  if (event.key !== null && event.key !== STORAGE_KEY) return;
  cachedSnapshot = null;
  for (const listener of listeners) listener();
}

export function subscribeToBookmarks(listener: Listener): () => void {
  if (listeners.length === 0 && typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorageEvent);
  }
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((existing) => existing !== listener);
    if (listeners.length === 0 && typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorageEvent);
    }
  };
}
