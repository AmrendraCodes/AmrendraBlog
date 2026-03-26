import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram, Sparkles, Mail, Send } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logoArea}>
              <div className={styles.logoIcon}>
                <Sparkles size={18} />
              </div>
              <span className={styles.logoText}>
                Amrendra<span className={styles.logoHighlight}>Blog</span>
              </span>
            </Link>
            <p className={styles.description}>
              Empowering developers and creators with the latest insights into modern technology and creative design.
            </p>
            <div className={styles.socials}>
              <Link href="https://x.com/AmrendraCodes" target="_blank" className={styles.socialLink}>
                <Twitter size={16} />
              </Link>
              <Link href="https://github.com/amrendra-dev" target="_blank" className={styles.socialLink}>
                <Github size={16} />
              </Link>
              <Link href="https://linkedin.com" target="_blank" className={styles.socialLink}>
                <Linkedin size={16} />
              </Link>
              <Link href="https://instagram.com" target="_blank" className={styles.socialLink}>
                <Instagram size={16} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              {[
                { name: "Home", href: "/" },
                { name: "Blog", href: "/blog" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" }
              ].map((link) => (
                <li key={link.name} className={styles.linkItem}>
                  <Link href={link.href}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={styles.colTitle}>Newsletter</h4>
            <p className={styles.newsletterDesc}>Join 5,000+ others and never miss a new post.</p>
            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Your email"
                className={styles.newsletterInput}
              />
              <button 
                type="submit"
                className={styles.newsletterBtn}
                aria-label="Subscribe"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} AmrendraBlog. All rights reserved. Built with ❤️ for the community.
          </p>
          <div className={styles.bottomLinks}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
