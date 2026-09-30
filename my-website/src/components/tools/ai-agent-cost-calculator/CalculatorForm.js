'use client';

import React from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Sliders, 
  HelpCircle, 
  RotateCcw,
  Zap,
  Cpu,
  Layers,
  Repeat,
  Wrench,
  Database,
  Server,
  DollarSign
} from 'lucide-react';
import { AI_PROVIDERS, getModelsByProvider, SUPPORTED_CURRENCIES } from '@/data/modelPricingData';

export default function CalculatorForm({
  inputs,
  onChange,
  onReset,
  selectedModel,
  isAdvancedOpen,
  setIsAdvancedOpen,
}) {
  const currentProviderModels = getModelsByProvider(inputs.providerId);

  const handleInputChange = (field, value) => {
    onChange({ [field]: value });
  };

  const handleNumberInput = (field, value) => {
    const parsed = value === '' ? '' : Math.max(0, Number(value));
    onChange({ [field]: parsed });
  };

  const setRunPreset = (amount) => {
    onChange({ agentRunsPerMonth: amount });
  };

  return (
    <div className="bg-[#0B1F3A] rounded-3xl border border-[#1E293B] p-5 sm:p-7 shadow-xl space-y-7 transition-all duration-200">
      
      {/* ─── Header: Mode & Currency Controls ─── */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1E293B]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] shrink-0">
            <Cpu size={18} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">
              Agent Parameters
            </h2>
            <span className="text-[11px] font-mono text-[#F59E0B] uppercase tracking-wider font-semibold">
              Workload &amp; Architecture
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Currency Toggle */}
          <div className="inline-flex rounded-xl bg-[#071324] p-1 border border-[#1E293B] shadow-inner">
            {SUPPORTED_CURRENCIES.map((curr) => {
              const active = inputs.currency === curr.code;
              return (
                <button
                  key={curr.code}
                  type="button"
                  onClick={() => handleInputChange('currency', curr.code)}
                  className={`min-h-[34px] px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all duration-150 cursor-pointer border-none ${
                    active
                      ? 'bg-[#F59E0B] text-[#0B1F3A] shadow-sm'
                      : 'bg-transparent text-slate-400 hover:text-white'
                  }`}
                  aria-pressed={active}
                >
                  {curr.symbol} {curr.code}
                </button>
              );
            })}
          </div>

          {/* Reset Button */}
          <button
            type="button"
            onClick={onReset}
            title="Reset to defaults"
            className="min-h-[38px] min-w-[38px] p-2 rounded-xl text-slate-400 hover:text-white bg-[#071324] hover:bg-[#112240] border border-[#1E293B] hover:border-slate-600 transition-colors duration-150 cursor-pointer flex items-center justify-center shrink-0 focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:outline-none"
            aria-label="Reset calculator inputs"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* ─── SECTION 1: LLM Engine & Model Selection ─── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
          <Sparkles size={14} className="text-[#F59E0B]" />
          <span>1. Model &amp; Execution Engine</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Provider Dropdown */}
          <div>
            <label htmlFor="agent-provider" className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
              AI Provider
            </label>
            <div className="relative">
              <select
                id="agent-provider"
                value={inputs.providerId}
                onChange={(e) => {
                  const nextProvider = e.target.value;
                  const models = getModelsByProvider(nextProvider);
                  onChange({
                    providerId: nextProvider,
                    modelId: models[0]?.id || 'gpt-4o-mini',
                  });
                }}
                className="w-full min-h-[46px] appearance-none px-4 py-2.5 rounded-xl bg-[#071324] border border-[#1E293B] text-white text-sm font-semibold hover:border-slate-600 focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 outline-none transition-all duration-150 cursor-pointer"
              >
                {AI_PROVIDERS.map((prov) => (
                  <option key={prov.id} value={prov.id} className="bg-[#0B1F3A] text-white">
                    {prov.name} ({prov.badge})
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Model Dropdown */}
          <div>
            <label htmlFor="agent-model" className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
              Model Selection
            </label>
            <div className="relative">
              <select
                id="agent-model"
                value={inputs.modelId}
                onChange={(e) => handleInputChange('modelId', e.target.value)}
                className="w-full min-h-[46px] appearance-none px-4 py-2.5 rounded-xl bg-[#071324] border border-[#1E293B] text-white text-sm font-semibold hover:border-slate-600 focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 outline-none transition-all duration-150 cursor-pointer"
              >
                {currentProviderModels.map((m) => (
                  <option key={m.id} value={m.id} className="bg-[#0B1F3A] text-white">
                    {m.name} ({m.contextWindow})
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Model Benchmark Card / Custom Rate Inputs */}
        {inputs.providerId === 'custom' || inputs.modelId === 'custom-model' ? (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/5 border border-amber-500/30 space-y-3.5">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#F59E0B]" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F59E0B]">
                Custom Model Token Pricing (USD per 1M tokens)
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label htmlFor="custom-input-price" className="block text-xs font-semibold text-slate-300 mb-1">
                  Input Price ($/1M)
                </label>
                <input
                  id="custom-input-price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={inputs.customInputPricePerM}
                  onChange={(e) => handleNumberInput('customInputPricePerM', e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#071324] border border-[#1E293B] text-sm font-mono text-white focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="custom-output-price" className="block text-xs font-semibold text-slate-300 mb-1">
                  Output Price ($/1M)
                </label>
                <input
                  id="custom-output-price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={inputs.customOutputPricePerM}
                  onChange={(e) => handleNumberInput('customOutputPricePerM', e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#071324] border border-[#1E293B] text-sm font-mono text-white focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="custom-cached-price" className="block text-xs font-semibold text-slate-300 mb-1">
                  Cached Input ($/1M)
                </label>
                <input
                  id="custom-cached-price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={inputs.customCachedPricePerM}
                  onChange={(e) => handleNumberInput('customCachedPricePerM', e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#071324] border border-[#1E293B] text-sm font-mono text-white focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#071324] border border-[#1E293B] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="min-w-0">
              <span className="font-bold text-white">{selectedModel.name}</span>
              <span className="text-slate-400 ml-2">({selectedModel.description})</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-slate-300">
              <span className="px-2.5 py-1 rounded-lg bg-[#0B1F3A] border border-[#1E293B]">
                Input: ${selectedModel.inputPricePerM}/1M
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#0B1F3A] border border-[#1E293B]">
                Output: ${selectedModel.outputPricePerM}/1M
              </span>
              {selectedModel.cachedInputPricePerM && (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold">
                  Cache: ${selectedModel.cachedInputPricePerM}/1M
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ─── SECTION 2: Workload & Swarm Scale ─── */}
      <div className="space-y-4 pt-3 border-t border-[#1E293B]">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
          <Layers size={14} className="text-[#F59E0B]" />
          <span>2. Workload &amp; Swarm Scale</span>
        </div>

        {/* Agent Runs Per Month */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <label htmlFor="agent-runs" className="text-xs font-semibold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
              <span>Agent Runs Per Month</span>
              <span className="group relative inline-block">
                <HelpCircle size={14} className="text-slate-400 hover:text-slate-200 cursor-help transition-colors" />
                <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden w-56 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 p-2.5 text-xs font-sans group-hover:block z-30 shadow-xl leading-relaxed">
                  How many total independent tasks, conversations, or workflows your agent executes each month.
                </span>
              </span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[5000, 10000, 25000, 100000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setRunPreset(preset)}
                  className={`min-h-[30px] px-2.5 py-1 rounded-lg text-xs font-mono font-semibold border transition-all duration-150 cursor-pointer ${
                    inputs.agentRunsPerMonth === preset
                      ? 'bg-[#F59E0B] text-[#0B1F3A] border-[#F59E0B] font-bold'
                      : 'bg-[#071324] text-slate-300 border-[#1E293B] hover:border-[#F59E0B]/40 hover:text-white'
                  }`}
                >
                  {preset >= 1000 ? `${preset / 1000}k` : preset}
                </button>
              ))}
            </div>
          </div>
          <input
            id="agent-runs"
            type="number"
            min="0"
            step="100"
            value={inputs.agentRunsPerMonth}
            onChange={(e) => handleNumberInput('agentRunsPerMonth', e.target.value)}
            className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-[#071324] border border-[#1E293B] text-white text-base font-mono font-bold focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 outline-none transition-all"
            placeholder="e.g. 10000"
          />
        </div>

        {/* Model Calls Per Run & Multi-Agent Swarm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="model-calls-per-run" className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
              Model Calls Per Run
            </label>
            <input
              id="model-calls-per-run"
              type="number"
              min="1"
              max="50"
              value={inputs.callsPerRun}
              onChange={(e) => handleNumberInput('callsPerRun', e.target.value)}
              className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#071324] border border-[#1E293B] text-white text-base font-mono font-bold focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 outline-none transition-all"
            />
            <p className="text-xs text-slate-400 mt-1.5 leading-normal">
              Autonomous agents make 3–6 LLM calls per run for planning, tool routing, and synthesis.
            </p>
          </div>

          <div>
            <label htmlFor="number-of-agents" className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
              Coordinated Swarm Agents
            </label>
            <input
              id="number-of-agents"
              type="number"
              min="1"
              max="20"
              value={inputs.numberOfAgents}
              onChange={(e) => handleNumberInput('numberOfAgents', e.target.value)}
              className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#071324] border border-[#1E293B] text-white text-base font-mono font-bold focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 outline-none transition-all"
            />
            <p className="text-xs text-slate-400 mt-1.5 leading-normal">
              Multiplier if you deploy a swarm (e.g. 1 planner agent + 2 subagents).
            </p>
          </div>
        </div>

        {/* Token Counts (Input & Output per Call) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="input-tokens-per-call" className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Avg Input Tokens / Call
              </label>
              <span className="text-xs font-mono font-bold text-[#F59E0B]">
                {inputs.inputTokensPerCall} tokens
              </span>
            </div>
            <input
              id="input-tokens-per-call"
              type="number"
              min="0"
              step="100"
              value={inputs.inputTokensPerCall}
              onChange={(e) => handleNumberInput('inputTokensPerCall', e.target.value)}
              className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#071324] border border-[#1E293B] text-white text-base font-mono font-bold focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 outline-none transition-all"
            />
            <p className="text-xs text-slate-400 mt-1.5 leading-normal">
              Includes system instructions, tool schemas, memory context, and prompt.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="output-tokens-per-call" className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Avg Output Tokens / Call
              </label>
              <span className="text-xs font-mono font-bold text-[#F59E0B]">
                {inputs.outputTokensPerCall} tokens
              </span>
            </div>
            <input
              id="output-tokens-per-call"
              type="number"
              min="0"
              step="50"
              value={inputs.outputTokensPerCall}
              onChange={(e) => handleNumberInput('outputTokensPerCall', e.target.value)}
              className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#071324] border border-[#1E293B] text-white text-base font-mono font-bold focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 outline-none transition-all"
            />
            <p className="text-xs text-slate-400 mt-1.5 leading-normal">
              Generated thoughts, tool JSON arguments, and final synthesized answers.
            </p>
          </div>
        </div>
      </div>

      {/* ─── SECTION 3: Collapsible Advanced Settings ─── */}
      <div className="pt-3 border-t border-[#1E293B]">
        <button
          type="button"
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#071324] hover:bg-[#112240] border border-[#1E293B] hover:border-slate-600 flex items-center justify-between transition-all duration-150 cursor-pointer text-white focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:outline-none"
          aria-expanded={isAdvancedOpen}
          aria-controls="advanced-settings-panel"
        >
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <Sliders size={16} className="text-[#F59E0B] shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-left truncate text-white">
              Advanced Architecture &amp; Overhead
            </span>
            <span className="hidden sm:inline-flex text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/30 font-semibold shrink-0">
              Prompt Caching, Tools &amp; Retries
            </span>
          </div>
          <span className="shrink-0 text-slate-400">
            {isAdvancedOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </span>
        </button>

        {isAdvancedOpen && (
          <div id="advanced-settings-panel" className="mt-3.5 p-4 sm:p-5 rounded-2xl bg-[#071324] border border-[#1E293B] space-y-5 animate-fade-in">
            
            {/* Prompt Caching Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="cached-input-percent" className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <Layers size={14} className="text-[#F59E0B]" />
                  <span>Cached Input Percentage:</span>
                  <span className="font-mono font-bold text-[#F59E0B]">{inputs.cachedInputPercentage}%</span>
                </label>
                <span className="text-xs text-slate-400">
                  {selectedModel.cachedInputPricePerM ? 'Cache discount enabled' : 'Standard model rate applied'}
                </span>
              </div>
              <input
                id="cached-input-percent"
                type="range"
                min="0"
                max="100"
                step="5"
                value={inputs.cachedInputPercentage}
                onChange={(e) => handleNumberInput('cachedInputPercentage', e.target.value)}
                className="w-full accent-[#F59E0B] cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <p className="text-xs text-slate-400 mt-1.5 leading-normal">
                Prompt caching drastically reduces costs when the system prompt, tool schemas, or documentation remain identical across loops.
              </p>
            </div>

            {/* Tool / API Calls & Unit Cost */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#1E293B]">
              <div>
                <label htmlFor="tools-per-run" className="text-xs font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
                  <Wrench size={14} className="text-blue-400" />
                  <span>Tool / API Calls Per Run</span>
                </label>
                <input
                  id="tools-per-run"
                  type="number"
                  min="0"
                  max="50"
                  value={inputs.toolsPerRun}
                  onChange={(e) => handleNumberInput('toolsPerRun', e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0B1F3A] border border-[#1E293B] text-sm font-mono font-bold text-white outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 transition-all"
                />
              </div>

              <div>
                <label htmlFor="cost-per-tool" className="text-xs font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
                  <DollarSign size={14} className="text-blue-400" />
                  <span>Cost Per Tool Call ($)</span>
                </label>
                <input
                  id="cost-per-tool"
                  type="number"
                  step="0.0005"
                  min="0"
                  value={inputs.costPerToolCall}
                  onChange={(e) => handleNumberInput('costPerToolCall', e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0B1F3A] border border-[#1E293B] text-sm font-mono font-bold text-white outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 transition-all"
                  placeholder="e.g. 0.001"
                />
                <span className="text-xs text-slate-400 mt-1 block">Search APIs (Tavily/Serper), scrapers, CRM lookups.</span>
              </div>
            </div>

            {/* Infrastructure Breakdown (Vector DB, Hosting, Monitoring) */}
            <div className="pt-3 border-t border-[#1E293B] space-y-3">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
                Monthly Fixed Infrastructure ($)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="vector-db-cost" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                    <Database size={13} className="text-purple-400" />
                    <span>Vector DB ($/mo)</span>
                  </label>
                  <input
                    id="vector-db-cost"
                    type="number"
                    min="0"
                    value={inputs.vectorDbCostPerMonth}
                    onChange={(e) => handleNumberInput('vectorDbCostPerMonth', e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0B1F3A] border border-[#1E293B] text-sm font-mono font-bold text-white outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 transition-all"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label htmlFor="hosting-cost" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                    <Server size={13} className="text-purple-400" />
                    <span>Compute/Workers ($/mo)</span>
                  </label>
                  <input
                    id="hosting-cost"
                    type="number"
                    min="0"
                    value={inputs.hostingCostPerMonth}
                    onChange={(e) => handleNumberInput('hostingCostPerMonth', e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0B1F3A] border border-[#1E293B] text-sm font-mono font-bold text-white outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 transition-all"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label htmlFor="other-infra-cost" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                    <Zap size={13} className="text-purple-400" />
                    <span>Other Infra ($/mo)</span>
                  </label>
                  <input
                    id="other-infra-cost"
                    type="number"
                    min="0"
                    value={inputs.otherInfraCostPerMonth}
                    onChange={(e) => handleNumberInput('otherInfraCostPerMonth', e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0B1F3A] border border-[#1E293B] text-sm font-mono font-bold text-white outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 transition-all"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Retry / Error Overhead Percentage */}
            <div className="pt-3 border-t border-[#1E293B]">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="retry-overhead" className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <Repeat size={14} className="text-amber-400" />
                  <span>Retry &amp; Error Overhead:</span>
                  <span className="font-mono font-bold text-[#F59E0B]">{inputs.retryOverheadPercentage}%</span>
                </label>
                <span className="text-xs text-slate-400">Applied strictly to dynamic LLM &amp; API calls</span>
              </div>
              <input
                id="retry-overhead"
                type="range"
                min="0"
                max="30"
                step="1"
                value={inputs.retryOverheadPercentage}
                onChange={(e) => handleNumberInput('retryOverheadPercentage', e.target.value)}
                className="w-full accent-[#F59E0B] cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <p className="text-xs text-slate-400 mt-1.5 leading-normal">
                Real-world agent execution loops encounter rate limits, JSON parsing retries, or tool timeouts requiring rerun buffers.
              </p>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
