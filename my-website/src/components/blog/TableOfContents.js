"use client";

import { useState, useCallback } from "react";
import { useActiveHeading } from "@/hooks/useActiveHeading";
import { List, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * TableOfContents — Dual-mode TOC component.
 *
 * Desktop: Sticky sidebar with smooth scroll and active section highlighting.
 * Mobile: Collapsible accordion with smooth open/close animation.
 *
 * @param {{ headings: Array<{id: string, text: string, level: number}>, isMobile?: boolean }} props
 */
export default function TableOfContents({ headings, isMobile = false }) {
  const activeId = useActiveHeading(headings);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleClick = useCallback(
    (e, id) => {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        const offset = 100; // Account for fixed header
        const top =
          element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
      // Close mobile accordion after click
      setMobileOpen(false);
    },
    []
  );

  if (!headings || headings.length === 0) return null;

  const tocList = (
    <nav aria-label="Table of Contents">
      <ul className="space-y-1.5 border-l border-[var(--card-border)]/50 ml-3">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const indent =
            heading.level === 3
              ? "ml-4"
              : heading.level === 4
              ? "ml-8"
              : "ml-0";

          return (
            <li key={heading.id} className="relative">
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-[-1px] top-0 bottom-0 w-0.5 bg-[#10B981]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`
                  block py-1.5 pr-3 pl-4 rounded-r-lg text-[14px] font-medium transition-all duration-200 no-underline
                  ${indent}
                  ${
                    isActive
                      ? "text-[#10B981] dark:text-[#34D399] bg-[#10B981]/5 font-bold"
                      : "text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-white/5"
                  }
                `}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  if (isMobile) {
    return (
      <div className="w-full mb-8 bg-white/5 backdrop-blur-md border border-[var(--card-border)]/50 rounded-2xl shadow-sm" id="toc-mobile">
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-5 py-4 text-sm font-bold text-[var(--text-heading)] cursor-pointer focus:outline-none"
          aria-expanded={mobileOpen}
          aria-controls="toc-mobile-content"
        >
          <span className="flex items-center gap-2">
            <List size={18} className="text-[#10B981]" />
            Table of Contents
          </span>
          <motion.div
            animate={{ rotate: mobileOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={18} className="text-[#10B981]" />
          </motion.div>
        </button>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="toc-mobile-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-2 pb-5 px-4">{tocList}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Desktop sticky TOC
  return (
    <aside className="w-full shrink-0" id="toc-desktop">
      <div className="sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto pr-2 scrollbar-thin pb-10">
        <div className="flex items-center gap-2 mb-6 px-3">
          <List size={18} className="text-[#10B981]" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--text-heading)]">
            On This Page
          </h2>
        </div>
        {tocList}
      </div>
    </aside>
  );
}
