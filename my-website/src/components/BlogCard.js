"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import TiltCard from "./ui/TiltCard";

export default function BlogCard({ post }) {
  const postLink = post.link || `/resources/blog/${post.slug}`;
  const rawImage = post.image?.trim();
  const defaultFallback = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop";
  const [imgSrc, setImgSrc] = useState(rawImage || defaultFallback);

  return (
    <TiltCard className="h-full" maxTilt={6}>
      <article className="group relative bg-[var(--bg-card)] rounded-3xl overflow-hidden border border-[var(--border-card)] shadow-sm hover:shadow-md hover:border-[#F5A00B]/50 transition-all duration-300 h-full flex flex-col justify-between">
        {/* Thumbnail / Header */}
        <div className="relative aspect-video overflow-hidden bg-slate-950">
          <Image
            src={imgSrc}
            alt={post.title?.trim() || "Blog Post"}
            fill
            onError={() => setImgSrc(defaultFallback)}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
          />
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-[var(--accent-tag-bg)] text-[var(--accent-tag-text)] text-[11px] font-mono font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-[var(--accent-tag-border)] shadow-xs">
              {post.category || "ENGINEERING"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-[var(--text-muted)] text-xs font-medium mb-3.5">
              <div className="flex items-center">
                <Calendar size={13} className="mr-1.5 text-[#F5A00B]" />
                <span>{post.date || "Feb 27, 2026"}</span>
              </div>
              <div className="flex items-center">
                <Clock size={13} className="mr-1.5 text-[#F5A00B]" />
                <span>{post.readTime || "5 min read"}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-[var(--text-heading)] mb-3 leading-snug group-hover:text-[#F5A00B] transition-colors line-clamp-2">
              <Link href={postLink} prefetch={false} className="before:absolute before:inset-0 before:z-10 no-underline text-inherit">
                {post.title}
              </Link>
            </h3>

            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-5 line-clamp-3">
              {post.excerpt || "Discover the latest trends and insights in the world of technology and modern web development architectures."}
            </p>
          </div>

          <div>
            {(() => {
              const displayTags = (post.tags || [])
                .filter((tag, index, tags) => Boolean(tag) && tags.indexOf(tag) === index)
                .slice(0, 3);

              if (displayTags.length === 0) return null;

              return (
                <div className="flex flex-wrap gap-2 mb-5 relative z-20">
                  {displayTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-bold px-3 py-1 rounded-full text-[var(--accent-tag-text)] bg-[var(--accent-tag-bg)] border border-[var(--accent-tag-border)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              );
            })()}

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-card)]">
              <div className="flex items-center space-x-2.5">
                <Image 
                  src={post.authorImage || "/profile-photo.jpeg"} 
                  alt={post.author || "Amrendra Kumar"} 
                  width={28} 
                  height={28} 
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-[var(--border-card)]" 
                />
                <span className="text-xs font-bold text-[var(--text-heading)]">{post.author || "Amrendra Kumar"}</span>
              </div>

              <span
                className="w-9 h-9 rounded-full bg-[var(--accent-tag-bg)] border border-[var(--accent-tag-border)] flex items-center justify-center text-[var(--accent-tag-text)] group-hover:bg-[#F5A00B] group-hover:text-[#1B2433] group-hover:border-[#F5A00B] transition-colors duration-200 relative z-20"
                aria-hidden="true"
              >
                <ArrowUpRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}