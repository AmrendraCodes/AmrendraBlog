import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

let prismaClientInstance = null;

function getPrismaClient() {
  // If DATABASE_URL is not set (e.g. running locally without DB), defer Prisma safely
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (prismaClientInstance) return prismaClientInstance;
  if (globalForPrisma.prisma) {
    prismaClientInstance = globalForPrisma.prisma;
    return prismaClientInstance;
  }

  try {
    prismaClientInstance = new PrismaClient({
      log: ['error'],
    });
    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prismaClientInstance;
    }
    return prismaClientInstance;
  } catch (err) {
    return null;
  }
}

// Safe dummy proxy for local dev when DATABASE_URL is not present
const dummyModelProxy = new Proxy(
  {},
  {
    get() {
      return async () => null;
    },
  }
);

export const prisma = new Proxy(
  {},
  {
    get(_target, prop) {
      const client = getPrismaClient();
      if (!client) {
        return dummyModelProxy;
      }
      return client[prop];
    },
  }
);

export default prisma;
