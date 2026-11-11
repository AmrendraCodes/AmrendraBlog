'use client';

import React from 'react';

/**
 * SEO Content Reviewer Icon.
 * Matches the user-provided browser-eye inspection glyph.
 * Fully responsive and supports currentColor for dark/light theme accents.
 */
export default function SeoReviewerIcon({
  size = 24,
  strokeWidth = 2,
  className = '',
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Outer rounded browser window */}
      <rect x="2.5" y="2.5" width="19" height="19" rx="3" />
      
      {/* Browser header bar divider */}
      <line x1="2.5" y1="7.5" x2="21.5" y2="7.5" />
      
      {/* Outer almond eye silhouette with circular iris cutout (evenodd rule) */}
      <path
        d="M 5.8 14.3 C 7.6 10.4 9.6 9.8 12 9.8 C 14.4 9.8 16.4 10.4 18.2 14.3 C 16.4 18.2 14.4 18.8 12 18.8 C 9.6 18.8 7.6 18.2 5.8 14.3 Z M 12 11.45 A 2.85 2.85 0 1 0 12 17.15 A 2.85 2.85 0 1 0 12 11.45 Z"
        fill="currentColor"
        stroke="none"
        fillRule="evenodd"
      />
      
      {/* Centered eye pupil */}
      <circle cx="12" cy="14.3" r="1.55" fill="currentColor" stroke="none" />
    </svg>
  );
}

