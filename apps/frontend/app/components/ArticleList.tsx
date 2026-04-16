import type { ArticleSummary } from '@/lib/types';
import ArticleCard from './ArticleCard';

interface ArticleListProps {
  articles?: ArticleSummary[];
}

export default function ArticleList({ articles = [] }: ArticleListProps) {
  if (!articles.length) {
    return <p style={{ color: '#6b7280' }}>Публікацій поки немає.</p>;
  }

  return (
    <div className="article-list">
      {articles.map((article, index) => (
        <ArticleCard key={article.slug} article={article} priority={index === 0} />
      ))}
    </div>
  );
}
