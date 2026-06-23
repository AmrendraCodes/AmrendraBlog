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
    <main className="min-h-screen bg-[var(--background)] isolate">
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
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/70 to-transparent" />

        <div className="relative h-full max-w-4xl mx-auto px-6 flex flex-col justify-end pb-12 pt-28">
          <Link
            href="/blog"
            className="inline-flex items-center text-[var(--text-body)] hover:text-[var(--foreground)] mb-8 transition-colors group no-underline"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Journal
          </Link>

          <div className="flex items-center space-x-3 mb-6">
            <Link
              href={`/category/${post.categorySlug}`}
              className="bg-[#6366F1] text-white text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-indigo-500/20 hover:bg-[#818CF8] transition-colors no-underline"
            >
              {post.category}
            </Link>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--text-heading)] tracking-tight leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-[var(--text-body)] text-sm font-medium border-t border-[var(--card-border)] pt-8">
            <div className="flex items-center">
              <Image 
                src="/Profile photo.jpeg" 
                alt={post.author} 
                width={24} 
                height={24} 
                className="w-6 h-6 rounded-full object-cover mr-2 ring-1 ring-[var(--card-border)]" 
              />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 text-[var(--text-muted)]" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2 text-[var(--text-muted)]" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none 
          prose-headings:text-[var(--text-heading)] prose-headings:font-extrabold prose-headings:tracking-tight
          prose-p:text-[var(--text-body)] prose-p:leading-relaxed prose-p:text-lg
          prose-strong:text-[var(--text-heading)] prose-a:text-[#6366F1] hover:prose-a:text-[#818CF8]
          prose-img:rounded-2xl prose-img:shadow-xl
          prose-code:text-[#818CF8] prose-code:bg-[var(--card-bg)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-medium
          prose-pre:bg-[#111214] prose-pre:border prose-pre:border-[var(--card-border)] prose-pre:rounded-xl
          prose-blockquote:border-l-[#6366F1] prose-blockquote:bg-[var(--section-alt-bg)] prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:px-6">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Author Bio Card */}
        <div className="mt-16 pt-10 border-t border-[var(--card-border)]">
          <div className="bg-[var(--section-alt-bg)] rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row gap-8 items-center sm:items-start border border-[var(--card-border)]">
            <div className="shrink-0 relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#6366F1] to-[#a855f7] rounded-full blur-sm opacity-50"></div>
              <Image 
                src="/Profile photo.jpeg" 
                alt="Amrendra kumar" 
                width={96} 
                height={96} 
                className="w-24 h-24 rounded-full object-cover relative border-2 border-[var(--background)]" 
              />
            </div>
            
            <div className="flex flex-col text-center sm:text-left">
              <h3 className="text-2xl font-extrabold text-[var(--text-heading)] mb-2 flex items-center justify-center sm:justify-start gap-2">
                {post.author || "Amrendra kumar"}
                <span className="bg-[#6366F1]/10 text-[#6366F1] dark:text-[#818CF8] text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold">Author</span>
              </h3>
              <p className="text-[var(--text-body)] mb-6 leading-relaxed">
                Hi, I'm Amrendra. I write about Frontend Engineering, AI systems, SaaS architecture, and modern web development. Thanks for reading this blog! Let's connect and build something awesome together.
              </p>
              
              <div className="flex items-center justify-center sm:justify-start gap-3">
                {[
                  { href: "https://x.com/codewithamrendr", icon: Twitter, hoverColor: "hover:text-[#6366F1]" },
                  { href: "https://www.linkedin.com/in/amrendra-reactdev/", icon: Linkedin, hoverColor: "hover:text-[#6366F1]" },
                  { href: "https://github.com/AmrendraCodes", icon: Github, hoverColor: "hover:text-[#6366F1]" },
                ].map(({ href, icon: Icon, hoverColor }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-[var(--text-muted)] ${hoverColor} hover:border-[#6366F1]/30 hover:shadow-md transition-all`}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
