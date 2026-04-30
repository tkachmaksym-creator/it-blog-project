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

const categoryIntro: Record<string, string> = {
  programming:
    'Добірка матеріалів про JavaScript, архітектуру застосунків, frontend та backend-практики для студентів і початківців у розробці.',
  'ai-ml':
    'Публікації про штучний інтелект, машинне навчання, AI-інструменти та їх практичне застосування в навчанні й розробці.',
  backend:
    'Статті про серверну логіку, API, бази даних, Node.js та принципи побудови надійних backend-сервісів.',
  gadgets:
    'Огляди пристроїв, ноутбуків, робочих сетапів і техніки, яка впливає на продуктивність у навчанні та роботі.',
  cybersecurity:
    'Матеріали про базову кібербезпеку, захист даних, безпечну роботу в мережі та практики безпеки для студентів.',
  tools:
    'Поради та добірки інструментів для розробника: редактори, CLI-утиліти, dev workflow і корисні сервіси.',
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
  const intro = categoryIntro[params.slug];

  return (
    <div className="win-box">
      <CategoryPageTracker slug={params.slug} name={categoryTitle} />
      <div className="win-box-title">
        <span>Розділ: {categoryTitle}</span>
      </div>
      <div className="win-box-body">
        <h1 className="page-heading">Категорія: {categoryTitle}</h1>
        {intro && (
          <p style={{ marginBottom: '12px', fontSize: 13, lineHeight: 1.5, color: '#333' }}>
            {intro}
          </p>
        )}
        <ArticleList articles={articles} />
      </div>
    </div>
  );
}
