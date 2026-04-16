-- 007 Final Content Polish
-- Terminology and Content Update

-- 1. Sync Categories just in case
UPDATE categories SET name = 'Програмування' WHERE slug = 'programming';

-- 2. Terminology replacements everywhere
UPDATE articles SET content = replace(content, 'кафедра ІПЗ', 'спеціальність ІПЗ');
UPDATE articles SET content = replace(content, 'Кафедра ІПЗ', 'Спеціальність ІПЗ');
UPDATE articles SET content = replace(content, 'Інститут ІФТКН', 'ІФТКН');

-- 3. Update the two main articles with FINAL polished text
UPDATE articles SET 
  title = 'Огляд старих добрих Windows-стилів (Y2K)',
  excerpt = 'Тренди циклічні, і сьогодні ми бачимо тріумфальне повернення до естетики Windows 95/98. Бевельовані кнопки, сірі фони та піксельні шрифти — це не просто ностальгія, а функціональний дизайн, який цінують справжні професіонали. Читайте про те, чому Y2K-стиль знову в моді та як він впливає на сучасний веб-дизайн у 2026 році.',
  content = '<p>Тренди циклічні, і сьогодні ми бачимо тріумфальне повернення до естетики Windows 95/98. Бевельовані кнопки, сірі фони та піксельні шрифти — це не просто ностальгія, а функціональний дизайн, який цінують справжні професіонали. Читайте про те, чому Y2K-стиль знову в моді та як він впливає на сучасний веб-дизайн у 2026 році.</p>
  <p>Сучасний інтернет став занадто чистим і "пласким". Flat-дизайн, мінімалізм, багато вільного простору — це добре, але іноді хочеться душі!</p>
  <p>Саме тому ми обрали дизайн епохи 2000-х для нашого блогу. Темно-сині заголовки вікон, кнопки з чіткими межами (border cut), яскраві кольори та рядки, що біжать. Це не просто стиль, це <strong>ностальгія за часами</strong>, коли інтернет був чимось новим і незвіданим.</p>',
  meta_title = 'Стиль Y2K у веб-дизайні | ІПЗ-педія',
  meta_description = 'Аналіз Y2K стилю, Windows 98 епохи та дизайну початку 2000-х.'
WHERE slug = 'y2k-windows-style-review';

UPDATE articles SET 
  title = 'Чому ІФТКН найкращий для ІПЗ',
  excerpt = 'ІФТКН — це не лише про програмування. Це про процес, у якому ти поступово переходиш від базових речей до реальних задач, з якими стикаються в індустрії.',
  content = '<p>ІФТКН — це не лише про програмування. Це про процес, у якому ти поступово переходиш від базових речей до реальних задач, з якими стикаються в індустрії.</p>
  <p>Спеціальність ІПЗ у Чернівецькому національному університеті дає не тільки теоретичну базу, а й постійну практику. Замість абстрактних прикладів — проєкти, дедлайни і спроби зробити щось, що реально працює.</p>
  <p>З часом змінюється підхід: важливим стає не те, що ти знаєш, а те, що ти можеш реалізувати. Саме через це з’являються перші серйозні роботи, командні проєкти і досвід, який вже можна показати.</p>
  <p>Цей портал — один із прикладів такого підходу. Він не ідеальний, але відображає головну ідею: навчання через практику і постійний розвиток.</p>',
  meta_title = 'Чому ІФТКН найкращий для ІПЗ | ІПЗ-педія',
  meta_description = 'Дізнайтесь про переваги навчання на спеціальності ІПЗ в ІФТКН ЧНУ.'
WHERE slug = 'why-ipz-is-the-best';

-- 4. Ensure tags exist and are associated
INSERT INTO tags (name, slug) VALUES ('SEO', 'seo') ON CONFLICT (slug) DO NOTHING;
INSERT INTO tags (name, slug) VALUES ('Retro', 'retro') ON CONFLICT (slug) DO NOTHING;
INSERT INTO tags (name, slug) VALUES ('Windows', 'windows') ON CONFLICT (slug) DO NOTHING;
INSERT INTO tags (name, slug) VALUES ('Hardware', 'hardware') ON CONFLICT (slug) DO NOTHING;
INSERT INTO tags (name, slug) VALUES ('AI', 'ai') ON CONFLICT (slug) DO NOTHING;
INSERT INTO tags (name, slug) VALUES ('Next.js', 'nextjs') ON CONFLICT (slug) DO NOTHING;

-- Article 9: y2k-windows-style-review
INSERT INTO article_tags (article_id, tag_id) SELECT id, (SELECT id FROM tags WHERE slug = 'retro') FROM articles WHERE slug = 'y2k-windows-style-review' ON CONFLICT DO NOTHING;
INSERT INTO article_tags (article_id, tag_id) SELECT id, (SELECT id FROM tags WHERE slug = 'windows') FROM articles WHERE slug = 'y2k-windows-style-review' ON CONFLICT DO NOTHING;

-- Article 8: why-ipz-is-the-best
INSERT INTO article_tags (article_id, tag_id) SELECT id, (SELECT id FROM tags WHERE slug = 'nextjs') FROM articles WHERE slug = 'why-ipz-is-the-best' ON CONFLICT DO NOTHING;
INSERT INTO article_tags (article_id, tag_id) SELECT id, (SELECT id FROM tags WHERE slug = 'seo') FROM articles WHERE slug = 'why-ipz-is-the-best' ON CONFLICT DO NOTHING;
