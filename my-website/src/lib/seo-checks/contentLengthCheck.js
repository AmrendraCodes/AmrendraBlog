import { SEO_CHECK_CONFIG } from './config.js';
import { extractWords } from './keywordCheck.js';

/**
 * Checks Content Length and Thin Content Warnings
 * @param {Object} input
 * @param {string} [input.content]
 * @returns {Object} CheckResult
 */
export function checkContentLength({ content = '' } = {}) {
  const weight = SEO_CHECK_CONFIG.weights.contentLength;
  const words = extractWords(content);
  const wordCount = words.length;

  const { thinThreshold, goodThreshold } = SEO_CHECK_CONFIG.thresholds.contentLength;

  let score = 0;
  let status = 'pass';
  const issues = [];
  const suggestions = [];

  if (wordCount === 0) {
    score = 0;
    status = 'fail';
    issues.push('No content found');
    suggestions.push('Add body content of at least 800 words for competitive search ranking.');
  } else if (wordCount < thinThreshold) {
    // Thin content scale: 0 to 40 points
    score = Math.round((wordCount / thinThreshold) * 40);
    status = 'fail';
    issues.push(`Thin content warning (${wordCount} words — under ${thinThreshold} words)`);
    suggestions.push(`Expand this article past ${thinThreshold} words (ideally ${goodThreshold}+ words) to avoid Google thin-content penalties.`);
  } else if (wordCount < goodThreshold) {
    // In-between scale: 40 to 100 points
    const range = goodThreshold - thinThreshold;
    const progress = (wordCount - thinThreshold) / range;
    score = Math.round(40 + progress * 60);
    status = 'warn';
    issues.push(`Moderate length (${wordCount} words — recommended ${goodThreshold}+ words)`);
    suggestions.push(`Add ${goodThreshold - wordCount} more words with detailed examples, FAQs, or steps to reach in-depth authority.`);
  } else {
    // 800+ words
    score = 100;
    status = 'pass';
  }

  let message = `Strong content length (${wordCount} words) suitable for search competition.`;
  if (issues.length > 0) {
    message = issues.join('; ') + '.';
  }

  const fixSuggestion = suggestions.length > 0
    ? suggestions[0]
    : 'Content length meets or exceeds competitive depth thresholds.';

  return {
    id: 'content-length',
    label: 'Content Length & Depth',
    score,
    status,
    message,
    fixSuggestion,
    weight,
    details: {
      wordCount,
      characterCount: content.length,
      thinThreshold,
      goodThreshold,
      issues,
      suggestions,
    },
  };
}

