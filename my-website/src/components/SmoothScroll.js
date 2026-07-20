'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Lenis smooth scroll wrapper.
 * Initializes smooth scrolling on mount and cleans up on unmount.
 * Respects prefers-reduced-motion automatically.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
