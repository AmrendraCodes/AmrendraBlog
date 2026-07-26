'use client';

import AnimatedSection from "@/components/AnimatedSection";

export default function ServiceProcess({ processSteps = [] }) {
  return (
    <section className="py-20 bg-[var(--background)] border-b border-[var(--card-border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#10B981] dark:text-[#34D399] bg-[#10B981]/10 px-3.5 py-1.5 rounded-full border border-[#10B981]/20 mb-4 inline-block">
            OUR FRAMEWORK
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-heading)] tracking-tight mt-3 mb-4">
            Proven Step-by-Step Delivery Process
          </h2>
          <p className="text-[var(--text-body)] text-base sm:text-lg leading-relaxed">
            From initial consultation to launch and continuous optimization, we follow a transparent engineering workflow.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {processSteps.map((step, idx) => (
            <AnimatedSection
              key={idx}
              direction="up"
              delay={idx * 0.08}
              className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-7 relative flex flex-col justify-between group hover:border-[#10B981]/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black font-mono bg-gradient-to-r from-[#10B981] to-[#34D399] text-transparent bg-clip-text">
                    {step.step}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-xs font-bold flex items-center justify-center">
                    STEP
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[var(--text-heading)] mb-3 group-hover:text-[#10B981] transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
