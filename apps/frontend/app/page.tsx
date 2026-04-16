import { getArticles } from '@/lib/api';
import ArticleList from './components/ArticleList';
import HomeSidebar from './components/HomeSidebar';

export const revalidate = 300;

export default async function HomePage() {
  const { data: articles, meta } = await getArticles();

  return (
    <div className="layout-with-sidebar">
      <div className="layout-main">
        <h1 className="page-heading">ІПЗ-педія: IT-блог про програмування, AI, безпеку та гаджети</h1>
        <ArticleList articles={articles} />

      {meta && meta.totalPages > 1 && (
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ color: '#000' }}>
            Сторінка 1 з {meta.totalPages}
          </span>
        </div>
      )}
      </div>

      <HomeSidebar />
    </div>
  );
}
