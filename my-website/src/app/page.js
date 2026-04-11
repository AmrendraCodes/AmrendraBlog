import Link from "next/link";
import { ArrowRight, TerminalSquare } from "lucide-react";
import styles from "./page.module.css";

const blogCards = [
  {
    title: "Design Systems for High-Impact Interfaces",
    description:
      "Build strong visual systems with modular components, consistent spacing, and accessible typography for teams that scale.",
    author: "Maya Patel",
    date: "April 1, 2026",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    href: "/blog/design-systems-for-interfaces",
  },
  {
    title: "Performance-First CSS Grid Layouts",
    description:
      "Learn layout strategies that load faster, adapt fluidly, and keep interfaces polished across devices.",
    author: "Noah Rivera",
    date: "March 28, 2026",
    category: "Frontend",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    href: "/blog/performance-first-css-grid",
  },
  {
    title: "Accessible Animations That Delight",
    description:
      "Create motion patterns that feel smooth, reduce cognitive load, and honor preferences for reduced motion.",
    author: "Ava Thompson",
    date: "March 24, 2026",
    category: "UX",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop",
    href: "/blog/accessible-animations-delight",
  },
  {
    title: "Data-Driven Content Strategy for Product Teams",
    description:
      "Use analytics, user feedback, and editorial design to keep your blog content relevant and high-converting.",
    author: "Elijah Scott",
    date: "March 18, 2026",
    category: "Content",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    href: "/blog/data-driven-content-strategy",
  },
  {
    title: "Scaling Component Libraries for Teams",
    description:
      "Adopt a systemized approach to reusable components, naming conventions, and documentation for faster product delivery.",
    author: "Amrendra Kumar",
    date: "March 12, 2026",
    category: "Architecture",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    href: "/blog/scaling-component-libraries",
  },
  {
    title: "Micro-Interactions That Improve Conversion",
    description:
      "Small UI moments can build trust and make every interaction feel polished without overwhelming the user.",
    author: "Leo Martinez",
    date: "March 5, 2026",
    category: "Motion",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
    href: "/blog/micro-interactions-conversion",
  },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.bgGrid} />
      <div className={styles.glowBlob1} />
      <div className={styles.glowBlob2} />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span>Next-Gen Web Design</span>
            </div>

            <h1 className={styles.heroTitle}>
              Engineering the <br />
              <span className={styles.gradientText}>
                Future of Code
              </span>
            </h1>

            <p className={styles.heroSubtitle}>
              Dive into advanced architectures, sleek modern UIs, and the tools
              that top-tier developers use to build the web of tomorrow.
            </p>

            <div className={styles.heroActions}>
              <Link href="/blog" className={styles.btnPrimary}>
                Read Articles
                <ArrowRight size={18} className={styles.arrowIcon} />
              </Link>

              <Link href="/about" className={styles.btnGhost}>
                Learn More
              </Link>
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

      {/* Blog Section */}
      <section className={styles.blogSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Latest <span className={styles.gradientText}>Insights</span>
          </h2>
          <p className={styles.sectionDesc}>
            Explore thoughtful design and development stories built for modern products.
          </p>
        </div>

        <div className={styles.blogGrid}>
          {blogCards.map((post, index) => (
            <article key={index} className={styles.standardCard}>
              <div className={styles.cardImageWrapper}>
                <span className={styles.cardBadge}>{post.category}</span>
                <img
                  src={post.image}
                  alt={post.title}
                  className={styles.cardImage}
                />
              </div>

              <div className={styles.cardContent}>
                <div className={styles.cardMeta}>
                  <span>{post.date}</span> • <span>By {post.author}</span>
                </div>

                <h3 className={styles.cardTitle}>{post.title}</h3>
                <p className={styles.cardDesc}>{post.description}</p>

                <div className={styles.cardFooter}>
                  <span>{post.author}</span>
                  <Link href={post.href} className={styles.readMoreBtn}>
                    Read More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles.newsletterSection}>
        <div className={styles.newsletterCard}>
          <div className={styles.newsletterIconWrapper}>
            <TerminalSquare size={32} />
          </div>

          <h2 className={styles.newsletterTitle}>
            Join the <span className={styles.gradientText}>Developer List</span>
          </h2>

          <p className={styles.newsletterDesc}>
            Get advanced tutorials, architectural patterns, and UI/UX case studies delivered to your inbox every month.
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
    </main>
  );
}