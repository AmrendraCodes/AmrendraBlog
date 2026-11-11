import { SEO_CHECK_CONFIG } from './config.js';

/**
 * Tokenizes plain text into cleaned words
 * @param {string} text
 * @returns {string[]}
 */
export function extractWords(text = '') {
  if (!text) return [];
  // Strip HTML tags if any remain
  const clean = text.replace(/<[^>]+>/g, ' ');
  return clean
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 0);
}

/**
 * Counts occurrences of a target keyword in an array of words or raw text
 * @param {string} text
 * @param {string} keyword
 * @returns {number}
 */
export function countKeywordOccurrences(text = '', keyword = '') {
  if (!text || !keyword) return 0;
  const cleanText = text.toLowerCase();
  const cleanKw = keyword.toLowerCase().trim();
  if (!cleanKw) return 0;

  // Use boundary-aware regex where feasible
  const escapedKw = cleanKw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`\\b${escapedKw}\\b`, 'gi');
  const matches = cleanText.match(regex);
  return matches ? matches.length : 0;
}

/**
 * Checks Keyword Placement, Density, and Stuffing
 * @param {Object} input
 * @param {string} [input.content]
 * @param {string} [input.keyword]
 * @returns {Object} CheckResult
 */
export function checkKeywords({ content = '', keyword = '' } = {}) {
  const weight = SEO_CHECK_CONFIG.weights.keyword;
  const cleanKeyword = (keyword || '').trim().toLowerCase();
  const words = extractWords(content);
  const totalWords = words.length;

  // Edge case: No target keyword provided
  if (!cleanKeyword) {
    return {
      id: 'keyword-usage',
      label: 'Keyword Optimization',
      score: 75,
      status: 'warn',
      message: 'No target keyword specified. Enter a keyword to check placement and density.',
      fixSuggestion: 'Specify a target focus keyword to measure keyword density and early placement.',
      weight,
      details: {
        keyword: '',
        occurrences: 0,
        density: 0,
        inFirst100Words: false,
        totalWords,
        issues: ['No target keyword provided'],
        suggestions: ['Enter a target focus keyword to evaluate search optimization.'],
      },
    };
  }

  // Edge case: Content is empty
  if (totalWords === 0) {
    return {
      id: 'keyword-usage',
      label: 'Keyword Optimization',
      score: 0,
      status: 'fail',
      message: 'Content is empty. Add text to evaluate keyword usage.',
      fixSuggestion: 'Add your article or page body text to analyze keyword density.',
      weight,
      details: {
        keyword: cleanKeyword,
        occurrences: 0,
        density: 0,
        inFirst100Words: false,
        totalWords: 0,
        issues: ['Content is empty'],
        suggestions: ['Paste or write content to check keyword placement.'],
      },
    };
  }

  const occurrences = countKeywordOccurrences(content, cleanKeyword);
  const density = totalWords > 0 ? Number(((occurrences / totalWords) * 100).toFixed(2)) : 0;

  // Keyword in first 100 words
  const first100WordsText = words.slice(0, 100).join(' ');
  const inFirst100Words = countKeywordOccurrences(first100WordsText, cleanKeyword) > 0;

  const issues = [];
  const suggestions = [];
  let score = 100;

  // 1. Placement in first 100 words
  if (!inFirst100Words) {
    score -= 25;
    issues.push(`Target keyword "${cleanKeyword}" not found in the first 100 words`);
    suggestions.push(`Mention your focus keyword "${cleanKeyword}" in the opening paragraph (first 100 words).`);
  }

  // 2. Density evaluation
  const { min, max, stuffingThreshold } = SEO_CHECK_CONFIG.thresholds.keywordDensity;

  if (occurrences === 0) {
    score = Math.min(score, 20);
    issues.push(`Keyword "${cleanKeyword}" does not appear anywhere in the body text`);
    suggestions.push(`Include your target keyword "${cleanKeyword}" naturally throughout the content.`);
  } else if (density < min) {
    score -= 20;
    issues.push(`Low keyword density (${density}% — recommended is ${min}%–${max}%)`);
    suggestions.push(`Increase occurrences of "${cleanKeyword}" to reach at least ${min}% density.`);
  } else if (density > stuffingThreshold) {
    score -= 35;
    issues.push(`Keyword stuffing detected (${density}% exceeds ${stuffingThreshold}%)`);
    suggestions.push(`Reduce frequency of "${cleanKeyword}" below ${max}% to prevent search penalties.`);
  } else if (density > max) {
    score -= 15;
    issues.push(`Keyword density slightly high (${density}% — ideal is ${min}%–${max}%)`);
    suggestions.push(`Trim a few mentions of "${cleanKeyword}" to maintain natural reading flow.`);
  }

  const finalScore = Math.max(0, Math.min(100, score));

  let status = 'pass';
  if (finalScore < 60) {
    status = 'fail';
  } else if (finalScore < 85) {
    status = 'warn';
  }

  let message = `Keyword density is optimal (${density}%) with proper placement.`;
  if (issues.length > 0) {
    message = issues.join('; ') + '.';
  }

  const fixSuggestion = suggestions.length > 0 
    ? suggestions[0] 
    : 'Maintain current natural keyword distribution.';

  return {
    id: 'keyword-usage',
    label: 'Keyword Optimization',
    score: finalScore,
    status,
    message,
    fixSuggestion,
    weight,
    details: {
      keyword: cleanKeyword,
      occurrences,
      density,
      inFirst100Words,
      totalWords,
      issues,
      suggestions,
    },
  };
}
