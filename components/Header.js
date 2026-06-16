"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Главная" },
  { href: "/menu", label: "Меню" },
  { href: "/about", label: "О кафе" },
  { href: "/contacts", label: "Контакты" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-amber-200/60 bg-amber-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-amber-700">
          🍽️ Тёплый Уголок
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-1 md:flex" aria-label="Основная навигация">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${active
                    ? "bg-amber-600 text-white"
                    : "text-stone-700 hover:bg-amber-100 hover:text-amber-700"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-amber-700 hover:bg-amber-100 md:hidden"
          aria-label="Открыть меню"
          aria-expanded={open}
        >
          <span className="text-2xl">{open ? "✕" : "☰"}</span>
        </button>

        {/* Mobile nav */}
        {open && (
          <div className="absolute left-0 right-0 top-full border-b border-amber-200 bg-amber-50 p-4 md:hidden">
            <nav className="flex flex-col gap-2" aria-label="Мобильное меню">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${active
                        ? "bg-amber-600 text-white"
                        : "text-stone-700 hover:bg-amber-100 hover:text-amber-700"
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
