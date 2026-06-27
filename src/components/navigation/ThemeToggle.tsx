import { useEffect, useCallback } from "react";
import useAppStore from "../../stores/useAppStore";

function getSystemTheme(): "light" | "dark" {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
}

function applyTheme(theme: "light" | "dark") {
  document.documentElement.dataset.theme = theme;
}

function ThemeToggle() {
  const storeTheme = useAppStore((s) => s.theme);
  const setStoreTheme = useAppStore((s) => s.setTheme);

  // Derive effective theme from store preference
  const effectiveTheme =
    storeTheme === "system" ? getSystemTheme() : storeTheme;

  // Sync theme with DOM and localStorage
  useEffect(() => {
    applyTheme(effectiveTheme);
    localStorage.setItem("theme", effectiveTheme);
  }, [effectiveTheme]);

  // Listen for OS theme changes when in system mode
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (useAppStore.getState().theme === "system") {
        const sysTheme = mediaQuery.matches ? "dark" : "light";
        applyTheme(sysTheme);
        localStorage.setItem("theme", sysTheme);
      }
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Initialize theme on mount
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setStoreTheme(stored);
    }
  }, [setStoreTheme]);

  const toggle = useCallback(() => {
    const newTheme = effectiveTheme === "dark" ? "light" : "dark";
    setStoreTheme(newTheme);
  }, [effectiveTheme, setStoreTheme]);

  return (
    <button
      type="button"
      onClick={toggle}
      className="p-2 rounded-full bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-subtle)] hover:text-[var(--color-text-primary)] transition-colors duration-[var(--duration-fast)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-primary)]"
      aria-label={`Switch to ${effectiveTheme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${effectiveTheme === "dark" ? "light" : "dark"} theme`}
    >
      {effectiveTheme === "dark" ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

export default ThemeToggle;
