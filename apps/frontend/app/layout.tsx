import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'IT Blog — Новини про технології',
    template: '%s | IT Blog',
  },
  description: 'Актуальні новини та статті про JavaScript, Backend, AI, кібербезпеку та інші IT технології.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <header>
          <div className="container">
            <a href="/" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
              IT Blog
            </a>
            <nav>
              <a href="/categories/javascript">JavaScript</a>
              <a href="/categories/backend">Backend</a>
              <a href="/categories/ai-ml">AI & ML</a>
              <a href="/categories/cybersecurity">Кібербезпека</a>
            </nav>
          </div>
        </header>
        <main>
          <div className="container">{children}</div>
        </main>
        <footer>
          <p>© 2026 IT Blog. Всі права захищені.</p>
        </footer>
      </body>
    </html>
  );
}
