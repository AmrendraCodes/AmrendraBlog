import React from 'react';

/**
 * Renders an inline JSON-LD script tag.
 * @param {Object} props
 * @param {Object} props.data - The schema object to stringify.
 */
export default function JsonLd({ data }) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
