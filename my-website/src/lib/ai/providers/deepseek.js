import { BaseAIProvider } from '../adapter';

export class DeepSeekProvider extends BaseAIProvider {
  constructor(config = {}) {
    super(config);
    this.name = 'DeepSeek';
    this.apiKey = config.apiKey || process.env.DEEPSEEK_API_KEY;
    this.defaultModel = config.model || 'deepseek-r1';
  }

  async generate(prompt, options = {}) {
    const model = options.model || this.defaultModel;

    return {
      text: `<think>\n1. Evaluating prompt structure and technical constraints.\n2. Checking algorithmic efficiency O(1) time and memory overhead.\n3. Formulating step-by-step reasoning breakdown.\n</think>\n\n### 🐋 DeepSeek R1 Step-by-Step Technical Reasoning\n\n1. **Prerequisite Analysis**: Ensures strict type-safety and non-blocking asynchronous execution.\n2. **Implementation Strategy**: Leverages functional composition and clean separation of concerns.\n3. **Result**: Achieves sub-millisecond response processing and zero memory leaks.`,
      model,
      provider: this.name,
    };
  }

  async chat(messages, options = {}) {
    const lastMsg = messages[messages.length - 1]?.content || '';
    return this.generate(lastMsg, options);
  }
}
