import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { prisma } from "./prisma.js";

// Fallback path to the content/posts directory
const postsDirectory = path.join(process.cwd(), "content", "posts");

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

  // Remove any trailing standalone dashes/hyphens/equals at the very end of content
  processed = processed.replace(/\n+[ \t]*[-=_*]{1,3}[ \t]*$/, '\n');

  // Ensure horizontal rules / dividers (---, ===, ***, ___) have blank lines before and after them.
  // Also clean up 1-2 char underlines directly below paragraphs that turn regular text into Setext H1/H2 headings.
  processed = processed.replace(
    /([^\n\r])[ \t]*\r?\n[ \t]*((?:-[ \t]*){1,}|(?:=[ \t]*){1,}|(?:\*[ \t]*){3,}|(?:_[ \t]*){3,})[ \t]*(\r?\n|$)/g,
    (match, textBefore, divider, textAfter) => {
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
 * Fallback loader from markdown files if DB is unavailable.
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

    return {
      id: data.slug || fileName.replace(/\.md$/, ""),
      title: data.title,
      slug: data.slug,
      date: data.date,
      readTime: data.readTime || calculateReadingTime(content),
      category: data.category,
      categorySlug: data.categorySlug,
      excerpt: data.excerpt,
      description: data.description || data.excerpt,
      image: data.image || data.featuredImage,
      featuredImage: data.featuredImage || data.image,
      metaTitle: data.metaTitle || data.title,
      metaDescription: data.metaDescription || data.description || data.excerpt,
      imageAlt: data.imageAlt || data.ogImageAlt || data.title,
      ogImageAlt: data.ogImageAlt || data.imageAlt || data.title,
      author: data.author || "Amrendra Kumar",
      tags: data.tags || [],
      wordCount: countWords(content),
      content: normalizeMarkdown(content),
      status: "PUBLISHED",
      views: data.views || 0,
      faqs: data.faqs || null,
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
  try {
    const dbPosts = await prisma.blog.findMany({
      where: { status: "PUBLISHED" },
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    });

    if (dbPosts && dbPosts.length > 0) {
      return dbPosts.map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        date: post.publishedAt
          ? post.publishedAt.toISOString().split("T")[0]
          : post.createdAt.toISOString().split("T")[0],
        readTime: post.readingTime || calculateReadingTime(post.content),
        category: post.category ? post.category.name : "General",
        categorySlug: post.categorySlug || (post.category ? post.category.slug : "general"),
        excerpt: post.excerpt || "",
        description: post.description || post.excerpt || "",
        metaTitle: post.metaTitle || post.title,
        metaDescription: post.metaDescription || post.description || post.excerpt || "",
        image: post.featuredImage || post.ogImage || "/images/og-blog.png",
        featuredImage: post.featuredImage || post.ogImage,
        imageAlt: post.title,
        ogImageAlt: post.title,
        author: post.authorName || "Amrendra Kumar",
        tags: post.tags ? post.tags.map((t) => t.tag.name) : [],
        wordCount: post.wordCount,
        content: normalizeMarkdown(post.content),
        status: post.status,
        views: post.views || 0,
        faqs: typeof post.faqs === "string" ? (() => { try { return JSON.parse(post.faqs); } catch { return null; } })() : (post.faqs || null),
      }));
    }
  } catch (error) {
    console.warn("⚠️ Database query failed in posts.js, falling back to filesystem markdown:", error?.message || error);
  }

  return getPostsFromFilesystem();
}

/**
 * Synchronous version for static generation fallback.
 */
export function getAllPosts() {
  return getPostsFromFilesystem();
}

/**
 * Returns a single post by its slug (Async).
 */
export async function getPostBySlugAsync(slug) {
  try {
    const post = await prisma.blog.findUnique({
      where: { slug },
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
    });

    if (post) {
      let postFaqs = post.faqs || null;
      if (!postFaqs) {
        try {
          const rawRows = await prisma.$queryRawUnsafe(
            'SELECT "faqs" FROM "Blog" WHERE "id" = $1',
            post.id
          );
          postFaqs = rawRows[0]?.faqs || null;
        } catch {
          // ignore
        }
      }

      if (typeof postFaqs === "string") {
        try {
          postFaqs = JSON.parse(postFaqs);
        } catch {
          postFaqs = null;
        }
      }

      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        date: post.publishedAt
          ? post.publishedAt.toISOString().split("T")[0]
          : post.createdAt.toISOString().split("T")[0],
        readTime: post.readingTime || calculateReadingTime(post.content),
        category: post.category ? post.category.name : "General",
        categorySlug: post.categorySlug || (post.category ? post.category.slug : "general"),
        excerpt: post.excerpt || "",
        description: post.description || post.excerpt || "",
        metaTitle: post.metaTitle || post.title,
        metaDescription: post.metaDescription || post.description || post.excerpt || "",
        image: post.featuredImage || post.ogImage || "/images/og-blog.png",
        featuredImage: post.featuredImage || post.ogImage,
        imageAlt: post.title,
        ogImageAlt: post.title,
        author: post.authorName || "Amrendra Kumar",
        tags: post.tags ? post.tags.map((t) => t.tag.name) : [],
        wordCount: post.wordCount,
        content: normalizeMarkdown(post.content),
        status: post.status,
        faqs: postFaqs,
      };
    }
  } catch (err) {
    console.warn("⚠️ Database lookup failed for slug, using filesystem:", slug, err?.message || err);
  }

  return getPostBySlug(slug);
}

/**
 * Returns a single post by its slug (Sync fallback).
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
  try {
    const dbCategories = await prisma.category.findMany({
      include: {
        posts: { where: { status: "PUBLISHED" } },
      },
    });

    if (dbCategories && dbCategories.length > 0) {
      return dbCategories.map((c) => ({
        slug: c.slug,
        name: c.name,
        count: c.posts ? c.posts.length : 0,
      }));
    }
  } catch (err) {
    console.warn("⚠️ Database categories lookup failed:", err?.message || err);
  }

  const posts = getAllPosts();
  const categorySlugs = [...new Set(posts.map((p) => p.categorySlug))];

  return categorySlugs.map((slug) => ({
    slug,
    name: posts.find((p) => p.categorySlug === slug)?.category || slug,
    count: posts.filter((p) => p.categorySlug === slug).length,
  }));
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
  try {
    const dbTags = await prisma.tag.findMany({
      select: { name: true },
    });
    if (dbTags && dbTags.length > 0) {
      return dbTags.map((t) => t.name).sort();
    }
  } catch (err) {
    console.warn("⚠️ Database tags lookup failed:", err?.message || err);
  }

  const posts = getAllPosts();
  return [...new Set(posts.flatMap((p) => p.tags || []))].sort();
}

export function getAllTags() {
  const posts = getAllPosts();
  return [...new Set(posts.flatMap((p) => p.tags || []))].sort();
}

/**
 * Returns related posts (Async).
 */
export async function getRelatedPostsAsync(slug, limit = 3) {
  const posts = await getAllPostsAsync();
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
  const posts = await getAllPostsAsync();
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
