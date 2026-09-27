'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { 
  Bot, 
  Sparkles, 
  Check, 
  Share2, 
  Info,
  Sliders,
  Layers,
  ArrowRight
} from 'lucide-react';
import { AGENT_PRESETS, getPresetById } from '@/data/agentPresetsData';
import { getModelById, getModelsByProvider } from '@/data/modelPricingData';
import { calculateAgentCosts, calculateComparison } from '@/lib/agentCostCalculator';
import CalculatorForm from './CalculatorForm';
import ResultsDashboard from './ResultsDashboard';
import ScenarioComparison from './ScenarioComparison';

const DEFAULT_STATE = {
  currency: 'USD',
  presetId: 'customer-support',
  providerId: 'openai',
  modelId: 'gpt-4o-mini',
  agentRunsPerMonth: 15000,
  callsPerRun: 3,
  inputTokensPerCall: 1800,
  outputTokensPerCall: 400,
  cachedInputPercentage: 35,
  toolsPerRun: 2,
  costPerToolCall: 0.001,
  vectorDbCostPerMonth: 50,
  hostingCostPerMonth: 30,
  otherInfraCostPerMonth: 10,
  numberOfAgents: 1,
  retryOverheadPercentage: 5,
  customInputPricePerM: 1.0,
  customOutputPricePerM: 3.0,
  customCachedPricePerM: 0.5,
};

export default function AiAgentCostCalculatorClient() {
  const [inputs, setInputs] = useState(DEFAULT_STATE);
  const [activePresetId, setActivePresetId] = useState('customer-support');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [scenarioB, setScenarioB] = useState({
    ...DEFAULT_STATE,
    providerId: 'anthropic',
    modelId: 'claude-3-5-haiku',
  });
  const [shareToast, setShareToast] = useState(false);

  // Analytics tracking refs
  const hasStartedRef = useRef(false);
  const debounceTimerRef = useRef(null);

  // Safe tracking helper
  const trackEvent = useCallback((eventName, params = {}) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  }, []);

  // Hydrate inputs from URL query parameters if present (without affecting canonical SEO)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const urlRuns = searchParams.get('runs');
      const urlModel = searchParams.get('model');
      const urlProvider = searchParams.get('provider');
      const urlCurr = searchParams.get('curr');

      if (urlRuns || urlModel || urlProvider) {
        setInputs((prev) => ({
          ...prev,
          agentRunsPerMonth: urlRuns ? Math.max(0, Number(urlRuns)) : prev.agentRunsPerMonth,
          modelId: urlModel || prev.modelId,
          providerId: urlProvider || prev.providerId,
          currency: urlCurr && ['USD', 'INR'].includes(urlCurr.toUpperCase()) ? urlCurr.toUpperCase() : prev.currency,
        }));
        setActivePresetId('custom');
      }
    } catch {
      // Ignore URL parsing errors
    }
  }, []);

  // Update inputs and trigger tracking
  const handleInputChange = (delta) => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      trackEvent('agent_cost_calculator_started');
    }

    setInputs((prev) => {
      const next = { ...prev, ...delta };
      return next;
    });

    // Debounced calculation event (1.5s after user stops typing)
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      trackEvent('agent_cost_calculated', {
        provider: inputs.providerId,
        model: inputs.modelId,
        agent_runs: inputs.agentRunsPerMonth,
      });
    }, 1500);
  };

  // Preset Selection
  const handleSelectPreset = (preset) => {
    setActivePresetId(preset.id);
    setInputs((prev) => ({
      ...prev,
      presetId: preset.id,
      ...preset.defaults,
    }));
    trackEvent('agent_preset_selected', { preset_id: preset.id });
  };

  // Reset to default
  const handleReset = () => {
    const defaultPreset = getPresetById('customer-support');
    setActivePresetId('customer-support');
    setInputs({
      ...DEFAULT_STATE,
      ...defaultPreset.defaults,
    });
  };

  // Advanced drawer toggle tracking
  const handleToggleAdvanced = (val) => {
    setIsAdvancedOpen(val);
    if (val) {
      trackEvent('advanced_settings_opened');
    }
  };

  // Selected Models Configuration
  const selectedModelA = useMemo(() => getModelById(inputs.modelId), [inputs.modelId]);
  const selectedModelB = useMemo(() => getModelById(scenarioB.modelId), [scenarioB.modelId]);

  // Primary Calculation Results
  const resultA = useMemo(() => {
    return calculateAgentCosts(inputs, selectedModelA, inputs.currency);
  }, [inputs, selectedModelA]);

  // Scenario B Calculation Results
  const resultB = useMemo(() => {
    return calculateAgentCosts(scenarioB, selectedModelB, inputs.currency);
  }, [scenarioB, selectedModelB, inputs.currency]);

  // Comparative Variance Analysis
  const comparison = useMemo(() => {
    return calculateComparison(resultA, resultB);
  }, [resultA, resultB]);

  // Copy shareable link with query parameters
  const handleShare = () => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('provider', inputs.providerId);
    url.searchParams.set('model', inputs.modelId);
    url.searchParams.set('runs', inputs.agentRunsPerMonth);
    url.searchParams.set('curr', inputs.currency);

    navigator.clipboard.writeText(url.toString());
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
    trackEvent('calculator_share_link_copied');
  };

  // Clone A to B
  const handleCloneFromA = () => {
    setScenarioB({ ...inputs });
  };

  // Enable Scenario Comparison
  const handleOpenComparison = () => {
    setIsComparing(true);
    // Suggest a contrasting model by default (e.g. Anthropic Haiku or DeepSeek)
    setScenarioB({
      ...inputs,
      providerId: inputs.providerId === 'openai' ? 'anthropic' : 'openai',
      modelId: inputs.providerId === 'openai' ? 'claude-3-5-haiku' : 'gpt-4o-mini',
    });
    trackEvent('scenario_compared');
  };

  return (
    <div className="w-full space-y-8">
      
      {/* ─── Workload Presets Bar ─── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Sparkles size={14} className="text-[#F59E0B]" />
            <span>Select Common Agent Workload Presets:</span>
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Presets populate baseline assumptions; all inputs remain fully editable.
          </span>
        </div>

        {/* Scrollable Preset Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {AGENT_PRESETS.map((preset) => {
            const isSelected = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`min-h-[44px] px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 border select-none shrink-0 ${
                  isSelected
                    ? 'bg-[#F59E0B] text-[#0B1F3A] border-[#F59E0B] shadow-md shadow-amber-500/20 font-extrabold'
                    : 'bg-white dark:bg-[#0B1F3A]/70 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#1E293B] hover:border-[#F59E0B]/40 hover:text-slate-900 dark:hover:text-white'
                }`}
                aria-pressed={isSelected}
              >
                <span>{preset.name}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-[#0B1F3A]/20 text-[#0B1F3A]'
                      : 'bg-slate-100 dark:bg-[#112240] text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {preset.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Main 2-Column Responsive Workspace ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left Column (Inputs & Advanced Sliders) */}
        <div className="lg:col-span-7">
          <CalculatorForm
            inputs={inputs}
            onChange={handleInputChange}
            onReset={handleReset}
            selectedModel={selectedModelA}
            isAdvancedOpen={isAdvancedOpen}
            setIsAdvancedOpen={handleToggleAdvanced}
          />
        </div>

        {/* Right Column (Live Results Dashboard) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <ResultsDashboard
            result={resultA}
            currency={inputs.currency}
            selectedModel={selectedModelA}
            onShare={handleShare}
            onOpenComparison={handleOpenComparison}
            isComparing={isComparing}
          />
        </div>

      </div>

      {/* ─── Scenario Comparison Section ─── */}
      {isComparing && (
        <ScenarioComparison
          scenarioA={inputs}
          scenarioB={scenarioB}
          resultA={resultA}
          resultB={resultB}
          comparison={comparison}
          currency={inputs.currency}
          modelA={selectedModelA}
          modelB={selectedModelB}
          onUpdateScenarioB={(delta) => setScenarioB((prev) => ({ ...prev, ...delta }))}
          onCloneFromA={handleCloneFromA}
          onClose={() => setIsComparing(false)}
        />
      )}

      {/* ─── Temporary Toast Notification for URL Share ─── */}
      {shareToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-semibold animate-fade-in border border-amber-500/50">
          <Check size={16} className="text-emerald-400" />
          <span>Calculator configuration link copied to clipboard!</span>
        </div>
      )}

    </div>
  );
}
