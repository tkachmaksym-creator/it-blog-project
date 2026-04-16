import Image from 'next/image';
import type { Author } from '@/lib/types';

interface AuthorProfileProps {
  author: Author;
  articlesCount: number;
}

export default function AuthorProfile({ author, articlesCount }: AuthorProfileProps) {
  return (
    <div className="win-box">
      <div className="win-box-title">Профіль автора: {author.name}</div>
      <div className="win-box-body">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          {author.avatar_url && (
            <Image
              src={author.avatar_url}
              alt={author.name}
              width={80}
              height={80}
              style={{ border: '2px solid #000080', flexShrink: 0, objectFit: 'cover' }}
            />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ marginBottom: '6px', marginTop: 0, fontSize: '1.4rem', color: '#000080' }}>
              {author.name}
            </h1>
            {author.bio && (
              <p style={{ color: '#000000', marginBottom: '8px', fontSize: 13 }}>{author.bio}</p>
            )}

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
              {author.linkedin_url && (
                <a href={author.linkedin_url} target="_blank" rel="noopener noreferrer">
                  [ LinkedIn ]
                </a>
              )}
              {author.github_url && (
                <a href={author.github_url} target="_blank" rel="noopener noreferrer">
                  [ GitHub ]
                </a>
              )}
            </div>

            <div style={{ fontSize: '11px', color: '#000080', background: '#e8e8e8', display: 'inline-block', padding: '2px 8px', border: '1px solid #808080' }}>
              Опублікованих статей: <strong>{articlesCount}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
