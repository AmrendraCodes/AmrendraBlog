'use client';

export default function HeroSection() {
  return (
    <section className="relative py-24 px-6 lg:px-16 overflow-hidden bg-white dark:bg-slate-950 flex flex-col items-center justify-center text-center min-h-[50vh] md:min-h-[60vh]">
      {/* Decorative Gradients */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-linear-to-br from-blue-600/30 to-violet-600/30 blur-[120px] rounded-full pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-tl from-cyan-500/20 to-transparent blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center animate-fade-in-up mt-12 md:mt-0">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 text-sm font-semibold mb-8 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-md transition-transform hover:scale-105 cursor-default">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600 dark:bg-blue-400"></span>
          </span>
          The Official Blog
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-8 tracking-tight">
          Insights, Ideas & <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">Industry Trends</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-10">
          Explore daily blogs, design inspiration, development tips, and digital insights crafted to help your business grow.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-lg hover:shadow-[0_10px_30px_rgba(15,23,42,0.2)] dark:hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)] transition-all transform hover:-translate-y-1">
            Subscribe Now
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-transparent text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-800 rounded-full font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
            Browse Topics
          </button>
        </div>
      </div>
    </section>
  );
}
