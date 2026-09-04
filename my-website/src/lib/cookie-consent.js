export const COOKIE_CONSENT_VERSION = 1;
export const COOKIE_CONSENT_STORAGE_KEY = "cwa_cookie_consent";
export const COOKIE_CONSENT_DISMISS_KEY = "cwa_cookie_consent_dismissed";

export const DEFAULT_CONSENT = {
  necessary: true,
  analytics: false,
  performance: false,
  marketing: false,
};

export function normalizeConsent(value) {
  if (!value || typeof value !== "object") return null;

  return {
    version: COOKIE_CONSENT_VERSION,
    preferences: {
      ...DEFAULT_CONSENT,
      ...(value.preferences || {}),
      necessary: true,
    },
    updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : new Date().toISOString(),
  };
}

export function readConsent() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (parsed?.version !== COOKIE_CONSENT_VERSION) return null;
    return normalizeConsent(parsed);
  } catch {
    return null;
  }
}

export function saveConsent(preferences) {
  const consent = {
    version: COOKIE_CONSENT_VERSION,
    preferences: {
      ...DEFAULT_CONSENT,
      ...preferences,
      necessary: true,
    },
    updatedAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(consent));
    window.sessionStorage.removeItem(COOKIE_CONSENT_DISMISS_KEY);
    window.dispatchEvent(new CustomEvent("cwa:consent-updated", { detail: consent }));
  }

  return consent;
}

export function dismissConsentForSession() {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(COOKIE_CONSENT_DISMISS_KEY, "1");
  window.dispatchEvent(new CustomEvent("cwa:consent-dismissed"));
}

export function wasConsentDismissedForSession() {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(COOKIE_CONSENT_DISMISS_KEY) === "1";
}
