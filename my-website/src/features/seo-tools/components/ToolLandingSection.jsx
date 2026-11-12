'use client';

import Link from 'next/link';
import {
  HelpCircle,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Bot,
  Layers,
  Sparkles,
  Lock,
  ArrowUpRight,
  Check,
  Search,
} from 'lucide-react';
import ToolsFaqAccordion from '@/components/tools/ToolsFaqAccordion';
import {
  RELEVANT_BLOG_POSTS,
  SEO_REVIEWER_CONTENT,
} from '../data/seoToolsData.js';

export default function ToolLandingSection() {
  const {
    howItWorksSteps,
    coreChecks,
    scoringRules,
    useCases,
    commonMistakes,
    quickExample,
    privacy,
    faqs,
    servicesCta,
  } = SEO_REVIEWER_CONTENT;

  return (
    <section className="mx-auto max-w-6xl space-y-10 pt-10 text-[var(--text-body)]">
      {/* ─── 1. HOW IT WORKS (3 NATURAL STEPS) ─── */}
      <div className="space-y-6">
        <div className="border-b border-[var(--card-border)] pb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            Simple 3-Step Process
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-heading)]">
            How to Audit and Improve Your Content
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1">
            Get an instant evaluation without leaving your browser or signing up for another subscription.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {howItWorksSteps.map((s, idx) => (
            <div
              key={s.step}
              className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold font-mono text-sm mb-4 border border-amber-500/20">
                  {idx + 1}
                </span>
                <h3 className="text-base font-bold text-[var(--text-heading)] mb-2">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 2. WHAT THE 5 CHECKS MEASURE (CLEAN SPECIFICATION TABLE/CARDS) ─── */}
      <div className="space-y-6">
        <div className="border-b border-[var(--card-border)] pb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            Audit Criteria
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-heading)]">
            What the 5 Core SEO Checks Evaluate
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1">
            Each check is an independent, pure function based on public search engine documentation and editorial readability research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {coreChecks.map((check) => (
            <div
              key={check.id}
              className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 sm:p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <h3 className="text-sm sm:text-base font-bold text-[var(--text-heading)]">
                  {check.title}
                </h3>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0">
                  Weight: {check.weight}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {check.description}
              </p>
            </div>
          ))}
        </div>

        {/* Scoring & Provisional Weight Banner (Compact Full-Width Callout) */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 sm:p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-500/20 pb-2.5 mb-3">
            <h3 className="text-sm sm:text-base font-bold text-amber-900 dark:text-amber-300">
              Fair Scoring with Provisional Weights
            </h3>
            <span className="text-[11px] font-mono text-amber-800 dark:text-amber-400">
              Overall Score = Weighted average calculated only on provided inputs
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm text-amber-950/80 dark:text-amber-200/90 leading-relaxed">
            <div className="flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
              <span><strong className="text-amber-900 dark:text-amber-200">No Unfair Penalties:</strong> Missing focus keyword or headings won&apos;t drop your score.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
              <span><strong className="text-amber-900 dark:text-amber-200">Auto Re-Weighting:</strong> The remaining active checks automatically scale to 100%.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
              <span><strong className="text-amber-900 dark:text-amber-200">Provisional Status:</strong> Add your keyword anytime to unlock the full 5-check review.</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 3. REALISTIC BEFORE & AFTER COMPARISON ─── */}
      <div className="space-y-6">
        <div className="border-b border-[var(--card-border)] pb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            Practical Walkthrough
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-heading)]">
            A Realistic Before &amp; After Example
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1">
            See how small on-page refinements change the audit score and clarify search intent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before */}
          <div className="rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/15 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-rose-200 dark:border-rose-900/40 pb-3">
              <span className="text-sm font-bold text-rose-800 dark:text-rose-300">
                {quickExample.before.label}
              </span>
              <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/40 px-2.5 py-1 rounded-md">
                Score: {quickExample.before.score}/100
              </span>
            </div>
            <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              <p><strong className="text-slate-900 dark:text-white">Title:</strong> {quickExample.before.title}</p>
              <p><strong className="text-slate-900 dark:text-white">Meta:</strong> {quickExample.before.meta}</p>
              <p><strong className="text-slate-900 dark:text-white">H1:</strong> {quickExample.before.h1}</p>
              <p><strong className="text-slate-900 dark:text-white">Intro:</strong> {quickExample.before.intro}</p>
            </div>
          </div>

          {/* After */}
          <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/15 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-200 dark:border-emerald-900/40 pb-3">
              <span className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                {quickExample.after.label}
              </span>
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 px-2.5 py-1 rounded-md">
                Score: {quickExample.after.score}/100
              </span>
            </div>
            <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              <p><strong className="text-slate-900 dark:text-white">Title:</strong> {quickExample.after.title}</p>
              <p><strong className="text-slate-900 dark:text-white">Meta:</strong> {quickExample.after.meta}</p>
              <p><strong className="text-slate-900 dark:text-white">H1:</strong> {quickExample.after.h1}</p>
              <p><strong className="text-slate-900 dark:text-white">Intro:</strong> {quickExample.after.intro}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 4. COMMON ON-PAGE MISTAKES ─── */}
      <div className="space-y-6">
        <div className="border-b border-[var(--card-border)] pb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            Common Pitfalls
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-heading)]">
            5 Common Mistakes This Checker Helps You Avoid
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {commonMistakes.map((mistake, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 shadow-sm space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <h3 className="text-sm font-bold text-[var(--text-heading)]">{mistake.title}</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                {mistake.description}
              </p>
            </div>
          ))}

          {/* Privacy Note inside grid */}
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck size={18} />
              <h3 className="text-sm font-bold text-[var(--text-heading)]">100% Private By Design</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Paste analysis executes locally in browser memory. URL mode fetches public pages statelessly without saving drafts.
            </p>
          </div>
        </div>
      </div>

      {/* ─── 5. FREQUENTLY ASKED QUESTIONS (USING SITE'S OFFICIAL ACCORDION) ─── */}
      <div className="mx-auto max-w-4xl pt-8">
        <div className="mb-10 text-center flex flex-col items-center justify-center">
          <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-1.5 text-xs font-mono font-bold tracking-wider text-amber-600 dark:text-amber-400 uppercase">
            <HelpCircle size={15} />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text-heading)] mb-3">
            Common Questions &amp; Answers
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-lg text-center leading-relaxed">
            Quick, honest answers about our free SEO content reviewer and how scoring works.
          </p>
        </div>

        <ToolsFaqAccordion items={faqs} defaultOpen={0} />
      </div>

      {/* ─── 6. RECOMMENDED ARTICLES ─── */}
      <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 sm:p-9 shadow-sm">
        <div className="flex items-center gap-2.5 mb-2 text-amber-600 dark:text-amber-400">
          <BookOpen size={20} />
          <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)]">
            Related Engineering &amp; SEO Guides
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
          In-depth architectural breakdowns, pricing benchmarks, and search engine updates:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {RELEVANT_BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={post.route}
              className="rounded-2xl border border-[var(--card-border)] bg-slate-50/50 dark:bg-[#070e1a] p-5 flex flex-col justify-between hover:border-amber-500/50 transition-all group no-underline"
            >
              <div>
                <h4 className="font-semibold text-[var(--text-heading)] text-sm group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-2">
                  {post.title}
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                <span>Read Guide</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ─── 7. CLOSING SOFT SERVICES INVITATION ─── */}
      <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 sm:p-12 text-center shadow-sm">
        <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--text-heading)] mb-3">
          {servicesCta.title}
        </h3>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
          {servicesCta.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-3xl mx-auto mb-8">
          {servicesCta.services.map((svc) => (
            <div
              key={svc.name}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#070e1a] p-4"
            >
              <h4 className="text-xs sm:text-sm font-bold text-[var(--text-heading)] mb-1">
                {svc.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {svc.desc}
              </p>
            </div>
          ))}
        </div>

        <Link
          href={servicesCta.buttonHref}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-sm no-underline cursor-pointer"
        >
          <span>{servicesCta.buttonText}</span>
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
}
