import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "Контакты — Тёплый Уголок",
  description:
    "Адрес, телефон, часы работы кафе «Тёплый Уголок». Забронируйте стол онлайн.",
};

const socials = [
  { label: "Telegram", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "WhatsApp", href: "#" },
];

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-10 text-center text-4xl font-extrabold text-stone-800 sm:text-5xl">
        Контакты
      </h1>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Информация + карта */}
        <section>
          <div className="rounded-2xl border border-amber-200/70 bg-white p-8">
            <h2 className="mb-5 text-2xl font-bold text-amber-700">Как нас найти</h2>
            <ul className="space-y-4 text-stone-700">
              <li className="flex gap-3">
                <span className="text-xl">📍</span>
                <span>г. Санкт-Петербург, ул. Уютная, 12</span>
              </li>
              <li className="flex gap-3">
                <span className="text-xl">📞</span>
                <a href="tel:+78121234567" className="transition-colors hover:text-amber-600">
                  +7 (812) 123-45-67
                </a>
              </li>
              <li className="flex gap-3">
                <span className="text-xl">✉️</span>
                <a href="mailto:hello@teply-ugolok.ru" className="transition-colors hover:text-amber-600">
                  hello@teply-ugolok.ru
                </a>
              </li>
              <li className="flex gap-3">
                <span className="text-xl">🕐</span>
                <span>Ежедневно с 8:00 до 22:00</span>
              </li>
            </ul>

            <div className="mt-8">
              <h3 className="mb-3 font-semibold text-stone-800">Мы в соцсетях</h3>
              <div className="flex gap-4">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-600 transition-colors hover:text-amber-600"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Карта */}
          <div className="mt-6 overflow-hidden rounded-2xl bg-stone-200">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=30.315684%2C59.939095&z=12"
              width="100%"
              height="320"
              frameBorder="0"
              allowFullScreen={true}
              title="Карта"
              className="grayscale transition-all hover:grayscale-0"
            />
          </div>
        </section>

        {/* Форма бронирования */}
        <section>
          <BookingForm />
        </section>
      </div>
    </div>
  );
}
