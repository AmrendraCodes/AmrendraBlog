import { NextResponse } from 'next/server';
import { runMultiModelComparison } from '@/lib/ai';

export async function POST(request) {
  try {
    const { prompt, providers } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const providerList = Array.isArray(providers) && providers.length > 0
      ? providers
      : ['openai', 'claude', 'gemini', 'deepseek'];

    const results = await runMultiModelComparison(prompt, providerList);

    return NextResponse.json({
      success: true,
      prompt,
      results,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to run multi-model comparison' }, { status: 500 });
  }
}
