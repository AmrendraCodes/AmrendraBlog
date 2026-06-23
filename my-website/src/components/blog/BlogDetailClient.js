"use client";

import ReadingProgress from "./ReadingProgress";
import TableOfContents from "./TableOfContents";
import BackToTop from "./BackToTop";
import ShareButtons from "./ShareButtons";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import "highlight.js/styles/atom-one-dark.css";
import "katex/dist/katex.min.css";

/**
 * BlogDetailClient — Client wrapper for the blog detail page.
 *
 * Manages:
 * - Reading progress bar
 * - Table of Contents with active section tracking
 * - Share buttons
 * - Back to top button
 * - Markdown rendering (client-side for interactive features)
 *
 * @param {{ content: string, headings: Array, title: string, slug: string }} props
 */
export default function BlogDetailClient({ content, headings, title, slug }) {
  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgress />

      {/* Two-column layout: Content + TOC */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="flex gap-10 items-start">
          {/* Main Content */}
          <article className="flex-1 min-w-0 max-w-3xl">
            {/* Mobile TOC */}
            <TableOfContents headings={headings} />

            {/* Share + Article Content */}
            <div className="flex items-center justify-between mb-8 lg:mb-10">
              <ShareButtons title={title} slug={slug} />
            </div>

            {/* Markdown Content */}
            <div
              className="prose prose-lg prose-slate dark:prose-invert max-w-none
                prose-headings:text-[var(--text-heading)] prose-headings:font-extrabold prose-headings:tracking-tight
                prose-p:text-[var(--text-body)] prose-p:leading-relaxed prose-p:text-[17px]
                prose-strong:text-[var(--text-heading)]
                prose-a:text-[#6366F1] hover:prose-a:text-[#818CF8] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-2xl prose-img:shadow-xl
                prose-code:text-[#818CF8] prose-code:bg-[var(--section-alt-bg)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-[var(--card-border)] prose-pre:rounded-xl prose-pre:text-sm
                prose-blockquote:border-l-[#6366F1] prose-blockquote:bg-[var(--section-alt-bg)] prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:not-italic
                prose-li:text-[var(--text-body)] prose-li:marker:text-[#6366F1]
                prose-hr:border-[var(--card-border)]
                prose-th:text-[var(--text-heading)] prose-td:text-[var(--text-body)]"
              id="article-content"
            >
              <MarkdownRenderer content={content} />
            </div>
          </article>

          {/* Desktop TOC — Sticky Sidebar */}
          <TableOfContents headings={headings} />
        </div>
      </div>

      {/* Back to Top */}
      <BackToTop />
    </>
  );
}
