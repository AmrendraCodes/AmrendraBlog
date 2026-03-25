import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Clock, Calendar, Mail, Zap } from "lucide-react";
import BlogCard from "../components/BlogCard";
import styles from "./page.module.css";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main style={{ backgroundColor: 'white', minHeight: '100vh', margin: 0, padding: 0 }}>
      {/* 1. Hero Section: Standard Professional Layout */}
      <section className={styles.heroSection}>
        {/* Abstract Background Elements */}
        <div className={styles.bgElement1} />
        <div className={styles.bgElement2} />

        <div className={styles.container}>
          <div className={styles.heroGrid}>
            {/* Left: Content */}
            <div className={styles.heroContent}>
              <div className={styles.badge}>
                <TrendingUp size={14} />
                <span>Featured Post</span>
              </div>

              <h1 className={styles.heroTitle}>
                Mastering the Art of <span className={styles.textBlue}>Modern Code.</span>
              </h1>

              <p className={styles.heroDescription}>
                Dive deep into the strategies, tools, and mindsets that drive the world's most innovative technology companies.
              </p>

              <div className={styles.heroActions}>
                <Link href="/blog/featured-post" className={styles.primaryButton}>
                  <span>Read Full Article</span>
                  <ArrowRight size={18} className={styles.btnArrow} />
                </Link>
                <div className={styles.readersData}>
                  <div className={styles.readersAvatars}>
                    <img src="https://i.pravatar.cc/100?u=1" alt="Reader 1" />
                    <img src="https://i.pravatar.cc/100?u=2" alt="Reader 2" />
                    <img src="https://i.pravatar.cc/100?u=3" alt="Reader 3" />
                  </div>
                  <span className={styles.readersText}>5k+ Readers</span>
                </div>
              </div>
            </div>

            {/* Right: Visual */}
            <div className={styles.heroVisual}>
              <div className={styles.imageWrapper}>
                <img
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop"
                  alt="Featured Article"
                  className={styles.heroImage}
                />
                <div className={styles.imageOverlay} />
                <div className={styles.imageContent}>
                  <span className={styles.trendingBadge}>Trending now</span>
                  <h2 className={styles.imageTitle}>How AI is Revolutionizing Personalized Learning</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Latest Posts Section */}
      <section className={styles.postsSection}>
        <div className={styles.container}>
          <div className={styles.postsHeader}>
            <div className={styles.sectionTitleBlock}>
              <div className={styles.subtitleWrapper}>
                <div className={styles.subtitleLine} />
                <span className={styles.subtitleText}>Fresh Insights</span>
              </div>
              <h2 className={styles.sectionTitle}>
                Latest from the <span className={styles.textBlue}>Blog.</span>
              </h2>
            </div>
            <Link href="/blog" className={styles.viewAllLink}>
              <span>View all articles</span>
              <ArrowRight size={18} className={styles.viewAllArrow} />
            </Link>
          </div>

          <div className={styles.postsGrid}>
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          <div className={styles.mobileExploreMore}>
            <Link href="/blog" className={styles.mobileExploreLink}>
              <span>Explore More</span>
              <ArrowRight size={18} className={styles.viewAllArrow} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Newsletter Section */}
      <section className={styles.newsletterSection}>
        <div className={styles.container}>
          <div className={styles.newsletterCard}>
            {/* Background elements */}
            <div className={styles.newsletterBgTop} />
            <div className={styles.newsletterBgBottom} />

            <div className={styles.newsletterIconWrapper}>
              <Mail className={styles.newsletterIcon} size={32} />
            </div>

            <div className={styles.newsletterText}>
              <h2 className={styles.newsletterTitle}>
                Join the <span className={styles.textBlue}>Amrendra</span> inner circle.
              </h2>
              <p className={styles.newsletterDesc}>
                Get high-quality tutorials and case studies delivered directly to your inbox. No spam, ever.
              </p>
            </div>

            <div className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Work email address"
                className={styles.newsletterInput}
              />
              <button className={styles.newsletterSubmit}>
                Subscribe
              </button>
            </div>

            <p className={styles.newsletterFooter}>
              Join 12,000+ developers receiving our weekly digest.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
