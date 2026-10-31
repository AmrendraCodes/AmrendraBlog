import Link from 'next/link';
import { ArrowUpRight, Wrench } from 'lucide-react';
import { PUBLISHED_TOOLS } from '@/data/toolsData';

export default function RelatedTools({ currentSlug }) {
  const tools = PUBLISHED_TOOLS.filter((tool) => tool.slug !== currentSlug);
  if (!tools.length) return null;

  return (
    <section aria-labelledby="related-tools-heading" className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
      <h2 id="related-tools-heading" className="mb-4 text-xl font-bold text-[var(--text-heading)]">More developer tools</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link key={tool.slug} href={tool.route} className="group flex min-h-24 items-center justify-between gap-4 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 text-[var(--text-heading)] no-underline shadow-[var(--shadow-card)] transition hover:border-amber-500/60">
            <span className="flex items-center gap-3"><Wrench size={18} className="text-amber-500" /><span><span className="block font-bold">{tool.title}</span><span className="mt-1 block text-sm text-[var(--text-muted)]">{tool.category}</span></span></span>
            <ArrowUpRight size={18} className="shrink-0 text-[var(--text-muted)] transition group-hover:text-amber-500" />
          </Link>
        ))}
      </div>
    </section>
  );
}
