const express = require('express');
const router = express.Router();
const multer = require('multer');

// Використовуємо memoryStorage, щоб не зберігати файли на диск (зручно для Railway)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // Ліміт: 5 MB
  }
});

// GET /api/images/:id - Віддача картинки з бази
router.get('/:id', async (req, res) => {
  const db = req.app.locals.db;
  try {
    const result = await db.query(
      'SELECT mime_type, data FROM images WHERE id = $1',
      [req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const image = result.rows[0];
    res.set('Content-Type', image.mime_type);
    res.set('Cache-Control', 'public, max-age=31536000'); // Кешування браузером
    res.send(image.data);
  } catch (err) {
    if (err.code === '22P02') { // Неправильний синтаксис UUID
      return res.status(404).json({ error: 'Image not found (invalid UUID)' });
    }
    console.error(err);
    res.status(500).json({ error: 'Server error retrieving image' });
  }
});

// POST /api/images - Збереження нової картинки в базу
router.post('/', upload.single('image'), async (req, res) => {
  const db = req.app.locals.db;
  
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded. Make sure field name is "image".' });
  }

  try {
    const result = await db.query(
      'INSERT INTO images (filename, mime_type, size, data) VALUES ($1, $2, $3, $4) RETURNING id',
      [req.file.originalname, req.file.mimetype, req.file.size, req.file.buffer]
    );
    
    const id = result.rows[0].id;
    // URL, по якому тепер доступна картинка
    res.json({
      success: true,
      data: {
        id: id,
        url: `/api/images/${id}`
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error saving image' });
  }
});

module.exports = router;
