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
import { Children, isValidElement, useEffect } from "react";
import Zoom from "react-medium-image-zoom";

// Dynamically import MermaidBlock to keep initial bundle lean
const MermaidBlock = dynamic(() => import("./blog/MermaidBlock"), {
  ssr: false,
  loading: () => (
    <div className="my-6 p-8 bg-[var(--section-alt-bg)] border border-[var(--card-border)] rounded-xl flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-[#F59E0B] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

/**
 * Creates a heading component with anchor link on hover.
 */
function createHeadingComponent(level) {
  const Tag = `h${level}`;

  const HeadingComponent = ({ children, id, ...props }) => {
    if (!hasRenderableContent(children)) return null;

    let sizeClasses = "";
    if (level === 2) {
      sizeClasses = "text-xl sm:text-2xl font-extrabold text-[var(--text-heading)] pt-2 border-b border-[var(--card-border)]/40 pb-2 leading-snug block w-full text-left";
    } else if (level === 3) {
      sizeClasses = "text-lg sm:text-xl font-bold text-[var(--text-heading)] leading-snug block text-left";
    } else if (level === 4) {
      sizeClasses = "text-base sm:text-lg font-bold text-[var(--text-heading)] leading-normal block text-left";
    }

    return (
      <Tag id={id} className={`group relative scroll-mt-24 ${sizeClasses}`} {...props}>
        {id && (
          <a
            href={`#${id}`}
            className="anchor-link absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[var(--text-muted)] hover:text-[#F59E0B] no-underline"
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
    borderColor: "border-[#0B1F3A] dark:border-[#F59E0B]",
    bgColor: "bg-[#0B1F3A]/5 dark:bg-[#F59E0B]/10",
    iconColor: "text-[#0B1F3A] dark:text-[#F59E0B]",
    icon: "ℹ️",
    title: "Note",
  },
  TIP: {
    borderColor: "border-[#F59E0B]",
    bgColor: "bg-[#F59E0B]/10",
    iconColor: "text-[#F59E0B]",
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
    borderColor: "border-[#0B1F3A] dark:border-[#F59E0B]",
    bgColor: "bg-[#0B1F3A]/5 dark:bg-[#F59E0B]/10",
    iconColor: "text-[#0B1F3A] dark:text-[#F59E0B]",
    icon: "📌",
    title: "Important",
  },
};

/**
 * Pre-processes markdown:
 * - Cleans up empty HTML tags and empty blocks before rendering.
 * - Prevents accidental CommonMark setext headings.
 * - Ensures horizontal rules have clean blank lines.
 */
function normalizeMarkdown(raw) {
  if (!raw || typeof raw !== "string") return "";

  // Protect code blocks from regex modifications
  const codeBlocks = [];
  let processed = raw.replace(/```[\s\S]*?```/g, (match) => {
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
    codeBlocks.push(match);
    return placeholder;
  });

  // Strip empty HTML elements (<p></p>, <p><br></p>, <p><br/></p>, <div></div>, etc.)
  processed = processed.replace(/<p\b[^>]*>\s*(?:<br\s*\/?>|&nbsp;|\s*)*<\/p>/gi, "");
  processed = processed.replace(/<div\b[^>]*>\s*<\/div>/gi, "");
  processed = processed.replace(/<span\b[^>]*>\s*<\/span>/gi, "");

  // Remove any trailing standalone dashes/hyphens/equals at the very end of content
  processed = processed.replace(/\n+[ \t]*[-=_*]{1,3}[ \t]*$/, '\n');

  // Ensure horizontal rules / dividers (---, ===, ***, ___) have blank lines before and after them.
  // Also clean up 1-2 char underlines directly below paragraphs that turn regular text into Setext H1/H2 headings.
  processed = processed.replace(
    /([^\n\r])[ \t]*\r?\n[ \t]*((?:-[ \t]*){1,}|(?:=[ \t]*){1,}|(?:\*[ \t]*){3,}|(?:_[ \t]*){3,})[ \t]*(\r?\n|$)/g,
    (match, textBefore, divider) => {
      const trimmedDivider = divider.replace(/\s+/g, '');
      if (/^(?:-{3,}|={3,}|\*{3,}|_{3,})$/.test(trimmedDivider)) {
        return `${textBefore}\n\n${divider}\n\n`;
      }
      // Single or double dash/equal attached directly under text -> remove to prevent accidental Setext heading
      return `${textBefore}\n\n`;
    }
  );

  // Restore code blocks
  processed = processed.replace(/__CODE_BLOCK_(\d+)__/g, (_, idx) => codeBlocks[parseInt(idx, 10)]);

  return processed;
}

function hasRenderableContent(children) {
  if (children === null || children === undefined) return false;
  return Children.toArray(children).some((child) => {
    if (child === null || child === undefined) return false;
    if (typeof child === "string") return child.trim().length > 0 && child.trim() !== "&nbsp;";
    if (typeof child === "number") return true;
    if (!isValidElement(child)) return Boolean(child);
    if (child.type === "br") return false;
    if (typeof child.type === "string" && ["img", "video", "iframe", "input"].includes(child.type)) return true;
    return hasRenderableContent(child.props?.children);
  });
}

export default function MarkdownRenderer({ content }) {
  useEffect(() => {
    import("react-medium-image-zoom/dist/styles.css");
  }, []);

  const normalizedContent = normalizeMarkdown(content);

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

        // ─── Paragraphs with comfortable readability spacing ───
        p: ({ children, ...props }) => {
          if (!hasRenderableContent(children)) return null;

          return (
            <p
              className="text-[var(--text-body)] text-[16px] sm:text-[17px] leading-[1.75] text-left"
              {...props}
            >
              {children}
            </p>
          );
        },

        // ─── Lists & List Items (normalized without conflicting space-y) ───
        ul: ({ children, ...props }) => hasRenderableContent(children) ? (
          <ul
            className="list-disc pl-6 text-[var(--text-body)] text-[15px] sm:text-[16px] leading-[1.7] text-left"
            {...props}
          >
            {children}
          </ul>
        ) : null,
        ol: ({ children, ...props }) => hasRenderableContent(children) ? (
          <ol
            className="list-decimal pl-6 text-[var(--text-body)] text-[15px] sm:text-[16px] leading-[1.7] text-left"
            {...props}
          >
            {children}
          </ol>
        ) : null,
        li: ({ children, ...props }) => hasRenderableContent(children) ? (
          <li
            className="leading-[1.7] text-[var(--text-body)] marker:text-[#F59E0B] text-left"
            {...props}
          >
            {children}
          </li>
        ) : null,

        // ─── Strong / Bold ───
        strong: ({ children, ...props }) => (
          <strong className="font-bold text-[var(--text-heading)]" {...props}>
            {children}
          </strong>
        ),

        // ─── Links: Next.js Link for internal, standard a for external ───
        a: ({ href, children, className, ...props }) => {
          const isInternal =
            href &&
            (href.startsWith("/") ||
              href.startsWith("#") ||
              href.includes("codewithamrendra.in"));

          let targetHref = href;
          if (href && href.includes("codewithamrendra.in")) {
            try {
              const urlObj = new URL(href);
              targetHref = urlObj.pathname + urlObj.search + urlObj.hash;
            } catch {
              targetHref = href;
            }
          }

          const linkClasses =
            "text-[#0B1F3A] dark:text-[#F59E0B] font-semibold underline decoration-[#F59E0B]/50 hover:decoration-[#F59E0B] hover:text-[#F59E0B] dark:hover:text-[#FBBF24] transition-all cursor-pointer";

          if (isInternal) {
            return (
              <Link
                href={targetHref || "/"}
                className={`${linkClasses} ${className || ""}`}
                {...props}
              >
                {children}
              </Link>
            );
          }
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClasses} ${className || ""}`}
              {...props}
            >
              {children}
            </a>
          );
        },

        // ─── Images with Next.js Image optimization and Zoom (Full width within container) ───
        img: ({ src, alt, ...props }) => {
          // For external images, use standard img with lazy loading
          if (src && (src.startsWith("http://") || src.startsWith("https://"))) {
            return (
              <figure className="article-image block w-full my-6 flex flex-col items-center">
                <Zoom>
                  <img
                    src={src}
                    alt={alt || ""}
                    loading="lazy"
                    className="rounded-2xl shadow-xl max-w-full w-full h-auto mx-auto object-contain"
                    {...props}
                  />
                </Zoom>
                {alt && (
                  <figcaption className="block text-center text-sm text-[var(--text-muted)] mt-3 italic">
                    {alt}
                  </figcaption>
                )}
              </figure>
            );
          }
          // For local images, use Next.js Image
          return (
            <figure className="article-image block w-full my-6 flex flex-col items-center">
              <Zoom>
                <Image
                  src={src || ""}
                  alt={alt || ""}
                  width={800}
                  height={450}
                  className="rounded-2xl shadow-xl max-w-full w-full h-auto mx-auto object-contain"
                  sizes="(max-width: 768px) 100vw, 760px"
                />
              </Zoom>
              {alt && (
                <figcaption className="block text-center text-sm text-[var(--text-muted)] mt-3 italic">
                  {alt}
                </figcaption>
              )}
            </figure>
          );
        },

        // ─── Inline Code and Code Blocks ───
        code: ({ inline, className, children, ...props }) => {
          const isInline = inline || (!className && !String(children).includes("\n"));
          if (isInline) {
            return (
              <code
                className="text-[#D97706] dark:text-[#FBBF24] bg-[#F59E0B]/10 dark:bg-[#F59E0B]/15 border border-[#F59E0B]/25 dark:border-[#F59E0B]/35 px-1.5 py-0.5 rounded-md font-mono text-[0.875em] font-semibold tracking-tight inline-block align-baseline"
                {...props}
              >
                {children}
              </code>
            );
          }
          return (
            <code className={className} {...props}>
              {children}
            </code>
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
            <div className="code-block-wrapper group relative my-6 w-full">
              {/* Language Label */}
              {language && (
                <div className="code-lang-label">
                  {language}
                </div>
              )}
              {/* Copy Button */}
              <CopyButton text={codeText} />
              <pre
                className="!mt-0 !rounded-xl !border !border-[var(--card-border)] overflow-x-auto"
                {...props}
              >
                {children}
              </pre>
            </div>
          );
        },

        // ─── Blockquotes with admonition support ───
        blockquote: ({ children, ...props }) => {
          if (!hasRenderableContent(children)) return null;

          const admonition = parseAdmonition(children);

          if (admonition) {
            const config = admonitionConfig[admonition.type];
            return (
              <div
                className={`my-5 p-4 border-l-4 rounded-xl ${config.borderColor} ${config.bgColor}`}
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
                <div className="text-sm text-[var(--text-body)] [&>p]:m-0 leading-relaxed text-left">
                  {admonition.remainingText && <p>{admonition.remainingText}</p>}
                  {/* Render remaining children after the first */}
                  {children.slice(1)}
                </div>
              </div>
            );
          }

          return (
            <blockquote
              className="my-4 border-l-4 border-[#F59E0B] bg-[var(--section-alt-bg)]/80 rounded-r-xl py-2.5 px-4 text-[15px] sm:text-[16px] text-[var(--text-body)] leading-relaxed italic text-left"
              {...props}
            >
              {children}
            </blockquote>
          );
        },

        // ─── Tables ───
        table: ({ children, ...props }) => hasRenderableContent(children) ? (
          <div className="table-wrapper overflow-x-auto my-6 border border-[var(--card-border)] rounded-xl shadow-xs bg-[var(--card-bg)]/60 backdrop-blur-sm w-full">
            <table
              className="min-w-full divide-y divide-[var(--card-border)] text-sm text-left"
              {...props}
            >
              {children}
            </table>
          </div>
        ) : null,
        thead: ({ children, ...props }) => (
          <thead
            className="bg-[var(--section-alt-bg)] text-[var(--text-heading)] font-bold text-xs uppercase tracking-wider"
            {...props}
          >
            {children}
          </thead>
        ),
        th: ({ children, ...props }) => (
          <th
            className="px-4 py-2.5 text-left font-bold text-[var(--text-heading)] whitespace-nowrap border-b border-[var(--card-border)]"
            {...props}
          >
            {children}
          </th>
        ),
        td: ({ children, ...props }) => (
          <td
            className="px-4 py-2.5 text-sm text-[var(--text-body)] border-b border-[var(--card-border)]/40 text-left"
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
                className="w-4 h-4 text-[#F59E0B] bg-slate-100 border-slate-300 rounded-sm focus:ring-[#F59E0B] dark:focus:ring-[#F59E0B] dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600 mr-2 accent-[#F59E0B] inline-block align-middle"
                {...props}
              />
            );
          }
          return <input type={type} checked={checked} {...props} />;
        },

        // ─── Horizontal Rule (Clean, crisp, clearly visible divider with tight margins) ───
        hr: () => (
          <div className="my-5 sm:my-6 flex items-center gap-3 w-full">
            <div className="h-[1.5px] flex-1 bg-[var(--card-border)] opacity-80" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            <div className="h-[1.5px] flex-1 bg-[var(--card-border)] opacity-80" />
          </div>
        ),
      }}
    >
      {normalizedContent}
    </ReactMarkdown>
  );
}
