"use client";

import { useState } from "react";
import { reviewStatusMeta } from "@/data/reviews";
import { useToast } from "./Toast";
import ConfirmModal from "./ConfirmModal";

function Stars({ rating }) {
  return (
    <span className="text-amber-400" aria-label={`Рейтинг ${rating} из 5`}>
      {"★".repeat(rating)}
      <span className="text-slate-600">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

export default function ReviewsManager({ initialReviews }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [deleteId, setDeleteId] = useState(null);
  const { showToast } = useToast();

  const setStatus = (id, status, msg) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    showToast(msg, status === "rejected" ? "error" : "success");
  };

  const confirmDelete = () => {
    setReviews((prev) => prev.filter((r) => r.id !== deleteId));
    showToast("Отзыв удалён", "error");
    setDeleteId(null);
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-100">Отзывы</h1>

      <div className="overflow-x-auto rounded-2xl border border-slate-800">
        <table className="w-full text-sm">
          <thead className="bg-slate-900 text-left text-slate-400">
            <tr>
              <th className="px-4 py-3">Автор</th>
              <th className="px-4 py-3">Отзыв</th>
              <th className="px-4 py-3">Рейтинг</th>
              <th className="px-4 py-3">Статус</th>
              <th className="px-4 py-3">Дата</th>
              <th className="px-4 py-3">Действия</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length > 0 ? (
              reviews.map((r) => (
                <tr key={r.id} className="border-t border-slate-800 align-top transition hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-medium text-slate-200">{r.author}</td>
                  <td className="max-w-xs px-4 py-3 text-slate-400">{r.text}</td>
                  <td className="px-4 py-3"><Stars rating={r.rating} /></td>
                  <td className="px-4 py-3">
                    <span className={`whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs ${reviewStatusMeta[r.status].className}`}>
                      {reviewStatusMeta[r.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{r.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setStatus(r.id, "approved", "Отзыв одобрен")}
                        className="rounded-lg bg-slate-700 px-3 py-1.5 text-xs font-medium text-green-400 transition hover:bg-green-600 hover:text-white"
                      >
                        Одобрить
                      </button>
                      <button
                        onClick={() => setStatus(r.id, "rejected", "Отзыв отклонён")}
                        className="rounded-lg bg-slate-700 px-3 py-1.5 text-xs font-medium text-yellow-400 transition hover:bg-yellow-600 hover:text-white"
                      >
                        Отклонить
                      </button>
                      <button
                        onClick={() => setDeleteId(r.id)}
                        className="rounded-lg bg-slate-700 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-600 hover:text-white"
                      >
                        Удалить
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-slate-500">
                  Нет отзывов
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        open={deleteId !== null}
        title="Удалить отзыв?"
        message="Это действие нельзя будет отменить."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
