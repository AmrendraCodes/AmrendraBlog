// Example data helper - replace with real data fetching (filesystem, CMS etc.)
const posts = [
  {
    title: "The Future of Web Development: What to Expect in 2026",
    slug: "future-of-web-dev",
    category: "Development",
    categorySlug: "development",
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
    categorySlug: "design",
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
    categorySlug: "productivity",
    date: "Feb 22, 2026",
    readTime: "5 min read",
    author: "John Doe",
    excerpt: "Practical strategies and tools to keep your distributed team synchronized and focused on high-impact results.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
    content: "# 10 Productivity Hacks for Remote Engineering Teams\n\nPractical strategies and tools to keep your distributed team synchronized and focused on high-impact results..."
  },
  {
    title: "Building Reusable React Component Systems at Scale",
    slug: "react-component-systems",
    category: "React",
    categorySlug: "react",
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
    categorySlug: "ai-agents",
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
    categorySlug: "saas-architecture",
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
    categorySlug: "aws-infrastructure",
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
    categorySlug: "devops",
    date: "March 12, 2026",
    readTime: "9 min read",
    author: "Amrendra",
    excerpt: "A practical guide to containerizing your applications and building robust, automated deployment pipelines.",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1200&auto=format&fit=crop",
    content: "# Automating CI/CD Pipelines\n\nContent..."
  },
  // Posts for FeaturedPosts component
  {
    title: "The Future of User Interfaces: Glassmorphism and Beyond",
    slug: "future-of-user-interfaces",
    category: "Design",
    categorySlug: "design",
    date: "May 12, 2026",
    readTime: "5 min read",
    author: "Amrendra Kumar",
    excerpt: "Explore the evolution of modern UI design. From flat design to glassmorphism, we dive deep into the trends shaping the future of digital experiences.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop",
    content: "# The Future of User Interfaces: Glassmorphism and Beyond\n\nExplore the evolution of modern UI design. From flat design to glassmorphism, we dive deep into the trends shaping the future of digital experiences and how you can implement them today."
  },
  // Posts for LatestArticles component
  {
    title: "The Anatomy of a High-Converting Landing Page",
    slug: "high-converting-landing-page",
    category: "Marketing",
    categorySlug: "marketing",
    date: "May 10, 2026",
    readTime: "7 min read",
    author: "Sarah Jenkins",
    excerpt: "Discover the psychological triggers and design patterns that turn casual visitors into paying customers.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    content: "# The Anatomy of a High-Converting Landing Page\n\nDiscover the psychological triggers and design patterns that turn casual visitors into paying customers."
  },
  {
    title: "Mastering Tailwind CSS in 2026",
    slug: "mastering-tailwind-css",
    category: "Development",
    categorySlug: "development",
    date: "May 8, 2026",
    readTime: "8 min read",
    author: "Amrendra Kumar",
    excerpt: "A comprehensive guide to using the latest utility classes and features to build responsive, modern interfaces faster.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    content: "# Mastering Tailwind CSS in 2026\n\nA comprehensive guide to using the latest utility classes and features to build responsive, modern interfaces faster."
  },
  {
    title: "Why Minimalist UI is Back and Here to Stay",
    slug: "minimalist-ui",
    category: "Design",
    categorySlug: "design",
    date: "May 5, 2026",
    readTime: "6 min read",
    author: "Elena Rodriguez",
    excerpt: "How stripping away the noise can lead to better user engagement, faster load times, and a premium brand feel.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    content: "# Why Minimalist UI is Back and Here to Stay\n\nHow stripping away the noise can lead to better user engagement, faster load times, and a premium brand feel."
  },
  {
    title: "Building Scalable Next.js Applications",
    slug: "scalable-nextjs",
    category: "Development",
    categorySlug: "development",
    date: "May 2, 2026",
    readTime: "10 min read",
    author: "David Chen",
    excerpt: "Architectural patterns and best practices for creating Next.js apps that perform under heavy traffic.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
    content: "# Building Scalable Next.js Applications\n\nArchitectural patterns and best practices for creating Next.js apps that perform under heavy traffic."
  },
  {
    title: "Typography Rules Every Designer Should Know",
    slug: "typography-rules",
    category: "Design",
    categorySlug: "design",
    date: "April 28, 2026",
    readTime: "5 min read",
    author: "Sarah Jenkins",
    excerpt: "Stop guessing your font sizes. Learn the mathematical ratios and pairing techniques for perfect typography.",
    image: "https://images.unsplash.com/photo-1515378960530-7c0da6229674?q=80&w=800&auto=format&fit=crop",
    content: "# Typography Rules Every Designer Should Know\n\nStop guessing your font sizes. Learn the mathematical ratios and pairing techniques for perfect typography."
  },
  {
    title: "The Ultimate Guide to SEO in the AI Era",
    slug: "seo-ai-era",
    category: "Marketing",
    categorySlug: "marketing",
    date: "April 24, 2026",
    readTime: "9 min read",
    author: "Michael Torres",
    excerpt: "How search engines are changing and what you need to do today to keep your content ranking high.",
    image: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=800&auto=format&fit=crop",
    content: "# The Ultimate Guide to SEO in the AI Era\n\nHow search engines are changing and what you need to do today to keep your content ranking high."
  },
];

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(categorySlug) {
  return posts.filter((p) => p.categorySlug === categorySlug);
}

export function getAllCategories() {
  const categories = [...new Set(posts.map((p) => p.categorySlug))];
  return categories.map((slug) => ({
    slug,
    name: posts.find((p) => p.categorySlug === slug)?.category || slug,
    count: posts.filter((p) => p.categorySlug === slug).length,
  }));
}
