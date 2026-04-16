import { getArticles } from '@/lib/api';
import ArticleList from './components/ArticleList';
import HomeSidebar from './components/HomeSidebar';

export const revalidate = 300;

export default async function HomePage() {
  const { data: articles, meta } = await getArticles();

  return (
    <div className="layout-with-sidebar">
      <div className="layout-main">
        <section className="win-box home-intro" aria-labelledby="home-title">
          <div className="win-box-title">
            <h1 id="home-title">ІПЗ-педія: IT-блог про програмування, AI, безпеку та гаджети</h1>
          </div>
          <div className="win-box-body">
            <p>Свіжі записи, навчальні нотатки й технічні огляди від команди ІПЗ.</p>
          </div>
        </section>
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
