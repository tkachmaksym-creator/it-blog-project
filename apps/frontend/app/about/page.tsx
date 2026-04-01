import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Про нас',
  description:
    'IT Blog — незалежне україномовне видання про технології. Дізнайтесь про нашу місію, редакційну політику та команду авторів.',
};

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1>Про IT Blog</h1>

      <section style={{ background: 'white', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ marginTop: 0 }}>Що ми робимо</h2>
        <p>
          IT Blog — незалежне україномовне видання для розробників і всіх, хто цікавиться технологіями. Ми пишемо про
          JavaScript, Backend, AI, кібербезпеку та огляди інструментів — без зайвого маркетингу, прямо до суті.
        </p>
        <p>
          Сайт заснований у <strong>2025 році</strong> як навчально-практичний проєкт у межах університетського курсу з
          SEO та веб-розробки.
        </p>
      </section>

      <section style={{ background: 'white', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ marginTop: 0 }}>Місія та редакційна політика</h2>
        <p>
          Наша місія — публікувати якісний технічний контент українською мовою, підтверджений реальним досвідом авторів.
        </p>
        <ul style={{ lineHeight: 1.8 }}>
          <li>Кожна стаття проходить редакційну перевірку перед публікацією.</li>
          <li>Ми вказуємо дату публікації та дату останнього оновлення матеріалу.</li>
          <li>Автори підписують статті своїм повним іменем і несуть відповідальність за зміст.</li>
          <li>Ми не публікуємо замовний або неперевірений контент.</li>
          <li>Якщо у статті є помилка — напишіть нам, ми виправимо і зазначимо це.</li>
        </ul>
      </section>

      <section style={{ background: 'white', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ marginTop: 0 }}>Наші соціальні мережі</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href="https://github.com/tkachmaksym-creator/it-blog-project"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1d4ed8' }}
          >
            GitHub проєкту
          </a>
        </div>
      </section>

      <section style={{ background: 'white', borderRadius: 8, padding: '1.5rem' }}>
        <h2 style={{ marginTop: 0 }}>Контакти</h2>
        <p>
          Маєте запитання, пропозицію або знайшли помилку?{' '}
          <strong>Напишіть нам:</strong>{' '}
          <a href="mailto:admin@itblog.pp.ua" style={{ color: '#1d4ed8' }}>
            admin@itblog.pp.ua
          </a>
        </p>
      </section>
    </div>
  );
}
