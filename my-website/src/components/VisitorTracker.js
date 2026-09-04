'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { readConsent } from '@/lib/cookie-consent';

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const scheduleTrack = () => {
      const trackVisit = async () => {
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
        window.requestIdleCallback(() => trackVisit(), { timeout: 3000 });
      } else {
        setTimeout(trackVisit, 2000);
      }
    };

    if (readConsent()?.preferences.analytics) scheduleTrack();

    const handleConsentUpdate = (event) => {
      if (event.detail?.preferences.analytics) scheduleTrack();
    };
    window.addEventListener('cwa:consent-updated', handleConsentUpdate);

    return () => window.removeEventListener('cwa:consent-updated', handleConsentUpdate);
  }, [pathname]);

  return null;
}
