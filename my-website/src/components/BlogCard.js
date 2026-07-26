"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Calendar, User, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function BlogCard({ post }) {
  const postLink = post.link || `/blog/${post.slug}`;
  return (
    <motion.article 
      whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative bg-[var(--card-bg)] rounded-3xl overflow-hidden border border-[rgba(255,255,255,0.05)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-3d)] transition-shadow duration-500"
    >
      {/* Thumbnail */}
      <div className="relative h-64 overflow-hidden rounded-t-3xl">
        <Image
          src={post.image || `https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop`}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[#10B981] text-white text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
            {post.category || "Technology"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-7">
        <div className="flex items-center space-x-4 text-[var(--text-muted)] text-[12px] font-medium mb-4">
          <div className="flex items-center">
            <Calendar size={14} className="mr-1.5" />
            <span>{post.date || "Feb 27, 2026"}</span>
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1.5" />
            <span>{post.readTime || "5 min read"}</span>
          </div>
        </div>

        <h3 className="text-xl lg:text-2xl font-bold text-[var(--text-heading)] mb-3 leading-snug group-hover:text-[#10B981] dark:group-hover:text-[#34D399] transition-colors line-clamp-2">
          <Link href={postLink} className="before:absolute before:inset-0 before:z-10 no-underline text-inherit">
            {post.title}
          </Link>
        </h3>

        <p className="text-[var(--text-body)] text-sm leading-relaxed mb-6 line-clamp-3">
          {post.excerpt || "Discover the latest trends and insights in the world of technology and modern web development architectures."}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5 relative z-20">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] bg-[var(--section-alt-bg)] border border-[var(--card-border)] px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-6 border-t border-[var(--card-border)]">
          <div className="flex items-center space-x-3">
            <Image 
              src={post.authorImage || "/Profile photo.jpeg"} 
              alt={post.author || "Amrendra kumar"} 
              width={32} 
              height={32} 
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[var(--card-border)]" 
            />
            <span className="text-[13px] font-bold text-[var(--text-heading)]">{post.author || "Amrendra kumar"}</span>
          </div>

          <span
            className="w-10 h-10 rounded-full bg-[var(--section-alt-bg)] flex items-center justify-center text-[var(--foreground)] group-hover:bg-[#10B981] group-hover:text-white transition-all duration-300 relative z-20"
            aria-hidden="true"
          >
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
