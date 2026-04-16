import type { Metadata } from 'next';
import './globals.css';

import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: {
    default: 'ІПЗ-педія — Найпотужніший вісник спеціальності ІПЗ | ЧНУ',
    template: '%s | ІПЗ-педія',
  },
  description:
    'Тут ми робимо IT душевним. Від ретро-технологій 90-х до сучасного AI — дізнайтеся, як стають справжніми майстрами на спеціальності ІПЗ в ІФТКН ЧНУ.',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: 'ІПЗ-педія — Найпотужніший вісник спеціальності ІПЗ',
    description: 'Енциклопедія IT від справжніх майстрів спеціальності ІПЗ. Тільки хардкор, проєкти та вайб 90-х.',
    url: 'https://ipzpedia.pp.ua',
    siteName: 'ІПЗ-педія',
    images: [
      {
        url: '/images/logo.png',
        width: 400,
        height: 400,
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
  verification: {
    google: 'ZKBuBgRJNf1ffu8iskDb1qSwxRRTFGRy4hpk3sTlkLo',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <header>
          <div className="container header-container">
            <div className="header-top">
              <div className="logo-group">
                <img src="/images/logo.png" alt="IPZ Logo" style={{ width: '40px', height: '40px', imageRendering: 'pixelated' }} />
                <a href="/" className="site-logo">ІПЗ-педія</a>
              </div>
              <div className="site-tagline">
                Спеціальність ІПЗ · ІФТКН<br />
                Чернівецький національний університет ім. Юрія Федьковича
              </div>
            </div>
            <Navbar />
          </div>
          <div className="y2k-ticker">
            <span className="y2k-ticker-inner">
              ЛАСКАВО ПРОСИМО ДО ІПЗ-ПЕДІЇ! &nbsp;&nbsp;&nbsp;
              Тут ти знайдеш все що треба знати про ІТ: від пристроїв до алгоритмів &nbsp;&nbsp;&nbsp;
              НОВІ СТАТТІ ЩОТИЖНЯ &nbsp;&nbsp;&nbsp;
              Спеціальність ІПЗ · ІФТКН · ЧНУ · 2026 &nbsp;&nbsp;&nbsp;
              ОПТИМІЗОВАНО ПІД 1024x768 &nbsp;&nbsp;&nbsp;
            </span>
          </div>
        </header>
        <main>
          <div className="container">{children}</div>
        </main>
        <footer>
          <p>
            © 2026 <strong>ІПЗ-педія</strong> · ІФТКН · Кафедра комп'ютерних наук (Спеціальність ІПЗ) · ЧНУ
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
