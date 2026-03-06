const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const db = req.app.locals.db;
  try {
    const result = await db.query('SELECT * FROM tags ORDER BY name');
    res.json({ data: result.rows });
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
                u.name as author_name, u.slug as author_slug
         FROM articles a
         LEFT JOIN users u ON a.author_id = u.id
         LEFT JOIN article_tags at ON a.id = at.article_id
         LEFT JOIN tags t ON at.tag_id = t.id
         WHERE t.slug = $1 AND a.status = 'published'
         ORDER BY a.published_at DESC LIMIT $2 OFFSET $3`,
        [req.params.slug, perPage, offset]
      ),
      db.query(
        `SELECT COUNT(*) FROM articles a
         LEFT JOIN article_tags at ON a.id = at.article_id
         LEFT JOIN tags t ON at.tag_id = t.id
         WHERE t.slug = $1 AND a.status = 'published'`,
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
