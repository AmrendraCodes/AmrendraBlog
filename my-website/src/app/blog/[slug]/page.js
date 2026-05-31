import { getPostBySlug, getAllPosts } from "@/lib/posts";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { notFound } from "next/navigation";

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

  // Markdown-to-HTML conversion
  const renderContent = (markdown) => {
    let html = markdown;

    // Fenced code blocks (```lang ... ```)
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const escaped = code.replace(/</g, '&lt;').replace(/>/g, '&gt;').trimEnd();
      return `<pre><code class="language-${lang || 'text'}">${escaped}</code></pre>`;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Images: ![alt](url)
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />');

    // Links: [text](url)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Headings
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Horizontal rules
    html = html.replace(/^---$/gim, '<hr />');

    // Bold and italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+)\*/gim, '<em>$1</em>');

    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote><p>$1</p></blockquote>');
    // Merge adjacent blockquotes
    html = html.replace(/<\/blockquote>\n<blockquote>/g, '\n');

    // Unordered lists
    html = html.replace(/^(?:- |\* )(.+)$/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

    // Ordered lists
    html = html.replace(/^\d+\. (.+)$/gim, '<oli>$1</oli>');
    html = html.replace(/(<oli>.*<\/oli>\n?)+/g, (match) => {
      return `<ol>${match.replace(/<\/?oli>/g, (t) => t.replace('oli', 'li'))}</ol>`;
    });

    // Paragraphs — wrap remaining plain-text lines
    const lines = html.split('\n\n');
    html = lines.map(block => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (/^<(h[1-6]|ul|ol|li|pre|blockquote|hr|img|div|table)/.test(trimmed)) return trimmed;
      if (trimmed.startsWith('<p>')) return trimmed;
      return `<p>${trimmed.replace(/\n/g, '<br/>')}</p>`;
    }).join('\n');

    return html;
  };


  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
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

        <div className="relative h-full max-w-4xl mx-auto px-6 flex flex-col justify-end pb-12">
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
          prose-headings:text-slate-900 dark:text-slate-50 prose-headings:font-extrabold prose-headings:tracking-tight
          prose-p:text-slate-600 dark:text-slate-300 prose-p:leading-relaxed prose-p:text-lg
          prose-strong:text-slate-900 dark:text-slate-50 prose-a:text-blue-600 hover:prose-a:text-blue-700
          prose-img:rounded-4xl prose-img:shadow-2xl">
          <div dangerouslySetInnerHTML={{ __html: renderContent(post.content) }} />
        </div>
      </article>
    </main>
  );
}
