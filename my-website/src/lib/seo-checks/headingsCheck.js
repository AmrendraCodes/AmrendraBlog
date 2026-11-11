import { SEO_CHECK_CONFIG } from './config.js';

/**
 * Extracts headings from HTML or Markdown
 * @param {string} text
 * @returns {Array<{ level: number, text: string }>}
 */
function extractHeadingsFromText(text = '') {
  const headings = [];
  if (!text) return headings;

  // 1. Try HTML tags <h1..6>
  const htmlRegex = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let match;
  while ((match = htmlRegex.exec(text)) !== null) {
    const level = parseInt(match[1], 10);
    const headingText = match[2].replace(/<[^>]+>/g, '').trim();
    if (headingText) {
      headings.push({ level, text: headingText });
    }
  }

  if (headings.length > 0) return headings;

  // 2. Try Markdown headings (#, ##, ###)
  const lines = text.split('\n');
  for (const line of lines) {
    const mdMatch = line.trim().match(/^(#{1,6})\s+(.+)$/);
    if (mdMatch) {
      headings.push({
        level: mdMatch[1].length,
        text: mdMatch[2].replace(/[*_`]/g, '').trim(),
      });
    }
  }

  return headings;
}

/**
 * Checks Heading Hierarchy and H1 optimization
 * @param {Object} input
 * @param {string} [input.h1Input] Optional dedicated H1 / headline input
 * @param {Array<{ level: number, text: string }>} [input.headings]
 * @param {string} [input.content]
 * @param {string} [input.keyword]
 * @returns {Object} CheckResult
 */
export function checkHeadings({ h1Input = '', headings = null, content = '', keyword = '' } = {}) {
  const weight = SEO_CHECK_CONFIG.weights.headings;
  const cleanKeyword = (keyword || '').trim().toLowerCase();
  const cleanH1 = (h1Input || '').trim();

  let list = Array.isArray(headings) && headings.length > 0
    ? [...headings]
    : extractHeadingsFromText(content);

  // If dedicated H1 input provided, prepend or set as primary H1 if not already present
  if (cleanH1) {
    const hasMatchingH1 = list.some((h) => h.level === 1 && h.text.toLowerCase() === cleanH1.toLowerCase());
    if (!hasMatchingH1) {
      list = [{ level: 1, text: cleanH1 }, ...list.filter((h) => h.level !== 1)];
    }
  }

  // Rule 2: If no heading info exists at all in plain text, mark "Not enough info" and exclude from score
  if (list.length === 0) {
    return {
      id: 'headings',
      label: 'Headings & Structure',
      score: null,
      status: 'info',
      isExcluded: true,
      message: 'Not enough info (no headings detected in plain text).',
      fixSuggestion: 'Add an H1 headline or format sections using Markdown (#) or HTML tags.',
      weight: 0,
      details: {
        notEnoughInfo: true,
        totalHeadings: 0,
        h1Count: 0,
        issues: ['No headings detected in plain text'],
        suggestions: ['Specify an H1 headline or format sections with Markdown (#) or HTML headings.'],
      },
    };
  }

  const issues = [];
  const suggestions = [];

  const h1s = list.filter((h) => h.level === 1);
  const h2s = list.filter((h) => h.level === 2);
  const h3s = list.filter((h) => h.level === 3);

  let score = 100;

  // 1. Evaluate H1 count (must be exactly 1)
  if (h1s.length === 0) {
    score -= 40;
    issues.push('Missing H1 heading');
    suggestions.push('Add an <h1> headline specifying the primary topic of your page.');
  } else if (h1s.length > 1) {
    score -= 25;
    issues.push(`Multiple H1 headings detected (${h1s.length})`);
    suggestions.push('Keep only one primary <h1> heading and convert secondary headers to <h2>.');
  }

  // 2. Keyword in H1
  if (cleanKeyword && h1s.length > 0) {
    const h1HasKeyword = h1s.some((h) => h.text.toLowerCase().includes(cleanKeyword));
    if (!h1HasKeyword) {
      score -= 20;
      issues.push(`Target keyword "${cleanKeyword}" missing from primary H1 heading`);
      suggestions.push(`Include your target keyword "${cleanKeyword}" inside your primary <h1>.`);
    }
  }

  // 3. Logical Heading Order
  let orderIssues = 0;
  let prevLevel = 0;
  for (const h of list) {
    if (prevLevel > 0 && h.level > prevLevel + 1) {
      orderIssues++;
    }
    prevLevel = h.level;
  }

  if (orderIssues > 0) {
    score -= 15;
    issues.push(`Heading hierarchy skips levels (${orderIssues} skipped levels)`);
    suggestions.push('Follow a logical structure without skipping levels (e.g. avoid jumping from H2 directly to H4).');
  }

  // 4. Subheading depth check
  if (list.length === 1 && h1s.length === 1 && content.length > 800) {
    score -= 10;
    issues.push('No supporting subheadings (H2/H3) found in long article');
    suggestions.push('Break up content into readable sections using <h2> and <h3> subheadings.');
  }

  const finalScore = Math.max(0, Math.min(100, score));

  let status = 'pass';
  if (finalScore < 60) {
    status = 'fail';
  } else if (finalScore < 85) {
    status = 'warn';
  }

  let message = 'Heading structure and hierarchy are well organized.';
  if (issues.length > 0) {
    message = issues.join('; ') + '.';
  }

  const fixSuggestion = suggestions.length > 0
    ? suggestions[0]
    : 'Heading hierarchy is semantic and correctly structured.';

  return {
    id: 'headings',
    label: 'Headings & Structure',
    score: finalScore,
    status,
    isExcluded: false,
    message,
    fixSuggestion,
    weight,
    details: {
      totalHeadings: list.length,
      h1Count: h1s.length,
      h2Count: h2s.length,
      h3Count: h3s.length,
      h1Texts: h1s.map((h) => h.text),
      orderIssues,
      issues,
      suggestions,
    },
  };
}
