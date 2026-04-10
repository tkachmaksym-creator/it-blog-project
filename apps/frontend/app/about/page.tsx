import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Про нас',
  description:
    'ІПЗ-педія — незалежне україномовне онлайн-видання кафедри інженерії програмного забезпечення. Історія проєкту, наша місія та команда.',
};

export default function AboutPage() {
  return (
    <div style={{ margin: '12px 0' }}>
      <div className="win-box">
        <div className="win-box-title">Вікно: Про ІПЗ-педію</div>
        <div className="win-box-body">
          <h1 style={{ fontSize: '1.4rem', color: '#000080', borderBottom: '3px solid #ff6600', paddingBottom: 6, marginBottom: 12 }}>
            Що таке ІПЗ-педія?
          </h1>
          
          <p style={{ marginBottom: 12, fontSize: 13, lineHeight: '1.4' }}>
            <strong>ІПЗ-педія</strong> — це незалежне україномовне онлайн-видання, створене в межах курсу «SEO та пошукова оптимізація» студентами кафедри інженерії програмного забезпечення (ІПЗ) Чернівецького національного університету ім. Юрія Федьковича.
          </p>

          <p style={{ marginBottom: 12, fontSize: 13, lineHeight: '1.4' }}>
            Наш проєкт — це спроба поєднати сучасні технології з естетикою «старого доброго інтернету» (Y2K / Windows 9x style). Ми віримо, що контент має бути не лише корисним для пошукових систем, а й цікавим та зручним для живих людей.
          </p>

          <h2 style={{ fontSize: '1.1rem', color: '#000080', marginBottom: 8, marginTop: 16 }}>Наша місія</h2>
          <ul style={{ marginBottom: 12, paddingLeft: 20, fontSize: 13, lineHeight: '1.4' }}>
            <li>Популяризація знань про ІТ українською мовою.</li>
            <li>Дослідження алгоритмів пошукових систем через створення якісного контенту (SSR, мета-теги, семантика).</li>
            <li>Створення спільноти навколо кафедри ІПЗ.</li>
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
          <div style={{ display: 'flex', gap: '16px', background: '#e0e0e0', border: '1px outset #fff', padding: '12px', marginBottom: 16 }}>
            <img 
              src="/images/maksym-avatar.jpg" 
              alt="Максим Ткач" 
              style={{ width: '80px', height: '80px', border: '2px inset #808080', objectFit: 'cover' }} 
            />
            <div>
              <h3 style={{ fontSize: '1rem', color: '#000080', margin: '0 0 4px 0' }}>Максим Ткач</h3>
              <p style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#555', margin: '0 0 8px 0' }}>Засновник та головний редактор</p>
              <p style={{ fontSize: '13px', margin: 0, lineHeight: '1.4' }}>
                Студент кафедри ІПЗ, ентузіаст веб-технологій та SEO. Автор більшості матеріалів на сайті та ідейний натхненник проекту «ІПЗ-педія».
              </p>
              <div style={{ marginTop: 8 }}>
                <a href="https://github.com/tkachmaksym-creator" style={{ fontSize: '12px', color: '#0000ee', marginRight: 10 }}>GitHub</a>
                <a href="https://linkedin.com" style={{ fontSize: '12px', color: '#0000ee' }}>LinkedIn</a>
              </div>
            </div>
          </div>

          <div style={{ background: '#f0f0f0', border: '1px solid #808080', padding: 8, marginTop: 16, fontSize: 12, color: '#333' }}>
            <strong>Зауваження:</strong> Цей сайт знаходиться у стадії розробки. Якщо ви знайшли помилку або маєте пропозиції — пишіть нам на GitHub!
          </div>
        </div>
      </div>
    </div>
  );
}
