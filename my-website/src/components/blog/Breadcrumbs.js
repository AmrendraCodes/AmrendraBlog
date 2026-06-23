import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * Breadcrumbs — Visual breadcrumb trail with chevron separators.
 *
 * @param {{ items: Array<{label: string, href?: string}> }} props
 */
export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-sm font-medium text-[var(--text-muted)] flex-wrap"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index} className="flex items-center gap-1.5">
            {index > 0 && (
              <ChevronRight size={14} className="text-[var(--card-border)]" />
            )}
            {isLast || !item.href ? (
              <span className="text-[var(--text-heading)] font-semibold truncate max-w-[200px] sm:max-w-[300px]">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-[#6366F1] dark:hover:text-[#818CF8] transition-colors no-underline"
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
