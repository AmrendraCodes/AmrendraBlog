import HeroSection from "@/components/blog/HeroSection";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import CategoriesSection from "@/components/blog/CategoriesSection";
import BlogPageClient from "@/components/blog/BlogPageClient";

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
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      <HeroSection />
      <BlogPageClient />
    </div>
  );
}
