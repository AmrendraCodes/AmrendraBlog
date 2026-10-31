export const TOOL_CATEGORY_CONFIG = [
  { id: "seo", title: "SEO Tools", iconName: "Search" },
  { id: "developer", title: "Developer Tools", iconName: "Code2" },
  { id: "ai-llm", title: "AI & LLM Tools", iconName: "Sparkles" },
];

export const TOOL_CATEGORIES = [
  "All",
  ...TOOL_CATEGORY_CONFIG.map((category) => category.title),
];

export const SORT_OPTIONS = [
  { label: "Default", value: "default" },
  { label: "Newest First", value: "newest" },
  { label: "Alphabetical (A-Z)", value: "alphabetical" },
];

export const TOOLS_DATA = [
  {
    id: "ai-agent-cost-calculator",
    title: "AI Agent Cost Calculator",
    slug: "ai-agent-cost-calculator",
    route: "/tools/ai-agent-cost-calculator",
    description: "Calculate estimated monthly and yearly costs for AI agents and LLM API calls based on token usage, model pricing, and execution frequency.",
    mainCategory: "AI & LLM Tools",
    subcategory: "AI Utilities",
    subcategoryIconName: "Calculator",
    badge: "New",
    semanticBadge: "new", // Genuine & factual
    iconName: "Bot",
    tags: ["AI Agents", "LLMs", "Token Pricing", "Cost Estimator"],
    status: "ready",
    availabilityStatus: "published",
    featured: true,
    updatedAt: "Sep 2026",
    actionText: "Open Tool",
    highlights: [
      "Token usage & context window cost estimation",
      "Dynamic model comparison across major LLM providers",
      "Monthly & yearly budget forecasting for autonomous agents",
      "100% private, client-side execution",
    ],
  },
];

export const PUBLISHED_TOOLS = TOOLS_DATA.filter(
  (tool) => tool.availabilityStatus === "published",
);
