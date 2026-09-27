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
    <div className="bg-[var(--card-bg)] rounded-3xl border-2 border-amber-500/40 p-4 sm:p-6 lg:p-7 shadow-xl space-y-6 mt-8 animate-fade-in">
      
      {/* ─── Top Header ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[var(--card-border)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B]">
              SCENARIO COMPARISON (A vs B)
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)]">
            Compare Models, Providers, or Agent Workloads
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCloneFromA}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#112240] hover:bg-slate-200 dark:hover:bg-[#1E3A8A] text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-[#1E293B] cursor-pointer"
            title="Copy Scenario A settings into Scenario B"
          >
            <Copy size={13} />
            <span>Clone Scenario A</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#112240] transition-colors border-none bg-transparent cursor-pointer"
            aria-label="Close scenario comparison"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* ─── Scenario B Fast Configurator ─── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-[#1E293B] space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#F59E0B]">
          <Sliders size={14} />
          <span>Configure Scenario B Alternative</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Provider */}
          <div>
            <label htmlFor="b-provider" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
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
                className="w-full appearance-none px-3 py-2 rounded-xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-[#1E293B] text-xs font-semibold text-[var(--foreground)] outline-none focus:border-[#F59E0B] cursor-pointer"
              >
                {AI_PROVIDERS.map((prov) => (
                  <option key={prov.id} value={prov.id} className="bg-white dark:bg-[#0B1F3A]">
                    {prov.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Model */}
          <div>
            <label htmlFor="b-model" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Model (B)
            </label>
            <div className="relative">
              <select
                id="b-model"
                value={scenarioB.modelId}
                onChange={(e) => onUpdateScenarioB({ modelId: e.target.value })}
                className="w-full appearance-none px-3 py-2 rounded-xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-[#1E293B] text-xs font-semibold text-[var(--foreground)] outline-none focus:border-[#F59E0B] cursor-pointer"
              >
                {modelsForB.map((m) => (
                  <option key={m.id} value={m.id} className="bg-white dark:bg-[#0B1F3A]">
                    {m.name} ({m.contextWindow})
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Runs Per Month */}
          <div>
            <label htmlFor="b-runs" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Agent Runs / Month (B)
            </label>
            <input
              id="b-runs"
              type="number"
              min="0"
              value={scenarioB.agentRunsPerMonth}
              onChange={(e) => onUpdateScenarioB({ agentRunsPerMonth: Math.max(0, Number(e.target.value)) })}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-[#1E293B] text-xs font-mono text-[var(--foreground)] outline-none focus:border-[#F59E0B]"
            />
          </div>

          {/* Calls Per Run */}
          <div>
            <label htmlFor="b-calls" className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Model Calls / Run (B)
            </label>
            <input
              id="b-calls"
              type="number"
              min="1"
              value={scenarioB.callsPerRun}
              onChange={(e) => onUpdateScenarioB({ callsPerRun: Math.max(1, Number(e.target.value)) })}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-[#1E293B] text-xs font-mono text-[var(--foreground)] outline-none focus:border-[#F59E0B]"
            />
          </div>
        </div>
      </div>

      {/* ─── Side-by-Side Comparison Metrics Table ─── */}
      <div>
        <div className="flex sm:hidden items-center justify-end text-[10px] font-mono text-slate-400 mb-2">
          <span>Swipe table horizontally &rarr;</span>
        </div>
        <div className="overflow-x-auto -mx-1 px-1">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[550px]">
          <thead>
            <tr className="border-b border-slate-200 dark:border-[#1E293B] text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <th className="py-3 px-3">Metric</th>
              <th className="py-3 px-3 text-slate-900 dark:text-slate-100 font-bold">
                Scenario A <br />
                <span className="text-[10px] text-slate-500 font-normal">{modelA.name}</span>
              </th>
              <th className="py-3 px-3 text-[#F59E0B] font-bold">
                Scenario B <br />
                <span className="text-[10px] text-amber-600 dark:text-amber-300 font-normal">{modelB.name}</span>
              </th>
              <th className="py-3 px-3 text-right">Variance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-[#1E293B]">
            {/* Monthly Cost */}
            <tr className="bg-slate-50/50 dark:bg-[#071324]/40 font-semibold">
              <td className="py-3 px-3 text-[var(--text-heading)]">Estimated Monthly Cost</td>
              <td className="py-3 px-3 font-mono">{formatCurrency(resultA.totalMonthlyCost, currency)}</td>
              <td className="py-3 px-3 font-mono text-[#F59E0B] font-bold">{formatCurrency(resultB.totalMonthlyCost, currency)}</td>
              <td className="py-3 px-3 font-mono text-right">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold ${
                    comparison.isCheaper
                      ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30'
                      : comparison.isMoreExpensive
                        ? 'bg-rose-500/10 text-rose-800 dark:text-rose-300 border border-rose-500/30'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                  }`}
                >
                  {comparison.isCheaper ? <TrendingDown size={12} /> : comparison.isMoreExpensive ? <TrendingUp size={12} /> : <Minus size={12} />}
                  <span>
                    {comparison.monthlyDiff > 0 ? '+' : ''}
                    {formatCurrency(comparison.monthlyDiff, currency)} ({formatPercent(comparison.monthlyPercentDiff)})
                  </span>
                </span>
              </td>
            </tr>

            {/* Cost Per Run */}
            <tr>
              <td className="py-3 px-3 text-slate-600 dark:text-slate-300">Cost / Agent Run</td>
              <td className="py-3 px-3 font-mono">{formatCurrency(resultA.costPerRun, currency)}</td>
              <td className="py-3 px-3 font-mono font-bold">{formatCurrency(resultB.costPerRun, currency)}</td>
              <td className="py-3 px-3 font-mono text-right text-xs">
                {comparison.perRunDiff > 0 ? '+' : ''}{formatCurrency(comparison.perRunDiff, currency)}
              </td>
            </tr>

            {/* Cost Per 1,000 Runs */}
            <tr>
              <td className="py-3 px-3 text-slate-600 dark:text-slate-300">Cost / 1,000 Runs</td>
              <td className="py-3 px-3 font-mono">{formatCurrency(resultA.costPer1kRuns, currency)}</td>
              <td className="py-3 px-3 font-mono font-bold">{formatCurrency(resultB.costPer1kRuns, currency)}</td>
              <td className="py-3 px-3 font-mono text-right text-xs">
                {comparison.per1kDiff > 0 ? '+' : ''}{formatCurrency(comparison.per1kDiff, currency)}
              </td>
            </tr>

            {/* Annual Cost */}
            <tr>
              <td className="py-3 px-3 text-slate-600 dark:text-slate-300">Annual Projection</td>
              <td className="py-3 px-3 font-mono">{formatCurrency(resultA.annualCost, currency)}</td>
              <td className="py-3 px-3 font-mono font-bold">{formatCurrency(resultB.annualCost, currency)}</td>
              <td className="py-3 px-3 font-mono text-right text-xs">
                {comparison.annualDiff > 0 ? '+' : ''}{formatCurrency(comparison.annualDiff, currency)}
              </td>
            </tr>

            {/* Monthly Model Calls */}
            <tr>
              <td className="py-3 px-3 text-slate-600 dark:text-slate-300">Monthly Model Calls</td>
              <td className="py-3 px-3 font-mono">{formatNumber(resultA.monthlyModelCalls)}</td>
              <td className="py-3 px-3 font-mono font-bold">{formatNumber(resultB.monthlyModelCalls)}</td>
              <td className="py-3 px-3 font-mono text-right text-xs text-slate-400">
                {formatNumber(resultB.monthlyModelCalls - resultA.monthlyModelCalls)} calls
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>

      {/* ─── Neutral Architectural Advice Note ─── */}
      <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2.5">
        <Sparkles size={16} className="text-[#F59E0B] shrink-0 mt-0.5" />
        <p>
          <strong>Engineering Guideline:</strong> A model is not necessarily &ldquo;best&rdquo; purely because it is cheaper. High-reasoning tasks (such as autonomous code generation, multi-hop debugging, or compliance analysis) routinely fail or get stuck in expensive retry loops when powered by smaller models, often eradicating upfront token savings.
        </p>
      </div>

    </div>
  );
}
