const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function check() {
  const users = await prisma.user.findMany();
  console.log('Users in database:');
  for (const u of users) {
    console.log(`- Email: ${u.email}, Role: ${u.role}, Name: ${u.name}`);
    const testPasswords = [
      'AdminPassword@2026',
      'Admin@1234',
      'admin123',
      'admin',
      'password',
      '123456',
      'Admin@123',
      'Amrendra@2026',
      'Amrendra@123',
    ];
    for (const p of testPasswords) {
      const match = await bcrypt.compare(p, u.passwordHash);
      if (match) {
        console.log(`  ===> MATCH FOUND for password: "${p}"`);
      }
    }
  }
}

check().catch(console.error).finally(() => prisma.$disconnect());
