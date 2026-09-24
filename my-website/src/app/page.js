import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TerminalSquare, Github, Linkedin, Twitter, Youtube, ChevronDown } from "lucide-react";
import nextDynamic from 'next/dynamic';
const CategoriesSection = nextDynamic(() => import('@/components/blog/CategoriesSection'));
const FAQ = nextDynamic(() => import('@/components/FAQ'));
import { getPostSummariesAsync } from "@/lib/posts";
import { getAllCaseStudies } from "@/lib/case-studies";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema, getOrganizationSchema, getPersonSchema, getLocalBusinessSchema, getFAQSchema } from "@/lib/schema";
import { faqData } from "@/data/faqData";
import { siteMetadata } from "@/config/seo";
import HomeClient from "@/components/HomeClient";

// Keep the public landing page cached at the CDN after it has been generated. The
// previous force-dynamic/revalidate=0 combination made every visitor wait for
// a database query and a server render before receiving any HTML.
export const revalidate = 300;

export const metadata = {
  title: "Code with Amrendra | AI Development & Cloud Services",
  description: "Code with Amrendra builds fast websites, AI automation, and cloud infrastructure for startups and businesses. React & Next.js experts.",
  openGraph: {
    title: 'Code with Amrendra | AI Development & Cloud Services',
    description: 'Code with Amrendra builds fast websites, AI automation, and cloud infrastructure for startups and businesses. React & Next.js experts.',
    url: siteMetadata.siteUrl,
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
    title: 'Code with Amrendra | AI Development & Cloud Services',
    description: 'Code with Amrendra builds fast websites, AI automation, and cloud infrastructure for startups and businesses. React & Next.js experts.',
    images: ['/images/og-default.png'],
  },
  alternates: {
    canonical: siteMetadata.siteUrl,
  },
};


export default async function Home() {
  // Fetch posts from database (or markdown fallback) and pick top 3 for featured section
  const allPosts = await getPostSummariesAsync();
  const featuredPosts = allPosts.slice(0, 3).map((post) => ({
    title: post.title,
    excerpt: post.excerpt || post.description || "",
    description: post.excerpt || post.description || "",
    category: post.category,
    date: post.date,
    readTime: post.readTime,
    readingTime: post.readTime,
    image: post.image,
    slug: post.slug,
    link: `/resources/blog/${post.slug}`,
    tags: post.tags || [],
    author: post.author || "Amrendra Kumar",
    authorImage: "/profile-photo.jpeg",
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

  const faqSchema = getFAQSchema(faqData);
  const homeSchemas = [
    getWebsiteSchema(),
    getOrganizationSchema(),
    getPersonSchema(),
    getLocalBusinessSchema(),
    ...(faqSchema ? [faqSchema] : [])
  ].filter(Boolean);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": homeSchemas
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative bg-[var(--background)]">
      <JsonLd data={combinedSchema} />

      <HomeClient featuredPosts={featuredPosts} caseStudies={caseStudies} />

      {/* FAQ Section */}
      <FAQ />

      {/* Categories Section */}
      <CategoriesSection categoryCounts={categoryCounts} />
    </div>
  );
}
