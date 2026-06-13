import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Path to the content/posts directory
const postsDirectory = path.join(process.cwd(), 'content', 'posts');

/**
 * Reads all markdown files from content/posts/ and returns parsed post objects.
 * Results are sorted by date (newest first).
 */
export function getAllPosts() {
  // Read all .md files from the posts directory
  const fileNames = fs.readdirSync(postsDirectory).filter((file) =>
    file.endsWith('.md')
  );

  const posts = fileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    // Parse frontmatter and content using gray-matter
    const { data, content } = matter(fileContents);

    return {
      title: data.title,
      slug: data.slug,
      date: data.date,
      readTime: data.readTime,
      category: data.category,
      categorySlug: data.categorySlug,
      excerpt: data.excerpt,
      image: data.image,
      author: data.author,
      tags: data.tags || [],
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
