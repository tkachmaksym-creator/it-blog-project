import type { Metadata } from 'next';
import TeamMemberCard, { type TeamMember } from '../components/TeamMemberCard';

export const metadata: Metadata = {
  title: 'Про нас',
  description:
    ‘ІПЗ-педія - незалежне україномовне онлайн-видання про програмування та IT. Засноване студентами ІПЗ кафедри ПЗКС в Інституті ІФТКН ЧНУ.’,
};

const teamMembers: TeamMember[] = [
  {
    name: 'Максим Ткач',
    role: 'Творець платформи та технічний спеціаліст',
    avatar: '/images/maksym-avatar.jpg',
    bio:
      'Студент спеціальності ІПЗ кафедри ПЗКС в ІФТКН ЧНУ, відповідальний за архітектуру платформи, Next.js frontend, Express API, PostgreSQL, SEO-налаштування та технічну якість проєкту.',
    links: [
      { label: 'GitHub', href: 'https://github.com/tkachmaksym-creator' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/tkachmaksym' },
    ],
  },
  {
    name: 'Олексій Іванов',
    role: 'Автор матеріалів про веб-дизайн та користувацький досвід',
    avatar: '/images/alex-avatar.jpg',
    bio:
      'Допомагає з редакційними матеріалами про інтерфейси, ретро-естетику, UX-патерни та візуальну подачу технологічного контенту.',
    links: [
      { label: 'GitHub', href: 'https://github.com' },
    ],
  },
  {
    name: 'Максим Яцко',
    role: 'Редакційний асистент і координатор тем',
    initials: 'МЯ',
    bio:
      'Допомагає узгоджувати теми матеріалів, перевіряти зрозумілість формулювань і підтримувати єдиний стиль навчального блогу.',
    links: [],
  },
];

export default function AboutPage() {
  return (
    <div style={{ margin: '12px 0' }}>
      <div className="win-box">
        <div className="win-box-title">Про ІПЗ-педію</div>
        <div className="win-box-body">
          <h1 style={{ fontSize: '1.4rem', color: '#000080', borderBottom: '3px solid #ff6600', paddingBottom: 6, marginBottom: 12 }}>
            Що таке ІПЗ-педія?
          </h1>
          
          <p style={{ marginBottom: 12, fontSize: 13, lineHeight: '1.4' }}>
            <strong>ІПЗ-педія</strong> - це незалежне україномовне онлайн-видання, створене в межах курсу "SEO та пошукова оптимізація" студентами кафедри <strong>програмного забезпечення та комп’ютерних систем (ПЗКС)</strong> (спеціальність ІПЗ) в Інституті фізико-технічних та комп’ютерних наук (ІФТКН) Чернівецького національного університету ім. Юрія Федьковича.
          </p>

          <p style={{ marginBottom: 12, fontSize: 13, lineHeight: '1.4' }}>
            Наш проєкт - це спроба поєднати сучасні технології з естетикою "старого доброго інтернету" (Y2K / Windows 9x style). Ми віримо, що контент має бути не лише корисним для пошукових систем, а й цікавим та зручним для живих людей.
          </p>

          <h2 style={{ fontSize: '1.1rem', color: '#000080', marginBottom: 8, marginTop: 16 }}>Наша місія</h2>
          <ul style={{ marginBottom: 12, paddingLeft: 20, fontSize: 13, lineHeight: '1.4' }}>
            <li>Популяризація знань про ІТ українською мовою.</li>
            <li>Дослідження алгоритмів пошукових систем через створення якісного контенту (SSR, мета-теги, семантика).</li>
            <li>Розвиток ІТ-спільноти в межах Інституту ІФТКН.</li>
          </ul>

          <h2 style={{ fontSize: '1.1rem', color: '#000080', marginBottom: 8, marginTop: 16 }}>Технічний стек</h2>
          <p style={{ marginBottom: 12, fontSize: 13, lineHeight: '1.4' }}>
            Блог побудований на сучасному стеку технологій для забезпечення максимальної швидкості та SEO-ефективності:
          </p>
          <ul style={{ marginBottom: 12, paddingLeft: 20, fontSize: 13, lineHeight: '1.4' }}>
            <li><strong>Frontend:</strong> Next.js 14 (App Router) з використанням серверного рендерингу (SSR).</li>
            <li><strong>Backend:</strong> Node.js + Express API.</li>
            <li><strong>Database:</strong> PostgreSQL.</li>
            <li><strong>Styling:</strong> Vanilla CSS з кастомним дизайном у стилі Windows 98.</li>
          </ul>

          <h2 style={{ fontSize: '1.1rem', color: '#000080', marginBottom: 12, marginTop: 20 }}>Команда</h2>
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}

          <div style={{ background: '#f0f0f0', border: '1px solid #808080', padding: 8, marginTop: 16, fontSize: 12, color: '#333' }}>
            <strong>Зауваження:</strong> Цей сайт знаходиться у стадії розробки. Якщо ви знайшли помилку або маєте пропозиції - пишіть нам на GitHub!
          </div>
        </div>
      </div>
    </div>
  );
}
