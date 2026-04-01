const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const db = req.app.locals.db;
  const { page = 1, perPage = 10, category } = req.query;
  const offset = (page - 1) * perPage;

  try {
    let where = "a.status = 'published'";
    const params = [perPage, offset];

    if (category) {
      where += ` AND c.slug = $3`;
      params.push(category);
    }

    const [articles, count] = await Promise.all([
      db.query(
        `SELECT a.id, a.title, a.slug, a.excerpt, a.cover_url, a.views, a.published_at,
                u.name as author_name, u.slug as author_slug,
                c.name as category_name, c.slug as category_slug
         FROM articles a
         LEFT JOIN users u ON a.author_id = u.id
         LEFT JOIN categories c ON a.category_id = c.id
         WHERE ${where}
         ORDER BY a.published_at DESC
         LIMIT $1 OFFSET $2`,
        params
      ),
      db.query(`SELECT COUNT(*) FROM articles a LEFT JOIN categories c ON a.category_id = c.id WHERE ${where}`, params.slice(2)),
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

router.get('/:slug', async (req, res) => {
  const db = req.app.locals.db;
  try {
    const result = await db.query(
      `SELECT a.*, u.name as author_name, u.slug as author_slug, u.bio as author_bio,
              u.avatar_url as author_avatar_url,
              c.name as category_name, c.slug as category_slug
       FROM articles a
       LEFT JOIN users u ON a.author_id = u.id
       LEFT JOIN categories c ON a.category_id = c.id
       WHERE a.slug = $1 AND a.status = 'published'`,
      [req.params.slug]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Article not found' } });
    }

    await db.query('UPDATE articles SET views = views + 1 WHERE slug = $1', [req.params.slug]);
    res.json({ data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: err.message } });
  }
});

router.get('/:slug/related', async (req, res) => {
  const db = req.app.locals.db;
  try {
    const article = await db.query('SELECT category_id FROM articles WHERE slug = $1', [req.params.slug]);
    if (!article.rows.length) return res.json({ data: [] });

    const result = await db.query(
      `SELECT a.id, a.title, a.slug, a.excerpt, a.cover_url, a.published_at
       FROM articles a
       WHERE a.category_id = $1 AND a.slug != $2 AND a.status = 'published'
       ORDER BY a.published_at DESC LIMIT 5`,
      [article.rows[0].category_id, req.params.slug]
    );
    res.json({ data: result.rows });
  } catch (err) {
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: err.message } });
  }
});

module.exports = router;
