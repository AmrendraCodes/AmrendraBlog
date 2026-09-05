import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, Github, Linkedin, Twitter, Youtube, Code2, Cloud, Brain, Palette, Terminal } from "lucide-react";



export default function AboutPage() {
  const displayText = "Hi, I'm Amrendra";

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-amber-100 dark:selection:bg-amber-900/40 font-sans overflow-x-hidden">

      {/* ═══════════ HERO SECTION — Developer Portfolio 2-Column Layout ═══════════ */}
      <section className="relative pt-24 pb-12 md:pt-28 md:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[var(--card-border)]">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="absolute top-[5%] left-[10%] w-[280px] sm:w-[400px] md:w-[500px] h-[280px] sm:h-[400px] md:h-[500px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none " />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* LEFT COLUMN: Main Brand Message & CTAs */}
            <div
              className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              {/* Floating Status Badge */}
              <div>
                <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 text-xs font-mono font-bold uppercase tracking-wider text-[#0B1F3A] dark:text-[#F59E0B] mb-6 shadow-sm backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className=" absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75 motion-reduce:animate-none"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F59E0B]"></span>
                  </span>
                  DEVELOPER &amp; CONTENT CREATOR
                </span>
              </div>

              {/* Hero Heading with Typing Effect */}
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 text-[var(--text-heading)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <span>{displayText.substring(0, 8)}</span>
                <span className="gradient-text">{displayText.substring(8)}</span>
                <span className="inline-block w-1.5 h-[0.8em] bg-[#F59E0B] ml-1.5 align-middle  motion-reduce:animate-none"></span>
              </h1>

              {/* Subtitle / Description */}
              <p
                className="text-base sm:text-lg lg:text-xl text-[var(--text-body)] max-w-2xl mb-8 leading-relaxed font-medium"
              >
                A{" "}
                <span className="text-[#0B1F3A] dark:text-[#F59E0B] font-bold underline decoration-[#F59E0B]/40 decoration-2 underline-offset-4">
                  Technical Content Writer
                </span>{" "}
                and{" "}
                <span className="text-[#0B1F3A] dark:text-[#F59E0B] font-bold underline decoration-[#F59E0B]/40 decoration-2 underline-offset-4">
                  Frontend Developer
                </span>{" "}
                passionate about building amazing web experiences and sharing knowledge with the community.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
                <Link
                  href="/resources/blog"
                  className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-bold text-base transition-colors duration-200 shadow-[var(--shadow-glow)]     w-full sm:w-auto"
                >
                  <span>View Articles</span>
                  <ArrowRight size={18} className="transition-transform duration-200 " />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--foreground)] font-bold text-base transition-colors duration-200  hover:border-[#F59E0B]/50 hover:text-[#F59E0B]  w-full sm:w-auto"
                >
                  Get in Touch
                </Link>
              </div>

              {/* Core Stack Badges */}
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--card-border)] text-xs font-mono text-[var(--text-muted)] flex-wrap justify-center lg:justify-start">
                <span className="font-semibold text-[var(--text-heading)] uppercase tracking-wider">Core Tech:</span>
                <div className="flex items-center gap-2 flex-wrap">
                  {["React", "Next.js", "TypeScript", "TailwindCSS"].map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-[var(--section-alt-bg)] border border-[var(--card-border)] font-bold text-[var(--text-heading)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Developer IDE Visual Card */}
            <div
              className="lg:col-span-5 relative w-full flex justify-center lg:justify-end mt-4 lg:mt-0"
            >
              <div className="relative w-full max-w-md lg:max-w-none">
                {/* Outer Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#0B1F3A]/30 via-[#F59E0B]/20 to-[#D97706]/30 rounded-3xl blur-xl opacity-75 pointer-events-none" />

                {/* IDE Window Card */}
                <div className="relative rounded-2xl bg-slate-950 text-slate-100 border border-slate-800 dark:border-[#1E293B] shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
                  {/* Mac Header Bar */}
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500/80 block" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80 block" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80 block" />
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-bold">
                      <Code2 size={13} className="text-[#F59E0B]" />
                      <span>amrendra.ts</span>
                    </div>
                    <div className="w-10" />
                  </div>

                  {/* Code Body */}
                  <div className="p-5 sm:p-6 space-y-3 text-slate-300 leading-relaxed overflow-x-auto">
                    <div>
                      <span className="text-purple-400 font-bold">const</span>{" "}
                      <span className="text-yellow-300 font-bold">developer</span>{" "}
                      <span className="text-sky-400 font-bold">=</span> &#123;
                    </div>
                    <div className="pl-4">
                      <span className="text-slate-400">name:</span>{" "}
                      <span className="text-[#F59E0B] font-semibold">"Amrendra"</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-slate-400">role:</span>{" "}
                      <span className="text-[#F59E0B] font-semibold">"Frontend Developer &amp; Writer"</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-slate-400">stack:</span> [
                      <span className="text-[#F59E0B]">"React"</span>,{" "}
                      <span className="text-[#F59E0B]">"Next.js"</span>,{" "}
                      <span className="text-[#F59E0B]">"TypeScript"</span>],
                    </div>
                    <div className="pl-4">
                      <span className="text-slate-400">status:</span>{" "}
                      <span className="text-[#F59E0B] font-semibold">"Building digital products"</span>
                    </div>
                    <div>&#125;;</div>

                    {/* Terminal Status Output */}
                    <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#F59E0B] " />
                        <span className="text-[#F59E0B] font-bold">Ready for new projects</span>
                      </div>
                      <span className="text-slate-500 font-bold">v2.4.0</span>
                    </div>
                  </div>
                </div>

                {/* Floating Badges */}
                <div className="hidden sm:flex absolute -top-3 -right-3 px-3 py-1.5 rounded-xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-[#1E293B] shadow-lg items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 z-20">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>React 19</span>
                </div>

                <div className="hidden sm:flex absolute -bottom-3 -left-3 px-3 py-1.5 rounded-xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-[#1E293B] shadow-lg items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 z-20">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                  <span>Next.js 16</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════ FOUNDER CARD SECTION ═══════════ */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div
          className="max-w-5xl mx-auto"
        >
          {/* Founder Card — Large Centered */}
          <div
            className="relative flex flex-col md:flex-row items-center gap-10 md:gap-14 bg-[var(--card-bg)] rounded-3xl border border-[var(--card-border)] shadow-[var(--shadow-card)] p-8 md:p-12 overflow-hidden"
          >
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.06)_0%,transparent_70%)] pointer-events-none" />

            {/* Photo */}
            <div className="shrink-0 relative">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-[#0B1F3A] to-[#F59E0B] opacity-50 blur-md" />
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-2 border-[var(--card-border)]">
                <Image
                  src="/profile-photo.jpeg"
                  alt="Amrendra — Technical Content Writer & Frontend Developer"
                  fill
                  sizes="(max-width: 768px) 192px, 256px"
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
                <p className="text-[#0B1F3A] dark:text-[#F59E0B] font-bold text-base">
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
                  { href: "https://www.linkedin.com/in/amrendra1998/", icon: Linkedin, label: "LinkedIn" },
                  { href: "https://www.youtube.com/@codewithamrendra", icon: Youtube, label: "YouTube" },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${label} profile`}
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--section-alt-bg)] border border-[var(--card-border)] text-[var(--text-muted)] hover:text-[#F59E0B] dark:hover:text-[#F59E0B] transition-colors duration-200 "
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ MY STORY — Bento Grid ═══════════ */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 text-[var(--text-heading)]">
              My <span className="gradient-text">Story</span>
            </h2>
            <p className="text-[var(--text-body)] text-lg max-w-lg">
              The journey from curious learner to full-time builder.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Story Card — Spans 2 columns */}
            <div
              whileHover={{ y: -5 }}
              className="lg:col-span-2 bg-[var(--card-bg)] p-8 md:p-12 rounded-3xl border border-[rgba(255,255,255,0.05)] shadow-[var(--shadow-card)]  transition-colors duration-200 flex flex-col justify-center"
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
            </div>

            {/* Skills Card */}
            <div
              whileHover={{ y: -5 }}
              className="lg:col-span-1 bg-[var(--card-bg)] p-8 md:p-10 rounded-3xl border border-[rgba(255,255,255,0.05)] shadow-[var(--shadow-card)]  transition-colors duration-200"
            >
              <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--text-heading)] mb-8 flex items-center gap-3">
                <span className="w-8 h-1.5 md:h-2 bg-gradient-to-r from-[#0B1F3A] to-[#F59E0B] rounded-full"></span>
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
                      <span className="text-sm font-semibold text-[#0B1F3A] dark:text-[#F59E0B]">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-[var(--section-alt-bg)] border border-[rgba(255,255,255,0.05)] rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#0B1F3A] to-[#F59E0B] rounded-full transition-colors duration-200 ease-out shadow-[var(--shadow-glow)]"
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ WHAT I DO — Icon Grid ═══════════ */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-[var(--section-alt-bg)] border-t border-[var(--card-border)]">
        <div
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 text-[var(--text-heading)]">
              What I <span className="gradient-text">Do</span>
            </h2>
            <p className="text-[var(--text-body)] text-lg">
              Core areas where I build, write, and create impact.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Code2, title: "Frontend Dev", desc: "React, Next.js, TypeScript & modern UI frameworks" },
              { icon: Cloud, title: "Cloud & DevOps", desc: "AWS, Docker, CI/CD & scalable infrastructure" },
              { icon: Brain, title: "AI Engineering", desc: "AI Agents, LLMs, RAG & automation workflows" },
              { icon: Palette, title: "Technical Writing", desc: "Tutorials, guides & developer education content" },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center gap-4 p-6 md:p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] transition-colors duration-200 hover:border-[#F59E0B]/30 "
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F59E0B]/10 dark:bg-[#F59E0B]/15 border border-[#F59E0B]/20 flex items-center justify-center text-[#0B1F3A] dark:text-[#F59E0B]">
                  <Icon size={26} />
                </div>
                <h3 className="font-bold text-base text-[var(--text-heading)]">{title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA SECTION ═══════════ */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div
          className="max-w-3xl mx-auto"
        >
          <div
            className="relative bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl p-8 sm:p-12 text-center overflow-hidden"
          >
            {/* Radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.08)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-[var(--text-heading)]">
                Ready to <span className="gradient-text">Work Together</span>?
              </h2>
              <p className="text-base md:text-lg text-[var(--text-body)] mb-8 max-w-2xl mx-auto leading-relaxed">
                Whether you need a website built, want to collaborate on a project, or just want to chat about web development, I&apos;d love to hear from you!
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-bold text-base md:text-lg py-4 md:py-5 px-8 md:px-10 rounded-2xl transition-colors duration-200 shadow-[var(--shadow-glow)]    no-underline"
              >
                Get in Touch
                <ArrowRight size={20} className="transition-transform duration-200 " />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
