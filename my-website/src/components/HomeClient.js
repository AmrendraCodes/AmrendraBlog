'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Code2,
  Cloud,
  Zap,
  Layers,
  Globe,
  ChevronRight,
  Bot,
  Check,
  X,
} from 'lucide-react';

import dynamic from 'next/dynamic';
import HeroSection from './hero/HeroSection';
import ScrollReveal from './ui/ScrollReveal';
import TiltCard from './ui/TiltCard';
import MagneticButton from './ui/MagneticButton';

// Dynamic Heavy Components for Performance
const CaseStudiesSection = dynamic(() => import('./CaseStudiesSection'), { ssr: false });
const DevShowcase = dynamic(() => import('@/components/home/DevShowcase'), { ssr: false });
const TechEcosystem3D = dynamic(() => import('@/components/home/TechEcosystem3D'), { ssr: false });
const ComparisonTable = dynamic(() => import('@/components/home/ComparisonTable'), { ssr: false });
const PricingSection = dynamic(() => import('@/components/home/PricingSection'), { ssr: false });



export default function HomeClient({ featuredPosts, caseStudies }) {
  return (
    <div className="relative min-h-screen bg-[#060907] text-[#F3F4F6] overflow-x-hidden">
      {/* ═══════════════════════════════════════════════════════════
         1. FULL 3D INTERACTIVE HERO SECTION
         ═══════════════════════════════════════════════════════════ */}
      <HeroSection />

      {/* ═══════════════════════════════════════════════════════════
         2. CLIENT & SERVICES TICKER MARQUEE (FULL-WIDTH SLIDING NEWS BROADCAST)
         ═══════════════════════════════════════════════════════════ */}
      <section className="w-full py-3.5 border-y border-[#10B981]/30 bg-[#060907] shadow-[0_0_25px_rgba(16,185,129,0.1)] overflow-hidden relative z-20" aria-label="Services ticker">
        <div className="w-full px-4 sm:px-8 flex items-center gap-4">
          
          {/* Fixed Left News Broadcast Badge */}
          <div className="flex-shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#10B981]/15 border border-[#10B981]/40 text-xs font-mono font-bold uppercase tracking-wider text-[#34D399] shadow-[0_0_15px_rgba(16,185,129,0.25)] z-20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span>
            </span>
            <span className="hidden sm:inline">LIVE SERVICES</span>
            <span className="sm:hidden">SERVICES</span>
          </div>

          {/* Full Width News Ticker Track */}
          <div className="relative flex-1 overflow-hidden flex items-center">
            {/* Left & Right Vignette Edge Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#060907] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#060907] to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee-fast gap-10 whitespace-nowrap">
              {[
                'Web Development Services',
                'Digital Marketing',
                'UI/UX & Product Design',
                'SEO & Content Strategy',
                'AI Automation Development Services',
                'Cloud & DevOps',
              ].concat([
                'Web Development Services',
                'Digital Marketing',
                'UI/UX & Product Design',
                'SEO & Content Strategy',
                'AI Automation Development Services',
                'Cloud & DevOps',
              ]).concat([
                'Web Development Services',
                'Digital Marketing',
                'UI/UX & Product Design',
                'SEO & Content Strategy',
                'AI Automation Development Services',
                'Cloud & DevOps',
              ]).map((service, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-white hover:text-[#10B981] transition-colors cursor-default pr-10"
                >
                  <span className="text-[#10B981] text-xs">✦</span>
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         3. PROBLEM STATEMENT & VALUE PROPOSITION
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
            THE ENGINEERING DIFFERENCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-6 tracking-tight">
            Stop Settling for Bloated Legacy Software
          </h2>
          <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
            Traditional software development is plagued by slow release cycles, technical debt, and fragile architecture. Code with Amrendra builds clean, AI-native platforms engineered for performance and scalability — so your product never buckles under real-world growth.
          </p>
        </div>

        {/* Bento Grid Split: Legacy vs Code with Amrendra */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Legacy Side */}
          <div className="group rounded-3xl bg-[#0A0F0C] border border-red-500/30 hover:border-red-500 p-6 sm:p-8 shadow-xl hover:shadow-[0_0_35px_rgba(239,68,68,0.3)] relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 cursor-pointer">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 shrink-0 group-hover:bg-red-500/25 group-hover:scale-105 flex items-center justify-center font-bold transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <X size={20} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-100 transition-colors">Traditional Development Agencies</h3>
                <p className="text-xs text-[#9CA3AF]">Slow, expensive, &amp; maintenance-heavy</p>
              </div>
            </div>
            <ul className="space-y-4 text-xs sm:text-sm text-[#9CA3AF]">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <X size={12} strokeWidth={2.5} />
                </span>
                <span className="leading-snug">6-8 months build timelines</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <X size={12} strokeWidth={2.5} />
                </span>
                <span className="leading-snug">Rigid legacy code and stacks</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <X size={12} strokeWidth={2.5} />
                </span>
                <span className="leading-snug">Manual QA, slow bug fixes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <X size={12} strokeWidth={2.5} />
                </span>
                <span className="leading-snug">Vendor lock-in, unclear ownership</span>
              </li>
            </ul>
          </div>

          {/* Code with Amrendra Side */}
          <div className="group rounded-3xl bg-gradient-to-br from-[#111C16] to-[#0A0F0C] border-2 border-[#10B981]/60 hover:border-[#10B981] p-6 sm:p-8 shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:shadow-[0_0_55px_rgba(16,185,129,0.45)] relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 cursor-pointer">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#10B981] text-white shrink-0 group-hover:bg-[#059669] group-hover:scale-105 shadow-[0_0_18px_rgba(16,185,129,0.5)] flex items-center justify-center font-bold transition-all duration-300">
                <Check size={20} strokeWidth={3} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">Code with Amrendra — AI Development Services</h3>
                <p className="text-xs text-[#34D399]">High-velocity, AI-native &amp; sub-second fast</p>
              </div>
            </div>
            <ul className="space-y-4 text-xs sm:text-sm text-[#F3F4F6]">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="leading-snug">Rapid launch with AI-accelerated development sprints</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="leading-snug">Modern React, Next.js and cloud-native architecture</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="leading-snug">Autonomous AI agents for QA, monitoring and audits</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="leading-snug">Full source-code ownership, transparent architecture</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         4. CORE SERVICES OVERVIEW (3D TILT CARDS)
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#080D0A] border-y border-[#1E2E25] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
              CORE SERVICES
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-6 tracking-tight">
              Enterprise Software Solutions
            </h2>
            <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
              Code with Amrendra specializes in modern full-stack web engineering, custom AI agent integrations, cloud architecture, and high-conversion digital experiences — delivered as complete AI Development Services, Web Development Services, and SaaS Development Services under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Code2,
                title: 'Full-Stack Web Engineering',
                desc: 'End-to-end Web Development Services using React, Next.js, and TypeScript — built for speed, SEO, and long-term maintainability across every device.',
                tag: 'Next.js • React • TS',
                href: '/services/web-development',
              },
              {
                icon: Bot,
                title: 'AI & Autonomous LLM Agents',
                desc: 'Custom AI Agent Development Services that automate workflows, support decision-making, and integrate large language models directly into your product — a core pillar of our AI Automation Development Services.',
                tag: 'OpenAI • LangChain • RAG',
                href: '/services/ai-automation',
              },
              {
                icon: Globe,
                title: 'UI/UX & Product Architecture',
                desc: 'From MVP to multi-tenant scale, our SaaS & Product Design Services cover user flows, interface prototyping, and high-conversion visual design.',
                tag: 'Figma • Design System • UI',
                href: '/services/ui-ux-product-design',
              },
              {
                icon: Cloud,
                title: 'AWS Cloud & DevOps Automation',
                desc: 'Fully managed Cloud Software Development Services — CI/CD pipelines, infrastructure-as-code, container orchestration, and 24/7 monitoring on AWS.',
                tag: 'AWS • Docker • Terraform',
                href: '/services/cloud-devops',
              },
              {
                icon: Layers,
                title: 'SEO & Growth Strategy',
                desc: 'Technical SEO audits, data-driven content strategy, structured schema markup, and organic search optimization to scale search visibility.',
                tag: 'SEO • Content • Growth',
                href: '/services/seo-content-strategy',
              },
              {
                icon: Zap,
                title: 'Digital Marketing & Conversion',
                desc: 'Comprehensive digital marketing strategies covering paid media, search acquisition, and conversion rate optimization (CRO).',
                tag: 'Growth • PPC • CRO',
                href: '/services/digital-marketing',
              },
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <ScrollReveal key={index} delay={index * 0.08} variant="fade-up">
                  <TiltCard
                    className="group relative rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] p-8 transition-all duration-300 hover:border-[#10B981]/60 hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)] flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-[#111C16] border border-[#10B981]/30 text-[#10B981] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#10B981] group-hover:text-white transition-all duration-300 shadow-sm">
                        <Icon size={26} />
                      </div>
                      <span className="text-[10px] font-mono text-[#34D399] uppercase tracking-wider block mb-2">
                        {service.tag}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#10B981] transition-colors">
                        <Link href={service.href}>
                          {service.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-[#9CA3AF] leading-relaxed mb-6">
                        {service.desc}
                      </p>
                    </div>
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#10B981] group-hover:translate-x-1 transition-transform"
                    >
                      <span>Learn More</span>
                      <ChevronRight size={14} />
                    </Link>
                  </TiltCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         5. INTERACTIVE LIVE PRODUCT / WORKFLOW SHOWCASE
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 max-w-7xl mx-auto content-visibility-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
            INTERACTIVE PRODUCT PREVIEW
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-6 tracking-tight">
            See Our Engineering Pipeline in Action
          </h2>
          <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
            Test-drive Code with Amrendra's interactive autonomous engineering console below to see how we monitor performance, test AI workflows, and automate deployments in real time.
          </p>
        </div>

        <DevShowcase />
      </section>

      {/* ═══════════════════════════════════════════════════════════
         6. INTERACTIVE TECHNOLOGY ECOSYSTEM GRAPH
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#080D0A] border-y border-[#1E2E25] content-visibility-auto">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
              ENGINEERING ECOSYSTEM
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-6 tracking-tight">
              Connected Engineering Architecture
            </h2>
            <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
              Code with Amrendra's central engineering core unifies frameworks, serverless infrastructure, AI models, and databases into a seamless ecosystem — the technical backbone behind every AI Development Services and Cloud Software Development Services engagement.
            </p>
          </div>

          <TechEcosystem3D />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         7. DEVELOPMENT PROCESS TIMELINE
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 max-w-7xl mx-auto content-visibility-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
            HOW WE EXECUTE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-6 tracking-tight">
            Our 4-Step Engineering Process
          </h2>
          <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
            From architecture blueprint to production launch, Code with Amrendra maintains complete transparency and continuous weekly sprint deliverables.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Discovery & Architecture',
              desc: 'We map business goals into a technical architecture blueprint before a single line of code is written.',
            },
            {
              step: '02',
              title: 'High-Velocity Sprints',
              desc: 'Agile development cycles with weekly demos, keeping your custom software development project moving fast without sacrificing quality.',
            },
            {
              step: '03',
              title: 'Autonomous QA & Audit',
              desc: 'AI-assisted testing agents catch regressions early, backed by manual senior engineering review.',
            },
            {
              step: '04',
              title: 'Cloud Deployment & SLA',
              desc: 'Production deployment on AWS with monitoring, uptime SLAs, and ongoing performance support.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] p-6 hover:border-[#10B981]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-extrabold font-mono text-[#10B981] block mb-4">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         8. FEATURED CASE STUDIES & WORK SHOWCASE
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#080D0A] border-y border-[#1E2E25] content-visibility-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
                SELECTED WORK
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
                Case Studies &amp; Proven Results
              </h2>
              <p className="text-xs sm:text-sm text-[#9CA3AF] mt-2">
                Real Projects, Real Impact — find out how Code with Amrendra's design decisions, architecture, and reasonable automation created measurable business outcomes.
              </p>
            </div>
            <Link
              href="/case-studies"
              className="mt-4 md:mt-0 flex-shrink-0 inline-flex items-center gap-2 text-xs font-bold text-[#10B981] hover:underline"
            >
              <span>View All Case Studies</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <CaseStudiesSection caseStudies={caseStudies} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         9. FEATURE COMPARISON MATRIX ("STACKS UP")
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 max-w-7xl mx-auto content-visibility-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
            DIRECT COMPARISON
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-6 tracking-tight">
            How Our Engineering Stacks Up
          </h2>
          <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
            Compare Code with Amrendra's enterprise standards against traditional development agencies and off-the-shelf templates.
          </p>
        </div>

        <ComparisonTable />
      </section>

      {/* ═══════════════════════════════════════════════════════════
         10. ENGAGEMENT MODELS & PRICING
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#080D0A] border-y border-[#1E2E25] content-visibility-auto">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
              PRICING, MADE SIMPLE
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-6 tracking-tight">
              Straightforward Pricing for Every Stage of Growth
            </h2>
            <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
              Whether you need a focused build or an ongoing engineering partner, choose a plan that fits — no hidden fees, no long-term lock-in.
            </p>
          </div>

          <PricingSection />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         11. FINAL HIGH-IMPACT CTA BANNER
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#111C16] via-[#0A0F0C] to-[#060907] border-2 border-[#10B981] p-10 sm:p-16 text-center shadow-[0_0_60px_rgba(16,185,129,0.25)] overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#34D399] bg-[#10B981]/20 px-4 py-1.5 rounded-full border border-[#10B981]/40 mb-6 inline-block">
            READY TO SCALE
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight max-w-3xl mx-auto">
            Your Site &amp; SaaS Is Running Right Now. <br />
            <span className="text-[#10B981]">Is It Performing at Its Peak?</span>
          </h2>

          <p className="text-base sm:text-lg text-[#9CA3AF] max-w-xl mx-auto mb-10 leading-relaxed">
            Partner with Code with Amrendra to engineer high-velocity web platforms, automate workflows with AI, and unlock cloud performance across your entire stack.
          </p>

          <MagneticButton>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-extrabold text-base transition-all duration-300 shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_rgba(16,185,129,0.7)] active:scale-95"
            >
              <span>Get Started Today</span>
              <ArrowRight size={20} />
            </Link>
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
