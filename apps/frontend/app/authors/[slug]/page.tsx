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
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem', background: 'white', padding: '1.5rem', borderRadius: 8 }}>
        {author.avatar_url && (
          <img src={author.avatar_url} alt={author.name} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }} />
        )}
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>{author.name}</h1>
          {author.bio && <p style={{ color: '#6b7280' }}>{author.bio}</p>}
        </div>
      </div>

      <h2 style={{ marginBottom: '1rem' }}>Статті автора</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {articlesData.data?.map((article: { slug: string; title: string; excerpt?: string }) => (
          <Link key={article.slug} href={`/articles/${article.slug}`} style={{ background: 'white', padding: '1rem', borderRadius: 8, display: 'block' }}>
            <h3 style={{ marginBottom: '0.5rem', color: '#1d4ed8' }}>{article.title}</h3>
            {article.excerpt && <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>{article.excerpt.slice(0, 100)}...</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}
