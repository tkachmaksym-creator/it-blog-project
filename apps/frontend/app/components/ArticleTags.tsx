import type { Tag } from '@/lib/types';

interface ArticleTagsProps {
  tags?: Tag[] | null;
}

export default function ArticleTags({ tags }: ArticleTagsProps) {
  if (!tags?.length) return null;

  return (
    <div className="article-tags" style={{ marginTop: '2rem', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <span style={{ fontWeight: 'bold', fontSize: '13px' }}>Теги:</span>
      {tags.map((tag) => (
        <span key={tag.slug} style={{ fontSize: '12px', color: '#000080', background: '#e0e0e0', padding: '2px 8px', border: '1px solid #808080', boxShadow: '1px 1px 0px #000' }}>
          #{tag.name}
        </span>
      ))}
    </div>
  );
}
