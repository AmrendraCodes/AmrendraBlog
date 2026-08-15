const { DatabaseSync } = require('node:sqlite');
const path = require('path');

try {
  const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');
  const db = new DatabaseSync(dbPath);
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  console.log('Tables found in dev.db:');
  console.log(tables.map(t => t.name));

  for (const t of tables) {
    if (t.name.startsWith('_')) continue;
    const count = db.prepare(`SELECT count(*) as cnt FROM "${t.name}"`).get();
    console.log(`- ${t.name}: ${count.cnt} rows`);
  }
} catch (err) {
  console.error('Error inspecting SQLite db:', err.message);
}
