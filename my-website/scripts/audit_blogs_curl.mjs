import { execSync } from 'child_process';

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

const results = [];

for (const slug of blogSlugs) {
  const url = `https://www.codewithamrendra.in/resources/blog/${slug}`;
  try {
    const rawHeaders = execSync(`curl.exe -ILs "${url}"`, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    const html = execSync(`curl.exe -Ls "${url}"`, { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });

    const statusMatch = rawHeaders.match(/HTTP\/[12\.]+ (\d+)/);
    const status = statusMatch ? statusMatch[1] : 'unknown';

    const xRobotsMatch = rawHeaders.match(/x-robots-tag:\s*([^\r\n]+)/i);
    const xRobots = xRobotsMatch ? xRobotsMatch[1] : null;

    // Canonical
    const canMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ||
                     html.match(/<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
    const canonical = canMatch ? canMatch[1] : null;

    // Meta robots
    const robotsMatch = html.match(/<meta[^>]+name=["']robots["'][^>]*content=["']([^"']+)["']/i);
    const robots = robotsMatch ? robotsMatch[1] : null;

    // Title
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : null;

    // Meta Description
    const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i);
    const desc = descMatch ? descMatch[1] : null;

    // H1 tags
    const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());

    // H2 tags
    const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());

    // H3 tags
    const h3Matches = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());

    // JSON-LD Schemas
    const jsonLdBlocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(m => {
      try {
        const parsed = JSON.parse(m[1]);
        return parsed['@type'] || (parsed['@graph'] ? 'Graph' : 'Unknown');
      } catch (e) {
        return 'ParseError';
      }
    });

    // Content word count (rough estimate of text inside article-content)
    const contentMatch = html.match(/<div id="article-content"[^>]*>([\s\S]*?)<\/div>\s*<\/article>/i);
    let wordCount = 0;
    if (contentMatch) {
      const textOnly = contentMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      wordCount = textOnly.split(' ').length;
    }

    // Internal links in article content
    const inArticleLinks = contentMatch ? [...contentMatch[1].matchAll(/href=["'](\/[^"']+|https?:\/\/www\.codewithamrendra\.in[^"']*)["']/gi)].map(m => m[1]) : [];

    // Images in article content
    const inArticleImgs = contentMatch ? [...contentMatch[1].matchAll(/<img[^>]+>/gi)].map(m => {
      const alt = m[0].match(/alt=["']([^"']*)["']/i);
      return { alt: alt ? alt[1] : null };
    }) : [];

    results.push({
      slug,
      status,
      xRobots,
      canonical,
      canonicalMatches: canonical === url,
      robotsMeta: robots,
      title,
      titleLength: title ? title.length : 0,
      desc,
      descLength: desc ? desc.length : 0,
      h1Count: h1Matches.length,
      h1Text: h1Matches[0] || null,
      h2Count: h2Matches.length,
      h2s: h2Matches.slice(0, 6),
      h3Count: h3Matches.length,
      schemas: jsonLdBlocks,
      estimatedArticleWords: wordCount,
      internalLinksInArticle: inArticleLinks,
      internalLinksCount: inArticleLinks.length,
      inArticleImagesCount: inArticleImgs.length,
      inArticleMissingAltCount: inArticleImgs.filter(i => !i.alt).length
    });
  } catch (err) {
    results.push({ slug, error: err.message });
  }
}

console.log(JSON.stringify(results, null, 2));
