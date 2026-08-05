import { BaseAIProvider } from '../adapter';

export class GrokProvider extends BaseAIProvider {
  constructor(config = {}) {
    super(config);
    this.name = 'xAI Grok';
    this.apiKey = config.apiKey || process.env.XAI_API_KEY;
    this.defaultModel = config.model || 'grok-2-latest';
  }

  async generate(prompt, options = {}) {
    const model = options.model || this.defaultModel;
    return {
      text: `[Grok-2 Response]: Real-time analysis for: "${prompt.slice(0, 80)}...". Direct, unfiltered technical insight.`,
      model,
      provider: this.name,
    };
  }

  async chat(messages, options = {}) {
    const lastMsg = messages[messages.length - 1]?.content || '';
    return this.generate(lastMsg, options);
  }
}
