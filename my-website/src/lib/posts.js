import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";
import { prisma } from "./prisma.js";

import { extractFaqsFromContent } from "./schema.js";

// Markdown fixtures live here and are only used when CONTENT_SOURCE=markdown.
const postsDirectory = path.join(process.cwd(), "content", "posts");

const requestedContentSource = (process.env.CONTENT_SOURCE || "database").trim().toLowerCase();
// A Vercel build can run without database secrets (for example, when only the
// public site is deployed). In that case, use the checked-in markdown corpus
// instead of failing page-data collection. Explicit database deployments keep
// using the database whenever DATABASE_URL is present.
const contentSource = requestedContentSource === "database" && !process.env.DATABASE_URL?.trim()
  ? "markdown"
  : requestedContentSource;

function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL?.trim());
}

function isMarkdownSource() {
  return contentSource === "markdown";
}

function assertConfiguredContentSource() {
  if (isMarkdownSource()) return;

  if (contentSource !== "database") {
    throw new Error(
      `[posts] Unsupported CONTENT_SOURCE="${contentSource}". ` +
      `Use "database" (default) or "markdown".`
    );
  }

  if (!hasDatabaseUrl()) {
    throw new Error(
      `[posts] CONTENT_SOURCE is set to "database" but DATABASE_URL is missing.\n` +
      `→ Either add DATABASE_URL in .env.local\n` +
      `→ Or set CONTENT_SOURCE=markdown to use local markdown files in content/posts`
    );
  }
}

async function queryWithRetry(queryFn, maxRetries = 2, delayMs = 1500) {
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await queryFn();
    } catch (err) {
      lastError = err;
      const msg = err?.message || String(err);
      const isConnectionIssue =
        msg.includes("Can't reach database server") ||
        msg.includes("Connection terminated") ||
        msg.includes("connection timeout") ||
        msg.includes("Closed") ||
        err?.code === "P1001" ||
        err?.code === "P1002" ||
        err?.code === "P1008" ||
        err?.code === "P1017";

      if (isConnectionIssue && attempt < maxRetries) {
        console.warn(`[posts] Database is waking up (attempt ${attempt}/${maxRetries}). Retrying in ${delayMs}ms...`);
        await new Promise((r) => setTimeout(r, delayMs));
        continue;
      }
      throw err;
    }
  }
  throw lastError;
}

function handleDatabaseQueryError(operation, error) {
  const reason = error instanceof Error ? error.message : String(error);
  console.warn(
    `[posts] Database unavailable for ${operation} (${reason}). Gracefully falling back to local markdown corpus.`
  );
}

if (isMarkdownSource() && process.env.NODE_ENV !== "production") {
  console.info("[posts] CONTENT_SOURCE=markdown: using files from content/posts.");
}

if (requestedContentSource === "database" && contentSource === "markdown") {
  console.warn("[posts] DATABASE_URL is missing; using markdown files from content/posts as a fallback.");
}

function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content ? content.trim().split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
}

function countWords(content) {
  return content ? content.trim().split(/\s+/).length : 0;
}

/**
 * Normalizes FAQ data from Database JSON/JSONB, JSON strings, frontmatter objects, or markdown content.
 * Returns an array of clean { question, answer } objects, or null if none exist.
 *
 * @param {any} rawFaqs
 * @param {string} [content]
 * @returns {Array<{question: string, answer: string}>|null}
 */
export function normalizePostFaqs(rawFaqs, content = "", useContentFallback = true) {
  let parsed = rawFaqs;

  if (typeof parsed === "string") {
    try {
      parsed = JSON.parse(parsed);
    } catch {
      parsed = null;
    }
  }

  // If parsed is an object with an array property, unwrap it
  if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
    if (Array.isArray(parsed.faqs)) parsed = parsed.faqs;
    else if (Array.isArray(parsed.faq)) parsed = parsed.faq;
    else if (Array.isArray(parsed.faqItems)) parsed = parsed.faqItems;
    else if (Array.isArray(parsed.mainEntity)) {
      parsed = parsed.mainEntity.map((e) => ({
        question: e.name || e.question,
        answer: e.acceptedAnswer?.text || e.answer,
      }));
    }
  }

  if (Array.isArray(parsed)) {
    const valid = parsed
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const qValue = item.question || item.name || item.q || "";
        const aValue = item.answer || item.text || item.a || "";
        const q = typeof qValue === "string" ? qValue.trim() : "";
        const a = typeof aValue === "string" ? aValue.trim() : "";
        return q && a ? { question: q, answer: a } : null;
      })
      .filter(Boolean);

    if (valid.length > 0) return valid;
  }

  // Fallback to markdown extraction if content is provided
  if (useContentFallback && content) {
    const extracted = extractFaqsFromContent(content);
    if (extracted.length > 0) return extracted;
  }

  return null;
}

/**
 * Pre-processes markdown to prevent accidental CommonMark setext headings.
 * Automatically ensures dividers (---, ===, etc.) have blank lines before and after.
 * Strips dangling hyphens/equals and protects paragraphs from turning into H1/H2 setext headings.
 */
export function normalizeMarkdown(raw) {
  if (!raw || typeof raw !== "string") return "";

  const codeBlocks = [];
  let processed = raw.replace(/```[\s\S]*?```/g, (match) => {
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
    codeBlocks.push(match);
    return placeholder;
  });

  // Defensive newline normalization outside code blocks
  processed = processed.replace(/\n{3,}/g, '\n\n');

  // Strip empty HTML elements (<p></p>, <p><br></p>, <p><br/></p>, <div></div>, <span></span>, etc., including &nbsp; and Unicode whitespace)
  processed = processed.replace(/<p\b[^>]*>(?:[\s\u00A0\u200B]|&nbsp;|<br\s*\/?>)*<\/p>/gi, "");
  processed = processed.replace(/<div\b[^>]*>(?:[\s\u00A0\u200B]|&nbsp;|<br\s*\/?>)*<\/div>/gi, "");
  processed = processed.replace(/<span\b[^>]*>(?:[\s\u00A0\u200B]|&nbsp;|<br\s*\/?>)*<\/span>/gi, "");

  // Strip multiple consecutive <br> tags
  processed = processed.replace(/(?:<br\s*\/?>[\s\u00A0\u200B]*){2,}/gi, "");

  // Remove any trailing standalone dashes/hyphens/equals at the very end of content
  processed = processed.replace(/\n+[ \t]*[-=_*]{1,3}[ \t]*$/, '\n');

  // Ensure horizontal rules / dividers (---, ===, ***, ___) have blank lines before and after them.
  // Also clean up 1-2 char underlines directly below paragraphs that turn regular text into Setext H1/H2 headings.
  processed = processed.replace(
    /([^\n\r])[ \t]*\r?\n[ \t]*((?:-[ \t]*){1,}|(?:=[ \t]*){1,}|(?:\*[ \t]*){3,}|(?:_[ \t]*){3,})[ \t]*(\r?\n|$)/g,
    (match, textBefore, divider) => {
      const trimmedDivider = divider.replace(/\s+/g, '');
      if (/^(?:-{3,}|={3,}|\*{3,}|_{3,})$/.test(trimmedDivider)) {
        return `${textBefore}\n\n${divider}\n\n`;
      }
      // Single or double dash/equal attached directly under text -> remove to prevent accidental Setext heading
      return `${textBefore}\n\n`;
    }
  );

  processed = processed.replace(/__CODE_BLOCK_(\d+)__/g, (_, idx) => codeBlocks[parseInt(idx, 10)]);

  return processed;
}

/**
 * Markdown fixture loader.
 */
function getPostsFromFilesystem() {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"));

  const posts = fileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const slug = data.slug || fileName.replace(/\.md$/, "");
    const normalizedContent = normalizeMarkdown(content);
    const rawFaqs = data.faqs || data.faq || data.faqItems || null;

    return {
      id: slug,
      title: data.title,
      slug,
      date: data.date,
      publishedAt: data.publishedAt || data.date || null,
      updatedAt: data.updatedAt || data.publishedAt || data.date || null,
      readTime: data.readTime || calculateReadingTime(content),
      category: data.category,
      categorySlug: data.categorySlug,
      excerpt: data.excerpt,
      description: data.description || data.excerpt,
      image: data.image || data.featuredImage,
      featuredImage: data.featuredImage || data.image,
      metaTitle: data.metaTitle || data.title,
      metaDescription: data.metaDescription || data.description || data.excerpt,
      seoKeywords: data.seoKeywords || null,
      seoKeywordsSecondary: Array.isArray(data.seoKeywordsSecondary) ? data.seoKeywordsSecondary : [],
      canonicalUrl: data.canonicalUrl || null,
      ogImage: data.ogImage || data.image || data.featuredImage || null,
      imageAlt: data.imageAlt || data.ogImageAlt || data.title,
      ogImageAlt: data.ogImageAlt || data.imageAlt || data.title,
      author: data.author || "Amrendra Kumar",
      tags: data.tags || [],
      wordCount: countWords(content),
      content: normalizedContent,
      status: "PUBLISHED",
      views: data.views || 0,
      faqs: normalizePostFaqs(rawFaqs, normalizedContent, false),
    };
  });

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return posts;
}

/**
 * Async loader — reads all published posts from database or fallback to filesystem.
 * Returns posts sorted by published date (newest first).
 */
export async function getAllPostsAsync() {
  if (isMarkdownSource()) return getPostsFromFilesystem();
  assertConfiguredContentSource();

  try {
    const dbPosts = await queryWithRetry(() =>
      prisma.blog.findMany({
        where: { status: "PUBLISHED" },
        include: {
          category: true,
          tags: { include: { tag: true } },
        },
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      })
    );

    if (dbPosts) {
      return dbPosts.map((post) => {
        const normalizedContent = normalizeMarkdown(post.content);
        return {
          id: post.id,
          title: post.title,
          slug: post.slug,
          date: post.publishedAt
            ? post.publishedAt.toISOString().split("T")[0]
            : post.createdAt.toISOString().split("T")[0],
          publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
          updatedAt: post.updatedAt ? post.updatedAt.toISOString() : null,
          readTime: post.readingTime || calculateReadingTime(post.content),
          category: post.category ? post.category.name : "General",
          categorySlug: post.categorySlug || (post.category ? post.category.slug : "general"),
          excerpt: post.excerpt || "",
          description: post.description || post.excerpt || "",
          metaTitle: post.metaTitle || post.title,
          metaDescription: post.metaDescription || post.description || post.excerpt || "",
          seoKeywords: post.seoKeywords || null,
          seoKeywordsSecondary: post.seoKeywordsSecondary || [],
          canonicalUrl: post.canonicalUrl || null,
          ogImage: post.ogImage || null,
          image: post.featuredImage || post.ogImage || "/images/og-blog.png",
          featuredImage: post.featuredImage || post.ogImage,
          imageAlt: post.title,
          ogImageAlt: post.title,
          author: post.authorName || "Amrendra Kumar",
          tags: post.tags ? post.tags.map((t) => t.tag.name) : [],
          wordCount: post.wordCount,
          content: normalizedContent,
          status: post.status,
          views: post.views || 0,
          faqs: normalizePostFaqs(post.faqs, normalizedContent, false),
        };
      });
    }
  } catch (error) {
    handleDatabaseQueryError("load published posts", error);
    return getPostsFromFilesystem();
  }
}

/**
 * Synchronous markdown-only reader retained for compatibility.
 */
export function getAllPosts() {
  return getPostsFromFilesystem();
}

/** Request-scoped memoization shares card data across metadata, related posts,
 * categories and navigation without adding a persistent cache or delaying CMS updates.
 * Article content and FAQ JSON are only selected by the detail loader.
 */
export const getPostSummariesAsync = cache(async function getPostSummariesAsync() {
  if (isMarkdownSource()) {
    return getPostsFromFilesystem().map(({ content, faqs, ...summary }) => summary);
  }
  assertConfiguredContentSource();
  try {
    const posts = await queryWithRetry(() => prisma.blog.findMany({
      where: { status: "PUBLISHED" },
      select: {
        id: true, title: true, slug: true, excerpt: true, description: true,
        featuredImage: true, ogImage: true, canonicalUrl: true,
        publishedAt: true, createdAt: true, updatedAt: true,
        readingTime: true, wordCount: true, authorName: true,
        seoKeywords: true, seoKeywordsSecondary: true,
        categorySlug: true, category: { select: { name: true, slug: true } },
        tags: { select: { tag: { select: { name: true } } } }, views: true,
      },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    }));
    // Older CMS records may lack both reading-time fields. Fetch only those
    // bodies to preserve their existing derived read time, rather than all bodies.
    const missing = posts.filter(post => !post.readingTime && !post.wordCount);
    const legacy = missing.length ? await prisma.blog.findMany({
      where: { id: { in: missing.map(post => post.id) }, status: "PUBLISHED" },
      select: { id: true, content: true },
    }) : [];
    const legacyTimes = new Map(legacy.map(post => [post.id, calculateReadingTime(post.content)]));
    return posts.map(post => ({
      id: post.id, title: post.title, slug: post.slug,
      excerpt: post.excerpt || "", description: post.description || post.excerpt || "",
      image: post.featuredImage || post.ogImage || "/images/og-blog.png",
      featuredImage: post.featuredImage || post.ogImage,
      ogImage: post.ogImage, canonicalUrl: post.canonicalUrl,
      date: (post.publishedAt || post.createdAt).toISOString().split("T")[0],
      publishedAt: post.publishedAt?.toISOString() || null,
      updatedAt: post.updatedAt?.toISOString() || null,
      readTime: post.readingTime || legacyTimes.get(post.id) || `${Math.max(1, Math.ceil(post.wordCount / 200))} min read`,
      wordCount: post.wordCount, author: post.authorName || "Amrendra Kumar",
      category: post.category?.name || "General",
      categorySlug: post.categorySlug || post.category?.slug || "general",
      seoKeywords: post.seoKeywords || null,
      seoKeywordsSecondary: post.seoKeywordsSecondary || [],
      tags: post.tags.map(({ tag }) => tag.name), views: post.views || 0,
    }));
  } catch (error) {
    handleDatabaseQueryError("load published post summaries", error);
    return getPostsFromFilesystem().map(({ content, faqs, ...summary }) => summary);
  }
});

/**
 * Returns a single post by its slug (Async).
 */
export const getPostBySlugAsync = cache(async function getPostBySlugAsync(slug) {
  if (isMarkdownSource()) {
    return getPostBySlug(slug);
  }
  assertConfiguredContentSource();

  try {
    const post = await queryWithRetry(() => prisma.blog.findFirst({
      where: { slug, status: "PUBLISHED" },
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
    }));

    if (post) {
      const normalizedContent = normalizeMarkdown(post.content);

      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        date: post.publishedAt
          ? post.publishedAt.toISOString().split("T")[0]
          : post.createdAt.toISOString().split("T")[0],
        publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
        updatedAt: post.updatedAt ? post.updatedAt.toISOString() : null,
        readTime: post.readingTime || calculateReadingTime(post.content),
        category: post.category ? post.category.name : "General",
        categorySlug: post.categorySlug || (post.category ? post.category.slug : "general"),
        excerpt: post.excerpt || "",
        description: post.description || post.excerpt || "",
        metaTitle: post.metaTitle || post.title,
        metaDescription: post.metaDescription || post.description || post.excerpt || "",
        seoKeywords: post.seoKeywords || null,
        seoKeywordsSecondary: post.seoKeywordsSecondary || [],
        canonicalUrl: post.canonicalUrl || null,
        ogImage: post.ogImage || null,
        image: post.featuredImage || post.ogImage || "/images/og-blog.png",
        featuredImage: post.featuredImage || post.ogImage,
        imageAlt: post.title,
        ogImageAlt: post.title,
        author: post.authorName || "Amrendra Kumar",
        tags: post.tags ? post.tags.map((t) => t.tag.name) : [],
        wordCount: post.wordCount,
        content: normalizedContent,
        status: post.status,
        faqs: normalizePostFaqs(post.faqs, normalizedContent, false),
      };
    }

    return getPostBySlug(slug) || null;
  } catch (err) {
    handleDatabaseQueryError(`load post "${slug}"`, err);
    return getPostBySlug(slug) || null;
  }
});

/**
 * Returns a single markdown post by its slug.
 */
export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}

/**
 * Returns all posts matching category slug (Async).
 */
export async function getPostsByCategoryAsync(categorySlug) {
  const posts = await getAllPostsAsync();
  return posts.filter((p) => p.categorySlug === categorySlug);
}

export function getPostsByCategory(categorySlug) {
  const posts = getAllPosts();
  return posts.filter((p) => p.categorySlug === categorySlug);
}

/**
 * Returns unique categories with post count (Async).
 */
export async function getAllCategoriesAsync() {
  if (isMarkdownSource()) {
    return getAllCategories();
  }
  assertConfiguredContentSource();

  try {
    const dbCategories = await queryWithRetry(() => prisma.category.findMany({
      select: {
        slug: true,
        name: true,
        _count: { select: { posts: { where: { status: "PUBLISHED" } } } },
      },
    }));

    return dbCategories.map((c) => ({
      slug: c.slug,
      name: c.name,
      count: c._count.posts,
    }));
  } catch (err) {
    handleDatabaseQueryError("load categories", err);
    return getAllCategories();
  }
}

export function getAllCategories() {
  const posts = getAllPosts();
  const categorySlugs = [...new Set(posts.map((p) => p.categorySlug))];

  return categorySlugs.map((slug) => ({
    slug,
    name: posts.find((p) => p.categorySlug === slug)?.category || slug,
    count: posts.filter((p) => p.categorySlug === slug).length,
  }));
}

/**
 * Returns all unique tags (Async).
 */
export async function getAllTagsAsync() {
  if (isMarkdownSource()) {
    return getAllTags();
  }
  assertConfiguredContentSource();

  try {
    const dbTags = await queryWithRetry(() =>
      prisma.tag.findMany({
        select: { name: true },
      })
    );
    return dbTags.map((t) => t.name).sort();
  } catch (err) {
    handleDatabaseQueryError("load tags", err);
    return getAllTags();
  }
}

export function getAllTags() {
  const posts = getAllPosts();
  return [...new Set(posts.flatMap((p) => p.tags || []))].sort();
}

/**
 * Returns related posts (Async).
 */
export async function getRelatedPostsAsync(slug, limit = 3) {
  const posts = await getPostSummariesAsync();
  const currentPost = posts.find((p) => p.slug === slug);
  if (!currentPost) return [];

  const scored = posts
    .filter((p) => p.slug !== slug)
    .map((post) => {
      let score = 0;
      if (post.categorySlug === currentPost.categorySlug) score += 3;
      const sharedTags = (post.tags || []).filter((tag) =>
        (currentPost.tags || []).includes(tag)
      );
      score += sharedTags.length;
      return { ...post, score };
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}

export function getRelatedPosts(slug, limit = 3) {
  const posts = getAllPosts();
  const currentPost = posts.find((p) => p.slug === slug);
  if (!currentPost) return [];

  const scored = posts
    .filter((p) => p.slug !== slug)
    .map((post) => {
      let score = 0;
      if (post.categorySlug === currentPost.categorySlug) score += 3;
      const sharedTags = (post.tags || []).filter((tag) =>
        (currentPost.tags || []).includes(tag)
      );
      score += sharedTags.length;
      return { ...post, score };
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}

/**
 * Prev and Next posts navigation helper (Async).
 */
export async function getPrevNextPostsAsync(slug) {
  const posts = await getPostSummariesAsync();
  const currentIndex = posts.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) return { prev: null, next: null };

  const prev = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const next = currentIndex > 0 ? posts[currentIndex - 1] : null;

  const slim = (post) =>
    post
      ? {
          title: post.title,
          slug: post.slug,
          category: post.category,
          image: post.image,
        }
      : null;

  return { prev: slim(prev), next: slim(next) };
}

export function getPrevNextPosts(slug) {
  const posts = getAllPosts();
  const currentIndex = posts.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) return { prev: null, next: null };

  const prev = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const next = currentIndex > 0 ? posts[currentIndex - 1] : null;

  const slim = (post) =>
    post
      ? {
          title: post.title,
          slug: post.slug,
          category: post.category,
          image: post.image,
        }
      : null;

  return { prev: slim(prev), next: slim(next) };
}
