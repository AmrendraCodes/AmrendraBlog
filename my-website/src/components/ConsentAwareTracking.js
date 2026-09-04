"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { readConsent } from "@/lib/cookie-consent";

const GA_ID = "G-F1RG71SZFQ";
const META_PIXEL_ID = "1771913473946323";

export default function ConsentAwareTracking() {
  const [preferences, setPreferences] = useState(null);

  useEffect(() => {
    const applyConsent = (nextPreferences) => {
      const analyticsAllowed = Boolean(nextPreferences?.analytics);
      const marketingAllowed = Boolean(nextPreferences?.marketing);

      window[`ga-disable-${GA_ID}`] = !analyticsAllowed;
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", {
          analytics_storage: analyticsAllowed ? "granted" : "denied",
        });
      }
      if (typeof window.fbq === "function") {
        window.fbq("consent", marketingAllowed ? "grant" : "revoke");
      }
    };

    const storedPreferences = readConsent()?.preferences || null;
    applyConsent(storedPreferences);

    const update = (event) => {
      const nextPreferences = event.detail?.preferences || readConsent()?.preferences || null;
      setPreferences(nextPreferences);
      applyConsent(nextPreferences);
    };

    window.addEventListener("cwa:consent-updated", update);
    return () => window.removeEventListener("cwa:consent-updated", update);
  }, []);

  useEffect(() => {
    setPreferences(readConsent()?.preferences || null);
  }, []);

  if (!preferences) return null;

  return (
    <>
      {preferences.analytics && (
        <>
          <Script id="google-consent-mode" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};window.gtag('consent','update',{'analytics_storage':'granted'});window.gtag('js',new Date());window.gtag('config','${GA_ID}',{'anonymize_ip':true});`}
          </Script>
          <Script id="google-analytics-consented" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        </>
      )}
      {preferences.marketing && (
        <Script id="meta-pixel-consented" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
