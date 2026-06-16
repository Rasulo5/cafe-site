"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ScrollToTop from "@/components/ScrollToTop";
import ServiceWorkerRegistrar from "@/components/ServiceWorkerRegistrar";
import Cart from "@/components/Cart";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <Breadcrumbs />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
      <ServiceWorkerRegistrar />
      {/* Плавающая кнопка корзины */}
      <div className="fixed bottom-[40px] left-4 z-[9999] sm:bottom-[60px] sm:left-6">
        <Cart />
      </div>
    </>
  );
}
