/**
 * toc.js — Extracts Table of Contents from markdown content.
 *
 * Parses H2, H3, and H4 headings from raw markdown text and returns
 * a flat array of heading objects. The `id` matches what rehype-slug generates.
 */

/**
 * Converts heading text to a URL-friendly slug matching rehype-slug output.
 * @param {string} text
 * @returns {string}
 */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens
    .replace(/^-+|-+$/g, ""); // Trim hyphens
}

/**
 * Extracts headings (H2–H4) from raw markdown content.
 *
 * @param {string} markdownContent - Raw markdown string
 * @returns {Array<{id: string, text: string, level: number}>}
 */
export function extractTocHeadings(markdownContent) {
  if (!markdownContent) return [];

  const headingRegex = /^(#{2})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(markdownContent)) !== null) {
    const level = match[1].length; // 2, 3, or 4
    const rawText = match[2].trim();

    // Strip inline markdown formatting (bold, italic, code, links)
    const text = rawText
      .replace(/\*\*(.+?)\*\*/g, "$1") // bold
      .replace(/\*(.+?)\*/g, "$1") // italic
      .replace(/`(.+?)`/g, "$1") // inline code
      .replace(/\[(.+?)\]\(.+?\)/g, "$1"); // links

    headings.push({
      id: slugify(text),
      text,
      level,
    });
  }

  return headings;
}

/**
 * Builds a nested tree structure from flat heading list.
 * Each H2 becomes a top-level item, H3s nest under the preceding H2, etc.
 *
 * @param {Array<{id: string, text: string, level: number}>} headings
 * @returns {Array<{id: string, text: string, level: number, children: Array}>}
 */
export function buildTocTree(headings) {
  const tree = [];
  const stack = []; // Stack to track nesting

  for (const heading of headings) {
    const node = { ...heading, children: [] };

    // Pop items from stack that are at the same or deeper level
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      // Top-level item
      tree.push(node);
    } else {
      // Nest under the last item in the stack
      stack[stack.length - 1].children.push(node);
    }

    stack.push(node);
  }

  return tree;
}
