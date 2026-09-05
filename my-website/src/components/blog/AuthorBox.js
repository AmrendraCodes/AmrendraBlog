import Image from "next/image";
import { Twitter, Linkedin, Github } from "lucide-react";
import { siteMetadata } from "@/config/seo";

/**
 * AuthorBox — Enhanced author card with avatar, name, bio, and social links.
 *
 * @param {{ author: string }} props
 */
export default function AuthorBox({ author }) {
  const socials = [
    {
      href: siteMetadata.social.twitterUrl,
      icon: Twitter,
      label: "Twitter",
    },
    {
      href: siteMetadata.social.linkedin,
      icon: Linkedin,
      label: "LinkedIn",
    },
    {
      href: siteMetadata.social.github,
      icon: Github,
      label: "GitHub",
    },
  ];

  return (
    <div className="pt-5 border-t border-[var(--card-border)]/60">
      <div className="bg-[var(--section-alt-bg)]/50  rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-center sm:items-start border border-[var(--card-border)] shadow-xs relative overflow-hidden">
        {/* Glow behind author box */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#F59E0B] rounded-full blur-[80px] opacity-10 pointer-events-none" />
        {/* Avatar with gradient ring */}
        <div className="shrink-0 relative">
          <div className="absolute -inset-0.5 bg-gradient-to-br from-[#0B1F3A] to-[#F59E0B] rounded-full blur-[2px] opacity-70" />
          <Image
            src={siteMetadata.profileImage}
            alt={author || siteMetadata.author}
            width={72}
            height={72}
            className="w-18 h-18 rounded-full object-cover relative border-2 border-[var(--background)] shadow-md"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col text-center sm:text-left flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)] mb-1.5 flex items-center justify-center sm:justify-start gap-2">
            {author || siteMetadata.author}
            <span className="bg-[#F59E0B]/15 text-[#0B1F3A] dark:text-[#F59E0B] text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-extrabold border border-[#F59E0B]/30">
              Author
            </span>
          </h3>
          <p className="text-sm text-[var(--text-body)] mb-4 leading-relaxed">
            {siteMetadata.authorBio}
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center sm:justify-start gap-2.5">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[#F59E0B] hover:border-[#F59E0B]/40  transition-colors"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
