"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, ChevronLeft, X } from "lucide-react";
import {
  DEFAULT_CONSENT,
  readConsent,
  saveConsent,
} from "@/lib/cookie-consent";

const categories = [
  {
    key: "analytics",
    title: "Analytics Cookies",
    description: "Help us understand which pages are useful and how the site performs.",
  },
  {
    key: "performance",
    title: "Performance Cookies",
    description: "Support performance measurement and improvements to the browsing experience.",
  },
  {
    key: "marketing",
    title: "Advertising / Marketing Cookies",
    description: "Enable marketing integrations and relevant campaign measurement.",
  },
];

function PreferencesRow({ title, description, checked, disabled, onChange }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[var(--card-border)]/70 py-3.5 last:border-b-0">
      <div className="min-w-0">
        <h3 className="text-sm font-bold text-[var(--text-heading)]">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={`${title}: ${checked ? "on" : "off"}`}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--card-bg)] ${
          checked
            ? "border-[#F59E0B] bg-[#F59E0B]"
            : "border-[var(--card-border)] bg-[var(--section-alt-bg)]"
        } ${disabled ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
      >
        <span
          className={`absolute top-0.5 h-4.5 w-4.5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export default function CookieConsent() {
  const [hydrated, setHydrated] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draft, setDraft] = useState(DEFAULT_CONSENT);
  const dialogRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    const stored = readConsent();
    setDraft(stored?.preferences || DEFAULT_CONSENT);
    setHydrated(true);

    const openSettings = () => {
      setDraft(readConsent()?.preferences || DEFAULT_CONSENT);
      setSettingsOpen(true);
    };
    window.addEventListener("cwa:open-cookie-settings", openSettings);
    return () => window.removeEventListener("cwa:open-cookie-settings", openSettings);
  }, []);

  useEffect(() => {
    if (!settingsOpen) return undefined;

    previouslyFocusedRef.current = document.activeElement;
    dialogRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSettingsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll(
        'button:not([disabled]), a[href], [role="switch"]:not([aria-disabled="true"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [settingsOpen]);

  const persist = (preferences) => {
    const next = saveConsent(preferences);
    setDismissed(true);
    setDraft(next.preferences);
    setSettingsOpen(false);
  };

  const acceptAll = () => persist({ analytics: true, performance: true, marketing: true });
  const rejectOptional = () => persist(DEFAULT_CONSENT);

  if (!hydrated) return null;

  // Keep dismissal local to this page load so the notice returns on refresh.
  const shouldShowNotice = !dismissed;

  return (
    <>
      {shouldShowNotice && !settingsOpen && (
        <aside
          role="dialog"
          aria-label="Cookie notice"
          className="fixed inset-x-4 bottom-4 z-[100] w-auto max-w-[32rem] animate-[slide-up_0.35s_ease-out] rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 text-[var(--foreground)] shadow-[0_18px_55px_rgba(11,31,58,0.2)] sm:left-auto sm:right-4 sm:w-[min(32rem,calc(100vw-2rem))] sm:p-6"
        >
          <button
            type="button"
            onClick={() => {
              setDismissed(true);
            }}
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--section-alt-bg)] hover:text-[var(--text-heading)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
            aria-label="Dismiss cookie notice"
            title="Dismiss until next refresh"
          >
            <X size={17} />
          </button>

          <p className="pr-8 text-[13px] leading-relaxed text-[var(--text-body)]">
            Essential cookies keep Code with Amrendra working properly. Optional cookies help us understand website usage and improve performance. You can accept, reject, or manage your preferences. Learn more in our{" "}
            <Link className="font-semibold text-[#D97706] underline decoration-[#F59E0B]/40 underline-offset-2 hover:text-[#F59E0B]" href="/privacy">
              Privacy Policy
            </Link>
            . <span className="font-semibold text-[var(--text-muted)]">MISSING COOKIE POLICY PAGE</span>
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
            <button type="button" onClick={() => setSettingsOpen(true)} className="min-h-10 rounded-lg border border-[var(--card-border)] px-3.5 text-[13px] font-semibold text-[var(--text-heading)] transition-colors hover:border-[#F59E0B]/60 hover:text-[#D97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]">
              Cookie Settings
            </button>
            <button type="button" onClick={rejectOptional} className="min-h-10 rounded-lg px-3.5 text-[13px] font-semibold text-[var(--text-body)] transition-colors hover:bg-[var(--section-alt-bg)] hover:text-[var(--text-heading)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]">
              Reject All
            </button>
            <button type="button" onClick={acceptAll} className="min-h-10 rounded-lg bg-[#F59E0B] px-4 text-[13px] font-bold text-[#0B1F3A] transition-colors hover:bg-[#D97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--card-bg)]">
              Accept All Cookies
            </button>
          </div>
        </aside>
      )}

      {settingsOpen && (
        <div className="fixed inset-0 z-[110] flex items-end justify-center bg-[#0B1F3A]/45 p-4 backdrop-blur-[2px] sm:items-center">
          <section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-title"
            aria-describedby="cookie-settings-description"
            tabIndex={-1}
            className="max-h-[min(720px,calc(100vh-2rem))] w-full max-w-xl overflow-y-auto rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 text-[var(--foreground)] shadow-2xl outline-none sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="cookie-settings-title" className="text-lg font-extrabold text-[var(--text-heading)]">Cookie Settings</h2>
                <p id="cookie-settings-description" className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">
                  Choose which optional cookies you allow. Necessary cookies are always active because the site cannot work without them.
                </p>
              </div>
              <button type="button" onClick={() => setSettingsOpen(false)} aria-label="Close cookie settings" className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--section-alt-bg)] hover:text-[var(--text-heading)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"><X size={18} /></button>
            </div>

            <div className="mt-5 rounded-xl border border-[var(--card-border)] px-4">
              <PreferencesRow title="Necessary Cookies" description="Keep security, navigation, theme, and core site functions working." checked disabled onChange={() => {}} />
              {categories.map((category) => (
                <PreferencesRow
                  key={category.key}
                  title={category.title}
                  description={category.description}
                  checked={Boolean(draft[category.key])}
                  onChange={(value) => setDraft((current) => ({ ...current, [category.key]: value }))}
                />
              ))}
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
              <button type="button" onClick={rejectOptional} className="min-h-10 rounded-lg px-4 text-[13px] font-semibold text-[var(--text-body)] hover:bg-[var(--section-alt-bg)] hover:text-[var(--text-heading)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]">Reject Optional Cookies</button>
              <button type="button" onClick={() => persist(draft)} className="min-h-10 rounded-lg border border-[var(--card-border)] px-4 text-[13px] font-semibold text-[var(--text-heading)] hover:border-[#F59E0B]/60 hover:text-[#D97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]">Save Preferences</button>
              <button type="button" onClick={acceptAll} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#F59E0B] px-4 text-[13px] font-bold text-[#0B1F3A] hover:bg-[#D97706] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--card-bg)]"><Check size={15} />Accept All</button>
            </div>
            <Link href="/privacy" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#D97706] hover:text-[#F59E0B]"><ChevronLeft size={13} />Read Privacy Policy</Link>
          </section>
        </div>
      )}
    </>
  );
}

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("cwa:open-cookie-settings"))}
      className="text-left text-slate-300 transition-colors hover:text-[#F59E0B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
    >
      Cookie Settings
    </button>
  );
}
