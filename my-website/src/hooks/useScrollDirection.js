"use client";

import { useState, useEffect, useRef } from "react";

/**
 * useScrollDirection — Returns 'up' or 'down' based on scroll direction,
 * and a boolean `pastThreshold` indicating if scroll position exceeds the given threshold.
 *
 * @param {number} threshold - Scroll position threshold (default: 400px)
 * @returns {{ direction: 'up' | 'down', pastThreshold: boolean }}
 */
export function useScrollDirection(threshold = 400) {
  const [direction, setDirection] = useState("down");
  const [pastThreshold, setPastThreshold] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY;

          if (currentY > lastScrollY.current + 5) {
            setDirection((prev) => (prev !== "down" ? "down" : prev));
          } else if (currentY < lastScrollY.current - 5) {
            setDirection((prev) => (prev !== "up" ? "up" : prev));
          }

          const isPast = currentY > threshold;
          setPastThreshold((prev) => (prev !== isPast ? isPast : prev));

          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { direction, pastThreshold };
}
