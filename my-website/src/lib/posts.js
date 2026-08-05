import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { prisma } from "./prisma";

// Fallback path to the content/posts directory
const postsDirectory = path.join(process.cwd(), "content", "posts");

function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
}

function countWords(content) {
  return content ? content.trim().split(/\s+/).length : 0;
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
      author: data.author || "Amrendra Kumar",
      tags: data.tags || [],
      wordCount: countWords(content),
      content: content.trim(),
      status: "PUBLISHED",
    };
  });

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return posts;
}

/**
 * Reads all published posts from database or fallback to filesystem.
 * Returns posts sorted by date (newest first).
 */
export async function getAllPostsAsync() {
  try {
    const dbPosts = await prisma.blog.findMany({
      where: { status: "PUBLISHED" },
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
      orderBy: { publishedAt: "desc" },
    });

    if (dbPosts && dbPosts.length > 0) {
      return dbPosts.map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        date: post.publishedAt
          ? post.publishedAt.toISOString().split("T")[0]
          : post.createdAt.toISOString().split("T")[0],
        readTime: post.readingTime || "5 min read",
        category: post.category ? post.category.name : "General",
        categorySlug: post.categorySlug || (post.category ? post.category.slug : "general"),
        excerpt: post.excerpt || "",
        description: post.description || post.excerpt || "",
        image: post.featuredImage || post.ogImage,
        featuredImage: post.featuredImage || post.ogImage,
        author: post.authorName || "Amrendra Kumar",
        tags: post.tags ? post.tags.map((t) => t.tag.name) : [],
        wordCount: post.wordCount,
        content: post.content,
        status: post.status,
      }));
    }
  } catch (error) {
    console.warn("⚠️ Database query failed in posts.js, falling back to filesystem markdown:", error.message);
  }

  return getPostsFromFilesystem();
}

/**
 * Synchronous version for backwards compatibility with existing SSG pages.
 */
export function getAllPosts() {
  return getPostsFromFilesystem();
}

/**
 * Returns a single post by its slug.
 */
export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}

/**
 * Async version of getPostBySlug.
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
      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        date: post.publishedAt
          ? post.publishedAt.toISOString().split("T")[0]
          : post.createdAt.toISOString().split("T")[0],
        readTime: post.readingTime || "5 min read",
        category: post.category ? post.category.name : "General",
        categorySlug: post.categorySlug || (post.category ? post.category.slug : "general"),
        excerpt: post.excerpt || "",
        description: post.description || post.excerpt || "",
        image: post.featuredImage || post.ogImage,
        featuredImage: post.featuredImage || post.ogImage,
        author: post.authorName || "Amrendra Kumar",
        tags: post.tags ? post.tags.map((t) => t.tag.name) : [],
        wordCount: post.wordCount,
        content: post.content,
        status: post.status,
      };
    }
  } catch (err) {
    console.warn("⚠️ Database lookup failed for slug, using filesystem:", slug);
  }

  return getPostBySlug(slug);
}

/**
 * Returns all posts matching category slug.
 */
export function getPostsByCategory(categorySlug) {
  const posts = getAllPosts();
  return posts.filter((p) => p.categorySlug === categorySlug);
}

/**
 * Returns unique categories with post count.
 */
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
 * Returns all unique tags.
 */
export function getAllTags() {
  const posts = getAllPosts();
  return [...new Set(posts.flatMap((p) => p.tags || []))].sort();
}

/**
 * Returns related posts.
 */
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
 * Prev and Next posts navigation helper.
 */
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
