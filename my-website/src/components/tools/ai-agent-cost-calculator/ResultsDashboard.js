'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Share2, 
  Check, 
  Layers, 
  Wrench, 
  Server, 
  Repeat, 
  Info,
  Calendar,
  Zap,
  ArrowRight
} from 'lucide-react';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/agentCostCalculator';

export default function ResultsDashboard({
  result,
  currency,
  selectedModel,
  onShare,
  onOpenComparison,
  isComparing,
}) {
  const [copied, setCopied] = useState(false);

  const handleShareClick = () => {
    if (onShare) {
      onShare();
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const percentages = result.percentages || {};

  return (
    <div className="space-y-6">
      
      {/* ─── Hero Highlight Card: Primary Monthly Cost ─── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1F3A] to-[#071324] border-2 border-[#F59E0B] p-4 sm:p-6 lg:p-7 text-white shadow-[0_0_40px_rgba(245,158,11,0.15)]">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-56 h-56 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-5 sm:pb-6 border-b border-slate-700/60">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <TrendingUp size={14} />
              <span>ESTIMATED MONTHLY BUDGET</span>
            </div>
            <h3 className="text-xs sm:text-sm text-slate-300 font-medium">
              Based on {formatNumber(result.monthlyModelCalls)} model calls &amp; {formatNumber(result.agentRunsPerMonth)} agent runs
            </h3>
          </div>

          <button
            type="button"
            onClick={handleShareClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-mono text-xs font-bold border border-white/10 transition-colors cursor-pointer shrink-0"
            title="Copy shareable link with current inputs"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span className="text-emerald-300">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 size={14} />
                <span>Share Calculation</span>
              </>
            )}
          </button>
        </div>

        {/* Primary Metric Figures */}
        <div className="relative z-10 pt-5 sm:pt-6 flex flex-col sm:flex-row items-baseline justify-between gap-4">
          <div className="min-w-0">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight text-white flex flex-wrap items-baseline gap-1.5 sm:gap-2 break-all sm:break-normal">
              <span>{formatCurrency(result.totalMonthlyCost, currency)}</span>
              <span className="text-base sm:text-lg lg:text-xl font-normal text-slate-400 font-sans">
                /month
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Model: <strong className="text-slate-200 font-semibold">{selectedModel.name}</strong> • Token, Tool &amp; Infra Consolidated
            </p>
          </div>

          {result.cachedSavings > 0 && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold shrink-0">
              <Zap size={14} className="text-emerald-400" />
              <span>Saves {formatCurrency(result.cachedSavings, currency)}/mo via Caching</span>
            </div>
          )}
        </div>
      </div>

      {/* ─── Secondary Metrics Row ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3">
        {/* Cost Per Run */}
        <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] p-4 sm:p-5 shadow-[var(--shadow-card)]">
          <span className="text-[11px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">
            Cost / Agent Run
          </span>
          <div className="text-xl sm:text-2xl font-extrabold font-mono text-[var(--text-heading)]">
            {formatCurrency(result.costPerRun, currency)}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
            Per completed user goal
          </span>
        </div>

        {/* Cost Per 1,000 Runs */}
        <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] p-4 sm:p-5 shadow-[var(--shadow-card)]">
          <span className="text-[11px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">
            Cost / 1,000 Runs
          </span>
          <div className="text-xl sm:text-2xl font-extrabold font-mono text-[#F59E0B]">
            {formatCurrency(result.costPer1kRuns, currency)}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
            Baseline for unit economics
          </span>
        </div>

        {/* Annual Forecast */}
        <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] p-4 sm:p-5 shadow-[var(--shadow-card)]">
          <span className="text-[11px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1 flex items-center gap-1">
            <Calendar size={12} className="text-slate-400" />
            <span>Estimated Annual Cost</span>
          </span>
          <div className="text-xl sm:text-2xl font-extrabold font-mono text-[var(--text-heading)]">
            {formatCurrency(result.annualCost, currency)}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
            12-month projection
          </span>
        </div>
      </div>

      {/* ─── Zero-Dependency CSS Cost Visualizer ─── */}
      <div className="bg-[var(--card-bg)] rounded-3xl border border-[var(--card-border)] p-5 sm:p-6 shadow-[var(--shadow-card)] space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-[var(--text-heading)] flex items-center gap-2">
            <span>Cost Distribution Breakdown</span>
            <span className="text-[11px] font-mono font-normal text-slate-500">
              ({currency})
            </span>
          </h4>
          <span className="text-xs font-mono text-slate-400">
            {formatCurrency(result.totalMonthlyCost, currency)} total
          </span>
        </div>

        {/* Stacked Percentage Bar */}
        <div className="w-full h-4 rounded-full bg-slate-100 dark:bg-[#071324] overflow-hidden flex shadow-inner">
          {percentages.inputTokens > 0 && (
            <div
              style={{ width: `${percentages.inputTokens}%` }}
              className="h-full bg-amber-500 hover:brightness-110 transition-all duration-300"
              title={`Input Tokens: ${percentages.inputTokens}% (${formatCurrency(result.totalInputCost, currency)})`}
            />
          )}
          {percentages.outputTokens > 0 && (
            <div
              style={{ width: `${percentages.outputTokens}%` }}
              className="h-full bg-blue-500 hover:brightness-110 transition-all duration-300"
              title={`Output Tokens: ${percentages.outputTokens}% (${formatCurrency(result.totalOutputCost, currency)})`}
            />
          )}
          {percentages.toolApis > 0 && (
            <div
              style={{ width: `${percentages.toolApis}%` }}
              className="h-full bg-emerald-500 hover:brightness-110 transition-all duration-300"
              title={`Tool APIs: ${percentages.toolApis}% (${formatCurrency(result.toolCost, currency)})`}
            />
          )}
          {percentages.infrastructure > 0 && (
            <div
              style={{ width: `${percentages.infrastructure}%` }}
              className="h-full bg-purple-500 hover:brightness-110 transition-all duration-300"
              title={`Infrastructure: ${percentages.infrastructure}% (${formatCurrency(result.fixedInfraCost, currency)})`}
            />
          )}
          {percentages.retryOverhead > 0 && (
            <div
              style={{ width: `${percentages.retryOverhead}%` }}
              className="h-full bg-rose-500 hover:brightness-110 transition-all duration-300"
              title={`Retries & Overhead: ${percentages.retryOverhead}% (${formatCurrency(result.retryOverheadCost, currency)})`}
            />
          )}
        </div>

        {/* Visualizer Legend Chips */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1 text-xs">
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
            <span>Input: {formatPercent(percentages.inputTokens)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
            <span>Output: {formatPercent(percentages.outputTokens)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
            <span>Tools: {formatPercent(percentages.toolApis)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
            <span>Infra: {formatPercent(percentages.infrastructure)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
            <span>Retries: {formatPercent(percentages.retryOverhead)}</span>
          </div>
        </div>
      </div>

      {/* ─── Detailed Line-Item Breakdown Cards ─── */}
      <div className="bg-[var(--card-bg)] rounded-3xl border border-[var(--card-border)] p-4 sm:p-6 shadow-[var(--shadow-card)] space-y-4">
        <h4 className="text-sm font-bold text-[var(--text-heading)] uppercase font-mono tracking-wider">
          Monthly Expense Ledger
        </h4>

        <div className="divide-y divide-slate-200 dark:divide-[#1E293B] text-xs sm:text-sm">
          {/* LLM Input Tokens */}
          <div className="py-3 flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5 min-w-0 flex-1">
              <Layers size={16} className="text-amber-500 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate">
                  LLM Input Tokens
                </span>
                <span className="text-xs text-slate-500 font-mono block break-words">
                  {formatNumber(result.totalInputTokens)} tokens ({formatNumber(result.cachedInputTokens)} cached)
                </span>
              </div>
            </div>
            <div className="text-right font-mono font-bold text-slate-900 dark:text-slate-100 shrink-0 ml-2">
              {formatCurrency(result.totalInputCost, currency)}
            </div>
          </div>

          {/* LLM Output Tokens */}
          <div className="py-3 flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5 min-w-0 flex-1">
              <Layers size={16} className="text-blue-500 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate">
                  LLM Output Tokens
                </span>
                <span className="text-xs text-slate-500 font-mono block break-words">
                  {formatNumber(result.totalOutputTokens)} generated tokens
                </span>
              </div>
            </div>
            <div className="text-right font-mono font-bold text-slate-900 dark:text-slate-100 shrink-0 ml-2">
              {formatCurrency(result.totalOutputCost, currency)}
            </div>
          </div>

          {/* Tool / API Calls */}
          <div className="py-3 flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5 min-w-0 flex-1">
              <Wrench size={16} className="text-emerald-500 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate">
                  Tool &amp; Search API Execution
                </span>
                <span className="text-xs text-slate-500 font-mono block break-words">
                  {formatNumber(result.monthlyToolCalls)} total tool actions
                </span>
              </div>
            </div>
            <div className="text-right font-mono font-bold text-slate-900 dark:text-slate-100 shrink-0 ml-2">
              {formatCurrency(result.toolCost, currency)}
            </div>
          </div>

          {/* Fixed Infrastructure */}
          <div className="py-3 flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5 min-w-0 flex-1">
              <Server size={16} className="text-purple-500 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate">
                  Vector DB &amp; Compute Hosting
                </span>
                <span className="text-xs text-slate-500 font-mono block break-words">
                  Vector DB: {formatCurrency(result.vectorDbCost, currency)} • Compute: {formatCurrency(result.hostingCost, currency)}
                </span>
              </div>
            </div>
            <div className="text-right font-mono font-bold text-slate-900 dark:text-slate-100 shrink-0 ml-2">
              {formatCurrency(result.fixedInfraCost, currency)}
            </div>
          </div>

          {/* Retry & Error Buffer */}
          <div className="py-3 flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5 min-w-0 flex-1">
              <Repeat size={16} className="text-rose-500 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate">
                  Retry &amp; Failure Overhead Buffer
                </span>
                <span className="text-xs text-slate-500 font-mono block break-words">
                  Buffer on runtime calls
                </span>
              </div>
            </div>
            <div className="text-right font-mono font-bold text-slate-900 dark:text-slate-100 shrink-0 ml-2">
              {formatCurrency(result.retryOverheadCost, currency)}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Compare with Scenario B Action Banner ─── */}
      {!isComparing && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Info size={18} className="text-[#F59E0B] shrink-0" />
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Want to compare this against a different model or multi-agent pipeline?
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenComparison}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-bold text-xs sm:text-sm transition-colors cursor-pointer border-none flex items-center justify-center gap-1.5 shadow-xs shrink-0"
          >
            <span>Compare Scenarios</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}

    </div>
  );
}
