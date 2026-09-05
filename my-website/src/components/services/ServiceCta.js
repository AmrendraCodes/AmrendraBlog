import Link from "next/link";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default function ServiceCta() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-[var(--background)] via-[var(--card-bg)] to-[var(--background)] relative overflow-hidden">
      {/* Glow background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-[#F59E0B]/15 to-[#0B1F3A]/20 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection direction="up" className="bg-gradient-to-br from-[var(--card-bg)] via-[var(--background)] to-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl p-6 sm:p-10 shadow-[var(--shadow-float)] relative overflow-hidden">
          {/* Subtle top border gradient */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#0B1F3A] dark:text-[#F59E0B] text-xs font-extrabold uppercase tracking-wider mb-6">
            <Sparkles size={14} />
            <span>LET&apos;S BUILD SOMETHING GREAT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-heading)] tracking-tight leading-tight mb-6 max-w-3xl mx-auto">
            Ready to Build, Grow &amp; Scale Your Digital Presence?
          </h2>

          <p className="text-base sm:text-lg text-[var(--text-body)] leading-relaxed mb-10 max-w-2xl mx-auto">
            Let&apos;s discuss your goals and find the right digital solution for your business. From web engineering to AI automation and SEO growth.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-bold text-base py-4 px-9 rounded-full shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-colors duration-200   w-full sm:w-auto"
            >
              <span>Get Started</span>
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-heading)] font-semibold text-base py-4 px-8 rounded-full hover:border-[#F59E0B] hover:text-[#F59E0B] transition-colors duration-200 w-full sm:w-auto"
            >
              <Mail size={18} />
              <span>Contact Us</span>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
