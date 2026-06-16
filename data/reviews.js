// data/reviews.js — Тестовые отзывы
// status: "pending" | "approved" | "rejected"

export const reviewStatusMeta = {
  pending: { label: "На модерации", className: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
  approved: { label: "Одобрен", className: "bg-green-500/20 text-green-300 border-green-500/30" },
  rejected: { label: "Отклонён", className: "bg-red-500/20 text-red-300 border-red-500/30" },
};

export const reviews = [
  { id: 1, author: "Елена К.", rating: 5, text: "Лучшее кафе в городе! Вкусно, уютно, персонал очень вежливый.", status: "approved", date: "2024-06-09" },
  { id: 2, author: "Андрей П.", rating: 4, text: "Отличная кухня, но пришлось немного подождать заказ.", status: "pending", date: "2024-06-09" },
  { id: 3, author: "Александра М.", rating: 5, text: "Обожаю их супы и напитки. Обязательно приду ещё!", status: "approved", date: "2024-06-08" },
  { id: 4, author: "Евгений", rating: 2, text: "Долго для быстрого питания.", status: "pending", date: "2024-06-08" },
  { id: 5, author: "Дмитрий В.", rating: 5, text: "Отмечал день рождения, всё понравилось!", status: "approved", date: "2024-06-07" },
  { id: 6, author: "Аноним", rating: 1, text: "Плохо, не рекомендую. Спам на сайте example.com!!!", status: "rejected", date: "2024-06-07" },
  { id: 7, author: "Ольга Р.", rating: 4, text: "Приятная атмосфера, цены норм.", status: "pending", date: "2024-06-06" },
  { id: 8, author: "Михаил Ч.", rating: 3, text: "Неплохо, но десерты могли бы быть лучше.", status: "approved", date: "2024-06-05" },
];
