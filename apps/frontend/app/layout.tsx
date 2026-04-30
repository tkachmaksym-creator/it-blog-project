import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import './globals.css';

import Navbar from './components/Navbar';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

export const metadata: Metadata = {
  metadataBase: new URL('https://frontend-production-0907.up.railway.app'),
  title: {
    default: "ІПЗ-педія - Потужний вісник про IT та комп'ютерні науки",
    template: '%s | ІПЗ-педія',
  },
  description:
    'Незалежне видання про програмування, технології та життя спеціальності ІПЗ в ІФТКН ЧНУ.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: '/favicon.png',
  },
  openGraph: {
    title: "ІПЗ-педія - Потужний вісник про IT та комп'ютерні науки",
    description: 'Незалежне видання про програмування, технології та життя спеціальності ІПЗ в ІФТКН ЧНУ.',
    url: 'https://frontend-production-0907.up.railway.app',
    siteName: 'ІПЗ-педія',
    images: [
      {
        url: '/favicon.png',
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
                <Image src="/images/logo.png" alt="IPZ Logo" width={40} height={40} priority style={{ imageRendering: 'pixelated' }} />
                <Link href="/" className="site-logo">ІПЗ-педія</Link>
              </div>
              <div className="site-tagline">
                Спеціальність ІПЗ | ІФТКН<br />
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
              Спеціальність ІПЗ | ІФТКН | ЧНУ | 2026 &nbsp;&nbsp;&nbsp;
              ОПТИМІЗОВАНО ПІД 1024x768 &nbsp;&nbsp;&nbsp;
            </span>
          </div>
        </header>
        <main>
          <div className="container">{children}</div>
        </main>
        <footer>
          <p>
            © 2026 <strong>ІПЗ-педія</strong> | ІФТКН | Кафедра ПЗКС (Спеціальність ІПЗ) | ЧНУ
          </p>
          <p className="footer-links">
            <Link href="/about">Про нас</Link>
            <a href="mailto:admin@ipzpedia.pp.ua">admin@ipzpedia.pp.ua</a>
            <a href="https://github.com/tkachmaksym-creator/it-blog-project" target="_blank" rel="noopener noreferrer">GitHub</a>
          </p>
        </footer>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { debug_mode: true });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
