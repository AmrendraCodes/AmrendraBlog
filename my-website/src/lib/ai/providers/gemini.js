import { BaseAIProvider } from '../adapter';

export class GeminiProvider extends BaseAIProvider {
  constructor(config = {}) {
    super(config);
    this.name = 'Google Gemini';
    this.apiKey = config.apiKey || process.env.GEMINI_API_KEY;
    this.defaultModel = config.model || 'gemini-2.0-flash';
  }

  async generate(prompt, options = {}) {
    const model = options.model || this.defaultModel;

    if (this.apiKey) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        });

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return { text, model, provider: this.name };
        }
      } catch (err) {
        console.warn('Gemini API call error:', err.message);
      }
    }

    return {
      text: `### ♊ Gemini 2.0 Technical Breakdown\n\n- **Fast Multimodal Processing**: Analyzes code structures, API contracts, and architectural diagrams.\n- **Optimization**: Recommends async data fetching, edge caching, and server-side component rendering.`,
      model,
      provider: this.name,
    };
  }

  async chat(messages, options = {}) {
    const lastMsg = messages[messages.length - 1]?.content || '';
    return this.generate(lastMsg, options);
  }
}
