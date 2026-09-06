// ============================================================================
// CRITICAL: DO NOT REMOVE THIS DNS RESOLUTION RULE OR DANGEROUSLYALLOWLOCALIP.
// In India and other regions with IPv6/NAT64 networks (Jio, Airtel, etc.),
// Vercel Blob domains synthesize to RFC 6052 NAT64 IPv6 addresses ("64:ff9b::*").
// Next.js classifies that as a private IP and blocks images with SSRF errors.
// dns.setDefaultResultOrder('ipv4first') + dangerouslyAllowLocalIP: true + 
// dev unoptimized: true guarantee that images ALWAYS load without errors.
// ============================================================================
import dns from 'node:dns';
import type { NextConfig } from "next";

if (typeof dns.setDefaultResultOrder === 'function') {
  dns.setDefaultResultOrder('ipv4first');
}

const nextConfig: NextConfig = {
  images: {
    // Permanent Protection against NAT64 / IPv6 synthetic private IP blocks
    dangerouslyAllowLocalIP: true,
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: '*.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'xep8svllvrhjgb7a.public.blob.vercel-storage.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
