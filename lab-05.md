# Лабораторна робота №5. Внутрішня перелінковка

---

## Мета

Провести аудит внутрішньої перелінковки ІПЗ-педії, виявити orphan pages, оцінити анкори, перевірити глибину кліків,
побудувати схему перелінковки та впровадити покращення: breadcrumbs і блок схожих статей.

---

## Об'єкт аналізу

```text
https://frontend-production-0907.up.railway.app
```

Формат таблиць: Markdown замість Google Sheets.

---

## 1. Pages Inventory

| URL | Тип сторінки | Назва | Вхідні посилання | Вихідні посилання | Статус |
|-----|--------------|-------|------------------|-------------------|--------|
| `/` | home | Головна | - | 10+ | linked |
| `/about` | static | Про нас | 2+ | 2+ | linked |
| `/categories/programming` | category | Програмування | header/nav | article links | linked |
| `/categories/backend` | category | Backend | header/nav | article links | linked |
| `/categories/ai-ml` | category | AI та ML | header/nav | article links | linked |
| `/categories/cybersecurity` | category | Кібербезпека | header/nav | article links | linked |
| `/categories/gadgets` | category | Гаджети | header/nav | article links | linked |
| `/categories/tools` | category | Інструменти | header/nav | article links | linked |
| `/articles/y2k-windows-style-review` | article | Огляд Windows-стилів | home/category | author/category/related | linked |
| `/articles/why-ipz-is-the-best` | article | Чому ІФТКН найкращий для ІПЗ | home/category | author/category/about | linked |
| `/authors/admin` | author | Максим Ткач | article author link | articles list | linked |
| `/authors/oleksii-ivanov` | author | Олексій Іванов | article author link | articles list | linked |
| `/sitemap.xml` | technical | Sitemap | robots/GSC | URL list | linked |
| `/robots.txt` | technical | Robots | direct/GSC | sitemap | linked |

Під час технічного аудиту було знайдено, що `/authors` був у sitemap, але окремої listing-сторінки не існувало. URL
прибрано з sitemap, щоб не створювати зайвий невалідний entry для Googlebot.

---

## 2. Orphan pages

| Сторінка | Де має бути посилання | Результат | Статус |
|----------|-----------------------|-----------|--------|
| `/articles/y2k-windows-style-review` | головна, категорія programming | Є посилання з головної/категорії | linked |
| `/articles/why-ipz-is-the-best` | головна, категорія programming | Є посилання з головної/категорії | linked |
| `/authors/admin` | блок автора у статті | Є посилання зі статті | linked |
| `/authors/oleksii-ivanov` | блок автора у статті | Є посилання зі статті | linked |
| `/about` | header/footer/sidebar | Є посилання | linked |
| `/authors` | sitemap | Окремої сторінки немає | removed from sitemap |

Висновок: основні сторінки не є orphan pages. Проблемний `/authors` прибрано з sitemap.

---

## 3. Anchor Audit

| Сторінка-джерело | Анкор текст | URL призначення | Тип анкору | Оцінка |
|------------------|-------------|-----------------|------------|--------|
| `/` | `Детальніше про ІПЗ-педію` | `/about` | descriptive | ✅ |
| `/` | назва статті | `/articles/y2k-windows-style-review` | descriptive | ✅ |
| `/` | `Програмування` | `/categories/programming` | navigation | ✅ |
| `/articles/y2k-windows-style-review` | `Олексій Іванов` | `/authors/oleksii-ivanov` | author/branded | ✅ |
| `/articles/y2k-windows-style-review` | `Програмування` | `/categories/programming` | breadcrumb/category | ✅ |
| `/articles/y2k-windows-style-review` | назва схожої статті | `/articles/why-ipz-is-the-best` | related/descriptive | ✅ |
| `/articles/why-ipz-is-the-best` | `Максим Ткач` | `/authors/admin` | author/branded | ✅ |
| `/about` | `GitHub` | GitHub repo | external/branded | ✅ |
| footer | `Про нас` | `/about` | descriptive | ✅ |
| footer | `admin@ipzpedia.pp.ua` | mailto | contact | ✅ |

Проблему generic-анкору виправлено: `Детальніше` замінено на описовий анкор `Детальніше про ІПЗ-педію`.

---

## 4. Глибина кліків

| Сторінка | Шлях від головної | Кількість кліків | Статус |
|----------|-------------------|------------------|--------|
| `/about` | `/` -> `/about` | 1 | ✅ |
| `/categories/programming` | `/` -> `/categories/programming` | 1 | ✅ |
| `/categories/backend` | `/` -> `/categories/backend` | 1 | ✅ |
| `/articles/y2k-windows-style-review` | `/` -> `/articles/y2k-windows-style-review` | 1 | ✅ |
| `/articles/why-ipz-is-the-best` | `/` -> `/articles/why-ipz-is-the-best` | 1 | ✅ |
| `/authors/oleksii-ivanov` | `/` -> article -> `/authors/oleksii-ivanov` | 2 | ✅ |
| `/authors/admin` | `/` -> article -> `/authors/admin` | 2 | ✅ |

Максимальна глибина кліків: 2. Це відповідає нормі: будь-яка важлива сторінка доступна за 3 кліки або менше.

---

## 5. Чек-ліст типових помилок

| Помилка | Присутня | Де саме | Як виправити |
|---------|----------|---------|--------------|
| Orphan pages | Ні для основних сторінок | `/authors` був зайвим у sitemap | Прибрано `/authors` із sitemap |
| Generic анкори | Ні для основних внутрішніх links | Було `Детальніше` на головній | Замінено на `Детальніше про ІПЗ-педію` |
| Посилання на себе | Не критично | Можливі nav/footer links | Не є пріоритетною проблемою |
| Зламані внутрішні посилання | Не виявлено для основних URL | - | Періодично перевіряти crawl |
| Надлишкова перелінковка | Ні | - | Не додавати 10+ посилань в один абзац |
| Глибина кліків > 3 | Ні | - | Поточна глибина до 2 кліків |
| Посилання через JS замість `<a href>` | Ні | Next.js `Link` рендерить нормальні посилання | Контролювати інтерактивні елементи |
| `nofollow` на внутрішніх посиланнях | Ні | - | Не використовувати nofollow для важливих внутрішніх links |

---

## 6. Link Scheme

| Звідки | Куди | Анкор текст | Тип посилання | Розміщення | Пріоритет |
|--------|------|-------------|---------------|------------|-----------|
| `/` | `/categories/programming` | `Програмування` | nav | header navigation | high |
| `/` | `/categories/backend` | `Backend` | nav | header navigation | high |
| `/` | `/categories/ai-ml` | `AI та ML` | nav | header navigation | high |
| `/` | `/categories/cybersecurity` | `Кібербезпека` | nav | header navigation | high |
| `/` | `/categories/gadgets` | `Гаджети` | nav | header navigation | medium |
| `/` | `/categories/tools` | `Інструменти` | nav | header navigation | medium |
| `/` | `/about` | `Про нас` | nav | footer/sidebar | high |
| `/` | `/articles/y2k-windows-style-review` | назва статті | contextual | article listing | high |
| `/` | `/articles/why-ipz-is-the-best` | назва статті | contextual | article listing | high |
| `/categories/programming` | `/articles/y2k-windows-style-review` | `Огляд старих добрих Windows-стилів` | contextual | article listing | high |
| `/categories/programming` | `/articles/why-ipz-is-the-best` | `Чому ІФТКН найкращий для ІПЗ` | contextual | article listing | high |
| `/articles/y2k-windows-style-review` | `/categories/programming` | `Програмування` | breadcrumb | top of article | high |
| `/articles/y2k-windows-style-review` | `/authors/oleksii-ivanov` | `Олексій Іванов` | author | article meta + author block | high |
| `/articles/y2k-windows-style-review` | `/articles/why-ipz-is-the-best` | назва схожої статті | related | related articles | medium |
| `/articles/why-ipz-is-the-best` | `/categories/programming` | `Програмування` | breadcrumb | top of article | high |
| `/articles/why-ipz-is-the-best` | `/authors/admin` | `Максим Ткач` | author | article meta + author block | high |
| `/articles/why-ipz-is-the-best` | `/about` | `ІПЗ-педія` | contextual | article/body або sidebar | medium |
| `/about` | GitHub repo | `GitHub` | external branded | team/contact block | low |
| `/robots.txt` | `/sitemap.xml` | `Sitemap` | technical | robots directive | high |
| `/sitemap.xml` | публічні URL | canonical URLs | technical | XML entries | high |

---

## 7. Впровадження блоку “Схожі статті”

На сторінці `/articles/[slug]` уже реалізовано блок схожих статей. Він отримує матеріали з тієї самої категорії через
API:

```text
GET /api/articles/:slug/related
```

Фрагмент реалізації:

```tsx
{related.data?.length > 0 && (
  <section>
    <h3>Схожі статті</h3>
    {related.data.map((r) => (
      <Link key={r.slug} href={`/articles/${r.slug}`}>
        {r.title}
      </Link>
    ))}
  </section>
)}
```

Це покращує внутрішню перелінковку всередині тематичного силосу.

---

## 8. Впровадження breadcrumbs

Для сторінки статті додано breadcrumbs:

```text
Головна -> Програмування -> Огляд старих добрих Windows-стилів (Y2K)
```

Також додано `BreadcrumbList` JSON-LD, що допомагає Google зрозуміти структуру сторінки.

---

## 9. Виправлені проблеми

| № | Проблема | Тип | Що зроблено | URL де виправлено |
|---|----------|-----|-------------|-------------------|
| 1 | `/authors` був у sitemap без окремої сторінки | sitemap/orphan risk | Прибрано `/authors` із sitemap | `/sitemap.xml` |
| 2 | На статті не було breadcrumbs | глибина/структура | Додано breadcrumbs на `/articles/[slug]` | `/articles/y2k-windows-style-review` |
| 3 | Не було BreadcrumbList structured data | structured data/internal architecture | Додано `BreadcrumbList` JSON-LD | `/articles/[slug]` |
| 4 | Не було canonical на динамічних сторінках | canonical | Додано `alternates.canonical` для article/category/author | `/articles/[slug]`, `/categories/[slug]`, `/authors/[slug]` |
| 5 | Generic-анкор `Детальніше` | anchor | Замінено на `Детальніше про ІПЗ-педію` | `/` |

Докази:

- sitemap після виправлення: `images/sitemap.png`;
- авторський блок: `images/article_author_block.png`;
- PageSpeed сторінки статті: `images/pagespeed_mobile_article.png`, `images/pagespeed_computer_article.png`.

---

## Контрольні питання

1. **Що таке PageRank і як перелінковка впливає на нього?**  
   PageRank - умовна вага сторінки, яка передається через посилання. Внутрішні посилання допомагають направити цю вагу
   на важливі сторінки.

2. **Що таке orphan page?**  
   Це сторінка, на яку не веде жодне внутрішнє посилання. Google може її не знайти або вважати менш важливою, навіть
   якщо вона є в sitemap.

3. **Різниця між `nofollow` та `noopener`.**  
   `nofollow` каже пошуковикам не передавати вагу посилання. `noopener` захищає сторінку при відкритті зовнішнього
   посилання в новій вкладці.

4. **Чому contextual links цінніші за footer/nav?**  
   Бо вони розміщені в контексті статті й краще пояснюють тематичний зв'язок між сторінками.

5. **Що таке crawl depth?**  
   Це кількість кліків від головної до сторінки. Бажано тримати важливі сторінки на глибині до 3 кліків.

6. **50 посилань на сторінці категорії - це проблема?**  
   Не обов'язково, але вага кожного окремого посилання розмивається. Для молодого сайту краще мати зрозумілу пагінацію і
   пріоритезацію важливих статей.

7. **Чому `як працюють замикання в JavaScript` краще за `читати тут`?**  
   Другий анкор описує тему цільової сторінки, допомагає користувачу і дає Google контекст.

8. **Що буде, якщо статті в одному силосі не посилаються одна на одну?**  
   Силос буде слабшим: Google гірше побачить тематичний зв'язок, а користувачі менше переходять між матеріалами.

9. **Чи проблема, якщо сторінка посилається сама на себе?**  
   Це не критична помилка, але зазвичай не дає користі. Краще уникати зайвих self-links у тілі статті.

10. **Header navigation vs contextual links.**  
    Header links важливі для доступності та структури. Contextual links зазвичай сильніші тематично, бо знаходяться в
    змісті сторінки.

11. **Які сторінки отримують найбільше внутрішніх посилань?**  
    Головна, `/about`, категорії та популярні статті. Це відповідає SEO-стратегії: категорії мають бути сильними
    хабами.

12. **Як умовно розподіляється PageRank?**  
    Головна передає вагу категоріям і featured-статтям. Категорії передають її статтям. Найменше отримують сторінки,
    які доступні лише через другий рівень або мають мало внутрішніх посилань.

13. **Що варто запозичити у DOU/AIN?**  
    Breadcrumbs, пов'язані статті, теги, чіткі категорії, блок автора, редакційні сторінки та перелінковку з архівів.

14. **Як зміниться структура при серіях статей?**  
    Потрібно додати `/series/[slug]`, посилання з кожної статті на серію, `prev/next` між частинами та блок “Усі статті
    серії”.

---

## Висновок

Внутрішня перелінковка ІПЗ-педії має хорошу базу: головна сторінка веде на категорії та статті, категорії працюють як
тематичні силоси, статті мають авторські посилання і блок схожих матеріалів. Під час аудиту знайдено й виправлено
проблему з `/authors` у sitemap, додано breadcrumbs, canonical, BreadcrumbList JSON-LD і покращено generic-анкор на
головній сторінці. Наступний крок - додати більше contextual links між статтями одного силосу.
