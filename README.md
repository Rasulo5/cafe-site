# Кафе «Тёплый Уголок» — сайт на Next.js 14

Полноценный сайт кафе: главная, меню с фильтрами и поиском, страница «О кафе»,
контакты с формой бронирования. Server Components для SEO, Tailwind CSS,
готов к деплою в Docker.

## ✨ Новые возможности

- 🛒 **Онлайн-заказы** — корзина с отправкой в WhatsApp/Telegram
- 📱 **PWA** — установка на телефон, offline-режим
- 🎨 **Локальные изображения** — SVG-заглушки вместо внешних сервисов

## Стек

- Next.js 14 (App Router, output: standalone)
- React 18, TypeScript (tsconfig с moduleResolution: bundler)
- Tailwind CSS 3

## Структура

```
app/
  page.js          # Главная
  menu/page.js     # Меню
  about/page.js    # О кафе
  contacts/page.js # Контакты
  offline/page.js  # Страница офлайн-режима
  layout.js        # Общий layout (header, footer, breadcrumbs)
components/         # Header, Footer, MenuCard, CartModal, BookingForm, Gallery, ...
context/            # CartContext — состояние корзины
data/menu.js        # 12 блюд
public/
  manifest.json     # PWA манифест
  sw.js             # Service Worker
  icons/            # PWA иконки
  images/           # Локальные изображения
```

## Локальный запуск

```bash
npm install
npm run dev          # http://localhost:3000
```

## Продакшен-сборка

```bash
npm run build
npm start
```

## PWA иконки

Для генерации иконок приложения:

```bash
npm install --save-dev sharp
npm run icons
```

## Docker

```bash
docker build -t cafe-site .
docker run -p 3000:3000 cafe-site
```

## Деплой на TimeWeb Cloud Apps

1. Залейте проект в GitHub-репозиторий.
2. В панели TimeWeb создайте приложение → источник: ваш GitHub-репозиторий.
3. Тип сборки: **Dockerfile**.
4. Порт приложения: **3000**.
5. После сборки приложение будет доступно по выданному домену.

## 🛒 Настройка заказов

### WhatsApp

В `components/CartModal.js` замените номер:

```javascript
const phone = "79990000000"; // Ваш номер для заказов
```

### Telegram

В `components/CartModal.js` замените юзернейм:

```javascript
const username = "cafe_bot"; // Ваш бот или канал
```

## 📱 PWA возможности

После установки сайт работает:

- ⚡ Быстрее — кэш статических ресурсов
- 📴 Офлайн — страница при отсутствии сети
- 🔔 Push-уведомления (требует настройки)

## Что заменить под себя

- Контакты, адрес, соцсети — в `components/Footer.js` и `app/contacts/page.js`.
- Ссылки соцсетей (заглушки `#`).
- Координаты Яндекс.Карт в `app/contacts/page.js`.
- Номер телефона и бот для заказов в `CartModal.js`.
- PWA иконки — сгенерируйте через `npm run icons`.
