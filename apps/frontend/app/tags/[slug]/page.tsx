import { getTagArticles } from '@/lib/api';
import type { Metadata } from 'next';
import ArticleList from '@/app/components/ArticleList';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://frontend-production-0907.up.railway.app';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = `#${params.slug} — мітка ІПЗ-педії`;
  const description = `Усі матеріали з міткою #${params.slug} на ІПЗ-педії.`;
  return {
    title,
    description,
    alternates: { canonical: `/tags/${params.slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/tags/${params.slug}`,
      type: 'website',
      images: [{ url: `${BASE_URL}/favicon.png`, width: 400, height: 400 }],
    },
  };
}

export const revalidate = 60;

export default async function TagPage({ params }: Props) {
  const { data: articles } = await getTagArticles(params.slug);

  return (
    <div className="win-box">
      <div className="win-box-title">
        <span>Мітка: #{params.slug}</span>
      </div>
      <div className="win-box-body">
        <h1 className="page-heading">Матеріали з міткою #{params.slug}</h1>
        <ArticleList articles={articles} />
      </div>
    </div>
  );
}
