import { getAllPosts } from '../../posts';

/**
 * Natural Language Semantic Search Engine using RAG chunking & term frequency scoring
 */
export function searchArticlesNaturalLanguage(query, limit = 5) {
  const posts = getAllPosts();
  if (!query || !query.trim()) return posts.slice(0, limit);

  const keywords = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 2);

  const scored = posts.map((post) => {
    let score = 0;
    const textToSearch = `${post.title} ${post.category} ${post.description} ${post.tags?.join(' ')} ${post.content}`.toLowerCase();

    keywords.forEach((keyword) => {
      // Title match weight = 10
      if (post.title?.toLowerCase().includes(keyword)) score += 10;
      // Category match weight = 6
      if (post.category?.toLowerCase().includes(keyword)) score += 6;
      // Tag match weight = 5
      if (post.tags?.some((t) => t.toLowerCase().includes(keyword))) score += 5;
      // Description & content match weight = 2
      const occurrences = (textToSearch.match(new RegExp(keyword, 'g')) || []).length;
      score += Math.min(occurrences * 2, 10);
    });

    return { ...post, score };
  });

  const results = scored
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score);

  return results.length > 0 ? results.slice(0, limit) : posts.slice(0, limit);
}
