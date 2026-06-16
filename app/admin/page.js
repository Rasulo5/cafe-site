import { statusMeta } from "@/data/orders";
import { reviews, reviewStatusMeta } from "@/data/reviews";
import { menu } from "@/data/menu";

const stats = [
  { label: "Заказов сегодня", value: "12", icon: "🧤", accent: "text-blue-400" },
  { label: "Выручка сегодня", value: "24 500 ₽", icon: "💰", accent: "text-green-400" },
  { label: "Новых отзывов", value: "3", icon: "⭐", accent: "text-amber-400" },
  { label: "Блюд в меню", value: "28", icon: "🍽️", accent: "text-purple-400" },
];

const weekRevenue = [
  { day: "Пн", value: 18500 },
  { day: "Вт", value: 21000 },
  { day: "Ср", value: 16800 },
  { day: "Чт", value: 24500 },
  { day: "Пт", value: 31200 },
  { day: "Сб", value: 38900 },
  { day: "Вс", value: 27400 },
];

function Stars({ rating }) {
  return (
    <span className="text-amber-400" aria-label={`Рейтинг ${rating} из 5`}>
      {"★".repeat(rating)}
      <span className="text-slate-600">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

async function getOrders() {
  try {
    const res = await fetch("http://localhost:3000/api/orders", { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.slice(0, 5);
  } catch {
    return [];
  }
}

export default async function DashboardPage() {
  const maxRevenue = Math.max(...weekRevenue.map((d) => d.value));
  const lastOrders = await getOrders();
  const lastReviews = reviews.slice(0, 3);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-100">Дашборд</h1>

      {/* Карточки статистики */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700"
          >
            <div className="mb-3 text-3xl">{s.icon}</div>
            <p className={`text-2xl font-extrabold ${s.accent}`}>{s.value}</p>
            <p className="mt-1 text-sm text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* График выручки */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-6 text-lg font-semibold text-slate-100">Выручка за неделю</h2>
        <div className="flex h-56 items-end justify-between gap-2 sm:gap-4">
          {weekRevenue.map((d) => (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs text-slate-400">
                {(d.value / 1000).toFixed(1)}K
              </span>
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-amber-600 to-amber-400 transition-all duration-300 hover:from-amber-500 hover:to-amber-300"
                style={{ height: `${(d.value / maxRevenue) * 100}%` }}
                title={`${d.value} ₽`}
              />
              <span className="text-xs font-medium text-slate-300">{d.day}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Последние заказы */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-100">Последние заказы</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-left text-slate-400">
                  <th className="pb-2 pr-4">№</th>
                  <th className="pb-2 pr-4">Клиент</th>
                  <th className="pb-2 pr-4">Сумма</th>
                  <th className="pb-2">Статус</th>
                </tr>
              </thead>
              <tbody>
                {lastOrders.length > 0 ? (
                  lastOrders.map((o) => (
                    <tr key={o.id} className="border-b border-slate-800/60 transition hover:bg-slate-800/40">
                      <td className="py-2.5 pr-4 font-mono text-slate-400">#{o.id}</td>
                      <td className="py-2.5 pr-4 text-slate-200">{o.customer}</td>
                      <td className="py-2.5 pr-4 font-semibold text-slate-100">{o.total} ₽</td>
                      <td className="py-2.5">
                        <span className={`rounded-full border px-2.5 py-0.5 text-xs ${statusMeta[o.status].className}`}>
                          {statusMeta[o.status].label}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500">
                      Пока нет заказов
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Последние отзывы */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-100">Последние отзывы</h2>
          <div className="space-y-3">
            {lastReviews.map((r) => (
              <div key={r.id} className="rounded-xl border border-slate-800 bg-slate-800/40 p-4">
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-medium text-slate-200">{r.author}</span>
                  <Stars rating={r.rating} />
                </div>
                <p className="mb-2 text-sm text-slate-400">{r.text}</p>
                <span className={`rounded-full border px-2 py-0.5 text-xs ${reviewStatusMeta[r.status].className}`}>
                  {reviewStatusMeta[r.status].label}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
