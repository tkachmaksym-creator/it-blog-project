import Image from 'next/image';

interface TeamLink {
  label: string;
  href: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  initials?: string;
  links: TeamLink[];
}

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="author-block">
      {member.avatar ? (
        <Image src={member.avatar} alt={member.name} width={72} height={72} style={{ objectFit: 'cover' }} />
      ) : (
        <div
          aria-label={`Плейсхолдер аватара: ${member.name}`}
          style={{
            width: 72,
            height: 72,
            border: '2px solid #000080',
            background: '#dcdcdc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#000080',
            fontWeight: 'bold',
            flexShrink: 0,
          }}
        >
          {member.initials || '??'}
        </div>
      )}
      <div className="author-block-details">
        <h3 className="author-block-name">{member.name}</h3>
        <p style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#555', margin: '0 0 8px 0' }}>
          {member.role}
        </p>
        <p className="author-block-bio">{member.bio}</p>
        {member.links.length > 0 && (
          <div style={{ marginTop: 8 }}>
            {member.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{ fontSize: '12px', color: '#0000ee', marginRight: 10 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
