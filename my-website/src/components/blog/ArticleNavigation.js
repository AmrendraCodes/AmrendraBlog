import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

/**
 * ArticleNavigation — Previous/Next article cards at the bottom of blog posts.
 *
 * @param {{ prev: {title,slug,category}|null, next: {title,slug,category}|null }} props
 */
export default function ArticleNavigation({ prev, next }) {
  if (!prev && !next) return null;

  return (
    <nav
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 pt-10 border-t border-[var(--card-border)]"
      aria-label="Post navigation"
    >
      {/* Previous Post */}
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group flex flex-col p-5 bg-[var(--section-alt-bg)] border border-[var(--card-border)] rounded-xl hover:border-[#10B981]/30 hover:bg-[var(--card-bg-hover)] transition-all duration-300 no-underline"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2 flex items-center gap-1.5">
            <ArrowLeft
              size={12}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Previous
          </span>
          <span className="text-sm font-bold text-[var(--text-heading)] group-hover:text-[#10B981] dark:group-hover:text-[#34D399] transition-colors line-clamp-2">
            {prev.title}
          </span>
          {prev.category && (
            <span className="text-[11px] text-[var(--text-muted)] mt-1.5 font-medium">
              {prev.category}
            </span>
          )}
        </Link>
      ) : (
        <div />
      )}

      {/* Next Post */}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex flex-col p-5 bg-[var(--section-alt-bg)] border border-[var(--card-border)] rounded-xl hover:border-[#10B981]/30 hover:bg-[var(--card-bg-hover)] transition-all duration-300 no-underline text-right"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2 flex items-center gap-1.5 justify-end">
            Next
            <ArrowRight
              size={12}
              className="group-hover:translate-x-1 transition-transform"
            />
          </span>
          <span className="text-sm font-bold text-[var(--text-heading)] group-hover:text-[#10B981] dark:group-hover:text-[#34D399] transition-colors line-clamp-2">
            {next.title}
          </span>
          {next.category && (
            <span className="text-[11px] text-[var(--text-muted)] mt-1.5 font-medium">
              {next.category}
            </span>
          )}
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
