"use client";

import dynamic from 'next/dynamic';
import ReadingProgress from "./ReadingProgress";
import MarkdownRenderer from "@/components/MarkdownRenderer";

const TableOfContents = dynamic(() => import('./TableOfContents'), { ssr: true });
const ShareButtons = dynamic(() => import('./ShareButtons'), { ssr: false });
const BackToTop = dynamic(() => import('./BackToTop'), { ssr: false });
import "highlight.js/styles/atom-one-dark.css";
import "katex/dist/katex.min.css";
import { motion } from "framer-motion";

/**
 * BlogDetailClient — Client wrapper for the blog detail page.
 */
export default function BlogDetailClient({ content, headings, title, slug }) {
  return (
    <>
      <ReadingProgress />

      {/* Layout Container */}
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 grid grid-cols-1 xl:grid-cols-[250px_1fr_250px] gap-8 lg:gap-12">
        
        {/* Desktop TOC — Sticky Sidebar on the Left */}
        <div className="hidden xl:block w-[250px] shrink-0">
          <TableOfContents headings={headings} />
        </div>

        {/* Main Content strictly centered */}
        <div className="w-full max-w-[900px] min-w-0 mx-auto">
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {/* Mobile TOC */}
            <div className="block xl:hidden mb-8">
              <TableOfContents headings={headings} isMobile={true} />
            </div>

            {/* Share + Article Content */}
            <div className="flex items-center justify-between mb-8 lg:mb-10 border-b border-[var(--card-border)]/50 pb-6">
              <ShareButtons title={title} slug={slug} />
            </div>

            {/* Markdown Content */}
            <div
              className="prose prose-lg prose-slate dark:prose-invert max-w-none
                prose-headings:text-[var(--text-heading)] prose-headings:font-extrabold prose-headings:tracking-tight
                prose-h1:text-[28px] sm:prose-h1:text-[36px] lg:prose-h1:text-[48px] prose-h1:leading-[1.1]
                prose-h2:text-[24px] sm:prose-h2:text-[28px] lg:prose-h2:text-[34px] prose-h2:leading-[1.2]
                prose-h3:text-[20px] sm:prose-h3:text-[24px] lg:prose-h3:text-[28px] prose-h3:leading-[1.3]
                prose-p:text-[var(--text-body)] prose-p:text-base sm:prose-p:text-[17px] lg:prose-p:text-[18px] prose-p:leading-[1.9]
                prose-strong:text-[var(--text-heading)]
                prose-a:text-[#6366F1] hover:prose-a:text-[#818CF8] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-2xl prose-img:shadow-xl
                prose-code:text-[#818CF8] prose-code:bg-[#6366F1]/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-[#0d1117]/80 prose-pre:backdrop-blur-md prose-pre:border prose-pre:border-[var(--card-border)] prose-pre:rounded-xl prose-pre:text-sm prose-pre:shadow-2xl
                prose-blockquote:border-l-4 prose-blockquote:border-l-[#6366F1] prose-blockquote:bg-gradient-to-r prose-blockquote:from-[#6366F1]/10 prose-blockquote:to-transparent prose-blockquote:rounded-r-xl prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:shadow-sm
                prose-li:text-[var(--text-body)] prose-li:text-base sm:prose-li:text-[17px] lg:prose-li:text-[18px] prose-li:leading-[1.9] prose-li:marker:text-[#6366F1]
                prose-hr:border-[var(--card-border)]/50
                prose-th:text-[var(--text-heading)] prose-td:text-[var(--text-body)]"
              id="article-content"
            >
              <MarkdownRenderer content={content} />
            </div>
          </motion.article>
        </div>

        {/* Dummy right sidebar placeholder to keep content centered */}
        <div className="hidden xl:block w-[250px] shrink-0 pointer-events-none" aria-hidden="true" />
      </div>

      {/* Back to Top */}
      <BackToTop />
    </>
  );
}
