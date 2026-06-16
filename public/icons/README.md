# Генерация PWA иконок

## Способ 1: Онлайн-генераторы (рекомендуется)

1. Откройте `public/icons/icon.svg` в браузере
2. Сделайте скриншот или используйте один из сервисов:
   - [PWA Icon Generator](https://realfavicongenerator.net/)
   - [App Icon Generator](https://appicon.co/)
   - [Icon Kitchen](https://icon.kitchen/)

3. Скачайте набор иконок и поместите в `public/icons/`

## Способ 2: Через Node.js (требуется sharp)

```bash
npm install sharp
node scripts/generate-icons.js
```

## Необходимые размеры

- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

## Временное решение

Пока иконки не сгенерированы, PWA будет работать с placeholder.
Для тестирования можно использовать любой квадратный PNG 512x512.
