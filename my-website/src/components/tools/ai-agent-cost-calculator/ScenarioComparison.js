'use client';

import React from 'react';
import { 
  ArrowUpDown, 
  X, 
  Copy, 
  Sliders, 
  TrendingDown, 
  TrendingUp, 
  Minus, 
  Sparkles, 
  ChevronDown 
} from 'lucide-react';
import { AI_PROVIDERS, getModelsByProvider } from '@/data/modelPricingData';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/agentCostCalculator';

export default function ScenarioComparison({
  scenarioA,
  scenarioB,
  resultA,
  resultB,
  comparison,
  currency,
  modelA,
  modelB,
  onUpdateScenarioB,
  onCloneFromA,
  onClose,
}) {
  const modelsForB = getModelsByProvider(scenarioB.providerId);

  return (
    <div className="bg-[#0B1F3A] rounded-3xl border border-[#F59E0B]/50 p-5 sm:p-7 shadow-2xl space-y-6 mt-8 animate-fade-in">
      
      {/* ─── Top Header ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#1E293B]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F59E0B]">
              SCENARIO COMPARISON (A vs B)
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Compare Models, Providers, or Agent Workloads
          </h3>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onCloneFromA}
            className="min-h-[38px] inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#071324] hover:bg-[#112240] text-xs font-semibold text-slate-200 hover:text-white transition-colors border border-[#1E293B] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:outline-none"
            title="Copy Scenario A settings into Scenario B"
          >
            <Copy size={14} className="text-[#F59E0B]" />
            <span>Clone Scenario A</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[38px] min-w-[38px] p-2 rounded-xl text-slate-400 hover:text-white bg-[#071324] hover:bg-[#112240] border border-[#1E293B] transition-colors cursor-pointer flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:outline-none"
            aria-label="Close scenario comparison"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* ─── Scenario B Fast Configurator ─── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#071324] border border-[#1E293B] space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#F59E0B]">
          <Sliders size={14} />
          <span>Configure Scenario B Alternative</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Provider */}
          <div>
            <label htmlFor="b-provider" className="block text-xs font-semibold text-slate-300 mb-1.5">
              Provider (B)
            </label>
            <div className="relative">
              <select
                id="b-provider"
                value={scenarioB.providerId}
                onChange={(e) => {
                  const p = e.target.value;
                  const models = getModelsByProvider(p);
                  onUpdateScenarioB({
                    providerId: p,
                    modelId: models[0]?.id || 'gpt-4o-mini',
                  });
                }}
                className="w-full min-h-[44px] appearance-none pl-3.5 pr-9 py-2 rounded-xl bg-[#0B1F3A] border border-[#1E293B] text-xs font-semibold text-white outline-none focus:border-[#F59E0B] cursor-pointer"
              >
                {AI_PROVIDERS.map((prov) => (
                  <option key={prov.id} value={prov.id} className="bg-[#0B1F3A] text-white">
                    {prov.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Model */}
          <div>
            <label htmlFor="b-model" className="block text-xs font-semibold text-slate-300 mb-1.5">
              Model (B)
            </label>
            <div className="relative">
              <select
                id="b-model"
                value={scenarioB.modelId}
                onChange={(e) => onUpdateScenarioB({ modelId: e.target.value })}
                className="w-full min-h-[44px] appearance-none pl-3.5 pr-9 py-2 rounded-xl bg-[#0B1F3A] border border-[#1E293B] text-xs font-semibold text-white outline-none focus:border-[#F59E0B] cursor-pointer"
              >
                {modelsForB.map((m) => (
                  <option key={m.id} value={m.id} className="bg-[#0B1F3A] text-white">
                    {m.name} ({m.contextWindow})
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Runs Per Month */}
          <div>
            <label htmlFor="b-runs" className="block text-xs font-semibold text-slate-300 mb-1.5">
              Agent Runs / Month (B)
            </label>
            <input
              id="b-runs"
              type="number"
              min="0"
              value={scenarioB.agentRunsPerMonth}
              onChange={(e) => onUpdateScenarioB({ agentRunsPerMonth: Math.max(0, Number(e.target.value)) })}
              className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0B1F3A] border border-[#1E293B] text-xs font-mono font-bold text-white outline-none focus:border-[#F59E0B]"
            />
          </div>

          {/* Calls Per Run */}
          <div>
            <label htmlFor="b-calls" className="block text-xs font-semibold text-slate-300 mb-1.5">
              Model Calls / Run (B)
            </label>
            <input
              id="b-calls"
              type="number"
              min="1"
              value={scenarioB.callsPerRun}
              onChange={(e) => onUpdateScenarioB({ callsPerRun: Math.max(1, Number(e.target.value)) })}
              className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#0B1F3A] border border-[#1E293B] text-xs font-mono font-bold text-white outline-none focus:border-[#F59E0B]"
            />
          </div>
        </div>
      </div>

      {/* ─── Side-by-Side Comparison Metrics Table ─── */}
      <div className="space-y-2">
        <div className="flex sm:hidden items-center justify-end text-xs font-mono text-slate-400 mb-1">
          <span>Scroll table horizontally &rarr;</span>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-[#1E293B] bg-[#071324]/50">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[550px]">
            <thead>
              <tr className="border-b border-[#1E293B] bg-[#071324] text-xs font-mono uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4 font-semibold">Metric</th>
                <th className="py-3.5 px-4 text-white font-bold">
                  Scenario A <br />
                  <span className="text-xs text-slate-400 font-normal">{modelA.name}</span>
                </th>
                <th className="py-3.5 px-4 text-[#F59E0B] font-bold">
                  Scenario B <br />
                  <span className="text-xs text-amber-300 font-normal">{modelB.name}</span>
                </th>
                <th className="py-3.5 px-4 text-right font-semibold">Variance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]">
              {/* Monthly Cost */}
              <tr className="bg-[#0B1F3A]/60 font-semibold">
                <td className="py-3.5 px-4 text-white">Estimated Monthly Cost</td>
                <td className="py-3.5 px-4 font-mono text-white">{formatCurrency(resultA.totalMonthlyCost, currency)}</td>
                <td className="py-3.5 px-4 font-mono text-[#F59E0B] font-bold">{formatCurrency(resultB.totalMonthlyCost, currency)}</td>
                <td className="py-3.5 px-4 font-mono text-right">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold ${
                      comparison.isCheaper
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : comparison.isMoreExpensive
                          ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                          : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {comparison.isCheaper ? <TrendingDown size={14} /> : comparison.isMoreExpensive ? <TrendingUp size={14} /> : <Minus size={14} />}
                    <span>
                      {comparison.monthlyDiff > 0 ? '+' : ''}
                      {formatCurrency(comparison.monthlyDiff, currency)} ({formatPercent(comparison.monthlyPercentDiff)})
                    </span>
                  </span>
                </td>
              </tr>

              {/* Cost Per Run */}
              <tr>
                <td className="py-3.5 px-4 text-slate-300">Cost / Agent Run</td>
                <td className="py-3.5 px-4 font-mono text-white">{formatCurrency(resultA.costPerRun, currency)}</td>
                <td className="py-3.5 px-4 font-mono font-bold text-white">{formatCurrency(resultB.costPerRun, currency)}</td>
                <td className="py-3.5 px-4 font-mono text-right text-xs text-slate-300">
                  {comparison.perRunDiff > 0 ? '+' : ''}{formatCurrency(comparison.perRunDiff, currency)}
                </td>
              </tr>

              {/* Cost Per 1,000 Runs */}
              <tr>
                <td className="py-3.5 px-4 text-slate-300">Cost / 1,000 Runs</td>
                <td className="py-3.5 px-4 font-mono text-white">{formatCurrency(resultA.costPer1kRuns, currency)}</td>
                <td className="py-3.5 px-4 font-mono font-bold text-white">{formatCurrency(resultB.costPer1kRuns, currency)}</td>
                <td className="py-3.5 px-4 font-mono text-right text-xs text-slate-300">
                  {comparison.per1kDiff > 0 ? '+' : ''}{formatCurrency(comparison.per1kDiff, currency)}
                </td>
              </tr>

              {/* Annual Cost */}
              <tr>
                <td className="py-3.5 px-4 text-slate-300">Annual Projection</td>
                <td className="py-3.5 px-4 font-mono text-white">{formatCurrency(resultA.annualCost, currency)}</td>
                <td className="py-3.5 px-4 font-mono font-bold text-white">{formatCurrency(resultB.annualCost, currency)}</td>
                <td className="py-3.5 px-4 font-mono text-right text-xs text-slate-300">
                  {comparison.annualDiff > 0 ? '+' : ''}{formatCurrency(comparison.annualDiff, currency)}
                </td>
              </tr>

              {/* Monthly Model Calls */}
              <tr>
                <td className="py-3.5 px-4 text-slate-300">Monthly Model Calls</td>
                <td className="py-3.5 px-4 font-mono text-white">{formatNumber(resultA.monthlyModelCalls)}</td>
                <td className="py-3.5 px-4 font-mono font-bold text-white">{formatNumber(resultB.monthlyModelCalls)}</td>
                <td className="py-3.5 px-4 font-mono text-right text-xs text-slate-400">
                  {formatNumber(resultB.monthlyModelCalls - resultA.monthlyModelCalls)} calls
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── Neutral Architectural Advice Note ─── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-3">
        <Sparkles size={18} className="text-[#F59E0B] shrink-0 mt-0.5" />
        <p>
          <strong className="text-white">Engineering Guideline:</strong> A model is not necessarily &ldquo;best&rdquo; purely because it is cheaper. High-reasoning tasks (such as autonomous code generation, multi-hop debugging, or compliance analysis) routinely fail or get stuck in expensive retry loops when powered by smaller models, often eradicating upfront token savings.
        </p>
      </div>

    </div>
  );
}
