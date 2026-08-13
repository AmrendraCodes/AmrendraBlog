import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;
let prismaClientInstance = null;

const dbUrl = process.env.DATABASE_URL;

function getPrismaClient() {
  if (prismaClientInstance) return prismaClientInstance;
  if (globalForPrisma.prisma) {
    prismaClientInstance = globalForPrisma.prisma;
    return prismaClientInstance;
  }

  try {
    prismaClientInstance = new PrismaClient({
      datasources: {
        db: {
          url: dbUrl,
        },
      },
      log: ['error'],
    });
    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prismaClientInstance;
    }
    return prismaClientInstance;
  } catch (err) {
    console.warn('PrismaClient init error:', err);
    return null;
  }
}

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
