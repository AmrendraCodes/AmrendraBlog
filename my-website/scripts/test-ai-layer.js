import http from 'http';

const BASE_URL = 'http://localhost:3000';

function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: { 'Content-Type': 'application/json' },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, body: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', (err) => reject(err));
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runAILayerTests() {
  console.log('🤖 Starting AI Layer Verification Suite...\n');
  let passed = 0;
  let failed = 0;

  // 1. Test AI Chat & Article Assistant
  try {
    const res = await makeRequest('POST', '/api/ai/chat', {
      messages: [{ role: 'user', content: 'What are the main topics of this article?' }],
      articleContext: { title: 'Building Next.js 16 Apps', category: 'Web Development' },
      provider: 'openai',
    });
    if (res.status === 200 && res.body.success) {
      console.log('✅ PASS: POST /api/ai/chat -> Article Context Assistant working!');
      passed++;
    } else {
      console.log('❌ FAIL: POST /api/ai/chat', res.status, res.body);
      failed++;
    }
  } catch (err) {
    console.log('❌ FAIL: POST /api/ai/chat - Connection error');
    failed++;
  }

  // 2. Test Multi-Model Arena Comparison API
  try {
    const res = await makeRequest('POST', '/api/ai/compare', {
      prompt: 'Compare React Server Components vs Client Components',
      providers: ['openai', 'claude', 'gemini', 'deepseek'],
    });
    if (res.status === 200 && res.body.results && res.body.results.length === 4) {
      console.log('✅ PASS: POST /api/ai/compare -> 4 AI Models executed side-by-side!');
      passed++;
    } else {
      console.log('❌ FAIL: POST /api/ai/compare', res.status, res.body);
      failed++;
    }
  } catch (err) {
    console.log('❌ FAIL: POST /api/ai/compare - Connection error');
    failed++;
  }

  // 3. Test Code Assistant API
  try {
    const res = await makeRequest('POST', '/api/ai/code', {
      code: 'function add(a, b) { return a + b; }',
      action: 'explain',
      language: 'javascript',
    });
    if (res.status === 200 && res.body.success) {
      console.log('✅ PASS: POST /api/ai/code -> Code Explanation Assistant working!');
      passed++;
    } else {
      console.log('❌ FAIL: POST /api/ai/code', res.status, res.body);
      failed++;
    }
  } catch (err) {
    console.log('❌ FAIL: POST /api/ai/code - Connection error');
    failed++;
  }

  // 4. Test RAG Natural Language AI Search API
  try {
    const res = await makeRequest('POST', '/api/ai/search', {
      query: 'React Performance Optimization',
    });
    if (res.status === 200 && res.body.results) {
      console.log(`✅ PASS: POST /api/ai/search -> Semantic RAG search returned ${res.body.results.length} articles!`);
      passed++;
    } else {
      console.log('❌ FAIL: POST /api/ai/search', res.status, res.body);
      failed++;
    }
  } catch (err) {
    console.log('❌ FAIL: POST /api/ai/search - Connection error');
    failed++;
  }

  console.log(`\n🎉 AI Layer Verification Summary: ${passed} PASSED | ${failed} FAILED`);
}

runAILayerTests();
