# 📦 Инструкция по деплою на Timeweb Cloud

## Вариант 1: Node.js Хостинг (Рекомендуется)

### 1. Подготовка проекта

```bash
# Очистите старую сборку
Remove-Item -Path ".next" -Recurse -Force

# Установите зависимости
npm install

# Соберите проект
npm run build
```

### 2. Вход в панель управления

1. Зайдите в [Timeweb Cloud](https://timeweb.cloud/)
2. Перейдите в раздел **Хостинг** → Ваш проект

### 3. Загрузка файлов

**Через файловый менеджер:**
1. Откройте **Файловый менеджер** в панели
2. Перейдите в папку `public_html` или `www`
3. Загрузите архивом:
   - `package.json`
   - `package-lock.json`
   - `next.config.mjs`
   - Папка `.next` (из `.next/standalone` и `.next/static`)
   - Папка `public`

**Или через FTP (FileZilla):**
- Хост: `ваш-домен.ru` или IP сервера
- Логин: из письма Timeweb
- Пароль: из письма Timeweb
- Порт: 21

### 4. Настройка Node.js приложения

1. В панели хостинга найдите **Node.js**
2. Нажмите **Создать приложение**
3. Укажите:
   - **Домен:** ваш домен
   - **Путь к приложению:** `/public_html`
   - **Файл приложения:** `server.js`
   - **Версия Node.js:** 18.x или выше
   - **Порт:** 3000 (по умолчанию)

### 5. Создание server.js

Создайте файл `server.js` в корне проекта:

```javascript
const { createServer } = require('http');
const next = require('next');
const { parse } = require('url');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, hostname: 'localhost', port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
```

### 6. Установка зависимостей на сервере

В панели хостинга откройте **Терминал** или **SSH**:

```bash
cd public_html
npm install --production
```

### 7. Запуск приложения

В панели Node.js нажмите **Запустить** или в терминале:

```bash
npm start
```

### 8. Настройка переменных окружения

Создайте файл `.env.local` на сервере:

```
ADMIN_LOGIN=admin
ADMIN_PASSWORD=cafe2024
ADMIN_TOKEN=cafe2024-secret-token
NODE_ENV=production
```

---

## Вариант 2: Статический экспорт (Без Node.js)

Если у вас обычный хостинг без Node.js:

### 1. Измените next.config.mjs

```javascript
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Важно для статического экспорта
  },
  trailingSlash: true,
};

export default nextConfig;
```

### 2. Соберите проект

```bash
npm run build
```

### 3. Загрузите на хостинг

Все файлы из папки `out/` загрузите в `public_html/` через FTP.

⚠️ **Минусы:**
- Не работают API Routes (/api/*)
- Не работает серверный рендеринг
- Корзина не будет отправлять заказы через API

---

## ✅ Проверка после деплоя

1. Откройте ваш домен в браузере
2. Проверьте все страницы:
   - Главная
   - Меню
   - О кафе
   - Контакты
   - Админ-панель (/admin/login)
3. Проверьте корзину (добавить товар, оформить заказ)
4. Проверьте отправку в WhatsApp/Telegram

---

## 🔧 Если что-то не работает

### Ошибка 500
- Проверьте логи в панели хостинга
- Убедитесь, что все зависимости установлены

### Не загружаются изображения
- Проверьте `next.config.mjs` настройки images
- Убедитесь, что внешние URL разрешены

### Не работает админка
- Проверьте `.env.local` на сервере
- Убедитесь, что API Routes работают

### Ошибка 404 на страницах
- Включите `trailingSlash: true` в next.config.mjs
- Пересоберите проект

---

## 📞 Поддержка Timeweb

Если возникнут проблемы:
- Чат поддержки в панели управления
- Телефон: 8 (800) 555-10-77
- База знаний: https://timeweb.cloud/help
