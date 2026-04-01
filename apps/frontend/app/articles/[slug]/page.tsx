import { getArticle, getRelatedArticles } from '@/lib/api';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getArticle(params.slug);
  if (!data) return { title: 'Стаття не знайдена' };

  const article = data.data;
  return {
    title: article.meta_title || article.title,
    description: article.meta_description || article.excerpt,
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function ArticlePage({ params }: Props) {
  const [data, related] = await Promise.all([
    getArticle(params.slug),
    getRelatedArticles(params.slug),
  ]);

  if (!data) notFound();

  const article = data.data;

  return (
    <div className="article-content">
      {article.category_name && (
        <Link href={`/categories/${article.category_slug}`} className="category-badge">
          {article.category_name}
        </Link>
      )}
      <h1 style={{ marginTop: '0.5rem' }}>{article.title}</h1>

      <div className="article-meta" style={{ marginBottom: '1.5rem' }}>
        {article.author_name && (
          <Link href={`/authors/${article.author_slug}`}>{article.author_name}</Link>
        )}
        {article.published_at && ` · ${formatDate(article.published_at)}`}
        {` · ${article.views} переглядів`}
      </div>

      {article.cover_url && (
        <img
          src={article.cover_url}
          alt={article.title}
          style={{ width: '100%', borderRadius: 8, marginBottom: '1.5rem' }}
        />
      )}

      <div style={{ lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: article.content }} />

      {/* Блок автора (E-E-A-T) */}
      {article.author_name && (
        <div style={{
          marginTop: '2.5rem',
          borderTop: '1px solid #e5e7eb',
          paddingTop: '1.5rem',
          background: '#f9fafb',
          borderRadius: 8,
          padding: '1.25rem',
        }}>
          <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
            Про автора
          </p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            {article.author_avatar_url && (
              <img
                src={article.author_avatar_url}
                alt={article.author_name}
                style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
              />
            )}
            <div>
              <Link href={`/authors/${article.author_slug}`} style={{ fontWeight: 600, color: '#111827', fontSize: '1rem' }}>
                {article.author_name}
              </Link>
              {article.author_bio && (
                <p style={{ margin: '0.25rem 0 0', color: '#6b7280', fontSize: '0.9rem' }}>
                  {article.author_bio}
                </p>
              )}
              <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#9ca3af' }}>
                {article.published_at && (
                  <span>Опубліковано: {formatDate(article.published_at)}</span>
                )}
                {article.updated_at && article.updated_at !== article.published_at && (
                  <span style={{ marginLeft: '1rem' }}>Оновлено: {formatDate(article.updated_at)}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {related.data?.length > 0 && (
        <section style={{ marginTop: '3rem', borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Схожі статті</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {related.data.map((r: { slug: string; title: string }) => (
              <Link key={r.slug} href={`/articles/${r.slug}`} style={{ color: '#1d4ed8' }}>
                {r.title}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
