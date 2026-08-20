"use client";

import { useReadingProgress } from "@/hooks/useReadingProgress";

/**
 * ReadingProgress — Fixed top bar showing scroll progress through the article.
 * Renders a thin gradient bar (indigo → purple) that animates smoothly.
 */
export default function ReadingProgress() {
  const progress = useReadingProgress();

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full bg-gradient-to-r from-[#0B1F3A] via-[#F59E0B] to-[#D97706] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
