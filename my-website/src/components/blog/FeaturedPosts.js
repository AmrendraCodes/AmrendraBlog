import Link from 'next/link';

export default function FeaturedPosts() {
  const featuredPost = {
    tag: "Design Strategy",
    title: "The Future of User Interfaces: Glassmorphism and Beyond",
    description: "Explore the evolution of modern UI design. From flat design to glassmorphism, we dive deep into the trends shaping the future of digital experiences and how you can implement them today.",
    author: "Amrendra Kumar",
    authorRole: "Lead Designer",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=facearea&facepad=2&w=256&h=256",
    date: "May 12, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop",
    link: "#"
  };

  return (
    <section className="py-8 md:py-12 px-6 lg:px-16 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-50">Featured Post</h2>
        </div>

        <Link href={featuredPost.link} className="group block">
          <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col lg:flex-row">
            
            {/* Image Wrapper */}
            <div className="w-full lg:w-[45%] relative h-[180px] md:h-[220px] lg:h-auto lg:min-h-[280px] overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>

            {/* Content Wrapper */}
            <div className="w-full lg:w-[55%] p-6 md:p-8 flex flex-col justify-center relative bg-white dark:bg-slate-900 z-20">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-2xl rounded-full pointer-events-none" />
              
              <span className="inline-block px-3 py-1 bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 text-xs font-bold rounded-full mb-4 self-start tracking-wide uppercase">
                {featuredPost.tag}
              </span>
              
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                {featuredPost.title}
              </h3>
              
              <p className="text-base text-slate-500 dark:text-slate-400 mb-6 line-clamp-2 md:line-clamp-3 leading-relaxed">
                {featuredPost.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <img src={featuredPost.authorImage} alt={featuredPost.author} className="w-10 h-10 rounded-full ring-2 ring-slate-100 dark:ring-slate-800 object-cover" />
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{featuredPost.author}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{featuredPost.date} · {featuredPost.readTime}</p>
                  </div>
                </div>
                
                <span className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                  Read Article
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.3335 8H12.6668" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 3.33331L12.6667 7.99998L8 12.6666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
            
          </div>
        </Link>
      </div>
    </section>
  );
}
