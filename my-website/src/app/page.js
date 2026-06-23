import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TerminalSquare, Github, Linkedin, Twitter, Youtube, ChevronDown } from "lucide-react";
import CategoriesSection from "@/components/blog/CategoriesSection";
import { getAllPosts } from "@/lib/posts";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getPersonSchema } from "@/lib/schema";
import HomeClient from "@/components/HomeClient";

export const metadata = {
  title: "Code with Amrendra — React, AI & SaaS Insights",
  description: "Personal insights on React, AI Agents, SaaS architecture, AWS infrastructure, DevOps automation, and modern software engineering.",
  openGraph: {
    title: 'Code with Amrendra — React, AI & SaaS Insights',
    description: 'Personal insights on React, AI Agents, SaaS architecture, AWS infrastructure, DevOps automation, and modern software engineering.',
    url: '/',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Code with Amrendra — React, AI Agents, SaaS & DevOps',
      },
    ],
  },
  twitter: {
    title: 'Code with Amrendra — React, AI & SaaS Insights',
    description: 'Personal insights on React, AI Agents, SaaS architecture, AWS infrastructure, DevOps automation, and modern software engineering.',
    images: ['/images/og-default.png'],
  },
};


export default function Home() {
  // Fetch posts from markdown files and pick top 5 for featured section
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.slice(0, 5).map((post) => ({
    title: post.title,
    description: post.excerpt,
    category: post.category,
    date: post.date,
    readingTime: post.readTime,
    image: post.image,
    href: `/blog/${post.slug}`,
  }));

  // Compute category counts server-side and pass to client component
  const categoryCounts = {};
  allPosts.forEach((post) => {
    if (post.categorySlug) {
      categoryCounts[post.categorySlug] = (categoryCounts[post.categorySlug] || 0) + 1;
    }
  });

  return (
    <main className="min-h-screen w-full overflow-x-hidden relative bg-[var(--background)]">
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getPersonSchema()} />

      <HomeClient featuredPosts={featuredPosts} />

      {/* Categories Section */}
      <CategoriesSection categoryCounts={categoryCounts} />
    </main>
  );
}