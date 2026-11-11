import Link from 'next/link';

export default function ToolPageHeader({ tool, icon: IconComponent }) {
  return (
    <header className="mx-auto max-w-6xl px-4 pb-8 pt-24 sm:px-6 md:pt-32">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-[var(--text-muted)]">
        <Link href="/" className="hover:text-amber-600">Home</Link><span aria-hidden="true">/</span>
        <Link href="/tools" className="hover:text-amber-600">Tools</Link><span aria-hidden="true">/</span>
        <span aria-current="page" className="truncate text-[var(--text-heading)]">{tool.title}</span>
      </nav>
      {IconComponent ? (
        <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-mono font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 shadow-xs">
          <IconComponent size={16} strokeWidth={2.2} className="shrink-0 text-emerald-500 dark:text-emerald-400" />
          <span>{tool.category}</span>
        </div>
      ) : (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-amber-600 dark:text-amber-400">{tool.category}</p>
      )}
      <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-[var(--text-heading)] sm:text-5xl">{tool.title}</h1>
      <p className="max-w-3xl text-base leading-relaxed text-[var(--text-body)] sm:text-lg">{tool.description}</p>
    </header>
  );
}
