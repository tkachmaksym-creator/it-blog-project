require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const { runMigrations } = require('./migrate');
const articlesRouter = require('./routes/articles');
const categoriesRouter = require('./routes/categories');
const tagsRouter = require('./routes/tags');
const authorsRouter = require('./routes/authors');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3001;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
app.locals.db = pool;

app.use(cors());
app.use(express.json());

app.use('/api/articles', articlesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/tags', tagsRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/auth', authRouter);

app.get('/api/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json({ data: [], meta: { total: 0, page: 1, perPage: 10, totalPages: 0 } });

  try {
    const result = await pool.query(
      `SELECT a.*, u.name as author_name, c.name as category_name
       FROM articles a
       LEFT JOIN users u ON a.author_id = u.id
       LEFT JOIN categories c ON a.category_id = c.id
       WHERE a.status = 'published'
         AND (a.title ILIKE $1 OR a.content ILIKE $1 OR a.excerpt ILIKE $1)
       ORDER BY a.published_at DESC
       LIMIT 10`,
      [`%${q}%`]
    );
    res.json({ data: result.rows });
  } catch (err) {
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: err.message } });
  }
});

runMigrations(pool)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Migration failed, shutting down:', err.message);
    process.exit(1);
  });
