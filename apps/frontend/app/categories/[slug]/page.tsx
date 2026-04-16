import { getCategoryArticles } from '@/lib/api';
import type { Metadata } from 'next';
import ArticleList from '@/app/components/ArticleList';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://frontend-production-0907.up.railway.app';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Категорія: ${params.slug}`,
    description: `Статті у категорії ${params.slug} на IT Blog`,
    alternates: {
      canonical: `/categories/${params.slug}`,
    },
    openGraph: {
      title: `Категорія: ${params.slug}`,
      description: `Статті у категорії ${params.slug} на IT Blog`,
      url: `${BASE_URL}/categories/${params.slug}`,
      type: 'website',
    },
  };
}

export const revalidate = 60;

const categoryNames: Record<string, string> = {
  'programming': 'Програмування',
  'ai-ml': 'Штучний інтелект',
  'backend': 'Backend',
  'gadgets': 'Пристрої',
  'cybersecurity': 'Інформаційна безпека',
  'tools': 'Інструменти'
};

export default async function CategoryPage({ params }: Props) {
  const { data: articles, meta } = await getCategoryArticles(params.slug);
  const categoryTitle = categoryNames[params.slug] || params.slug;

  return (
    <div className="win-box">
      <div className="win-box-title">
        <span>Розділ: {categoryTitle}</span>
      </div>
      <div className="win-box-body">
        <ArticleList articles={articles} />
      </div>
    </div>
  );
}
