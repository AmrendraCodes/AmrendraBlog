import Link from "next/link";
import CategoriesSection from "@/components/blog/CategoriesSection";

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

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <CategoriesSection />
    </main>
  );
}
