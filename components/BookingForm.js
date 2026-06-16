"use client";

import { useState } from "react";
import { useToast } from "@/components/admin/Toast";

export default function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
  });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const total = Number(form.guests) * 500;
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form.name,
          phone: form.phone,
          total,
          status: "new",
          date: `${form.date} ${form.time}`,
          guests: Number(form.guests),
          type: "booking",
        }),
      });
      const data = await res.json();
      if (data.ok) {
        showToast("Успешно забронировано! Мы свяжемся с вами.", "success");
        setForm({ name: "", phone: "", date: "", time: "", guests: 2 });
      } else {
        showToast("Ошибка при бронировании", "error");
      }
    } catch {
      showToast("Ошибка соединения", "error");
    } finally {
      setLoading(false);
    }
  };

  const field =
    "w-full rounded-lg border border-amber-200 bg-amber-50/50 px-4 py-2.5 text-stone-800 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-stone-700">Имя</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Ваше имя"
          className={field}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-stone-700">Телефон</label>
        <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          required
          placeholder="+7 (___) ___-__-__"
          className={field}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-stone-700">Дата</label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
            className={field}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-stone-700">Время</label>
          <input
            name="time"
            type="time"
            value={form.time}
            onChange={handleChange}
            required
            className={field}
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-stone-700">
          Количество гостей
        </label>
        <input
          name="guests"
          type="number"
          min="1"
          max="20"
          value={form.guests}
          onChange={handleChange}
          required
          className={field}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-lg disabled:opacity-60"
      >
        {loading ? "Отправка..." : "Забронировать стол"}
      </button>
    </form>
  );
}
