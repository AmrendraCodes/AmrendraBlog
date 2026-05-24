export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://amrendra-blog.vercel.app/sitemap.xml',
  };
}
