import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TerminalSquare, Github, Linkedin, Twitter, Youtube } from "lucide-react";
import styles from "./page.module.css";
import CategoriesSection from "@/components/blog/CategoriesSection";
import LatestArticles from "@/components/blog/LatestArticles";

const featuredPosts = [
  {
    title: "Building Reusable React Component Systems at Scale",
    description: "Learn how to architect component libraries that grow with your application, enforcing consistency while remaining flexible for complex UI needs.",
    category: "React",
    date: "April 1, 2026",
    readingTime: "8 min read",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop",
    href: "/blog/react-component-systems",
  },
  {
    title: "Creating Autonomous AI Agents with Modern LLM Workflows",
    description: "A deep dive into building AI agents that can reason, use tools, and execute complex multi-step workflows using the latest LLM frameworks.",
    category: "AI Agents",
    date: "March 28, 2026",
    readingTime: "12 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    href: "/blog/autonomous-ai-agents",
  },
  {
    title: "Designing Multi-Tenant SaaS Platforms for Scale",
    description: "Essential database architectures, routing strategies, and authentication patterns for building scalable multi-tenant applications.",
    category: "SaaS Architecture",
    date: "March 24, 2026",
    readingTime: "15 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    href: "/blog/saas-architecture-scale",
  },
  {
    title: "AWS Infrastructure Best Practices for Startups",
    description: "From VPC design to ECS deployments, learn the foundational AWS services and architectures every startup should implement.",
    category: "AWS Infrastructure",
    date: "March 18, 2026",
    readingTime: "10 min read",
    image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?q=80&w=1200&auto=format&fit=crop",
    href: "/blog/aws-infrastructure-startups",
  },
  {
    title: "Automating CI/CD Pipelines with GitHub Actions & Docker",
    description: "A practical guide to containerizing your applications and building robust, automated deployment pipelines.",
    category: "DevOps",
    date: "March 12, 2026",
    readingTime: "9 min read",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1200&auto=format&fit=crop",
    href: "/blog/github-actions-docker",
  },
];

export default function Home() {
  return (
    <main className={styles.main}>


      {/* Hero Section */}
      <section className={styles.heroSection}>
        {/* Animated Background Blur Glows */}
        <div className={styles.glowBlob1} />
        <div className={styles.glowBlob2} />

        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.badgeLabel}>Alex</span>
              <span>Software Engineer & Cloud Architect</span>
            </div>
            <h1 className={styles.heroTitle}>
              Developer Notes on Frontend, SaaS & Growth
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
              <div className={styles.tickerItem}>✦ Mobile Devlopment</div>
              <div className={styles.tickerItem}>✦ Devops </div>
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

        <div className={styles.trendingGrid}>
          {featuredPosts.map((post, index) => (
            <article key={index} className={styles.compactCard}>
              <div className={styles.compactImageWrapper}>
                <span className={styles.compactBadge}>{post.category}</span>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 80vw, 30vw"
                  className={styles.compactImage}
                />
              </div>
              <div className={styles.compactContent}>
                <h3 className={styles.compactTitle}>{post.title}</h3>
                <p className={styles.compactDesc}>{post.description}</p>
                <div className={styles.compactFooter}>
                  <span className={styles.compactAuthor}>{post.date} • {post.readingTime}</span>
                  <Link href={post.href} className={styles.compactLink}>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* About the Blogger Section */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutImageWrapper}>
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
              alt="Alex - Software Engineer"
              fill
              className={styles.aboutImage}
            />
          </div>
          <div className={styles.aboutContent}>
            <h2 className={styles.aboutTitle}>
              Hi, I'm <span className={styles.gradientText}>Alex</span>
            </h2>
            <p className={styles.aboutDesc}>
              Software engineer, cloud architect, and technical writer sharing practical insights on frontend engineering, AI systems, scalable SaaS platforms, and DevOps automation.
            </p>
            <div className={styles.techStack}>
              <span className={styles.techBadge}>React & Next.js</span>
              <span className={styles.techBadge}>AWS & Terraform</span>
              <span className={styles.techBadge}>Python & AI Agents</span>
              <span className={styles.techBadge}>Node.js & Go</span>
            </div>
            <Link href="/about" className={styles.btnPrimary}>
              More About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <CategoriesSection />

      {/* Latest Articles Feed */}
      <LatestArticles />

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

          <form className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="name@company.com"
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
            “One of the most practical and well-designed engineering blogs I follow. The insights on architecture are unparalleled.”
          </blockquote>
          <div className={styles.testimonialAuthor}>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop" alt="Sarah J." className={styles.testimonialAuthorImage} />
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
              Let's <span className={styles.gradientText}>Connect</span>
            </h2>
            <p className={styles.sectionDesc}>
              Find me around the web where I build in public.
            </p>
          </div>
          
          <div className={styles.socialGrid}>
            <a href="#" className={styles.socialCard}>
              <Github size={32} className={styles.socialIcon} />
              <span className={styles.socialName}>GitHub</span>
            </a>
            <a href="#" className={styles.socialCard}>
              <Twitter size={32} className={styles.socialIcon} />
              <span className={styles.socialName}>Twitter / X</span>
            </a>
            <a href="#" className={styles.socialCard}>
              <Linkedin size={32} className={styles.socialIcon} />
              <span className={styles.socialName}>LinkedIn</span>
            </a>
            <a href="#" className={styles.socialCard}>
              <Youtube size={32} className={styles.socialIcon} />
              <span className={styles.socialName}>YouTube</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}