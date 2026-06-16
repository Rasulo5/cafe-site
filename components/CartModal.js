"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import CartWindow from "./CartWindow";

export default function CartModal({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [orderType, setOrderType] = useState("pickup");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendOrder = (method) => {
    if (!customerName || !customerPhone) {
      alert("Пожалуйста, укажите имя и телефон");
      return;
    }

    setIsSubmitting(true);
    const orderText = formatOrderText(method);

    if (method === "whatsapp") {
      const phone = "79990000000";
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(orderText)}`;
      window.open(url, "_blank");
    } else if (method === "telegram") {
      const username = "cafe_bot";
      const url = `https://t.me/${username}?start=${encodeURIComponent(orderText)}`;
      window.open(url, "_blank");
    }

    setTimeout(() => {
      clearCart();
      onClose();
    }, 1000);

    setIsSubmitting(false);
  };

  const formatOrderText = (method) => {
    const items = cart
      .map((i) => `• ${i.name} × ${i.quantity} — ${i.price * i.quantity} ₽`)
      .join("\n");

    const typeText = orderType === "pickup" ? "Самовывоз" : "Доставка";

    return `🍽 *Новый заказ с сайта*

👤 *Клиент:* ${customerName}
📞 *Телефон:* ${customerPhone}
📦 *Тип:* ${typeText}

📋 *Заказ:*
${items}

💰 *Итого:* ${totalPrice} ₽`;
  };

  if (!isOpen) return null;

  return (
    <CartWindow
      cart={cart}
      totalPrice={totalPrice}
      onClose={onClose}
      onRemove={removeFromCart}
      onUpdateQuantity={updateQuantity}
      onSendOrder={handleSendOrder}
      customerName={customerName}
      setCustomerName={setCustomerName}
      customerPhone={customerPhone}
      setCustomerPhone={setCustomerPhone}
      orderType={orderType}
      setOrderType={setOrderType}
      isSubmitting={isSubmitting}
    />
  );
}

