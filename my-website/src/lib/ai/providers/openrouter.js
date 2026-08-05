import { BaseAIProvider } from '../adapter';

export class OpenRouterProvider extends BaseAIProvider {
  constructor(config = {}) {
    super(config);
    this.name = 'OpenRouter';
    this.apiKey = config.apiKey || process.env.OPENROUTER_API_KEY;
    this.defaultModel = config.model || 'auto';
  }

  async generate(prompt, options = {}) {
    const model = options.model || this.defaultModel;
    return {
      text: `[OpenRouter (${model}) Response]: Unified multi-model routing response for: "${prompt.slice(0, 80)}..."`,
      model,
      provider: this.name,
    };
  }

  async chat(messages, options = {}) {
    const lastMsg = messages[messages.length - 1]?.content || '';
    return this.generate(lastMsg, options);
  }
}
