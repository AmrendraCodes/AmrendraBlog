"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * useReadingProgress — Returns scroll percentage (0–100) for a reading progress bar.
 * Uses requestAnimationFrame for smooth, performant updates.
 */
export function useReadingProgress() {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (docHeight <= 0) {
      setProgress(0);
      return;
    }

    const scrollPercent = Math.min(
      Math.max((scrollTop / docHeight) * 100, 0),
      100
    );
    setProgress(scrollPercent);
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  return progress;
}
