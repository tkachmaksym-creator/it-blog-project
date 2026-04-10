import { getArticles, getCategories } from '@/lib/api';
import Link from 'next/link';

export const revalidate = 60;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function HomePage() {
  const [{ data: articles, meta }, { data: categories }] = await Promise.all([
    getArticles(),
    getCategories(),
  ]);

  return (
    <div className="layout-with-sidebar">
      <div className="layout-main">
        <div className="article-list">
        {articles?.map((article: {
          slug: string;
          cover_url?: string;
          title: string;
          category_name?: string;
          category_slug?: string;
          excerpt?: string;
          author_name?: string;
          published_at?: string;
          views?: number;
        }) => (
          <div key={article.slug} className="win-box article-window">
            <div className="win-box-title">
              <span>▪ {article.title}</span>
            </div>
            <div className="win-box-body flex-list-item">
              {article.cover_url && (
                <div className="article-thumb">
                  <img src={article.cover_url} alt={article.title} />
                </div>
              )}
              <div className="article-details">
                {article.category_name && (
                  <span className="category-badge">{article.category_name}</span>
                )}
                {article.excerpt && (
                  <p className="article-excerpt">
                    {article.excerpt}...
                  </p>
                )}
                <div className="article-meta">
                  Автор: {article.author_name} &nbsp;|&nbsp; Дата: {article.published_at ? formatDate(article.published_at) : ''} &nbsp;|&nbsp; 👁 {article.views || 0}
                </div>
                <div className="article-actions">
                  <Link href={`/articles/${article.slug}`} className="win-btn">
                    Читати далі »
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {meta && meta.totalPages > 1 && (
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ color: '#000' }}>
            Сторінка 1 з {meta.totalPages}
          </span>
        </div>
      )}
      </div>

      <aside className="layout-sidebar">
        <div className="win-box">
          <div className="win-box-title">
            <span>► Про портал</span>
          </div>
          <div className="win-box-body">
            <p><strong>ІПЗ-педія</strong> — незалежний вісник кафедри.</p>
            <p style={{ marginTop: '5px' }}>Віщаємо про програмування, пристрої та штучний інтелект у класичному форм-факторі.</p>
            <p style={{ marginTop: '5px', fontStyle: 'italic', fontWeight: 'bold', color: '#000080' }}>*Завдяки нам дорогою буде не тільки оперативна пам'ять.</p>
            <br />
            <Link href="/about" className="win-btn" style={{ display: 'block', textAlign: 'center' }}>Детальніше</Link>
          </div>
        </div>

        <div className="win-box">
          <div className="win-box-title">
            <span>► Літопис (Архів)</span>
          </div>
          <div className="win-box-body">
            <ul style={{ listStyleType: 'square', marginLeft: '16px', lineHeight: '1.8' }}>
              <li><a href="/">Квітень 2026</a></li>
              <li><a href="/">Березень 2026</a></li>
              <li><a href="/">Лютий 2026</a></li>
              <li><a href="/">Січень 2026</a></li>
            </ul>
          </div>
        </div>

        <div className="win-box">
          <div className="win-box-title">
            <span>► Дружні вузли</span>
          </div>
          <div className="win-box-body">
            <a href="https://chnu.edu.ua/" target="_blank" rel="noreferrer" style={{ display: 'block', marginBottom: '4px' }}>▪ ЧНУ ім. Ю. Федьковича</a>
            <a href="https://nextjs.org/" target="_blank" rel="noreferrer" style={{ display: 'block', marginBottom: '4px' }}>▪ Каркас Next.js</a>
            <a href="https://www.postgresql.org/" target="_blank" rel="noreferrer" style={{ display: 'block' }}>▪ СКБД PostgreSQL</a>
          </div>
        </div>
      </aside>
    </div>
  );
}
