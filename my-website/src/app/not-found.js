import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[var(--background)]">
      <div className="relative">
        <h1 className="text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[14rem] font-black text-[var(--card-border)] leading-none select-none">
          404
        </h1>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl md:text-3xl font-bold text-[var(--text-heading)] mb-2">
            Page Not Found
          </p>
          <p className="text-base md:text-lg text-[var(--text-body)] max-w-md mb-8 px-4">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/"
              className="px-8 py-3.5 bg-[#10B981] text-white rounded-full font-bold hover:bg-[#059669] transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 no-underline"
            >
              Go Back Home
            </Link>
            <Link
              href="/blog"
              className="px-8 py-3.5 bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--foreground)] rounded-full font-bold hover:bg-[var(--card-bg-hover)] transition-all no-underline"
            >
              Read the Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
