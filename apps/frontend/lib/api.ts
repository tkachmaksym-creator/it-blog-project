const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function getArticles(params?: { page?: number; category?: string }) {
  const query = new URLSearchParams();
  if (params?.page) query.set('page', String(params.page));
  if (params?.category) query.set('category', params.category);

  const res = await fetch(`${API_URL}/api/articles?${query}`, { next: { revalidate: 60 } });
  if (!res.ok) return { data: [], meta: { total: 0, page: 1, perPage: 10, totalPages: 0 } };
  return res.json();
}

export async function getArticle(slug: string) {
  const res = await fetch(`${API_URL}/api/articles/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function getRelatedArticles(slug: string) {
  const res = await fetch(`${API_URL}/api/articles/${slug}/related`, { next: { revalidate: 300 } });
  if (!res.ok) return { data: [] };
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${API_URL}/api/categories`, { next: { revalidate: 3600 } });
  if (!res.ok) return { data: [] };
  return res.json();
}

export async function getCategoryArticles(slug: string, page = 1) {
  const res = await fetch(`${API_URL}/api/categories/${slug}/articles?page=${page}`, { next: { revalidate: 60 } });
  if (!res.ok) return { data: [], meta: {} };
  return res.json();
}

export async function getAuthor(slug: string) {
  const res = await fetch(`${API_URL}/api/authors/${slug}`, { next: { revalidate: 3600 } });
  if (!res.ok) return null;
  return res.json();
}

export async function getAuthorArticles(slug: string) {
  const res = await fetch(`${API_URL}/api/authors/${slug}/articles`, { next: { revalidate: 60 } });
  if (!res.ok) return { data: [] };
  return res.json();
}
