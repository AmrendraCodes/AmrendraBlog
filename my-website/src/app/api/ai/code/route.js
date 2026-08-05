import { NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai';

export async function POST(request) {
  try {
    const { code, action, language = 'javascript', provider = 'openai' } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const ai = getAIProvider(provider);
    let prompt = '';

    if (action === 'explain') {
      prompt = `Explain the following ${language} code clearly for a software engineer:\n\`\`\`${language}\n${code}\n\`\`\``;
    } else if (action === 'optimize') {
      prompt = `Optimize the following ${language} code for maximum performance, readability, and clean code principles. Provide the improved code and list key changes:\n\`\`\`${language}\n${code}\n\`\`\``;
    } else if (action === 'debug') {
      prompt = `Debug the following ${language} code. Identify bugs, edge cases, and potential runtime failures:\n\`\`\`${language}\n${code}\n\`\`\``;
    } else if (action === 'security') {
      prompt = `Perform a security review of the following ${language} code. Check for vulnerability OWASP risks (XSS, SQLi, injection, memory leaks):\n\`\`\`${language}\n${code}\n\`\`\``;
    } else if (action === 'tests') {
      prompt = `Generate comprehensive unit tests for the following ${language} code:\n\`\`\`${language}\n${code}\n\`\`\``;
    } else {
      prompt = `Analyze the following code:\n\`\`\`${language}\n${code}\n\`\`\``;
    }

    const result = await ai.generate(prompt);

    return NextResponse.json({
      success: true,
      analysis: result.text,
      provider: result.provider,
      model: result.model,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to analyze code' }, { status: 500 });
  }
}
