"use client";

import { useEffect, useState } from "react";

export default function ServiceWorkerRegistrar() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });

        console.log("SW registered:", registration.scope);

        // Проверка обновлений
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                setUpdateAvailable(true);
                console.log("Новая версия доступна!");
              }
            });
          }
        });
      } catch (error) {
        console.error("SW registration failed:", error);
      }
    };

    registerSW();
  }, []);

  const handleUpdate = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg?.waiting) {
          reg.waiting.postMessage({ type: "SKIP_WAITING" });
          window.location.reload();
        }
      });
    }
  };

  if (!updateAvailable) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex items-center gap-3 rounded-xl bg-stone-800 px-4 py-3 text-white shadow-lg">
      <span className="text-sm">Доступна новая версия сайта</span>
      <button
        onClick={handleUpdate}
        className="rounded-lg bg-amber-600 px-3 py-1.5 text-sm font-medium transition hover:bg-amber-700"
      >
        Обновить
      </button>
    </div>
  );
}
