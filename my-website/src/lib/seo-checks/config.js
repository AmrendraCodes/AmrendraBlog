/**
 * SEO Checks Configuration
 * Defines scoring weights, ideal ranges, and status thresholds.
 */

export const SEO_CHECK_CONFIG = {
  weights: {
    titleMeta: 25,
    headings: 20,
    keyword: 20,
    readability: 15,
    contentLength: 20,
  },
  thresholds: {
    title: {
      idealMin: 50,
      idealMax: 60,
      acceptableMin: 40,
      acceptableMax: 70,
    },
    metaDescription: {
      idealMin: 120,
      idealMax: 160,
      acceptableMin: 100,
      acceptableMax: 180,
    },
    keywordDensity: {
      min: 0.5,
      max: 2.5,
      stuffingThreshold: 3.0,
    },
    contentLength: {
      thinThreshold: 300,
      goodThreshold: 800,
    },
    readability: {
      minFleschPass: 60,
      minFleschWarn: 50,
      maxSentenceLengthWarn: 25,
      maxParagraphWordsWarn: 120,
    },
  },
};
