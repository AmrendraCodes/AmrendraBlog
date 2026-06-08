import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Calendar, User, Clock } from "lucide-react";

export default function BlogCard({ post }) {
  return (
    <article className="group bg-white dark:bg-slate-950 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:border-blue-100 hover:shadow-[0_20px_50px_rgba(8,112,184,0.07)] transition-all duration-500">
      {/* Thumbnail */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={post.image || `https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop`}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white dark:bg-slate-950/90 backdrop-blur-md text-blue-600 dark:text-blue-400 text-[11px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            {post.category || "Technology"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex items-center space-x-4 text-slate-400 dark:text-slate-500 text-[12px] font-medium mb-4">
          <div className="flex items-center">
            <Calendar size={14} className="mr-1.5" />
            <span>{post.date || "Feb 27, 2026"}</span>
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1.5" />
            <span>{post.readTime || "5 min read"}</span>
          </div>
        </div>

        <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-slate-50 mb-3 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
          {post.excerpt || "Discover the latest trends and insights in the world of technology and modern web development architectures."}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <Image 
              src="/Profile photo.jpeg" 
              alt={post.author || "Amrendra kumar"} 
              width={32} 
              height={32} 
              className="w-8 h-8 rounded-full object-cover bg-slate-100 dark:bg-slate-800" 
            />
            <span className="text-[13px] font-bold text-slate-700 dark:text-slate-200">{post.author || "Amrendra kumar"}</span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-900 dark:text-slate-50 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}
