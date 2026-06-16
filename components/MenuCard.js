"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function MenuCard({ item }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(item);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-amber-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400 hover:shadow-xl">
      <div className="relative h-48 w-full overflow-hidden bg-amber-100">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-stone-800">{item.name}</h3>
          <span className="whitespace-nowrap text-lg font-extrabold text-amber-600">
            {item.price} ₽
          </span>
        </div>
        <p className="mb-3 flex-1 text-sm leading-relaxed text-stone-500">
          {item.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs font-medium text-stone-400">{item.weight}</span>
          <button
            onClick={handleAddToCart}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${isAdded
                ? "bg-green-500 text-white"
                : "bg-amber-600 text-white hover:bg-amber-700"
              }`}
          >
            {isAdded ? "✓ Добавлено" : "+ В корзину"}
          </button>
        </div>
      </div>
    </article>
  );
}
