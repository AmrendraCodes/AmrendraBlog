/**
 * Base AI Provider Abstract Interface
 * Every AI Provider (OpenAI, Claude, Gemini, DeepSeek, Grok, Ollama, OpenRouter)
 * implements this unified adapter interface.
 */

export class BaseAIProvider {
  constructor(config = {}) {
    this.config = config;
    this.name = 'base-provider';
  }

  /**
   * Generates a single prompt completion
   */
  async generate(prompt, options = {}) {
    throw new Error(`generate() not implemented for provider ${this.name}`);
  }

  /**
   * Streams completion tokens via callback
   */
  async stream(prompt, onChunk, options = {}) {
    throw new Error(`stream() not implemented for provider ${this.name}`);
  }

  /**
   * Handles multi-turn chat conversations
   */
  async chat(messages, options = {}) {
    throw new Error(`chat() not implemented for provider ${this.name}`);
  }

  /**
   * Generates vector embeddings for text
   */
  async embeddings(text) {
    throw new Error(`embeddings() not implemented for provider ${this.name}`);
  }

  /**
   * Summarizes long technical text
   */
  async summarize(text, options = {}) {
    const prompt = `Provide a concise, high-impact technical summary with bullet points for the following content:\n\n${text}`;
    const res = await this.generate(prompt, options);
    return res.text;
  }

  /**
   * Explains technical code blocks
   */
  async explainCode(code, language = 'javascript') {
    const prompt = `Analyze and explain the following ${language} code for a developer. Explain its architecture, complexity, and key functions:\n\`\`\`${language}\n${code}\n\`\`\``;
    const res = await this.generate(prompt);
    return res.text;
  }
}
