"use client";

import { useMemo, useState } from "react";
import MenuCard from "./MenuCard";
import { menu, categories } from "@/data/menu";

export default function MenuList() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return menu.filter((item) => {
      const byCat = active === "all" || item.category === active;
      const byQuery = item.name.toLowerCase().includes(query.toLowerCase());
      return byCat && byQuery;
    });
  }, [active, query]);

  return (
    <div>
      {/* Поиск */}
      <div className="mb-6">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск блюд по названию..."
          className="w-full rounded-xl border border-amber-200 bg-white px-5 py-3 text-stone-800 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
        />
      </div>

      {/* Фильтр категорий */}
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              active === cat.id
                ? "bg-amber-600 text-white shadow"
                : "border border-amber-200 bg-white text-stone-600 hover:border-amber-400 hover:text-amber-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Сетка блюд */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="py-20 text-center text-stone-500">
          Ничего не найдено. Попробуйте изменить параметры поиска.
        </p>
      )}
    </div>
  );
}
