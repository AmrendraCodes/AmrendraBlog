import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 bg-[var(--background)]">
      <div className="relative max-w-xl mx-auto flex flex-col items-center">
        <span className="text-[7rem] sm:text-[10rem] md:text-[12rem] font-black text-[#F59E0B]/20 dark:text-[#F59E0B]/10 leading-none select-none -mb-8 sm:-mb-14">
          404
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-heading)] mb-3 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-body)] max-w-md mb-8 px-4 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#F59E0B] text-[#0B1F3A] rounded-full font-bold hover:bg-[#D97706] transition-colors shadow-lg shadow-amber-500/20   no-underline inline-flex items-center justify-center"
          >
            Go Back Home
          </Link>
          <Link
            href="/resources/blog"
            className="w-full sm:w-auto px-8 py-3.5 bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--foreground)] rounded-full font-bold hover:bg-[var(--card-bg-hover)] hover:border-[#F59E0B]/50 hover:text-[#F59E0B] transition-colors no-underline inline-flex items-center justify-center"
          >
            Read the Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
