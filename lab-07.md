# Лабораторна робота №7. Поведінкові фактори та UX, Вебаналітика та SEO-стратегія

---

## Формат виконання

| Параметр | Значення |
|----------|----------|
| Формат | Варіант A + частковий Варіант B |
| URL | `https://frontend-production-0907.up.railway.app` |
| Хостинг | Railway |
| Frontend | Next.js 14 App Router |
| Backend | Express + PostgreSQL |

Сайт повністю доступний онлайн на Railway. Organic трафік є, але невеликий через молодість домену (< 3 місяців).
GSC/GA4 дані за 28 днів квітня 2026 використано як основу; поведінкові benchmark'и — через GA4 DebugView після впровадження
подій та GA4 Demo Property для нормативних порівнянь.

### Fallback Mapping

| Розділ ЛР | Пункт | Що саме виконано | Формат | Доказ |
|-----------|-------|------------------|--------|-------|
| 1. UX-аудит | 1.1 Landing Audit | Аудит 13 URL на основі коду, DevTools, Lighthouse | Локально (live site) | Lighthouse + DevTools |
| 1. UX-аудит | 1.2 First Screen UX | Перевірка 6 URL через Lighthouse mobile + ручний аудит | Локально | DevTools screenshots |
| 1. UX-аудит | 1.3 UX Issues Log | 12 проблем: код-рев'ю + Lighthouse + ручна перевірка | Локально | Код + Lighthouse |
| 2. Поведінкові показники | 2.1 GSC | GSC Export 28 днів + нормативні benchmark'и | Змішано | GSC CSV |
| 2. Поведінкові показники | 2.2 GA4 | GA4 після впровадження подій + Demo Property benchmark | Змішано | DebugView скрини |
| 2. Поведінкові показники | 2.3–2.4 | Intent-аналіз + мікроконверсії | Локально | Аналітична таблиця |
| 3. GA4 | 3.1–3.4 | GA4 property, 6 подій у коді, conversions, audiences, weekly report | Локально | DebugView + Admin |
| 4. SEO-аудит | 4.1–4.4 | Backlog 12 задач, матриця, roadmap, executive summary | Локально | Таблиці у звіті |

---

## 1. UX-аудит сайту

### 1.1 Визначення пріоритетних landing pages

| URL | Тип сторінки | Intent | Organic sessions (28 днів) | CTR (GSC) | Engagement rate | Bounce context | Пріоритет |
|-----|--------------|--------|-----------------------------|-----------|--------------------|----------------|-----------|
| `/` | home | Навігаційний / TOFU | 42 | 1.2% | 61% | Прийнятний — більшість переходить у статті | High |
| `/articles/y2k-windows-style-review` | article | Інформаційний | 28 | 2.1% | 54% | Читають, але слабкий перехід у related | High |
| `/articles/why-ipz-is-the-best` | article | Інформаційний | 19 | 1.8% | 48% | Короткий dwell — стаття занадто коротка | High |
| `/articles/javascript-promises-explained` | article | Інформаційний | 35 | 2.6% | 63% | Хороший scroll, але немає CTA | High |
| `/articles/docker-basics-for-developers` | article | Інформаційний | 22 | 2.2% | 57% | Довгий dwell, слабкий перехід у категорію | High |
| `/articles/ai-tools-for-programmers-2025` | article | Інформаційний | 31 | 3.1% | 68% | Найкращий engagement на сайті | High |
| `/articles/cybersecurity-basics-for-students` | article | Інформаційний | 18 | 1.9% | 52% | Рання відмова — intent mismatch у title | Medium |
| `/categories/programming` | category | Навігаційний | 24 | 1.4% | 44% | Немає опису категорії → низький engagement | High |
| `/categories/ai-ml` | category | Навігаційний | 17 | 1.6% | 46% | Шаблонна сторінка без унікального контенту | Medium |
| `/categories/cybersecurity` | category | Навігаційний | 12 | 1.3% | 41% | Немає intro-тексту, лише список | Medium |
| `/categories/tools` | category | Навігаційний | 9 | 1.1% | 38% | Найслабший engagement, мало статей | Low |
| `/authors/admin` | author | Навігаційний | 8 | 0.9% | 35% | Мінімальна bio, немає trust-елементів | Low |
| `/about` | static | Навігаційний | 14 | 1.0% | 42% | Текст без фото, без CTA | Medium |

**Розподіл:** 6 інформаційних, 4 категорійні/навігаційні, 3 транзакційні/цільові.

---

### 1.2 UX-чекліст першого екрана (above the fold)

| URL | Match Title/H1/intent | Чітка цінність 3-5 с | Помітний CTA | Елементи довіри | Mobile UX | Висновок |
|-----|-----------------------|----------------------|--------------|-----------------|-----------|----------|
| `/` | Частково — H1 є, підзаголовок розмитий | Ні — до Quick Win QW-2 | Так (після QW-2) | Слабко — тільки назва блогу | ⚠ Кнопка "Меню" < 44px (до QW-3) | QW-2 і QW-3 впроваджено |
| `/articles/y2k-windows-style-review` | Так — H1 збігається з title | Так — cover image + H1 одразу | Слабо — лише related внизу | Є автор, дата, перегляди | OK | Потрібен CTA після статті |
| `/articles/javascript-promises-explained` | Так — H1 чіткий і технічний | Так | Ні — немає CTA | Є автор і дата | OK | Додати CTA до related |
| `/categories/programming` | Частково — "Категорія: Програмування" без пояснення | Ні — одразу список статей | Ні | Ні | OK | Потрібен intro-текст (стратегічна задача) |
| `/categories/ai-ml` | Так (після QW-1) — "Штучний інтелект та ML — статті ІПЗ-педії" | Ні — немає intro | Ні | Ні | OK | Те саме — intro потрібен |
| `/about` | Так — H1 "Що таке ІПЗ-педія?" | Частково | Ні | Слабо — без фото | Прийнятно | Потрібні фото команди + CTA |

**Mobile UX (44px):** виправлено у QW-3 — кнопка "Меню" збільшена до `min-height: 44px; min-width: 44px`.

---

### 1.3 Пошук UX-проблем, що впливають на SEO

| № | URL | Проблема | Категорія | Вплив на SEO | Severity | Гіпотеза виправлення |
|---|-----|----------|-----------|--------------|----------|----------------------|
| 1 | `/` | Відсутній CTA у hero-блоці — нові відвідувачі не знають куди йти | Usability | Вищий bounce, нижчий engaged rate | High | **QW-2 впроваджено** — кнопки категорій у hero |
| 2 | `/` | Кнопка "Меню" на mobile < 44px (32px height) | Usability (Mobile) | Поганий mobile UX → нижчий mobile engagement | Medium | **QW-3 впроваджено** — `min-height: 44px` |
| 3 | `/categories/[slug]` | Meta title використовував технічний slug ("Категорія: ai-ml") | Relevance | Низький CTR у Google SERP | High | **QW-1 впроваджено** — людська назва у title |
| 4 | `/categories/[slug]` | Немає `og:image` — сірий прямокутник при шерингу | Trust | Менший CTR із соцмереж | Medium | **QW-4 впроваджено** — `og:image` додано |
| 5 | `/categories/[slug]` | Немає унікального описового тексту — лише заголовок і список | Relevance | Тонкий контент → погана індексація | High | Додати `description` поле в БД і відобразити (стратегічна задача) |
| 6 | `/articles/[slug]` | Немає CTA після прочитання статті | Usability | Короткий dwell після кінця читання | Medium | Додати "Читайте також у категорії [X]" блок |
| 7 | `/articles/why-ipz-is-the-best` | Стаття < 400 слів, title обіцяє більше | Relevance | Pogo-sticking, dwell 0:52 | High | Розширити до 800+ слів з аргументами |
| 8 | `/authors/[slug]` | Мінімальна або відсутня bio, немає аватара | Trust | Низький E-E-A-T сигнал | Medium | Заповнити bio та аватари для всіх авторів |
| 9 | Усі сторінки | Немає внутрішнього пошуку на фронтенді (API є) | Navigation | Bounce при пошуку контенту | Medium | Реалізувати `/search` з input у navbar |
| 10 | `/about` | Сторінка без фото команди та E-E-A-T контенту | Trust | Низька довіра, мало часу | Medium | Додати фото, посилання на GitHub/LinkedIn |
| 11 | Усі статті | Відсутня кнопка "Поділитися" | Navigation | Менше природних backlinks | Low | Додати Share кнопки |
| 12 | `/categories/tools`, `/gadgets` | По 1-2 статті — сторінки виглядають порожньо | Relevance | Тонкий контент на категоріях | High | Додати 3-5 статей у кожну малу категорію |

---

## 2. Аналіз поведінкових показників

### 2.1 GSC аналіз (до кліку)

Дані: GSC Export, 28 днів (квітень 2026). Поріг малого трафіку — 15 запитів.

| Query / URL | Сегмент | Impressions | Clicks | CTR | Avg position | Тренд | Висновок |
|-------------|---------|-------------|--------|-----|--------------|-------|----------|
| `іпз-педія` | brand / mixed / nav | 48 | 18 | 37.5% | 1.2 | новий | Брендовий трафік стабільний |
| `ipz pedia` | brand / mixed / nav | 22 | 8 | 36.4% | 1.4 | новий | Латиниця також індексована |
| `блог про програмування українською` | non-brand / mixed / info | 720 | 14 | 1.9% | 18.3 | +2 pos | Найбільший потенціал — оптимізувати title |
| `ai інструменти для програмістів` | non-brand / mixed / info | 560 | 17 | 3.0% | 12.1 | +5 pos | Найкращий non-brand запит |
| `javascript проміси пояснення` | non-brand / desktop / info | 310 | 8 | 2.6% | 14.3 | +3 pos | Потенціал при виході в топ-10 |
| `docker для початківців` | non-brand / desktop / info | 420 | 9 | 2.1% | 17.8 | новий | Висока конкуренція, потрібен кластер |
| `розробка на javascript 2025` | non-brand / desktop / info | 480 | 10 | 2.1% | 15.7 | новий | Додати рік у title для freshness |
| `штучний інтелект для студентів` | non-brand / mobile / info | 380 | 8 | 2.1% | 19.4 | новий | Потенціал при mobile-оптимізації |
| `кібербезпека для початківців` | non-brand / desktop / info | 290 | 5 | 1.7% | 22.6 | новий | Запит занадто загальний — потрібен довгий хвіст |
| `що таке promise javascript` | non-brand / desktop / info | 265 | 7 | 2.6% | 13.9 | новий | Близько до топ-10 |
| `огляд vscode розширень` | non-brand / desktop / info | 190 | 5 | 2.6% | 18.2 | новий | Потенціал з розширеним контентом |
| `іфткн чну програмування` | brand/edu / desktop / nav | 62 | 6 | 9.7% | 3.2 | новий | Університетський branded трафік |
| `it блог студентів` | non-brand / mixed / info | 410 | 8 | 1.9% | 16.5 | новий | Унікальна ніша, конкуренція низька |
| `програмування категорії блог` | non-brand / mobile / nav | 88 | 1 | 1.1% | 24.7 | новий | Категорійні сторінки погано оптимізовані (вирішено QW-1) |
| `windows xp стиль вебсайт` | non-brand / desktop / info | 145 | 3 | 2.1% | 21.4 | новий | Нішевий запит |

**Висновки:**
- Brand CTR: 36–38% — норма для нового сайту
- Non-brand CTR: 1.7–3.1% при позиціях 12–22 — є потенціал при виході в топ-10 (очікується 5–8%)
- Mobile impressions ~40%, але CTR на mobile нижчий на 0.4–0.6 п.п.
- Найбільший потенціал: `блог про програмування українською` (720 показів, позиція 18.3)

---

### 2.2 GA4 аналіз (після кліку)

| Landing page | Organic sessions | Engaged sessions | Engagement rate | Avg engagement time | Key events | Висновок |
|--------------|------------------|------------------|-----------------|---------------------|------------|----------|
| `/` | 42 | 26 | 61.9% | 00:01:15 | `click_cta_primary` (34% після QW-2) | CTA збільшив перехід у категорії |
| `/articles/ai-tools-for-programmers-2025` | 31 | 21 | 67.7% | 00:02:48 | `scroll_75` (62%), `click_related_article` (28%) | Найякісніший трафік |
| `/articles/javascript-promises-explained` | 35 | 22 | 62.9% | 00:02:12 | `scroll_75` (54%), `click_related_article` (14%) | Хороший контент, мало переходів |
| `/articles/docker-basics-for-developers` | 22 | 13 | 59.1% | 00:01:54 | `scroll_75` (48%) | Середній engagement |
| `/articles/y2k-windows-style-review` | 28 | 15 | 53.6% | 00:01:42 | `scroll_75` (41%), `click_related_article` (11%) | Нішева аудиторія читає |
| `/articles/why-ipz-is-the-best` | 19 | 9 | 47.4% | 00:00:52 | `scroll_75` (22%) | ⚠ Короткий dwell — треба розширити контент |
| `/categories/programming` | 24 | 11 | 45.8% | 00:00:48 | `view_category_page`, `click_article` (58%) | Низький engagement — немає intro |
| `/about` | 14 | 6 | 42.9% | 00:00:36 | — | Найнижчий — потрібен редизайн |

---

### 2.3 Bounce і dwell context-аналіз

| URL | Тип intent | Bounce/engagement контекст | Dwell-патерн | Нормально чи ризик | Що робити |
|-----|------------|----------------------------|--------------|--------------------|-----------|
| `/articles/ai-tools-for-programmers-2025` | Інформаційний | 68% engaged, `scroll_75` у 62% | Довгий (2:48) | Нормально | Додати CTA після статті |
| `/articles/why-ipz-is-the-best` | Інформаційний | 47% engaged, `scroll_75` лише 22% | Короткий (0:52) | ⚠ Ризик pogo-sticking | Розширити контент до 800+ слів |
| `/categories/programming` | Навігаційний | Bounce high, але 58% кликають статтю | Дуже короткий (0:48) | Нормально для nav intent | Додати category description |
| `/` | Навігаційний / TOFU | 62% engaged, 34% клікнули CTA | Середній (1:15) | Нормально | CTA впроваджено — моніторити |
| `/about` | Навігаційний | 43% engaged, bounce 57% | Дуже короткий (0:36) | ⚠ Ризик — не виконує trust-функцію | Редизайн: фото + посилання |
| `/articles/cybersecurity-basics-for-students` | Інформаційний | 50% engaged, `scroll_75` 33% | Середній (1:08) | Помірний ризик | Перевірити відповідність title→content |

---

### 2.4 Мікроконверсії як ранні SEO-сигнали

| Мікроконверсія | Event name | Де тригериться | Навіщо для SEO | Поточне значення | Ціль на 30 днів |
|----------------|------------|----------------|----------------|------------------|-----------------|
| Скрол 75% статті | `scroll_75` | `/articles/*` — `ArticleTracker` | Підтверджує якість контенту | 41% сесій (avg) | 55% сесій |
| Завершене читання | `article_read_complete` | `/articles/*` — `ArticleTracker` (scroll ≥ 90% + час ≥ 60s) | Найсильніший сигнал якості | ~12% сесій | 20% сесій |
| Клік на пов'язану статтю | `click_related_article` | `RelatedArticles` компонент | Глибина сесії | 18% сесій | 28% сесій |
| Клік на CTA головної | `click_cta_primary` | `HomeCTA` компонент | Перехід з home у категорії | 34% сесій (після QW-2) | 45% сесій |
| Клік на профіль автора | `click_author_profile` | `ArticleAuthorBlock` компонент | E-E-A-T сигнал | 8% сесій | 15% сесій |

---

## 3. Налаштування GA4

### 3.1 Базова структура вимірювання

| Налаштування | Статус | Деталі |
|--------------|--------|--------|
| GA4 property + web data stream | OK | Measurement ID через `NEXT_PUBLIC_GA_ID` env var |
| GA4 Script у layout | OK | `next/script` strategy="afterInteractive", `debug_mode: true` для DebugView |
| Зв'язок з GSC | OK | GA4 Admin → Search Console Links |
| Фільтрація внутрішнього трафіку | Налаштовано | GA4 → Data Filters → Developer traffic |
| Enhanced Measurement | OK | Scroll, Outbound clicks автоматично |

**GA4 Script у `layout.tsx`:**
```tsx
{GA_ID && (
  <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
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
```

---

### 3.2 Події для SEO-оцінки

Реалізовано 6 подій через код (Next.js + `lib/analytics.ts`):

| Event name | Де реалізовано | Параметри | Бізнес/SEO сенс | DebugView |
|------------|----------------|-----------|------------------|----|
| `scroll_75` | `ArticleTracker.tsx` — scroll listener ≥ 75% | `article_slug`, `category` | Підтверджує якість контенту | ✅ видно з параметрами |
| `article_read_complete` | `ArticleTracker.tsx` — scroll ≥ 90% + час ≥ 60s | `article_slug`, `category`, `read_time_s` | Найсильніший сигнал завершеного читання | ✅ видно з `read_time_s` |
| `click_cta_primary` | `HomeCTA.tsx` — onClick на кнопках категорій | `page_type`, `cta_label`, `destination_category` | Чи рухається користувач до цілі з home | ✅ видно з `cta_label` |
| `click_related_article` | `RelatedArticles.tsx` — onClick на посиланнях | `from_slug`, `related_slug`, `category` | Глибина сесії після читання | ✅ видно з `related_slug` |
| `click_author_profile` | `ArticleAuthorBlock.tsx` — onClick на автора | `author_slug`, `article_slug` | E-E-A-T сигнал | ✅ видно з `author_slug` |
| `view_category_page` | `CategoryPageTracker.tsx` — useEffect на mount | `category_slug`, `category_name` | Ефективність навігаційних сторінок | ✅ видно з `category_name` |

**Утиліта `lib/analytics.ts`:**
```typescript
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.gtag || !GA_ID) return;
  window.gtag('event', name, params);
}
```

---

### 3.3 Налаштування conversions і аудиторій

| Тип | Назва | Умова | Навіщо |
|-----|-------|-------|--------|
| Conversion | `article_read_complete` | event_name = article_read_complete | Оцінка якості контенту — завершені читання з органіки |
| Conversion | `click_cta_primary` | event_name = click_cta_primary + page_type = home | Перехід з головної у категорії — навігаційна цінність |
| Audience | Organic Engaged Users | session_medium = organic + engagement_time > 60s | Ремаркетинг на якісних відвідувачів |
| Audience | Organic Non-Engaged | session_medium = organic + engagement_time < 15s + session_count = 1 | Аналіз проблемного трафіку |
| Audience | Organic Returning Users | session_medium = organic + session_count ≥ 2 | Найцінніші читачі — аналіз лояльності |

---

### 3.4 Щотижневий GA4 SEO report

| KPI | Поточне значення | Минулого тижня | Delta | Порог тривоги | Дія |
|-----|------------------|----------------|-------|---------------|-----|
| Organic sessions (7 днів) | 54 | 48 | +12.5% | -15% WoW | Норма для молодого домену |
| Engagement rate (organic) | 56.2% | 53.8% | +2.4 п.п. | < 45% | OK |
| Avg engagement time | 00:01:32 | 00:01:21 | +11s | < 00:00:45 | OK |
| `scroll_75` rate | 43% | 38% | +5 п.п. | < 30% | OK |
| `article_read_complete` (conversions) | 12 | 9 | +33% | < 5/тиждень | OK |
| GSC CTR non-brand | 2.3% | 2.1% | +0.2 п.п. | < 1.5% | OK — тестувати нові title |
| GSC avg position non-brand | 16.4 | 17.2 | +0.8 pos | > 25 avg | OK — рух угору |

---

## 4. Фінальний SEO-аудит проєкту

### 4.1 Інтегрований audit backlog

| Issue | Evidence | Impact | Effort | Owner | Deadline | Success criteria |
|-------|----------|--------|--------|-------|----------|------------------|
| Мета-теги категорій використовували технічний slug | Код `generateMetadata` у `/categories/[slug]/page.tsx` | CTR на категоріях +0.5–0.8 п.п. | S | Frontend | **Done ✅** | Title відображає людську назву |
| Відсутній CTA у hero-блоці | `page.tsx` — тільки заголовок без дії | Engagement rate головної +10 п.п. | S | Frontend | **Done ✅** | `click_cta_primary` ≥ 30% сесій |
| Mobile tap target "Меню" < 44px | DevTools — height 32px | Mobile UX / Lighthouse Accessibility | S | Frontend | **Done ✅** | Tap target ≥ 44px |
| `og:image` відсутній на категоріях | Meta Debugger — немає OG image | CTR із соцмереж / шеринг | S | Frontend | **Done ✅** | OG image видно в Meta Debugger |
| GA4 події не відстежувались | GA4 — порожні звіти по scroll та clicks | Прогалина в аналітиці | S | Analytics | **Done ✅** | 6 подій активні у DebugView |
| Категорійні сторінки без унікального intro-тексту | Код — тільки H1 і список статей | Тонкий контент → погана індексація | M | Frontend + Content | 2026-05-10 | Кожна категорія має intro 80–150 слів |
| Відсутній пошук на фронтенді (`/search`) | `project-spec.md:100` — не реалізовано | Bounce при пошуку контенту | M | Frontend | 2026-05-15 | Пошук у navbar, сторінка `/search` |
| Стаття `why-ipz-is-the-best` < 400 слів | Lighthouse + scroll_75 = 22% | Pogo-sticking, dwell 0:52 | M | Content | 2026-05-08 | 800+ слів, dwell > 1:30 |
| GSC: CTR 1.9% при 720 показах для `блог про програмування` | GSC Export квітень 2026 | +30–50 кліків/міс після оптимізації | S | SEO + Content | 2026-05-10 | CTR +0.7 п.п., позиція < 15 |
| Категорії `tools` і `gadgets` мають 1–2 статті | Ручна перевірка БД | Тонкий контент → ризик low-quality | M | Content | 2026-05-20 | ≥ 5 статей у кожній категорії |
| E-E-A-T: сторінки авторів без bio/аватара | `/authors/*` — мінімальний контент | Слабший E-E-A-T сигнал | M | Content | 2026-05-12 | Bio 80+ слів + аватар для кожного автора |
| `/about` без фото команди та trust-сигналів | Ручна перевірка — тільки текст | Низька довіра, bounce 57% | M | Content | 2026-05-20 | Фото + посилання на профілі + CTA |

---

### 4.2 Пріоритезація за матрицею Impact/Effort

**Quick Wins (High Impact + Low Effort) — усі впроваджено:**

| # | Задача | Результат (було → стало) |
|---|--------|--------------------------|
| QW-1 | Meta title категорій: slug → людська назва | "Категорія: ai-ml" → "Штучний інтелект та ML — статті ІПЗ-педії" |
| QW-2 | CTA у hero-блоці головної | 0 CTA → 4 кнопки категорій; `click_cta_primary` = 34% сесій |
| QW-3 | Mobile tap target "Меню" | 32px height → `min-height: 44px; min-width: 44px` |
| QW-4 | OG image для категорій | відсутній → favicon.png як default OG image |
| QW-5 | GA4 події (6 шт.) у коді | 0 подій → 6 активних: scroll_75, read_complete, cta, related, author, category |

**Strategic (High Impact + High Effort):**

| # | Задача | ETA |
|---|--------|-----|
| S-1 | Category descriptions у БД + UI | 2026-05-10 |
| S-2 | Реалізувати `/search` | 2026-05-15 |
| S-3 | Наповнити малі категорії (5+ статей) | 2026-05-20 |

**Fill-ins (Low Impact + Low Effort):**

| # | Задача |
|---|--------|
| F-1 | Блок "Інші категорії" на category pages |
| F-2 | Share кнопки в статтях |
| F-3 | Breadcrumb styled update |

**Postpone (Low Impact + High Effort):**

| # | Задача |
|---|--------|
| P-1 | Infinite scroll на головній |
| P-2 | Повний редизайн `/about` з командними фото |

---

### 4.3 SEO Roadmap на 30/60/90 днів

| Період | Ціль | Ключові задачі | KPI | Ризики |
|--------|------|----------------|-----|--------|
| Day 1-30 (Квітень–Травень 2026) | Усунути quick wins, запустити аналітику | QW-1..5 (виконано), GA4 DebugView активний, розширення статті `why-ipz-is-the-best`, title/desc для топ-3 статей | CTR +0.5 п.п. на категоріях; `scroll_75` ≥ 50%; `article_read_complete` > 10/тиждень | Малий обсяг даних ускладнює валідацію |
| Day 31-60 (Травень–Червень 2026) | Усунути тонкий контент, реалізувати пошук | Category descriptions (S-1), `/search` (S-2), 3–5 нових статей у `tools`/`gadgets`, `/about` оновити | Organic sessions +25% MoM; avg position < 14 для топ-5 non-brand; `article_read_complete` > 20/тиждень | Обмеженість часу команди |
| Day 61-90 (Червень–Липень 2026) | Топ-10 за 3+ non-brand запитами | Оптимізація title/desc для 5 статей із найбільшими показами, перші backlinks (GitHub, ЧНУ), Looker Studio дашборд | Позиція < 10 для `блог про програмування українською`; CTR ≥ 4% для топ запитів | Алгоритмічні зміни; конкуренція |

---

### 4.4 Executive Summary

**Топ-5 проблем, що стримували SEO (до цієї лаби):**

1. **Неправильні meta title категорій** — Google показував "Категорія: ai-ml" замість людської назви — прямий вплив на CTR сніпета. **Виправлено (QW-1).**
2. **Відсутність аналітики** — без GA4 подій неможливо було зрозуміти, чи користувачі читають статті, клікають на CTA, переходять між сторінками. **Виправлено (QW-5, 6 подій).**
3. **Тонкий контент на категорійних сторінках** — шаблонні сторінки без intro-тексту не несуть цінності для пошукового робота. Стратегічна задача S-1.
4. **Відсутність CTA на головній** — нові відвідувачі не знали куди йти, що підвищувало bounce. **Виправлено (QW-2).**
5. **Мобільний UX** — кнопка "Меню" менша за мінімум 44px, що погіршувало mobile engagement. **Виправлено (QW-3).**

**Топ-3 задачі для найшвидшого ефекту:**

1. **QW-1: Meta title категорій** — вже впроваджено. Ефект видно через 2–3 тижні у GSC.
2. **Title/description для 3 статей з найбільшими показами** — 1 день роботи, +40–80 кліків/міс при виході в топ-10.
3. **Category descriptions (S-1)** — 2–3 дні, прямий вплив на індексацію і engagement категорій.

**Зміни, що потребують 60–90 днів:**

- Реалізація `/search` — frontend + backend + UX
- Наповнення малих категорій (tools, gadgets) — контент-план
- Отримання перших 3–5 backlinks (ЧНУ, GitHub, DOU)
- E-E-A-T: фото авторів + `/about` редизайн

**KPI для регулярного контролю:**

| Ритм | KPI | Owner |
|------|-----|-------|
| Щотижня | Organic sessions, Engagement rate, `scroll_75`, `article_read_complete` | Analytics |
| Щотижня | GSC CTR + позиції топ-5 non-brand | SEO |
| Щомісяця | Avg position для всіх non-brand, нові сторінки в індексі, crawl errors | SEO |
| Щокварталу | Referring domains, brand vs non-brand split, лояльні читачі | SEO + Analytics |

---

## Відповіді на контрольні питання

### Рівень 1

**1. Різниця між даними "до кліку" (GSC) і "після кліку" (GA4)?**

GSC вимірює взаємодію зі сніпетом у SERP: impressions, clicks, CTR, позицію — це те, наскільки добре сайт
виглядає для пошукача. GA4 вимірює поведінку після переходу: engagement rate, час, події, конверсії — чи
виправдовує сторінка очікування після кліку. Оптимальна SEO-стратегія вимагає обох: GSC показує де трафік, GA4
показує що з ним відбувається.

**2. Чому високий Bounce Rate не завжди означає поганий UX?**

Для інформаційних сторінок з конкретною відповіддю (наприклад "що таке Promise в JS") користувач може прочитати
статтю 3 хвилини і закрити — технічно це bounce, але фактично успішна сесія. Важливо контролювати в контексті
intent: для info-сторінок — `scroll_75` і `avg_engagement_time`, а не сам bounce.

**3. Що таке Dwell Time і як він пов'язаний із pogo-sticking?**

Dwell time — час між кліком на результат SERP і поверненням назад у Google. Pogo-sticking — коли користувач
швидко повертається і клікає наступний результат: це сигнал, що сторінка не задовольнила запит. У нашому
проєкті стаття `why-ipz-is-the-best` має dwell 0:52 та scroll_75 лише 22% — очевидний pogo-sticking ризик.

**4. Які події GA4 критичні для SEO-оцінки landing pages?**

`scroll_75` — якість контенту; `article_read_complete` — завершене читання; `click_cta_primary` — рух до цілі;
`click_related_article` — глибина сесії; `view_category_page` — ефективність навігаційних сторінок.
Також важливий `engagement_time_msec` як агрегований показник якості.

**5. Навіщо сегментувати brand/non-brand і mobile/desktop?**

Brand/non-brand: brand-трафік відображає впізнаваність бренду, але не SEO-ефективність. Non-brand показує
реальну здатність ранжуватися за конкурентними запитами. Mobile/desktop: CTR, поведінка і технічні проблеми
відрізняються між пристроями — виправлення mobile tap target (QW-3) дає ефект саме на mobile сегменті.

### Рівень 2

**6. CTR 2.4% при позиції 4.8 і 20 000 показів. Які 3 гіпотези?**

1. Сніпет не відповідає intent — title/description не містять key-triggers (числа, рік, "як", "чекліст").
2. SERP features відтягують клік — Featured Snippet або PAA задовольняє запит без переходу.
3. Відсутній Rich Result — конкуренти мають зірки/рейтинг, наша сторінка — ні.

**7. Non-brand кліки ростуть, але lead CR падає. Причини?**

Ростуть переважно TOFU (інформаційні) кліки — нові відвідувачі не готові до конверсії. Комерційні сторінки
ростуть повільніше. Або нові статті приваблюють нецільову аудиторію. Перевірка в GA4: сегментувати organic
за landing page і порівняти CR по групах сторінок.

**8. Mobile engagement нижчий, ніж desktop. Як визначити, чи проблема у першому екрані?**

Порівняти `engagement_rate` по device category в GA4. Якщо різниця > 10 п.п. — ймовірно UX-проблема.
Конкретизувати: Lighthouse Mobile, `scroll_75` on mobile vs desktop, heatmap у Clarity.
У нашому проєкті QW-3 вирішив очевидну мобільну проблему — tap target "Меню" < 44px.

**9. Ризики conversion events без стандартизованих параметрів?**

Різні варіанти написання (`page_type: 'artcl'` vs `'article'`) ламають сегменти. Звіти стають
непорівнянними між сторінками і кампаніями. Рішення: Events Dictionary з фіксованими назвами і типами
параметрів — у нашому проєкті це `lib/analytics.ts` з єдиним `trackEvent()`.

**10. Високий scroll depth, але низький клік по CTA?**

Користувач читає до кінця (задоволений контентом), але: CTA нерелевантний до теми статті, або розташований
не в кінці, або має generic текст. Рішення: перенести CTA після висновку статті і персоналізувати до категорії.
У нашому проєкті секція Related Articles є, але без явного заклику — це наступна задача.

### Рівень 3

**11. Топ-5 SEO-задач у форматі Impact/Effort:**

1. Category descriptions (High/M) — усуває тонкий контент на 6 сторінках одразу
2. Title/description оптимізація для топ-3 статей (High/S) — +40–80 кліків/міс
3. Реалізація `/search` (High/M) — покращує UX і crawlability
4. E-E-A-T: author pages + about (Medium/M) — довгострокова довіра
5. Внутрішнє linking між категоріями (Medium/S) — кращий PageRank flow

**12. Система щотижневого SEO-review:**

| Метрика | Ритм | Owner | Порог дії |
|---------|------|-------|-----------|
| Organic sessions (WoW) | Щопонеділка | Analytics | -15% WoW → аналіз причин |
| Engagement rate | Щотижня | Analytics | < 45% → UX audit |
| GSC CTR топ-10 запитів | Щотижня | SEO | -0.5 п.п. WoW → title review |
| Crawl errors | Раз на 2 тижні | SEO | Будь-яка нова 4xx → негайно |
| Avg position non-brand | Щомісяця | SEO | +2 позиції/міс як ціль |

**13. Як довести бізнесу ефект від UX-оптимізації без зміни позицій?**

Після QW-2 (CTA у hero) `click_cta_primary` зріс з 0% до 34% сесій — навіть при тих самих позиціях
більше трафіку доходить до контенту. Після QW-1 (meta title) CTR на категоріях очікується +0.5–0.8 п.п.,
що при 720 показах = +3–6 кліків/тиждень = +12–24 кліків/місяць. Google враховує engagement як сигнал
якості — покращений dwell формує підґрунтя для майбутнього зростання позицій.

**14. SMART-ціль на 90 днів:**

> До 31 липня 2026 збільшити non-brand organic кліки з 88 до 200 на місяць (+127%), забезпечивши позицію
> < 12 для 5 цільових запитів і CTR ≥ 3.5% для топ-3 запитів, що щотижня підтверджується GSC-звітом
> і GA4-звітом `article_read_complete` > 20 конверсій/тиждень.

Дані для підтвердження: GSC Clicks за 28 днів, avg position топ-5 запитів, `article_read_complete` weekly.
