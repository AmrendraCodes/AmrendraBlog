import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TerminalSquare, Github, Linkedin, Twitter, Youtube } from "lucide-react";
import styles from "./page.module.css";
import CategoriesSection from "@/components/blog/CategoriesSection";
import LatestArticles from "@/components/blog/LatestArticles";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Code with Amrendra — React, AI & SaaS Insights",
  description: "Personal insights on React, AI Agents, SaaS architecture, AWS infrastructure, DevOps automation, and modern software engineering.",
  openGraph: {
    title: 'Code with Amrendra — React, AI & SaaS Insights',
    description: 'Personal insights on React, AI Agents, SaaS architecture, AWS infrastructure, DevOps automation, and modern software engineering.',
    url: '/',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Code with Amrendra — React, AI Agents, SaaS & DevOps',
      },
    ],
  },
  twitter: {
    title: 'Code with Amrendra — React, AI & SaaS Insights',
    description: 'Personal insights on React, AI Agents, SaaS architecture, AWS infrastructure, DevOps automation, and modern software engineering.',
    images: ['/images/og-default.png'],
  },
};


export default function Home() {
  // Fetch posts from markdown files and pick top 5 for featured section
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.slice(0, 5).map((post) => ({
    title: post.title,
    description: post.excerpt,
    category: post.category,
    date: post.date,
    readingTime: post.readTime,
    image: post.image,
    href: `/blog/${post.slug}`,
  }));

  return (
    <main className={styles.main}>


      {/* Hero Section */}
      <section className={`${styles.heroSection} pt-28 md:pt-28 lg:pt-32`}>
        {/* Animated Background Blur Glows */}
        <div className={styles.glowBlob1} />
        <div className={styles.glowBlob2} />

        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Developer Notes on Frontend, SaaS &amp; Growth
            </h1>

            <p className={styles.heroSubtitle}>
              Personal insights on React, AI Agents, SaaS architecture, AWS infrastructure, DevOps automation, and modern software engineering.
            </p>

            <div className={styles.heroActions}>
              <Link href="/blog" className={styles.btnPrimary}>
                Read Latest Articles
                <ArrowRight size={20} className={styles.arrowIcon} />
              </Link>

              <Link href="/categories" className={styles.btnGhost}>
                Explore Categories
              </Link>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroImageWrapper}>
              <Image
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop"
                alt="Engineering the Future of Code"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`${styles.heroImage} object-cover`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ticker Section */}
      <section className={styles.tickerSection}>
        <div className={styles.tickerTrack}>
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: "flex", gap: "4rem" }}>
              <div className={styles.tickerItem}>✦ Mobile Development</div>
              <div className={styles.tickerItem}>✦ DevOps </div>
              <div className={styles.tickerItem}>✦ Digital Marketing</div>
              <div className={styles.tickerItem}>✦ UI/UX Patterns</div>
              <div className={styles.tickerItem}>✦ AI Learning</div>
              <div className={styles.tickerItem}>✦ Animations</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Blog Posts Section */}
      <section className={styles.trendingSection}>
        <div className={styles.trendingHeaderWrapper}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Featured <span className={styles.gradientText}>Articles</span>
            </h2>
            <p className={styles.sectionDesc}>
              Deep dives into architecture, scaling, and engineering workflows.
            </p>
          </div>
        </div>

        <div className="max-w-[80rem] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8" suppressHydrationWarning>
          {/* Hero Article */}
          <article className="group relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 h-full min-h-[400px]" suppressHydrationWarning>
            <Image src={featuredPosts[0].image} alt={featuredPosts[0].title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/60 to-transparent" suppressHydrationWarning />
            <div className="absolute bottom-0 left-0 p-8 flex flex-col justify-end h-full w-full z-10" suppressHydrationWarning>
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-fit mb-4 shadow-sm">
                {featuredPosts[0].category}
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-snug">
                {featuredPosts[0].title}
              </h3>
              <div className="flex items-center text-slate-300 text-sm font-medium" suppressHydrationWarning>
                <span>{featuredPosts[0].date} • {featuredPosts[0].readingTime}</span>
              </div>
              <Link href={featuredPosts[0].href} className="absolute inset-0 z-20"><span className="sr-only">Read more</span></Link>
            </div>
          </article>
          
          {/* Supporting Articles */}
          <div className="flex flex-col gap-6" suppressHydrationWarning>
            {featuredPosts.slice(1, 4).map((post, index) => (
              <article key={index} className="flex gap-6 group items-center bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-blue-100 hover:shadow-xl transition-all duration-300 relative" suppressHydrationWarning>
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 shrink-0 rounded-2xl overflow-hidden" suppressHydrationWarning>
                  <Image src={post.image} alt={post.title} fill sizes="150px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="flex flex-col justify-center" suppressHydrationWarning>
                  <span className="text-blue-600 dark:text-blue-400 text-[11px] font-extrabold uppercase tracking-wider mb-2">
                    {post.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-50 mb-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    <Link href={post.href} className="before:absolute before:inset-0 z-10">
                      {post.title}
                    </Link>
                  </h3>
                  <div className="text-slate-500 dark:text-slate-400 text-[13px] font-medium" suppressHydrationWarning>
                    <span>{post.date} • {post.readingTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12 w-full" suppressHydrationWarning>
          <Link href="/blog" className="inline-flex items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3.5 px-8 rounded-full hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white">
            View All Posts <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* About the Blogger Section */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutImageWrapper}>
            <Image
              src="/Profile photo.jpeg"
              alt="Amrendra - Technical Content Writer"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className={styles.aboutImage}
            />
          </div>
          <div className={styles.aboutContent}>
            <h2 className={styles.aboutTitle}>
              Hi, I&apos;m <span className={styles.gradientText}>Amrendra</span>
            </h2>
            <p className={styles.aboutDesc}>
              Software engineer, cloud architect, and technical writer sharing practical insights on frontend engineering, AI systems, scalable SaaS platforms, and DevOps automation.
            </p>
            <div className={styles.techStack}>
              <span className={styles.techBadge}>React &amp; Next.js</span>
              <span className={styles.techBadge}>AWS &amp; Terraform</span>
              <span className={styles.techBadge}>Python &amp; AI Agents</span>
              <span className={styles.techBadge}>Node.js &amp; Go</span>
            </div>
            <Link href="/about" className={styles.btnPrimary}>
              More About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <CategoriesSection />

      {/* Latest Articles Removed per new strategy */}

      {/* Newsletter Section */}
      <section className={styles.newsletterSection}>
        <div className={styles.newsletterGlassCard}>
          <div className={styles.newsletterGlassBorder} />
          <div className={styles.newsletterIconWrapper}>
            <TerminalSquare size={36} />
          </div>

          <h2 className={styles.newsletterTitle}>
            Join the <span className={styles.gradientText}>Developer Weekly Journal</span>
          </h2>

          <p className={styles.newsletterDesc}>
            Get practical engineering insights, AI workflows, cloud architecture tips, and developer resources every week.
          </p>

          <form className={styles.newsletterForm} action="#">
            <input
              type="email"
              placeholder="name@company.com"
              aria-label="Email address for weekly journal"
              className={styles.newsletterInput}
              required
            />
            <button type="submit" className={styles.newsletterSubmit}>
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className={styles.testimonialsContainer}>
          <blockquote className={styles.testimonialQuote}>
            &ldquo;One of the most practical and well-designed engineering blogs I follow. The insights on architecture are unparalleled.&rdquo;
          </blockquote>
          <div className={styles.testimonialAuthor}>
            <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop" alt="Sarah J." width={48} height={48} className={styles.testimonialAuthorImage} />
            <div className={styles.testimonialAuthorInfo}>
              <span className={styles.testimonialAuthorName}>Sarah Jenkins</span>
              <span className={styles.testimonialAuthorRole}>Lead Frontend Engineer</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social / Developer Presence Section */}
      <section className={styles.socialSection}>
        <div className={styles.socialContainer}>
          <div className={styles.sectionHeader} style={{ marginBottom: 0, textAlign: 'center' }}>
            <h2 className={styles.sectionTitle}>
              Let&apos;s <span className={styles.gradientText}>Connect</span>
            </h2>
            <p className={styles.sectionDesc}>
              Find me around the web where I build in public.
            </p>
          </div>

          <div className={styles.socialGrid}>
            <a href="https://github.com/AmrendraCodes" target="_blank" rel="noopener noreferrer" aria-label="Visit Amrendra GitHub Profile" className={styles.socialCard}>
              <Github size={32} className={styles.socialIcon} />
              <span className={styles.socialName}>GitHub</span>
            </a>
            <a href="https://x.com/codewithamrendr" target="_blank" rel="noopener noreferrer" aria-label="Visit Amrendra Twitter Profile" className={styles.socialCard}>
              <Twitter size={32} className={styles.socialIcon} />
              <span className={styles.socialName}>Twitter / X</span>
            </a>
            <a href="https://www.linkedin.com/in/amrendra-reactdev/" target="_blank" rel="noopener noreferrer" aria-label="Visit Amrendra LinkedIn Profile" className={styles.socialCard}>
              <Linkedin size={32} className={styles.socialIcon} />
              <span className={styles.socialName}>LinkedIn</span>
            </a>
            <a href="https://www.youtube.com/@codewithamrendra" target="_blank" rel="noopener noreferrer" aria-label="Visit Amrendra YouTube Channel" className={styles.socialCard}>
              <Youtube size={32} className={styles.socialIcon} />
              <span className={styles.socialName}>YouTube</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}