import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

let prismaClientInstance = null;

function getPrismaClient() {
  if (prismaClientInstance) return prismaClientInstance;
  if (globalForPrisma.prisma) {
    prismaClientInstance = globalForPrisma.prisma;
    return prismaClientInstance;
  }

  try {
    prismaClientInstance = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error'] : ['error'],
    });
    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prismaClientInstance;
    }
    return prismaClientInstance;
  } catch (err) {
    console.warn('⚠️ PrismaClient initialization deferred:', err.message);
    return null;
  }
}

export const prisma = new Proxy(
  {},
  {
    get(_target, prop) {
      const client = getPrismaClient();
      if (!client) {
        throw new Error('Prisma Client is deferred.');
      }
      return client[prop];
    },
  }
);

export default prisma;
