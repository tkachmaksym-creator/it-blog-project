import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ІПЗ-педія — Онлайн-видання кафедри ІПЗ',
    template: '%s | ІПЗ-педія',
  },
  description:
    'ІПЗ-педія — незалежне україномовне онлайн-видання кафедри інженерії програмного забезпечення. ЕОМ, штучний інтелект, програмування, інформаційна безпека та все цікаве зі світу ІТ.',
  verification: {
    google: 'ZKBuBgRJNf1ffu8iskDb1qSwxRRTFGRy4hpk3sTlkLo',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <header>
          <div className="container">
            <div className="header-top">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="/images/logo.png" alt="IPZ Logo" style={{ width: '48px', height: '48px', imageRendering: 'pixelated' }} />
                <a href="/" className="site-logo">ІПЗ-педія</a>
              </div>
              <div className="site-tagline">
                Онлайн-видання кафедри ІПЗ<br />
                Заснована у 2026 році · ЧНУ ім. Юрія Федьковича
              </div>
            </div>
            <nav>
              <a href="/">Головна</a>
              <a href="/categories/programming">Програмування</a>
              <a href="/categories/ai-ml">Штучний інтелект</a>
              <a href="/categories/gadgets">Пристрої</a>
              <a href="/categories/cybersecurity">Інформаційна безпека</a>
              <a href="/categories/tools">Інструменти</a>
              <a href="/about">Про нас</a>
            </nav>
          </div>
          <div className="y2k-ticker">
            <span className="y2k-ticker-inner">
              ★ ЛАСКАВО ПРОСИМО ДО ІПЗ-ПЕДІЇ! ★ &nbsp;&nbsp;&nbsp;
              Тут ти знайдеш все що треба знати про ІТ: від пристроїв до алгоритмів &nbsp;&nbsp;&nbsp;
              ★ НОВІ СТАТТІ ЩОТИЖНЯ ★ &nbsp;&nbsp;&nbsp;
              Кафедра ІПЗ · ЧНУ · 2026 &nbsp;&nbsp;&nbsp;
              ★ ОПТИМІЗОВАНО ПІД 1024x768 ★ &nbsp;&nbsp;&nbsp;
            </span>
          </div>
        </header>
        <main>
          <div className="container">{children}</div>
        </main>
        <footer>
          <p>
            © 2026 <strong>ІПЗ-педія</strong> · Кафедра інженерії програмного забезпечення · ЧНУ ім. Ю. Федьковича
          </p>
          <p style={{ marginTop: 4 }}>
            <a href="/about">Про нас</a> ·{' '}
            <a href="mailto:admin@ipzpedia.pp.ua">admin@ipzpedia.pp.ua</a> ·{' '}
            <a href="https://github.com/tkachmaksym-creator/it-blog-project" target="_blank" rel="noopener noreferrer">GitHub</a>
          </p>
        </footer>
      </body>
    </html>
  );
}
