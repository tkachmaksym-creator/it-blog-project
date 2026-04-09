const fs = require('fs');
const path = require('path');

const MIGRATIONS_DIR = path.join(__dirname, '..', 'migrations');

async function runMigrations(pool) {
  // Створюємо таблицю для відстеження міграцій
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename VARCHAR(255) PRIMARY KEY,
      applied_at TIMESTAMP DEFAULT NOW()
    )
  `);

  // Отримуємо список вже виконаних міграцій
  const { rows: applied } = await pool.query(
    'SELECT filename FROM schema_migrations'
  );
  const appliedSet = new Set(applied.map((r) => r.filename));

  // Читаємо всі .sql файли в порядку
  const files = fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    if (appliedSet.has(file)) {
      console.log(`[migrate] skip: ${file}`);
      continue;
    }

    const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8');
    console.log(`[migrate] applying: ${file}`);

    await pool.query('BEGIN');
    try {
      await pool.query(sql);
      await pool.query(
        'INSERT INTO schema_migrations (filename) VALUES ($1)',
        [file]
      );
      await pool.query('COMMIT');
      console.log(`[migrate] done: ${file}`);
    } catch (err) {
      await pool.query('ROLLBACK');
      console.error(`[migrate] FAILED: ${file}`, err.message);
      throw err;
    }
  }

  console.log('[migrate] all migrations applied');
}

module.exports = { runMigrations };
