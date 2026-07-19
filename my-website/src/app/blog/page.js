import HeroSection from "@/components/blog/HeroSection";
import BlogPageClient from "@/components/blog/BlogPageClient";
import { getAllPosts, getAllTags } from "@/lib/posts";
import JsonLd from "@/components/JsonLd";
import { getCollectionPageSchema } from "@/lib/schema";

export const metadata = {
  title: "Blog | Code with Amrendra",
  description: "Read the latest stories and insights from Code with Amrendra.",
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog | Code with Amrendra',
    description: 'Read the latest stories and insights from Code with Amrendra.',
    url: '/blog',
    images: [
      {
        url: '/images/og-blog.png',
        width: 1200,
        height: 630,
        alt: 'Code with Amrendra — Blog',
      },
    ],
  },
  twitter: {
    title: 'Blog | Code with Amrendra',
    description: 'Read the latest stories and insights from Code with Amrendra.',
    images: ['/images/og-blog.png'],
  },
};

export default function BlogPage() {
  // Fetch all posts from markdown files (server-side)
  const posts = getAllPosts();
  const allTags = getAllTags();

  // Transform posts into the shape BlogPageClient expects
  const articles = posts.map((post) => ({
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags || [],
    author: post.author,
    authorImage: "/Profile photo.jpeg",
    date: post.date,
    readTime: post.readTime,
    image: post.image,
    link: `/blog/${post.slug}`,
  }));

  return (
    <div className="bg-[var(--background)] min-h-screen">
      <JsonLd
        data={getCollectionPageSchema({
          name: "Blog — Code with Amrendra",
          description: "Deep dives into architecture, scaling, and engineering workflows.",
          url: "https://codewithamrendra.vercel.app/blog",
        })}
      />
      <HeroSection />
      <BlogPageClient articles={articles} allTags={allTags} />
    </div>
  );
}
