"use client";

import { useEffect } from "react";
import dynamic from 'next/dynamic';
import ReadingProgress from "./ReadingProgress";
import MarkdownRenderer from "@/components/MarkdownRenderer";

const TableOfContents = dynamic(() => import('./TableOfContents'), { ssr: true });
const ShareButtons = dynamic(() => import('./ShareButtons'), { ssr: false });
import { motion } from "framer-motion";

/**
 * BlogDetailClient — Client wrapper for the blog detail page.
 * Uses a max-w-7xl centered parent container with a 3-column desktop layout:
 * Left (240px TOC) | Center (max-w-[760px] centered article & bottom sections) | Right (240px balancer).
 */
export default function BlogDetailClient({ content, headings, title, slug, children }) {
  useEffect(() => {
    // Asynchronously load code highlight & math CSS so they do not block initial render / FCP / LCP
    import("highlight.js/styles/atom-one-dark.css");
    import("katex/dist/katex.min.css");
  }, []);

  return (
    <>
      <ReadingProgress />

      {/* Main Container — max-w-7xl centered */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-1 xl:grid-cols-[240px_minmax(0,760px)_240px] xl:justify-center gap-8 lg:gap-12 items-start">
          
          {/* Desktop TOC — Sticky Sidebar on the Left */}
          <aside className="hidden xl:block w-[240px] shrink-0 sticky top-28 space-y-6" id="toc-desktop">
            <TableOfContents headings={headings} />
            <div className="pt-4 border-t border-[var(--card-border)]/50 pl-3">
              <span className="block text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2.5">
                Share Article
              </span>
              <ShareButtons title={title} slug={slug} />
            </div>
          </aside>

          {/* Main Content Column — strictly centered (target: 760px) */}
          <div className="w-full max-w-[760px] min-w-0 mx-auto">
            <motion.article 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              {/* Mobile TOC */}
              <div className="block xl:hidden mb-8">
                <TableOfContents headings={headings} isMobile={true} />
              </div>

              {/* Markdown Content with prose max-w-none (width controlled by outer wrapper) */}
              <div id="article-content" className="w-full prose max-w-none text-left">
                <MarkdownRenderer content={content} />
              </div>
            </motion.article>

            {/* Bottom Sections: FAQ, Author Box, Article Navigation, Related Posts */}
            {children && (
              <div className="w-full mt-10 space-y-6 sm:space-y-8">
                {children}
              </div>
            )}
          </div>

          {/* Right Column Spacer (desktop only) to keep center column perfectly centered */}
          <div className="hidden xl:block w-[240px] pointer-events-none" aria-hidden="true" />
        </div>
      </div>
    </>
  );
}
