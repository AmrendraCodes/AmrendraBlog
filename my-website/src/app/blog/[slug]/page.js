import { getPostBySlug } from "@/lib/posts";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { notFound } from "next/navigation";

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-slate-900 overflow-hidden">
        <img
          src={post.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200"}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

        <div className="relative h-full max-w-4xl mx-auto px-6 flex flex-col justify-end pb-12">
          <Link
            href="/blog"
            className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Journal
          </Link>

          <div className="flex items-center space-x-3 mb-6">
            <span className="bg-blue-600 text-white text-[11px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-blue-500/20">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm font-medium border-t border-white/10 pt-8">
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="prose prose-lg prose-slate max-w-none 
          prose-headings:text-slate-900 prose-headings:font-extrabold prose-headings:tracking-tight
          prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-lg
          prose-strong:text-slate-900 prose-a:text-blue-600 hover:prose-a:text-blue-700
          prose-img:rounded-[2rem] prose-img:shadow-2xl">
          {/* This is a simple placeholder for blog content rendering. In a real app, use react-markdown or similar */}
          <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
        </div>
      </article>
    </main>
  );
}
