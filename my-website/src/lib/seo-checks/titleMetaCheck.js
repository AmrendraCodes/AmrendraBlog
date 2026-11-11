import { SEO_CHECK_CONFIG } from './config.js';

/**
 * Checks Title Tag and Meta Description
 * Rule: Title length 50-60 pass, >60 chars = WARN, >70 = FAIL.
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
  let titleStatus = 'pass';
  let descScore = 100;
  let descStatus = 'pass';

  // 1. Title Evaluation: >60 = WARN, >70 = FAIL
  if (titleLen === 0) {
    titleScore = 0;
    titleStatus = 'fail';
    issues.push('Title tag is missing');
    suggestions.push('Add an SEO page title between 50 and 60 characters.');
  } else if (titleLen > 70) {
    titleScore = Math.max(20, Math.round(60 - (titleLen - 70) * 3));
    titleStatus = 'fail';
    issues.push(`Title tag is too long (${titleLen} chars — exceeds 70 character limit)`);
    suggestions.push('Shorten title tag below 60 characters to prevent Google SERP truncation.');
  } else if (titleLen > 60) {
    titleScore = 70;
    titleStatus = 'warn';
    issues.push(`Title tag is slightly long (${titleLen} chars — recommended 50–60 characters)`);
    suggestions.push('Trim title tag to 50–60 characters for optimal display on mobile & desktop.');
  } else if (titleLen >= 50 && titleLen <= 60) {
    titleScore = 100;
    titleStatus = 'pass';
  } else if (titleLen >= 40 && titleLen < 50) {
    titleScore = 75;
    titleStatus = 'warn';
    issues.push(`Title tag is slightly short (${titleLen} chars — recommended 50–60 characters)`);
    suggestions.push('Expand title tag to 50–60 characters with secondary keywords or brand name.');
  } else {
    // titleLen < 40
    titleScore = Math.max(25, Math.round((titleLen / 40) * 50));
    titleStatus = 'fail';
    issues.push(`Title tag is too short (${titleLen} chars — under 40 characters)`);
    suggestions.push('Expand title to at least 50 characters to maximize search visibility.');
  }

  // 2. Meta Description Evaluation: 120-160 pass, <100 or >180 fail
  if (descLen === 0) {
    descScore = 0;
    descStatus = 'fail';
    issues.push('Meta description is missing');
    suggestions.push('Add a compelling meta description between 120 and 160 characters.');
  } else if (descLen < 100) {
    descScore = Math.max(30, Math.round((descLen / 120) * 60));
    descStatus = 'fail';
    issues.push(`Meta description is too short (${descLen} chars — under 100 characters)`);
    suggestions.push('Expand meta description to 120–160 characters for complete search snippets.');
  } else if (descLen < 120) {
    descScore = 75;
    descStatus = 'warn';
    issues.push(`Meta description is slightly short (${descLen} chars — recommended 120–160 characters)`);
    suggestions.push('Add more detail or a call to action to reach 120–160 characters.');
  } else if (descLen > 180) {
    descScore = Math.max(30, Math.round(70 - (descLen - 180) * 2));
    descStatus = 'fail';
    issues.push(`Meta description is too long (${descLen} chars — exceeds 180 characters)`);
    suggestions.push('Shorten meta description below 160 characters to avoid snippet truncation.');
  } else if (descLen > 160) {
    descScore = 75;
    descStatus = 'warn';
    issues.push(`Meta description is slightly long (${descLen} chars — recommended 120–160 characters)`);
    suggestions.push('Trim meta description below 160 characters to ensure it fits mobile search results.');
  } else {
    descScore = 100;
    descStatus = 'pass';
  }

  // 3. Keyword Presence in Title & Description
  let keywordPenalty = 0;
  if (cleanKeyword) {
    const titleHasKeyword = cleanTitle.toLowerCase().includes(cleanKeyword);
    const descHasKeyword = cleanDesc.toLowerCase().includes(cleanKeyword);

    if (!titleHasKeyword) {
      keywordPenalty += 20;
      issues.push(`Target keyword "${cleanKeyword}" missing from title tag`);
      suggestions.push(`Include your focus keyword "${cleanKeyword}" near the start of the title tag.`);
    }

    if (!descHasKeyword) {
      keywordPenalty += 15;
      issues.push(`Target keyword "${cleanKeyword}" missing from meta description`);
      suggestions.push(`Naturally weave your focus keyword "${cleanKeyword}" into the meta description.`);
    }
  }

  // Compute overall check score & status
  const rawScore = Math.round((titleScore * 0.5 + descScore * 0.5) - keywordPenalty);
  const finalScore = Math.max(0, Math.min(100, rawScore));

  let status = 'pass';
  if (titleStatus === 'fail' || descStatus === 'fail' || finalScore < 60) {
    status = 'fail';
  } else if (titleStatus === 'warn' || descStatus === 'warn' || finalScore < 85) {
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
      titleScore,
      titleStatus,
      metaDescriptionLength: descLen,
      descScore,
      descStatus,
      titleHasKeyword: cleanKeyword ? cleanTitle.toLowerCase().includes(cleanKeyword) : null,
      descHasKeyword: cleanKeyword ? cleanDesc.toLowerCase().includes(cleanKeyword) : null,
      issues,
      suggestions,
    },
  };
}
