'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Code2,
  Cpu,
  Server,
  Database,
  Cloud,
  ShieldCheck,
  Zap,
  Layers,
  Globe,
  TerminalSquare,
  CheckCircle2,
  ChevronRight,
  Star,
  Lock,
  BarChart3,
  Building2,
  Stethoscope,
  ShoppingCart,
  Bot,
  HelpCircle,
} from 'lucide-react';

import dynamic from 'next/dynamic';
import CaseStudiesSection from './CaseStudiesSection';
import HeroSection from './hero/HeroSection';
import ScrollReveal from './ui/ScrollReveal';
import TiltCard from './ui/TiltCard';
import MagneticButton from './ui/MagneticButton';

// Dynamic Heavy Components for Performance
const DevShowcase = dynamic(() => import('@/components/home/DevShowcase'), { ssr: false });
const TechEcosystem3D = dynamic(() => import('@/components/home/TechEcosystem3D'), { ssr: false });
const ComparisonTable = dynamic(() => import('@/components/home/ComparisonTable'), { ssr: false });
const PricingSection = dynamic(() => import('@/components/home/PricingSection'), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export default function HomeClient({ featuredPosts, caseStudies }) {
  return (
    <div className="relative min-h-screen bg-[#060907] text-[#F3F4F6] overflow-x-hidden">
      {/* ═══════════════════════════════════════════════════════════
         1. FULL 3D INTERACTIVE HERO SECTION
         ═══════════════════════════════════════════════════════════ */}
      <HeroSection />

      {/* ═══════════════════════════════════════════════════════════
         2. CLIENT & SERVICES TICKER MARQUEE
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-6 border-b border-[#1E2E25] bg-[#0A0F0C] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-3 text-center">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#9CA3AF]">
            Our Core Services &amp; Digital Solutions
          </span>
        </div>
        <div className="relative w-full overflow-hidden flex items-center">
          <div 
            className="flex gap-12 whitespace-nowrap min-w-max hover:[animation-play-state:paused]"
            style={{ animation: 'ticker-scroll-reverse 25s linear infinite' }}
          >
            {[
              'Web Development',
              'Digital Marketing',
              'UI/UX & Product Design',
              'SEO & Content Strategy',
              'AI & Automation',
              'Cloud & DevOps',
              'Custom Software Development',
              'E-Commerce Solutions',
              'Brand Strategy & Growth',
              'Performance Marketing',
            ].concat([
              'Web Development',
              'Digital Marketing',
              'UI/UX & Product Design',
              'SEO & Content Strategy',
              'AI & Automation',
              'Cloud & DevOps',
              'Custom Software Development',
              'E-Commerce Solutions',
              'Brand Strategy & Growth',
              'Performance Marketing',
            ]).concat([
              'Web Development',
              'Digital Marketing',
              'UI/UX & Product Design',
              'SEO & Content Strategy',
              'AI & Automation',
              'Cloud & DevOps',
              'Custom Software Development',
              'E-Commerce Solutions',
              'Brand Strategy & Growth',
              'Performance Marketing',
            ]).map((service, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 text-sm font-mono font-semibold text-[#9CA3AF] hover:text-[#10B981] transition-colors cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                {service}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         3. PROBLEM STATEMENT & VALUE PROPOSITION
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
            The Engineering Advantage
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-6 tracking-tight">
            Stop Settling for Bloated Legacy Software
          </h2>
          <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
            Traditional software development is plagued by slow release cycles, technical debt, and fragile architectures. We build sleek, AI-native platforms engineered for performance and scalability.
          </p>
        </div>

        {/* Bento Grid Split: Legacy vs Code with Amrendra */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Legacy Side */}
          <div className="group rounded-3xl bg-[#0A0F0C] border border-red-500/30 hover:border-red-500 p-8 shadow-xl hover:shadow-[0_0_35px_rgba(239,68,68,0.3)] relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 cursor-pointer">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 group-hover:bg-red-500/20 group-hover:text-red-300 group-hover:scale-105 flex items-center justify-center font-bold text-lg transition-all duration-300">
                ✕
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-red-100 transition-colors">Traditional Development Agencies</h3>
                <p className="text-xs text-[#9CA3AF]">Slow, expensive, &amp; maintenance-heavy</p>
              </div>
            </div>
            <ul className="space-y-4 text-xs text-[#9CA3AF]">
              <li className="flex items-center gap-3">
                <span className="text-red-400 font-bold group-hover:scale-125 transition-transform">✕</span> 6–12 month lengthy delivery timelines
              </li>
              <li className="flex items-center gap-3">
                <span className="text-red-400 font-bold group-hover:scale-125 transition-transform">✕</span> High latency &amp; poor Core Web Vitals
              </li>
              <li className="flex items-center gap-3">
                <span className="text-red-400 font-bold group-hover:scale-125 transition-transform">✕</span> Messy spaghetti code &amp; technical debt
              </li>
              <li className="flex items-center gap-3">
                <span className="text-red-400 font-bold group-hover:scale-125 transition-transform">✕</span> Manual testing with frequent production bugs
              </li>
            </ul>
          </div>

          {/* Code with Amrendra Side */}
          <div className="group rounded-3xl bg-gradient-to-br from-[#111C16] to-[#0A0F0C] border-2 border-[#10B981]/60 hover:border-[#10B981] p-8 shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:shadow-[0_0_55px_rgba(16,185,129,0.45)] relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 cursor-pointer">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#10B981] text-white group-hover:bg-[#059669] group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.6)] flex items-center justify-center font-bold text-lg transition-all duration-300">
                ✓
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">Code with Amrendra</h3>
                <p className="text-xs text-[#34D399]">High-velocity, AI-native &amp; sub-second fast</p>
              </div>
            </div>
            <ul className="space-y-4 text-xs text-[#F3F4F6]">
              <li className="flex items-center gap-3">
                <span className="text-[#10B981] font-bold group-hover:scale-125 transition-transform">✓</span> Bi-weekly rapid sprint deployments
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#10B981] font-bold group-hover:scale-125 transition-transform">✓</span> Sub-second loading speed (99+ Lighthouse)
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#10B981] font-bold group-hover:scale-125 transition-transform">✓</span> Type-safe, modular React 19 / TypeScript architecture
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#10B981] font-bold group-hover:scale-125 transition-transform">✓</span> Autonomous AI agent QA &amp; 100% test coverage
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
              Core Expertise
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-6 tracking-tight">
              Enterprise Software Solutions
            </h2>
            <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
              We specialize in modern full-stack web engineering, custom AI agent integrations, cloud architecture, and high-conversion digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Code2,
                title: 'Full-Stack Web Engineering',
                desc: 'Custom React 19 & Next.js 16 web applications engineered for extreme speed, SEO, and flawless responsiveness.',
                tag: 'Next.js • React • TS',
              },
              {
                icon: Sparkles,
                title: 'AI & Autonomous LLM Agents',
                desc: 'Integrate intelligent AI workflows, custom RAG pipelines, and automated agentic decision systems into your product.',
                tag: 'OpenAI • LangChain • RAG',
              },
              {
                icon: Globe,
                title: 'SaaS Product Architecture',
                desc: 'End-to-end SaaS engineering including multi-tenant databases, subscription billing (Stripe), and auth infrastructure.',
                tag: 'SaaS • Stripe • Auth0',
              },
              {
                icon: Cloud,
                title: 'AWS Cloud & DevOps Automation',
                desc: 'Serverless ECS, Lambda, Docker containers, and CI/CD pipelines configured for auto-scaling and security.',
                tag: 'AWS • Docker • Terraform',
              },
              {
                icon: Layers,
                title: 'API Engineering & Integration',
                desc: 'High-throughput REST and GraphQL APIs connecting complex third-party tools, databases, and microservices.',
                tag: 'REST • GraphQL • Node',
              },
              {
                icon: Zap,
                title: 'Performance Audit & Optimization',
                desc: 'Transform slow, legacy codebases into lightning-fast platforms with Core Web Vitals optimization.',
                tag: '99+ Lighthouse Guarantee',
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
                        {service.title}
                      </h3>
                      <p className="text-xs text-[#9CA3AF] leading-relaxed mb-6">
                        {service.desc}
                      </p>
                    </div>
                    <Link
                      href="/services"
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
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
            Interactive Product Preview
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-6 tracking-tight">
            See Our Engineering Pipeline in Action
          </h2>
          <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
            Test drive our interactive autonomous engineering console below to explore how we monitor performance, test AI workflows, and automate deployments.
          </p>
        </div>

        <DevShowcase />
      </section>

      {/* ═══════════════════════════════════════════════════════════
         6. INTERACTIVE TECHNOLOGY ECOSYSTEM GRAPH
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#080D0A] border-y border-[#1E2E25]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
              Technology Ecosystem
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-6 tracking-tight">
              Connected Engineering Architecture
            </h2>
            <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
              Our central engineering core unifies front-end frameworks, serverless cloud infrastructure, AI models, and databases into a seamless ecosystem.
            </p>
          </div>

          <TechEcosystem3D />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
         7. DEVELOPMENT PROCESS TIMELINE
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
            How We Execute
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-6 tracking-tight">
            Our 4-Step Engineering Process
          </h2>
          <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
            From architecture blueprinting to production launch, we maintain complete transparency and continuous bi-weekly sprint deliverables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Discovery & Architecture',
              desc: 'We analyze your requirements, define database schemas, and blueprint a high-performance system architecture.',
            },
            {
              step: '02',
              title: 'High-Velocity Sprints',
              desc: 'Our engineers build your product in rapid 2-week iterations with continuous staging previews.',
            },
            {
              step: '03',
              title: 'Autonomous QA & Audit',
              desc: 'Rigorous automated testing for security, accessibility, Core Web Vitals, and cross-browser stability.',
            },
            {
              step: '04',
              title: 'Cloud Deployment & SLA',
              desc: 'Zero-downtime deployment to AWS/Vercel edge infrastructure with 24/7 SLA monitoring.',
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
      <section className="py-24 px-6 bg-[#080D0A] border-y border-[#1E2E25]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
                Selected Work
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
                Case Studies &amp; Proven Results
              </h2>
            </div>
            <Link
              href="/case-studies"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold text-[#10B981] hover:underline"
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
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
            Direct Comparison
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-6 tracking-tight">
            How Our Engineering Stacks Up
          </h2>
          <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
            Compare our enterprise standards against traditional development agencies and off-the-shelf templates.
          </p>
        </div>

        <ComparisonTable />
      </section>

      {/* ═══════════════════════════════════════════════════════════
         10. ENGAGEMENT MODELS & PRICING
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#080D0A] border-y border-[#1E2E25]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
              Flexible Engagement
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-6 tracking-tight">
              Transparent Project &amp; Retainer Plans
            </h2>
            <p className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
              Choose between rapid fixed-scope sprint projects or dedicated monthly engineering retainers.
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
            Ready to Build?
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight max-w-3xl mx-auto">
            Your Site &amp; SaaS Is Running Right Now. <br />
            <span className="text-[#10B981]">Is It Performing At Its Peak?</span>
          </h2>

          <p className="text-base sm:text-lg text-[#9CA3AF] max-w-xl mx-auto mb-10 leading-relaxed">
            Partner with Code with Amrendra to engineer high-velocity web platforms, AI workflows, and cloud architectures.
          </p>

          <MagneticButton>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-extrabold text-base transition-all duration-300 shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_rgba(16,185,129,0.7)] active:scale-95"
            >
              <span>Get started today</span>
              <ArrowRight size={20} />
            </Link>
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
