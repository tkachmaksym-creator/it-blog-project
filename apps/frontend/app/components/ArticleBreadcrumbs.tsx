import Link from 'next/link';

interface ArticleBreadcrumbsProps {
  title: string;
  categoryName?: string;
  categorySlug?: string;
}

export default function ArticleBreadcrumbs({ title, categoryName, categorySlug }: ArticleBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" style={{ fontSize: 12, marginBottom: '0.75rem' }}>
      <Link href="/">Головна</Link>
      {categoryName && categorySlug && (
        <>
          <span> / </span>
          <Link href={`/categories/${categorySlug}`}>{categoryName}</Link>
        </>
      )}
      <span> / </span>
      <span>{title}</span>
    </nav>
  );
}
