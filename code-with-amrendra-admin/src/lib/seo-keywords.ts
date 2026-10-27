export interface SeoKeywords {
  primary: string;
  secondary: string[];
}

export const MAX_SECONDARY_SEO_KEYWORDS = 10;
export const MAX_SEO_KEYWORD_LENGTH = 60;

export function normalizeSeoKeywords(
  keywords?: Partial<SeoKeywords> | null
): SeoKeywords {
  const primary =
    typeof keywords?.primary === 'string'
      ? keywords.primary.trim().slice(0, MAX_SEO_KEYWORD_LENGTH)
      : '';
  const seen = new Set(primary ? [primary.toLowerCase()] : []);
  const secondary: string[] = [];

  for (const rawKeyword of keywords?.secondary || []) {
    if (typeof rawKeyword !== 'string') continue;

    const keyword = rawKeyword.trim();
    const normalizedKeyword = keyword.toLowerCase();
    if (
      !keyword ||
      keyword.length > MAX_SEO_KEYWORD_LENGTH ||
      seen.has(normalizedKeyword)
    ) {
      continue;
    }

    seen.add(normalizedKeyword);
    secondary.push(keyword);
    if (secondary.length === MAX_SECONDARY_SEO_KEYWORDS) break;
  }

  return { primary, secondary };
}
