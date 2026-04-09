import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://frontend-production-0907.up.railway.app';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function fetchJson(url: string) {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/authors`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Articles
  const articlesData = await fetchJson(`${API_URL}/api/articles?page=1&limit=100`);
  const articlePages: MetadataRoute.Sitemap = (articlesData?.data ?? []).map((article: { slug: string; updated_at?: string; created_at?: string }) => ({
    url: `${BASE_URL}/articles/${article.slug}`,
    lastModified: article.updated_at ? new Date(article.updated_at) : new Date(article.created_at ?? Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Categories
  const categoriesData = await fetchJson(`${API_URL}/api/categories`);
  const categoryPages: MetadataRoute.Sitemap = (categoriesData?.data ?? []).map((cat: { slug: string }) => ({
    url: `${BASE_URL}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...articlePages, ...categoryPages];
}
