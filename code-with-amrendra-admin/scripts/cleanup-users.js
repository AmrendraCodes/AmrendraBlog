const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function cleanup() {
  const deleted = await p.user.deleteMany({
    where: { email: { not: 'codewithamrendra@outlook.com' } },
  });
  console.log('Cleaned extra users count:', deleted.count);
}

cleanup().catch(console.error).finally(() => p.$disconnect());
