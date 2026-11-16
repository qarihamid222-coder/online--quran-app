import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  addBookmark,
  getBookmarksSnapshot,
  isBookmarked,
  isStoragePersistent,
  removeBookmark,
  subscribeToBookmarks,
  toggleBookmark,
  truncateSnippet,
  type Bookmark,
} from '@/store/bookmarks';

function createFakeLocalStorage() {
  const store = new Map<string, string>();
  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
    clear: () => store.clear(),
  };
}

function makeBookmark(overrides: Partial<Bookmark> = {}): Bookmark {
  return {
    numberInQuran: 262,
    surahNumber: 2,
    surahEnglishName: 'Al-Baqara',
    ayahNumber: 255,
    snippet: 'Allah - there is no deity except Him, the Ever-Living...',
    createdAt: '2024-01-01T00:00:00.000Z',
    ...overrides,
  };
}

beforeEach(() => {
  vi.stubGlobal('localStorage', createFakeLocalStorage());
  // Force a fresh snapshot per test rather than reusing the module-level cache.
  removeBookmark(-1);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('truncateSnippet', () => {
  it('leaves short text untouched', () => {
    expect(truncateSnippet('short text')).toBe('short text');
  });

  it('truncates long text with an ellipsis', () => {
    const long = 'a'.repeat(200);
    const result = truncateSnippet(long);
    expect(result.length).toBeLessThan(long.length);
    expect(result.endsWith('…')).toBe(true);
  });
});

describe('bookmarks store', () => {
  it('starts empty', () => {
    expect(getBookmarksSnapshot()).toEqual([]);
    expect(isBookmarked(262)).toBe(false);
  });

  it('adds and lists a bookmark', () => {
    addBookmark(makeBookmark());
    expect(isBookmarked(262)).toBe(true);
    expect(getBookmarksSnapshot()).toHaveLength(1);
    expect(getBookmarksSnapshot()[0].surahEnglishName).toBe('Al-Baqara');
  });

  it('does not duplicate an existing bookmark', () => {
    addBookmark(makeBookmark());
    addBookmark(makeBookmark());
    expect(getBookmarksSnapshot()).toHaveLength(1);
  });

  it('removes a bookmark', () => {
    addBookmark(makeBookmark());
    removeBookmark(262);
    expect(isBookmarked(262)).toBe(false);
    expect(getBookmarksSnapshot()).toEqual([]);
  });

  it('toggles a bookmark on and off, returning the new state', () => {
    expect(toggleBookmark(makeBookmark())).toBe(true);
    expect(isBookmarked(262)).toBe(true);
    expect(toggleBookmark(makeBookmark())).toBe(false);
    expect(isBookmarked(262)).toBe(false);
  });

  it('keeps the snapshot sorted by global ayah number', () => {
    addBookmark(makeBookmark({ numberInQuran: 300, surahNumber: 3 }));
    addBookmark(makeBookmark({ numberInQuran: 5, surahNumber: 1 }));
    const numbers = getBookmarksSnapshot().map((b) => b.numberInQuran);
    expect(numbers).toEqual([5, 300]);
  });

  it('returns the same array reference when nothing has changed', () => {
    addBookmark(makeBookmark());
    expect(getBookmarksSnapshot()).toBe(getBookmarksSnapshot());
  });

  it('notifies subscribers on add and remove', () => {
    const listener = vi.fn();
    const unsubscribe = subscribeToBookmarks(listener);

    addBookmark(makeBookmark());
    expect(listener).toHaveBeenCalledTimes(1);

    removeBookmark(262);
    expect(listener).toHaveBeenCalledTimes(2);

    unsubscribe();
    addBookmark(makeBookmark());
    expect(listener).toHaveBeenCalledTimes(2);
  });
});

describe('when the browser blocks storage (private mode, in-app browsers)', () => {
  function blockedStorage() {
    return {
      getItem: () => {
        throw new Error('SecurityError');
      },
      setItem: () => {
        throw new Error('QuotaExceededError');
      },
      removeItem: () => {
        throw new Error('SecurityError');
      },
    };
  }

  afterEach(() => {
    // Leave the module in its normal, working-storage state for the next test.
    vi.stubGlobal('localStorage', createFakeLocalStorage());
    addBookmark(makeBookmark({ numberInQuran: -2 }));
    removeBookmark(-2);
  });

  it('still saves, lists, toggles and removes bookmarks for the current visit', () => {
    vi.stubGlobal('localStorage', blockedStorage());

    addBookmark(makeBookmark({ numberInQuran: 1 }));
    addBookmark(makeBookmark({ numberInQuran: 2 }));
    expect(getBookmarksSnapshot().map((b) => b.numberInQuran)).toEqual([1, 2]);
    expect(isBookmarked(1)).toBe(true);

    removeBookmark(1);
    expect(getBookmarksSnapshot().map((b) => b.numberInQuran)).toEqual([2]);
    expect(toggleBookmark(makeBookmark({ numberInQuran: 3 }))).toBe(true);
    expect(toggleBookmark(makeBookmark({ numberInQuran: 3 }))).toBe(false);
  });

  it('reports that bookmarks will not persist, so the UI can say so', () => {
    vi.stubGlobal('window', {});
    vi.stubGlobal('localStorage', blockedStorage());
    expect(isStoragePersistent()).toBe(false);
  });

  it('reports persistence normally when storage works', () => {
    vi.stubGlobal('window', {});
    expect(isStoragePersistent()).toBe(true);
  });

  it('survives browsers where merely touching localStorage throws (cookies blocked)', () => {
    vi.stubGlobal('window', {});
    vi.unstubAllGlobals();
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      get() {
        throw new Error('SecurityError: access is denied for this document');
      },
    });
    try {
      addBookmark(makeBookmark({ numberInQuran: 7 }));
      expect(getBookmarksSnapshot().map((b) => b.numberInQuran)).toEqual([7]);
      vi.stubGlobal('window', {});
      expect(isStoragePersistent()).toBe(false);
    } finally {
      Reflect.deleteProperty(globalThis, 'localStorage');
    }
  });
});

describe('persistence', () => {
  it('survives a "refresh": a fresh read of storage still has the bookmarks', () => {
    const storage = createFakeLocalStorage();
    vi.stubGlobal('localStorage', storage);
    addBookmark(makeBookmark({ numberInQuran: 386, surahNumber: 3, ayahNumber: 93 }));

    // Simulate a page reload: the in-memory snapshot is lost, storage is not.
    const raw = storage.getItem('quran-bookmarks');
    expect(JSON.parse(raw as string)).toHaveLength(1);
    removeBookmark(-1); // forces the cached snapshot to be rebuilt from storage
    expect(getBookmarksSnapshot().map((b) => b.numberInQuran)).toEqual([386]);
  });

  it('ignores corrupted stored data instead of crashing', () => {
    const storage = createFakeLocalStorage();
    storage.setItem('quran-bookmarks', '{not json');
    vi.stubGlobal('localStorage', storage);
    removeBookmark(-1);
    expect(getBookmarksSnapshot()).toEqual([]);
  });
});
