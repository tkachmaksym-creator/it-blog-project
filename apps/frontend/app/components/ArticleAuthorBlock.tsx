import Image from 'next/image';
import Link from 'next/link';

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

interface ArticleAuthorBlockProps {
  name?: string;
  slug?: string;
  bio?: string;
  avatarUrl?: string;
  publishedAt?: string;
  updatedAt?: string;
}

export default function ArticleAuthorBlock({
  name,
  slug,
  bio,
  avatarUrl,
  publishedAt,
  updatedAt,
}: ArticleAuthorBlockProps) {
  if (!name || !slug) return null;

  return (
    <div className="author-block">
      {avatarUrl && (
        <Image src={avatarUrl} alt={name} width={64} height={64} />
      )}
      <div>
        <Link href={`/authors/${slug}`} className="author-block-name">
          {name}
        </Link>
        {bio && <div className="author-block-bio">{bio}</div>}
        <div className="author-block-dates">
          {publishedAt && <span>Опубліковано: {formatDate(publishedAt)}</span>}
          {updatedAt && updatedAt !== publishedAt && (
            <span style={{ marginLeft: '12px' }}>Оновлено: {formatDate(updatedAt)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
