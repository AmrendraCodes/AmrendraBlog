/**
 * Converts a CMS date to an ISO-8601 value for structured data.
 * @param {string | Date | null | undefined} dateValue
 * @returns {string | undefined}
 */
function formatDate(dateValue) {
  if (!dateValue) return undefined;

  const parsedDate = new Date(dateValue);
  return Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate.toISOString();
}

/**
 * Returns Website JSON-LD Schema.
 * Useful on the Homepage.
 */
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Code with Amrendra",
    "url": "https://www.codewithamrendra.in",
  };
}

/**
 * Returns Person JSON-LD Schema for the author.
 * Useful on the Homepage.
 */
export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Amrendra Kumar",
    "url": "https://www.codewithamrendra.in",
    "image": "https://www.codewithamrendra.in/profile-photo.jpeg",
    "sameAs": [
      "https://github.com/AmrendraCodes",
      "https://x.com/codewithamrendr",
      "https://www.linkedin.com/in/amrendra1998/",
      "https://www.youtube.com/@codewithamrendra",
      "https://instagram.com/amrendracodes"
    ],
    "jobTitle": "Software Engineer & Technical Writer",
    "worksFor": {
      "@type": "Organization",
      "name": "Code With Amrendra"
    }
  };
}

/**
 * Returns LocalBusiness / SoftwareCompany JSON-LD Schema for Google Knowledge Panel indexing.
 */
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SoftwareCompany"],
    "@id": "https://www.codewithamrendra.in/#organization",
    "name": "Code With Amrendra",
    "alternateName": ["Code with Amrendra", "CWA Engineering"],
    "url": "https://www.codewithamrendra.in",
    "logo": "https://www.codewithamrendra.in/logo-square.png",
    "image": "https://www.codewithamrendra.in/logo-square.png",
    "telephone": "+91-6205482614",
    "priceRange": "$$",
    "description": "Software company specializing in Custom AI Development Services, Web Development, SaaS Architecture, and Cloud Solutions.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Moh- Guphaper, South of Devi Asthan, Kalyanpur",
      "addressLocality": "Bihar Sharif",
      "addressRegion": "Bihar",
      "postalCode": "803101",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.1982,
      "longitude": 85.5149
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://github.com/AmrendraCodes",
      "https://x.com/codewithamrendr",
      "https://www.linkedin.com/in/amrendra1998/",
      "https://www.youtube.com/@codewithamrendra",
      "https://instagram.com/amrendracodes"
    ]
  };
}

/**
 * Returns CollectionPage JSON-LD Schema.
 * Useful for category list pages and search result lists.
 * @param {Object} params
 * @param {string} params.name
 * @param {string} params.description
 * @param {string} params.url
 */
export function getCollectionPageSchema({ name, description, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": name,
    "description": description,
    "url": url
  };
}

/**
 * Returns BlogPost JSON-LD Schema.
 * @param {Object} params
 * @param {string} params.title
 * @param {string} params.description
 * @param {string} params.slug
 * @param {string} params.canonicalUrl
 * @param {string} params.image
 * @param {string | Date} params.datePublished
 * @param {string | Date} params.dateModified
 * @param {string} params.author
 * @param {string} params.category
 * @param {number} params.wordCount
 * @param {string[]} params.tags
 */
export function getBlogPostSchema({ title, description, slug, canonicalUrl, image, datePublished, dateModified, author, category, wordCount, tags }) {
  const formattedPublishedDate = formatDate(datePublished);
  const formattedModifiedDate = formatDate(dateModified) || formattedPublishedDate;
  const defaultCanonical = `https://www.codewithamrendra.in/resources/blog/${slug}`;
  const toSafeUrl = (value, fallback) => {
    if (typeof value !== 'string' || !value.trim()) return fallback;
    try {
      const url = new URL(value.trim(), 'https://www.codewithamrendra.in');
      return ['http:', 'https:'].includes(url.protocol) ? url.toString() : fallback;
    } catch {
      return fallback;
    }
  };
  const canonical = toSafeUrl(canonicalUrl, defaultCanonical);
  const schemaImage = toSafeUrl(image, 'https://www.codewithamrendra.in/images/og-default.png');

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": schemaImage,
    "datePublished": formattedPublishedDate,
    "dateModified": formattedModifiedDate,
    "wordCount": wordCount || undefined,
    "keywords": tags && tags.length > 0 ? tags.join(", ") : undefined,
    "author": {
      "@type": "Person",
      "name": author || "Amrendra Kumar",
      "url": "https://www.codewithamrendra.in"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Code with Amrendra",
      "logo": {
        "@type": "ImageObject",
          "url": "https://www.codewithamrendra.in/logo-square.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonical
    },
    "articleSection": category
  };
}

/**
 * Strips markdown syntax and normalizes text for clean Schema.org structured data and plain text display.
 * @param {string} text
 * @returns {string}
 */
export function cleanMarkdownText(text) {
  if (!text || typeof text !== 'string') return '';
  let cleaned = text;

  // Strip executable/hidden blocks before removing the remaining markup.
  cleaned = cleaned.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  cleaned = cleaned.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');

  // Remove GitHub-style alert callouts (e.g. > [!NOTE], > [!TIP], > [!IMPORTANT], > [!WARNING])
  cleaned = cleaned.replace(/>\s*\[![A-Z]+\]\s*/gim, '');
  // Remove blockquote markers
  cleaned = cleaned.replace(/(?:^|\n)\s*>\s*/gm, ' ');
  // Replace markdown links [text](url) with just text
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  // Remove inline code backticks `code` -> code
  cleaned = cleaned.replace(/`([^`]+)`/g, '$1');
  // Remove bold / italic markers (**text**, *text*, __text__, _text_)
  cleaned = cleaned.replace(/(\*\*|__)(.*?)\1/g, '$2');
  cleaned = cleaned.replace(/(\*|_)(.*?)\1/g, '$2');
  // Remove HTML tags
  cleaned = cleaned.replace(/<[^>]*>/g, '');
  // Normalize whitespace and trim
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  return cleaned;
}

/**
 * Returns FAQPage JSON-LD Schema for rich search snippets.
 * Strictly adheres to Schema.org requirements:
 * - Only includes valid FAQs where both Question and Answer are non-empty.
 * - Cleans markdown formatting and trims whitespace.
 * - Deduplicates questions.
 * - Returns null when no valid FAQs exist.
 *
 * @param {Array<{question?: string, answer?: string, name?: string, text?: string}>} faqList
 * @returns {object|null}
 */
export function getFAQSchema(faqList) {
  if (!Array.isArray(faqList) || faqList.length === 0) return null;

  const seenQuestions = new Set();
  const validEntities = [];

  for (const item of faqList) {
    if (!item || typeof item !== 'object') continue;

    const rawQuestion = typeof item.question === 'string'
      ? item.question
      : typeof item.name === 'string'
        ? item.name
        : typeof item.q === 'string'
          ? item.q
          : '';
    const rawAnswer = typeof item.answer === 'string'
      ? item.answer
      : typeof item.text === 'string'
        ? item.text
        : typeof item.a === 'string'
          ? item.a
          : item.acceptedAnswer && typeof item.acceptedAnswer.text === 'string'
            ? item.acceptedAnswer.text
            : '';

    const cleanQuestion = cleanMarkdownText(String(rawQuestion));
    const cleanAnswer = cleanMarkdownText(String(rawAnswer));

    if (!cleanQuestion || !cleanAnswer) continue;

    const normalizedKey = cleanQuestion.toLowerCase();
    if (seenQuestions.has(normalizedKey)) continue;
    seenQuestions.add(normalizedKey);

    validEntities.push({
      "@type": "Question",
      "name": cleanQuestion,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": cleanAnswer
      }
    });
  }

  if (validEntities.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": validEntities
  };
}

/**
 * Automatically extracts FAQs from markdown/text content if an FAQ section is present.
 * Looks for FAQ headings (## FAQ, ## FAQs, ## Frequently Asked Questions, ## Questions & Answers)
 * and parses Q&A blocks.
 *
 * @param {string} content
 * @returns {Array<{question: string, answer: string}>}
 */
export function extractFaqsFromContent(content) {
  if (!content || typeof content !== 'string') return [];
  const faqs = [];

  // Match dedicated FAQ section heading (e.g., ## FAQ, ## FAQs, ## **FAQ**, ## Frequently Asked Questions)
  const faqSectionRegex = /(?:^|\n)##\s*(?:\*\*)?(?:(?:\d+[\.\\)]\s*)?(?:FAQ(?:s)?|Frequently Asked Questions|Common Questions|Questions\s*(?:&|and)\s*Answers))(?:\*\*)?.*?\r?\n([\s\S]*?)(?=(?:\r?\n##\s+[^\n#]|$))/i;
  const match = content.match(faqSectionRegex);

  if (!match || !match[1]) {
    return [];
  }

  const faqText = match[1].trim();
  const lines = faqText.split(/\r?\n/);
  let currentQuestion = null;
  let currentAnswerLines = [];

  const isQuestionLine = (line) => {
    const trimmed = line.trim();
    // ### 1. Question? or ### Question? or #### Question
    if (/^#{3,4}\s+/.test(trimmed)) {
      return trimmed.replace(/^#{3,4}\s+/, '').trim();
    }
    // **1. Question?** or **Q: Question?** or **Question?**
    if (/^\*\*(?:(?:\d+[\.\\)]\s*)|(?:Q:\s*))?.+\?\*\*$/.test(trimmed)) {
      return trimmed.replace(/^\*\*|\*\*$/g, '').trim();
    }
    return null;
  };

  const flushFaq = () => {
    if (currentQuestion && currentAnswerLines.length > 0) {
      let rawQuestion = currentQuestion.replace(/^\d+[\.\\)]\s*/, '').replace(/^Q:\s*/i, '').trim();
      let rawAnswer = currentAnswerLines.join('\n').trim();

      // Clean markdown dividers if any
      rawAnswer = rawAnswer.replace(/^---\s*$/gm, '').trim();

      const question = cleanMarkdownText(rawQuestion);
      const answer = cleanMarkdownText(rawAnswer);

      if (question && answer) {
        faqs.push({ question, answer });
      }
    }
    currentQuestion = null;
    currentAnswerLines = [];
  };

  for (const line of lines) {
    const qText = isQuestionLine(line);
    if (qText) {
      flushFaq();
      currentQuestion = qText;
    } else if (currentQuestion) {
      currentAnswerLines.push(line);
    }
  }
  flushFaq();

  return faqs;
}

/**
 * Strips an FAQ section (heading + Q&A content) from markdown for rendering purposes.
 * Used when CMS FAQs are the source of truth and the same FAQs were previously
 * appended into the article body — prevents duplicate visual rendering.
 *
 * NOTE: This does NOT modify stored content. It only affects the rendered output.
 *
 * @param {string} content
 * @returns {string}
 */
export function stripFaqSectionFromContent(content) {
  if (!content || typeof content !== 'string') return content;
  return content.replace(
    /\n*##\s*(?:\*\*)?(?:(?:\d+[\.)\]]\s*)?(?:FAQ(?:s)?|Frequently Asked Questions|Common Questions|Questions\s*(?:&|and)\s*Answers))(?:\*\*)?[^\r\n]*\r?\n[\s\S]*?(?=\r?\n##\s+[^\n#]|$)/i,
    ''
  );
}

/**
 * Returns BreadcrumbList JSON-LD Schema.
 * @param {Array<{name: string, url: string}>} items
 */
export function getBreadcrumbSchema(items) {
  if (!Array.isArray(items)) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}
