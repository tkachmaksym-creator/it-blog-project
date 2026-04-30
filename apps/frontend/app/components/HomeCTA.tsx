'use client';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

const ctaLinks = [
  { href: '/categories/programming', label: 'Програмування' },
  { href: '/categories/ai-ml', label: 'ШІ та ML' },
  { href: '/categories/cybersecurity', label: 'Безпека' },
  { href: '/categories/tools', label: 'Інструменти' },
];

export default function HomeCTA() {
  return (
    <div style={{ marginTop: '10px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
      {ctaLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="win-btn"
          onClick={() =>
            trackEvent('click_cta_primary', {
              page_type: 'home',
              cta_label: label,
              destination_category: href.replace('/categories/', ''),
            })
          }
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
