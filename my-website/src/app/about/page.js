"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, Github, Linkedin, Twitter, Youtube, Code2, Cloud, Brain, Palette } from "lucide-react";
import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AboutPage() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Hi, I'm Amrendra";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayText(fullText.substring(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 60);
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-indigo-100 dark:selection:bg-indigo-900/40 font-sans overflow-x-hidden">

      {/* ═══════════ HERO SECTION — Centered Layout ═══════════ */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-[5%] left-[10%] w-[280px] sm:w-[400px] md:w-[500px] h-[280px] sm:h-[400px] md:h-[500px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.1)_0%,transparent_70%)] blur-3xl animate-[float_10s_ease-in-out_infinite]" />
        <div className="absolute top-[20%] right-[5%] w-[320px] sm:w-[450px] md:w-[600px] h-[320px] sm:h-[450px] md:h-[600px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.08)_0%,transparent_70%)] blur-3xl animate-[float_12s_ease-in-out_infinite_reverse]" />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Floating Badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-xs font-bold uppercase tracking-[0.12em] text-[#6366F1] dark:text-[#818CF8] mb-6 shadow-sm backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#6366F1] animate-pulse" />
              Developer &amp; Content Creator
            </span>
          </motion.div>

          {/* Hero Heading with Typing Effect */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 text-[var(--text-heading)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span>{displayText.substring(0, 8)}</span>
            <span className="gradient-text">{displayText.substring(8)}</span>
            <span className="inline-block w-1 md:w-1.5 h-[0.8em] bg-[#6366F1] ml-2 align-middle animate-[blink_1s_infinite]"></span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg md:text-xl text-[var(--text-body)] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            A <span className="text-[#6366F1] dark:text-[#818CF8] font-bold">Technical Content Writer</span> and <span className="text-[#6366F1] dark:text-[#818CF8] font-bold">Frontend Developer</span> passionate about building amazing web experiences and sharing knowledge with the community.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/blog"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#a855f7] text-white font-bold text-base transition-all duration-300 shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-float)] hover:-translate-y-1 hover:scale-105 w-full sm:w-auto"
            >
              <Play size={16} fill="currentColor" />
              View Articles
            </Link>
            <Link
              href="/hire-me"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[var(--card-bg)] shadow-[var(--shadow-card)] text-[var(--foreground)] font-bold text-base transition-all duration-300 hover:shadow-[var(--shadow-3d)] hover:border-[#6366F1]/50 hover:-translate-y-1 w-full sm:w-auto"
            >
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════ FOUNDER CARD SECTION ═══════════ */}
      <section className="py-16 md:py-24 px-6">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {/* Founder Card — Large Centered */}
          <motion.div
            variants={fadeUp}
            className="relative flex flex-col md:flex-row items-center gap-10 md:gap-14 bg-[var(--card-bg)] rounded-3xl border border-[var(--card-border)] shadow-[var(--shadow-card)] p-8 md:p-12 overflow-hidden"
          >
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.06)_0%,transparent_70%)] pointer-events-none" />

            {/* Photo */}
            <div className="shrink-0 relative">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#a855f7] opacity-50 blur-md" />
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-2 border-[var(--card-border)]">
                <Image
                  src="/Profile photo.jpeg"
                  alt="Amrendra — Technical Content Writer & Frontend Developer"
                  fill
                  sizes="(max-width: 768px) 192px, 256px"
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4 text-center md:text-left relative z-10">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--text-heading)] mb-1">
                  Amrendra <span className="gradient-text">Kumar</span>
                </h2>
                <p className="text-[#6366F1] dark:text-[#818CF8] font-bold text-base">
                  Frontend Developer &amp; Technical Content Writer
                </p>
              </div>

              <p className="text-[var(--text-body)] text-base md:text-lg leading-relaxed max-w-xl">
                Software engineer, cloud architect, and technical writer sharing practical insights on frontend engineering, AI systems, scalable SaaS platforms, and DevOps automation.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm font-bold text-[var(--text-muted)]">
                <span>15+ Articles</span>
                <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                <span>8 Categories</span>
                <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                <span>Growing Readers</span>
              </div>

              {/* Social Icons */}
              <div className="flex items-center justify-center md:justify-start gap-3 mt-1">
                {[
                  { href: "https://github.com/AmrendraCodes", icon: Github, label: "GitHub" },
                  { href: "https://x.com/codewithamrendr", icon: Twitter, label: "Twitter" },
                  { href: "https://www.linkedin.com/in/amrendra-reactdev/", icon: Linkedin, label: "LinkedIn" },
                  { href: "https://www.youtube.com/@codewithamrendra", icon: Youtube, label: "YouTube" },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${label} profile`}
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--section-alt-bg)] border border-[var(--card-border)] text-[var(--text-muted)] hover:text-[#6366F1] dark:hover:text-[#818CF8] hover:border-[#6366F1]/30 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════ EXPERTISE BADGES — Horizontal Scroll ═══════════ */}
      <section className="py-4 border-t border-b border-[var(--card-border)] overflow-hidden bg-[var(--card-bg)]" aria-hidden="true">
        <div className="w-full overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[var(--card-bg)] to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[var(--card-bg)] to-transparent pointer-events-none z-10" />
          <div className="ticker-track">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex shrink-0">
                {["React & Next.js", "AI Agents", "AWS & Cloud", "Node.js & Go", "TailwindCSS", "DevOps", "UI/UX Design", "SaaS Architecture", "Digital Marketing", "TypeScript"].map((item) => (
                  <span key={item} className="ticker-item text-lg sm:text-xl font-extrabold uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors whitespace-nowrap">
                    ✦ {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ MY STORY — Bento Grid ═══════════ */}
      <section className="py-16 md:py-24 px-6">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {/* Section Header */}
          <motion.div variants={fadeUp} className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 text-[var(--text-heading)]">
              My <span className="gradient-text">Story</span>
            </h2>
            <p className="text-[var(--text-body)] text-lg max-w-lg">
              The journey from curious learner to full-time builder.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Story Card — Spans 2 columns */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -5 }}
              className="lg:col-span-2 bg-[var(--card-bg)] p-8 md:p-12 rounded-3xl border border-[rgba(255,255,255,0.05)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-3d)] transition-all duration-500 flex flex-col justify-center"
            >
              <div className="space-y-6 md:space-y-8">
                <p className="text-base md:text-lg text-[var(--text-body)] leading-relaxed">
                  I&apos;m a self-taught developer who started my journey by learning HTML, CSS, and JavaScript through online courses and building real-world projects. Over the past few years, I&apos;ve developed a deep passion for frontend development and modern web technologies. What started as curiosity has turned into a full-fledged career where I constantly explore new frameworks, tools, and best practices in the web development ecosystem.
                </p>
                <p className="text-base md:text-lg text-[var(--text-body)] leading-relaxed">
                  During my coding journey, I realized that learning in isolation wasn&apos;t fulfilling. I wanted to give back to the community that helped me grow. That&apos;s when I started creating content — blog posts, tutorials, and technical guides — to help other developers navigate the complexities of modern web development. Today, I blend my technical expertise with my passion for communication to create valuable, easy-to-understand content that empowers developers at all levels.
                </p>
                <p className="text-base md:text-lg text-[var(--text-body)] leading-relaxed">
                  &ldquo;Code with Amrendra&rdquo; was born from this vision: to create a platform where developers can learn cutting-edge technologies, stay updated with industry trends, and connect with a like-minded community. Whether you&apos;re just starting your coding journey or looking to master advanced concepts, I&apos;m here to guide you every step of the way. Let&apos;s build amazing things together!
                </p>
              </div>
            </motion.div>

            {/* Skills Card */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -5 }}
              className="lg:col-span-1 bg-[var(--card-bg)] p-8 md:p-10 rounded-3xl border border-[rgba(255,255,255,0.05)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-3d)] transition-all duration-500"
            >
              <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--text-heading)] mb-8 flex items-center gap-3">
                <span className="w-8 h-1.5 md:h-2 bg-gradient-to-r from-[#6366F1] to-[#a855f7] rounded-full"></span>
                Expertise
              </h3>
              <div className="space-y-8">
                {[
                  { name: "React/Next.js", percentage: 95 },
                  { name: "Node.js", percentage: 85 },
                  { name: "React Native", percentage: 80 },
                  { name: "UI/UX (Figma)", percentage: 75 },
                  { name: "Digital Marketing", percentage: 88 },
                  { name: "TailwindCSS", percentage: 92 }
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-base font-bold text-[var(--text-heading)]">{skill.name}</h4>
                      <span className="text-sm font-semibold text-[#6366F1] dark:text-[#818CF8]">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-[var(--section-alt-bg)] border border-[rgba(255,255,255,0.05)] rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#6366F1] to-[#a855f7] rounded-full transition-all duration-500 ease-out shadow-[var(--shadow-glow)]"
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════ WHAT I DO — Icon Grid ═══════════ */}
      <section className="py-16 md:py-24 px-6 bg-[var(--section-alt-bg)] border-t border-[var(--card-border)]">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {/* Section Header */}
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 text-[var(--text-heading)]">
              What I <span className="gradient-text">Do</span>
            </h2>
            <p className="text-[var(--text-body)] text-lg">
              Core areas where I build, write, and create impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Code2, title: "Frontend Dev", desc: "React, Next.js, TypeScript & modern UI frameworks" },
              { icon: Cloud, title: "Cloud & DevOps", desc: "AWS, Docker, CI/CD & scalable infrastructure" },
              { icon: Brain, title: "AI Engineering", desc: "AI Agents, LLMs, RAG & automation workflows" },
              { icon: Palette, title: "Technical Writing", desc: "Tutorials, guides & developer education content" },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center gap-4 p-6 md:p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] transition-all duration-300 hover:border-[#6366F1]/30 hover:shadow-[0_0_40px_rgba(99,102,241,0.08)]"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#6366F1]/10 dark:bg-[#6366F1]/15 border border-[#6366F1]/20 flex items-center justify-center text-[#6366F1] dark:text-[#818CF8]">
                  <Icon size={26} />
                </div>
                <h3 className="font-bold text-base text-[var(--text-heading)]">{title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════ CTA SECTION ═══════════ */}
      <section className="py-16 md:py-24 px-6">
        <motion.div
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div
            variants={fadeUp}
            className="relative bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl p-8 sm:p-12 text-center overflow-hidden"
          >
            {/* Radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-[var(--text-heading)]">
                Ready to <span className="gradient-text">Work Together</span>?
              </h2>
              <p className="text-base md:text-lg text-[var(--text-body)] mb-8 max-w-2xl mx-auto leading-relaxed">
                Whether you need a website built, want to collaborate on a project, or just want to chat about web development, I&apos;d love to hear from you!
              </p>
              <Link
                href="/hire-me"
                className="group inline-flex items-center gap-2 bg-gradient-to-br from-[#6366F1] to-[#a855f7] text-white font-bold text-base md:text-lg py-4 md:py-5 px-8 md:px-10 rounded-2xl transition-all duration-300 shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-float)] hover:-translate-y-1 hover:scale-105 no-underline"
              >
                Get in Touch
                <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
