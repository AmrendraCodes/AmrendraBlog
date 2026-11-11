import { SEO_CHECK_CONFIG } from './config.js';
import { extractWords } from './keywordCheck.js';

/**
 * Counts syllables in an English word
 * @param {string} word
 * @returns {number}
 */
export function countSyllables(word = '') {
  const clean = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!clean) return 0;
  if (clean.length <= 3) return 1;

  let formatted = clean
    .replace(/(?:[^laeiouy]|ed|es|e)$/, '')
    .replace(/^y/, '');

  const matches = formatted.match(/[aeiouy]{1,2}/g);
  return matches ? Math.max(1, matches.length) : 1;
}

/**
 * Splits text into sentences
 * @param {string} text
 * @returns {string[]}
 */
export function extractSentences(text = '') {
  if (!text) return [];
  const clean = text.replace(/<[^>]+>/g, ' ');
  return clean
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && /[a-zA-Z0-9]/.test(s));
}

/**
 * Extracts paragraphs from content
 * @param {string} text
 * @returns {string[]}
 */
export function extractParagraphs(text = '') {
  if (!text) return [];
  return text
    .split(/\n{2,}|<\/p>/gi)
    .map((p) => p.replace(/<[^>]+>/g, '').trim())
    .filter((p) => p.length > 0);
}

/**
 * Maps Flesch Reading Ease score to human-readable label and base score
 * @param {number} flesch
 * @returns {{ label: string, baseScore: number, status: 'pass' | 'warn' | 'fail' }}
 */
export function getFleschGrade(flesch) {
  if (flesch >= 90) return { label: 'Very easy (5th grade)', baseScore: 100, status: 'pass' };
  if (flesch >= 80) return { label: 'Easy (6th grade)', baseScore: 95, status: 'pass' };
  if (flesch >= 70) return { label: 'Fairly easy (7th grade)', baseScore: 90, status: 'pass' };
  if (flesch >= 60) return { label: 'Standard plain English (8th-9th grade)', baseScore: 85, status: 'pass' };
  if (flesch >= 50) return { label: 'Fairly difficult (10th-12th grade)', baseScore: 65, status: 'warn' };
  if (flesch >= 30) return { label: 'Difficult (College level)', baseScore: 45, status: 'fail' };
  return { label: 'Very confusing (Graduate level)', baseScore: 25, status: 'fail' };
}

/**
 * Checks Readability (Flesch value, check score, sentence & paragraph pacing)
 * @param {Object} input
 * @param {string} [input.content]
 * @returns {Object} CheckResult
 */
export function checkReadability({ content = '' } = {}) {
  const weight = SEO_CHECK_CONFIG.weights.readability;
  const words = extractWords(content);
  const totalWords = words.length;

  if (totalWords === 0) {
    return {
      id: 'readability',
      label: 'Readability & Flow',
      score: 0,
      status: 'fail',
      isExcluded: false,
      message: 'No content provided to calculate readability metrics.',
      fixSuggestion: 'Add text to calculate Flesch reading score and sentence structure.',
      weight,
      details: {
        fleschValue: 0,
        checkScore: 0,
        fleschCategory: 'No content',
        averageSentenceLength: 0,
        longParagraphsCount: 0,
        issues: ['Content is empty'],
        suggestions: ['Paste your content to measure readability and reading level.'],
      },
    };
  }

  const sentences = extractSentences(content);
  const totalSentences = Math.max(1, sentences.length);
  const paragraphs = extractParagraphs(content);

  let totalSyllables = 0;
  for (const w of words) {
    totalSyllables += countSyllables(w);
  }

  const asl = totalWords / totalSentences;
  const asw = totalSyllables / totalWords;

  // Flesch Reading Ease Formula: 206.835 - (1.015 * ASL) - (84.6 * ASW)
  const rawFlesch = 206.835 - (1.015 * asl) - (84.6 * asw);
  const fleschValue = Math.max(0, Math.min(100, Math.round(rawFlesch)));
  const fleschGrade = getFleschGrade(fleschValue);

  const longParagraphs = paragraphs.filter(
    (p) => extractWords(p).length > SEO_CHECK_CONFIG.thresholds.readability.maxParagraphWordsWarn
  );

  const issues = [];
  const suggestions = [];
  let score = fleschGrade.baseScore;

  // Check sentence length
  if (asl > SEO_CHECK_CONFIG.thresholds.readability.maxSentenceLengthWarn) {
    score -= 15;
    issues.push(`Sentences are too long (avg ${Math.round(asl)} words/sentence)`);
    suggestions.push('Keep average sentence length between 14 and 18 words to prevent reader fatigue.');
  }

  // Check oversized paragraphs
  if (longParagraphs.length > 0) {
    score -= Math.min(15, longParagraphs.length * 5);
    issues.push(`${longParagraphs.length} long paragraph${longParagraphs.length > 1 ? 's' : ''} (>120 words)`);
    suggestions.push('Break up wall-of-text paragraphs into 2–4 sentence sections.');
  }

  const finalScore = Math.max(0, Math.min(100, Math.round(score)));

  let status = 'pass';
  if (fleschGrade.status === 'fail' || finalScore < 60) {
    status = 'fail';
  } else if (fleschGrade.status === 'warn' || finalScore < 85) {
    status = 'warn';
  }

  // Clear formatted message showing Flesch value and check score separately
  const message = `Flesch ${fleschValue}, ${fleschGrade.label} (Score: ${finalScore}/100)`;

  const fixSuggestion = suggestions.length > 0
    ? suggestions[0]
    : `Maintain readable pacing (Flesch score is currently ${fleschValue}).`;

  return {
    id: 'readability',
    label: 'Readability & Flow',
    score: finalScore,
    status,
    isExcluded: false,
    message,
    fixSuggestion,
    weight,
    details: {
      fleschValue,
      fleschScore: fleschValue,
      checkScore: finalScore,
      fleschCategory: fleschGrade.label,
      averageSentenceLength: Number(asl.toFixed(1)),
      totalSentences,
      totalParagraphs: paragraphs.length,
      longParagraphsCount: longParagraphs.length,
      issues,
      suggestions,
    },
  };
}
