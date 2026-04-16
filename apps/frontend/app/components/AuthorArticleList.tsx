import Link from 'next/link';
import type { ArticleSummary } from '@/lib/types';

interface AuthorArticleListProps {
  articles?: ArticleSummary[];
}

export default function AuthorArticleList({ articles = [] }: AuthorArticleListProps) {
  return (
    <>
      <h2 style={{ fontSize: '1.2rem', color: '#000080', marginBottom: '8px', paddingLeft: '4px' }}>Статті автора</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
        {articles.map((article) => (
          <Link key={article.slug} href={`/articles/${article.slug}`} className="article-card" style={{ padding: '8px', display: 'block' }}>
            <h3 style={{ marginBottom: '4px', color: '#000080', fontSize: '13px' }}>- {article.title}</h3>
            {article.excerpt && <p style={{ fontSize: '12px', color: '#444', margin: 0 }}>{article.excerpt.slice(0, 120)}...</p>}
          </Link>
        ))}
      </div>
    </>
  );
}
