"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function CartContent({
  cart,
  totalPrice,
  onClose,
  onRemove,
  onUpdateQuantity,
  onSendOrder,
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  orderType,
  setOrderType,
  isSubmitting,
}) {
  const router = useRouter();

  const handleGoToMenu = () => {
    onClose();
    router.push("/menu");
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-200 px-5 py-3">
        <h2 className="text-lg font-bold text-stone-800">Ваш заказ</h2>
        <button
          onClick={onClose}
          className="rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-600"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content - scrollable */}
      <div className="max-h-[65vh] overflow-y-auto px-5 py-4">
        {cart.length === 0 ? (
          <div className="py-8 text-center">
            <div className="mb-3 text-5xl">🛒</div>
            <p className="text-stone-500">Корзина пуста</p>
            <button
              onClick={handleGoToMenu}
              className="mt-3 rounded-lg bg-amber-600 px-5 py-2 text-sm font-medium text-white hover:bg-amber-700"
            >
              Перейти к меню
            </button>
          </div>
        ) : (
          <>
            {/* Товары */}
            <div className="mb-4 space-y-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl border border-stone-200 p-2"
                >
                  <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-stone-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-medium text-stone-800">{item.name}</h4>
                    <p className="text-xs text-amber-600">{item.price} ₽</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="rounded-lg p-1.5 text-red-500 hover:bg-red-50"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Итого */}
            <div className="mb-4 flex items-center justify-between border-t border-stone-200 pt-3">
              <span className="font-medium text-stone-600">Итого:</span>
              <span className="text-xl font-bold text-amber-600">{totalPrice} ₽</span>
            </div>

            {/* Форма */}
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-stone-700">Ваше имя</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Иван Иванов"
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-stone-700">Телефон</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+7 (999) 000-00-00"
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium text-stone-700">Тип заказа</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType("pickup")}
                    className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium ${orderType === "pickup"
                        ? "bg-amber-600 text-white"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                  >
                    🏪 Самовывоз
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType("delivery")}
                    className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium ${orderType === "delivery"
                        ? "bg-amber-600 text-white"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                  >
                    🚚 Доставка
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Кнопки */}
      {cart.length > 0 && (
        <div className="border-t border-stone-200 px-5 py-4">
          <div className="space-y-2">
            <button
              onClick={() => onSendOrder("whatsapp")}
              disabled={isSubmitting}
              className="w-full rounded-xl bg-green-500 py-3 font-semibold text-white hover:bg-green-600 disabled:opacity-50"
            >
              📱 Отправить через WhatsApp
            </button>
            <button
              onClick={() => onSendOrder("telegram")}
              disabled={isSubmitting}
              className="w-full rounded-xl bg-blue-500 py-3 font-semibold text-white hover:bg-blue-600 disabled:opacity-50"
            >
              ✈️ Отправить через Telegram
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CartWindow(props) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      onClick={props.onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <CartContent {...props} />
      </div>
    </div>
  );
}

