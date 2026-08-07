import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const url = body?.url;

  if (!url || typeof url !== 'string') {
    return NextResponse.json(
      { error: 'Missing or invalid url in request body' },
      { status: 400 }
    );
  }

  const INDEXNOW_KEY = process.env.INDEXNOW_KEY;
  if (!INDEXNOW_KEY) {
    return NextResponse.json(
      { error: 'INDEXNOW_KEY environment variable is not configured' },
      { status: 500 }
    );
  }

  const host = 'codewithamrendra.in';
  const keyLocation = `https://${host}/BingSiteAuth.xml`;
  const endpoint = 'https://api.indexnow.org/indexnow';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation,
      urlList: [url],
    }),
  });

  const resultText = await response.text();

  return NextResponse.json(
    {
      ok: response.ok,
      status: response.status,
      result: resultText,
    },
    { status: response.ok ? 200 : 502 }
  );
}
