import fs from 'fs';
import path from 'path';
import https from 'https';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

function htmlToMarkdown(html) {
  if (!html) return '';

  let md = html;

  // 1. Remove mobile TOC and scripts/svgs inside headings
  md = md.replace(/<div[^>]*id="toc-mobile"[\s\S]*?<\/div>\s*<\/div>/gi, '');
  md = md.replace(/<svg[\s\S]*?<\/svg>/gi, '');

  // 2. Headings: extract text from <h2 ...><a ...></a>Text</h2>
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, content) => {
    const text = content.replace(/<[^>]+>/g, '').trim();
    return `\n\n## ${text}\n\n`;
  });

  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, content) => {
    const text = content.replace(/<[^>]+>/g, '').trim();
    return `\n\n### ${text}\n\n`;
  });

  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (_, content) => {
    const text = content.replace(/<[^>]+>/g, '').trim();
    return `\n\n#### ${text}\n\n`;
  });

  // 3. Blockquotes
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, content) => {
    const clean = content.replace(/<[^>]+>/g, '').trim();
    const lines = clean.split('\n').map(l => `> ${l.trim()}`).join('\n');
    return `\n\n${lines}\n\n`;
  });

  // 4. Unordered and ordered lists
  md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, listContent) => {
    const items = [...listContent.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
      .map(m => `- ${m[1].replace(/<[^>]+>/g, '').trim()}`)
      .join('\n');
    return `\n\n${items}\n\n`;
  });

  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, listContent) => {
    let index = 1;
    const items = [...listContent.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
      .map(m => `${index++}. ${m[1].replace(/<[^>]+>/g, '').trim()}`)
      .join('\n');
    return `\n\n${items}\n\n`;
  });

  // 5. Links: <a href="url">text</a>
  md = md.replace(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => {
    const cleanText = text.replace(/<[^>]+>/g, '').trim();
    if (!cleanText) return '';
    return `[${cleanText}](${href})`;
  });

  // 6. Strong and Em
  md = md.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, (_, t) => `**${t.trim()}**`);
  md = md.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, (_, t) => `**${t.trim()}**`);
  md = md.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, (_, t) => `*${t.trim()}*`);
  md = md.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, (_, t) => `*${t.trim()}*`);

  // 7. Paragraphs
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, p) => {
    const clean = p.trim();
    return clean ? `\n\n${clean}\n\n` : '';
  });

  // 8. Tables
  md = md.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (_, tableContent) => {
    const rows = [...tableContent.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
    if (!rows.length) return '';
    let tableMd = '\n\n';
    let isHeader = true;
    for (const row of rows) {
      const cells = [...row[1].matchAll(/<(?:th|td)[^>]*>([\s\S]*?)<\/(?:th|td)>/gi)]
        .map(c => c[1].replace(/<[^>]+>/g, '').trim().replace(/\|/g, '\\|'));
      tableMd += `| ${cells.join(' | ')} |\n`;
      if (isHeader) {
        tableMd += `| ${cells.map(() => '---').join(' | ')} |\n`;
        isHeader = false;
      }
    }
    return `${tableMd}\n`;
  });

  // 9. Strip any remaining HTML tags (like span, div, etc.)
  md = md.replace(/<[^>]+>/g, '');

  // 10. Decode basic HTML entities
  md = md
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');

  // 11. Normalize excess newlines
  md = md.replace(/\n{3,}/g, '\n\n').trim();

  return md;
}

export async function syncPosts() {
  console.log('🔄 Fetching live posts directory from https://www.codewithamrendra.in/resources/blog ...');
  const { data: blogPageHtml } = await fetchUrl('https://www.codewithamrendra.in/resources/blog');

  // Extract all articles from RSC payload
  const nextFMatches = [...blogPageHtml.matchAll(/self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g)];
  const fullF = nextFMatches.map(m => m[1]).join('');
  const unescaped = fullF
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\')
    .replace(/\\n/g, '\n');

  const articlesMatch = unescaped.match(/"articles":(\[[\s\S]*?\]),\s*"allTags"/);
  if (!articlesMatch) {
    console.error('❌ Could not parse articles from live site!');
    return;
  }

  const liveArticles = JSON.parse(articlesMatch[1]);
  console.log(`✅ Found ${liveArticles.length} articles on LIVE production site.`);

  const postsDir = path.join(process.cwd(), 'content', 'posts');
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  const existingFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  console.log(`📁 Currently ${existingFiles.length} markdown file(s) in local content/posts.`);

  let createdCount = 0;

  for (const article of liveArticles) {
    const slug = article.link.replace('/resources/blog/', '').trim();
    const fileName = `${slug}.md`;
    const filePath = path.join(postsDir, fileName);

    // If file already exists locally, check if slug or content is already present
    if (fs.existsSync(filePath)) {
      console.log(`⏭️  Skipping existing: "${article.title}" (${fileName})`);
      continue;
    }

    // Special case: check if it exists under alternate filename
    if (slug === 'docker-tutorial-for-beginners-kubernetes-guide' && fs.existsSync(path.join(postsDir, 'docker-vs-kubernetes-practical-guide.md'))) {
      // Update slug in docker file or copy
      const existing = fs.readFileSync(path.join(postsDir, 'docker-vs-kubernetes-practical-guide.md'), 'utf8');
      fs.writeFileSync(filePath, existing.replace(/slug: ".*"/, `slug: "${slug}"`), 'utf8');
      console.log(`🔗 Linked alternate docker file -> ${fileName}`);
      createdCount++;
      continue;
    }

    console.log(`📥 Downloading live post: "${article.title}" (${slug}) ...`);
    try {
      const { data: detailHtml } = await fetchUrl(`https://www.codewithamrendra.in/resources/blog/${encodeURIComponent(slug)}`);

      // Extract JSON-LD FAQs
      const jsonLds = [...detailHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
        .map(m => {
          try { return JSON.parse(m[1]); } catch { return null; }
        })
        .filter(Boolean);

      const faqLd = jsonLds.find(j => j['@type'] === 'FAQPage');
      const faqs = (faqLd?.mainEntity || []).map(f => ({
        question: f.name || f.question,
        answer: f.acceptedAnswer?.text || f.answer
      }));

      // Extract article HTML body
      const articleMatch = detailHtml.match(/<article[\s\S]*?>([\s\S]*?)<\/article>/i);
      const articleBodyHtml = articleMatch ? articleMatch[1] : '';
      const markdownBody = htmlToMarkdown(articleBodyHtml);

      // Construct Frontmatter
      const categorySlug = article.category ? article.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'general';
      let frontmatter = '---\n';
      frontmatter += `title: ${JSON.stringify(article.title)}\n`;
      frontmatter += `slug: ${JSON.stringify(slug)}\n`;
      frontmatter += `date: ${JSON.stringify(article.date)}\n`;
      frontmatter += `publishedAt: ${JSON.stringify(article.publishedAt || article.date)}\n`;
      frontmatter += `readTime: ${JSON.stringify(article.readTime || '5 min read')}\n`;
      frontmatter += `category: ${JSON.stringify(article.category || 'General')}\n`;
      frontmatter += `categorySlug: ${JSON.stringify(categorySlug)}\n`;
      frontmatter += `excerpt: ${JSON.stringify(article.excerpt || '')}\n`;
      frontmatter += `description: ${JSON.stringify(article.excerpt || '')}\n`;
      frontmatter += `image: ${JSON.stringify(article.image || '/images/og-blog.png')}\n`;
      frontmatter += `featuredImage: ${JSON.stringify(article.image || '/images/og-blog.png')}\n`;
      frontmatter += `author: ${JSON.stringify(article.author || 'Amrendra Kumar')}\n`;
      frontmatter += `views: ${article.views || 0}\n`;

      if (article.tags && article.tags.length > 0) {
        frontmatter += 'tags:\n';
        for (const t of article.tags) {
          frontmatter += `  - ${JSON.stringify(t)}\n`;
        }
      }

      if (faqs.length > 0) {
        frontmatter += 'faqs:\n';
        for (const f of faqs) {
          frontmatter += `  - question: ${JSON.stringify(f.question)}\n`;
          frontmatter += `    answer: ${JSON.stringify(f.answer)}\n`;
        }
      }
      frontmatter += '---\n\n';

      const fileContent = frontmatter + markdownBody + '\n';
      fs.writeFileSync(filePath, fileContent, 'utf8');
      console.log(`✅ Saved: ${fileName}`);
      createdCount++;
    } catch (err) {
      console.error(`❌ Failed to sync post "${slug}":`, err.message);
    }
  }

  console.log(`\n🎉 Sync complete! Added ${createdCount} missing post(s). Total local posts now: ${fs.readdirSync(postsDir).filter(f => f.endsWith('.md')).length}`);
}

syncPosts();
