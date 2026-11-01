import { PrismaClient } from '@prisma/client';
import dns from 'node:dns';

// Ensure IPv4 is prioritized to avoid slow or failing IPv6 routes on Indian ISPs/hotspots
if (typeof dns.setDefaultResultOrder === 'function') {
  dns.setDefaultResultOrder('ipv4first');
}

const globalForPrisma = globalThis;

function createPrismaClient() {
  const client = new PrismaClient({
    log: [
      { emit: 'event', level: 'error' },
      { emit: 'event', level: 'warn' },
    ],
  });

  // Filter out benign connection events from Neon Serverless / PgBouncer
  client.$on('error', (e) => {
    const msg = e.message || String(e);
    if (
      msg.includes('kind: Closed') ||
      msg.includes('cause: None') ||
      msg.includes("Can't reach database server") ||
      msg.includes('P1001')
    ) {
      // Benign: Neon Serverless sleeping, idle drop, or wake-up handshake.
      // The application loader handles automatic retry and markdown fallback.
      return;
    }
    console.error('Prisma Database Error:', msg);
  });

  client.$on('warn', (e) => {
    console.warn('Prisma Database Warning:', e.message || e);
  });

  return client;
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
