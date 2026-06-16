"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/admin", label: "Дашборд", icon: "🏠", exact: true },
  { href: "/admin/orders", label: "Заказы", icon: "🧾", badgeKey: "orders" },
  { href: "/admin/menu", label: "Меню", icon: "🍽️" },
  { href: "/admin/reviews", label: "Отзывы", icon: "⭐", badgeKey: "reviews" },
];

export default function Sidebar({ badges = {} }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const isActive = (item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <>
      {/* Кнопка для мобильных */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-xl text-slate-200 md:hidden"
        aria-label="Меню"
      >
        {open ? "✕" : "☰"}
      </button>

      {/* Затемнение для мобильных */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-800 bg-slate-900 transition-transform md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-slate-800 p-6">
          <Link href="/admin" className="text-xl font-extrabold text-amber-500">
            🍽️ Админ-панель
          </Link>
          <p className="mt-1 text-xs text-slate-500">Тёплый Уголок</p>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {nav.map((item) => {
            const active = isActive(item);
            const badge = item.badgeKey ? badges[item.badgeKey] : null;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-amber-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </span>
                {badge ? (
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                    {badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 p-4">
          <Link
            href="/"
            className="mb-2 block rounded-lg px-4 py-2 text-sm text-slate-400 transition hover:bg-slate-800"
          >
            ↑ На сайт
          </Link>
          <button
            onClick={handleLogout}
            className="w-full rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-600 hover:text-white"
          >
            Выйти
          </button>
        </div>
      </aside>
    </>
  );
}
