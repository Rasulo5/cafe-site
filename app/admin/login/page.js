"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.message || "Ошибка авторизации");
      }
    } catch {
      setError("Ошибка подключения");
    } finally {
      setLoading(false);
    }
  };

  const field =
    "w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-slate-100 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30";

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <p className="text-3xl">🍽️</p>
          <h1 className="mt-2 text-xl font-extrabold text-amber-500">Админ-панель</h1>
          <p className="mt-1 text-sm text-slate-500">Вход в систему</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">Логин</label>
            <input
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
              autoFocus
              placeholder="admin"
              className={field}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className={field}
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/15 px-4 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition hover:bg-amber-700 disabled:opacity-60"
          >
            {loading ? "Загрузка..." : "Войти"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-600">
          Тестовые данные: admin / cafe2024
        </p>
      </div>
    </div>
  );
}
