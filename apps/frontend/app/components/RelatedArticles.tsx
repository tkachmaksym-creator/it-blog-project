'use client';
import Link from 'next/link';
import type { ArticleSummary } from '@/lib/types';
import { trackEvent } from '@/lib/analytics';

interface RelatedArticlesProps {
  articles?: Pick<ArticleSummary, 'slug' | 'title'>[];
  currentSlug?: string;
  category?: string;
}

export default function RelatedArticles({ articles = [], currentSlug, category }: RelatedArticlesProps) {
  if (!articles.length) return null;

  return (
    <section style={{ marginTop: '3rem', borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
      <h3 style={{ marginBottom: '1rem' }}>Схожі статті</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            style={{ color: '#1d4ed8' }}
            onClick={() =>
              trackEvent('click_related_article', {
                from_slug: currentSlug,
                related_slug: article.slug,
                category,
              })
            }
          >
            {article.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
