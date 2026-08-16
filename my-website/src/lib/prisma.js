import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

let prismaInstance = globalForPrisma.prisma;

function getPrismaClient() {
  if (prismaInstance) return prismaInstance;

  try {
    prismaInstance = new PrismaClient({
      log: ['error'],
    });

    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prismaInstance;
    }

    return prismaInstance;
  } catch (err) {
    console.error('Prisma initialization failed:', err);
    throw err;
  }
}

export const prisma = new Proxy(
  {},
  {
    get(_target, prop) {
      const client = getPrismaClient();
      return client[prop];
    },
  }
);

export default prisma;
