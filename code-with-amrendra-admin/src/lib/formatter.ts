/**
 * Content Formatter & Smart Interlinking Engine for Blog Articles
 * 
 * Capabilities:
 * 1. Heading Structure Fix (Single H1, converts bold pseudo-headers/steps to H2, sub-points to H3)
 * 2. Code Snippet & Tag Detection (Wraps HTML tags, CSS properties, JS APIs, ARIA attributes in backticks)
 * 3. Smart Internal Interlinking (Matches keywords against published articles & key routes, 1st occurrence only, natural density)
 * 4. Accessibility & Semantic Formatting (Alerts, ARIA attributes, callouts)
 * 5. Returns formatted markdown and comprehensive metadata statistics.
 */

export interface InterlinkTarget {
  keywords: string[];
  url: string;
  title: string;
}

export interface FormatOptions {
  currentSlug?: string;
  articleTitle?: string;
  customRules?: InterlinkTarget[];
  maxLinks?: number;
  minLinks?: number;
}

export interface FormatResult {
  formattedContent: string;
  stats: {
    h1Count: number;
    h2Count: number;
    h3Count: number;
    codeElementsWrapped: number;
    internalLinksAdded: number;
    linksList: Array<{ keyword: string; url: string; title: string }>;
    unmatchedKeywords?: string[];
  };
}

export const BASE_INTERLINK_TARGETS: InterlinkTarget[] = [
  {
    keywords: ['Tailwind CSS', 'Mastering Tailwind CSS', 'Tailwind', 'utility-first styling', 'utility-first CSS'],
    url: '/resources/blog/mastering-tailwind-css',
    title: 'Mastering Tailwind CSS',
  },
  {
    keywords: ['How to Learn React', 'Learn React', 'React tutorial', 'React Foundations', 'React fundamentals'],
    url: '/resources/blog/how-to-learn-react',
    title: 'How to Learn React',
  },
  {
    keywords: ['React Component Systems', 'Component Systems', 'Reusable React Components', 'Reusable Components'],
    url: '/resources/blog/react-component-systems',
    title: 'Building Reusable React Component Systems',
  },
  {
    keywords: ['Building Scalable Next.js Applications', 'Scalable Next.js', 'Next.js Architecture', 'Next.js applications', 'Next.js App Router', 'Next.js'],
    url: '/resources/blog/scalable-nextjs',
    title: 'Building Scalable Next.js Applications',
  },
  {
    keywords: ['The Ultimate Guide to SEO in the AI Era', 'SEO in the AI Era', 'SEO and AI', 'AI Search Optimization', 'Search Engine Optimization'],
    url: '/resources/blog/seo-ai-era',
    title: 'The Ultimate Guide to SEO in the AI Era',
  },
  {
    keywords: ['Why Minimalist UI is Back', 'Minimalist UI', 'Minimalist Design System', 'Minimalist User Interface'],
    url: '/resources/blog/minimalist-ui',
    title: 'Why Minimalist UI is Back',
  },
  {
    keywords: ['Designing for the Next Billion Users', 'Next Billion Users', 'Minimalist Approach'],
    url: '/resources/blog/minimalist-design',
    title: 'Designing for the Next Billion Users',
  },
  {
    keywords: ['Typography Rules Every Designer Should Know', 'Typography Rules', 'Typography in Design', 'Web Typography'],
    url: '/resources/blog/typography-rules',
    title: 'Typography Rules Every Designer Should Know',
  },
  {
    keywords: ['Automating CI/CD Pipelines with GitHub Actions & Docker', 'GitHub Actions & Docker', 'GitHub Actions', 'CI/CD Pipelines', 'CI/CD pipeline'],
    url: '/resources/blog/github-actions-docker',
    title: 'Automating CI/CD Pipelines with GitHub Actions & Docker',
  },
  {
    keywords: ['Creating Autonomous AI Agents with Modern LLM Workflows', 'Autonomous AI Agents', 'AI Agents', 'LLM Workflows', 'Autonomous Agents'],
    url: '/resources/blog/autonomous-ai-agents',
    title: 'Creating Autonomous AI Agents',
  },
  {
    keywords: ['AWS Infrastructure Best Practices for Startups', 'AWS Infrastructure', 'AWS Best Practices', 'Cloud Infrastructure'],
    url: '/resources/blog/aws-infrastructure-startups',
    title: 'AWS Infrastructure Best Practices for Startups',
  },
  {
    keywords: ['Designing Multi-Tenant SaaS Platforms for Scale', 'Multi-Tenant SaaS', 'SaaS Architecture', 'Designing SaaS Platforms'],
    url: '/resources/blog/saas-architecture-scale',
    title: 'Designing Multi-Tenant SaaS Platforms for Scale',
  },
  {
    keywords: ['The Anatomy of a High-Converting Landing Page', 'High-Converting Landing Page', 'Landing Page Optimization', 'Landing Page'],
    url: '/resources/blog/high-converting-landing-page',
    title: 'The Anatomy of a High-Converting Landing Page',
  },
  {
    keywords: ['The Future of Web Development', 'Future of Web Development', 'Web Development Trends in 2026'],
    url: '/resources/blog/future-of-web-dev',
    title: 'The Future of Web Development',
  },
  {
    keywords: ['The Future of User Interfaces', 'Glassmorphism and Beyond', 'Glassmorphism'],
    url: '/resources/blog/future-of-user-interfaces',
    title: 'The Future of User Interfaces',
  },
  {
    keywords: ['Light & Dark Theme Toggle', 'Light and Dark Theme Switch', 'Dark Mode Toggle', 'Theme Switching'],
    url: '/resources/blog/how-to-build-a-light-and-dark-theme-switch-using-javascript',
    title: 'How to Build a Light & Dark Theme Toggle Using JavaScript',
  },
  // Site Services & High-Value Pages
  {
    keywords: ['UI/UX and product design', 'UI/UX & Product Design', 'UI/UX design services', 'UI/UX and Product Design'],
    url: 'https://www.codewithamrendra.in/services/ui-ux-product-design',
    title: 'UI/UX & Product Design Services',
  },
  {
    keywords: ['web development services', 'Web Development Services', 'frontend architecture services'],
    url: 'https://www.codewithamrendra.in/services/web-development',
    title: 'Web Development Services',
  },
  {
    keywords: ['SEO and content strategy', 'SEO & Content Strategy', 'SEO content strategy'],
    url: 'https://www.codewithamrendra.in/services/seo-content-strategy',
    title: 'SEO & Content Strategy Services',
  },
  {
    keywords: ['Real-World Case Studies', 'Case Studies'],
    url: 'https://www.codewithamrendra.in/resources/case-studies',
    title: 'Case Studies',
  },
  {
    keywords: ['Code with Amrendra'],
    url: 'https://www.codewithamrendra.in/',
    title: 'Code with Amrendra Home',
  },
];

// Common HTML tags, CSS properties, JS APIs, and accessibility attributes to backtick
const CODE_TERMS = [
  // HTML Tags (without brackets or with brackets)
  '<button>', '<code>', '<pre>', '<div>', '<span>', '<p>', '<a>', '<img>', '<input>', '<form>',
  '<textarea>', '<select>', '<option>', '<header>', '<nav>', '<main>', '<section>', '<article>',
  '<footer>', '<aside>', '<ul>', '<ol>', '<li>', '<table>', '<thead>', '<tbody>', '<tr>', '<th>',
  '<td>', '<script>', '<style>', '<link>', '<head>', '<body>', '<html>', '<meta>', '<title>',
  // Attributes & DOM APIs
  'aria-label', 'aria-hidden', 'aria-expanded', 'aria-live', 'aria-describedby',
  'data-theme="dark"', 'data-theme="light"', 'data-theme', 'document.documentElement',
  'localStorage', 'sessionStorage', 'localStorage.getItem', 'localStorage.setItem',
  'addEventListener', 'removeEventListener', 'DOMContentLoaded',
  'prefers-color-scheme: dark', 'prefers-color-scheme: light', 'prefers-color-scheme',
  'window.matchMedia', 'matchMedia', 'setAttribute', 'getAttribute', 'removeAttribute',
  'querySelector', 'querySelectorAll', 'getElementById', 'classList', 'classList.add',
  'classList.remove', 'classList.toggle',
  // CSS functions / variables
  'light-dark()', 'color-scheme: light dark', 'color-scheme: dark', 'color-scheme: light',
  'color-scheme', ':root', '--bg-color', '--text-color', '--button-bg', '--button-text',
  'var(--bg-color)', 'var(--text-color)',
];

/**
 * Main Formatting Function
 */
export function formatArticleMarkdown(
  rawContent: string,
  options: FormatOptions = {}
): FormatResult {
  if (!rawContent || typeof rawContent !== 'string') {
    return {
      formattedContent: '',
      stats: {
        h1Count: 0,
        h2Count: 0,
        h3Count: 0,
        codeElementsWrapped: 0,
        internalLinksAdded: 0,
        linksList: [],
      },
    };
  }

  let content = rawContent.trim();

  let codeElementsWrapped = 0;
  let linksAdded = 0;
  const linksList: Array<{ keyword: string; url: string; title: string }> = [];

  // 1. Separate Code Blocks to protect them from processing
  const codeBlocks: string[] = [];
  content = content.replace(/```[\s\S]*?```/g, (match) => {
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
    codeBlocks.push(match);
    return placeholder;
  });

  // Also protect inline code temporarily
  const inlineCodes: string[] = [];
  content = content.replace(/`([^`\n]+)`/g, (match) => {
    const placeholder = `__INLINE_CODE_${inlineCodes.length}__`;
    inlineCodes.push(match);
    return placeholder;
  });

  // 2. Heading Structure Fixes
  const lines = content.split('\n');
  let hasEncounteredH1 = false;

  const formattedLines = lines.map((line) => {
    const trimmed = line.trim();

    // Check if line is already an H1
    if (/^#\s+/.test(trimmed)) {
      if (!hasEncounteredH1) {
        hasEncounteredH1 = true;
        return line; // Keep first H1
      }
      // Convert subsequent H1 to H2
      return line.replace(/^#\s+/, '## ');
    }

    // Convert bold pseudo headings like "**Step 1: ...**" or "**1. Section...**" to ## H2
    if (/^\*\*(Step\s+\d+[:.]?.*?)\*\*$/i.test(trimmed)) {
      return trimmed.replace(/^\*\*(.*?)\*\*$/, '## $1');
    }

    if (/^\*\*(The Modern Workflow.*?)\*\*$/i.test(trimmed) || /^\*\*(Conclusion.*?)\*\*$/i.test(trimmed) || /^\*\*(FAQs?.*?)\*\*$/i.test(trimmed)) {
      return trimmed.replace(/^\*\*(.*?)\*\*$/, '## $1');
    }

    // Convert numbered sub-points inside sections like "### 1. Can I implement..." if not already H3
    if (/^###\s+/.test(trimmed)) {
      return line;
    }

    // Convert pseudo sub-points "1. Can I implement..." in FAQ context to ### H3
    if (/^(\d+\.\s+[A-Z].*\?)$/.test(trimmed)) {
      return `### ${trimmed}`;
    }

    return line;
  });

  content = formattedLines.join('\n');

  // Restore inline codes before code detection so we don't double wrap
  content = content.replace(/__INLINE_CODE_(\d+)__/g, (_, idx) => inlineCodes[parseInt(idx, 10)]);

  // 3. Code Snippet & Tag Detection (Inline Code wrapping)
  // Wrap HTML tags: e.g. <button>, <script>, <html>, <div>, <head>, <body>, <span>, <img>, <a>
  const htmlTagPattern = /(?<!`)(<(?:button|script|style|link|head|body|html|div|span|p|a|img|input|form|textarea|select|option|header|nav|main|section|article|footer|aside|ul|ol|li|table|thead|tbody|tr|th|td|meta|title)(?:\s+[^>\n]*)?>)(?!`)/gi;

  content = content.replace(htmlTagPattern, (match) => {
    // Make sure we're not inside backticks
    codeElementsWrapped++;
    return `\`${match}\``;
  });

  // Wrap specific known code terms and attributes
  for (const term of CODE_TERMS) {
    if (term.startsWith('<') && term.endsWith('>')) continue; // already handled by tag regex
    
    // Match term that is NOT already surrounded by backticks or markdown link brackets
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const termRegex = new RegExp(`(?<![\`\\[\\w-])${escapedTerm}(?![\`\\]\\w-])`, 'g');

    content = content.replace(termRegex, (m) => {
      codeElementsWrapped++;
      return `\`${m}\``;
    });
  }

  // Clean up any accidental double backticks (e.g. `` `<button>` `` -> `` `<button>` ``)
  content = content.replace(/``+([^`]+)``+/g, '`$1`');

  // 4. Accessibility & Alerts Normalization
  // Standardize notes/tips to GitHub-style alerts if needed
  content = content.replace(/^(?:Note|NOTE|Tip|TIP|Important|IMPORTANT|Warning|WARNING):\s*(.*)$/gm, (_, msg) => {
    return `> [!NOTE]\n> ${msg.trim()}`;
  });

  // 5. Internal Interlinking
  // Build interlink rules list (merge base + custom, filter out current post slug)
  const currentSlug = (options.currentSlug || '').toLowerCase().trim();
  const allRules: InterlinkTarget[] = [...(options.customRules || []), ...BASE_INTERLINK_TARGETS];

  // Map to prevent duplicate links to the same destination URL
  const usedUrls = new Set<string>();
  if (currentSlug) {
    usedUrls.add(`/resources/blog/${currentSlug}`);
    usedUrls.add(`https://www.codewithamrendra.in/resources/blog/${currentSlug}`);
  }

  // Find existing links in content to avoid duplicates
  const existingLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match: RegExpExecArray | null;
  while ((match = existingLinkRegex.exec(content)) !== null) {
    const url = match[2].trim().toLowerCase();
    usedUrls.add(url);
    if (!url.startsWith('http')) {
      usedUrls.add(`https://www.codewithamrendra.in${url}`);
    }
  }

  // Sort keywords by length descending so longer/more specific phrases match first
  const sortedRuleEntries: Array<{ keyword: string; url: string; title: string }> = [];
  for (const rule of allRules) {
    for (const kw of rule.keywords) {
      sortedRuleEntries.push({
        keyword: kw,
        url: rule.url,
        title: rule.title,
      });
    }
  }
  sortedRuleEntries.sort((a, b) => b.keyword.length - a.keyword.length);

  const maxAllowedLinks = options.maxLinks || 7;

  // Interlink in prose paragraphs only (skip headings and lines starting with #)
  const contentLines = content.split('\n');
  const processedLines: string[] = [];

  for (let line of contentLines) {
    const isHeading = /^#{1,6}\s+/.test(line.trim());
    const isCodePlaceholder = line.includes('__CODE_BLOCK_');

    if (!isHeading && !isCodePlaceholder && linksAdded < maxAllowedLinks) {
      for (const entry of sortedRuleEntries) {
        if (linksAdded >= maxAllowedLinks) break;

        const normalizedTargetUrl = entry.url.toLowerCase();
        if (usedUrls.has(normalizedTargetUrl)) {
          continue;
        }

        // Search for keyword in line:
        // Must NOT be inside backticks `...`, markdown links [...], or existing link target
        const kwEscaped = entry.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        // Negative lookahead/lookbehind for word boundaries & markdown characters
        const kwRegex = new RegExp(`(?<![\\[\`\\w-])${kwEscaped}(?![\\]\`\\w-])`, 'i');

        const foundMatch = kwRegex.exec(line);
        if (foundMatch) {
          // Verify match index is not inside backticks `...` in the line
          const matchIndex = foundMatch.index;
          const textBefore = line.substring(0, matchIndex);
          const backticksCount = (textBefore.match(/`/g) || []).length;
          const openBracketsCount = (textBefore.match(/\[/g) || []).length;
          const closeBracketsCount = (textBefore.match(/\]/g) || []).length;

          // If odd number of backticks or unclosed brackets, we are inside code or link text
          if (backticksCount % 2 === 0 && openBracketsCount === closeBracketsCount) {
            const matchedText = foundMatch[0];
            line = line.substring(0, matchIndex) +
                   `[${matchedText}](${entry.url})` +
                   line.substring(matchIndex + matchedText.length);

            usedUrls.add(normalizedTargetUrl);
            linksAdded++;
            linksList.push({
              keyword: matchedText,
              url: entry.url,
              title: entry.title,
            });
          }
        }
      }
    }
    processedLines.push(line);
  }

  content = processedLines.join('\n');

  // 6. Restore Code Blocks
  content = content.replace(/__CODE_BLOCK_(\d+)__/g, (_, idx) => codeBlocks[parseInt(idx, 10)]);

  // Count final headings
  const h1Matches = content.match(/^#\s+/gm);
  const h2Matches = content.match(/^##\s+/gm);
  const h3Matches = content.match(/^###\s+/gm);

  return {
    formattedContent: content,
    stats: {
      h1Count: h1Matches ? h1Matches.length : 0,
      h2Count: h2Matches ? h2Matches.length : 0,
      h3Count: h3Matches ? h3Matches.length : 0,
      codeElementsWrapped,
      internalLinksAdded: linksAdded,
      linksList,
    },
  };
}
