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
};

export default function BlogPage() {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      <HeroSection />
      <FeaturedPosts />
      <CategoriesSection />
      <BlogPageClient />
    </div>
  );
}
