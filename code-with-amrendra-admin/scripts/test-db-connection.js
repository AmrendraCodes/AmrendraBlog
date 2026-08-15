const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  console.log('====================================================');
  console.log('🔍 DATABASE CONNECTION DIAGNOSTIC TOOL');
  console.log('====================================================\n');

  const rawUrl = process.env.DATABASE_URL;

  // 1. Environment Variable Check
  if (!rawUrl) {
    console.error('❌ FAIL: DATABASE_URL environment variable is NOT SET in this environment.');
    console.error('👉 Action: Set DATABASE_URL in your hosting platform (Vercel/Render) or .env file.\n');
    process.exit(1);
  }

  // 2. Format & Protocol Inspection (Masked)
  try {
    let protocol = '';
    let host = '';
    let dbName = '';
    let hasSsl = false;

    if (rawUrl.startsWith('file:')) {
      protocol = 'sqlite (file:)';
      console.log(`📁 Datasource Type: SQLite local file`);
      console.log(`⚠️  Warning: SQLite is NOT suitable for Vercel/Serverless deployments!`);
    } else {
      const parsed = new URL(rawUrl);
      protocol = parsed.protocol;
      host = parsed.hostname + (parsed.port ? `:${parsed.port}` : '');
      dbName = parsed.pathname.replace(/^\//, '');
      hasSsl = parsed.searchParams.get('sslmode') === 'require' || parsed.searchParams.get('ssl') === 'true';

      console.log(`🌐 Datasource Protocol: ${protocol}`);
      console.log(`🖥️  Host:               ${host}`);
      console.log(`🗄️  Database:           ${dbName || 'default'}`);
      console.log(`🔒 SSL Mode:            ${hasSsl ? 'sslmode=require (Enabled)' : 'Not explicitly set'}`);
    }
  } catch (err) {
    console.warn('⚠️  Could not parse DATABASE_URL as URL. Raw format may be non-standard.');
  }

  console.log('\n⏳ Attempting Prisma Client connection...');

  const prisma = new PrismaClient({
    log: ['error'],
  });

  const startTime = Date.now();

  try {
    // 3. Test Direct Connection
    await prisma.$connect();
    const duration = Date.now() - startTime;
    console.log(`✅ SUCCESS: Connected to database in ${duration}ms!\n`);

    // 4. Test Model & Table Queries
    console.log('⏳ Checking required database tables...');
    try {
      const userCount = await prisma.user.count();
      console.log(`✅ User table exists (Total records: ${userCount})`);
    } catch (tblErr) {
      if (tblErr.code === 'P2021') {
        console.error('❌ Table missing: The "User" table does not exist in this database.');
        console.error('👉 Action: Run "npx prisma db push" to create tables.');
      } else {
        console.error('⚠️  Query error on User table:', tblErr.message);
      }
    }

    try {
      const blogCount = await prisma.blog.count();
      console.log(`✅ Blog table exists (Total records: ${blogCount})`);
    } catch (tblErr) {
      if (tblErr.code === 'P2021') {
        console.error('❌ Table missing: The "Blog" table does not exist in this database.');
        console.error('👉 Action: Run "npx prisma db push" to create tables.');
      }
    }

    console.log('\n====================================================');
    console.log('🎉 DATABASE IS FULLY REACHABLE AND FUNCTIONAL!');
    console.log('====================================================\n');
  } catch (error) {
    console.error('\n❌ DATABASE CONNECTION FAILED:');
    console.error(`Error Code: ${error.code || 'UNKNOWN'}`);
    console.error(`Message:    ${error.message}\n`);

    console.log('📋 ROOT CAUSE DIAGNOSIS:');
    if (error.code === 'P1000') {
      console.log('👉 Authentication failed: Database user or password in DATABASE_URL is incorrect.');
    } else if (error.code === 'P1001') {
      console.log("👉 Database host unreachable: Check host, port, internet connection, or firewall/allowed IP settings.");
    } else if (error.code === 'P1003') {
      console.log('👉 Database does not exist on the database server.');
    } else if (error.message && error.message.includes('the URL must start with')) {
      console.log('👉 Protocol mismatch: schema.prisma provider does not match DATABASE_URL protocol.');
    } else {
      console.log('👉 General network or connection string error. Verify your connection string format.');
    }
    console.log('====================================================\n');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
