"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import CartModal from "./CartModal";

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CartButton onClick={() => setIsOpen(true)} />
      <CartModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

function CartButton({ onClick }) {
  const { totalItems } = useCart();

  return (
    <button
      onClick={onClick}
      className="relative rounded-full bg-amber-600 p-2.5 text-white transition hover:bg-amber-700"
      aria-label="Открыть корзину"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </button>
  );
}
