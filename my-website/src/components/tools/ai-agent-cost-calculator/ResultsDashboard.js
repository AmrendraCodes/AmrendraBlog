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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1F3A] to-[#071324] border border-[#F59E0B]/50 hover:border-[#F59E0B]/70 p-5 sm:p-7 text-white shadow-[0_0_35px_rgba(245,158,11,0.14)] transition-all duration-200">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-5 border-b border-slate-700/60">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <TrendingUp size={14} className="text-[#F59E0B]" />
              <span>ESTIMATED MONTHLY BUDGET</span>
            </div>
            <h3 className="text-xs sm:text-sm text-slate-300 font-medium">
              Based on {formatNumber(result.monthlyModelCalls)} model calls &amp; {formatNumber(result.agentRunsPerMonth)} agent runs
            </h3>
          </div>

          <button
            type="button"
            onClick={handleShareClick}
            className="min-h-[38px] inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white font-mono text-xs font-bold border border-white/15 transition-colors cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:outline-none"
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
        <div className="relative z-10 pt-5 flex flex-col sm:flex-row items-baseline justify-between gap-4">
          <div className="min-w-0">
            <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white flex flex-wrap items-baseline gap-2">
              <span>{formatCurrency(result.totalMonthlyCost, currency)}</span>
              <span className="text-lg sm:text-xl font-normal text-slate-400 font-sans">
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Cost Per Run */}
        <div className="bg-[#0B1F3A] rounded-2xl border border-[#1E293B] p-4 sm:p-5 shadow-sm hover:border-slate-700 transition-colors">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Cost / Agent Run
          </span>
          <div className="text-xl sm:text-2xl font-black font-mono text-white">
            {formatCurrency(result.costPerRun, currency)}
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            Per completed user goal
          </span>
        </div>

        {/* Cost Per 1,000 Runs */}
        <div className="bg-[#0B1F3A] rounded-2xl border border-[#1E293B] p-4 sm:p-5 shadow-sm hover:border-slate-700 transition-colors">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Cost / 1,000 Runs
          </span>
          <div className="text-xl sm:text-2xl font-black font-mono text-[#F59E0B]">
            {formatCurrency(result.costPer1kRuns, currency)}
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            Baseline for unit economics
          </span>
        </div>

        {/* Annual Forecast */}
        <div className="bg-[#0B1F3A] rounded-2xl border border-[#1E293B] p-4 sm:p-5 shadow-sm hover:border-slate-700 transition-colors">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Calendar size={13} className="text-slate-400" />
            <span>Estimated Annual</span>
          </span>
          <div className="text-xl sm:text-2xl font-black font-mono text-white">
            {formatCurrency(result.annualCost, currency)}
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            12-month projection
          </span>
        </div>
      </div>

      {/* ─── Zero-Dependency CSS Cost Visualizer ─── */}
      <div className="bg-[#0B1F3A] rounded-3xl border border-[#1E293B] p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <span>Cost Distribution Breakdown</span>
            <span className="text-xs font-mono font-normal text-slate-400">
              ({currency})
            </span>
          </h4>
          <span className="text-xs font-mono text-slate-400 font-semibold">
            {formatCurrency(result.totalMonthlyCost, currency)} total
          </span>
        </div>

        {/* Stacked Percentage Bar */}
        <div className="w-full h-3.5 rounded-full bg-[#071324] overflow-hidden flex shadow-inner border border-[#1E293B]">
          {percentages.inputTokens > 0 && (
            <div
              style={{ width: `${percentages.inputTokens}%` }}
              className="h-full bg-amber-500 hover:brightness-110 transition-all duration-200"
              title={`Input Tokens: ${percentages.inputTokens}% (${formatCurrency(result.totalInputCost, currency)})`}
            />
          )}
          {percentages.outputTokens > 0 && (
            <div
              style={{ width: `${percentages.outputTokens}%` }}
              className="h-full bg-blue-500 hover:brightness-110 transition-all duration-200"
              title={`Output Tokens: ${percentages.outputTokens}% (${formatCurrency(result.totalOutputCost, currency)})`}
            />
          )}
          {percentages.toolApis > 0 && (
            <div
              style={{ width: `${percentages.toolApis}%` }}
              className="h-full bg-emerald-500 hover:brightness-110 transition-all duration-200"
              title={`Tool APIs: ${percentages.toolApis}% (${formatCurrency(result.toolCost, currency)})`}
            />
          )}
          {percentages.infrastructure > 0 && (
            <div
              style={{ width: `${percentages.infrastructure}%` }}
              className="h-full bg-purple-500 hover:brightness-110 transition-all duration-200"
              title={`Infrastructure: ${percentages.infrastructure}% (${formatCurrency(result.fixedInfraCost, currency)})`}
            />
          )}
          {percentages.retryOverhead > 0 && (
            <div
              style={{ width: `${percentages.retryOverhead}%` }}
              className="h-full bg-rose-500 hover:brightness-110 transition-all duration-200"
              title={`Retries & Overhead: ${percentages.retryOverhead}% (${formatCurrency(result.retryOverheadCost, currency)})`}
            />
          )}
        </div>

        {/* Visualizer Legend Chips */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
            <span>Input: <strong>{formatPercent(percentages.inputTokens)}</strong> ({formatCurrency(result.totalInputCost, currency)})</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
            <span>Output: <strong>{formatPercent(percentages.outputTokens)}</strong> ({formatCurrency(result.totalOutputCost, currency)})</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
            <span>Tools: <strong>{formatPercent(percentages.toolApis)}</strong> ({formatCurrency(result.toolCost, currency)})</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
            <span>Infra: <strong>{formatPercent(percentages.infrastructure)}</strong> ({formatCurrency(result.fixedInfraCost, currency)})</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
            <span>Retries: <strong>{formatPercent(percentages.retryOverhead)}</strong> ({formatCurrency(result.retryOverheadCost, currency)})</span>
          </div>
        </div>
      </div>

      {/* ─── Detailed Line-Item Breakdown Cards ─── */}
      <div className="bg-[#0B1F3A] rounded-3xl border border-[#1E293B] p-5 sm:p-6 shadow-sm space-y-4">
        <h4 className="text-xs sm:text-sm font-bold text-white uppercase font-mono tracking-wider">
          Monthly Expense Ledger
        </h4>

        <div className="divide-y divide-[#1E293B] text-xs sm:text-sm">
          {/* LLM Input Tokens */}
          <div className="py-3.5 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#F59E0B] shrink-0 mt-0.5">
                <Layers size={16} />
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-white block truncate">
                  LLM Input Tokens
                </span>
                <span className="text-xs text-slate-400 font-mono block break-words mt-0.5">
                  {formatNumber(result.totalInputTokens)} tokens ({formatNumber(result.cachedInputTokens)} cached)
                </span>
              </div>
            </div>
            <div className="text-right font-mono font-bold text-white shrink-0 ml-2">
              {formatCurrency(result.totalInputCost, currency)}
            </div>
          </div>

          {/* LLM Output Tokens */}
          <div className="py-3.5 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                <Layers size={16} />
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-white block truncate">
                  LLM Output Tokens
                </span>
                <span className="text-xs text-slate-400 font-mono block break-words mt-0.5">
                  {formatNumber(result.totalOutputTokens)} generated tokens
                </span>
              </div>
            </div>
            <div className="text-right font-mono font-bold text-white shrink-0 ml-2">
              {formatCurrency(result.totalOutputCost, currency)}
            </div>
          </div>

          {/* Tool / API Calls */}
          <div className="py-3.5 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                <Wrench size={16} />
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-white block truncate">
                  Tool &amp; Search API Execution
                </span>
                <span className="text-xs text-slate-400 font-mono block break-words mt-0.5">
                  {formatNumber(result.monthlyToolCalls)} total tool actions
                </span>
              </div>
            </div>
            <div className="text-right font-mono font-bold text-white shrink-0 ml-2">
              {formatCurrency(result.toolCost, currency)}
            </div>
          </div>

          {/* Fixed Infrastructure */}
          <div className="py-3.5 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                <Server size={16} />
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-white block truncate">
                  Vector DB &amp; Compute Hosting
                </span>
                <span className="text-xs text-slate-400 font-mono block break-words mt-0.5">
                  Vector DB: {formatCurrency(result.vectorDbCost, currency)} • Compute: {formatCurrency(result.hostingCost, currency)}
                </span>
              </div>
            </div>
            <div className="text-right font-mono font-bold text-white shrink-0 ml-2">
              {formatCurrency(result.fixedInfraCost, currency)}
            </div>
          </div>

          {/* Retry & Error Buffer */}
          <div className="py-3.5 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
                <Repeat size={16} />
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-white block truncate">
                  Retry &amp; Failure Overhead Buffer
                </span>
                <span className="text-xs text-slate-400 font-mono block break-words mt-0.5">
                  Buffer on dynamic LLM &amp; tool runtime calls
                </span>
              </div>
            </div>
            <div className="text-right font-mono font-bold text-white shrink-0 ml-2">
              {formatCurrency(result.retryOverheadCost, currency)}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Compare with Scenario B Action Banner ─── */}
      {!isComparing && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#071324] border border-[#F59E0B]/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md hover:border-[#F59E0B]/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] shrink-0">
              <Info size={18} />
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Want to compare this against a different model or multi-agent pipeline?
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenComparison}
            className="w-full sm:w-auto min-h-[40px] px-4 py-2 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-extrabold text-xs sm:text-sm transition-all duration-150 cursor-pointer border-none flex items-center justify-center gap-1.5 shadow-sm active:scale-95 shrink-0 focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:outline-none"
          >
            <span>Compare Scenarios</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}

    </div>
  );
}
