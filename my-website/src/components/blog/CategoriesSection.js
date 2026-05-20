export default function CategoriesSection() {
  const categories = [
    { 
      name: "React", 
      description: "Tutorials, architecture patterns, hooks, performance optimization, and scalable frontend systems.",
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
    },
    { 
      name: "AI Agents", 
      description: "Autonomous agents, LLM workflows, AI automation, prompt engineering, and AI infrastructure.",
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
    },
    { 
      name: "SaaS Architecture", 
      description: "Multi-tenant systems, APIs, backend scaling, authentication, billing, and SaaS engineering.",
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
    },
    { 
      name: "AWS Infrastructure", 
      description: "Cloud deployments, networking, serverless systems, monitoring, scalability, and AWS optimization.",
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>
    },
    { 
      name: "DevOps Automation", 
      description: "Docker, Kubernetes, CI/CD pipelines, infrastructure as code, GitHub Actions, and automation workflows.",
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
    },
    { 
      name: "Productivity", 
      description: "Workflows, time management, essential tools, mental models, and optimizing developer output.",
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
    },
    { 
      name: "Technology", 
      description: "General tech trends, industry news, hardware reviews, and the future of computing.",
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
    },
    { 
      name: "Personal Growth", 
      description: "Career advice, learning strategies, avoiding burnout, and growing as an engineering leader.",
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
    },
  ];

  return (
    <section className="py-16 md:py-24 px-6 lg:px-16 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-50 mb-4 tracking-tight">Browse Categories</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Find exactly what you're looking for. From deep engineering dives to high-level strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => (
            <div key={index} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-1 hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-300 group cursor-pointer flex flex-col items-start text-left">
                <div className="flex items-center gap-4 mb-4 w-full">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-100 dark:border-slate-700 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <div className="grow">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{category.name}</h3>
                </div>
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  12 Articles
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{category.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 border border-slate-200 dark:border-slate-700 rounded-full font-bold shadow-sm hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
            Explore All Categories
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
