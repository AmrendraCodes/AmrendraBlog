import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Clock, Calendar, Mail, Zap } from "lucide-react";
import BlogCard from "../components/BlogCard";

// Sample Data
const categories = ["Technology", "Design", "Productivity", "AI", "Startup", "Marketing", "Development"];

const posts = [
  {
    title: "The Future of Web Development: What to Expect in 2026",
    slug: "future-of-web-dev",
    category: "Development",
    date: "Feb 27, 2026",
    readTime: "8 min read",
    author: "Amrendra",
    excerpt: "Exploring the evolution of frontend frameworks, AI integration, and the rise of edge computing in modern web architectures.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Designing for the Next Billion Users: A Minimalist Approach",
    slug: "minimalist-design",
    category: "Design",
    date: "Feb 25, 2026",
    readTime: "6 min read",
    author: "Sarah Smith",
    excerpt: "How simplicity and performance-first design are shaping the digital experiences of tomorrow across global markets.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "10 Productivity Hacks for Remote Engineering Teams",
    slug: "remote-productivity",
    category: "Productivity",
    date: "Feb 22, 2026",
    readTime: "5 min read",
    author: "John Doe",
    excerpt: "Practical strategies and tools to keep your distributed team synchronized and focused on high-impact results.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
  }
];

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      {/* 1. Hero Section: Featured Post */}
      <section className="relative pt-12 lg:pt-16 pb-20 px-6 lg:px-16 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-sky-50 rounded-full blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                <TrendingUp size={14} />
                <span>Featured Post</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                Mastering the Art of <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">Modern Code.</span>
              </h1>

              <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
                Dive deep into the strategies, tools, and mindsets that drive the world's most innovative technology companies.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <Link
                  href="/blog/featured-post"
                  className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold shadow-2xl shadow-slate-200 hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 group"
                >
                  <span>Read Full Article</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-slate-700">5k+ Readers</span>
                </div>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000">
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl shadow-blue-100 group">
                <img
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop"
                  alt="Featured Article"
                  className="w-full h-[550px] object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-10 left-10 text-white">
                  <span className="bg-blue-600 px-3 py-1 rounded-md text-[10px] uppercase font-bold mb-4 inline-block">Trending now</span>
                  <h2 className="text-2xl font-bold max-w-sm">How AI is Revolutionizing Personalized Learning</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 3. Latest Posts Section */}
      <section className="py-24 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-1 bg-blue-600 rounded-full" />
                <span className="text-blue-600 text-[11px] font-black uppercase tracking-widest">Fresh Insights</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Latest from the <span className="text-blue-600">Blog.</span>
              </h2>
            </div>
            <Link href="/blog" className="hidden sm:flex items-center space-x-2 text-slate-400 hover:text-slate-900 transition-colors font-bold text-sm group">
              <span>View all articles</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          <div className="mt-16 flex justify-center md:hidden">
            <Link href="/blog" className="flex items-center space-x-2 bg-slate-50 text-slate-900 px-8 py-4 rounded-2xl font-bold border border-slate-100 shadow-sm active:scale-95 transition-all">
              <span>Explore More</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Newsletter Section */}
      <section className="pb-24 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900 rounded-[40px] px-8 py-16 md:p-16 flex flex-col items-center text-center space-y-10 relative overflow-hidden shadow-2xl">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center rotate-12 shadow-xl shadow-blue-500/20 mb-4">
              <Mail className="text-white" size={32} />
            </div>

            <div className="space-y-4 max-w-2xl">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Join the <span className="text-blue-500">Amrendra</span> inner circle.
              </h2>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                Get high-quality tutorials and case studies delivered directly to your inbox. No spam, ever.
              </p>
            </div>

            <div className="w-full max-w-lg bg-white/5 backdrop-blur-md p-2 rounded-[28px] border border-white/10 flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Work email address"
                className="flex-1 bg-transparent px-6 py-4 text-white placeholder-slate-500 outline-none font-medium"
              />
              <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-500/20">
                Subscribe
              </button>
            </div>

            <p className="text-slate-500 text-xs font-medium">
              Join 12,000+ developers receiving our weekly digest.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
