import Link from "next/link";
import Image from "next/image";
import { menu } from "@/data/menu";

const advantages = [
  { icon: "🥬", title: "Свежие продукты", text: "Закупаем продукты каждое утро у проверенных фермеров." },
  { icon: "🕯️", title: "Уютная атмосфера", text: "Тёплый интерьер, мягкий свет и душевная обстановка." },
  { icon: "⚡", title: "Быстрое обслуживание", text: "Подаём блюда быстро, не жертвуя качеством и вкусом." },
];

const popular = menu.slice(0, 4);

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center sm:py-32">
          <h1 className="animate-fadeUp text-5xl font-extrabold tracking-tight text-stone-800 sm:text-7xl">
            Кафе <span className="text-amber-600">«Тёплый Уголок»</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl animate-fadeUp text-lg text-stone-600 sm:text-xl">
            Домашняя кухня, ароматный кофе и атмосфера, в которую хочется
            возвращаться. Готовим с любовью каждый день.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/menu"
              className="rounded-xl bg-amber-600 px-8 py-4 font-semibold text-white transition-all hover:-translate-y-1 hover:bg-amber-700 hover:shadow-xl"
            >
              Смотреть меню
            </Link>
            <Link
              href="/contacts"
              className="rounded-xl border-2 border-amber-600 px-8 py-4 font-semibold text-amber-700 transition-all hover:-translate-y-1 hover:bg-amber-600 hover:text-white"
            >
              Контакты
            </Link>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="bg-stone-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            {advantages.map((item, idx) => (
              <div
                key={idx}
                className="animate-fadeUp rounded-2xl bg-white p-8 text-center shadow-lg"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="mb-4 text-5xl">{item.icon}</div>
                <h3 className="mb-3 text-xl font-bold text-stone-800">{item.title}</h3>
                <p className="text-stone-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Популярные блюда */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-4xl font-bold text-stone-800">
            Популярные блюда
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((dish) => (
              <div
                key={dish.id}
                className="group animate-fadeUp overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-bold text-stone-800">{dish.name}</h3>
                  <p className="mb-3 text-sm text-stone-600">{dish.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-amber-600">{dish.price} ₽</span>
                    <span className="text-sm text-stone-500">{dish.weight}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/menu"
              className="inline-block rounded-xl bg-amber-600 px-8 py-4 font-semibold text-white transition-all hover:-translate-y-1 hover:bg-amber-700 hover:shadow-xl"
            >
              Всё меню
            </Link>
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="bg-amber-600 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Забронируйте столик
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-amber-100">
            Позвоните нам или оставьте заявку онлайн — мы будем рады вас видеть!
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contacts"
              className="rounded-xl bg-white px-8 py-4 font-semibold text-amber-700 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              Контакты
            </Link>
            <a
              href="tel:+79991234567"
              className="rounded-xl border-2 border-white px-8 py-4 font-semibold text-white transition-all hover:-translate-y-1 hover:bg-white hover:text-amber-700"
            >
              +7 (999) 123-45-67
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
