'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, TerminalSquare, Github, Linkedin, Twitter, Youtube } from "lucide-react";
import CaseStudiesSection from "./CaseStudiesSection";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HomeClient({ featuredPosts, caseStudies }) {
  return (
    <>
      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center px-6 pt-28 md:pt-32 lg:pt-36 pb-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.12)_0%,transparent_70%)] blur-3xl animate-[float_10s_ease-in-out_infinite]" />
        <div className="absolute top-[30%] right-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.1)_0%,transparent_70%)] blur-3xl animate-[float_12s_ease-in-out_infinite_reverse]" />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Floating Badge */}
          <motion.div variants={staggerItem}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-xs font-bold uppercase tracking-[0.12em] text-[#6366F1] dark:text-[#818CF8] mb-6 shadow-sm backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#6366F1] animate-pulse" />
              Developer Blog
            </span>
          </motion.div>

          {/* Hero Heading */}
          <motion.h1
            variants={staggerItem}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 text-[var(--text-heading)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Developer Notes on{' '}
            <span className="gradient-text">Frontend, SaaS</span>
            {' '}&amp; Growth
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={staggerItem}
            className="text-base sm:text-lg md:text-xl text-[var(--text-body)] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Personal insights on React, AI Agents, SaaS architecture, AWS infrastructure, DevOps automation, and modern software engineering.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={staggerItem} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/blog"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#a855f7] text-white font-bold text-base transition-all duration-300 shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-float)] hover:-translate-y-1 hover:scale-105 w-full sm:w-auto"
            >
              Read Latest Articles
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[var(--card-bg)] shadow-[var(--shadow-card)] text-[var(--foreground)] font-bold text-base transition-all duration-300 hover:shadow-[var(--shadow-3d)] hover:border-[#6366F1]/50 hover:-translate-y-1 w-full sm:w-auto"
            >
              Explore Categories
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════ TICKER SECTION ═══════════ */}
      <section className="relative py-4 border-t border-b border-[var(--card-border)] overflow-hidden bg-[var(--card-bg)] flex items-center" aria-hidden="true">
        {/* Ticker Container with fades */}
        <div className="w-full overflow-hidden relative">
          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[var(--card-bg)] to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[var(--card-bg)] to-transparent pointer-events-none z-10" />

          {/* Scrolling Track */}
          <div className="ticker-track">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex shrink-0">
                {["Mobile Development", "DevOps", "Digital Marketing", "UI/UX Patterns", "AI Learning", "Animations"].map((item) => (
                  <span key={item} className="ticker-item text-lg sm:text-xl font-extrabold uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors whitespace-nowrap">
                    ✦ {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURED ARTICLES ═══════════ */}
      <section className="py-16 md:py-24">
        <motion.div
          className="max-w-7xl mx-auto px-6 lg:px-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {/* Section Header */}
          <motion.div variants={staggerItem} className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 text-[var(--text-heading)]">
              Featured <span className="gradient-text">Articles</span>
            </h2>
            <p className="text-[var(--text-body)] text-lg max-w-lg">
              Deep dives into architecture, scaling, and engineering workflows.
            </p>
          </motion.div>

          {/* Featured Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hero Article */}
            <motion.article
              variants={staggerItem}
              whileHover={{ y: -5, rotateX: 1, rotateY: -1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative rounded-3xl overflow-hidden border border-[rgba(255,255,255,0.05)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-3d)] transition-shadow duration-500 min-h-[420px] lg:col-span-2 lg:row-span-2"
            >
              <Image
                src={featuredPosts[0].image}
                alt={featuredPosts[0].title}
                fill
                priority={true}
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-[#08090A]/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 flex flex-col justify-end h-full w-full z-10">
                <span className="bg-[#6366F1] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-fit mb-4 shadow-sm">
                  {featuredPosts[0].category}
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-snug">
                  {featuredPosts[0].title}
                </h3>
                <div className="flex items-center text-slate-300 text-sm font-medium">
                  <span>{featuredPosts[0].date} • {featuredPosts[0].readingTime}</span>
                </div>
                <Link href={featuredPosts[0].href} className="absolute inset-0 z-20"><span className="sr-only">Read more</span></Link>
              </div>
            </motion.article>

            {/* Supporting Articles */}
            <div className="flex flex-col gap-6">
              {featuredPosts.slice(1, 4).map((post, index) => (
                <motion.article
                  key={index}
                  variants={staggerItem}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="flex flex-col sm:flex-row gap-5 group items-center bg-[var(--card-bg)] p-4 rounded-3xl border border-[rgba(255,255,255,0.05)] shadow-[var(--shadow-card)] hover:border-[#6366F1]/30 hover:shadow-[var(--shadow-3d)] transition-all duration-300 relative h-full"
                >
                  <div className="relative w-full sm:w-32 h-40 sm:h-32 shrink-0 rounded-2xl overflow-hidden">
                    <Image src={post.image} alt={post.title} fill sizes="150px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <span className="text-[#6366F1] dark:text-[#818CF8] text-[11px] font-extrabold uppercase tracking-wider mb-2">
                      {post.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)] mb-2 leading-tight group-hover:text-[#6366F1] dark:group-hover:text-[#818CF8] transition-colors line-clamp-2">
                      <Link href={post.href} className="before:absolute before:inset-0 z-10">
                        {post.title}
                      </Link>
                    </h3>
                    <div className="text-[var(--text-muted)] text-[13px] font-medium">
                      <span>{post.date} • {post.readingTime}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* View All Button */}
          <motion.div variants={staggerItem} className="flex justify-center mt-12">
            <Link
              href="/blog"
              className="group inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--foreground)] font-bold transition-all duration-300 hover:-translate-y-1 hover:border-[#6366F1]/30 hover:shadow-lg"
            >
              View All Posts <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════ CASE STUDIES ═══════════ */}
      <CaseStudiesSection caseStudies={caseStudies} />

      {/* ═══════════ ABOUT THE BLOGGER ═══════════ */}
      <section className="py-16 md:py-24 bg-[var(--section-alt-bg)]">
        <motion.div
          className="max-w-5xl mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {/* Profile Image with Gradient Ring */}
          <motion.div variants={staggerItem} className="shrink-0">
            <div className="relative">
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#a855f7] opacity-60 blur-sm" />
              <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-2xl overflow-hidden border-2 border-[var(--card-border)]">
                <Image
                  src="/Profile photo.jpeg"
                  alt="Amrendra - Technical Content Writer"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* About Content */}
          <div className="flex flex-col gap-5 text-center md:text-left">
            <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-heading)]">
              Hi, I&apos;m <span className="gradient-text">Amrendra</span>
            </motion.h2>
            <motion.p variants={staggerItem} className="text-lg text-[var(--text-body)] leading-relaxed max-w-xl">
              Software engineer, cloud architect, and technical writer sharing practical insights on frontend engineering, AI systems, scalable SaaS platforms, and DevOps automation.
            </motion.p>

            {/* Stats Row */}
            <motion.div variants={staggerItem} className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm font-bold text-[var(--text-muted)]">
              <span>15+ Articles</span>
              <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
              <span>8 Categories</span>
              <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
              <span>Growing Readers</span>
            </motion.div>

            {/* Tech Stack Badges */}
            <motion.div variants={staggerItem} className="flex flex-wrap gap-3 justify-center md:justify-start">
              {["React & Next.js", "AWS & Terraform", "Python & AI Agents", "Node.js & Go"].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full text-sm font-semibold bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-body)] hover:border-[#6366F1]/30 hover:text-[#6366F1] dark:hover:text-[#818CF8] transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            <motion.div variants={staggerItem}>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#6366F1] text-white font-bold transition-all duration-300 hover:shadow-[0_8px_30px_rgba(99,102,241,0.4)] hover:-translate-y-0.5"
              >
                More About Me
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════ NEWSLETTER SECTION ═══════════ */}
      <section className="py-16 md:py-24 px-6">
        <motion.div
          className="relative max-w-3xl mx-auto rounded-3xl p-8 sm:p-12 text-center overflow-hidden border border-[var(--card-border)] bg-[var(--card-bg)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {/* Radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none" />

          <motion.div variants={staggerItem} className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-[#6366F1]/10 dark:bg-[#6366F1]/15 border border-[#6366F1]/20 flex items-center justify-center text-[#6366F1] dark:text-[#818CF8] mb-6 rotate-[-8deg] shadow-[0_10px_30px_rgba(99,102,241,0.1)]">
              <TerminalSquare size={32} />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-[var(--text-heading)]">
              Join the <span className="gradient-text">Developer Weekly Journal</span>
            </h2>

            <p className="text-[var(--text-body)] text-lg max-w-lg mx-auto mb-8 leading-relaxed">
              Get practical engineering insights, AI workflows, cloud architecture tips, and developer resources every week.
            </p>

            <form className="w-full max-w-md flex flex-col sm:flex-row gap-3 mx-auto" action="#">
              <input
                type="email"
                placeholder="name@company.com"
                aria-label="Email address for weekly journal"
                className="flex-1 px-5 py-4 rounded-2xl bg-[var(--background)] border border-[rgba(255,255,255,0.08)] shadow-[var(--shadow-inner-glow)] text-[var(--foreground)] outline-none text-base transition-all duration-300 focus:border-[#6366F1] focus:shadow-[var(--shadow-glow)] placeholder:text-[var(--text-muted)]"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#a855f7] text-white font-bold border-none cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] hover:scale-105 shrink-0"
              >
                Subscribe
              </button>
            </form>

            <p className="text-xs text-[var(--text-muted)] mt-4">No spam. Unsubscribe anytime.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════ TESTIMONIAL SECTION ═══════════ */}
      <section className="py-16 md:py-24 bg-[var(--section-alt-bg)] border-t border-b border-[var(--card-border)]">
        <motion.div
          className="max-w-4xl mx-auto px-6 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.blockquote variants={staggerItem} className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--text-heading)] leading-snug mb-8 italic" style={{ fontFamily: 'Georgia, serif' }}>
            &ldquo;One of the most practical and well-designed engineering blogs I follow. The insights on architecture are unparalleled.&rdquo;
          </motion.blockquote>
          <motion.div variants={staggerItem} className="flex items-center justify-center gap-4">
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop"
              alt="Sarah J."
              width={48}
              height={48}
              className="rounded-full object-cover ring-2 ring-[var(--card-border)]"
            />
            <div className="text-left">
              <span className="block font-bold text-[var(--text-heading)]">Sarah Jenkins</span>
              <span className="block text-sm text-[var(--text-muted)]">Lead Frontend Engineer</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════ SOCIAL / CONNECT SECTION ═══════════ */}
      <section className="py-16 md:py-24">
        <motion.div
          className="max-w-5xl mx-auto px-6 lg:px-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {/* Header */}
          <motion.div variants={staggerItem} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 text-[var(--text-heading)]">
              Let&apos;s <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-[var(--text-body)] text-lg">
              Find me around the web where I build in public.
            </p>
          </motion.div>

          {/* Social Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "GitHub", href: "https://github.com/AmrendraCodes", icon: Github, label: "Visit Amrendra GitHub Profile" },
              { name: "Twitter / X", href: "https://x.com/codewithamrendr", icon: Twitter, label: "Visit Amrendra Twitter Profile" },
              { name: "LinkedIn", href: "https://www.linkedin.com/in/amrendra-reactdev/", icon: Linkedin, label: "Visit Amrendra LinkedIn Profile" },
              { name: "YouTube", href: "https://www.youtube.com/@codewithamrendra", icon: Youtube, label: "Visit Amrendra YouTube Channel" },
            ].map(({ name, href, icon: Icon, label }) => (
              <motion.a
                key={name}
                variants={staggerItem}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group flex flex-col items-center justify-center gap-3 p-6 md:p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--foreground)] transition-all duration-300 hover:-translate-y-1 hover:border-[#6366F1]/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.1)] no-underline"
              >
                <Icon size={28} className="text-[var(--text-muted)] group-hover:text-[#6366F1] dark:group-hover:text-[#818CF8] transition-colors duration-300" />
                <span className="font-bold text-base">{name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}
