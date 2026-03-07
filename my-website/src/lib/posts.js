// Example data helper - replace with real data fetching (filesystem, CMS etc.)
const posts = [
  {
    title: "The Future of Web Development: What to Expect in 2026",
    slug: "future-of-web-dev",
    category: "Development",
    date: "Feb 27, 2026",
    readTime: "8 min read",
    author: "Amrendra",
    excerpt: "Exploring the evolution of frontend frameworks, AI integration, and the rise of edge computing in modern web architectures.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
    content: "# The Future of Web Development\n\nExploring the evolution of frontend frameworks, AI integration, and the rise of edge computing in modern web architectures..."
  },
  {
    title: "Designing for the Next Billion Users: A Minimalist Approach",
    slug: "minimalist-design",
    category: "Design",
    date: "Feb 25, 2026",
    readTime: "6 min read",
    author: "Sarah Smith",
    excerpt: "How simplicity and performance-first design are shaping the digital experiences of tomorrow across global markets.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800&auto=format&fit=crop",
    content: "# Designing for the Next Billion Users\n\nHow simplicity and performance-first design are shaping the digital experiences of tomorrow across global markets..."
  },
  {
    title: "10 Productivity Hacks for Remote Engineering Teams",
    slug: "remote-productivity",
    category: "Productivity",
    date: "Feb 22, 2026",
    readTime: "5 min read",
    author: "John Doe",
    excerpt: "Practical strategies and tools to keep your distributed team synchronized and focused on high-impact results.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
    content: "# 10 Productivity Hacks for Remote Engineering Teams\n\nPractical strategies and tools to keep your distributed team synchronized and focused on high-impact results..."
  }
];

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}

