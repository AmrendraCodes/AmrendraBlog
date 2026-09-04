import React from 'react';

/**
 * Renders an inline JSON-LD script tag.
 * @param {Object} props
 * @param {Object} props.data - The schema object to stringify.
 */
export default function JsonLd({ data }) {
  if (!data) return null;

  // Escape '<' to prevent unexpected script tag closing while keeping valid JSON-LD
  const jsonString = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
