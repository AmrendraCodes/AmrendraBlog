"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import CopyButton from "./blog/CopyButton";
import { Link as LinkIcon } from "lucide-react";
import { useEffect } from "react";
import Zoom from "react-medium-image-zoom";

// Dynamically import MermaidBlock to keep initial bundle lean
const MermaidBlock = dynamic(() => import("./blog/MermaidBlock"), {
  ssr: false,
  loading: () => (
    <div className="my-6 p-8 bg-[var(--section-alt-bg)] border border-[var(--card-border)] rounded-xl flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-[#10B981] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

/**
 * Creates a heading component with anchor link on hover.
 */
function createHeadingComponent(level) {
  const Tag = `h${level}`;

  const HeadingComponent = ({ children, id, ...props }) => {
    let sizeClasses = "";
    if (level === 2) {
      sizeClasses = "text-2xl sm:text-3xl font-extrabold text-[var(--text-heading)] mt-12 mb-5 leading-tight border-b border-[var(--card-border)]/30 pb-2 block w-full";
    } else if (level === 3) {
      sizeClasses = "text-xl sm:text-2xl font-bold text-[var(--text-heading)] mt-10 mb-4 leading-snug block";
    } else if (level === 4) {
      sizeClasses = "text-lg sm:text-xl font-bold text-[var(--text-heading)] mt-8 mb-3 leading-normal block";
    }

    return (
      <Tag id={id} className={`group relative scroll-mt-24 ${sizeClasses}`} {...props}>
        {id && (
          <a
            href={`#${id}`}
            className="anchor-link absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[var(--text-muted)] hover:text-[#10B981] no-underline"
            aria-label={`Link to ${typeof children === "string" ? children : "section"}`}
          >
            <LinkIcon size={16} />
          </a>
        )}
        {children}
      </Tag>
    );
  };

  HeadingComponent.displayName = `Heading${level}`;
  return HeadingComponent;
}

/**
 * Admonition/callout component for custom block quotes.
 * Supports: NOTE, TIP, WARNING, CAUTION, IMPORTANT
 */
function parseAdmonition(children) {
  if (!children || !Array.isArray(children)) return null;

  // Look for text starting with [!NOTE], [!TIP], etc.
  const firstChild = children[0];
  if (!firstChild || typeof firstChild !== "object") return null;

  const textContent =
    firstChild?.props?.children?.[0] ||
    (typeof firstChild === "string" ? firstChild : null);

  if (typeof textContent !== "string") return null;

  const match = textContent.match(
    /^\[!(NOTE|TIP|WARNING|CAUTION|IMPORTANT)\]\s*/i
  );
  if (!match) return null;

  const type = match[1].toUpperCase();
  // Remove the marker from the text
  const remainingText = textContent.replace(match[0], "");

  return { type, remainingText };
}

const admonitionConfig = {
  NOTE: {
    borderColor: "border-emerald-500",
    bgColor: "bg-emerald-500/5",
    iconColor: "text-emerald-500",
    icon: "ℹ️",
    title: "Note",
  },
  TIP: {
    borderColor: "border-emerald-500",
    bgColor: "bg-emerald-500/5",
    iconColor: "text-emerald-500",
    icon: "💡",
    title: "Tip",
  },
  WARNING: {
    borderColor: "border-amber-500",
    bgColor: "bg-amber-500/5",
    iconColor: "text-amber-500",
    icon: "⚠️",
    title: "Warning",
  },
  CAUTION: {
    borderColor: "border-red-500",
    bgColor: "bg-red-500/5",
    iconColor: "text-red-500",
    icon: "🚨",
    title: "Caution",
  },
  IMPORTANT: {
    borderColor: "border-emerald-500",
    bgColor: "bg-emerald-500/5",
    iconColor: "text-emerald-500",
    icon: "📌",
    title: "Important",
  },
};

export default function MarkdownRenderer({ content }) {
  useEffect(() => {
    import("react-medium-image-zoom/dist/styles.css");
  }, []);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeSlug, rehypeRaw, rehypeHighlight, rehypeKatex]}
      components={{
        // ─── Headings with anchor links ───
        h1: createHeadingComponent(2),
        h2: createHeadingComponent(2),
        h3: createHeadingComponent(3),
        h4: createHeadingComponent(4),

        // ─── Links: Next.js Link for internal, standard a for external ───
        a: ({ href, children, ...props }) => {
          if (href && (href.startsWith("/") || href.startsWith("#"))) {
            return (
              <Link href={href} {...props}>
                {children}
              </Link>
            );
          }
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            >
              {children}
            </a>
          );
        },

        // ─── Images with Next.js Image optimization and Zoom ───
        img: ({ src, alt, ...props }) => {
          // For external images, use standard img with lazy loading
          if (src && (src.startsWith("http://") || src.startsWith("https://"))) {
            return (
              <span className="block my-10 flex flex-col items-center">
                <Zoom>
                  <img
                    src={src}
                    alt={alt || ""}
                    loading="lazy"
                    className="rounded-2xl shadow-xl max-w-full w-auto lg:max-w-[80%] mx-auto object-contain"
                    {...props}
                  />
                </Zoom>
                {alt && (
                  <span className="block text-center text-sm text-[var(--text-muted)] mt-4 italic">
                    {alt}
                  </span>
                )}
              </span>
            );
          }
          // For local images, use Next.js Image
          return (
            <span className="block my-10 flex flex-col items-center">
              <Zoom>
                <Image
                  src={src || ""}
                  alt={alt || ""}
                  width={800}
                  height={450}
                  className="rounded-2xl shadow-xl max-w-full w-auto lg:max-w-[80%] mx-auto object-contain"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </Zoom>
              {alt && (
                <span className="block text-center text-sm text-[var(--text-muted)] mt-4 italic">
                  {alt}
                </span>
              )}
            </span>
          );
        },

        // ─── Code blocks with copy button, language label, and Mermaid ───
        pre: ({ children, ...props }) => {
          // Extract code content and language
          const codeElement = children?.props;
          const className = codeElement?.className || "";
          const langMatch = className.match(/language-(\w+)/);
          const language = langMatch ? langMatch[1] : "";
          const codeText =
            typeof codeElement?.children === "string"
              ? codeElement.children
              : "";

          // Mermaid diagram support
          if (language === "mermaid") {
            return <MermaidBlock chart={codeText} />;
          }

          return (
            <div className="code-block-wrapper group relative my-6">
              {/* Language Label */}
              {language && (
                <div className="code-lang-label">
                  {language}
                </div>
              )}
              {/* Copy Button */}
              <CopyButton text={codeText} />
              <pre
                className="!mt-0 !rounded-xl !border !border-[var(--card-border)]"
                {...props}
              >
                {children}
              </pre>
            </div>
          );
        },

        // ─── Blockquotes with admonition support ───
        blockquote: ({ children, ...props }) => {
          const admonition = parseAdmonition(children);

          if (admonition) {
            const config = admonitionConfig[admonition.type];
            return (
              <div
                className={`my-6 p-4 border-l-4 rounded-r-xl ${config.borderColor} ${config.bgColor}`}
                role="note"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">{config.icon}</span>
                  <span
                    className={`text-sm font-bold uppercase tracking-wide ${config.iconColor}`}
                  >
                    {config.title}
                  </span>
                </div>
                <div className="text-sm text-[var(--text-body)] [&>p]:m-0 leading-relaxed">
                  {admonition.remainingText && <p>{admonition.remainingText}</p>}
                  {/* Render remaining children after the first */}
                  {children.slice(1)}
                </div>
              </div>
            );
          }

          return (
            <blockquote
              className="border-l-[#10B981] bg-[var(--section-alt-bg)] rounded-r-xl py-1 px-6"
              {...props}
            >
              {children}
            </blockquote>
          );
        },

        // ─── Tables ───
        table: ({ children, ...props }) => (
          <div className="overflow-x-auto my-8 border border-[var(--card-border)]/50 rounded-2xl shadow-lg bg-[var(--section-alt-bg)]/30 backdrop-blur-sm">
            <table
              className="min-w-full divide-y divide-[var(--card-border)] text-sm text-left"
              {...props}
            >
              {children}
            </table>
          </div>
        ),
        thead: ({ children, ...props }) => (
          <thead
            className="bg-[#10B981]/10 text-[var(--text-heading)] font-bold text-base"
            {...props}
          >
            {children}
          </thead>
        ),
        th: ({ children, ...props }) => (
          <th
            className="px-6 py-5 text-left font-semibold text-[var(--text-heading)] whitespace-nowrap"
            {...props}
          >
            {children}
          </th>
        ),
        td: ({ children, ...props }) => (
          <td
            className="px-6 py-4 text-[var(--text-body)] border-t border-[var(--card-border)]/50"
            {...props}
          >
            {children}
          </td>
        ),

        // ─── Task list checkboxes ───
        input: ({ type, checked, ...props }) => {
          if (type === "checkbox") {
            return (
              <input
                type="checkbox"
                checked={checked}
                disabled
                className="w-4 h-4 text-emerald-600 bg-slate-100 border-slate-300 rounded-sm focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600 mr-2 accent-emerald-600 inline-block align-middle"
                {...props}
              />
            );
          }
          return <input type={type} checked={checked} {...props} />;
        },

        // ─── Horizontal Rule ───
        hr: () => (
          <hr className="my-10 border-none h-px bg-gradient-to-r from-transparent via-[var(--card-border)] to-transparent" />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
