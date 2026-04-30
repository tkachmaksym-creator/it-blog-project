import type { Metadata } from 'next';
import Link from 'next/link';
import { searchArticles } from '@/lib/api';
import type { ArticleSummary } from '@/lib/types';
import SearchResultsTracker from '@/app/components/SearchResultsTracker';

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q?.trim() || '';
  return {
    title: query ? `Пошук: ${query}` : 'Пошук',
    description: query
      ? `Результати внутрішнього пошуку по сайту для запиту "${query}".`
      : 'Пошук статей і матеріалів на ІПЗ-педії.',
    alternates: {
      canonical: query ? `/search?q=${encodeURIComponent(query)}` : '/search',
    },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.trim() || '';
  const { data: results }: { data: ArticleSummary[] } = query ? await searchArticles(query) : { data: [] };

  return (
    <div className="win-box">
      <SearchResultsTracker query={query} resultsCount={results.length} />
      <div className="win-box-title">
        <span>Пошук по сайту</span>
      </div>
      <div className="win-box-body">
        <h1 className="page-heading">Результати пошуку</h1>
        {query ? (
          <p style={{ marginBottom: 12, fontSize: 13 }}>
            Запит: <strong>{query}</strong>. Знайдено результатів: <strong>{results.length}</strong>.
          </p>
        ) : (
          <p style={{ marginBottom: 12, fontSize: 13 }}>
            Введіть запит у пошукове поле вгорі сторінки, щоб знайти статті.
          </p>
        )}

        {results.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {results.map((article) => (
              <Link key={article.slug} href={`/articles/${article.slug}`} className="article-card" style={{ padding: '10px 12px' }}>
                <strong>{article.title}</strong>
                {article.excerpt && (
                  <div style={{ marginTop: 4, fontSize: 12, fontWeight: 'normal', color: '#333' }}>{article.excerpt}</div>
                )}
              </Link>
            ))}
          </div>
        ) : query ? (
          <p style={{ fontSize: 13, color: '#555' }}>За цим запитом статей не знайдено.</p>
        ) : null}
      </div>
    </div>
  );
}
