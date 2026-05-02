import HeroSection from "@/components/blog/HeroSection";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import CategoriesSection from "@/components/blog/CategoriesSection";
import LatestArticles from "@/components/blog/LatestArticles";

export const metadata = {
  title: "Blog | AmrendraBlog",
  description: "Read the latest stories and insights from AmrendraBlog.",
};

export default function BlogPage() {
  return (
    <div className="bg-white min-h-screen">
      <HeroSection />
      <FeaturedPosts />
      <CategoriesSection />
      <LatestArticles />
    </div>
  );
}
