import { DEFAULT_USD_TO_INR_RATE } from '../data/modelPricingData.js';

/**
 * Pure Calculation Engine for AI Agent & LLM Cost Estimation
 *
 * Guarantees zero-safe, NaN-safe, non-negative arithmetic.
 */

/**
 * Sanitizes and forces numbers to be non-negative.
 * @param {*} val
 * @param {number} fallback
 * @returns {number}
 */
export function sanitizeNumber(val, fallback = 0) {
  const num = Number(val);
  return Number.isFinite(num) && num >= 0 ? num : fallback;
}

/**
 * Calculates complete cost metrics for an AI Agent workload.
 *
 * @param {Object} inputs - User-provided inputs.
 * @param {Object} modelConfig - Selected model configuration from pricing registry.
 * @param {string} [currency='USD'] - 'USD' or 'INR'
 * @param {number} [exchangeRate=DEFAULT_USD_TO_INR_RATE] - USD to INR exchange multiplier
 * @returns {Object} Comprehensive calculation report
 */
export function calculateAgentCosts(
  inputs = {},
  modelConfig = {},
  currency = 'USD',
  exchangeRate = DEFAULT_USD_TO_INR_RATE
) {
  // 1. Sanitize & clamp all numerical inputs
  const agentRunsPerMonth = sanitizeNumber(inputs.agentRunsPerMonth, 0);
  const callsPerRun = sanitizeNumber(inputs.callsPerRun, 1);
  const inputTokensPerCall = sanitizeNumber(inputs.inputTokensPerCall, 0);
  const outputTokensPerCall = sanitizeNumber(inputs.outputTokensPerCall, 0);
  const cachedInputPercentage = Math.min(100, sanitizeNumber(inputs.cachedInputPercentage, 0));
  const toolsPerRun = sanitizeNumber(inputs.toolsPerRun, 0);
  const costPerToolCall = sanitizeNumber(inputs.costPerToolCall, 0);
  const vectorDbCostPerMonth = sanitizeNumber(inputs.vectorDbCostPerMonth, 0);
  const hostingCostPerMonth = sanitizeNumber(inputs.hostingCostPerMonth, 0);
  const otherInfraCostPerMonth = sanitizeNumber(inputs.otherInfraCostPerMonth, 0);
  const numberOfAgents = Math.max(1, sanitizeNumber(inputs.numberOfAgents, 1));
  const retryOverheadPercentage = Math.min(100, sanitizeNumber(inputs.retryOverheadPercentage, 0));

  // 2. Determine token prices (per 1M tokens in USD)
  let inputPricePerM = 0;
  let outputPricePerM = 0;
  let cachedInputPricePerM = 0;

  if (inputs.providerId === 'custom' || modelConfig.id === 'custom-model') {
    inputPricePerM = sanitizeNumber(inputs.customInputPricePerM, 1.0);
    outputPricePerM = sanitizeNumber(inputs.customOutputPricePerM, 3.0);
    cachedInputPricePerM = sanitizeNumber(
      inputs.customCachedPricePerM,
      inputPricePerM
    );
  } else {
    inputPricePerM = sanitizeNumber(modelConfig.inputPricePerM, 0.15);
    outputPricePerM = sanitizeNumber(modelConfig.outputPricePerM, 0.60);
    cachedInputPricePerM = modelConfig.cachedInputPricePerM !== null && modelConfig.cachedInputPricePerM !== undefined
      ? sanitizeNumber(modelConfig.cachedInputPricePerM, inputPricePerM)
      : inputPricePerM;
  }

  // 3. Volume Metrics
  const monthlyModelCalls = agentRunsPerMonth * callsPerRun * numberOfAgents;
  const totalInputTokens = monthlyModelCalls * inputTokensPerCall;
  const cachedInputTokens = totalInputTokens * (cachedInputPercentage / 100);
  const uncachedInputTokens = totalInputTokens - cachedInputTokens;
  const totalOutputTokens = monthlyModelCalls * outputTokensPerCall;

  // 4. LLM Token Costs (USD base)
  const uncachedInputCostUSD = (uncachedInputTokens / 1_000_000) * inputPricePerM;
  const cachedInputCostUSD = (cachedInputTokens / 1_000_000) * cachedInputPricePerM;
  const totalInputCostUSD = uncachedInputCostUSD + cachedInputCostUSD;

  // Potential savings due to caching compared to uncached full price
  const fullPriceCachedInputCostUSD = (cachedInputTokens / 1_000_000) * inputPricePerM;
  const cachedSavingsUSD = Math.max(0, fullPriceCachedInputCostUSD - cachedInputCostUSD);

  const totalOutputCostUSD = (totalOutputTokens / 1_000_000) * outputPricePerM;
  const totalLlmCostUSD = totalInputCostUSD + totalOutputCostUSD;

  // 5. Tool & API Costs (USD base)
  const monthlyToolCalls = agentRunsPerMonth * toolsPerRun * numberOfAgents;
  const toolCostUSD = monthlyToolCalls * costPerToolCall;

  // 6. Fixed Infrastructure Costs (USD base)
  const vectorDbCostUSD = vectorDbCostPerMonth;
  const hostingCostUSD = hostingCostPerMonth;
  const otherInfraCostUSD = otherInfraCostPerMonth;
  const fixedInfraCostUSD = vectorDbCostUSD + hostingCostUSD + otherInfraCostUSD;

  // 7. Dynamic Variable Cost & Retry Overhead (USD base)
  // Overhead applies strictly to dynamic LLM + tool runtime executions
  const dynamicExecutionCostUSD = totalLlmCostUSD + toolCostUSD;
  const retryOverheadCostUSD = dynamicExecutionCostUSD * (retryOverheadPercentage / 100);

  // 8. Total Monthly & Unit Costs (USD base)
  const totalMonthlyCostUSD = dynamicExecutionCostUSD + retryOverheadCostUSD + fixedInfraCostUSD;
  const costPerRunUSD = agentRunsPerMonth > 0 ? totalMonthlyCostUSD / agentRunsPerMonth : 0;
  const costPer1kRunsUSD = costPerRunUSD * 1000;
  const annualCostUSD = totalMonthlyCostUSD * 12;

  // 9. Currency Conversion (USD to chosen target currency)
  const multiplier = currency === 'INR' ? exchangeRate : 1;

  const totalMonthlyCost = totalMonthlyCostUSD * multiplier;
  const costPerRun = costPerRunUSD * multiplier;
  const costPer1kRuns = costPer1kRunsUSD * multiplier;
  const annualCost = annualCostUSD * multiplier;

  const totalInputCost = totalInputCostUSD * multiplier;
  const uncachedInputCost = uncachedInputCostUSD * multiplier;
  const cachedInputCost = cachedInputCostUSD * multiplier;
  const cachedSavings = cachedSavingsUSD * multiplier;
  const totalOutputCost = totalOutputCostUSD * multiplier;
  const totalLlmCost = totalLlmCostUSD * multiplier;
  const toolCost = toolCostUSD * multiplier;
  const retryOverheadCost = retryOverheadCostUSD * multiplier;
  const fixedInfraCost = fixedInfraCostUSD * multiplier;
  const vectorDbCost = vectorDbCostUSD * multiplier;
  const hostingCost = hostingCostUSD * multiplier;
  const otherInfraCost = otherInfraCostUSD * multiplier;

  // 10. Percentage Distribution Breakdown for CSS Visualizer
  const positiveSum = totalInputCost + totalOutputCost + toolCost + fixedInfraCost + retryOverheadCost;
  const percentages = {
    inputTokens: positiveSum > 0 ? Math.round((totalInputCost / positiveSum) * 1000) / 10 : 0,
    outputTokens: positiveSum > 0 ? Math.round((totalOutputCost / positiveSum) * 1000) / 10 : 0,
    toolApis: positiveSum > 0 ? Math.round((toolCost / positiveSum) * 1000) / 10 : 0,
    infrastructure: positiveSum > 0 ? Math.round((fixedInfraCost / positiveSum) * 1000) / 10 : 0,
    retryOverhead: positiveSum > 0 ? Math.round((retryOverheadCost / positiveSum) * 1000) / 10 : 0,
  };

  return {
    currency,
    exchangeRate,

    // Volumes
    agentRunsPerMonth,
    monthlyModelCalls,
    monthlyToolCalls,
    totalInputTokens,
    cachedInputTokens,
    uncachedInputTokens,
    totalOutputTokens,

    // Prices applied per 1M (in USD)
    inputPricePerM,
    outputPricePerM,
    cachedInputPricePerM,

    // Costs (in active currency)
    totalMonthlyCost,
    costPerRun,
    costPer1kRuns,
    annualCost,

    // Breakdown
    totalInputCost,
    uncachedInputCost,
    cachedInputCost,
    cachedSavings,
    totalOutputCost,
    totalLlmCost,
    toolCost,
    retryOverheadCost,
    fixedInfraCost,
    vectorDbCost,
    hostingCost,
    otherInfraCost,

    // Distribution
    percentages,
  };
}

/**
 * Calculates comparative differences between two scenarios.
 *
 * @param {Object} resultA - Result of Scenario A
 * @param {Object} resultB - Result of Scenario B
 * @returns {Object} Delta analysis
 */
export function calculateComparison(resultA, resultB) {
  if (!resultA || !resultB) return null;

  const monthlyDiff = resultB.totalMonthlyCost - resultA.totalMonthlyCost;
  const monthlyPercentDiff =
    resultA.totalMonthlyCost > 0
      ? ((resultB.totalMonthlyCost - resultA.totalMonthlyCost) / resultA.totalMonthlyCost) * 100
      : 0;

  const perRunDiff = resultB.costPerRun - resultA.costPerRun;
  const per1kDiff = resultB.costPer1kRuns - resultA.costPer1kRuns;
  const annualDiff = resultB.annualCost - resultA.annualCost;

  return {
    monthlyDiff,
    monthlyPercentDiff,
    perRunDiff,
    per1kDiff,
    annualDiff,
    isCheaper: monthlyDiff < 0,
    isMoreExpensive: monthlyDiff > 0,
    isEqual: Math.abs(monthlyDiff) < 0.001,
  };
}

/**
 * Formats a monetary number into a localized, user-friendly currency string.
 * Supports sub-penny precision (e.g., $0.0042) for micro per-run metrics.
 *
 * @param {number} amount
 * @param {string} [currency='USD']
 * @returns {string}
 */
export function formatCurrency(amount, currency = 'USD') {
  const safeAmount = Number.isFinite(amount) ? Math.max(0, amount) : 0;
  const symbol = currency === 'INR' ? '₹' : '$';

  // Sub-cent micro pricing (important for per-run cost)
  if (safeAmount > 0 && safeAmount < 0.01) {
    return `${symbol}${safeAmount.toFixed(4)}`;
  }

  const locale = currency === 'INR' ? 'en-IN' : 'en-US';
  return `${symbol}${safeAmount.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Formats large integer counts into clean comma-separated strings.
 * @param {number} num
 * @returns {string}
 */
export function formatNumber(num) {
  const safeNum = Number.isFinite(num) ? Math.round(Math.max(0, num)) : 0;
  return safeNum.toLocaleString('en-US');
}

/**
 * Formats a percentage value.
 * @param {number} num
 * @returns {string}
 */
export function formatPercent(num) {
  const safe = Number.isFinite(num) ? num : 0;
  return `${safe.toFixed(1)}%`;
}
