import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-white dark:bg-slate-950">
      <div className="relative">
        <h1 className="text-[10rem] md:text-[14rem] font-black text-slate-100 dark:text-slate-900 leading-none select-none">
          404
        </h1>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
            Page Not Found
          </p>
          <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-md mb-8 px-4">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/"
              className="px-8 py-3.5 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              Go Back Home
            </Link>
            <Link
              href="/blog"
              className="px-8 py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 rounded-full font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              Read the Blog
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
