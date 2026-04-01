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
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      {/* Профіль автора */}
      <div style={{ background: 'white', borderRadius: 8, padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
          {author.avatar_url && (
            <img
              src={author.avatar_url}
              alt={author.name}
              style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
            />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ marginBottom: '0.5rem', marginTop: 0 }}>{author.name}</h1>
            {author.bio && (
              <p style={{ color: '#374151', marginBottom: '0.75rem' }}>{author.bio}</p>
            )}

            {/* Соціальні посилання */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              {author.linkedin_url && (
                <a href={author.linkedin_url} target="_blank" rel="noopener noreferrer" style={{ color: '#1d4ed8', fontSize: '0.9rem' }}>
                  LinkedIn
                </a>
              )}
              {author.github_url && (
                <a href={author.github_url} target="_blank" rel="noopener noreferrer" style={{ color: '#1d4ed8', fontSize: '0.9rem' }}>
                  GitHub
                </a>
              )}
            </div>

            <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>
              Опублікованих статей: <strong>{author.articles_count ?? articlesData.meta?.total ?? 0}</strong>
            </p>
          </div>
        </div>
      </div>

      <h2 style={{ marginBottom: '1rem' }}>Статті автора</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {articlesData.data?.map((article: { slug: string; title: string; excerpt?: string }) => (
          <Link key={article.slug} href={`/articles/${article.slug}`} style={{ background: 'white', padding: '1rem', borderRadius: 8, display: 'block' }}>
            <h3 style={{ marginBottom: '0.5rem', color: '#1d4ed8' }}>{article.title}</h3>
            {article.excerpt && <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>{article.excerpt.slice(0, 120)}...</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}
