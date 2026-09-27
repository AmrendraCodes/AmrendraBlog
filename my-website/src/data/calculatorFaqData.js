/**
 * Curated FAQ data for the AI Agent Cost Calculator.
 * Used by both server-side schema generation (getFAQSchema) and client-side interactive FAQ accordion.
 */

export const CALCULATOR_FAQS = [
  {
    question: 'How do model calls differ from agent runs?',
    answer:
      'An agent run represents a complete end-to-end task (e.g. resolving a customer ticket or auditing a GitHub pull request). Unlike a simple chatbot which makes a single LLM call per prompt, an autonomous agent frequently executes 3 to 10 sequential model calls during a single run to decompose the goal, call search tools, evaluate errors, and synthesize the final outcome.',
  },
  {
    question: 'What is prompt caching and how does it lower AI agent costs?',
    answer:
      'Prompt caching allows LLM providers (like Anthropic, OpenAI, and Google Gemini) to reuse pre-computed attention states for static prefixes, such as extensive system prompts, tool schema definitions, and persistent memory context. Caching reduces input token billing by up to 50% to 90% for subsequent calls sharing identical context.',
  },
  {
    question: 'Why do tool and API calls need separate cost tracking in an agent budget?',
    answer:
      'Agents do not operate in a vacuum—they invoke third-party services such as web search APIs (Tavily, Serper), web scraping endpoints, database lookups, and code sandboxes. At high monthly execution volumes, these external API invocation fees can match or exceed raw LLM token costs.',
  },
  {
    question: 'How should I budget for agent retry overhead and failure loops?',
    answer:
      'Production agents face schema validation errors, hallucinated tool arguments, and temporary network timeouts. Production architectures typically experience a 5% to 15% execution buffer due to error handling loops and retries. Budgeting for this overhead ensures your forecast reflects true production bills.',
  },
  {
    question: 'What infrastructure costs are needed beyond model tokens?',
    answer:
      'Running production agents requires supporting infrastructure: vector databases for long-term semantic memory (e.g., Pinecone, Qdrant, Milvus), cloud compute or serverless worker pools for long-running workflows, and observability/tracing tooling (e.g., Langfuse, Helicone) to monitor latency and token anomalies.',
  },
  {
    question: 'Can I calculate costs for self-hosted or open-source models like Llama or Mistral?',
    answer:
      'Yes. Select "Custom Model / Manual Pricing" from the provider dropdown. You can enter the effective token rates provided by serverless hosting providers (like Groq, Together AI, or Fireworks) or input your amortized GPU instance hourly rates divided by token throughput.',
  },
];
