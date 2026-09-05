'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { readConsent } from '@/lib/cookie-consent';

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    let scheduled = null;
    let tracked = false;
    let cancelled = false;
    const cancelScheduled = () => {
      if (scheduled === null) return;
      if ('requestIdleCallback' in window) window.cancelIdleCallback(scheduled);
      else clearTimeout(scheduled);
      scheduled = null;
    };
    const scheduleTrack = () => {
      if (tracked || scheduled !== null) return;
      const trackVisit = async () => {
        scheduled = null;
        if (cancelled || tracked || !readConsent()?.preferences.analytics) return;
        tracked = true;
        try {
          let slug = null;
          if (pathname?.startsWith('/resources/blog/')) {
            slug = pathname.replace('/resources/blog/', '');
          }

          await fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              path: pathname,
              referrer: document.referrer || 'Direct',
              slug,
            }),
          });
        } catch (err) {
          // Silent fail for telemetry
        }
      };

      if ('requestIdleCallback' in window) {
        scheduled = window.requestIdleCallback(() => trackVisit(), { timeout: 3000 });
      } else {
        scheduled = setTimeout(trackVisit, 2000);
      }
    };

    if (readConsent()?.preferences.analytics) scheduleTrack();

    const handleConsentUpdate = (event) => {
      if (event.detail?.preferences.analytics) scheduleTrack();
      else cancelScheduled();
    };
    window.addEventListener('cwa:consent-updated', handleConsentUpdate);

    return () => {
      cancelled = true;
      cancelScheduled();
      window.removeEventListener('cwa:consent-updated', handleConsentUpdate);
    };
  }, [pathname]);

  return null;
}
