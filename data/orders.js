// data/orders.js — Тестовые заказы
// status: "new" | "confirmed" | "cancelled"

export const orderStatuses = [
  { id: "all", label: "Все" },
  { id: "new", label: "Новые" },
  { id: "confirmed", label: "Подтверждённые" },
  { id: "cancelled", label: "Отменённые" },
];

export const statusMeta = {
  new: { label: "Новый", className: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  confirmed: { label: "Подтверждён", className: "bg-green-500/20 text-green-300 border-green-500/30" },
  cancelled: { label: "Отменён", className: "bg-red-500/20 text-red-300 border-red-500/30" },
};

export const orders = [
  { id: 1001, customer: "Иван Петров", phone: "+7 (911) 100-10-01", total: 1240, status: "new", date: "2024-06-10 12:30" },
  { id: 1002, customer: "Мария Алексеева", phone: "+7 (911) 100-10-02", total: 860, status: "confirmed", date: "2024-06-10 11:15" },
  { id: 1003, customer: "Елена Сергеева", phone: "+7 (911) 100-10-03", total: 2150, status: "new", date: "2024-06-10 10:50" },
  { id: 1004, customer: "Ольга Кузнецова", phone: "+7 (911) 100-10-04", total: 540, status: "cancelled", date: "2024-06-09 19:20" },
  { id: 1005, customer: "Дмитрий Васильев", phone: "+7 (911) 100-10-05", total: 1780, status: "confirmed", date: "2024-06-09 18:05" },
  { id: 1006, customer: "Екатерина Орлова", phone: "+7 (911) 100-10-06", total: 970, status: "new", date: "2024-06-09 17:40" },
  { id: 1007, customer: "Андрей Козлов", phone: "+7 (911) 100-10-07", total: 1320, status: "confirmed", date: "2024-06-09 16:10" },
  { id: 1008, customer: "Анна Васильева", phone: "+7 (911) 100-10-08", total: 450, status: "cancelled", date: "2024-06-08 20:30" },
  { id: 1009, customer: "Павел Николаев", phone: "+7 (911) 100-10-09", total: 2630, status: "confirmed", date: "2024-06-08 19:00" },
  { id: 1010, customer: "Наталья Михайлова", phone: "+7 (911) 100-10-10", total: 1100, status: "new", date: "2024-06-08 14:25" },
  { id: 1011, customer: "Артем Федоров", phone: "+7 (911) 100-10-11", total: 780, status: "confirmed", date: "2024-06-08 13:15" },
  { id: 1012, customer: "Юлия Лебедева", phone: "+7 (911) 100-10-12", total: 1990, status: "new", date: "2024-06-07 21:05" },
  { id: 1013, customer: "Антон Павлов", phone: "+7 (911) 100-10-13", total: 620, status: "cancelled", date: "2024-06-07 18:45" },
  { id: 1014, customer: "Дарья Павлова", phone: "+7 (911) 100-10-14", total: 1450, status: "confirmed", date: "2024-06-07 15:30" },
  { id: 1015, customer: "Максим Соколов", phone: "+7 (911) 100-10-15", total: 3050, status: "new", date: "2024-06-07 12:00" },
];
