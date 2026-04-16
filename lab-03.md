# Лабораторна робота №3. Семантичне ядро та структура сайту

---

## Мета

Зібрати семантичне ядро для IT-блогу ІПЗ-педія, класифікувати запити за пошуковим інтентом, сформувати кластери,
спроєктувати silo-структуру сайту та описати схему внутрішньої перелінковки.

---

## Формат виконання

Замість Google Sheets таблиці оформлено безпосередньо у Markdown-звіті. Структура відповідає вимогам лабораторної:

- `Keywords` - семантичне ядро, 40 запитів;
- `Clusters` - зведення кластерів, 8 кластерів;
- `Structure` - silo-структура;
- `InternalLinks` - схема внутрішньої перелінковки, 16 посилань.

---

## 1. Класифікація типів пошукових запитів

| Тип інтенту | Опис | Приклад для ІПЗ-педії | Яка сторінка відповідає |
|-------------|------|------------------------|--------------------------|
| Informational | Користувач хоче дізнатися або навчитися | `що таке next.js` | Стаття або гайд |
| Navigational | Користувач шукає конкретний сайт/бренд/розділ | `іпз педія програмування` | Головна, категорія, about |
| Transactional | Користувач хоче виконати дію | `завантажити node.js` | Інструкція або сторінка ресурсу |
| Commercial | Користувач порівнює варіанти перед вибором | `next.js vs nuxt` | Порівняльна стаття |

### 1.1 Початкові 20 запитів за інтентом

| № | Пошуковий запит | Тип інтенту | Обґрунтування |
|---|-----------------|-------------|---------------|
| 1 | що таке next.js | informational | Користувач хоче пояснення технології |
| 2 | як працює ssr у next.js | informational | Потрібен навчальний матеріал |
| 3 | що таке postgres | informational | Пошук базового пояснення |
| 4 | як працює sitemap xml | informational | Потрібна інструкція |
| 5 | іпз педія | navigational | Пошук конкретного сайту |
| 6 | іпз педія про нас | navigational | Пошук сторінки `/about` |
| 7 | іпз педія програмування | navigational | Пошук конкретного розділу сайту |
| 8 | railway app ipz pedia | navigational | Пошук сайту за технічним доменом |
| 9 | завантажити node.js | transactional | Користувач хоче перейти до дії |
| 10 | встановити postgresql macos | transactional | Потрібна практична інструкція |
| 11 | налаштувати next.js проект | transactional | Користувач хоче виконати налаштування |
| 12 | створити sitemap next.js | transactional | Практична дія в коді |
| 13 | next.js vs nuxt | commercial | Порівняння фреймворків |
| 14 | node.js vs bun | commercial | Вибір runtime для backend |
| 15 | macbook air m4 для програмування | commercial | Порівняння/оцінка перед покупкою |
| 16 | postgresql vs mysql | commercial | Порівняння баз даних |
| 17 | що таке y2k дизайн | informational | Пояснення терміну |
| 18 | git workflow для команди | informational | Навчальний запит |
| 19 | owasp top 10 пояснення | informational | Пошук навчального матеріалу |
| 20 | ai tools для студентів | commercial | Порівняння інструментів |

### 1.2 Аналіз через Google Search

Для навчального проєкту аналіз виконано вручну через логіку autocomplete / People also ask / related searches. Запити,
які варто додати до ядра:

| Базовий запит | People also ask / пов'язані питання | Related / autocomplete |
|---------------|--------------------------------------|------------------------|
| `next.js ssr` | що таке SSR, чим SSR відрізняється від SSG, чи потрібен SSR для SEO | next.js ssr seo, next.js app router seo, server side rendering react |
| `node.js vs bun` | що швидше Node.js чи Bun, чи готовий Bun до production, чим Bun відрізняється від npm | bun runtime, node.js alternatives, bun vs deno |
| `macbook для програмування` | який MacBook взяти студенту, скільки RAM потрібно програмісту, чи підходить MacBook Air для Docker | macbook air m4 programming, laptop for coding students, macbook air vs pro developer |

---

## 2. Semantic Core: Keywords

| № | keyword | intent | volume | competition | cluster | target_page | priority | notes |
|---|---------|--------|--------|-------------|---------|-------------|----------|-------|
| 1 | next.js для початківців | informational | 100-1K | Medium | nextjs-ssr-seo | `/articles/why-ipz-is-the-best` | 1 | Базовий запит для SSR/Next.js |
| 2 | що таке next.js | informational | 100-1K | Medium | nextjs-ssr-seo | `/articles/why-ipz-is-the-best` | 1 | Добре для навчальної статті |
| 3 | next.js seo | informational | 100-1K | Medium | nextjs-ssr-seo | `/articles/why-ipz-is-the-best` | 1 | Прямо пов'язано з курсом SEO |
| 4 | ssr next.js | informational | 100-1K | Medium | nextjs-ssr-seo | `/articles/why-ipz-is-the-best` | 1 | Технічний SEO-запит |
| 5 | server side rendering react | informational | 1K-10K | High | nextjs-ssr-seo | `/articles/why-ipz-is-the-best` | 2 | Англомовний mid-tail |
| 6 | next.js app router seo | informational | 10-100 | Medium | nextjs-ssr-seo | `/articles/why-ipz-is-the-best` | 1 | Низька конкуренція, висока релевантність |
| 7 | javascript для початківців | informational | 1K-10K | High | programming-basics | `/categories/programming` | 1 | Категорійний запит |
| 8 | основи програмування | informational | 1K-10K | Medium | programming-basics | `/categories/programming` | 1 | Широкий запит |
| 9 | алгоритми сортування | informational | 100-1K | Medium | programming-basics | `/articles/learning-algorithms-sorting-not-boring` | 1 | Є релевантна стаття |
| 10 | quick sort пояснення | informational | 100-1K | Medium | programming-basics | `/articles/learning-algorithms-sorting-not-boring` | 2 | Long-tail |
| 11 | merge sort приклад | informational | 100-1K | Medium | programming-basics | `/articles/learning-algorithms-sorting-not-boring` | 2 | Підтема статті |
| 12 | структури даних для початківців | informational | 100-1K | Medium | programming-basics | `/categories/programming` | 2 | Майбутній контент |
| 13 | node.js backend | informational | 1K-10K | High | backend-runtime | `/categories/backend` | 1 | Категорія backend |
| 14 | node.js vs bun | commercial | 100-1K | Medium | backend-runtime | `/articles/nodejs-vs-bun-2025` | 1 | Порівняльний запит |
| 15 | bun runtime | informational | 100-1K | Medium | backend-runtime | `/articles/nodejs-vs-bun-2025` | 2 | Підтема |
| 16 | express js api | transactional | 1K-10K | High | backend-runtime | `/categories/backend` | 2 | Практична дія |
| 17 | створити rest api node.js | transactional | 100-1K | Medium | backend-runtime | `/categories/backend` | 1 | Майбутня інструкція |
| 18 | node.js alternatives | commercial | 100-1K | Medium | backend-runtime | `/articles/nodejs-vs-bun-2025` | 2 | Порівняння |
| 19 | postgresql для початківців | informational | 100-1K | Medium | database-postgresql | `/categories/backend` | 1 | Потрібна майбутня стаття |
| 20 | postgresql vs mysql | commercial | 1K-10K | High | database-postgresql | `/categories/backend` | 2 | Порівняння |
| 21 | встановити postgresql macos | transactional | 100-1K | Medium | database-postgresql | `/categories/backend` | 2 | Практична інструкція |
| 22 | postgres індекси | informational | 100-1K | Medium | database-postgresql | `/categories/backend` | 2 | Технічна тема |
| 23 | sql для початківців | informational | 1K-10K | High | database-postgresql | `/categories/backend` | 2 | Широкий запит |
| 24 | база даних для web app | commercial | 100-1K | Medium | database-postgresql | `/categories/backend` | 2 | Вибір технології |
| 25 | що таке rag | informational | 1K-10K | Medium | ai-ml-rag | `/articles/what-is-rag-retrieval-augmented-generation` | 1 | Є релевантна стаття |
| 26 | retrieval augmented generation | informational | 1K-10K | High | ai-ml-rag | `/articles/what-is-rag-retrieval-augmented-generation` | 1 | Англомовний head keyword |
| 27 | ai tools для студентів | commercial | 100-1K | Medium | ai-ml-rag | `/categories/ai-ml` | 2 | Майбутній огляд |
| 28 | vector database для rag | informational | 100-1K | Medium | ai-ml-rag | `/articles/what-is-rag-retrieval-augmented-generation` | 2 | Підтема |
| 29 | chatgpt для навчання програмуванню | informational | 100-1K | Medium | ai-ml-rag | `/categories/ai-ml` | 2 | Потенційна стаття |
| 30 | llm українською | informational | 100-1K | Low | ai-ml-rag | `/categories/ai-ml` | 3 | Нішевий запит |
| 31 | owasp top 10 | informational | 1K-10K | High | cybersecurity-owasp | `/articles/owasp-top-10-2025-web-vulnerabilities` | 1 | Є релевантна стаття |
| 32 | sql injection приклад | informational | 100-1K | Medium | cybersecurity-owasp | `/articles/owasp-top-10-2025-web-vulnerabilities` | 1 | Підтема |
| 33 | broken access control | informational | 100-1K | Medium | cybersecurity-owasp | `/articles/owasp-top-10-2025-web-vulnerabilities` | 2 | OWASP-підтема |
| 34 | веб безпека для розробників | informational | 100-1K | Medium | cybersecurity-owasp | `/categories/cybersecurity` | 1 | Категорійний запит |
| 35 | xss атака що це | informational | 100-1K | Medium | cybersecurity-owasp | `/categories/cybersecurity` | 2 | Майбутня стаття |
| 36 | як захистити api | transactional | 100-1K | Medium | cybersecurity-owasp | `/categories/cybersecurity` | 2 | Практичний інтент |
| 37 | macbook air m4 для програмування | commercial | 100-1K | Medium | dev-tools-gadgets | `/articles/apple-m4-macbook-air-review-students` | 1 | Є релевантна стаття |
| 38 | ноутбук для програміста | commercial | 1K-10K | High | dev-tools-gadgets | `/categories/gadgets` | 1 | Комерційний запит |
| 39 | git workflow для команди | informational | 100-1K | Medium | dev-tools-gadgets | `/articles/git-workflow-branches-pr-code-review` | 1 | Є релевантна стаття |
| 40 | github flow vs git flow | commercial | 100-1K | Medium | dev-tools-gadgets | `/articles/git-workflow-branches-pr-code-review` | 2 | Порівняльний запит |

### 2.1 Нотатки щодо Keyword Planner і Trends

Оскільки у звіті використано Markdown-формат, частотність подана діапазонами: `10-100`, `100-1K`, `1K-10K`. Для молодого
сайту пріоритет отримали long-tail та mid-tail запити з нижчою конкуренцією: `next.js app router seo`,
`macbook air m4 для програмування`, `git workflow для команди`, `vector database для rag`.

Для Google Trends доцільно порівнювати:

- `next.js` vs `nuxt` vs `sveltekit`;
- `node.js` vs `bun` vs `deno`;
- `macbook air m4` vs `macbook pro m4`;
- `chatgpt` vs `rag` vs `llm`.

Очікувана сезонність: запити про ноутбуки та навчання зростають перед початком навчального року, а запити про нові
технології часто мають піки після релізів.

---

## 3. Clusters

| cluster | Кількість запитів | Головний запит | Тип сторінки | Пріоритет |
|---------|-------------------|----------------|--------------|-----------|
| nextjs-ssr-seo | 6 | `next.js seo` | article | 1 |
| programming-basics | 6 | `javascript для початківців` | category + articles | 1 |
| backend-runtime | 6 | `node.js vs bun` | article | 1 |
| database-postgresql | 6 | `postgresql для початківців` | article/category | 2 |
| ai-ml-rag | 6 | `що таке rag` | article | 1 |
| cybersecurity-owasp | 6 | `owasp top 10` | article | 1 |
| dev-tools-gadgets | 4 | `ноутбук для програміста` | article/category | 2 |
| ipz-pedia-brand | 4 | `іпз педія` | home/about | 1 |

Принцип кластеризації: один кластер відповідає одній темі або одному наміру користувача. Наприклад, `node.js vs bun`,
`bun runtime` і `node.js alternatives` можна закрити однією порівняльною статтею, а `postgresql для початківців` і
`встановити postgresql macos` краще розвести між базовим гайдом та практичною інструкцією.

---

## 4. Silo-структура сайту

### 4.1 Рівень 0 - головна сторінка

| URL | Назва сторінки | Тип | Head keyword | Опис |
|-----|----------------|-----|--------------|------|
| `/` | Головна | home | `IT блог ІПЗ` | Останні статті, категорії, навігація по сайту |

### 4.2 Рівень 1 - категорії

| URL | Назва | Тип | Head keyword | Пов'язані категорії |
|-----|-------|-----|--------------|---------------------|
| `/categories/programming` | Програмування | category | `javascript для початківців` | Backend, Tools |
| `/categories/backend` | Backend | category | `node.js backend` | Programming, Cybersecurity |
| `/categories/ai-ml` | AI та ML | category | `що таке rag` | Tools, Programming |
| `/categories/cybersecurity` | Кібербезпека | category | `owasp top 10` | Backend |
| `/categories/gadgets` | Гаджети | category | `ноутбук для програміста` | Tools |
| `/categories/tools` | Інструменти | category | `git workflow для команди` | Programming, Backend |

### 4.3 Рівень 2 - статті всередині силосів

| URL | Назва статті | Категорія | Target keyword | Посилається на | Отримує посилання від |
|-----|--------------|-----------|----------------|----------------|-----------------------|
| `/articles/why-ipz-is-the-best` | Чому ІФТКН найкращий для ІПЗ | programming | `ІПЗ програмування` | `/about`, `/categories/programming` | `/`, `/categories/programming` |
| `/articles/y2k-windows-style-review` | Огляд старих добрих Windows-стилів | programming | `y2k дизайн` | `/authors/oleksii-ivanov`, `/categories/programming` | `/`, `/categories/programming` |
| `/articles/learning-algorithms-sorting-not-boring` | Вчимо алгоритми: чому сортування - це не нудно | programming | `алгоритми сортування` | `/categories/programming` | `/categories/programming` |
| `/articles/nodejs-vs-bun-2025` | Node.js vs Bun | backend | `node.js vs bun` | `/categories/backend` | `/categories/backend` |
| `/articles/what-is-rag-retrieval-augmented-generation` | Що таке RAG | ai-ml | `що таке rag` | `/categories/ai-ml` | `/categories/ai-ml` |
| `/articles/owasp-top-10-2025-web-vulnerabilities` | OWASP Top 10 2025 | cybersecurity | `owasp top 10` | `/categories/cybersecurity` | `/categories/cybersecurity` |
| `/articles/apple-m4-macbook-air-review-students` | Apple M4 MacBook Air | gadgets | `macbook air m4 для програмування` | `/categories/gadgets` | `/categories/gadgets` |
| `/articles/git-workflow-branches-pr-code-review` | Git для команди | tools | `git workflow для команди` | `/categories/tools` | `/categories/tools` |

### 4.4 Рівень 3 - допоміжні сторінки

| URL | Назва | Тип | Примітка |
|-----|-------|-----|----------|
| `/about` | Про нас | static | E-E-A-T, команда, місія |
| `/authors/[slug]` | Профіль автора | dynamic | Відкривається зі сторінки статті |
| `/tags/[slug]` | Тег | dynamic | Планована структура тегів |
| `/search` | Пошук | functional | Планована функціональна сторінка |
| `/sitemap.xml` | Sitemap | technical | Для Googlebot |
| `/robots.txt` | Robots | technical | Правила обходу |

---

## 5. Internal Links

| Звідки | Куди | Тип посилання | Анкор текст |
|--------|------|---------------|-------------|
| `/` | `/categories/programming` | navigation | `Програмування` |
| `/` | `/categories/backend` | navigation | `Backend` |
| `/` | `/categories/ai-ml` | navigation | `AI та ML` |
| `/` | `/categories/cybersecurity` | navigation | `Кібербезпека` |
| `/` | `/about` | navigation/contextual | `Про нас` |
| `/categories/programming` | `/articles/y2k-windows-style-review` | article listing | `Огляд старих добрих Windows-стилів` |
| `/categories/programming` | `/articles/why-ipz-is-the-best` | article listing | `Чому ІФТКН найкращий для ІПЗ` |
| `/categories/backend` | `/articles/nodejs-vs-bun-2025` | article listing | `Node.js vs Bun` |
| `/categories/ai-ml` | `/articles/what-is-rag-retrieval-augmented-generation` | article listing | `Що таке RAG` |
| `/categories/cybersecurity` | `/articles/owasp-top-10-2025-web-vulnerabilities` | article listing | `OWASP Top 10` |
| `/categories/gadgets` | `/articles/apple-m4-macbook-air-review-students` | article listing | `Apple M4 MacBook Air` |
| `/categories/tools` | `/articles/git-workflow-branches-pr-code-review` | article listing | `Git для команди` |
| `/articles/y2k-windows-style-review` | `/authors/oleksii-ivanov` | author link | `Олексій Іванов` |
| `/articles/why-ipz-is-the-best` | `/authors/admin` | author link | `Максим Ткач` |
| `/articles/y2k-windows-style-review` | `/categories/programming` | category/breadcrumb | `Програмування` |
| `/articles/why-ipz-is-the-best` | `/about` | contextual | `про ІПЗ-педію` |

---

## 6. Перевірка структури

1. **Чи кожна категорія є окремим тематичним силосом?**  
   Так. `programming`, `backend`, `ai-ml`, `cybersecurity`, `gadgets`, `tools` відповідають окремим тематичним
   напрямам. Кожна категорія має власний head keyword і набір статей.

2. **Чи є перехресні посилання між різними силосами?**  
   Є потенційні перехресні зв'язки між Programming і Backend, Backend і Cybersecurity, Tools і Programming. Вони
   виправдані, якщо посилання контекстні: наприклад, стаття про Express API може посилатися на статтю про захист API.

3. **Яка максимальна глибина кліків від головної до будь-якої статті?**  
   Максимум 2 кліки: `/` -> `/categories/[slug]` -> `/articles/[slug]`. Це відповідає нормі до 3 кліків.

4. **Чи є orphan pages?**  
   Для основних статей orphan pages не має бути, бо вони доступні з головної або категорій. Профілі авторів доступні зі
   сторінок статей. Сторінка `/authors` була прибрана з sitemap, бо окремої listing-сторінки немає.

---

## Контрольні питання

1. **Що таке пошуковий інтент?**  
   Це намір користувача за запитом: дізнатися, перейти на сайт, виконати дію або порівняти варіанти. Google орієнтується
   на інтент, бо однакові слова можуть означати різні потреби.

2. **Head, mid-tail та long-tail keywords.**  
   Head: `javascript`, дуже широкий і конкурентний. Mid-tail: `javascript для початківців`. Long-tail:
   `як працює ssr у next.js для seo`, менший обсяг, але вища точність інтенту.

3. **Що таке семантичне ядро?**  
   Це структурований набір ключових запитів із інтентами, частотністю, конкуренцією, кластерами та цільовими сторінками.
   Воно відрізняється від простого списку тим, що прив'язане до структури сайту.

4. **Що таке silo-структура?**  
   Це організація сайту за тематичними вертикалями. Вона допомагає Google зрозуміти, які сторінки належать до однієї
   теми, і краще передає внутрішній авторитет у межах категорії.

5. **Що таке канібалізація ключових слів?**  
   Це ситуація, коли кілька сторінок сайту конкурують за один і той самий запит. Внаслідок цього Google не розуміє, яку
   сторінку ранжувати, і позиції можуть бути слабшими.

6. **Чи варто молодому сайту орієнтуватися на High volume / High competition?**  
   Не як основна стратегія. Молодому сайту краще починати з long-tail і mid-tail запитів, де нижча конкуренція і простіше
   отримати перші покази.

7. **`як встановити node.js` та `node.js download` - один кластер чи різні?**  
   Це близькі, але різні інтентні відтінки. `node.js download` більше navigational/transactional, а `як встановити
   node.js` - instructional transactional. Їх можна закрити однією інструкцією, якщо там є офіційне посилання і кроки
   встановлення.

8. **Що показує топ-10 Google для головного запиту блогу?**  
   Для запитів типу `IT блог Україна` зазвичай у топі медіа, блоги, освітні платформи і новинні сайти. Це означає
   змішаний informational/navigational інтент.

9. **Чому silo-структура обмежує посилання між силосами?**  
   Щоб не розмивати тематичну релевантність. Якщо кожна категорія багато посилається на непов'язані теми, Google гірше
   розуміє фокус сторінок.

10. **Як Google Trends допомагає контент-календарю?**  
    Він показує сезонність і сплески інтересу. Наприклад, матеріали про ноутбуки для студентів краще публікувати перед
    початком навчального року, а статті про нові фреймворки - після релізів.

---

## Висновок

Для ІПЗ-педії сформовано семантичне ядро з 40 запитів, 8 кластерів, silo-структуру та схему внутрішньої перелінковки.
Основна стратегія для молодого сайту - розвивати long-tail і mid-tail запити у темах Programming, Backend, AI/ML,
Cybersecurity та Tools. Структура сайту дозволяє тримати більшість статей на глибині до 2 кліків від головної сторінки,
що є позитивним фактором для crawlability та SEO.
