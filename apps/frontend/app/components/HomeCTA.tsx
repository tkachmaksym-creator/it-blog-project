'use client';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

const featuredCategories = [
  { slug: 'programming', label: 'Програмування' },
  { slug: 'ai-ml', label: 'AI та ML' },
  { slug: 'gadgets', label: 'Пристрої' },
  { slug: 'cybersecurity', label: 'Безпека' },
];

export default function HomeCTA() {
  return (
    <div style={{ marginTop: '10px' }}>
      <span style={{ fontSize: '12px', color: '#444', marginRight: '6px' }}>Швидкий перехід:</span>
      <div style={{ display: 'inline-flex', gap: '6px', flexWrap: 'wrap' }}>
        {featuredCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="win-btn"
            onClick={() =>
              trackEvent('click_cta_primary', {
                page_type: 'home',
                cta_label: category.label,
                destination_category: category.slug,
              })
            }
          >
            {category.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
