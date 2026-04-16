-- 008 Team roles and author attribution for E-E-A-T signals

UPDATE users SET
  name = 'Максим Ткач',
  email = 'admin@ipzpedia.pp.ua',
  bio = 'Творець платформи та технічний спеціаліст ІПЗ-педії. Відповідає за архітектуру Next.js frontend, Express API, PostgreSQL, технічне SEO, sitemap, robots.txt і якість деплою.',
  avatar_url = '/images/maksym-avatar.jpg',
  linkedin_url = 'https://linkedin.com/in/tkachmaksym',
  github_url = 'https://github.com/tkachmaksym-creator'
WHERE slug = 'admin';

INSERT INTO users (name, slug, email, password, bio, avatar_url, is_admin, linkedin_url, github_url)
VALUES (
  'Олексій Іванов',
  'oleksii-ivanov',
  'oleksii.ivanov@ipzpedia.pp.ua',
  '$2b$10$placeholder',
  'Автор матеріалів про веб-дизайн, ретро-естетику, UX-патерни та користувацький досвід. Допомагає пояснювати візуальні рішення ІПЗ-педії зрозумілою мовою.',
  '/images/alex-avatar.jpg',
  false,
  'https://linkedin.com/in/oleksii-ivanov',
  'https://github.com'
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  bio = EXCLUDED.bio,
  avatar_url = EXCLUDED.avatar_url,
  linkedin_url = EXCLUDED.linkedin_url,
  github_url = EXCLUDED.github_url;

INSERT INTO users (name, slug, email, password, bio, avatar_url, is_admin, linkedin_url, github_url)
VALUES (
  'Максим Яцко',
  'maksym-yatsko',
  'maksym.yatsko@ipzpedia.pp.ua',
  '$2b$10$placeholder',
  'Редакційний асистент і координатор тем. Допомагає підтримувати єдиний стиль матеріалів, перевіряти зрозумілість формулювань і узгоджувати теми навчального блогу.',
  null,
  false,
  null,
  null
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  bio = EXCLUDED.bio,
  avatar_url = EXCLUDED.avatar_url,
  linkedin_url = EXCLUDED.linkedin_url,
  github_url = EXCLUDED.github_url;

UPDATE articles
SET author_id = (SELECT id FROM users WHERE slug = 'oleksii-ivanov')
WHERE slug = 'y2k-windows-style-review';
