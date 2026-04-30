import Image from 'next/image';
import Link from 'next/link';
import type { ArticleSummary } from '@/lib/types';

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

interface ArticleCardProps {
  article: ArticleSummary;
  priority?: boolean;
}

export default function ArticleCard({ article, priority = false }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <article className="win-box article-window">
        <div className="win-box-title">
          <span>{article.title}</span>
        </div>
        <div className="win-box-body flex-list-item">
          {article.cover_url && (
            <div className="article-thumb">
              <Image
                src={article.cover_url}
                alt={article.title}
                width={144}
                height={136}
                sizes="(max-width: 480px) 72px, 144px"
                priority={priority}
                quality={65}
              />
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
              Автор: {article.author_name || 'ІПЗ-педія'} | Дата: {formatDate(article.published_at)} | Переглядів: {article.views || 0}
            </div>
            {article.tags && article.tags.length > 0 && (
              <div className="article-tags" style={{ marginTop: 4, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {article.tags.map((tag) => (
                  <span key={tag.slug} style={{ fontSize: 10, color: '#000080', background: '#e0e0e0', padding: '1px 4px', border: '1px solid #808080' }}>
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}
            <div className="article-actions" style={{ pointerEvents: 'none' }}>
              <span className="win-btn">Читати далі</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
