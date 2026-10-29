/**
 * Public tool catalog. A published entry must point to an implemented route and
 * carry stable metadata used by the directory, page metadata, and sitemap.
 */
export const TOOL_CATEGORIES = [
  "All",
  "AI & LLM Tools",
  "SEO Tools",
  "Developer Utilities",
  "Content & Writing Tools",
  "Business & Marketing Tools",
  "Web & Technical SEO",
];

export const SORT_OPTIONS = [
  { label: "Default", value: "default" },
  { label: "Newest First", value: "newest" },
  { label: "Name (A–Z)", value: "alphabetical" },
];

export const TOOLS_DATA = [
  {
    id: "ai-agent-cost-calculator",
    title: "AI Agent Cost Calculator",
    slug: "ai-agent-cost-calculator",
    route: "/tools/ai-agent-cost-calculator",
    description: "Calculate estimated monthly and yearly costs for AI agents and LLM API calls based on token usage, model pricing, and execution frequency.",
    category: "AI & LLM Tools",
    badge: "New",
    semanticBadge: "new",
    iconName: "Bot",
    tags: ["AI Agents", "LLMs", "Token Pricing", "Cost Estimator"],
    status: "published",
    featured: true,
    createdAt: "2026-09",
    updatedAt: "2026-09",
    actionText: "Open Tool",
    seo: {
      title: "AI Agent Cost Calculator – Estimate LLM & Agent Costs | Code with Amrendra",
      description: "Calculate the estimated cost of running autonomous AI agents based on model pricing, multi-call loops, token usage, tool APIs, and cloud infrastructure.",
    },
    implementation: "@/components/tools/ai-agent-cost-calculator/AiAgentCostCalculatorClient",
    highlights: [
      "Token usage & context window cost estimation",
      "Dynamic model comparison across major LLM providers",
      "Monthly & yearly budget forecasting for autonomous agents",
      "100% private, client-side execution",
    ],
  },
  {
    id: "free-json-validator",
    title: "Free JSON Validator",
    slug: "free-json-validator",
    route: "/tools/free-json-validator",
    description: "Validate, format, and compact JSON data in your browser with clear syntax errors. Your data stays on your device.",
    category: "Developer Utilities",
    badge: "Free Online",
    semanticBadge: "free",
    iconName: "FileCode2",
    tags: ["JSON", "Validator", "Formatter", "Developer Utilities"],
    status: "published",
    featured: true,
    createdAt: "2026-09",
    updatedAt: "2026-09",
    actionText: "Open Tool",
    seo: {
      title: "Free JSON Validator & Formatter | Code with Amrendra",
      description: "Validate JSON, find syntax errors, and format or compact data in your browser. No signup and no data uploads.",
    },
    implementation: "@/components/tools/JsonValidatorClient",
    highlights: [
      "Validate JSON with useful line and column error locations",
      "Format or compact valid JSON in one click",
      "Copy the result or download it as a JSON file",
      "All processing happens locally in your browser",
    ],
  },
];

export const PUBLISHED_TOOLS = TOOLS_DATA.filter((tool) => tool.status === "published");
export const getToolBySlug = (slug) => PUBLISHED_TOOLS.find((tool) => tool.slug === slug);
export const getToolByRoute = (route) => PUBLISHED_TOOLS.find((tool) => tool.route === route);
export const getToolLastModified = (tool) => new Date(tool.updatedAt || tool.createdAt);
