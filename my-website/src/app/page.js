import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { ArrowRight, Sparkles, MoveRight, Code, TerminalSquare } from "lucide-react";
import styles from "./page.module.css";

export default function Home() {
  const posts = getAllPosts();
  const featuredPost = posts[0];
  const standardPosts = posts.slice(1, 4);

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
              <Sparkles size={14} />
              <span>Next-Gen Web Design</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              Engineering the <br/>
              <span className={styles.gradientText}>Future of Code</span>
            </h1>
            
            <p className={styles.heroSubtitle}>
              Dive into advanced architectures, sleek modern UIs, and the tools that top-tier developers use to build the web of tomorrow.
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
          
          <div className={styles.heroVisual}>
            <div className={styles.codeCardWrapper}>
              <div className={styles.codeCardHeader}>
                <div className={`${styles.codeDot} ${styles.dotRed}`}></div>
                <div className={`${styles.codeDot} ${styles.dotYellow}`}></div>
                <div className={`${styles.codeDot} ${styles.dotGreen}`}></div>
              </div>
              <div className={styles.codeContent}>
                <span className={styles.keyword}>const</span> <span className={styles.method}>buildFuture</span> = <span className={styles.keyword}>async</span> () {`=>`} {`{`}<br/>
                &nbsp;&nbsp;<span className={styles.keyword}>const</span> tech = <span className={styles.keyword}>await</span> <span className={styles.method}>import</span>(<span className={styles.string}>'@/lib/innovation'</span>);<br/>
                &nbsp;&nbsp;<span className={styles.comment}>// Initialize modern stack</span><br/>
                &nbsp;&nbsp;tech.init(&#123;<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;performance: <span className={styles.string}>'blazing-fast'</span>,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;design: <span className={styles.string}>'pixel-perfect'</span>,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;experience: <span className={styles.string}>'seamless'</span><br/>
                &nbsp;&nbsp;&#125;);<br/>
                <br/>
                &nbsp;&nbsp;<span className={styles.keyword}>return</span> tech.deploy();<br/>
                {`}`};<br/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker Section */}
      <section className={styles.tickerSection}>
        <div className={styles.tickerTrack}>
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{display: 'flex', gap: '4rem'}}>
              <div className={styles.tickerItem}><span className={styles.tickerStar}>✦</span> React Architecture</div>
              <div className={styles.tickerItem}><span className={styles.tickerStar}>✦</span> Advanced CSS Pro</div>
              <div className={styles.tickerItem}><span className={styles.tickerStar}>✦</span> Next.js Mastery</div>
              <div className={styles.tickerItem}><span className={styles.tickerStar}>✦</span> UI/UX Patterns</div>
              <div className={styles.tickerItem}><span className={styles.tickerStar}>✦</span> Server Actions</div>
              <div className={styles.tickerItem}><span className={styles.tickerStar}>✦</span> Animations</div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Section */}
      <section className={styles.blogSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Latest <span className={styles.gradientText}>Insights</span></h2>
          <p className={styles.sectionDesc}>Explore detailed articles on modern web development, state-of-the-art frameworks, and design philosophies.</p>
        </div>

        <div className={styles.blogGrid}>
          {/* Featured Card */}
          {featuredPost && (
            <article className={styles.featuredCard}>
              <div className={styles.cardImageWrapper}>
                <div className={styles.cardBadge}>{featuredPost.category || "Architecture"}</div>
                <img 
                  src={featuredPost.image || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop"} 
                  alt={featuredPost.title} 
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardMeta}>
                  <div className={styles.metaItem}><span>{featuredPost.date || "March 15, 2026"}</span></div>
                  <div className={styles.metaItem}>•</div>
                  <div className={styles.metaItem}><span>{featuredPost.readTime || "8 min read"}</span></div>
                </div>
                <h3 className={styles.cardTitle}>
                  <Link href={`/blog/${featuredPost.slug}`} style={{textDecoration:'none', color:'inherit'}}>
                    {featuredPost.title}
                  </Link>
                </h3>
                <p className={styles.cardDesc}>
                  {featuredPost.excerpt || "Discover the patterns and architectures behind highly scalable web applications in the modern era."}
                </p>
                <div className={styles.cardFooter}>
                  <div className={styles.cardAuthor}>
                    <div className={styles.authorAvatar}></div>
                    <span className={styles.authorName}>{featuredPost.author || "Amrendra"}</span>
                  </div>
                  <Link href={`/blog/${featuredPost.slug}`} className={styles.cardLink}>
                    <MoveRight size={18} />
                  </Link>
                </div>
              </div>
            </article>
          )}

          {/* Standard Cards */}
          {standardPosts.map((post) => (
            <article key={post.slug} className={styles.standardCard}>
              <div className={styles.cardImageWrapper}>
                <div className={styles.cardBadge}>{post.category || "Development"}</div>
                <img 
                  src={post.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"} 
                  alt={post.title} 
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.cardContent} style={{ flex: 1 }}>
                <div className={styles.cardMeta}>
                  <div className={styles.metaItem}><span>{post.date || "Mar 10, 2026"}</span></div>
                  <div className={styles.metaItem}>•</div>
                  <div className={styles.metaItem}><span>{post.readTime || "5 min read"}</span></div>
                </div>
                <h3 className={styles.cardTitle} style={{ fontSize: '1.5rem' }}>
                  <Link href={`/blog/${post.slug}`} style={{textDecoration:'none', color:'inherit'}}>
                    {post.title}
                  </Link>
                </h3>
                <div className={styles.cardFooter}>
                  <div className={styles.cardAuthor}>
                    <div className={styles.authorAvatar} style={{width:'2rem', height:'2rem'}}></div>
                    <span className={styles.authorName} style={{fontSize:'0.8rem'}}>{post.author || "Amrendra"}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
                    <MoveRight size={16} />
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
            Get advanced tutorials, architectural patterns, and UI/UX case studies delivered to your inbox every month. No fluff, just code.
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
