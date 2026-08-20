"use client";

import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollDirection } from "@/hooks/useScrollDirection";

/**
 * BackToTop — Floating button that appears after scrolling down.
 * Uses Framer Motion for smooth entrance/exit animation.
 */
export default function BackToTop() {
  const { pastThreshold } = useScrollDirection(400);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {pastThreshold && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#F59E0B] text-[#0B1F3A] shadow-lg shadow-amber-500/30 flex items-center justify-center cursor-pointer hover:bg-[#D97706] hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all duration-200 font-bold"
          aria-label="Back to top"
          title="Back to top"
          id="back-to-top"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
