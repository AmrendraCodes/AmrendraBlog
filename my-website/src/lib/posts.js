import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Path to the content/posts directory
const postsDirectory = path.join(process.cwd(), "content", "posts");

/**
 * Calculates estimated reading time from content.
 * @param {string} content - Markdown content string
 * @returns {string} e.g. "5 min read"
 */
function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
}

/**
 * Counts words in content.
 * @param {string} content
 * @returns {number}
 */
function countWords(content) {
  return content.trim().split(/\s+/).length;
}

/**
 * Reads all markdown files from content/posts/ and returns parsed post objects.
 * Results are sorted by date (newest first).
 */
export function getAllPosts() {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"));

  const posts = fileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");

    // Parse frontmatter and content using gray-matter
    const { data, content } = matter(fileContents);

    return {
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
      author: data.author,
      tags: data.tags || [],
      wordCount: countWords(content),
      content: content.trim(),
    };
  });

  // Sort by date — newest first
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return posts;
}

/**
 * Returns a single post by its slug, or undefined if not found.
 */
export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}

/**
 * Returns all posts that match the given category slug.
 */
export function getPostsByCategory(categorySlug) {
  const posts = getAllPosts();
  return posts.filter((p) => p.categorySlug === categorySlug);
}

/**
 * Returns an array of unique categories with their name, slug, and post count.
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
 * Returns an array of all unique tags across all posts.
 * @returns {string[]}
 */
export function getAllTags() {
  const posts = getAllPosts();
  return [...new Set(posts.flatMap((p) => p.tags || []))].sort();
}

/**
 * Returns related posts based on matching category and tags.
 * @param {string} slug - Current post slug to exclude
 * @param {number} limit - Max number of related posts to return
 * @returns {Array}
 */
export function getRelatedPosts(slug, limit = 3) {
  const posts = getAllPosts();
  const currentPost = posts.find((p) => p.slug === slug);

  if (!currentPost) return [];

  // Score each post by relevance
  const scored = posts
    .filter((p) => p.slug !== slug)
    .map((post) => {
      let score = 0;

      // Same category = +3
      if (post.categorySlug === currentPost.categorySlug) score += 3;

      // Matching tags = +1 each
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
 * Returns previous and next posts for navigation.
 * @param {string} slug - Current post slug
 * @returns {{ prev: Object|null, next: Object|null }}
 */
export function getPrevNextPosts(slug) {
  const posts = getAllPosts();
  const currentIndex = posts.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) return { prev: null, next: null };

  const prev = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const next = currentIndex > 0 ? posts[currentIndex - 1] : null;

  // Return lightweight versions (no content)
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
