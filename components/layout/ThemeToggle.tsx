'use client';

import { useEffect, useState } from 'react';
import {
  DEFAULT_THEME_MODE,
  THEME_STORAGE_KEY,
  applyTheme,
  isThemeMode,
  type ThemeMode,
} from '@/lib/theme';

const OPTIONS: { mode: ThemeMode; label: string; icon: string }[] = [
  { mode: 'light', label: 'Light', icon: '☀️' },
  { mode: 'dark', label: 'Dark', icon: '🌙' },
  { mode: 'system', label: 'System', icon: '💻' },
];

export function ThemeToggle() {
  // The blocking init script already applied the correct class before paint;
  // read back what it decided so this control starts in sync.
  const [mode, setMode] = useState<ThemeMode>(DEFAULT_THEME_MODE);

  useEffect(() => {
    // Read localStorage only after mount: the server (and the client's first
    // render) can't know it, so reading it during render would mismatch the
    // server-rendered markup. The blocking init script already painted the
    // right theme; this just syncs the toggle's own selected state to it.
    // Storage can be blocked (private mode, in-app browsers); never let that crash the page.
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      stored = null;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(isThemeMode(stored) ? stored : DEFAULT_THEME_MODE);
  }, []);

  useEffect(() => {
    if (mode !== 'system') return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => applyTheme('system');
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [mode]);

  function selectMode(nextMode: ThemeMode) {
    setMode(nextMode);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextMode);
    } catch {
      // The choice still applies for this visit; it just can't be remembered.
    }
    applyTheme(nextMode);
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="border-card-border flex items-center gap-1 rounded-full border p-1"
    >
      {OPTIONS.map((option) => {
        const isSelected = mode === option.mode;
        return (
          <button
            key={option.mode}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={option.label}
            title={option.label}
            onClick={() => selectMode(option.mode)}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-base transition-colors ${
              isSelected ? 'bg-primary/15 ring-accent ring-1' : 'hover:bg-primary/10'
            }`}
          >
            <span aria-hidden="true">{option.icon}</span>
          </button>
        );
      })}
    </div>
  );
}
