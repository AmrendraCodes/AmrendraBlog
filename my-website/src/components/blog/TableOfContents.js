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
 * @param {{ headings: Array<{id: string, text: string, level: number}> }} props
 */
export default function TableOfContents({ headings }) {
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
      <ul className="space-y-1">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const indent =
            heading.level === 3
              ? "pl-4"
              : heading.level === 4
              ? "pl-8"
              : "";

          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`
                  block py-1.5 px-3 rounded-lg text-[13px] font-medium transition-all duration-200 no-underline border-l-2
                  ${indent}
                  ${
                    isActive
                      ? "text-[#6366F1] dark:text-[#818CF8] bg-[#6366F1]/5 border-[#6366F1] font-semibold"
                      : "text-[var(--text-muted)] hover:text-[var(--text-heading)] border-transparent hover:border-[var(--card-border)] hover:bg-[var(--section-alt-bg)]"
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

  return (
    <>
      {/* Desktop — Sticky Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0" id="toc-desktop">
        <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 scrollbar-thin">
          <div className="flex items-center gap-2 mb-4 px-3">
            <List size={16} className="text-[var(--text-muted)]" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
              On This Page
            </h2>
          </div>
          {tocList}
        </div>
      </aside>

      {/* Mobile — Collapsible Accordion */}
      <div className="lg:hidden mb-8" id="toc-mobile">
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-4 py-3 bg-[var(--section-alt-bg)] border border-[var(--card-border)] rounded-xl text-sm font-bold text-[var(--text-heading)] cursor-pointer"
          aria-expanded={mobileOpen}
          aria-controls="toc-mobile-content"
        >
          <span className="flex items-center gap-2">
            <List size={16} className="text-[var(--text-muted)]" />
            Table of Contents
          </span>
          <ChevronDown
            size={16}
            className={`text-[var(--text-muted)] transition-transform duration-300 ${
              mobileOpen ? "rotate-180" : ""
            }`}
          />
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
              <div className="pt-3 px-2">{tocList}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
