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
      <article className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md hover:border-amber-400/50 transition-all duration-300 h-full flex flex-col justify-between">
        {/* Thumbnail / Header */}
        <div className="relative aspect-video overflow-hidden bg-slate-900">
          <Image
            src={imgSrc}
            alt={post.title?.trim() || "Blog Post"}
            fill
            onError={() => setImgSrc(defaultFallback)}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
          />
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-[#FFF3DC] text-[#9A4A00] text-[11px] font-mono font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-amber-500/30 shadow-xs">
              {post.category || "ENGINEERING"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-slate-500 text-xs font-medium mb-3.5">
              <div className="flex items-center">
                <Calendar size={13} className="mr-1.5 text-[#9A4A00]" />
                <span>{post.date || "Feb 27, 2026"}</span>
              </div>
              <div className="flex items-center">
                <Clock size={13} className="mr-1.5 text-[#9A4A00]" />
                <span>{post.readTime || "5 min read"}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-[#1B2433] mb-3 leading-snug group-hover:text-[#9A4A00] transition-colors line-clamp-2">
              <Link href={postLink} className="before:absolute before:inset-0 before:z-10 no-underline text-inherit">
                {post.title}
              </Link>
            </h3>

            <p className="text-[#1B2433]/75 text-sm leading-relaxed mb-5 line-clamp-3">
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
                      className="text-xs font-bold px-3 py-1 rounded-full text-[#9A4A00] bg-[#FFF3DC] border border-amber-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              );
            })()}

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center space-x-2.5">
                <Image 
                  src={post.authorImage || "/profile-photo.jpeg"} 
                  alt={post.author || "Amrendra Kumar"} 
                  width={28} 
                  height={28} 
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200" 
                />
                <span className="text-xs font-bold text-[#1B2433]">{post.author || "Amrendra Kumar"}</span>
              </div>

              <span
                className="w-9 h-9 rounded-full bg-[#FFF3DC] border border-amber-500/30 flex items-center justify-center text-[#9A4A00] group-hover:bg-[#F5A00B] group-hover:text-[#1B2433] group-hover:border-[#F5A00B] transition-colors duration-200 relative z-20"
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