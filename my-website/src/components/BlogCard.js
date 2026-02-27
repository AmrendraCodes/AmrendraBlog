import Link from "next/link";
import { ArrowUpRight, Calendar, User, Clock } from "lucide-react";

export default function BlogCard({ post }) {
  return (
    <article className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-blue-100 hover:shadow-[0_20px_50px_rgba(8,112,184,0.07)] transition-all duration-500">
      {/* Thumbnail */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={post.image || `https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop`}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md text-blue-600 text-[11px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            {post.category || "Technology"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex items-center space-x-4 text-slate-400 text-[12px] font-medium mb-4">
          <div className="flex items-center">
            <Calendar size={14} className="mr-1.5" />
            <span>{post.date || "Feb 27, 2026"}</span>
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1.5" />
            <span>{post.readTime || "5 min read"}</span>
          </div>
        </div>

        <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
          {post.excerpt || "Discover the latest trends and insights in the world of technology and modern web development architectures."}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
              <User size={16} className="text-slate-400" />
            </div>
            <span className="text-[13px] font-bold text-slate-700">{post.author || "Amrendra"}</span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}
