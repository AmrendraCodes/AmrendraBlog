/**
 * Normalizes a date string to ISO-8601 format (YYYY-MM-DD) for schema validation.
 * @param {string} dateStr 
 * @returns {string}
 */
function formatDate(dateStr) {
  if (!dateStr) return undefined;
  try {
    const parsedDate = new Date(dateStr);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.toISOString().split('T')[0];
    }
  } catch (e) {
    // Return original string if parsing fails
  }
  return dateStr;
}

/**
 * Returns Website JSON-LD Schema.
 * Useful on the Homepage.
 */
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Code with Amrendra",
    "url": "https://codewithamrendra.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://codewithamrendra.vercel.app/blog?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Returns Person JSON-LD Schema for the author.
 * Useful on the Homepage.
 */
export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Amrendra Kumar",
    "url": "https://codewithamrendra.vercel.app",
    "image": "https://codewithamrendra.vercel.app/Profile%20photo.jpeg",
    "sameAs": [
      "https://github.com/AmrendraCodes",
      "https://x.com/codewithamrendr",
      "https://www.linkedin.com/in/amrendra1998/",
      "https://www.youtube.com/@codewithamrendra",
      "https://instagram.com/amrendracodes"
    ],
    "jobTitle": "Software Engineer & Technical Writer",
    "worksFor": {
      "@type": "Organization",
      "name": "Code With Amrendra"
    }
  };
}

/**
 * Returns LocalBusiness / SoftwareCompany JSON-LD Schema for Google Knowledge Panel indexing.
 */
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SoftwareCompany"],
    "@id": "https://codewithamrendra.vercel.app/#organization",
    "name": "Code With Amrendra",
    "alternateName": ["Code with Amrendra", "CWA Engineering"],
    "url": "https://codewithamrendra.vercel.app",
    "logo": "https://codewithamrendra.vercel.app/logo-square.png",
    "image": "https://codewithamrendra.vercel.app/logo-square.png",
    "telephone": "+91-6205482614",
    "priceRange": "$$",
    "description": "Software company specializing in Custom AI Development Services, Web Development, SaaS Architecture, and Cloud Solutions.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Moh- Guphaper, South of Devi Asthan, Kalyanpur",
      "addressLocality": "Bihar Sharif",
      "addressRegion": "Bihar",
      "postalCode": "803101",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.1982,
      "longitude": 85.5149
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://github.com/AmrendraCodes",
      "https://x.com/codewithamrendr",
      "https://www.linkedin.com/in/amrendra1998/",
      "https://www.youtube.com/@codewithamrendra",
      "https://instagram.com/amrendracodes"
    ]
  };
}

/**
 * Returns CollectionPage JSON-LD Schema.
 * Useful for category list pages and search result lists.
 * @param {Object} params
 * @param {string} params.name
 * @param {string} params.description
 * @param {string} params.url
 */
export function getCollectionPageSchema({ name, description, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": name,
    "description": description,
    "url": url
  };
}

/**
 * Returns BlogPost JSON-LD Schema.
 * @param {Object} params
 * @param {string} params.title
 * @param {string} params.description
 * @param {string} params.slug
 * @param {string} params.image
 * @param {string} params.datePublished
 * @param {string} params.category
 * @param {number} params.wordCount
 * @param {string[]} params.tags
 */
export function getBlogPostSchema({ title, description, slug, image, datePublished, category, wordCount, tags }) {
  const formattedDate = formatDate(datePublished);
  
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": image || "https://codewithamrendra.vercel.app/images/og-default.png",
    "datePublished": formattedDate,
    "dateModified": formattedDate,
    "wordCount": wordCount || undefined,
    "keywords": tags && tags.length > 0 ? tags.join(", ") : undefined,
    "author": {
      "@type": "Person",
      "name": "Amrendra Kumar",
      "url": "https://codewithamrendra.vercel.app"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Code with Amrendra",
      "logo": {
        "@type": "ImageObject",
        "url": "https://codewithamrendra.vercel.app/Profile%20photo.jpeg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://codewithamrendra.vercel.app/blog/${slug}`
    },
    "articleSection": category
  };
}

/**
 * Returns BreadcrumbList JSON-LD Schema.
 * @param {Array<{name: string, url: string}>} items
 */
export function getBreadcrumbSchema(items) {
  if (!Array.isArray(items)) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}
