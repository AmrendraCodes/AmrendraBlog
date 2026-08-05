import { NextResponse } from 'next/server';
import { askArticleAssistant } from '@/lib/ai';

export async function POST(request) {
  try {
    const { messages, articleContext, provider, action } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    // Custom quick actions (e.g. "summarize", "quiz", "beginner", "architecture")
    let promptPrefix = '';
    if (action === 'summarize') promptPrefix = 'Provide a high-impact technical summary with key takeaways for this article.';
    else if (action === 'beginner') promptPrefix = 'Explain the core concepts in this article as if I am a complete beginner.';
    else if (action === 'quiz') promptPrefix = 'Generate 3 technical quiz questions with answers based on this article.';
    else if (action === 'architecture') promptPrefix = 'Generate a Mermaid JS diagram code representing the architecture or workflow described in this article.';

    const processedMessages = [...messages];
    if (promptPrefix) {
      processedMessages.push({ role: 'user', content: promptPrefix });
    }

    const response = await askArticleAssistant(processedMessages, articleContext || {}, { provider });

    return NextResponse.json({
      success: true,
      message: response.text,
      model: response.model,
      provider: response.provider,
    });
  } catch (error) {
    console.error('AI Chat API error:', error);
    return NextResponse.json({ error: 'Failed to process AI chat request' }, { status: 500 });
  }
}
