"use client";

import { useState, useEffect, useRef } from "react";

/**
 * useActiveHeading — Uses IntersectionObserver to track which heading
 * is currently visible in the viewport. Returns the active heading ID
 * for TOC highlighting.
 *
 * @param {Array<{id: string}>} headings - Array of heading objects with `id`
 * @param {Object} options
 * @param {number} options.rootMargin - Margin for intersection (default: header offset)
 * @returns {string} Active heading ID
 */
export function useActiveHeading(headings = [], options = {}) {
  const [activeId, setActiveId] = useState("");
  const observerRef = useRef(null);

  useEffect(() => {
    if (headings.length === 0) return;

    // Disconnect previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const callback = (entries) => {
      // Find all headings currently intersecting
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);

      if (visibleEntries.length > 0) {
        // Pick the one closest to the top
        const topEntry = visibleEntries.reduce((closest, entry) => {
          return entry.boundingClientRect.top < closest.boundingClientRect.top
            ? entry
            : closest;
        });
        setActiveId(topEntry.target.id);
      }
    };

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: options.rootMargin || "-80px 0px -70% 0px",
      threshold: 0,
    });

    // Observe all heading elements
    const headingElements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean);

    headingElements.forEach((el) => observerRef.current.observe(el));

    // Set initial active heading (first heading visible in viewport)
    if (headingElements.length > 0 && !activeId) {
      setActiveId(headingElements[0].id);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [headings, options.rootMargin]); // eslint-disable-line react-hooks/exhaustive-deps

  return activeId;
}
