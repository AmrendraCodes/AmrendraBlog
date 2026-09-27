/**
 * Common Agent Workload Presets
 * 
 * Presets pre-populate baseline usage assumptions for common agent architectures.
 * Note: These values serve as initial architectural estimates; all parameters
 * remain 100% editable by the user.
 */

export const AGENT_PRESETS = [
  {
    id: 'customer-support',
    name: 'Customer Support Agent',
    badge: 'High Volume',
    tagline: 'Ticket triage, FAQ resolution, CRM lookups, and canned responses.',
    description: 'Frequent short interactions with 2-3 LLM calls per run and CRM/ticketing tool calls.',
    defaults: {
      providerId: 'openai',
      modelId: 'gpt-4o-mini',
      agentRunsPerMonth: 15000,
      callsPerRun: 3,
      inputTokensPerCall: 1800,
      outputTokensPerCall: 400,
      cachedInputPercentage: 35, // Repeated system prompt and company docs
      toolsPerRun: 2, // e.g., CRM user fetch + order status
      costPerToolCall: 0.001,
      vectorDbCostPerMonth: 50, // Pinecone / Qdrant basic tier
      hostingCostPerMonth: 30, // Background worker / serverless
      otherInfraCostPerMonth: 10,
      numberOfAgents: 1,
      retryOverheadPercentage: 5,
    },
  },
  {
    id: 'research-agent',
    name: 'Deep Research Agent',
    badge: 'Multi-Step',
    tagline: 'Web scraping, synthesis, report generation, and multi-source cross-checking.',
    description: 'Longer context windows, multiple iterations per run, web search API overhead.',
    defaults: {
      providerId: 'anthropic',
      modelId: 'claude-3-5-sonnet',
      agentRunsPerMonth: 1500,
      callsPerRun: 7,
      inputTokensPerCall: 4500,
      outputTokensPerCall: 1200,
      cachedInputPercentage: 20,
      toolsPerRun: 5, // Search APIs (Tavily/Serper), markdown scraper
      costPerToolCall: 0.005,
      vectorDbCostPerMonth: 70,
      hostingCostPerMonth: 40,
      otherInfraCostPerMonth: 20,
      numberOfAgents: 1,
      retryOverheadPercentage: 8,
    },
  },
  {
    id: 'coding-agent',
    name: 'Autonomous Coding Agent',
    badge: 'Code & Reasoning',
    tagline: 'PR reviews, test generation, bug fixing, and codebase refactoring.',
    description: 'Heavy code contexts, compiler/linter feedback loops, and reasoning models.',
    defaults: {
      providerId: 'anthropic',
      modelId: 'claude-3-5-sonnet',
      agentRunsPerMonth: 3000,
      callsPerRun: 6,
      inputTokensPerCall: 6500,
      outputTokensPerCall: 1000,
      cachedInputPercentage: 45, // Codebase AST & repository context cached
      toolsPerRun: 4, // Git commands, terminal sandbox execution, test runner
      costPerToolCall: 0.002,
      vectorDbCostPerMonth: 30,
      hostingCostPerMonth: 50, // Sandbox container runners
      otherInfraCostPerMonth: 15,
      numberOfAgents: 1,
      retryOverheadPercentage: 10,
    },
  },
  {
    id: 'sales-outreach',
    name: 'Sales & Lead Outreach Agent',
    badge: 'Outbound',
    tagline: 'Prospect qualification, LinkedIn/Email drafting, and CRM data enrichment.',
    description: 'Lightweight agent focused on personalization data aggregation and copy drafting.',
    defaults: {
      providerId: 'openai',
      modelId: 'gpt-4o-mini',
      agentRunsPerMonth: 6000,
      callsPerRun: 2,
      inputTokensPerCall: 1400,
      outputTokensPerCall: 350,
      cachedInputPercentage: 15,
      toolsPerRun: 2, // Clearbit/Apollo enrichment + CRM update
      costPerToolCall: 0.008,
      vectorDbCostPerMonth: 0,
      hostingCostPerMonth: 20,
      otherInfraCostPerMonth: 5,
      numberOfAgents: 1,
      retryOverheadPercentage: 3,
    },
  },
  {
    id: 'rag-knowledge-base',
    name: 'Enterprise RAG Agent',
    badge: 'Document Q&A',
    tagline: 'Internal handbook search, customer documentation retrieval, and compliance queries.',
    description: 'Semantic vector retrieval, chunk reranking, and citation-grounded answers.',
    defaults: {
      providerId: 'google',
      modelId: 'gemini-2-0-flash',
      agentRunsPerMonth: 20000,
      callsPerRun: 2,
      inputTokensPerCall: 3200,
      outputTokensPerCall: 450,
      cachedInputPercentage: 50, // High cache hit on static docs
      toolsPerRun: 1, // Vector DB search
      costPerToolCall: 0.0005,
      vectorDbCostPerMonth: 100, // Managed vector index
      hostingCostPerMonth: 45,
      otherInfraCostPerMonth: 15,
      numberOfAgents: 1,
      retryOverheadPercentage: 4,
    },
  },
  {
    id: 'custom',
    name: 'Custom Agent Workload',
    badge: 'Configurable',
    tagline: 'Design and test custom specifications from scratch.',
    description: 'Full manual control over all token metrics, multi-agent calls, tools, and infrastructure.',
    defaults: {
      providerId: 'openai',
      modelId: 'gpt-4o-mini',
      agentRunsPerMonth: 10000,
      callsPerRun: 4,
      inputTokensPerCall: 2000,
      outputTokensPerCall: 500,
      cachedInputPercentage: 0,
      toolsPerRun: 1,
      costPerToolCall: 0.001,
      vectorDbCostPerMonth: 0,
      hostingCostPerMonth: 0,
      otherInfraCostPerMonth: 0,
      numberOfAgents: 1,
      retryOverheadPercentage: 5,
    },
  },
];

/**
 * Returns a preset object by ID.
 * @param {string} presetId
 */
export function getPresetById(presetId) {
  return AGENT_PRESETS.find((p) => p.id === presetId) || AGENT_PRESETS[AGENT_PRESETS.length - 1];
}
