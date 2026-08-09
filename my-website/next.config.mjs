import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'lenis', 'three', 'katex', 'highlight.js', 'react-markdown', 'gray-matter', 'mermaid'],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000,
  },
  async redirects() {
    const adminUrl = process.env.ADMIN_APP_URL || 'https://amrendra-cms-blog-five.vercel.app';
    return [
      {
        source: '/admin',
        destination: `${adminUrl}/login`,
        permanent: false,
      },
      {
        source: '/admin/login',
        destination: `${adminUrl}/login`,
        permanent: false,
      },
      {
        source: '/admin/dashboard',
        destination: `${adminUrl}/dashboard`,
        permanent: false,
      },
      {
        source: '/blog',
        destination: '/resources/blog',
        permanent: true,
      },
      {
        source: '/blog/:slug*',
        destination: '/resources/blog/:slug*',
        permanent: true,
      },
      {
        source: '/case-studies',
        destination: '/resources/case-studies',
        permanent: true,
      },
      {
        source: '/case-studies/:slug*',
        destination: '/resources/case-studies/:slug*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/(.*)\\.(jpg|jpeg|png|gif|svg|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(favicon\\.ico|apple-icon\\.png|icon-.*\\.png|manifest\\.json)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
