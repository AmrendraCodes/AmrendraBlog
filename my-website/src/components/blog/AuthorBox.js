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
    <div className="mt-16 pt-10 border-t border-[var(--card-border)]/50">
      <div className="bg-[var(--section-alt-bg)]/40 backdrop-blur-xl rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row gap-8 items-center sm:items-start border border-white/5 shadow-2xl relative overflow-hidden">
        {/* Glow behind author box */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#6366F1] rounded-full blur-[80px] opacity-10 pointer-events-none" />
        {/* Avatar with gradient ring */}
        <div className="shrink-0 relative">
          <div className="absolute -inset-1 bg-gradient-to-br from-[#6366F1] to-[#a855f7] rounded-full blur-sm opacity-50" />
          <Image
            src={siteMetadata.profileImage}
            alt={author || siteMetadata.author}
            width={96}
            height={96}
            className="w-24 h-24 rounded-full object-cover relative border-2 border-[var(--background)]"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col text-center sm:text-left">
          <h3 className="text-2xl font-extrabold text-[var(--text-heading)] mb-2 flex items-center justify-center sm:justify-start gap-2">
            {author || siteMetadata.author}
            <span className="bg-[#6366F1]/10 text-[#6366F1] dark:text-[#818CF8] text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold">
              Author
            </span>
          </h3>
          <p className="text-[var(--text-body)] mb-6 leading-relaxed">
            {siteMetadata.authorBio}
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center sm:justify-start gap-3">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[#6366F1] hover:border-[#6366F1]/30 hover:shadow-md transition-all"
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
