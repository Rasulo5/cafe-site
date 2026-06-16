"use client";

import Image from "next/image";
import { useState } from "react";
import { categories } from "@/data/menu";
import { useToast } from "./Toast";
import ConfirmModal from "./ConfirmModal";

const categoryLabel = (id) =>
  categories.find((c) => c.id === id)?.label || id;

const emptyForm = {
  name: "",
  category: "main",
  price: "",
  weight: "",
  description: "",
  image: "",
};

export default function MenuManager({ initialMenu }) {
  const [items, setItems] = useState(initialMenu);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState(null);
  const { showToast } = useToast();

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item.id);
    setForm({ ...item, price: String(item.price) });
    setFormOpen(true);
  };

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price) || 0,
      image: form.image || "/images/placeholder-dish.svg",
    };
    if (editing) {
      setItems((prev) => prev.map((i) => (i.id === editing ? { ...i, ...payload } : i)));
      showToast("Блюдо обновлено", "success");
    } else {
      const id = Math.max(0, ...items.map((i) => i.id)) + 1;
      setItems((prev) => [...prev, { ...payload, id }]);
      showToast("Блюдо добавлено", "success");
    }
    setFormOpen(false);
  };

  const confirmDelete = () => {
    setItems((prev) => prev.filter((i) => i.id !== deleteId));
    showToast("Блюдо удалено", "error");
    setDeleteId(null);
  };

  const field =
    "w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 outline-none transition focus:border-amber-500";

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-100">Меню</h1>
        <button
          onClick={openAdd}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          + Добавить блюдо
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800">
        <table className="w-full text-sm">
          <thead className="bg-slate-900 text-left text-slate-400">
            <tr>
              <th className="px-4 py-3">Фото</th>
              <th className="px-4 py-3">Название</th>
              <th className="px-4 py-3">Категория</th>
              <th className="px-4 py-3">Цена</th>
              <th className="px-4 py-3">Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id} className="border-t border-slate-800 transition hover:bg-slate-800/40">
                  <td className="px-4 py-3">
                    <div className="relative h-12 w-16 overflow-hidden rounded-lg bg-slate-800">
                      <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-200">{item.name}</td>
                  <td className="px-4 py-3 text-slate-400">{categoryLabel(item.category)}</td>
                  <td className="px-4 py-3 font-semibold text-slate-100">{item.price} ₽</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="rounded-lg bg-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-blue-600"
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => setDeleteId(item.id)}
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
                <td colSpan={5} className="px-4 py-12 text-center text-slate-500">
                  В меню нет блюд
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4">
          <form
            onSubmit={handleSubmit}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-2xl"
          >
            <h3 className="mb-5 text-lg font-bold text-slate-100">
              {editing ? "Редактирование блюда" : "Добавление блюда"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-slate-300">Название</label>
                <input name="name" value={form.name} onChange={handleChange} required className={field} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm text-slate-300">Категория</label>
                  <select name="category" value={form.category} onChange={handleChange} className={field}>
                    {categories.filter((c) => c.id !== "all").map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm text-slate-300">Цена, ₽</label>
                  <input name="price" type="number" value={form.price} onChange={handleChange} required className={field} />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm text-slate-300">Вес / Объём</label>
                <input name="weight" value={form.weight} onChange={handleChange} placeholder="250 г" className={field} />
              </div>
              <div>
                <label className="mb-1 block text-sm text-slate-300">Описание</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={field} />
              </div>
              <div>
                <label className="mb-1 block text-sm text-slate-300">Фото (URL)</label>
                <input name="image" value={form.image} onChange={handleChange} placeholder="https://" className={field} />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
              >
                Сохранить
              </button>
            </div>
          </form>
        </div>
      )}

      <ConfirmModal
        open={deleteId !== null}
        title="Удалить блюдо?"
        message="Это действие нельзя будет отменить."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
