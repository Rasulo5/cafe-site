"use client";

import { useEffect, useMemo, useState } from "react";
import { orderStatuses, statusMeta } from "@/data/orders";
import { useToast } from "./Toast";

export default function OrdersManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const byStatus = filter === "all" || o.status === filter;
      const q = query.toLowerCase();
      const byQuery =
        o.customer?.toLowerCase().includes(q) || o.phone?.includes(query);
      return byStatus && byQuery;
    });
  }, [orders, filter, query]);

  const changeStatus = (id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    showToast(`Статус заказа #${id} изменён`, "success");
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-100">Заказы</h1>

      {/* Поиск + Фильтры */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск по имени или телефону..."
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-slate-100 outline-none transition focus:border-amber-500 sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          {orderStatuses.map((s) => (
            <button
              key={s.id}
              onClick={() => setFilter(s.id)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                filter === s.id
                  ? "bg-amber-600 text-white"
                  : "border border-slate-700 text-slate-300 hover:bg-slate-800"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Таблица */}
      {loading ? (
        <div className="py-12 text-center text-slate-400">Загрузка заказов...</div>
      ) : filtered.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-900 text-left text-slate-400">
              <tr>
                <th className="px-4 py-3">№</th>
                <th className="px-4 py-3">Клиент</th>
                <th className="px-4 py-3">Телефон</th>
                <th className="px-4 py-3">Сумма</th>
                <th className="px-4 py-3">Статус</th>
                <th className="px-4 py-3">Дата</th>
                <th className="px-4 py-3">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-t border-slate-800 transition hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-mono text-slate-400">#{o.id}</td>
                  <td className="px-4 py-3 text-slate-200">{o.customer}</td>
                  <td className="px-4 py-3 text-slate-400">{o.phone}</td>
                  <td className="px-4 py-3 font-semibold text-slate-100">{o.total} ₽</td>
                  <td className="px-4 py-3">
                    <span className={`whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs ${statusMeta[o.status].className}`}>
                      {statusMeta[o.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{o.date || o.createdAt?.slice(0, 16).replace("T", " ")}</td>
                  <td className="px-4 py-3">
                    <select
                      value={o.status}
                      onChange={(e) => changeStatus(o.id, e.target.value)}
                      className="rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-xs text-slate-200 outline-none focus:border-amber-500"
                    >
                      <option value="new">Новый</option>
                      <option value="confirmed">Подтверждён</option>
                      <option value="cancelled">Отменён</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-12 text-center text-slate-500">Нет заказов, соответствующих фильтру</div>
      )}
    </div>
  );
}
