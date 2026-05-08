export default function HeroSection() {
  return (
    <section className="py-24 px-6 lg:px-16 bg-white dark:bg-[#020617] text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-slate-100 text-sm font-medium text-black">
          200+ articles published · updated weekly
        </div>
        <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
          Ideas worth reading. Insights worth sharing.
        </h1>
        <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
          Explore in-depth articles, practical guides, and sharp takes on topics that matter — written for curious minds and ambitious builders.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors">
            Start Reading
          </button>
          <button className="px-8 py-4 bg-white dark:bg-[#020617] text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-full font-semibold hover:bg-slate-50 dark:bg-[#0f172a] transition-colors">
            Browse Categories →
          </button>
        </div>
      </div>
    </section>
  );
}
