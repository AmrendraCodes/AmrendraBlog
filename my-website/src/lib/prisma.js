import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

function createPrismaClient() {
  const client = new PrismaClient({
    log: [
      { emit: 'event', level: 'error' },
      { emit: 'event', level: 'warn' },
    ],
  });

  // Filter out benign idle connection drops from Neon Serverless / PgBouncer
  client.$on('error', (e) => {
    if (e.message?.includes('kind: Closed') || e.message?.includes('cause: None')) {
      // Benign: Neon Serverless / PgBouncer closes idle TCP connections when inactive.
      // Prisma automatically re-establishes connections on the next incoming query.
      return;
    }
    console.error('Prisma Database Error:', e.message || e);
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

