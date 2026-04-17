import Link from 'next/link';
import { getCategories } from '@/lib/api';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Категорії',
  description: 'Усі категорії матеріалів на ІПЗ-педії: програмування, AI, гаджети, кібербезпека та інше.',
};

export const revalidate = 3600;

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}


export default async function CategoriesPage() {
  const { data: categories } = await getCategories();

  return (
    <div className="win-box">
      <div className="win-box-title">
        <span>Категорії</span>
      </div>
      <div className="win-box-body">
        <h1 className="page-heading">Усі категорії</h1>
        {categories && categories.length > 0 ? (
          <div className="categories-grid">
            {categories.map((cat: Category) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="category-card-link"
              >
                {cat.name}
                {cat.description && (
                  <div style={{ fontSize: 12, fontWeight: 'normal', marginTop: 4 }}>{cat.description}</div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: 13, color: '#555', marginTop: 8 }}>Категорії не знайдено.</p>
        )}
      </div>
    </div>
  );
}
