import { getCategoryArticles } from '@/lib/api';
import type { Metadata } from 'next';
import ArticleList from '@/app/components/ArticleList';
import CategoryPageTracker from '@/app/components/CategoryPageTracker';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://frontend-production-0907.up.railway.app';

const categoryNames: Record<string, string> = {
  programming: 'Програмування',
  'ai-ml': 'Штучний інтелект та ML',
  backend: 'Backend розробка',
  gadgets: 'Пристрої та гаджети',
  cybersecurity: 'Інформаційна безпека',
  tools: 'Інструменти розробника',
};

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = categoryNames[params.slug] || params.slug;
  const title = `${name} — статті ІПЗ-педії`;
  const description = `Вибрані статті про ${name.toLowerCase()} від команди ІПЗ-педії. Програмування, технології та IT у ЧНУ.`;
  return {
    title,
    description,
    alternates: {
      canonical: `/categories/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/categories/${params.slug}`,
      type: 'website',
      images: [{ url: `${BASE_URL}/favicon.png`, width: 400, height: 400 }],
    },
  };
}

export const revalidate = 60;

export default async function CategoryPage({ params }: Props) {
  const { data: articles } = await getCategoryArticles(params.slug);
  const categoryTitle = categoryNames[params.slug] || params.slug;

  return (
    <div className="win-box">
      <CategoryPageTracker slug={params.slug} name={categoryTitle} />
      <div className="win-box-title">
        <span>Розділ: {categoryTitle}</span>
      </div>
      <div className="win-box-body">
        <h1 className="page-heading">Категорія: {categoryTitle}</h1>
        <ArticleList articles={articles} />
      </div>
    </div>
  );
}
