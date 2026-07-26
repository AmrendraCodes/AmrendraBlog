'use client';

import { AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default function ServiceProblemSolution({ problems = [], solutions = [], serviceTitle }) {
  return (
    <section className="py-20 bg-[var(--section-alt-bg)] border-b border-[var(--card-border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#10B981] dark:text-[#34D399] bg-[#10B981]/10 px-3.5 py-1.5 rounded-full border border-[#10B981]/20 mb-4 inline-block">
            CHALLENGES &amp; SOLUTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-heading)] tracking-tight mt-3 mb-4">
            Common Business Friction Points &amp; How We Solve Them
          </h2>
          <p className="text-[var(--text-body)] text-base sm:text-lg leading-relaxed">
            Eliminating technical roadblocks to deliver scalable, performant, and revenue-generating digital results.
          </p>
        </AnimatedSection>

        {/* Grid Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Problems Box */}
          <AnimatedSection direction="left" delay={0.1} className="bg-[var(--card-bg)] border border-rose-500/20 dark:border-rose-500/30 rounded-3xl p-8 shadow-[var(--shadow-card)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20">
                  <AlertCircle size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-heading)]">
                    Common Friction Points
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Obstacles hindering growth in {serviceTitle}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {problems.map((prob, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/10">
                    <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      ✕
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-[var(--text-heading)] mb-1">
                        {prob.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
                        {prob.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Solutions Box */}
          <AnimatedSection direction="right" delay={0.2} className="bg-[var(--card-bg)] border border-emerald-500/20 dark:border-emerald-500/30 rounded-3xl p-8 shadow-[var(--shadow-card)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-heading)]">
                    The Code with Amrendra Approach
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Engineering-first solutions built for longevity
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {solutions.map((sol, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-[var(--text-heading)] mb-1">
                        {sol.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
                        {sol.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
