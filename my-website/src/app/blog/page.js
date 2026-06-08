import HeroSection from "@/components/blog/HeroSection";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import CategoriesSection from "@/components/blog/CategoriesSection";
import BlogPageClient from "@/components/blog/BlogPageClient";

export const metadata = {
  title: "Blog | AmrendraBlog",
  description: "Read the latest stories and insights from AmrendraBlog.",
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog | AmrendraBlog',
    description: 'Read the latest stories and insights from AmrendraBlog.',
    url: '/blog',
    images: [
      {
        url: '/images/og-blog.png',
        width: 1200,
        height: 630,
        alt: 'AmrendraBlog — Blog',
      },
    ],
  },
  twitter: {
    title: 'Blog | AmrendraBlog',
    description: 'Read the latest stories and insights from AmrendraBlog.',
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
