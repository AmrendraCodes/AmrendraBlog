export const TOOL_CATEGORIES = [
  "All",
  "AI & LLMs",
  "Developer Utilities",
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
    description: "Calculate estimated monthly and yearly costs for AI agents and LLM API calls based on token usage, model pricing, and execution frequency.",
    category: "AI & LLMs",
    badge: "New",
    semanticBadge: "new", // Genuine & factual
    iconName: "Bot",
    tags: ["AI Agents", "LLMs", "Token Pricing", "Cost Estimator"],
    status: "ready",
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
  {
    id: "free-json-validator",
    title: "Free JSON Validator",
    slug: "free-json-validator",
    description: "Validate, format, and inspect JSON data in real time with clear error pointers, tree viewing, and clean syntax formatting.",
    category: "Developer Utilities",
    badge: "Free Online",
    semanticBadge: "free", // Factual & honest
    iconName: "FileCode2",
    tags: ["JSON", "Validator", "Formatter", "Tree View"],
    status: "ready",
    featured: true,
    updatedAt: "Sep 2026",
    actionText: "Open Tool",
    highlights: [
      "Real-time syntax validation with line & column error markers",
      "Prettify, format, or compact JSON strings in one click",
      "Interactive collapsible object & array inspection",
      "100% in-browser processing — your JSON never leaves your machine",
    ],
  },
];
