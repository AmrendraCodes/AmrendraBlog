// Example data helper - replace with real data fetching (filesystem, CMS etc.)
const posts = [
  {
    slug: "first-post",
    title: "My first post",
    excerpt: "An introduction to the blog.",
    content: "# Hello world\nThis is the body of the first post.",
  },
  {
    slug: "another-entry",
    title: "Another entry",
    excerpt: "A second post sample.",
    content: "# Another entry\nMore content here.",
  },
];

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}
