-- Автори / користувачі
CREATE TABLE users
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    slug       VARCHAR(100) NOT NULL UNIQUE,
    email      VARCHAR(150) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    bio        TEXT,
    avatar_url VARCHAR(500),
    is_admin   BOOLEAN   DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Категорії
CREATE TABLE categories
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    slug        VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at  TIMESTAMP DEFAULT NOW()
);

-- Статті
CREATE TABLE articles
(
    id               SERIAL PRIMARY KEY,
    title            VARCHAR(300) NOT NULL,
    slug             VARCHAR(300) NOT NULL UNIQUE,
    excerpt          TEXT,
    content          TEXT         NOT NULL,
    cover_url        VARCHAR(500),
    author_id        INTEGER REFERENCES users (id),
    category_id      INTEGER REFERENCES categories (id),
    status           VARCHAR(20) DEFAULT 'draft',
    views            INTEGER     DEFAULT 0,
    meta_title       VARCHAR(300),
    meta_description VARCHAR(500),
    published_at     TIMESTAMP,
    created_at       TIMESTAMP   DEFAULT NOW(),
    updated_at       TIMESTAMP   DEFAULT NOW()
);

-- Теги
CREATE TABLE tags
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    slug       VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Зв'язок статей та тегів (many-to-many)
CREATE TABLE article_tags
(
    article_id INTEGER REFERENCES articles (id) ON DELETE CASCADE,
    tag_id     INTEGER REFERENCES tags (id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, tag_id)
);

-- Індекси для швидкого пошуку
CREATE INDEX idx_articles_slug ON articles (slug);
CREATE INDEX idx_articles_status ON articles (status);
CREATE INDEX idx_articles_category ON articles (category_id);
CREATE INDEX idx_articles_author ON articles (author_id);
CREATE INDEX idx_articles_published ON articles (published_at DESC);

-- Seed data
INSERT INTO users (name, slug, email, password, bio, is_admin)
VALUES ('Admin', 'admin', 'admin@itblog.pp.ua', '$2b$10$placeholder', 'Головний редактор IT Blog', true);

INSERT INTO categories (name, slug, description) VALUES
  ('JavaScript', 'javascript', 'JavaScript та Frontend розробка'),
  ('Backend', 'backend', 'Backend та DevOps'),
  ('AI та ML', 'ai-ml', 'Штучний інтелект та машинне навчання'),
  ('Кібербезпека', 'cybersecurity', 'Кібербезпека та захист даних'),
  ('Інструменти', 'tools', 'Огляди інструментів та технологій');
