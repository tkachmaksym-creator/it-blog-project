import { getArticle, getRelatedArticles } from '@/lib/api';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleAuthorBlock from '@/app/components/ArticleAuthorBlock';
import ArticleBreadcrumbs from '@/app/components/ArticleBreadcrumbs';
import ArticleHeroImage from '@/app/components/ArticleHeroImage';
import ArticleTags from '@/app/components/ArticleTags';
import JsonLd from '@/app/components/JsonLd';
import RelatedArticles from '@/app/components/RelatedArticles';
import type { ArticleDetail } from '@/lib/types';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://frontend-production-0907.up.railway.app';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getArticle(params.slug);
  if (!data) return { title: 'Стаття не знайдена' };

  const article = data.data as ArticleDetail;
  return {
    title: article.meta_title || article.title,
    description: article.meta_description || article.excerpt,
    alternates: {
      canonical: `/articles/${article.slug}`,
    },
    openGraph: {
      title: article.meta_title || article.title,
      description: article.meta_description || article.excerpt,
      type: 'article',
      url: `${BASE_URL}/articles/${article.slug}`,
      images: article.cover_url ? [article.cover_url] : undefined,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function ArticlePage({ params }: Props) {
  const [data, related] = await Promise.all([
    getArticle(params.slug),
    getRelatedArticles(params.slug),
  ]);

  if (!data) notFound();

  const article = data.data as ArticleDetail;
  const articleUrl = `${BASE_URL}/articles/${article.slug}`;
  const authorUrl = article.author_slug ? `${BASE_URL}/authors/${article.author_slug}` : BASE_URL;
  const categoryUrl = article.category_slug ? `${BASE_URL}/categories/${article.category_slug}` : BASE_URL;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.meta_description || article.excerpt,
    author: {
      '@type': 'Person',
      name: article.author_name || 'ІПЗ-педія',
      url: authorUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ІПЗ-педія',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/favicon.png`,
      },
    },
    datePublished: article.published_at,
    dateModified: article.updated_at || article.published_at,
    image: article.cover_url ? `${BASE_URL}${article.cover_url}` : `${BASE_URL}/favicon.png`,
    mainEntityOfPage: articleUrl,
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Головна',
        item: BASE_URL,
      },
      ...(article.category_name
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: article.category_name,
              item: categoryUrl,
            },
          ]
        : []),
      {
        '@type': 'ListItem',
        position: article.category_name ? 3 : 2,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <div className="article-content">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <ArticleBreadcrumbs
        title={article.title}
        categoryName={article.category_name}
        categorySlug={article.category_slug}
      />

      {article.category_name && (
        <Link href={`/categories/${article.category_slug}`} className="category-badge">
          {article.category_name}
        </Link>
      )}
      <h1 style={{ marginTop: '0.5rem' }}>{article.title}</h1>

      <div className="article-meta" style={{ marginBottom: '0.75rem' }}>
        {article.author_name && (
          <Link href={`/authors/${article.author_slug}`}>{article.author_name}</Link>
        )}
        {article.published_at && ` | ${formatDate(article.published_at)}`}
        {` | ${article.views} переглядів`}
      </div>

      <ArticleHeroImage src={article.cover_url} alt={article.title} />

      <div style={{ lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: article.content }} />

      <ArticleTags tags={article.tags} />
      <ArticleAuthorBlock
        name={article.author_name}
        slug={article.author_slug}
        bio={article.author_bio}
        avatarUrl={article.author_avatar_url}
        publishedAt={article.published_at}
        updatedAt={article.updated_at}
      />
      <RelatedArticles articles={related.data} />
    </div>
  );
}
