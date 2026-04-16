import Link from 'next/link';

export default function HomeSidebar() {
  return (
    <aside className="layout-sidebar">
      <div className="win-box">
        <div className="win-box-title">
          <span>Про портал</span>
        </div>
        <div className="win-box-body">
          <p><strong>ІПЗ-педія</strong> - потужний вісник спеціальності від <del>майже</del> найкращих спеціалістів.</p>
          <p style={{ marginTop: '5px', fontStyle: 'italic', fontWeight: 'bold', color: '#000080' }}>*Завдяки нам дорогою буде не тільки оперативна пам'ять.</p>
          <br />
          <Link href="/about" className="win-btn" style={{ display: 'block', textAlign: 'center' }}>Детальніше про ІПЗ-педію</Link>
        </div>
      </div>

      <div className="win-box">
        <div className="win-box-title">
          <span>Літопис (Архів)</span>
        </div>
        <div className="win-box-body">
          <ul style={{ listStyleType: 'square', marginLeft: '16px', lineHeight: '1.8' }}>
            <li><a href="/">Квітень 2026</a></li>
            <li><a href="/">Березень 2026</a></li>
            <li><a href="/">Лютий 2026</a></li>
            <li><a href="/">Січень 2026</a></li>
          </ul>
        </div>
      </div>

      <div className="win-box">
        <div className="win-box-title">
          <span>Дружні вузли</span>
        </div>
        <div className="win-box-body">
          <a href="https://chnu.edu.ua/" target="_blank" rel="noreferrer" style={{ display: 'block', marginBottom: '4px' }}>ЧНУ ім. Ю. Федьковича</a>
          <a href="https://nextjs.org/" target="_blank" rel="noreferrer" style={{ display: 'block', marginBottom: '4px' }}>Каркас Next.js</a>
          <a href="https://www.postgresql.org/" target="_blank" rel="noreferrer" style={{ display: 'block' }}>СКБД PostgreSQL</a>
        </div>
      </div>
    </aside>
  );
}
