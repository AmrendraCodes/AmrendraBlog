const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL || 'codewithamrendra@outlook.com').trim().toLowerCase();
  const name = process.env.ADMIN_NAME || 'Amrendra Kumar';
  const password = process.env.ADMIN_PASSWORD || 'AdminPassword@2026';
  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      role: 'ADMIN',
    },
    create: {
      name,
      email,
      passwordHash,
      role: 'ADMIN',
    },
  });

  console.log('----------------------------------------------------');
  console.log('✅ Admin User Successfully Seeded/Updated in Database!');
  console.log(`👤 Name:     ${admin.name}`);
  console.log(`📧 Email:    ${admin.email}`);
  console.log(`🛡️  Role:     ${admin.role}`);
  console.log('----------------------------------------------------');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e.message || e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
