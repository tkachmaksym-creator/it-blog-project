import { getAuthor, getAuthorArticles } from '@/lib/api';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import AuthorArticleList from '@/app/components/AuthorArticleList';
import AuthorProfile from '@/app/components/AuthorProfile';
import type { Author } from '@/lib/types';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://frontend-production-0907.up.railway.app';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getAuthor(params.slug);
  if (!data) return { title: 'Автор не знайдений' };
  return {
    title: data.data.name,
    description: data.data.bio,
    alternates: {
      canonical: `/authors/${params.slug}`,
    },
    openGraph: {
      title: data.data.name,
      description: data.data.bio,
      url: `${BASE_URL}/authors/${params.slug}`,
      type: 'profile',
      images: data.data.avatar_url ? [data.data.avatar_url] : undefined,
    },
  };
}

export default async function AuthorPage({ params }: Props) {
  const [authorData, articlesData] = await Promise.all([
    getAuthor(params.slug),
    getAuthorArticles(params.slug),
  ]);

  if (!authorData) notFound();
  const author = authorData.data as Author;
  const articlesCount = author.articles_count ?? articlesData.meta?.total ?? 0;

  return (
    <div style={{ maxWidth: 780, margin: '12px auto' }}>
      <AuthorProfile author={author} articlesCount={articlesCount} />
      <AuthorArticleList articles={articlesData.data} />
    </div>
  );
}
