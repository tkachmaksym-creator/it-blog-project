const express = require('express');
const router = express.Router();

router.get('/:slug', async (req, res) => {
  const db = req.app.locals.db;
  try {
    const result = await db.query(
      'SELECT id, name, slug, bio, avatar_url, created_at FROM users WHERE slug = $1',
      [req.params.slug]
    );
    if (!result.rows.length) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Author not found' } });
    }
    res.json({ data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: err.message } });
  }
});

router.get('/:slug/articles', async (req, res) => {
  const db = req.app.locals.db;
  const { page = 1, perPage = 10 } = req.query;
  const offset = (page - 1) * perPage;

  try {
    const [articles, count] = await Promise.all([
      db.query(
        `SELECT a.id, a.title, a.slug, a.excerpt, a.cover_url, a.published_at,
                c.name as category_name, c.slug as category_slug
         FROM articles a
         LEFT JOIN users u ON a.author_id = u.id
         LEFT JOIN categories c ON a.category_id = c.id
         WHERE u.slug = $1 AND a.status = 'published'
         ORDER BY a.published_at DESC LIMIT $2 OFFSET $3`,
        [req.params.slug, perPage, offset]
      ),
      db.query(
        `SELECT COUNT(*) FROM articles a LEFT JOIN users u ON a.author_id = u.id WHERE u.slug = $1 AND a.status = 'published'`,
        [req.params.slug]
      ),
    ]);

    const total = parseInt(count.rows[0].count);
    res.json({
      data: articles.rows,
      meta: { total, page: Number(page), perPage: Number(perPage), totalPages: Math.ceil(total / perPage) },
    });
  } catch (err) {
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: err.message } });
  }
});

module.exports = router;
