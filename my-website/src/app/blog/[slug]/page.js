import { getPostBySlug, getAllPosts } from "@/lib/posts";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, Twitter, Linkedin, Github } from "lucide-react";
import { notFound } from "next/navigation";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import "highlight.js/styles/atom-one-dark.css";
import JsonLd from "@/components/JsonLd";
import { getBlogPostSchema, getBreadcrumbSchema } from "@/lib/schema";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postSchema = getBlogPostSchema({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    image: post.image,
    datePublished: post.date,
    category: post.category,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://amrendra-blog.vercel.app" },
    { name: "Blog", url: "https://amrendra-blog.vercel.app/blog" },
    {
      name: post.title,
      url: `https://amrendra-blog.vercel.app/blog/${post.slug}`,
    },
  ]);

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 isolate">
      <JsonLd data={postSchema} />
      <JsonLd data={breadcrumbSchema} />
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src={post.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200"}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-linear-to-t from-white dark:from-slate-950 via-white/70 dark:via-slate-950/70 to-transparent" />

        <div className="relative h-full max-w-4xl mx-auto px-6 flex flex-col justify-end pb-12 pt-28">
          <Link
            href="/blog"
            className="inline-flex items-center text-slate-700 hover:text-slate-900 dark:text-slate-50 mb-8 transition-colors group"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Journal
          </Link>

          <div className="flex items-center space-x-3 mb-6">
            <Link href={`/category/${post.categorySlug}`} className="bg-blue-600 text-white text-[11px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors">
              {post.category}
            </Link>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-slate-50 tracking-tight leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-slate-600 dark:text-slate-300 text-sm font-medium border-t border-slate-200 dark:border-slate-800 pt-8">
            <div className="flex items-center">
              <Image 
                src="/Profile photo.jpeg" 
                alt={post.author} 
                width={24} 
                height={24} 
                className="w-6 h-6 rounded-full object-cover mr-2" 
              />
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
          prose-headings:text-slate-900 dark:text-slate-50 prose-headings:font-extrabold prose-headings:tracking-tight
          prose-p:text-slate-600 dark:text-slate-300 prose-p:leading-relaxed prose-p:text-lg
          prose-strong:text-slate-900 dark:text-slate-50 prose-a:text-blue-600 hover:prose-a:text-blue-700
          prose-img:rounded-4xl prose-img:shadow-2xl">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Author Bio Card */}
        <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row gap-8 items-center sm:items-start border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="shrink-0 relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-sm opacity-50"></div>
              <Image 
                src="/Profile photo.jpeg" 
                alt="Amrendra kumar" 
                width={96} 
                height={96} 
                className="w-24 h-24 rounded-full object-cover relative border-2 border-white dark:border-slate-900" 
              />
            </div>
            
            <div className="flex flex-col text-center sm:text-left">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 flex items-center justify-center sm:justify-start gap-2">
                {post.author || "Amrendra kumar"}
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold">Author</span>
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Hi, I'm Amrendra. I write about Frontend Engineering, AI systems, SaaS architecture, and modern web development. Thanks for reading this blog! Let's connect and build something awesome together.
              </p>
              
              <div className="flex items-center justify-center sm:justify-start gap-4">
                <a href="https://x.com/codewithamrendr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-blue-500 hover:shadow-md transition-all border border-slate-200 dark:border-slate-700">
                  <Twitter size={18} />
                </a>
                <a href="https://www.linkedin.com/in/amrendra-reactdev/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-blue-700 hover:shadow-md transition-all border border-slate-200 dark:border-slate-700">
                  <Linkedin size={18} />
                </a>
                <a href="https://github.com/AmrendraCodes" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white hover:shadow-md transition-all border border-slate-200 dark:border-slate-700">
                  <Github size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
