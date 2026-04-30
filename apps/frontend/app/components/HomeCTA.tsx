import Link from 'next/link';
import { getTags } from '@/lib/api';
import type { Tag } from '@/lib/types';

export default async function HomeCTA() {
  const { data: tags }: { data: Tag[] } = await getTags();
  const featured = tags.slice(0, 5);

  if (!featured.length) return null;

  return (
    <div style={{ marginTop: '10px' }}>
      <span style={{ fontSize: '12px', color: '#444', marginRight: '6px' }}>Мітки:</span>
      <div style={{ display: 'inline-flex', gap: '6px', flexWrap: 'wrap' }}>
        {featured.map((tag) => (
          <Link key={tag.slug} href={`/tags/${tag.slug}`} className="win-btn">
            #{tag.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
