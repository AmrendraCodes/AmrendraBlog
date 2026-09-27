/**
 * Centralized Model Pricing & Provider Registry
 * 
 * Provides benchmark token pricing per 1,000,000 (1M) tokens.
 * All base rates are represented in USD ($).
 * 
 * Note: Model API rates evolve over time. These figures represent published benchmark
 * standard rates. Users can always select "Custom Model / Manual Pricing" to input their exact
 * contract or newly released model prices.
 */

export const DEFAULT_USD_TO_INR_RATE = 86.5;

export const SUPPORTED_CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rateFromUsd: 1 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rateFromUsd: DEFAULT_USD_TO_INR_RATE },
];

export const AI_PROVIDERS = [
  {
    id: 'openai',
    name: 'OpenAI',
    badge: 'Popular',
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    badge: 'Coding & Reasoning',
  },
  {
    id: 'google',
    name: 'Google Gemini',
    badge: 'Large Context',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    badge: 'Budget-Efficient',
  },
  {
    id: 'custom',
    name: 'Custom / Manual Pricing',
    badge: 'User Defined',
  },
];

export const MODEL_PRICING_REGISTRY = [
  // ─── OpenAI Models ───
  {
    id: 'gpt-4o',
    name: 'GPT-4o (Omni)',
    providerId: 'openai',
    inputPricePerM: 2.50,
    outputPricePerM: 10.00,
    cachedInputPricePerM: 1.25,
    contextWindow: '128K',
    description: 'High-intelligence flagship model for complex multi-step agent reasoning.',
    lastUpdated: 'Sep 2026',
    isBenchmark: true,
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    providerId: 'openai',
    inputPricePerM: 0.15,
    outputPricePerM: 0.60,
    cachedInputPricePerM: 0.075,
    contextWindow: '128K',
    description: 'Fast, lightweight model optimal for high-volume routine agent tasks.',
    lastUpdated: 'Sep 2026',
    isBenchmark: true,
  },
  {
    id: 'o1',
    name: 'OpenAI o1',
    providerId: 'openai',
    inputPricePerM: 15.00,
    outputPricePerM: 60.00,
    cachedInputPricePerM: 7.50,
    contextWindow: '200K',
    description: 'Deep reasoning model for math, coding architectures, and hard logic.',
    lastUpdated: 'Sep 2026',
    isBenchmark: true,
  },
  {
    id: 'o3-mini',
    name: 'OpenAI o3-mini',
    providerId: 'openai',
    inputPricePerM: 1.10,
    outputPricePerM: 4.40,
    cachedInputPricePerM: 0.55,
    contextWindow: '200K',
    description: 'Cost-efficient STEM and code reasoning with configurable effort levels.',
    lastUpdated: 'Sep 2026',
    isBenchmark: true,
  },

  // ─── Anthropic Models ───
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    providerId: 'anthropic',
    inputPricePerM: 3.00,
    outputPricePerM: 15.00,
    cachedInputPricePerM: 0.30, // Prompt caching write 3.75, read 0.30 (standard read rate)
    contextWindow: '200K',
    description: 'Industry benchmark for autonomous coding, tool orchestration, and analysis.',
    lastUpdated: 'Sep 2026',
    isBenchmark: true,
  },
  {
    id: 'claude-3-5-haiku',
    name: 'Claude 3.5 Haiku',
    providerId: 'anthropic',
    inputPricePerM: 0.80,
    outputPricePerM: 4.00,
    cachedInputPricePerM: 0.08,
    contextWindow: '200K',
    description: 'Near-instant responsiveness with high coding and tool competence.',
    lastUpdated: 'Sep 2026',
    isBenchmark: true,
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    providerId: 'anthropic',
    inputPricePerM: 15.00,
    outputPricePerM: 75.00,
    cachedInputPricePerM: 1.50,
    contextWindow: '200K',
    description: 'Deep analytical model for nuanced text synthesis and high-stakes reasoning.',
    lastUpdated: 'Sep 2026',
    isBenchmark: true,
  },

  // ─── Google Gemini Models ───
  {
    id: 'gemini-2-0-flash',
    name: 'Gemini 2.0 Flash',
    providerId: 'google',
    inputPricePerM: 0.10,
    outputPricePerM: 0.40,
    cachedInputPricePerM: 0.025,
    contextWindow: '1M',
    description: 'Ultra-fast multimodal agent model with native tool call integration.',
    lastUpdated: 'Sep 2026',
    isBenchmark: true,
  },
  {
    id: 'gemini-1-5-pro',
    name: 'Gemini 1.5 Pro',
    providerId: 'google',
    inputPricePerM: 1.25,
    outputPricePerM: 5.00,
    cachedInputPricePerM: 0.3125,
    contextWindow: '2M',
    description: 'Massive 2M context window ideal for repository-wide or document analysis.',
    lastUpdated: 'Sep 2026',
    isBenchmark: true,
  },
  {
    id: 'gemini-1-5-flash',
    name: 'Gemini 1.5 Flash',
    providerId: 'google',
    inputPricePerM: 0.075,
    outputPricePerM: 0.30,
    cachedInputPricePerM: 0.01875,
    contextWindow: '1M',
    description: 'High-speed, extremely economical workhorse for agent pipelines.',
    lastUpdated: 'Sep 2026',
    isBenchmark: true,
  },

  // ─── DeepSeek Models ───
  {
    id: 'deepseek-v3',
    name: 'DeepSeek-V3',
    providerId: 'deepseek',
    inputPricePerM: 0.14,
    outputPricePerM: 0.28,
    cachedInputPricePerM: 0.014,
    contextWindow: '64K',
    description: 'High performance MoE architecture with ultra-low token economics.',
    lastUpdated: 'Sep 2026',
    isBenchmark: true,
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek-R1',
    providerId: 'deepseek',
    inputPricePerM: 0.55,
    outputPricePerM: 2.19,
    cachedInputPricePerM: 0.14,
    contextWindow: '64K',
    description: 'Open reasoning model with chain-of-thought verification capabilities.',
    lastUpdated: 'Sep 2026',
    isBenchmark: true,
  },

  // ─── Custom / Manual Pricing ───
  {
    id: 'custom-model',
    name: 'Custom Model / Manual Pricing',
    providerId: 'custom',
    inputPricePerM: 1.00,
    outputPricePerM: 3.00,
    cachedInputPricePerM: 0.50,
    contextWindow: 'Custom',
    description: 'Specify your own custom API token rates for proprietary, open-weights, or newly announced models.',
    lastUpdated: 'Real-time',
    isBenchmark: false,
  },
];

/**
 * Returns all models matching a specific provider ID.
 * @param {string} providerId
 */
export function getModelsByProvider(providerId) {
  return MODEL_PRICING_REGISTRY.filter((m) => m.providerId === providerId);
}

/**
 * Finds a model configuration by its ID, falling back to GPT-4o Mini if not found.
 * @param {string} modelId
 */
export function getModelById(modelId) {
  return (
    MODEL_PRICING_REGISTRY.find((m) => m.id === modelId) ||
    MODEL_PRICING_REGISTRY.find((m) => m.id === 'gpt-4o-mini')
  );
}
