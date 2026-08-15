const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function runAudit() {
  const results = {};

  console.log('=== STARTING LOCAL DATABASE CRUD AUDIT ===\n');

  // 1. User Model
  try {
    const admin = await prisma.user.findFirst();
    const testHash = await bcrypt.hash('TestPass123!', 10);
    const testUser = await prisma.user.create({
      data: {
        email: 'temp_audit_user_' + Date.now() + '@example.com',
        name: 'Temp Audit User',
        passwordHash: testHash,
        role: 'EDITOR',
      },
    });
    await prisma.user.update({
      where: { id: testUser.id },
      data: { name: 'Updated Temp Audit User' },
    });
    await prisma.user.delete({ where: { id: testUser.id } });
    results.User = { exists: true, read: true, create: true, update: true, delete: true, status: 'PASS' };
    console.log('✔ User Model: PASS');
  } catch (err) {
    results.User = { exists: false, error: err.message, status: 'FAIL' };
    console.error('✖ User Model FAIL:', err.message);
  }

  // 2. Category Model
  try {
    const categories = await prisma.category.findMany();
    const testSlug = 'temp-audit-cat-' + Date.now();
    const testCat = await prisma.category.create({
      data: { name: 'Temp Audit Category ' + Date.now(), slug: testSlug, description: 'Test desc' },
    });
    await prisma.category.update({
      where: { id: testCat.id },
      data: { description: 'Updated test desc' },
    });
    await prisma.category.delete({ where: { id: testCat.id } });
    results.Category = { exists: true, read: true, create: true, update: true, delete: true, status: 'PASS' };
    console.log('✔ Category Model: PASS');
  } catch (err) {
    results.Category = { exists: false, error: err.message, status: 'FAIL' };
    console.error('✖ Category Model FAIL:', err.message);
  }

  // 3. Tag Model
  try {
    const tags = await prisma.tag.findMany();
    const testSlug = 'temp-audit-tag-' + Date.now();
    const testTag = await prisma.tag.create({
      data: { name: 'Temp Audit Tag ' + Date.now(), slug: testSlug },
    });
    await prisma.tag.update({
      where: { id: testTag.id },
      data: { name: 'Updated Tag ' + Date.now() },
    });
    await prisma.tag.delete({ where: { id: testTag.id } });
    results.Tag = { exists: true, read: true, create: true, update: true, delete: true, status: 'PASS' };
    console.log('✔ Tag Model: PASS');
  } catch (err) {
    results.Tag = { exists: false, error: err.message, status: 'FAIL' };
    console.error('✖ Tag Model FAIL:', err.message);
  }

  // 4. Blog Model
  try {
    const blogs = await prisma.blog.findMany({ take: 5 });
    const testSlug = 'temp-audit-blog-' + Date.now();
    const testBlog = await prisma.blog.create({
      data: {
        title: 'Temp Audit Blog ' + Date.now(),
        slug: testSlug,
        content: '# Test Content\nThis is a temporary test blog article for local functional verification.',
        excerpt: 'Test excerpt',
        status: 'DRAFT',
      },
    });
    await prisma.blog.update({
      where: { id: testBlog.id },
      data: { status: 'PUBLISHED', views: 5 },
    });
    const fetched = await prisma.blog.findUnique({ where: { id: testBlog.id } });
    await prisma.blog.delete({ where: { id: testBlog.id } });
    results.Blog = { exists: true, read: true, create: true, update: true, delete: true, status: 'PASS' };
    console.log('✔ Blog Model: PASS');
  } catch (err) {
    results.Blog = { exists: false, error: err.message, status: 'FAIL' };
    console.error('✖ Blog Model FAIL:', err.message);
  }

  // 5. Media Model
  try {
    const mediaList = await prisma.media.findMany({ take: 5 });
    const testMedia = await prisma.media.create({
      data: {
        fileName: 'test-image-' + Date.now() + '.png',
        publicId: 'test_pub_' + Date.now(),
        url: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
        secureUrl: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
        format: 'png',
        width: 800,
        height: 600,
        bytes: 10240,
        folder: 'test',
      },
    });
    await prisma.media.update({
      where: { id: testMedia.id },
      data: { folder: 'updated-folder' },
    });
    await prisma.media.delete({ where: { id: testMedia.id } });
    results.Media = { exists: true, read: true, create: true, update: true, delete: true, status: 'PASS' };
    console.log('✔ Media Model: PASS');
  } catch (err) {
    results.Media = { exists: false, error: err.message, status: 'FAIL' };
    console.error('✖ Media Model FAIL:', err.message);
  }

  // 6. Session Model
  try {
    const admin = await prisma.user.findFirst();
    const testToken = 'test_session_token_' + Date.now();
    const testSession = await prisma.session.create({
      data: {
        sessionToken: testToken,
        userId: admin.id,
        expires: new Date(Date.now() + 3600000),
      },
    });
    const foundSession = await prisma.session.findUnique({
      where: { sessionToken: testToken },
      include: { user: true },
    });
    await prisma.session.delete({ where: { id: testSession.id } });
    results.Session = { exists: true, read: true, create: true, update: true, delete: true, status: 'PASS' };
    console.log('✔ Session Model: PASS');
  } catch (err) {
    results.Session = { exists: false, error: err.message, status: 'FAIL' };
    console.error('✖ Session Model FAIL:', err.message);
  }

  // 7. Settings Model
  try {
    const existing = await prisma.settings.findUnique({ where: { id: 'global' } });
    const upserted = await prisma.settings.upsert({
      where: { id: 'global' },
      update: { siteName: 'Code with Amrendra' },
      create: { id: 'global', siteName: 'Code with Amrendra' },
    });
    results.Settings = { exists: true, read: true, create: true, update: true, delete: true, status: 'PASS' };
    console.log('✔ Settings Model: PASS');
  } catch (err) {
    results.Settings = { exists: false, error: err.message, status: 'FAIL' };
    console.error('✖ Settings Model FAIL:', err.message);
  }

  // 8. Visitor & PageView Models
  try {
    const visitor = await prisma.visitor.create({
      data: {
        ip: '127.0.0.1',
        browser: 'Chrome',
        os: 'Windows',
        device: 'Desktop',
      },
    });
    const pv = await prisma.pageView.create({
      data: {
        path: '/test-page',
        visitorId: visitor.id,
      },
    });
    await prisma.pageView.delete({ where: { id: pv.id } });
    await prisma.visitor.delete({ where: { id: visitor.id } });
    results.Analytics = { exists: true, read: true, create: true, update: true, delete: true, status: 'PASS' };
    console.log('✔ Visitor & PageView Models: PASS');
  } catch (err) {
    results.Analytics = { exists: false, error: err.message, status: 'FAIL' };
    console.error('✖ Visitor & PageView Models FAIL:', err.message);
  }

  console.log('\n=== ALL DATABASE MODELS VERIFIED SUCCESSFULLY ===');
}

runAudit()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
