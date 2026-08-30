'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const categories = [
  { 
    name: "React",
    slug: "react",
    description: "Tutorials, architecture patterns, hooks, performance optimization, and scalable frontend systems.",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>,
    gradient: "from-[#F59E0B]/10 to-transparent",
    accentColor: "text-[#B45309] dark:text-[#F59E0B]",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
  },
  { 
    name: "AI Agents",
    slug: "ai-agents",
    description: "Autonomous agents, LLM workflows, AI automation, prompt engineering, and AI infrastructure.",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
    gradient: "from-[#F59E0B]/10 to-transparent",
    accentColor: "text-[#B45309] dark:text-[#F59E0B]",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
  },
  { 
    name: "SaaS Architecture",
    slug: "saas-architecture",
    description: "Multi-tenant systems, APIs, backend scaling, authentication, billing, and SaaS engineering.",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>,
    gradient: "from-[#F59E0B]/10 to-transparent",
    accentColor: "text-[#B45309] dark:text-[#F59E0B]",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
  },
  { 
    name: "AWS Infrastructure",
    slug: "aws-infrastructure",
    description: "Cloud deployments, networking, serverless systems, monitoring, scalability, and AWS optimization.",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>,
    gradient: "from-[#F59E0B]/10 to-transparent",
    accentColor: "text-[#B45309] dark:text-[#F59E0B]",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
  },
  { 
    name: "DevOps",
    slug: "devops",
    description: "Docker, Kubernetes, CI/CD pipelines, infrastructure as code, GitHub Actions, and automation workflows.",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
    gradient: "from-[#F59E0B]/10 to-transparent",
    accentColor: "text-[#B45309] dark:text-[#F59E0B]",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
  },
  { 
    name: "Productivity",
    slug: "productivity",
    description: "Workflows, time management, essential tools, mental models, and optimizing developer output.",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
    gradient: "from-[#F59E0B]/10 to-transparent",
    accentColor: "text-[#B45309] dark:text-[#F59E0B]",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
  },
  { 
    name: "Development",
    slug: "development",
    description: "General development trends, frontend engineering, full-stack patterns, and modern web technologies.",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
    gradient: "from-[#F59E0B]/10 to-transparent",
    accentColor: "text-[#B45309] dark:text-[#F59E0B]",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
  },
  { 
    name: "Design",
    slug: "design",
    description: "UI/UX patterns, typography, color theory, layout strategies, and visual design best practices.",
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>,
    gradient: "from-[#F59E0B]/10 to-transparent",
    accentColor: "text-[#B45309] dark:text-[#F59E0B]",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
  },
];

/**
 * CategoriesSection — Client component for Framer Motion animations.
 * Receives categoryCounts from parent server component.
 * @param {{ categoryCounts: Record<string, number> }} props
 */
export default function CategoriesSection({ categoryCounts = {}, headingLevel = "h2" }) {
  const getCount = (slug) => categoryCounts[slug] || 0;
  
  const HeadingTag = headingLevel;

  const isH1 = headingLevel === "h1";

  return (
    <section className={`${isH1 ? "pt-28 pb-16 md:pt-36 md:pb-24" : "py-12 md:py-16"} px-6 lg:px-16 bg-[var(--background)]`} aria-labelledby="categories-heading">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        {/* Section Header */}
        <motion.div variants={staggerItem} className="text-center mb-12">
          <HeadingTag id="categories-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-[var(--text-heading)]">
            Browse Categories
          </HeadingTag>
          <p className="text-lg text-[var(--text-body)] max-w-2xl mx-auto">
            Find exactly what you&apos;re looking for. From deep engineering dives to high-level strategy.
          </p>
        </motion.div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
          {categories.map((category, index) => {
            const count = getCount(category.slug);
            return (
              <motion.div key={index} variants={staggerItem}>
                <Link
                  href={`/category/${category.slug}`}
                  className={`group block p-6 rounded-2xl border border-[var(--card-border)] bg-gradient-to-br ${category.gradient} hover:scale-[1.02] hover:border-[#F59E0B]/40 ${category.glowColor} transition-all duration-300 cursor-pointer no-underline h-full`}
                >
                  {/* Icon + Badge Row */}
                  <div className="flex items-center justify-between w-full mb-4">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] ${category.accentColor} group-hover:scale-110 transition-all duration-300 shrink-0`}>
                      <span className="inline-flex group-hover:rotate-12 transition-transform duration-300">
                        {category.icon}
                      </span>
                    </div>
                    <span className="shrink-0 px-3 py-1 bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)] text-xs font-semibold rounded-full transition-colors whitespace-nowrap">
                      {count} {count === 1 ? 'Article' : 'Articles'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[var(--text-heading)] group-hover:text-[#F59E0B] transition-colors leading-snug mb-2">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[var(--text-body)] leading-relaxed">
                    {category.description}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Explore All Button */}
        <motion.div variants={staggerItem} className="text-center">
          <Link
            href="/categories"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--foreground)] font-bold transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F59E0B]/40 hover:text-[#F59E0B] hover:shadow-lg no-underline"
          >
            Explore All Categories
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
