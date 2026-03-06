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
    <>
      <section style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link href="/" style={{ padding: '0.4rem 1rem', background: '#1f2937', color: 'white', borderRadius: 20, fontSize: '0.9rem' }}>
            Всі
          </Link>
          {categories?.map((cat: { slug: string; name: string }) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              style={{ padding: '0.4rem 1rem', background: 'white', border: '1px solid #e5e7eb', borderRadius: 20, fontSize: '0.9rem' }}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      <div className="article-grid">
        {articles?.map((article: {
          slug: string;
          cover_url?: string;
          title: string;
          category_name?: string;
          category_slug?: string;
          excerpt?: string;
          author_name?: string;
          published_at?: string;
        }) => (
          <Link key={article.slug} href={`/articles/${article.slug}`} className="article-card">
            {article.cover_url && (
              <img src={article.cover_url} alt={article.title} />
            )}
            <div className="article-card-body">
              {article.category_name && (
                <span className="category-badge">{article.category_name}</span>
              )}
              <h2>{article.title}</h2>
              {article.excerpt && (
                <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.75rem' }}>
                  {article.excerpt.slice(0, 120)}...
                </p>
              )}
              <div className="article-meta">
                {article.author_name} · {article.published_at ? formatDate(article.published_at) : ''}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {meta && meta.totalPages > 1 && (
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ color: '#6b7280' }}>
            Сторінка 1 з {meta.totalPages}
          </span>
        </div>
      )}
    </>
  );
}
