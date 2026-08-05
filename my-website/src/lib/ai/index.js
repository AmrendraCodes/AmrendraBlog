import { OpenAIProvider } from './providers/openai';
import { ClaudeProvider } from './providers/claude';
import { GeminiProvider } from './providers/gemini';
import { DeepSeekProvider } from './providers/deepseek';
import { GrokProvider } from './providers/grok';
import { OllamaProvider } from './providers/ollama';
import { OpenRouterProvider } from './providers/openrouter';

const providerRegistry = {
  openai: new OpenAIProvider(),
  claude: new ClaudeProvider(),
  gemini: new GeminiProvider(),
  deepseek: new DeepSeekProvider(),
  grok: new GrokProvider(),
  ollama: new OllamaProvider(),
  openrouter: new OpenRouterProvider(),
};

/**
 * Get AI Provider Instance by Name
 */
export function getAIProvider(name = 'openai') {
  const key = name.toLowerCase();
  return providerRegistry[key] || providerRegistry['openai'];
}

/**
 * Executes a prompt completion using default or specified provider
 */
export async function generateCompletion(prompt, options = {}) {
  const provider = getAIProvider(options.provider || 'openai');
  return await provider.generate(prompt, options);
}

/**
 * Executes prompt across multiple AI models simultaneously for comparison
 */
export async function runMultiModelComparison(prompt, providerList = ['openai', 'claude', 'gemini', 'deepseek']) {
  const results = await Promise.allSettled(
    providerList.map(async (name) => {
      const p = getAIProvider(name);
      const res = await p.generate(prompt);
      return {
        provider: p.name,
        model: res.model,
        text: res.text,
      };
    })
  );

  return results.map((r) => (r.status === 'fulfilled' ? r.value : { provider: 'Error', text: 'Execution failed' }));
}

/**
 * Context-aware Article Q&A helper
 */
export async function askArticleAssistant(messages, articleContext = {}, options = {}) {
  const provider = getAIProvider(options.provider || 'openai');
  const userMessage = messages[messages.length - 1]?.content || '';

  const systemContext = `
You are the AI Co-Pilot for "Code with Amrendra".
You are assisting a reader who is currently reading the technical blog post titled: "${articleContext.title || 'Technical Article'}".

Article Context Details:
- Category: ${articleContext.category || 'Engineering'}
- Tags: ${articleContext.tags?.join(', ') || 'N/A'}
- Author: ${articleContext.author || 'Amrendra Kumar'}
- Content Excerpt: "${articleContext.content?.slice(0, 1500) || ''}"

Answer the user's questions clearly, accurately, and concisely using the article context provided. Format your response in Markdown with code blocks where helpful.
`;

  const augmentedPrompt = `${systemContext}\n\nUser Question: ${userMessage}`;
  return await provider.generate(augmentedPrompt, options);
}
