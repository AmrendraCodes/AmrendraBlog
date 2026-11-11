import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import {
  checkTitleMeta,
  checkHeadings,
  checkKeywords,
  checkReadability,
  checkContentLength,
  runAllChecks,
  SEO_CHECK_CONFIG,
} from '../index.js';

describe('1. Title & Meta Description Check (with Review Rules)', () => {
  test('passes for optimal title (55 chars) and description (145 chars)', () => {
    const result = checkTitleMeta({
      title: 'Free SEO Content Reviewer: Boost Rankings & Traffic Now', // 55 chars
      metaDescription: 'Audit your web content instantly with our free SEO content reviewer tool. Get live scoring, actionable fix suggestions, and improve search visibility.', // 152 chars
      keyword: 'seo content reviewer',
    });

    assert.equal(result.status, 'pass');
    assert.ok(result.score >= 90);
  });

  test('rule test: title > 60 chars triggers WARN, title > 70 chars triggers FAIL', () => {
    // 1. >60 and <= 70 chars (e.g. 64 chars)
    const warnTitle = 'A'.repeat(64);
    const warnResult = checkTitleMeta({
      title: warnTitle,
      metaDescription: 'A'.repeat(140),
    });
    assert.equal(warnResult.details.titleStatus, 'warn');
    assert.equal(warnResult.status, 'warn');

    // 2. >70 chars (e.g. 74 chars)
    const failTitle = 'A'.repeat(74);
    const failResult = checkTitleMeta({
      title: failTitle,
      metaDescription: 'A'.repeat(140),
    });
    assert.equal(failResult.details.titleStatus, 'fail');
    assert.equal(failResult.status, 'fail');
    assert.ok(failResult.details.issues.some((i) => i.includes('exceeds 70 character limit')));
  });

  test('fails when title is missing', () => {
    const result = checkTitleMeta({ title: '', metaDescription: 'Valid meta description text of good length.' });
    assert.equal(result.details.titleStatus, 'fail');
    assert.equal(result.status, 'fail');
  });
});

describe('2. Headings Check (with Plain Text & Optional H1 Input)', () => {
  test('rule test: plain text with no headings marks "Not enough info" and isExcluded=true', () => {
    const plainText = 'This is just a plain paragraph of text with no markdown headings or html tags.';
    const result = checkHeadings({ content: plainText, h1Input: '' });

    assert.equal(result.status, 'info');
    assert.equal(result.isExcluded, true);
    assert.equal(result.score, null);
    assert.ok(result.message.includes('Not enough info'));
  });

  test('rule test: dedicated h1Input provides heading info when content is plain text', () => {
    const plainText = 'Plain paragraph without markdown headings.';
    const result = checkHeadings({
      content: plainText,
      h1Input: 'My Dedicated Article Title',
      keyword: 'article',
    });

    assert.equal(result.isExcluded, false);
    assert.equal(typeof result.score, 'number');
    assert.equal(result.details.h1Count, 1);
  });

  test('passes with Markdown headings (#, ##, ###) and keyword in H1', () => {
    const markdown = `# Complete SEO Guide\n\nIntro text.\n\n## Section One\n\n### Detail`;
    const result = checkHeadings({ content: markdown, keyword: 'seo' });

    assert.equal(result.isExcluded, false);
    assert.equal(result.status, 'pass');
    assert.equal(result.details.h1Count, 1);
  });
});

describe('3. Keyword Usage Check (with Missing Keyword Rule)', () => {
  test('rule test: missing keyword marks check as info, isExcluded=true, score=null', () => {
    const result = checkKeywords({
      content: 'Here is some content without any focus keyword specified.',
      keyword: '',
    });

    assert.equal(result.status, 'info');
    assert.equal(result.isExcluded, true);
    assert.equal(result.score, null);
    assert.equal(result.details.isProvisional, true);
  });

  test('evaluates normally when focus keyword is provided', () => {
    const filler = 'The quick brown fox jumps over the lazy dog and writes words. ';
    const text = `Start your audit right here. ${filler.repeat(10)} We continue the audit process carefully. ${filler.repeat(10)} Finally the audit ends. ${filler.repeat(10)}`;

    const result = checkKeywords({
      content: text,
      keyword: 'audit',
    });

    assert.equal(result.isExcluded, false);
    assert.equal(result.status, 'pass');
    assert.ok(typeof result.score === 'number');
  });
});

describe('4. Readability Check (Separate Flesch & Check Score)', () => {
  test('reports fleschValue and checkScore separately and clearly', () => {
    const easyText = `
      This is a simple tool for writers. It helps you check your content.
      You can paste your text and see your score right away.
      Each check tells you how to make your words better.
      Keep your sentences short and clear so everyone can read them.
    `;

    const result = checkReadability({ content: easyText });

    assert.ok(typeof result.details.fleschValue === 'number');
    assert.ok(typeof result.details.checkScore === 'number');
    assert.ok(result.message.startsWith(`Flesch ${result.details.fleschValue}`));
    assert.ok(result.message.includes(`Score: ${result.score}/100`));
    assert.equal(result.status, 'pass');
  });
});

describe('5. Full RunAllChecks: Weight Re-normalization & Fix Priorities', () => {
  test('rule test: missing keyword excludes check and re-normalizes remaining weights to 100%', () => {
    // Title is 55 chars (pass 100), desc 140 chars (pass 100), content 850 words (pass 100)
    // No keyword, no headings
    const content = '# Heading One\n\n' + 'word '.repeat(850);
    const report = runAllChecks({
      title: 'A'.repeat(55),
      metaDescription: 'B'.repeat(140),
      content,
      keyword: '', // missing keyword -> excluded
    });

    assert.equal(report.isProvisional, true);
    assert.ok(report.provisionalNote.includes('add a focus keyword for full accuracy'));
    assert.equal(report.metadata.hasKeyword, false);

    // Keyword weight (20) was excluded, so activeWeightSum = 80
    assert.equal(report.metadata.activeWeightSum, 80);
    assert.ok(typeof report.overallScore === 'number');
  });

  test('rule test: every failing or warning check appears in Top Priority Fixes', () => {
    const report = runAllChecks({
      title: 'A'.repeat(74), // FAIL (>70)
      metaDescription: 'Short', // FAIL (<100)
      content: 'word '.repeat(100), // FAIL (<300 thin)
      keyword: 'target',
      h1Input: '', // missing H1
    });

    assert.ok(report.topFixes.length > 0);
    const topCheckIds = new Set(report.topFixes.map((f) => f.checkId));

    // title-meta and content-length must appear
    assert.ok(topCheckIds.has('title-meta'), 'Title & Meta must appear in top fixes');
    assert.ok(topCheckIds.has('content-length'), 'Content length must appear in top fixes');

    // Counters must match check statuses exactly
    const computedFails = report.checks.filter((c) => c.status === 'fail').length;
    const computedWarns = report.checks.filter((c) => c.status === 'warn').length;
    const computedPasses = report.checks.filter((c) => c.status === 'pass').length;

    assert.equal(report.summary.failCount, computedFails);
    assert.equal(report.summary.warnCount, computedWarns);
    assert.equal(report.summary.passCount, computedPasses);
  });
});
