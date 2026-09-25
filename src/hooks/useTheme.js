import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

function getCurrentTheme() {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#F6F7F9' : '#0B0E14');
}

export default function useTheme() {
  const [theme, setTheme] = useState(getCurrentTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const syncSystemTheme = (event) => {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) setTheme(event.matches ? 'light' : 'dark');
      } catch (_) {
        setTheme(event.matches ? 'light' : 'dark');
      }
    };
    media.addEventListener?.('change', syncSystemTheme);
    return () => media.removeEventListener?.('change', syncSystemTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (_) {
        // Theme still changes for this session when storage is unavailable.
      }
      applyTheme(next);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
