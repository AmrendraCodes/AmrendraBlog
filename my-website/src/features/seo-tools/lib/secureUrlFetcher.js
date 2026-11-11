import dns from 'node:dns/promises';
import * as cheerio from 'cheerio';

/**
 * Checks if an IP address is in a private, loopback, or link-local range
 * @param {string} ip
 * @returns {boolean} true if private/blocked
 */
export function isPrivateIp(ip) {
  if (!ip) return true;

  // Normalize IPv6-mapped IPv4 (e.g. ::ffff:127.0.0.1)
  const normalized = ip.toLowerCase().replace(/^::ffff:/, '');

  // IPv4 Checks
  const ipv4Match = normalized.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4Match) {
    const octets = ipv4Match.slice(1).map(Number);
    const [o0, o1] = octets;

    // 0.0.0.0/8 (Current network)
    if (o0 === 0) return true;
    // 127.0.0.0/8 (Loopback)
    if (o0 === 127) return true;
    // 10.0.0.0/8 (Private)
    if (o0 === 10) return true;
    // 172.16.0.0/12 (Private: 172.16.0.0 – 172.31.255.255)
    if (o0 === 172 && o1 >= 16 && o1 <= 31) return true;
    // 192.168.0.0/16 (Private)
    if (o0 === 192 && o1 === 168) return true;
    // 169.254.0.0/16 (Link-local / Cloud metadata service)
    if (o0 === 169 && o1 === 254) return true;
    // 100.64.0.0/10 (Carrier-grade NAT)
    if (o0 === 100 && o1 >= 64 && o1 <= 127) return true;

    return false;
  }

  // IPv6 Checks
  if (normalized === '::1' || normalized === '::') return true;
  // Unique local addresses fc00::/7 (fc00:: - fdff::)
  if (/^f[cd][0-9a-f]{2}:/i.test(normalized)) return true;
  // Link-local fe80::/10
  if (/^fe[89ab][0-9a-f]:/i.test(normalized)) return true;

  return false;
}

/**
 * Resolves hostname and verifies that all returned IPs are public
 * @param {string} hostname
 * @returns {Promise<string[]>} List of public IP addresses
 */
export async function resolveAndValidateHostname(hostname) {
  // Disallow localhost or bare local names
  if (!hostname || hostname === 'localhost' || !hostname.includes('.')) {
    throw new Error('Local or internal hostnames are blocked for security.');
  }

  let addresses = [];
  try {
    addresses = await dns.lookup(hostname, { all: true });
  } catch {
    throw new Error(`Unable to resolve domain: ${hostname}`);
  }

  if (!addresses || addresses.length === 0) {
    throw new Error(`Domain ${hostname} could not be resolved.`);
  }

  for (const { address } of addresses) {
    if (isPrivateIp(address)) {
      throw new Error(`Access to private or restricted network address (${address}) is blocked.`);
    }
  }

  return addresses.map((a) => a.address);
}

/**
 * Fetches HTML from a target URL with SSRF guards, redirect tracking, size limits, and timeout
 * @param {string} targetUrl
 * @param {number} [redirectCount=0]
 * @returns {Promise<{ html: string, finalUrl: string }>}
 */
export async function fetchHtmlSafely(targetUrl, redirectCount = 0) {
  if (redirectCount > 3) {
    throw new Error('Too many redirects (maximum 3 redirects allowed).');
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(targetUrl);
  } catch {
    throw new Error('Invalid URL format. Provide a valid HTTP or HTTPS address.');
  }

  // Protocol check
  if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    throw new Error('Only HTTP and HTTPS protocols are permitted.');
  }

  // Validate hostname against SSRF
  await resolveAndValidateHostname(parsedUrl.hostname);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

  let response;
  try {
    response = await fetch(parsedUrl.toString(), {
      signal: controller.signal,
      redirect: 'manual', // Manual redirect inspection for SSRF
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEOContentReviewer/1.0; +https://www.codewithamrendra.in/tools/seo-content-reviewer)',
        Accept: 'text/html,application/xhtml+xml',
      },
    });
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Request timed out (server took longer than 8 seconds to respond).');
    }
    throw new Error(`Failed to reach server: ${err.message}`);
  } finally {
    clearTimeout(timeoutId);
  }

  // Handle redirects safely
  if ([301, 302, 303, 307, 308].includes(response.status)) {
    const location = response.headers.get('location');
    if (!location) {
      throw new Error('Redirect returned with missing Location header.');
    }
    const nextUrl = new URL(location, parsedUrl).toString();
    return fetchHtmlSafely(nextUrl, redirectCount + 1);
  }

  if (!response.ok) {
    throw new Error(`Target server responded with HTTP status ${response.status} (${response.statusText}).`);
  }

  // Content-Type validation
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html') && !contentType.includes('application/xhtml+xml')) {
    throw new Error(`Target returned unsupported content type (${contentType || 'unknown'}). Only text/html pages can be reviewed.`);
  }

  // 2 MB Size limit enforcement stream
  const MAX_BYTES = 2 * 1024 * 1024;
  const reader = response.body.getReader();
  const chunks = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.length;
    if (totalBytes > MAX_BYTES) {
      reader.cancel();
      throw new Error('Webpage exceeds maximum allowed size (2 MB limit).');
    }
    chunks.push(value);
  }

  const buffer = Buffer.concat(chunks);
  const html = buffer.toString('utf8');

  return {
    html,
    finalUrl: parsedUrl.toString(),
  };
}

/**
 * Extracts SEO data and main text from HTML using Cheerio
 * @param {string} html
 * @returns {Object} Extracted data
 */
export function extractPageDataWithCheerio(html) {
  const $ = cheerio.load(html);

  // 1. Title
  const title = (
    $('title').first().text() ||
    $('meta[property="og:title"]').attr('content') ||
    ''
  ).trim();

  // 2. Meta Description
  const metaDescription = (
    $('meta[name="description"]').attr('content') ||
    $('meta[property="og:description"]').attr('content') ||
    ''
  ).trim();

  // 3. Headings
  const headings = [];
  $('h1, h2, h3, h4, h5, h6').each((_, el) => {
    const tag = el.tagName.toLowerCase();
    const level = parseInt(tag.replace('h', ''), 10);
    const text = $(el).text().replace(/\s+/g, ' ').trim();
    if (text) {
      headings.push({ level, text });
    }
  });

  // 4. Main Body Text Extraction
  // Strip non-content and layout chrome
  $('script, style, nav, footer, header, aside, noscript, iframe, svg, form, [aria-hidden="true"]').remove();

  // Prefer semantic container if present
  let mainContainer = $('article, main, #content, .content, .post, .article');
  if (mainContainer.length === 0) {
    mainContainer = $('body');
  }

  const rawText = mainContainer.text();
  // Clean whitespace & line breaks
  const cleanContent = rawText
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join('\n\n');

  return {
    title,
    metaDescription,
    headings,
    content: cleanContent,
  };
}

