import { describe, expect, it } from 'vitest';
import { DEFAULT_THEME_MODE, THEME_INIT_SCRIPT, isThemeMode, resolveIsDark } from '@/lib/theme';

describe('isThemeMode', () => {
  it('accepts the three valid theme modes', () => {
    expect(isThemeMode('light')).toBe(true);
    expect(isThemeMode('dark')).toBe(true);
    expect(isThemeMode('system')).toBe(true);
  });

  it('rejects anything else', () => {
    expect(isThemeMode('auto')).toBe(false);
    expect(isThemeMode(null)).toBe(false);
    expect(isThemeMode(undefined)).toBe(false);
    expect(isThemeMode(1)).toBe(false);
    expect(isThemeMode('')).toBe(false);
  });
});

describe('resolveIsDark', () => {
  it('resolves "dark" mode to true regardless of system preference', () => {
    expect(resolveIsDark('dark')).toBe(true);
  });

  it('resolves "light" mode to false regardless of system preference', () => {
    expect(resolveIsDark('light')).toBe(false);
  });

  it('resolves "system" mode by falling back to system preference (no window here, so false)', () => {
    expect(resolveIsDark('system')).toBe(false);
  });
});

describe('default theme (deep navy)', () => {
  function runInitScript(storedValue: string | null | 'throws', systemDark = false) {
    const classes = new Set<string>(['dark']); // the server renders <html> as dark
    const documentElement = {
      classList: {
        toggle: (name: string, on: boolean) => (on ? classes.add(name) : classes.delete(name)),
      },
    };
    const localStorage = {
      getItem: () => {
        if (storedValue === 'throws') throw new Error('blocked');
        return storedValue;
      },
    };
    const window = { matchMedia: () => ({ matches: systemDark }) };
    new Function('localStorage', 'window', 'document', THEME_INIT_SCRIPT)(localStorage, window, {
      documentElement,
    });
    return classes.has('dark');
  }

  it('defaults to dark', () => {
    expect(DEFAULT_THEME_MODE).toBe('dark');
  });

  it('is dark for a first-time visitor, whatever their system setting is', () => {
    expect(runInitScript(null, false)).toBe(true);
    expect(runInitScript(null, true)).toBe(true);
    expect(runInitScript('garbage', false)).toBe(true);
  });

  it('respects an explicit Light or Dark choice', () => {
    expect(runInitScript('light', true)).toBe(false);
    expect(runInitScript('dark', false)).toBe(true);
  });

  it('follows the system only when the visitor chose System', () => {
    expect(runInitScript('system', true)).toBe(true);
    expect(runInitScript('system', false)).toBe(false);
  });

  it('stays dark when storage is blocked', () => {
    expect(runInitScript('throws')).toBe(true);
  });
});
