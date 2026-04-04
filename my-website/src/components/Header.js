"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import styles from "./Header.module.css";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  if (!mounted) return null;

  return (
    <>
      <div className={styles.headerWrapper}>
        <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}>
          <Link href="/" className={styles.logoArea}>
            <div className={styles.logoIcon}>
              <img src="/icon.svg" alt="Logo" className={styles.logoImage} />
            </div>
            <span className={styles.logoText}>
              Amrendra<span className={styles.logoHighlight}>Blog</span>
            </span>
          </Link>

          <nav className={styles.nav}>
            {navLinks.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className={styles.mobileToggle}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
          >
            <Menu size={20} />
          </button>
        </header>
      </div>

      <div
        className={`${styles.mobileMenuOverlay} ${isMenuOpen ? styles.mobileMenuOverlayOpen : ""}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isMenuOpen}
      >
        <div className={styles.mobileMenuHeader}>
          <div className={styles.logoArea}>
            <div className={styles.logoIcon}>
              <Sparkles size={18} />
            </div>
            <span className={styles.logoText}>
              Amrendra<span className={styles.logoHighlight}>Blog</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className={styles.mobileMenuClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className={styles.mobileNav}>
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`${styles.mobileNavLink} ${isActive ? styles.activeMobile : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Spacer */}
      <div style={{ height: "100px" }}></div>
    </>
  );
}
