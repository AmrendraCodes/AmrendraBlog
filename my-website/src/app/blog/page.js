import { getAllPosts } from "@/lib/posts";
import BlogCard from "@/components/BlogCard";

export const metadata = {
  title: "Blog | AmrendraBlog",
  description: "Read the latest stories and insights from AmrendraBlog.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="bg-white min-h-screen py-24 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-20 h-1 bg-blue-600 rounded-full opacity-80" />
            <span className="text-blue-600 text-[11px] font-black uppercase tracking-widest">Our Journal</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Latest <span className="text-blue-600">Insights & Stories.</span>
          </h1>
          <p className="mt-4 text-slate-500 text-lg max-w-2xl">
            Explore our collection of articles on web development, design, and team productivity.
            Stay updated with the latest trends in technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
