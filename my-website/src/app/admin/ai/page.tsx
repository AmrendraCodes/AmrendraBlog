'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Sliders,
  DollarSign,
  Cpu,
  BarChart2,
  Key,
} from 'lucide-react';

export default function AdminAISettingsPage() {
  const [defaultProvider, setDefaultProvider] = useState('openai');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [saved, setSaved] = useState(false);

  const providers = [
    { name: 'OpenAI', model: 'gpt-4o / GPT-5', status: 'ACTIVE', keyEnv: 'OPENAI_API_KEY', color: 'text-emerald-400' },
    { name: 'Anthropic Claude', model: 'claude-3-5-sonnet', status: 'ACTIVE', keyEnv: 'ANTHROPIC_API_KEY', color: 'text-amber-400' },
    { name: 'Google Gemini', model: 'gemini-2.0-flash', status: 'ACTIVE', keyEnv: 'GEMINI_API_KEY', color: 'text-blue-400' },
    { name: 'DeepSeek', model: 'deepseek-r1', status: 'ACTIVE', keyEnv: 'DEEPSEEK_API_KEY', color: 'text-purple-400' },
    { name: 'xAI Grok', model: 'grok-2', status: 'ACTIVE', keyEnv: 'XAI_API_KEY', color: 'text-[#34D399]' },
    { name: 'Ollama (Local AI)', model: 'llama3', status: 'ACTIVE', keyEnv: 'OLLAMA_BASE_URL', color: 'text-teal-400' },
    { name: 'OpenRouter', model: 'auto', status: 'ACTIVE', keyEnv: 'OPENROUTER_API_KEY', color: 'text-[#10B981]' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Sparkles className="text-[#10B981]" /> AI Multi-Model Studio
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Manage AI provider adapters, token consumption, prompts, and default models.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold text-xs shadow-lg hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all"
        >
          Save Configuration
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          ✓ AI Engine settings updated successfully!
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] p-6">
          <div className="text-xs font-mono font-bold uppercase text-[#9CA3AF] mb-2">Supported AI Providers</div>
          <div className="text-3xl font-extrabold text-white">7 Active</div>
          <span className="text-[11px] text-[#34D399]">OpenAI, Claude, Gemini, DeepSeek + 3 more</span>
        </div>

        <div className="rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] p-6">
          <div className="text-xs font-mono font-bold uppercase text-[#9CA3AF] mb-2">Total Tokens Used</div>
          <div className="text-3xl font-extrabold text-[#10B981]">148.5K</div>
          <span className="text-[11px] text-[#9CA3AF]">This Month</span>
        </div>

        <div className="rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] p-6">
          <div className="text-xs font-mono font-bold uppercase text-[#9CA3AF] mb-2">Average Response Latency</div>
          <div className="text-3xl font-extrabold text-amber-400">320ms</div>
          <span className="text-[11px] text-emerald-400">High Speed SSE Stream</span>
        </div>

        <div className="rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] p-6">
          <div className="text-xs font-mono font-bold uppercase text-[#9CA3AF] mb-2">Estimated API Cost</div>
          <div className="text-3xl font-extrabold text-[#34D399]">$1.42</div>
          <span className="text-[11px] text-[#9CA3AF]">Optimized Caching Active</span>
        </div>
      </div>

      {/* Grid Layout: Provider Status Table & Config Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Providers Status */}
        <div className="lg:col-span-2 rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] p-6 space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase text-[#10B981] flex items-center gap-2">
            <Cpu size={16} /> Configured AI Adapters
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1E2E25] text-[11px] font-mono text-[#9CA3AF] uppercase">
                  <th className="py-3 px-4">Provider</th>
                  <th className="py-3 px-4">Default Model</th>
                  <th className="py-3 px-4">Env Variable</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2E25]">
                {providers.map((p, idx) => (
                  <tr key={idx} className="hover:bg-[#111C16]/50 transition-colors">
                    <td className={`py-3.5 px-4 font-bold text-xs ${p.color}`}>{p.name}</td>
                    <td className="py-3.5 px-4 text-xs font-mono text-white">{p.model}</td>
                    <td className="py-3.5 px-4 text-xs font-mono text-[#9CA3AF]">{p.keyEnv}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                        <CheckCircle2 size={12} /> {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Model Hyperparameters */}
        <div className="rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] p-6 space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase text-[#10B981] flex items-center gap-2">
            <Sliders size={16} /> Hyperparameters
          </h2>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-white mb-2">Default Provider Engine</label>
              <select
                value={defaultProvider}
                onChange={(e) => setDefaultProvider(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white focus:outline-none focus:border-[#10B981]"
              >
                <option value="openai">OpenAI (GPT-4o)</option>
                <option value="claude">Anthropic Claude 3.5</option>
                <option value="gemini">Google Gemini 2.0</option>
                <option value="deepseek">DeepSeek R1</option>
                <option value="grok">xAI Grok-2</option>
                <option value="ollama">Ollama Local</option>
                <option value="openrouter">OpenRouter Unified</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-white mb-2">
                <span>Temperature</span>
                <span className="font-mono text-[#10B981]">{temperature}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-[#10B981]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-2">Max Output Tokens</label>
              <input
                type="number"
                value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                className="w-full px-3 py-2.5 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white focus:outline-none focus:border-[#10B981]"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
