import { checkTitleMeta } from './titleMetaCheck.js';
import { checkHeadings } from './headingsCheck.js';
import { checkKeywords } from './keywordCheck.js';
import { checkReadability } from './readabilityCheck.js';
import { checkContentLength } from './contentLengthCheck.js';

/**
 * Runs all SEO checks, re-normalizes weights for excluded checks, and extracts prioritized fixes.
 * @param {Object} payload
 * @param {string} [payload.title]
 * @param {string} [payload.metaDescription]
 * @param {string} [payload.h1Input] Optional dedicated H1 / headline input
 * @param {string} [payload.content]
 * @param {string} [payload.keyword]
 * @param {Array<{ level: number, text: string }>} [payload.headings]
 * @returns {Object} Full Score Report
 */
export function runAllChecks(payload = {}) {
  const {
    title = '',
    metaDescription = '',
    h1Input = '',
    content = '',
    keyword = '',
    headings = null,
  } = payload;

  const titleMetaResult = checkTitleMeta({ title, metaDescription, keyword });
  const headingsResult = checkHeadings({ h1Input, headings, content, keyword });
  const keywordResult = checkKeywords({ content, keyword });
  const readabilityResult = checkReadability({ content });
  const contentLengthResult = checkContentLength({ content });

  const checks = [
    titleMetaResult,
    headingsResult,
    keywordResult,
    readabilityResult,
    contentLengthResult,
  ];

  // Weighted Average Calculation with Re-normalization for Excluded Checks
  let totalWeightedScore = 0;
  let activeWeightSum = 0;
  let passCount = 0;
  let warnCount = 0;
  let failCount = 0;
  let infoCount = 0;

  for (const check of checks) {
    if (check.status === 'pass') passCount++;
    else if (check.status === 'warn') warnCount++;
    else if (check.status === 'fail') failCount++;
    else if (check.status === 'info') infoCount++;

    // Only include checks in weighted average if not excluded and score is not null
    if (!check.isExcluded && typeof check.score === 'number') {
      totalWeightedScore += check.score * check.weight;
      activeWeightSum += check.weight;
    }
  }

  // Re-normalized score (0-100)
  const overallScore = activeWeightSum > 0
    ? Math.round(totalWeightedScore / activeWeightSum)
    : 0;

  // Provisional status when focus keyword is missing or not enough info
  const isProvisional = Boolean(keywordResult.isExcluded || headingsResult.isExcluded);
  const provisionalNote = keywordResult.isExcluded
    ? 'Provisional score: add a focus keyword for full accuracy.'
    : (headingsResult.isExcluded ? 'Provisional score: add an H1 headline for full accuracy.' : null);

  let overallGrade = 'Critical Issues';
  if (overallScore >= 90) overallGrade = 'Excellent SEO';
  else if (overallScore >= 75) overallGrade = 'Good SEO';
  else if (overallScore >= 50) overallGrade = 'Needs Improvement';

  // Extract Top Priority Fixes: EVERY WARN and FAIL check must appear!
  const fixCandidates = [];

  for (const check of checks) {
    if (check.status === 'fail' || check.status === 'warn') {
      const severityOrder = check.status === 'fail' ? 2 : 1;
      const suggestions = check.details?.suggestions?.length > 0
        ? check.details.suggestions
        : [check.fixSuggestion];

      // Add main fix
      fixCandidates.push({
        id: `${check.id}-primary`,
        checkId: check.id,
        label: check.label,
        status: check.status,
        score: check.score,
        severityOrder,
        suggestion: suggestions[0],
      });

      // Add secondary fixes if any
      for (let i = 1; i < suggestions.length; i++) {
        fixCandidates.push({
          id: `${check.id}-sub-${i}`,
          checkId: check.id,
          label: check.label,
          status: check.status,
          score: check.score,
          severityOrder: severityOrder - 0.1,
          suggestion: suggestions[i],
        });
      }
    }
  }

  // Sort by severity (fail first, then warn), then lowest score
  fixCandidates.sort((a, b) => {
    if (b.severityOrder !== a.severityOrder) {
      return b.severityOrder - a.severityOrder;
    }
    return (a.score ?? 0) - (b.score ?? 0);
  });

  // Ensure every distinct failing/warning check is represented
  const distinctCheckIds = new Set();
  const topFixes = [];

  // Pass 1: pick the best fix from each failing/warning check
  for (const fix of fixCandidates) {
    if (!distinctCheckIds.has(fix.checkId)) {
      distinctCheckIds.add(fix.checkId);
      topFixes.push(fix);
    }
  }

  // Pass 2: fill up to 5 with remaining secondary suggestions
  for (const fix of fixCandidates) {
    if (topFixes.length >= 5) break;
    if (!topFixes.some((f) => f.id === fix.id)) {
      topFixes.push(fix);
    }
  }

  return {
    overallScore,
    overallGrade,
    isProvisional,
    provisionalNote,
    summary: {
      passCount,
      warnCount,
      failCount,
      infoCount,
      totalChecks: checks.length,
    },
    checks,
    topFixes,
    metadata: {
      hasKeyword: Boolean(keyword && keyword.trim().length > 0),
      hasH1: Boolean(h1Input && h1Input.trim().length > 0),
      wordCount: contentLengthResult.details?.wordCount || 0,
      activeWeightSum,
      evaluatedAt: new Date().toISOString(),
    },
  };
}
