import https from 'https';
import http from 'http';

function fetchUrl(targetUrl, followRedirects = 0) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(targetUrl);
      const client = parsed.protocol === 'https:' ? https : http;
      const req = client.request(
        parsed,
        {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
          }
        },
        (res) => {
          let body = '';
          res.setEncoding('utf8');
          res.on('data', (chunk) => { body += chunk; });
          res.on('end', () => {
            resolve({
              url: targetUrl,
              statusCode: res.statusCode,
              headers: res.headers,
              location: res.headers.location,
              body
            });
          });
        }
      );
      req.on('error', (err) => {
        resolve({ url: targetUrl, error: err.message });
      });
      req.end();
    } catch (e) {
      resolve({ url: targetUrl, error: e.message });
    }
  });
}

async function traceRedirects(initialUrl) {
  let curr = initialUrl;
  const chain = [];
  for (let i = 0; i < 5; i++) {
    const res = await fetchUrl(curr);
    if (res.error) {
      chain.push({ url: curr, error: res.error });
      break;
    }
    chain.push({ url: curr, status: res.statusCode, location: res.location });
    if (res.statusCode >= 300 && res.statusCode < 400 && res.location) {
      curr = new URL(res.location, curr).href;
    } else {
      break;
    }
  }
  return chain;
}

const testUrls = [
  'http://codewithamrendra.in',
  'http://www.codewithamrendra.in',
  'https://codewithamrendra.in',
  'https://www.codewithamrendra.in',
  'https://www.codewithamrendra.in/',
  'https://www.codewithamrendra.in/blog',
  'https://www.codewithamrendra.in/blog/',
  'https://www.codewithamrendra.in/resources/blog/',
  'https://www.codewithamrendra.in/resources/blog',
  'https://www.codewithamrendra.in/blog/saas-architecture-guide',
  'https://www.codewithamrendra.in/non-existent-page-test-404',
];

const blogSlugs = [
  "docker-tutorial-for-beginners-kubernetes-guide",
  "saas-architecture-guide",
  "future-of-web-development-2026",
  "javascript-enlightenment-master-core-concepts",
  "rag-chatbot-for-your-business-website",
  "how-much-does-a-nextjs-website-cost-in-2026",
  "microservices-vs-modular-monolith-2026",
  "ai-agents-replacing-saas-seats",
  "how-to-build-a-light-and-dark-theme-switch-using-javascript",
  "how-to-learn-react"
];

async function main() {
  console.log("=== REDIRECT & PROTOCOL DIAGNOSIS ===");
  for (const u of testUrls) {
    const chain = await traceRedirects(u);
    console.log(`\nURL: ${u}`);
    chain.forEach((c, idx) => {
      console.log(`  Step ${idx + 1}: ${c.status || c.error} -> ${c.location || '(final)'}`);
    });
  }

  console.log("\n\n=== BLOG POST ON-PAGE & TECHNICAL AUDIT ===");
  const results = [];
  for (const slug of blogSlugs) {
    const postUrl = `https://www.codewithamrendra.in/resources/blog/${slug}`;
    const res = await fetchUrl(postUrl);
    if (res.error) {
      console.log(`Error fetching ${postUrl}: ${res.error}`);
      continue;
    }

    const html = res.body;
    
    // Canonical
    const canMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ||
                     html.match(/<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
    const canonical = canMatch ? canMatch[1] : null;

    // Robots meta
    const robotsMatch = html.match(/<meta[^>]+name=["']robots["'][^>]*content=["']([^"']+)["']/i);
    const robots = robotsMatch ? robotsMatch[1] : null;

    // Title
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : null;

    // Description
    const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i);
    const desc = descMatch ? descMatch[1] : null;

    // H1 tags
    const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());

    // H2 tags
    const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());

    // Schema JSON-LD
    const jsonLdBlocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(m => {
      try {
        return JSON.parse(m[1]);
      } catch (e) {
        return { parseError: e.message, raw: m[1].slice(0, 100) };
      }
    });

    // Internal links in article content
    const internalLinks = [...html.matchAll(/href=["'](\/[^"']+|https?:\/\/www\.codewithamrendra\.in[^"']*)["']/gi)].map(m => m[1]);

    // Images & alt tags
    const imgTags = [...html.matchAll(/<img[^>]+>/gi)].map(m => {
      const srcMatch = m[0].match(/src=["']([^"']+)["']/i);
      const altMatch = m[0].match(/alt=["']([^"']*)["']/i);
      return {
        src: srcMatch ? srcMatch[1].slice(0, 60) : '',
        alt: altMatch ? altMatch[1] : null
      };
    });

    results.push({
      slug,
      status: res.statusCode,
      xRobotsTag: res.headers['x-robots-tag'] || null,
      canonical,
      canonicalMatches: canonical === postUrl,
      robotsMeta: robots,
      title,
      titleLength: title ? title.length : 0,
      descLength: desc ? desc.length : 0,
      h1Count: h1Matches.length,
      h1: h1Matches[0] || null,
      h2Count: h2Matches.length,
      schemas: jsonLdBlocks.map(b => b['@type'] || (b['@graph'] ? 'Graph' : 'Unknown')),
      internalLinksCount: internalLinks.length,
      sampleInternalLinks: internalLinks.slice(0, 5),
      imagesCount: imgTags.length,
      missingAltCount: imgTags.filter(img => !img.alt || img.alt.trim() === '').length
    });
  }

  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
