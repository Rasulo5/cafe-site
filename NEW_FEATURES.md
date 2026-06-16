# 🎉 Новые возможности сайта

## ✅ Что добавлено

### 1. Корзина и онлайн-заказы

**Файлы:**
- `context/CartContext.js` — управление состоянием корзины
- `components/CartButton.js` — кнопка корзины в хедере
- `components/CartModal.js` — модальное окно корзины

**Как работает:**
- Кнопка "В корзину" на карточках меню
- Счетчик товаров в хедере
- Изменение количества, удаление товаров
- Отправка заказа через WhatsApp или Telegram
- Сохранение корзины в localStorage

**Настройка:**
Откройте `components/CartModal.js` и замените:
```javascript
const phone = "79990000000";      // Ваш номер WhatsApp
const username = "cafe_bot";       // Ваш Telegram бот
```

---

### 2. PWA (Progressive Web App)

**Файлы:**
- `public/manifest.json` — манифест приложения
- `public/sw.js` — service worker для кэширования
- `public/icons/*.png` — иконки приложения
- `components/ServiceWorkerRegistrar.js` — регистрация SW
- `app/offline/page.js` — страница офлайн-режима

**Возможности:**
- 📲 Установка на телефон (Android/iOS)
- 📴 Работа без интернета (кэшированные страницы)
- ⚡ Быстрая загрузка
- 🔄 Автообновление при выходе новой версии

**Как установить:**
- **Android:** Открыть сайт в Chrome → меню → "Установить приложение"
- **iOS:** Safari → кнопка "Поделиться" → "На экран «Домой»"

---

### 3. Локальные изображения

**Файлы:**
- `public/images/*.svg` — SVG-заглушки для блюд и галереи

**Преимущества:**
- Не зависят от внешних сервисов
- Быстрая загрузка
- Работают офлайн

---

## 🚀 Использование

### Запуск разработки
```bash
npm run dev
```

### Продакшен-сборка
```bash
npm run build
npm start
```

### Генерация иконок (при необходимости)
```bash
npm run icons
```

---

## 📱 Тестирование PWA

1. Откройте сайт в браузере
2. Откройте DevTools → Application → Service Workers
3. Проверьте статус: "Status: activated"
4. Отключите интернет → обновите страницу
5. Должна открыться offline-страница

---

## 🔧 TypeScript миграция

Проект уже настроен на TypeScript. Для миграции:

1. Переименуйте `.js` файлы в `.tsx` (для компонентов) или `.ts` (для утилит)
2. Добавьте типы для props и state
3. Исправьте ошибки типов

Пример для MenuCard:
```typescript
// components/MenuCard.tsx
import { MenuItem } from '@/types/menu';

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
  // ...
}
```

---

## 📊 Структура новых файлов

```
cafe-site/
├── context/
│   └── CartContext.js          # Состояние корзины
├── components/
│   ├── CartButton.js           # Кнопка корзины
│   ├── CartModal.js            # Модальное окно
│   └── ServiceWorkerRegistrar.js
├── public/
│   ├── manifest.json           # PWA манифест
│   ├── sw.js                   # Service Worker
│   ├── icons/                  # PWA иконки
│   └── images/                 # Локальные изображения
├── app/
│   └── offline/
│       └── page.js             # Страница офлайн
└── scripts/
    └── generate-icons.js       # Скрипт генерации иконок
```

---

## 🎯 Следующие шаги

1. **Настройте номера** для WhatsApp/Telegram
2. **Добавьте реальные фото** блюд в `public/images/`
3. **Протестируйте PWA** на мобильном устройстве
4. **Настройте уведомления** (опционально)

---

## ❓ Вопросы

- Корзина сохраняется между сессиями (localStorage)
- При отправке заказа корзина очищается
- Offline-режим кэширует статические страницы
- PWA работает только по HTTPS (кроме localhost)
