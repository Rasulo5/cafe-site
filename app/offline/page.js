"use client";

export default function OfflinePage() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6">
      <div className="text-center">
        <div className="mb-6 text-8xl">📡</div>
        <h1 className="mb-4 text-3xl font-bold text-stone-800 sm:text-4xl">
          Нет подключения к интернету
        </h1>
        <p className="mb-8 text-lg text-stone-600">
          Проверьте соединение и попробуйте снова
        </p>
        <button
          onClick={handleReload}
          className="rounded-xl bg-amber-600 px-8 py-3 font-semibold text-white transition hover:bg-amber-700"
        >
          🔄 Попробовать снова
        </button>
        <div className="mt-12 rounded-2xl bg-amber-50 p-6">
          <h2 className="mb-3 text-lg font-semibold text-amber-800">
            Что можно сделать:
          </h2>
          <ul className="space-y-2 text-left text-stone-600">
            <li>• Проверьте Wi-Fi или мобильную сеть</li>
            <li>• Попробуйте обновить страницу</li>
            <li>• Некоторые страницы могут быть доступны офлайн</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
