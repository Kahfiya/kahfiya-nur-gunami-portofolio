"use client";

import { useState, useEffect } from "react";

/**
 * SSR-safe media query hook.
 *
 * Returns `true` when the given CSS media query matches the current viewport,
 * `false` otherwise. Always returns `false` on the server (no `window` access).
 *
 * Subscribes to `MediaQueryList` change events and cleans up the listener on
 * unmount, so the returned value stays in sync with viewport changes.
 *
 * @example
 * const isDesktop = useMediaQuery("(min-width: 1024px)");
 */
export function useMediaQuery(query: string): boolean {
  // SSR-safe initial state: return false when window is not available.
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    // Guard against SSR environments where window is unavailable.
    if (typeof window === "undefined") return;

    const mediaQueryList = window.matchMedia(query);

    // Sync state in case the query changed between render and effect.
    setMatches(mediaQueryList.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener("change", handleChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}
