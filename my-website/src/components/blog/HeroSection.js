export default function HeroSection() {
  return (
    <section className="py-24 px-6 lg:px-16 bg-white dark:bg-slate-950 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-medium text-black dark:text-slate-50">
          200+ articles published · updated weekly
        </div>
        <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-6">
          Ideas worth reading. Insights worth sharing.
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
          Explore in-depth articles, practical guides, and sharp takes on topics that matter — written for curious minds and ambitious builders.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-full font-semibold transition-colors">
            Start Reading
          </button>
          <button className="px-8 py-4 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 border border-slate-200 dark:border-slate-700 rounded-full font-semibold hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
            Browse Categories →
          </button>
        </div>
      </div>
    </section>
  );
}
