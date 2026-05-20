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

// Additional featured posts used on homepage
posts.push(
  {
    title: "Building Reusable React Component Systems at Scale",
    slug: "react-component-systems",
    category: "React",
    date: "April 1, 2026",
    readTime: "8 min read",
    author: "Amrendra",
    excerpt: "Learn how to architect component libraries that grow with your application, enforcing consistency while remaining flexible for complex UI needs.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop",
    content: "# Building Reusable React Component Systems at Scale\n\nContent..."
  },
  {
    title: "Creating Autonomous AI Agents with Modern LLM Workflows",
    slug: "autonomous-ai-agents",
    category: "AI Agents",
    date: "March 28, 2026",
    readTime: "12 min read",
    author: "Amrendra",
    excerpt: "A deep dive into building AI agents that can reason, use tools, and execute complex multi-step workflows using the latest LLM frameworks.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    content: "# Creating Autonomous AI Agents\n\nContent..."
  },
  {
    title: "Designing Multi-Tenant SaaS Platforms for Scale",
    slug: "saas-architecture-scale",
    category: "SaaS Architecture",
    date: "March 24, 2026",
    readTime: "15 min read",
    author: "Amrendra",
    excerpt: "Essential database architectures, routing strategies, and authentication patterns for building scalable multi-tenant applications.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    content: "# Designing Multi-Tenant SaaS Platforms\n\nContent..."
  },
  {
    title: "AWS Infrastructure Best Practices for Startups",
    slug: "aws-infrastructure-startups",
    category: "AWS Infrastructure",
    date: "March 18, 2026",
    readTime: "10 min read",
    author: "Amrendra",
    excerpt: "From VPC design to ECS deployments, learn the foundational AWS services and architectures every startup should implement.",
    image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?q=80&w=1200&auto=format&fit=crop",
    content: "# AWS Infrastructure Best Practices\n\nContent..."
  },
  {
    title: "Automating CI/CD Pipelines with GitHub Actions & Docker",
    slug: "github-actions-docker",
    category: "DevOps",
    date: "March 12, 2026",
    readTime: "9 min read",
    author: "Amrendra",
    excerpt: "A practical guide to containerizing your applications and building robust, automated deployment pipelines.",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1200&auto=format&fit=crop",
    content: "# Automating CI/CD Pipelines\n\nContent..."
  }
);

