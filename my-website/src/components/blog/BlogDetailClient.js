"use client";

import dynamic from 'next/dynamic';
import ReadingProgress from "./ReadingProgress";

const TableOfContents = dynamic(() => import('./TableOfContents'), { ssr: true });
const ShareButtons = dynamic(() => import('./ShareButtons'), { ssr: false });

/**
 * BlogDetailClient — Client wrapper for the blog detail page.
 * Uses a max-w-7xl centered parent container with a 3-column desktop layout:
 * Flexible TOC | 760px article | flexible balancing column.
 */
export default function BlogDetailClient({ article, headings, title, slug, children }) {

  return (
    <>
      <ReadingProgress />

      {/* Main Container — max-w-7xl / 2xl:max-w-[1380px] centered */}
      <div className="relative max-w-7xl 2xl:max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-1 xl:grid-cols-[240px_minmax(0,760px)_240px] xl:justify-center gap-8 lg:gap-10 xl:gap-12 items-start">
          
          {/* Desktop TOC — Sticky Sidebar on the Left */}
          <aside className="hidden xl:block w-[240px] shrink-0 sticky top-28 space-y-4" id="toc-desktop">
            <TableOfContents headings={headings} />
            <div className="pt-3.5 border-t border-[var(--card-border)]/50 px-3">
              <span className="block text-xs font-bold uppercase tracking-widest text-[var(--text-heading)] mb-2.5">
                Share Article
              </span>
              <ShareButtons title={title} slug={slug} showLabel={false} />
            </div>
          </aside>

          {/* Main Content Column — strictly centered (target: 760px) */}
          <div className="w-full max-w-[760px] min-w-0 mx-auto">
            <article
              className="w-full"
            >
              {/* Mobile TOC */}
              <div className="block xl:hidden mb-8">
                <TableOfContents headings={headings} isMobile={true} />
              </div>

              {/* Markdown Content with prose max-w-none (width controlled by outer wrapper) */}
              <div id="article-content" className="w-full prose article-prose max-w-none text-left">
                {article}
              </div>
            </article>

            {/* Bottom Sections: FAQ, Author Box, Article Navigation, Related Posts */}
            {children && (
              <div className="w-full mt-10 space-y-6 sm:space-y-8">
                {children}
              </div>
            )}
          </div>

          {/* Right Column Spacer (desktop only) to keep center column perfectly centered */}
          <div className="hidden xl:block w-[240px] shrink-0 pointer-events-none" aria-hidden="true" />
        </div>
      </div>
    </>
  );
}
