"use client";

import { ArrowUp } from "lucide-react";
import { useScrollDirection } from "@/hooks/useScrollDirection";

/**
 * BackToTop — Floating button that appears after scrolling down.
 * Uses high-performance CSS transitions for smooth entrance/exit without extra JS bundles.
 */
export default function BackToTop() {
  const { pastThreshold } = useScrollDirection(400);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#F59E0B] text-[#0B1F3A] shadow-lg shadow-amber-500/30 flex items-center justify-center cursor-pointer hover:bg-[#D97706] hover:shadow-amber-500/40 transition-all duration-300 font-bold ${
        pastThreshold
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-4 scale-75 pointer-events-none"
      }`}
      aria-label="Back to top"
      title="Back to top"
      id="back-to-top"
    >
      <ArrowUp size={18} />
    </button>
  );
}
