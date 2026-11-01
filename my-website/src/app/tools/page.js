import { Suspense } from "react";
import Link from "next/link";
import {
  FileCode2,
  Bot,
  Search,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Code2,
  Terminal,
  Cpu,
  Bookmark,
} from "lucide-react";
import { siteMetadata } from "@/config/seo";
import JsonLd from "@/components/JsonLd";
import ToolsDirectoryClient from "@/components/tools/ToolsDirectoryClient";
import ToolsFaqAccordion from "@/components/tools/ToolsFaqAccordion";

export const metadata = {
  title: "Free Developer, AI & SEO Tools Online | Code with Amrendra",
  description:
    "Free browser-based tools: JSON validator, AI agent cost calculator and more. No signup, built for developers, AI builders and SEO teams.",
  keywords: [
    "free developer tools",
    "free online developer tools",
    "free AI tools for developers",
    "free JSON validator",
    "AI agent cost calculator",
  ],
  alternates: {
    canonical: `${siteMetadata.siteUrl}/tools`,
  },
  openGraph: {
    title: "Free Developer, AI & SEO Tools Online | Code with Amrendra",
    description:
      "Free browser-based tools: JSON validator, AI agent cost calculator and more. No signup, built for developers, AI builders and SEO teams.",
    url: `${siteMetadata.siteUrl}/tools`,
    type: "website",
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "Free Developer, AI & SEO Tools Online — Code with Amrendra",
      },
    ],
  },
  twitter: {
    title: "Free Developer, AI & SEO Tools Online | Code with Amrendra",
    description:
      "Free browser-based tools: JSON validator, AI agent cost calculator and more. No signup, built for developers, AI builders and SEO teams.",
    images: ["/images/og-default.png"],
  },
};

export default function ToolsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteMetadata.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${siteMetadata.siteUrl}/tools`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are these tools really free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Every published tool is free to use and does not require signup.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to create an account?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Open a tool and start using it.",
        },
      },
      {
        "@type": "Question",
        name: "What kinds of tools are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "There are three categories: Developer Tools (such as the JSON validator), AI & LLM Tools (such as the AI agent cost calculator) and SEO Tools, which are on the way.",
        },
      },
      {
        "@type": "Question",
        name: "Is my data safe when I use the tools?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The tools are built as client-side utilities. Even so, avoid pasting secrets, API keys or personal data into any online tool.",
        },
      },
      {
        "@type": "Question",
        name: "Can I request a new tool?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Use the Suggest a Tool button and describe what you need. Useful ideas get built and hosted free for other developers.",
        },
      },
      {
        "@type": "Question",
        name: "Can you build a custom tool or AI agent for my business?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Beyond the free toolbox, Code with Amrendra offers web development, AI and automation, and SEO content services. Get in touch to discuss your project.",
        },
      },
    ],
  };

  const faqItems = [
    {
      question: "Are these tools really free?",
      answer: "Yes. Every published tool is free to use and does not require signup.",
    },
    {
      question: "Do I need to create an account?",
      answer: "No. Open a tool and start using it.",
    },
    {
      question: "What kinds of tools are available?",
      answer:
        "There are three categories: Developer Tools (such as the JSON validator), AI & LLM Tools (such as the AI agent cost calculator) and SEO Tools, which are on the way.",
    },
    {
      question: "Is my data safe when I use the tools?",
      answer:
        "The tools are built as client-side utilities. Even so, avoid pasting secrets, API keys or personal data into any online tool.",
    },
    {
      question: "Can I request a new tool?",
      answer:
        "Yes. Use the Suggest a Tool button and describe what you need. Useful ideas get built and hosted free for other developers.",
    },
    {
      question: "Can you build a custom tool or AI agent for my business?",
      answer: (
        <span>
          Yes. Beyond the free toolbox, Code with Amrendra offers{" "}
          <Link
            href="/services/web-development"
            className="text-[#F59E0B] hover:underline font-semibold"
          >
            web development
          </Link>
          ,{" "}
          <Link
            href="/services/ai-automation"
            className="text-[#F59E0B] hover:underline font-semibold"
          >
            AI and automation
          </Link>
          , and{" "}
          <Link
            href="/services/seo-content-strategy"
            className="text-[#F59E0B] hover:underline font-semibold"
          >
            SEO content services
          </Link>
          . Get in touch to discuss your project.
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 overflow-x-hidden selection:bg-[#F59E0B]/30 relative">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      {/* ─── Ambient Grid Background (Linear & Vercel Aesthetic) ─── */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"
        aria-hidden="true"
      />

      {/* ─── Ambient Glow Rings & Radar Cones (Level AI Atmosphere) ─── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[640px] pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Central Luminous Core */}
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.18)_0%,rgba(59,130,246,0.08)_40%,transparent_70%)] blur-3xl" />
        
        {/* Orbital Concentric Curves (Level AI signature geometry) */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full border border-amber-500/10 [mask-image:radial-gradient(ellipse_at_top,white_20%,transparent_70%)]" />
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full border border-slate-700/20 [mask-image:radial-gradient(ellipse_at_top,white_15%,transparent_70%)]" />
      </div>

      {/* ═══════════════════════════════════════════════════════
          1. HERO SECTION (Level AI Agents Architecture)
          ═══════════════════════════════════════════════════════ */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center z-10">
        {/* Level AI Eyebrow Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono font-bold uppercase tracking-widest text-amber-700 dark:text-[#F59E0B] mb-7 shadow-xs backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F59E0B]" />
          </span>
          <span>ENGINEERING TOOLBOX</span>
          <span className="text-amber-500/40">•</span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">v2.0 CLIENT-SIDE</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 max-w-4xl mx-auto">
          <span className="text-slate-900 dark:text-white">Free Developer, AI &amp; </span>
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-[#F59E0B] text-transparent bg-clip-text drop-shadow-xs">
            SEO Tools
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-6 font-normal">
          Clean, fast, client-side tools for modern web development, AI agent planning and SEO workflows. Open a tool, get your answer, move on. No signup required.
        </p>

        {/* Trust Line */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 mb-8">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Free to use
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-blue-500" />
            Runs in your browser
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="inline-flex items-center gap-1.5">
            <Code2 size={14} className="text-[#F59E0B]" />
            Built by a working developer
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
          <a
            href="#tools-catalog"
            className="px-7 py-3.5 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-bold text-sm inline-flex items-center gap-2 transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 active:scale-95 no-underline cursor-pointer"
          >
            <span>Browse all tools</span>
            <ArrowRight size={16} />
          </a>
          <Link
            href="/contact?subject=Suggest%20a%20Tool"
            className="px-7 py-3.5 rounded-full border border-slate-300 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-800 dark:text-slate-200 font-semibold text-sm hover:border-[#F59E0B] hover:text-[#F59E0B] transition-all inline-flex items-center gap-2 no-underline active:scale-95 shadow-sm"
          >
            <span>Suggest a tool</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* ─── Level AI Signature Floating Console / Showcase Deck ─── */}
        <div className="relative max-w-4xl mx-auto rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/70 dark:bg-[#070F1E]/85 backdrop-blur-xl p-4 sm:p-6 shadow-2xl shadow-black/10 dark:shadow-black/50 overflow-hidden text-left before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#F59E0B]/60 before:to-transparent">
          {/* Deck Header Bar */}
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-200/70 dark:border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline-block">
                toolbox.codewithamrendra.in/runtime
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>ACTIVE · 100% CLIENT ENGINE</span>
            </div>
          </div>

          {/* Deck 3-Pillar Capability Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Pillar 1 */}
            <Link
              href="/tools/free-json-validator"
              className="group p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-slate-50/70 dark:bg-[#050C18]/70 hover:border-blue-500/50 hover:bg-white dark:hover:bg-[#09152B] transition-all no-underline block"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold border border-blue-500/20">
                  <FileCode2 size={16} />
                </div>
                <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center">
                  LAUNCH ↗
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                JSON Validator
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                Instant parsing, missing comma detection &amp; formatter.
              </p>
            </Link>

            {/* Pillar 2 */}
            <Link
              href="/tools/ai-agent-cost-calculator"
              className="group p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-slate-50/70 dark:bg-[#050C18]/70 hover:border-amber-500/50 hover:bg-white dark:hover:bg-[#09152B] transition-all no-underline block"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-[#F59E0B] flex items-center justify-center font-bold border border-amber-500/20">
                  <Bot size={16} />
                </div>
                <span className="text-[10px] font-mono text-[#F59E0B] group-hover:translate-x-0.5 transition-transform inline-flex items-center">
                  CALCULATE ↗
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                AI Cost Calculator
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                Multi-LLM token estimation &amp; agent budget planner.
              </p>
            </Link>

            {/* Pillar 3 */}
            <Link
              href="/contact?subject=Suggest%20an%20SEO%20Tool"
              className="group p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-slate-50/70 dark:bg-[#050C18]/70 hover:border-emerald-500/50 hover:bg-white dark:hover:bg-[#09152B] transition-all no-underline block"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold border border-emerald-500/20">
                  <Search size={16} />
                </div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center">
                  REQUEST ↗
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                SEO Tools
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                Metadata and structured schema checks in development.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. PROMINENT SEARCH & INTERACTIVE CATALOG
          ═══════════════════════════════════════════════════════ */}
      <section id="tools-catalog" className="px-4 sm:px-6 lg:px-8 pt-4 pb-16 max-w-7xl mx-auto relative z-10">
        <Suspense
          fallback={
            <div
              aria-busy="true"
              aria-label="Loading tools catalog"
              className="min-h-[22rem] rounded-3xl border border-slate-200 bg-white/50 dark:border-slate-800 dark:bg-[#070F1E]/50 animate-pulse"
            />
          }
        >
          <ToolsDirectoryClient />
        </Suspense>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. INTRO STATEMENT (Redesigned Linear Bento Showcase)
          ═══════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-5xl mx-auto relative z-10">
        <div className="relative rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/80 dark:bg-[#070F1E]/80 backdrop-blur-xl p-8 sm:p-10 md:p-12 shadow-xl shadow-black/5 dark:shadow-black/20 overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#F59E0B]/60 before:to-transparent">

          {/* Top Label & Headline */}
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#F59E0B] bg-[#F59E0B]/10 px-3 py-1 rounded-full border border-[#F59E0B]/30 inline-block mb-3.5">
              WHY THIS TOOLBOX EXISTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-snug tracking-tight mb-4">
              No clutter. No paywalls. Just clean, fast developer tools.
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
              Most online tools are slow, cluttered, or ask you to create an account before you can validate a single line of JSON. <span className="text-[#F59E0B] font-bold">These tools are different.</span> Each one is built to do one job well, load quickly, and respect your data by running in your browser.
            </p>
          </div>

          {/* 3 Categories Visual Pill Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 pt-2 mb-6">
            {/* Category 1 */}
            <div className="rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-[#050C18]/80 hover:border-blue-500/40 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold mb-3 border border-blue-500/20">
                <Code2 size={18} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                Developer Tools
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Everyday coding utilities for checking API responses, debugging config files, and data validation.
              </p>
            </div>

            {/* Category 2 */}
            <div className="rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-[#050C18]/80 hover:border-amber-500/40 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-[#F59E0B] flex items-center justify-center font-bold mb-3 border border-amber-500/20">
                <Bot size={18} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                AI &amp; LLM Tools
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Interactive estimators for modeling token usage, comparing LLMs, and planning agent budgets.
              </p>
            </div>

            {/* Category 3 */}
            <div className="rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-[#050C18]/80 hover:border-emerald-500/40 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold mb-3 border border-emerald-500/20">
                <Search size={18} />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                SEO Tools
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Practical diagnostics for metadata, structured schema, and technical on-page optimisation.
              </p>
            </div>
          </div>

          {/* Footer Subtext with Suggest Link */}
          <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <span>New tools are added regularly to expand the developer toolbox.</span>
            <Link
              href="/contact?subject=Suggest%20a%20Tool"
              className="text-[#F59E0B] hover:underline font-semibold inline-flex items-center gap-1 shrink-0"
            >
              <span>Suggest the next tool</span>
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. THREE CATEGORIES SHOWCASE
          ═══════════════════════════════════════════════════════ */}
      <section id="categories" className="px-4 sm:px-6 lg:px-8 py-16 md:py-20 max-w-6xl mx-auto space-y-20 relative z-10">

        {/* ── Category 1: Developer Tools ── */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                CATEGORY 1
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                Free Online Developer Tools
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
              Small utilities that remove friction from daily development work: checking API responses, debugging config files, and validating data before it ships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free JSON Validator Card */}
            <div className="group relative rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#070F1E]/95 p-7 sm:p-8 flex flex-col justify-between hover:border-[#F59E0B]/50 hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-blue-500/50 before:to-transparent">
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20 shadow-xs">
                    <FileCode2 size={24} />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                    Free Online · No Signup
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  Free JSON Validator
                </h3>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  Paste your JSON and find out instantly whether it is valid. Catch missing commas, unquoted keys and bracket errors before they break your API call or build.
                </p>

                <ul className="space-y-2.5 mb-7 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>Check JSON syntax online in one click</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>Useful for API responses, config files and webhooks</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>Free, no signup</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/tools/free-json-validator"
                className="w-full py-3.5 px-5 rounded-2xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-bold text-sm inline-flex items-center justify-center gap-2 transition-all no-underline shadow-xs hover:shadow-md"
              >
                <span>Open JSON Validator</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Category 2: AI & LLM Tools ── */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F59E0B]">
                CATEGORY 2
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                AI &amp; LLM Tools for Builders
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
              Shipping an AI agent is exciting until the first invoice arrives. These tools help you estimate costs and plan usage before you commit to an architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AI Agent Cost Calculator Card */}
            <div className="group relative rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#070F1E]/95 p-7 sm:p-8 flex flex-col justify-between hover:border-[#F59E0B]/50 hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-amber-500/50 before:to-transparent">
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-[#F59E0B] flex items-center justify-center border border-amber-500/20 shadow-xs">
                    <Bot size={24} />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                    Interactive Calculator
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  AI Agent Cost Calculator
                </h3>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  Estimate what an AI agent will cost to run. Model your usage, compare scenarios and plan a budget before you build, so pricing never surprises you in production.
                </p>

                <ul className="space-y-2.5 mb-7 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>Plan AI API and LLM spend ahead of time</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>Understand how usage drives cost</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>Built from real experience integrating AI agents</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <Link
                  href="/tools/ai-agent-cost-calculator"
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-bold text-sm inline-flex items-center justify-center gap-2 transition-all no-underline shadow-xs hover:shadow-md"
                >
                  <span>Open AI Agent Cost Calculator</span>
                  <ArrowRight size={16} />
                </Link>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Related reading: Explore more on{" "}
                  <Link
                    href="/category/ai-agents"
                    className="text-[#F59E0B] hover:underline font-semibold"
                  >
                    AI Agents
                  </Link>{" "}
                  and the{" "}
                  <Link
                    href="/resources/blog"
                    className="text-[#F59E0B] hover:underline font-semibold"
                  >
                    Engineering Blog
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Category 3: SEO Tools ── */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                CATEGORY 3
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                SEO Tools for Technical and Content Teams
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
              Practical tools for the on-page and technical basics: metadata, structured data and content checks, without paying for a full SEO suite.
            </p>
          </div>

          <div className="rounded-3xl border border-dashed border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-950/10 p-8 sm:p-10 md:p-12 text-center max-w-2xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 mx-auto shadow-xs">
              <Search size={24} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              SEO Tools Coming Next
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto">
              SEO tools are being built right now. Tell me which one you need most, and it moves to the top of the list.
            </p>
            <div className="pt-2">
              <Link
                href="/contact?subject=Suggest%20an%20SEO%20Tool"
                className="px-7 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm inline-flex items-center gap-2 transition-all no-underline shadow-md"
              >
                <span>Suggest an SEO tool</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* ═══════════════════════════════════════════════════════
          5. WHY USE THESE TOOLS (Linear Bento Grid)
          ═══════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F59E0B] bg-[#F59E0B]/10 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/30 inline-block mb-3.5 shadow-2xs">
            PHILOSOPHY &amp; DESIGN
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Built to Be Useful, Not Just Another Tool Directory
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="group rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#070F1E]/95 p-7 space-y-3.5 hover:border-[#F59E0B]/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-amber-500/40 before:to-transparent">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-[#F59E0B] flex items-center justify-center font-bold border border-amber-500/20">
              <Zap size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Free, with no signup
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Open a tool and use it. No accounts, no paywalls.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#070F1E]/95 p-7 space-y-3.5 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-blue-500/40 before:to-transparent">
            <div className="w-11 h-11 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold border border-blue-500/20">
              <Sparkles size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Fast and lightweight
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Clean interfaces that load quickly on any device.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#070F1E]/95 p-7 space-y-3.5 hover:border-emerald-500/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-emerald-500/40 before:to-transparent">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold border border-emerald-500/20">
              <ShieldCheck size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Client-side by design
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Tools are built to run in your browser, so you stay in control of what you paste.
            </p>
          </div>

          {/* Card 4 */}
          <div className="group rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#070F1E]/95 p-7 space-y-3.5 hover:border-purple-500/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-purple-500/40 before:to-transparent">
            <div className="w-11 h-11 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold border border-purple-500/20">
              <Code2 size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Made by a developer
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Each tool solves a problem that came up in real projects across React, Next.js and AI agent work.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. HOW IT WORKS (Linear Stepper)
          ═══════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-slate-100/50 dark:bg-[#050C18]/60 border-y border-slate-200/80 dark:border-slate-800/80 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F59E0B] bg-[#F59E0B]/10 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/30 inline-block mb-3.5 shadow-2xs">
              WORKFLOW
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
              How to Use the Toolbox
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#070F1E] p-7 sm:p-8 space-y-4 shadow-sm hover:border-amber-500/40 transition-colors">
              <div className="w-11 h-11 rounded-2xl bg-[#F59E0B] text-[#0B1F3A] font-extrabold flex items-center justify-center text-sm shadow-md shadow-amber-500/20">
                01
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Pick a category
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Filter by Developer Tools, AI &amp; LLM Tools or SEO Tools, or search by name, tag or technology.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#070F1E] p-7 sm:p-8 space-y-4 shadow-sm hover:border-amber-500/40 transition-colors">
              <div className="w-11 h-11 rounded-2xl bg-[#F59E0B] text-[#0B1F3A] font-extrabold flex items-center justify-center text-sm shadow-md shadow-amber-500/20">
                02
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Open a tool
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Each card links straight to a working tool.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#070F1E] p-7 sm:p-8 space-y-4 shadow-sm hover:border-amber-500/40 transition-colors">
              <div className="w-11 h-11 rounded-2xl bg-[#F59E0B] text-[#0B1F3A] font-extrabold flex items-center justify-center text-sm shadow-md shadow-amber-500/20">
                03
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Save your favourites
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Bookmark the tools you use often so they are one click away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          7. FAQ SECTION (Accordion)
          ═══════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-4xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F59E0B] bg-[#F59E0B]/10 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/30 inline-block mb-3.5 shadow-2xs">
            QUESTIONS &amp; ANSWERS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <ToolsFaqAccordion items={faqItems} />
      </section>

      {/* ═══════════════════════════════════════════════════════
          8. SUGGEST A TOOL BLOCK
          ═══════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-14 max-w-5xl mx-auto relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-amber-500/10 via-[#F59E0B]/5 to-transparent border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden backdrop-blur-md">
          <div className="relative z-10 text-center md:text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-700 dark:text-[#F59E0B] bg-[#F59E0B]/10 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/30 inline-block mb-3.5">
              NEED A SPECIFIC TOOL?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2.5">
              Suggest a Developer Tool or Workflow
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl">
              Have an idea for an AI prompt formatter, CSS generator or cloud calculator? Let me know, and I will build it and host it free for developers.
            </p>
          </div>

          <Link
            href="/contact?subject=Suggest%20a%20Tool"
            className="relative z-10 shrink-0 min-h-[48px] inline-flex items-center justify-center bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-bold text-sm py-3 px-8 rounded-full border-none cursor-pointer transition-all shadow-md hover:shadow-amber-500/20 active:scale-95 no-underline"
          >
            <span>Suggest a Tool</span>
            <ArrowUpRight size={16} className="ml-1.5" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          9. FINAL CTA BLOCK (Linear Obsidian Aesthetic)
          ═══════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24 md:pb-32 max-w-5xl mx-auto relative z-10">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-[#060D1A] via-[#081326] to-[#0A1A33] text-white border border-slate-800 text-center shadow-2xl relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#F59E0B]/50 before:to-transparent">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[radial-gradient(circle,rgba(245,158,11,0.08)_0%,transparent_70%)] blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F59E0B] bg-[#F59E0B]/10 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/30 inline-block shadow-2xs">
              LET&apos;S BUILD TOGETHER
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Need Web Development, AI, or Technical Content Help?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Whether you need a high-performance web platform built fast, custom AI agents integrated, or in-depth technical documentation, let&apos;s discuss your project.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-bold text-sm inline-flex items-center gap-2 transition-all shadow-md hover:shadow-amber-500/20 active:scale-95 no-underline"
              >
                <span>Let&apos;s Work Together</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/resources/case-studies"
                className="px-8 py-3.5 rounded-full border border-slate-700 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 hover:border-slate-600 transition-all inline-flex items-center gap-2 no-underline active:scale-95"
              >
                <span>View Selected Work</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
