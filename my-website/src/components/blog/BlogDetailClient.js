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
 */
export default function BlogDetailClient({ content, headings, title, slug }) {
  useEffect(() => {
    // Asynchronously load code highlight & math CSS so they do not block initial render / FCP / LCP
    import("highlight.js/styles/atom-one-dark.css");
    import("katex/dist/katex.min.css");
  }, []);
  return (
    <>
      <ReadingProgress />

      {/* Layout Container */}
      <div className="relative max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5 grid grid-cols-1 xl:grid-cols-[240px_1fr] gap-8 lg:gap-10 items-start">
        
        {/* Desktop TOC — Sticky Sidebar on the Left */}
        <div className="hidden xl:block w-[240px] shrink-0 sticky top-28 space-y-6">
          <TableOfContents headings={headings} />
          <div className="pt-4 border-t border-[var(--card-border)]/50 pl-3">
            <span className="block text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2.5">
              Share Article
            </span>
            <ShareButtons title={title} slug={slug} />
          </div>
        </div>

        {/* Main Content strictly centered */}
        <div className="w-full max-w-[820px] min-w-0 mx-auto">
          <motion.article 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            {/* Mobile TOC */}
            <div className="block xl:hidden mb-6">
              <TableOfContents headings={headings} isMobile={true} />
            </div>

            {/* Markdown Content */}
            <div id="article-content" className="w-full">
              <MarkdownRenderer content={content} />
            </div>
          </motion.article>
        </div>
      </div>
    </>
  );
}
