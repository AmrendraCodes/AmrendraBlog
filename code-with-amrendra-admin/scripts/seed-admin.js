const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'codewithamrendra@outlook.com';
  const temporaryPassword = 'AdminPassword@2026';
  const passwordHash = await bcrypt.hash(temporaryPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      role: 'ADMIN',
    },
    create: {
      name: 'Amrendra Kumar',
      email,
      passwordHash,
      role: 'ADMIN',
    },
  });

  console.log('----------------------------------------------------');
  console.log('✅ Admin User Successfully Seeded!');
  console.log(`👤 Name:     ${admin.name}`);
  console.log(`📧 Email:    ${admin.email}`);
  console.log(`🔑 Password: ${temporaryPassword}`);
  console.log(`🛡️  Role:     ${admin.role}`);
  console.log('----------------------------------------------------');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
