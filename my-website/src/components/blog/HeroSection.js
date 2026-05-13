'use client';

export default function HeroSection() {
  return (
    <section className="relative py-24 px-6 lg:px-16 overflow-hidden bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center text-center min-h-[50vh]">
      {/* Decorative Gradients */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-br from-blue-600/20 to-violet-600/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-blue-500/10 to-transparent blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center animate-fade-in-up">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-8 border border-blue-100 dark:border-blue-800/50 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 dark:bg-blue-400"></span>
          </span>
          Our Blog
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          Insights, Ideas & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">Industry Trends</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Explore daily blogs, design inspiration, development tips, and digital insights crafted to help your business grow.
        </p>
      </div>
    </section>
  );
}
