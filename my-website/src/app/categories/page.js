import Link from "next/link";
import CategoriesSection from "@/components/blog/CategoriesSection";
import { getAllPostsAsync } from "@/lib/posts";

export const revalidate = 0;

export const metadata = {
  title: "Categories | Code with Amrendra",
  description: "Browse blog posts by category — React, AI Agents, SaaS Architecture, DevOps, and more.",
  alternates: {
    canonical: '/categories',
  },
  openGraph: {
    title: 'Categories | Code with Amrendra',
    description: 'Browse blog posts by category — React, AI Agents, SaaS Architecture, DevOps, and more.',
    url: '/categories',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Code with Amrendra — Browse Categories',
      },
    ],
  },
  twitter: {
    title: 'Categories | Code with Amrendra',
    description: 'Browse blog posts by category — React, AI Agents, SaaS Architecture, DevOps, and more.',
    images: ['/images/og-default.png'],
  },
};

export default async function CategoriesPage() {
  const allPosts = await getAllPostsAsync();
  const categoryCounts = {};
  allPosts.forEach((post) => {
    if (post.categorySlug) {
      categoryCounts[post.categorySlug] = (categoryCounts[post.categorySlug] || 0) + 1;
    }
  });

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <CategoriesSection categoryCounts={categoryCounts} headingLevel="h1" />
    </div>
  );
}
