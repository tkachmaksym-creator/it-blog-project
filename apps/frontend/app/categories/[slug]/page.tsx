import { getCategoryArticles } from '@/lib/api';
import type { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Категорія: ${params.slug}`,
    description: `Статті у категорії ${params.slug} на IT Blog`,
  };
}

export const revalidate = 60;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function CategoryPage({ params }: Props) {
  const { data: articles, meta } = await getCategoryArticles(params.slug);

  return (
    <>
      <h1 style={{ marginBottom: '1.5rem', textTransform: 'capitalize' }}>{params.slug.replace(/-/g, ' ')}</h1>

      <div className="article-grid">
        {articles?.map((article: {
          slug: string;
          title: string;
          excerpt?: string;
          author_name?: string;
          published_at?: string;
          cover_url?: string;
        }) => (
          <Link key={article.slug} href={`/articles/${article.slug}`} className="article-card">
            {article.cover_url && <img src={article.cover_url} alt={article.title} />}
            <div className="article-card-body">
              <h2>{article.title}</h2>
              {article.excerpt && (
                <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.75rem' }}>
                  {article.excerpt.slice(0, 100)}...
                </p>
              )}
              <div className="article-meta">
                {article.author_name} · {article.published_at ? formatDate(article.published_at) : ''}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {!articles?.length && (
        <p style={{ color: '#6b7280' }}>У цій категорії ще немає статей.</p>
      )}
    </>
  );
}
