"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const labels = {
  menu: "Меню",
  about: "О кафе",
  contacts: "Контакты",
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Хлебные крошки" className="mx-auto max-w-6xl px-6 pt-6">
      <ol className="flex items-center gap-2 text-sm text-stone-500">
        <li>
          <Link href="/" className="transition-colors hover:text-amber-600">
            Главная
          </Link>
        </li>
        {segments.map((seg, i) => {
          const href = "/" + segments.slice(0, i + 1).join("/");
          const isLast = i === segments.length - 1;
          return (
            <li key={href} className="flex items-center gap-2">
              <span className="text-amber-400">/</span>
              {isLast ? (
                <span className="font-medium text-amber-700">{labels[seg] || seg}</span>
              ) : (
                <Link href={href} className="transition-colors hover:text-amber-600">
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
