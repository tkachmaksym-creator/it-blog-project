import { getAuthor, getAuthorArticles } from '@/lib/api';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getAuthor(params.slug);
  if (!data) return { title: 'Автор не знайдений' };
  return {
    title: data.data.name,
    description: data.data.bio,
  };
}

export default async function AuthorPage({ params }: Props) {
  const [authorData, articlesData] = await Promise.all([
    getAuthor(params.slug),
    getAuthorArticles(params.slug),
  ]);

  if (!authorData) notFound();
  const author = authorData.data;

  return (
    <div style={{ maxWidth: 780, margin: '12px auto' }}>
      {/* Профіль автора */}
      <div className="win-box">
        <div className="win-box-title">👤 Профіль автора: {author.name}</div>
        <div className="win-box-body">
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            {author.avatar_url && (
              <img
                src={author.avatar_url}
                alt={author.name}
                style={{ width: 80, height: 80, border: '2px solid #000080', flexShrink: 0 }}
              />
            )}
            <div style={{ flex: 1 }}>
              <h1 style={{ marginBottom: '6px', marginTop: 0, fontSize: '1.4rem', color: '#000080' }}>
                {author.name}
              </h1>
              {author.bio && (
                <p style={{ color: '#000000', marginBottom: '8px', fontSize: 13 }}>{author.bio}</p>
              )}

              {/* Соціальні посилання */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
                {author.linkedin_url && (
                  <a href={author.linkedin_url} target="_blank" rel="noopener noreferrer">
                    [ LinkedIn ]
                  </a>
                )}
                {author.github_url && (
                  <a href={author.github_url} target="_blank" rel="noopener noreferrer">
                    [ GitHub ]
                  </a>
                )}
              </div>

              <div style={{ fontSize: '11px', color: '#000080', background: '#e8e8e8', display: 'inline-block', padding: '2px 8px', border: '1px solid #808080' }}>
                Опублікованих статей: <strong>{author.articles_count ?? articlesData.meta?.total ?? 0}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.2rem', color: '#000080', marginBottom: '8px', paddingLeft: '4px' }}>Статті автора</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
        {articlesData.data?.map((article: { slug: string; title: string; excerpt?: string }) => (
          <Link key={article.slug} href={`/articles/${article.slug}`} className="article-card" style={{ padding: '8px', display: 'block' }}>
            <h3 style={{ marginBottom: '4px', color: '#000080', fontSize: '13px' }}>» {article.title}</h3>
            {article.excerpt && <p style={{ fontSize: '12px', color: '#444', margin: 0 }}>{article.excerpt.slice(0, 120)}...</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}
