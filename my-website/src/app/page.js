import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TerminalSquare, Github, Linkedin, Twitter, Youtube, ChevronDown } from "lucide-react";
import dynamic from 'next/dynamic';
const CategoriesSection = dynamic(() => import('@/components/blog/CategoriesSection'));
const FAQ = dynamic(() => import('@/components/FAQ'));
import { getAllPostsAsync } from "@/lib/posts";
import { getAllCaseStudies } from "@/lib/case-studies";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getPersonSchema, getLocalBusinessSchema } from "@/lib/schema";
import HomeClient from "@/components/HomeClient";

export const revalidate = 0;

export const metadata = {
  title: "Code With Amrendra | AI Development Services & Cloud",
  description: "Code With Amrendra delivers AI Development Services, custom software, SaaS & cloud engineering for modern businesses. Book a free consultation today.",
  openGraph: {
    title: 'Code With Amrendra | AI Development Services & Cloud',
    description: 'Code With Amrendra delivers AI Development Services, custom software, SaaS & cloud engineering for modern businesses. Book a free consultation today.',
    url: '/',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Code With Amrendra | AI Development Services & Cloud',
      },
    ],
  },
  twitter: {
    title: 'Code With Amrendra | AI Development Services & Cloud',
    description: 'Code With Amrendra delivers AI Development Services, custom software, SaaS & cloud engineering for modern businesses. Book a free consultation today.',
    images: ['/images/og-default.png'],
  },
  alternates: {
    canonical: 'https://www.codewithamrendra.in',
  },
};


export default async function Home() {
  // Fetch posts from database (or markdown fallback) and pick top 5 for featured section
  const allPosts = await getAllPostsAsync();
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
  // Fetch case studies from markdown files
  const caseStudies = getAllCaseStudies().slice(0, 3).map((cs) => ({
    title: cs.title,
    slug: cs.slug,
    description: cs.description,
    client: cs.client,
    role: cs.role,
    stack: cs.stack,
    duration: cs.duration,
    coverImage: cs.coverImage,
    metricHighlight: cs.metricHighlight,
  }));

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative bg-[var(--background)]">
      <JsonLd data={getWebsiteSchema()} />
      <JsonLd data={getPersonSchema()} />
      <JsonLd data={getLocalBusinessSchema()} />

      <HomeClient featuredPosts={featuredPosts} caseStudies={caseStudies} />

      {/* FAQ Section */}
      <FAQ />

      {/* Categories Section */}
      <CategoriesSection categoryCounts={categoryCounts} />
    </div>
  );
}