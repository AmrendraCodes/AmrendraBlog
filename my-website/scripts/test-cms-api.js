import http from 'http';

const BASE_URL = 'http://localhost:3000';

function makeRequest(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
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

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runApiTests() {
  console.log('🧪 Starting Enterprise CMS Backend API Verification Suite...\n');
  let passed = 0;
  let failed = 0;

  // 1. Test Admin Login API
  try {
    const res = await makeRequest('POST', '/api/admin/login', {
      email: 'admin@codewithamrendra.com',
      password: 'admin123',
    });
    if (res.status === 200 && res.body.success) {
      console.log('✅ PASS: POST /api/admin/login -> Admin authenticated successfully!');
      passed++;
    } else {
      console.log('❌ FAIL: POST /api/admin/login', res.status, res.body);
      failed++;
    }
  } catch (err) {
    console.log('❌ FAIL: POST /api/admin/login - Connection error');
    failed++;
  }

  // 2. Test Fetch Blogs API
  try {
    const res = await makeRequest('GET', '/api/admin/blogs');
    if (res.status === 200 && Array.isArray(res.body.posts)) {
      console.log(`✅ PASS: GET /api/admin/blogs -> Fetched ${res.body.posts.length} blog article(s)!`);
      passed++;
    } else {
      console.log('❌ FAIL: GET /api/admin/blogs', res.status, res.body);
      failed++;
    }
  } catch (err) {
    console.log('❌ FAIL: GET /api/admin/blogs - Connection error');
    failed++;
  }

  // 3. Test Fetch Categories API
  try {
    const res = await makeRequest('GET', '/api/admin/categories');
    if (res.status === 200 && Array.isArray(res.body.categories)) {
      console.log(`✅ PASS: GET /api/admin/categories -> Fetched ${res.body.categories.length} category/categories!`);
      passed++;
    } else {
      console.log('❌ FAIL: GET /api/admin/categories', res.status, res.body);
      failed++;
    }
  } catch (err) {
    console.log('❌ FAIL: GET /api/admin/categories - Connection error');
    failed++;
  }

  // 4. Test Fetch Tags API
  try {
    const res = await makeRequest('GET', '/api/admin/tags');
    if (res.status === 200 && Array.isArray(res.body.tags)) {
      console.log(`✅ PASS: GET /api/admin/tags -> Fetched ${res.body.tags.length} article tag(s)!`);
      passed++;
    } else {
      console.log('❌ FAIL: GET /api/admin/tags', res.status, res.body);
      failed++;
    }
  } catch (err) {
    console.log('❌ FAIL: GET /api/admin/tags - Connection error');
    failed++;
  }

  // 5. Test Analytics API
  try {
    const res = await makeRequest('GET', '/api/admin/analytics');
    if (res.status === 200 && res.body.stats) {
      console.log(`✅ PASS: GET /api/admin/analytics -> Metrics calculated: Total Blogs=${res.body.stats.totalBlogs}, Visitors=${res.body.stats.totalVisitors}!`);
      passed++;
    } else {
      console.log('❌ FAIL: GET /api/admin/analytics', res.status, res.body);
      failed++;
    }
  } catch (err) {
    console.log('❌ FAIL: GET /api/admin/analytics - Connection error');
    failed++;
  }

  // 6. Test Real-Time Telemetry Tracking API
  try {
    const res = await makeRequest('POST', '/api/track', {
      path: '/resources/blog/how-to-learn-react',
      referrer: 'https://google.com',
      slug: 'how-to-learn-react',
    });
    if (res.status === 200 && res.body.success) {
      console.log('✅ PASS: POST /api/track -> Real-time telemetry event logged successfully!');
      passed++;
    } else {
      console.log('❌ FAIL: POST /api/track', res.status, res.body);
      failed++;
    }
  } catch (err) {
    console.log('❌ FAIL: POST /api/track - Connection error');
    failed++;
  }

  // 7. Test Contact Submission API
  try {
    const res = await makeRequest('POST', '/api/admin/contacts', {
      name: 'API Test Lead',
      email: 'testlead@example.com',
      subject: 'B2B Enterprise Inquiry',
      message: 'Automated test message verifying API endpoint health.',
    });
    if (res.status === 200 && res.body.success) {
      console.log('✅ PASS: POST /api/admin/contacts -> Contact inquiry recorded successfully!');
      passed++;
    } else {
      console.log('❌ FAIL: POST /api/admin/contacts', res.status, res.body);
      failed++;
    }
  } catch (err) {
    console.log('❌ FAIL: POST /api/admin/contacts - Connection error');
    failed++;
  }

  console.log(`\n🎉 Verification Summary: ${passed} PASSED | ${failed} FAILED`);
}

runApiTests();
