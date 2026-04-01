-- E-E-A-T: додаємо соціальні посилання для авторів
ALTER TABLE users ADD COLUMN IF NOT EXISTS linkedin_url VARCHAR(500);
ALTER TABLE users ADD COLUMN IF NOT EXISTS github_url VARCHAR(500);

-- Оновлюємо seed-дані адміна
UPDATE users SET
  linkedin_url = 'https://linkedin.com/in/itblog-admin',
  github_url   = 'https://github.com/tkachmaksym-creator'
WHERE slug = 'admin';
