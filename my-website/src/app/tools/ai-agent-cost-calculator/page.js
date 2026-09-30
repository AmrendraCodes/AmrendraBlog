import React from 'react';
import Link from 'next/link';
import { ChevronRight, Bot, Sparkles, ShieldCheck, ArrowRight, Layers, Cpu, Zap, Activity } from 'lucide-react';
import { siteMetadata } from '@/config/seo';
import { getBreadcrumbSchema, getFAQSchema, getWebApplicationSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import AiAgentCostCalculatorClient from '@/components/tools/ai-agent-cost-calculator/AiAgentCostCalculatorClient';
import CalculatorFaq from '@/components/tools/ai-agent-cost-calculator/CalculatorFaq';
import { CALCULATOR_FAQS } from '@/data/calculatorFaqData';
import CalculatorCta from '@/components/tools/ai-agent-cost-calculator/CalculatorCta';

export const metadata = {
  title: 'AI Agent Cost Calculator – Estimate LLM & Agent Costs | Code with Amrendra',
  description:
    'Calculate the estimated cost of running autonomous AI agents based on model pricing, multi-call loops, token usage, tool APIs, and cloud infrastructure.',
  alternates: {
    canonical: `${siteMetadata.siteUrl}/tools/ai-agent-cost-calculator`,
  },
  openGraph: {
    title: 'AI Agent Cost Calculator – Estimate LLM & Agent Costs | Code with Amrendra',
    description:
      'Calculate the estimated cost of running autonomous AI agents based on model pricing, multi-call loops, token usage, tool APIs, and cloud infrastructure.',
    url: `${siteMetadata.siteUrl}/tools/ai-agent-cost-calculator`,
    type: 'website',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'AI Agent Cost Calculator — Code with Amrendra',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Agent Cost Calculator – Estimate LLM & Agent Costs | Code with Amrendra',
    description:
      'Calculate the estimated cost of running autonomous AI agents based on model pricing, multi-call loops, token usage, tool APIs, and cloud infrastructure.',
    images: ['/images/og-default.png'],
  },
};

export default function AiAgentCostCalculatorPage() {
  const pageUrl = `${siteMetadata.siteUrl}/tools/ai-agent-cost-calculator`;

  // 1. Breadcrumbs Schema
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: siteMetadata.siteUrl },
    { name: 'Tools', url: `${siteMetadata.siteUrl}/tools` },
    { name: 'AI Agent Cost Calculator', url: pageUrl },
  ]);

  // 2. WebApplication Schema
  const webAppSchema = getWebApplicationSchema({
    name: 'AI Agent Cost Calculator',
    description:
      'Calculate estimated monthly and annual costs for autonomous AI agents and LLM API calls based on token usage, model pricing, multi-call loops, tool APIs, and infrastructure overhead.',
    url: pageUrl,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    price: '0',
    priceCurrency: 'USD',
  });

  // 3. FAQPage Schema
  const faqSchema = getFAQSchema(CALCULATOR_FAQS);

  return (
    <div className="min-h-screen bg-[#060E1A] text-slate-200 overflow-x-hidden">
      {/* ─── Structured Data (JSON-LD) ─── */}
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webAppSchema} />
      <JsonLd data={faqSchema} />

      {/* ─── Page Top Ambient Lighting ─── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(245,158,11,0.08),transparent_70%)] blur-3xl pointer-events-none" />

      {/* ─── Hero Section ─── */}
      <section className="relative pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-mono text-slate-400 mb-6">
          <Link href="/" className="hover:text-[#F59E0B] transition-colors no-underline">
            Home
          </Link>
          <ChevronRight size={13} className="text-slate-500 shrink-0" />
          <Link href="/tools" className="hover:text-[#F59E0B] transition-colors no-underline">
            Tools
          </Link>
          <ChevronRight size={13} className="text-slate-500 shrink-0" />
          <span className="text-[#F59E0B] font-bold truncate max-w-[200px] sm:max-w-none">
            AI Agent Cost Calculator
          </span>
        </nav>

        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 text-xs font-mono font-bold uppercase tracking-widest text-[#F59E0B] mb-4 sm:mb-5 shadow-xs">
          <Bot size={14} className="text-[#F59E0B] shrink-0" />
          <span>PRODUCTION BUDGET ESTIMATOR</span>
        </div>

        {/* Main H1 Title with Fluid Balance */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.18] mb-4 sm:mb-5 text-white max-w-4xl">
          AI Agent Cost Calculator –{' '}
          <span className="bg-gradient-to-r from-white via-slate-100 to-[#F59E0B] text-transparent bg-clip-text">
            Estimate LLM &amp; Agent Costs
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed font-normal">
          Forecast the real operational expense of autonomous AI agents. Account for multiple model calls per run, prompt caching discounts, third-party tool APIs, vector databases, and retry buffers.
        </p>
      </section>

      {/* ─── Interactive Calculator Workspace ─── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20 max-w-6xl mx-auto min-w-0">
        <AiAgentCostCalculatorClient />
      </section>

      {/* ─── In-Depth Supporting Editorial Guide (SEO & Engineering Deep Dive) ─── */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-[#1E293B] bg-[#071324]/40">
        <div className="max-w-3xl mx-auto space-y-16 sm:space-y-20">
          
          {/* Section 1: What is an AI Agent Cost Calculator? */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-mono font-bold uppercase tracking-wider">
              <span>FOUNDATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              What Is an AI Agent Cost Calculator?
            </h2>
            <div className="text-slate-300 text-base leading-relaxed space-y-4 font-normal">
              <p>
                An <strong className="text-white">AI Agent Cost Calculator</strong> is an engineering forecasting tool designed to estimate the true total cost of ownership (TCO) of running autonomous AI agent pipelines. Unlike traditional chatbots that consume a single prompt and produce one answer, an autonomous agent operates across cyclical loops—decomposing goals, formulating search queries, executing external API tools, observing returned data, and synthesizing final answers.
              </p>
              <p>
                Because an agent may make between <strong className="text-white">3 to 10 separate model calls</strong> per user interaction, standard per-token pricing tables can drastically understate true operational costs by a factor of 5× to 10×. This calculator models the full architecture: model inference tokens, prompt caching efficiency, third-party tool calls, cloud compute, vector indexing, and real-world failure retry buffers.
              </p>
            </div>
          </div>

          {/* Section 2: How AI Agent Costs Are Calculated */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-[#F59E0B] border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-wider">
              <span>CALCULATION LOGIC</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              How AI Agent Costs Are Calculated
            </h2>
            <div className="text-slate-300 text-base leading-relaxed space-y-4 font-normal">
              <p>
                Autonomous agents operate in a dynamic execution loop: <em className="text-white">Plan → Act → Observe → Reflect → Answer</em>. To calculate your budget accurately, the system computes the sum of four discrete layers:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-[#0B1F3A] border border-[#1E293B] shadow-sm hover:border-slate-700 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-[#F59E0B] border border-amber-500/20 flex items-center justify-center font-bold text-sm mb-3">
                    1
                  </div>
                  <h4 className="text-base font-bold text-white mb-1.5">
                    Multi-Call Model Volume
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Monthly agent runs multiplied by average model calls per run and the number of swarm agents.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0B1F3A] border border-[#1E293B] shadow-sm hover:border-slate-700 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold text-sm mb-3">
                    2
                  </div>
                  <h4 className="text-base font-bold text-white mb-1.5">
                    Input &amp; Output Tokens
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Uncached vs. cached input pricing applied to token volumes, plus output generation token fees.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0B1F3A] border border-[#1E293B] shadow-sm hover:border-slate-700 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-sm mb-3">
                    3
                  </div>
                  <h4 className="text-base font-bold text-white mb-1.5">
                    Tool &amp; Search API Invocations
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    External API fees (web search, data scrapers, CRM lookups, code sandboxes) invoked per run.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0B1F3A] border border-[#1E293B] shadow-sm hover:border-slate-700 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold text-sm mb-3">
                    4
                  </div>
                  <h4 className="text-base font-bold text-white mb-1.5">
                    Infrastructure &amp; Retry Buffers
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Vector DB hosting, worker servers, plus a 5%–15% retry overhead for transient API and schema errors.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: AI Agent Cost Formula & Worked Example */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold uppercase tracking-wider">
              <span>MATHEMATICAL FORMULA</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Agent Cost Formula &amp; Worked Example
            </h2>
            <div className="text-slate-300 text-base leading-relaxed space-y-4 font-normal">
              <p>The mathematical formulation powering this calculator is structured as follows:</p>
              
              {/* Formula Code Block */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#071324] text-slate-200 font-mono text-xs sm:text-sm overflow-x-auto my-4 border border-[#1E293B] shadow-inner leading-relaxed">
                <code>
                  Monthly Model Calls = Runs × Calls_Per_Run × Agents<br /><br />
                  Input_Cost = (Uncached_Tokens / 1M × Input_Price) + (Cached_Tokens / 1M × Cached_Price)<br />
                  Output_Cost = (Output_Tokens / 1M) × Output_Price<br />
                  Tool_Cost = (Runs × Tools_Per_Run × Agents) × Cost_Per_Tool_Call<br /><br />
                  Variable_Cost = (Input_Cost + Output_Cost + Tool_Cost) × (1 + Retry_Overhead_%)<br />
                  Total_Monthly_Cost = Variable_Cost + Fixed_Infra_Cost (Vector_DB + Hosting)
                </code>
              </div>

              {/* Highlighted Worked Example Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0B1F3A] border border-[#F59E0B]/30 shadow-md space-y-4 my-5">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-[#F59E0B]" />
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    Real-World Calculation Walkthrough
                  </h4>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Suppose a production customer support agent executes <strong className="text-white">10,000 runs per month</strong> using <strong className="text-white">GPT-4o Mini</strong> ($0.15/1M in, $0.60/1M out, $0.075/1M cache). Each run makes <strong className="text-white">3 model calls</strong> (30,000 calls total), with <strong className="text-white">2,000 input tokens</strong> (20% cached) and <strong className="text-white">400 output tokens</strong> per call:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 pl-4 border-l-2 border-[#F59E0B]/40">
                  <li><strong className="text-white">Total Input Tokens:</strong> 30,000 calls × 2,000 tokens = 60M tokens (48M uncached + 12M cached).</li>
                  <li><strong className="text-white">Input Cost:</strong> (48 × $0.15) + (12 × $0.075) = $7.20 + $0.90 = <strong className="text-emerald-400">$8.10</strong>.</li>
                  <li><strong className="text-white">Total Output Tokens:</strong> 30,000 calls × 400 tokens = 12M tokens = 12 × $0.60 = <strong className="text-blue-400">$7.20</strong>.</li>
                  <li><strong className="text-white">Tool Calls:</strong> 2 tools per run (20,000 calls) @ $0.001 = <strong className="text-emerald-400">$20.00</strong>.</li>
                  <li><strong className="text-white">Infrastructure:</strong> Vector DB ($50) + Serverless Hosting ($20) = <strong className="text-purple-400">$70.00</strong>.</li>
                  <li><strong className="text-white">Retry Buffer (5%):</strong> 5% of ($8.10 + $7.20 + $20.00) = <strong className="text-rose-400">$1.77</strong>.</li>
                </ul>

                <div className="pt-3 border-t border-[#1E293B] flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                  <div className="font-semibold text-white">
                    Total Monthly Cost: <span className="font-mono text-base font-black text-[#F59E0B]">$107.07/mo</span>
                  </div>
                  <div className="font-semibold text-emerald-400 font-mono">
                    $0.0107 per resolved ticket
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: What Affects AI Agent Cost? */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-mono font-bold uppercase tracking-wider">
              <span>COST DRIVERS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              What Drives AI Agent Costs in Production?
            </h2>
            <div className="text-slate-300 text-base leading-relaxed space-y-4 font-normal">
              <p>In production workloads, costs are dictated by specific architectural factors:</p>
              
              <ul className="space-y-3 list-none pl-0">
                <li className="p-4 sm:p-5 rounded-2xl bg-[#0B1F3A] border border-[#1E293B] flex items-start gap-3.5 shadow-sm">
                  <Activity size={18} className="text-[#F59E0B] shrink-0 mt-1" />
                  <div>
                    <strong className="text-white block mb-1 text-sm sm:text-base">Context Window Creep:</strong>
                    <span className="text-xs sm:text-sm text-slate-400 leading-relaxed block">
                      Each sequential turn in an agent conversation retains previous steps, tool responses, and error logs. A run starting at 1,000 input tokens can expand to 15,000 tokens by step four if message history is not pruned.
                    </span>
                  </div>
                </li>
                <li className="p-4 sm:p-5 rounded-2xl bg-[#0B1F3A] border border-[#1E293B] flex items-start gap-3.5 shadow-sm">
                  <Cpu size={18} className="text-blue-400 shrink-0 mt-1" />
                  <div>
                    <strong className="text-white block mb-1 text-sm sm:text-base">Model Intelligence Overkill:</strong>
                    <span className="text-xs sm:text-sm text-slate-400 leading-relaxed block">
                      Using a flagship reasoning model (like Claude 3.5 Sonnet or OpenAI o1) for basic JSON formatting or ticket routing increases your token bill by 10× to 50× compared to routing routine tasks to lightweight models like GPT-4o Mini or Gemini 2.0 Flash.
                    </span>
                  </div>
                </li>
                <li className="p-4 sm:p-5 rounded-2xl bg-[#0B1F3A] border border-[#1E293B] flex items-start gap-3.5 shadow-sm">
                  <Layers size={18} className="text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <strong className="text-white block mb-1 text-sm sm:text-base">Unbounded Agent Loops:</strong>
                    <span className="text-xs sm:text-sm text-slate-400 leading-relaxed block">
                      Without hard recursion ceilings (`max_iterations = 6`), agents that receive vague feedback or malformed tool outputs can loop indefinitely until API rate limits cut them off.
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 5: LLM Costs vs Total Agent Costs */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-mono font-bold uppercase tracking-wider">
              <span>SYSTEM ARCHITECTURE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              LLM Token Costs vs. Total Agent Infrastructure Costs
            </h2>
            <div className="text-slate-300 text-base leading-relaxed space-y-4 font-normal">
              <p>
                Many engineering teams budget exclusively for model API tokens, only to discover at billing time that token fees accounted for less than 40% of their total cloud invoice. As detailed in our analysis on{' '}
                <Link href="/resources/blog/ai-agents-replacing-saas-seats" className="text-[#F59E0B] font-semibold underline hover:text-amber-400 transition-colors">
                  why AI agents are replacing SaaS seats in 2026
                </Link>
                , the enterprise agent stack includes vector indices (Pinecone, Qdrant), containerized execution runtimes, observability tracing, and external integration licenses.
              </p>
              <p>
                Similarly, when implementing retrieval systems, such as in a{' '}
                <Link href="/resources/blog/rag-chatbot-for-your-business-website" className="text-[#F59E0B] font-semibold underline hover:text-amber-400 transition-colors">
                  RAG chatbot architecture
                </Link>
                , ongoing vector storage, chunk re-ranking endpoints, and document synchronization pipelines represent essential, continuous fixed costs.
              </p>
            </div>
          </div>

          {/* Section 6: How to Reduce AI Agent Costs */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold uppercase tracking-wider">
              <span>OPTIMIZATION PLAYBOOK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              How to Reduce AI Agent Costs in Production
            </h2>
            <div className="text-slate-300 text-base leading-relaxed space-y-4 font-normal">
              <p>
                To maintain healthy unit economics, apply these battle-tested optimization techniques across your agent codebase:
              </p>

              <ol className="space-y-3.5 list-decimal pl-5 text-sm sm:text-base leading-relaxed">
                <li>
                  <strong className="text-white">Implement Capability-Based Model Routing:</strong> Do not use one monolithic model for all operations. Use ultra-fast, low-cost models (e.g. Gemini 2.0 Flash or GPT-4o Mini) for triage and simple JSON extraction, routing only high-ambiguity planning or complex code tasks to frontier models.
                </li>
                <li>
                  <strong className="text-white">Leverage Provider Prompt Caching:</strong> Structure your prompts with static components (system prompts, detailed tool definitions, guidelines) strictly at the beginning of the prompt. This enables Anthropic, OpenAI, and Gemini prompt caching to discount up to 90% of repeated input tokens.
                </li>
                <li>
                  <strong className="text-white">Prune Tool Descriptions:</strong> Agents loaded with 25 tools send massive JSON schemas on every single model call. Dynamically filter tools to provide only the relevant subset based on the active sub-task.
                </li>
                <li>
                  <strong className="text-white">Enforce Hard Iteration &amp; Token Limits:</strong> Always configure guardrails: a strict iteration limit (e.g., maximum 5 tool calls per run) and an execution budget ceiling to prevent infinite error loops.
                </li>
                <li>
                  <strong className="text-white">Integrate Observability &amp; Tracing:</strong> Use open telemetry tools (such as Langfuse or Helicone) to identify token anomalies, latency bottlenecks, and redundant agent loops before scaling traffic.
                </li>
              </ol>

              <p className="pt-2">
                For complete end-to-end implementation support, consult our{' '}
                <Link href="/services/ai-automation" className="text-[#F59E0B] font-semibold underline hover:text-amber-400 transition-colors">
                  AI &amp; Automation Services
                </Link>
                {' '}or review our practical engineering guides under{' '}
                <Link href="/category/ai-agents" className="text-[#F59E0B] font-semibold underline hover:text-amber-400 transition-colors">
                  AI Agent Architecture
                </Link>.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ─── FAQ Section ─── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <CalculatorFaq />
      </section>

      {/* ─── Bottom Contextual Lead Gen CTA ─── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 max-w-6xl mx-auto">
        <CalculatorCta />
      </section>
    </div>
  );
}
