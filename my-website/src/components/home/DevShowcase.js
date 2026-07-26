'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, ShieldCheck, Activity, Play, CheckCircle2, Copy, Sparkles, Layers, Server } from 'lucide-react';

export default function DevShowcase() {
  const [activeTab, setActiveTab] = useState('agentic-qa');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionOutput, setExecutionOutput] = useState([
    '[INIT] Connecting to Code with Amrendra Cloud Infrastructure...',
    '[CHECK] Validating AI Agent pipeline architecture...',
    '[READY] All 14 microservices active (Region: ap-south-1).',
  ]);

  const handleRunDemo = () => {
    setIsExecuting(true);
    setExecutionOutput((prev) => [...prev, '[EXEC] Launching autonomous QA & performance audit...']);
    
    setTimeout(() => {
      setExecutionOutput((prev) => [
        ...prev,
        '[TEST] Executing 1,420 synthetic user flows...',
        '[PERF] Core Web Vitals: LCP 0.8s, FID 4ms, CLS 0.00.',
        '[SECURITY] Zero vulnerabilities detected (ISO 27001 compliant).',
        '[SUCCESS] System deployed to production with zero downtime!',
      ]);
      setIsExecuting(false);
    }, 1200);
  };

  const tabs = [
    { id: 'agentic-qa', label: 'Agentic QA Engine', icon: Sparkles },
    { id: 'cloud-arch', label: 'AWS & Cloud Stack', icon: Server },
    { id: 'api-gateway', label: 'Enterprise API Gateway', icon: Layers },
    { id: 'telemetry', label: 'Live Telemetry', icon: Activity },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto rounded-3xl border border-[#1E2E25] bg-[#0A0F0C]/90 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden relative">
      {/* Top Header / Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E2E25] bg-[#080D0A]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono text-[#9CA3AF] ml-2 flex items-center gap-1.5">
            <Terminal size={14} className="text-[#10B981]" />
            codewithamrendra://workflow/engine.v2
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={handleRunDemo}
          disabled={isExecuting}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10B981]/15 hover:bg-[#10B981]/25 text-[#10B981] border border-[#10B981]/40 text-xs font-bold transition-all duration-300 active:scale-95 cursor-pointer disabled:opacity-50"
        >
          <Play size={12} className={isExecuting ? 'animate-spin' : ''} />
          {isExecuting ? 'Running Pipeline...' : 'Run Live Demo'}
        </button>
      </div>

      {/* Tab Selectors */}
      <div className="flex border-b border-[#1E2E25] bg-[#0A0F0C] overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 border-b-2 ${
                isActive
                  ? 'border-[#10B981] text-[#10B981] bg-[#10B981]/5'
                  : 'border-transparent text-[#9CA3AF] hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[380px]">
        {/* Left Console / Code Pane */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl bg-[#060907] border border-[#1E2E25] p-5 font-mono text-xs text-[#F3F4F6]">
          <div className="space-y-3 overflow-y-auto max-h-[260px] pr-2 custom-scrollbar">
            <div className="text-[#9CA3AF] flex items-center justify-between pb-2 border-b border-[#1E2E25]">
              <span>// Autonomous Engineering Execution Engine</span>
              <span className="text-[10px] text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full border border-[#10B981]/20">
                ACTIVE STATE
              </span>
            </div>

            {activeTab === 'agentic-qa' && (
              <div className="space-y-2">
                <p className="text-[#34D399]">$ codewithamrendra test --mode=agentic --coverage=100</p>
                <p className="text-gray-400">⚡ Initializing LLM-driven browser simulation subagents...</p>
                <p className="text-gray-400">✔ Passed 48 API endpoint security validation sweeps.</p>
                <p className="text-gray-400">✔ Simulated 10,000 concurrent user sessions seamlessly.</p>
              </div>
            )}

            {activeTab === 'cloud-arch' && (
              <div className="space-y-2">
                <p className="text-[#34D399]">$ terraform apply --auto-approve (AWS ECS + CloudFront)</p>
                <p className="text-gray-400">⚡ Provisioning Serverless Aurora PostgreSQL Cluster...</p>
                <p className="text-gray-400">✔ Redis Elasticache cluster running (Ping: 1.2ms).</p>
                <p className="text-gray-400">✔ SSL Certificates and Route53 DNS propagation active.</p>
              </div>
            )}

            {activeTab === 'api-gateway' && (
              <div className="space-y-2">
                <p className="text-[#34D399]">GET /api/v2/analytics/stream - 200 OK (14ms)</p>
                <p className="text-gray-400">Headers: x-ratelimit-remaining: 99999, content-type: application/json</p>
                <p className="text-gray-400">&#123; "status": "success", "throughput": "1.2M req/sec" &#125;</p>
              </div>
            )}

            {activeTab === 'telemetry' && (
              <div className="space-y-2">
                <p className="text-[#34D399]">▶ Monitoring Real-Time Health & CPU Consumption</p>
                <p className="text-gray-400">Uptime: 99.999% | Average Response Time: 18ms</p>
                <p className="text-gray-400">Edge Cache Hit Ratio: 98.4% (CloudFront Distribution)</p>
              </div>
            )}

            {/* Dynamic Output */}
            {executionOutput.map((log, idx) => (
              <p key={idx} className="text-[#10B981] animate-fade-in">
                {log}
              </p>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-[#1E2E25] flex items-center justify-between text-[11px] text-[#9CA3AF]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              Engine Online
            </span>
            <span>Framework: Next.js 16 • React 19 • Tailwind v4</span>
          </div>
        </div>

        {/* Right Metric Cards Pane */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="rounded-2xl bg-gradient-to-br from-[#0D1410] to-[#0A0F0C] border border-[#1E2E25] p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                Engineering Velocity
              </span>
              <Cpu size={16} className="text-[#10B981]" />
            </div>
            <div className="text-3xl font-extrabold text-white tracking-tight mb-1">
              10x <span className="text-sm font-normal text-[#10B981]">Faster Delivery</span>
            </div>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              We leverage AI-assisted engineering and reusable micro-component architecture to ship enterprise software in weeks, not months.
            </p>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[#0D1410] to-[#0A0F0C] border border-[#1E2E25] p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                Lighthouse Score
              </span>
              <ShieldCheck size={16} className="text-[#34D399]" />
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { label: 'PERF', score: '99' },
                { label: 'A11Y', score: '100' },
                { label: 'BP', score: '100' },
                { label: 'SEO', score: '100' },
              ].map((item, idx) => (
                <div key={idx} className="rounded-xl bg-[#060907] border border-[#1E2E25] py-2">
                  <div className="text-base font-bold text-[#10B981]">{item.score}</div>
                  <div className="text-[9px] font-mono text-[#9CA3AF]">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
