import { NextResponse } from 'next/server';
import { searchArticlesNaturalLanguage } from '@/lib/ai/rag';

export async function POST(request) {
  try {
    const { query } = await request.json();
    const results = searchArticlesNaturalLanguage(query, 6);

    return NextResponse.json({
      success: true,
      query,
      results,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to perform AI search' }, { status: 500 });
  }
}
