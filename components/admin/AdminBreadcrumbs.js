"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const labels = {
  admin: "Дашборд",
  orders: "Заказы",
  menu: "Меню",
  reviews: "Отзывы",
  login: "Вход",
};

export default function AdminBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Хлебные крошки" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
        {segments.map((seg, i) => {
          const href = "/" + segments.slice(0, i + 1).join("/");
          const isLast = i === segments.length - 1;
          return (
            <li key={href} className="flex items-center gap-2">
              {i > 0 && <span className="text-slate-600">/</span>}
              {isLast ? (
                <span className="font-medium text-amber-500">{labels[seg] || seg}</span>
              ) : (
                <Link href={href} className="transition hover:text-amber-500">
                  {labels[seg] || seg}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
