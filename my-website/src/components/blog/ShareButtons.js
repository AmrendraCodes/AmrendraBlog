"use client";

import { useState } from "react";
import { Twitter, Linkedin, Link2, Check } from "lucide-react";
import { siteMetadata } from "@/config/seo";

/**
 * ShareButtons — Social share buttons for blog posts.
 * Uses Web Share API on mobile with fallback to specific platforms.
 *
 * @param {{ title: string, slug: string }} props
 */
export default function ShareButtons({ title, slug }) {
  const [copied, setCopied] = useState(false);
  const url = `${siteMetadata.siteUrl}/blog/${slug}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`${title} by ${siteMetadata.social.twitter}`);
    const shareUrl = encodeURIComponent(url);
    window.open(
      `https://x.com/intent/tweet?text=${text}&url=${shareUrl}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareOnLinkedin = () => {
    const shareUrl = encodeURIComponent(url);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const buttons = [
    {
      label: "Share on X",
      icon: Twitter,
      onClick: shareOnTwitter,
      hoverClass: "hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30",
    },
    {
      label: "Share on LinkedIn",
      icon: Linkedin,
      onClick: shareOnLinkedin,
      hoverClass: "hover:text-[#0A66C2] hover:border-[#0A66C2]/30",
    },
    {
      label: copied ? "Copied!" : "Copy link",
      icon: copied ? Check : Link2,
      onClick: handleCopyLink,
      hoverClass: copied
        ? "text-emerald-400 border-emerald-400/30"
        : "hover:text-[#6366F1] hover:border-[#6366F1]/30",
    },
  ];

  return (
    <div className="flex items-center gap-2" id="share-buttons">
      <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mr-1 hidden sm:inline">
        Share
      </span>
      {buttons.map(({ label, icon: Icon, onClick, hoverClass }) => (
        <button
          key={label}
          onClick={onClick}
          className={`w-9 h-9 rounded-full bg-[var(--section-alt-bg)] border border-[var(--card-border)] flex items-center justify-center text-[var(--text-muted)] transition-all duration-200 cursor-pointer ${hoverClass}`}
          aria-label={label}
          title={label}
        >
          <Icon size={15} />
        </button>
      ))}
    </div>
  );
}
