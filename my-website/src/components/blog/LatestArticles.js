import Link from 'next/link';

export default function LatestArticles() {
  const articles = [
    {
      title: "The Anatomy of a High-Converting Landing Page",
      description: "Discover the psychological triggers and design patterns that turn casual visitors into paying customers.",
      category: "Marketing",
      author: "Sarah Jenkins",
      authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=facearea&facepad=2",
      date: "May 10, 2026",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      link: "#"
    },
    {
      title: "Mastering Tailwind CSS in 2026",
      description: "A comprehensive guide to using the latest utility classes and features to build responsive, modern interfaces faster.",
      category: "Development",
      author: "Amrendra Kumar",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=facearea&facepad=2",
      date: "May 8, 2026",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      link: "#"
    },
    {
      title: "Why Minimalist UI is Back and Here to Stay",
      description: "How stripping away the noise can lead to better user engagement, faster load times, and a premium brand feel.",
      category: "Design",
      author: "Elena Rodriguez",
      authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=facearea&facepad=2",
      date: "May 5, 2026",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      link: "#"
    },
    {
      title: "Building Scalable Next.js Applications",
      description: "Architectural patterns and best practices for creating Next.js apps that perform under heavy traffic.",
      category: "Engineering",
      author: "David Chen",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=facearea&facepad=2",
      date: "May 2, 2026",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
      link: "#"
    },
    {
      title: "Typography Rules Every Designer Should Know",
      description: "Stop guessing your font sizes. Learn the mathematical ratios and pairing techniques for perfect typography.",
      category: "Design",
      author: "Sarah Jenkins",
      authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=facearea&facepad=2",
      date: "April 28, 2026",
      image: "https://images.unsplash.com/photo-1515378960530-7c0da6229674?q=80&w=800&auto=format&fit=crop",
      link: "#"
    },
    {
      title: "The Ultimate Guide to SEO in the AI Era",
      description: "How search engines are changing and what you need to do today to keep your content ranking high.",
      category: "Growth",
      author: "Michael Torres",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=facearea&facepad=2",
      date: "April 24, 2026",
      image: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=800&auto=format&fit=crop",
      link: "#"
    }
  ];

  return (
    <section className="py-16 md:py-24 px-6 lg:px-16 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-50 mb-4 tracking-tight">Latest Articles</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Dive into our newest thoughts, tutorials, and insights.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {articles.map((article, index) => (
            <article key={index} className={`group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 overflow-hidden transition-all duration-500 flex flex-col ${index === 0 ? 'sm:col-span-2 lg:col-span-2 sm:flex-row' : ''}`}>
              {/* Card Image */}
              <div className={`relative overflow-hidden ${index === 0 ? 'sm:w-1/2 aspect-4/3 sm:aspect-auto' : 'aspect-16/10'}`}>
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white text-xs font-bold rounded-full shadow-sm">
                    {article.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors z-10" />
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Card Content */}
              <div className={`p-6 md:p-8 flex flex-col grow ${index === 0 ? 'sm:w-1/2 justify-center' : ''}`}>
                <h3 className={`font-extrabold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug ${index === 0 ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl'}`}>
                  {article.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6 line-clamp-2 text-sm leading-relaxed grow">
                  {article.description}
                </p>

                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={article.authorImage} alt={article.author} className="w-8 h-8 rounded-full bg-slate-200 object-cover" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{article.author}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{article.date}</span>
                    </div>
                  </div>
                  
                  <Link href={article.link} className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-colors" aria-label="Read Article">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Section */}
        <div className="flex items-center justify-center mt-12">
          <button className="px-8 py-4 rounded-full border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors inline-flex items-center gap-2">
            Load More Articles
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
