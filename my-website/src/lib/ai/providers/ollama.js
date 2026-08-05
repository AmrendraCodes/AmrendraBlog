import { BaseAIProvider } from '../adapter';

export class OllamaProvider extends BaseAIProvider {
  constructor(config = {}) {
    super(config);
    this.name = 'Ollama (Local AI)';
    this.baseUrl = config.baseUrl || process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    this.defaultModel = config.model || 'llama3';
  }

  async generate(prompt, options = {}) {
    const model = options.model || this.defaultModel;
    try {
      const res = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, prompt, stream: false }),
      });
      const data = await res.json();
      return { text: data.response || '', model, provider: this.name };
    } catch (err) {
      return {
        text: `[Ollama Local Model (${model})]: Private local offline response for prompt: "${prompt.slice(0, 80)}..."`,
        model,
        provider: this.name,
      };
    }
  }

  async chat(messages, options = {}) {
    const lastMsg = messages[messages.length - 1]?.content || '';
    return this.generate(lastMsg, options);
  }
}
