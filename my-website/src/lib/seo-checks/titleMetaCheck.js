import { SEO_CHECK_CONFIG } from './config.js';

/**
 * Checks Title Tag and Meta Description
 * @param {Object} input
 * @param {string} [input.title]
 * @param {string} [input.metaDescription]
 * @param {string} [input.keyword]
 * @returns {Object} CheckResult
 */
export function checkTitleMeta({ title = '', metaDescription = '', keyword = '' } = {}) {
  const weight = SEO_CHECK_CONFIG.weights.titleMeta;
  const cleanTitle = (title || '').trim();
  const cleanDesc = (metaDescription || '').trim();
  const cleanKeyword = (keyword || '').trim().toLowerCase();

  const titleLen = cleanTitle.length;
  const descLen = cleanDesc.length;

  const issues = [];
  const suggestions = [];

  let titleScore = 100;
  let descScore = 100;

  // 1. Title Evaluation
  if (titleLen === 0) {
    titleScore = 0;
    issues.push('Title tag is missing');
    suggestions.push('Add an SEO page title between 50 and 60 characters.');
  } else if (titleLen < SEO_CHECK_CONFIG.thresholds.title.acceptableMin) {
    titleScore = Math.max(30, Math.round((titleLen / SEO_CHECK_CONFIG.thresholds.title.idealMin) * 70));
    issues.push(`Title is too short (${titleLen} chars)`);
    suggestions.push(`Expand title to 50–60 characters for maximum search engine click-through.`);
  } else if (titleLen > SEO_CHECK_CONFIG.thresholds.title.acceptableMax) {
    titleScore = Math.max(30, 100 - (titleLen - SEO_CHECK_CONFIG.thresholds.title.acceptableMax) * 4);
    issues.push(`Title is too long (${titleLen} chars)`);
    suggestions.push('Shorten title below 60 characters to prevent Google SERP truncation.');
  } else if (titleLen >= SEO_CHECK_CONFIG.thresholds.title.idealMin && titleLen <= SEO_CHECK_CONFIG.thresholds.title.idealMax) {
    titleScore = 100;
  } else {
    titleScore = 80; // In acceptable range (40-49 or 61-70)
  }

  // 2. Meta Description Evaluation
  if (descLen === 0) {
    descScore = 0;
    issues.push('Meta description is missing');
    suggestions.push('Add a compelling meta description between 120 and 160 characters.');
  } else if (descLen < SEO_CHECK_CONFIG.thresholds.metaDescription.acceptableMin) {
    descScore = Math.max(30, Math.round((descLen / SEO_CHECK_CONFIG.thresholds.metaDescription.idealMin) * 70));
    issues.push(`Meta description is too short (${descLen} chars)`);
    suggestions.push('Expand meta description to 120–160 characters to optimize SERP snippet real estate.');
  } else if (descLen > SEO_CHECK_CONFIG.thresholds.metaDescription.acceptableMax) {
    descScore = Math.max(30, 100 - (descLen - SEO_CHECK_CONFIG.thresholds.metaDescription.acceptableMax) * 3);
    issues.push(`Meta description is too long (${descLen} chars)`);
    suggestions.push('Trim meta description below 160 characters to avoid being cut off on mobile devices.');
  } else if (descLen >= SEO_CHECK_CONFIG.thresholds.metaDescription.idealMin && descLen <= SEO_CHECK_CONFIG.thresholds.metaDescription.idealMax) {
    descScore = 100;
  } else {
    descScore = 80;
  }

  // 3. Keyword Presence in Title & Description
  let keywordPenalty = 0;
  if (cleanKeyword) {
    const titleHasKeyword = cleanTitle.toLowerCase().includes(cleanKeyword);
    const descHasKeyword = cleanDesc.toLowerCase().includes(cleanKeyword);

    if (!titleHasKeyword) {
      keywordPenalty += 20;
      issues.push(`Target keyword "${cleanKeyword}" missing from title`);
      suggestions.push(`Include your target keyword "${cleanKeyword}" near the beginning of your title tag.`);
    }

    if (!descHasKeyword) {
      keywordPenalty += 15;
      issues.push(`Target keyword "${cleanKeyword}" missing from meta description`);
      suggestions.push(`Naturally weave "${cleanKeyword}" into your meta description snippet.`);
    }
  }

  // Base score is 50% title + 50% meta description minus keyword penalty
  const rawScore = Math.round((titleScore * 0.5 + descScore * 0.5) - keywordPenalty);
  const finalScore = Math.max(0, Math.min(100, rawScore));

  let status = 'pass';
  if (finalScore < 60) {
    status = 'fail';
  } else if (finalScore < 85) {
    status = 'warn';
  }

  let message = 'Title tag and meta description are well optimized.';
  if (issues.length > 0) {
    message = issues.join('; ') + '.';
  }

  const fixSuggestion = suggestions.length > 0 
    ? suggestions[0] 
    : 'Maintain current title and description lengths for optimal CTR.';

  return {
    id: 'title-meta',
    label: 'Title & Meta Description',
    score: finalScore,
    status,
    message,
    fixSuggestion,
    weight,
    details: {
      titleLength: titleLen,
      metaDescriptionLength: descLen,
      titleHasKeyword: cleanKeyword ? cleanTitle.toLowerCase().includes(cleanKeyword) : null,
      descHasKeyword: cleanKeyword ? cleanDesc.toLowerCase().includes(cleanKeyword) : null,
      issues,
      suggestions,
    },
  };
}
