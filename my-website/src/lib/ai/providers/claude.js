import { BaseAIProvider } from '../adapter';

export class ClaudeProvider extends BaseAIProvider {
  constructor(config = {}) {
    super(config);
    this.name = 'Anthropic Claude';
    this.apiKey = config.apiKey || process.env.ANTHROPIC_API_KEY;
    this.defaultModel = config.model || 'claude-3-5-sonnet-20241022';
  }

  async generate(prompt, options = {}) {
    const model = options.model || this.defaultModel;
    return {
      text: `[Claude 3.5 Sonnet Response]: Architectural deep-dive for "${prompt.slice(0, 80)}...". Claude provides high-precision code reasoning and structured technical explanations.`,
      model,
      provider: this.name,
    };
  }

  async chat(messages, options = {}) {
    const lastMsg = messages[messages.length - 1]?.content || '';
    return this.generate(lastMsg, options);
  }
}
