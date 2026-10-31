import { siteMetadata } from '@/config/seo';

export function createToolMetadata(tool) {
  const title = tool.seo?.title || `${tool.title} | Code with Amrendra`;
  const description = tool.seo?.description || tool.description;
  const url = `${siteMetadata.siteUrl}${tool.route}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [{ url: siteMetadata.ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [siteMetadata.ogImage] },
  };
}
