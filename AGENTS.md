# Agent & Developer Guidelines — Code with Amrendra Repository

## Critical Image Optimization Rules (DO NOT MODIFY OR DELETE)

In `my-website/next.config.mjs` and `code-with-amrendra-admin/next.config.ts`, the following image configuration must **ALWAYS** be preserved:

1. **DNS IPv4 Resolution Priority:**
   ```javascript
   import dns from 'node:dns';
   if (typeof dns.setDefaultResultOrder === 'function') {
     dns.setDefaultResultOrder('ipv4first');
   }
   ```
2. **Local/Private IP Allowance:**
   ```javascript
   images: {
     dangerouslyAllowLocalIP: true,
     unoptimized: process.env.NODE_ENV === 'development',
     remotePatterns: [ ... ]
   }
   ```

### Why this is mandatory:
- Users accessing the site or running development servers in India (and other regions utilizing IPv6 + DNS64/NAT64 translation like Jio / Airtel) receive synthetic IPv6 addresses (prefix `64:ff9b::/96` per RFC 6052) for Vercel Blob domains (`*.public.blob.vercel-storage.com`).
- Next.js's built-in SSRF protection blocks this synthetic IPv6 subnet as a private IP, causing all blog images to throw `upstream image ... resolved to private ip` and break with 500 errors.
- `dns.setDefaultResultOrder('ipv4first')` + `dangerouslyAllowLocalIP: true` + dev `unoptimized: true` ensures images load instantly and reliably in both development and production environments.
