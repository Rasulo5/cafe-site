import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  charset: "UTF-8",
  title: "Тёплый Уголок — уютное кафе домашней кухни",
  description:
    "Кафе «Тёплый Уголок» — свежие продукты, уютная атмосфера и быстрое обслуживание. Завтраки, супы, салаты, горячее, десерты и напитки. Бронируйте стол онлайн.",
  keywords: [
    "кафе",
    "ресторан",
    "домашняя кухня",
    "завтраки",
    "бронирование стола",
    "Санкт-Петербург",
    "меню кафе",
  ],
  manifest: "/manifest.json",
  openGraph: {
    title: "Тёплый Уголок — уютное кафе домашней кухни",
    description:
      "Свежие продукты, уютная атмосфера и быстрое обслуживание. Бронируйте стол онлайн.",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport = {
  themeColor: "#d97706",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="flex min-h-screen flex-col antialiased">
        <CartProvider>
          <SiteChrome>{children}</SiteChrome>
        </CartProvider>
      </body>
    </html>
  );
}
