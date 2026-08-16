const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (!process.env[key]) process.env[key] = value;
    }
  });
}

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
