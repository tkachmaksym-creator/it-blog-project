import { getCategoryArticles } from '@/lib/api';
import type { Metadata } from 'next';
import Link from 'next/link';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://frontend-production-0907.up.railway.app';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Категорія: ${params.slug}`,
    description: `Статті у категорії ${params.slug} на IT Blog`,
    alternates: {
      canonical: `/categories/${params.slug}`,
    },
    openGraph: {
      title: `Категорія: ${params.slug}`,
      description: `Статті у категорії ${params.slug} на IT Blog`,
      url: `${BASE_URL}/categories/${params.slug}`,
      type: 'website',
    },
  };
}

export const revalidate = 60;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' });
}

const categoryNames: Record<string, string> = {
  'programming': 'Програмування',
  'ai-ml': 'Штучний інтелект',
  'gadgets': 'Пристрої',
  'cybersecurity': 'Інформаційна безпека',
  'tools': 'Інструменти'
};

export default async function CategoryPage({ params }: Props) {
  const { data: articles, meta } = await getCategoryArticles(params.slug);
  const categoryTitle = categoryNames[params.slug] || params.slug;

  return (
    <div className="win-box">
      <div className="win-box-title">
        <span>Розділ: {categoryTitle}</span>
      </div>
      <div className="win-box-body">

      <div className="article-list">
        {articles?.map((article: {
          slug: string;
          title: string;
          excerpt?: string;
          author_name?: string;
          published_at?: string;
          cover_url?: string;
          views?: number;
        }) => (
          <div key={article.slug} className="win-box article-window" style={{ marginBottom: '16px' }}>
            <div className="win-box-title">
              <span>{article.title}</span>
            </div>
            <div className="win-box-body flex-list-item">
              {article.cover_url && (
                <div className="article-thumb">
                  <img src={article.cover_url} alt={article.title} />
                </div>
              )}
              <div className="article-details">
                {article.excerpt && (
                  <p className="article-excerpt">
                    {article.excerpt}...
                  </p>
                )}
                <div className="article-meta">
                  Автор: {article.author_name} · Дата: {article.published_at ? formatDate(article.published_at) : ''} · Переглядів: {article.views || 0}
                </div>
                <div className="article-actions">
                  <Link href={`/articles/${article.slug}`} className="win-btn">
                    Читати далі
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!articles?.length && (
        <p style={{ color: '#6b7280' }}>У цій категорії ще немає статей.</p>
      )}
      </div>
    </div>
  );
}
