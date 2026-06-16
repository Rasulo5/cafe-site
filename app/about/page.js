import Image from "next/image";
import Gallery from "@/components/Gallery";

export const metadata = {
  title: "О кафе — Тёплый Уголок",
  description:
    "История кафе «Тёплый Уголок», наша концепция и философия домашнего уюта.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-10 text-center text-4xl font-extrabold text-stone-800 sm:text-5xl">
        О нашем кафе
      </h1>

      {/* Интерьер + история */}
      <section className="mb-16 grid items-center gap-10 md:grid-cols-2">
        <div className="relative h-72 overflow-hidden rounded-3xl bg-amber-100 md:h-96">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop"
            alt="Интерьер кафе Тёплый Уголок"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-bold text-amber-700">Наша История</h2>
          <p className="mb-4 leading-relaxed text-stone-600">
            Кафе «Тёплый Уголок» открылось в 2015 году как маленькое семейное заведение
            с простой идеей — кормить людей вкусной домашней едой. Мы начинали с пяти блюд в меню,
            а сегодня наши гости могут выбрать из более чем 50 позиций.
          </p>
          <p className="leading-relaxed text-stone-600">
            Мы верим, что еда должна быть не только вкусной, но и полезной. Поэтому мы используем
            только свежие продукты от проверенных поставщиков и готовим каждое блюдо с любовью.
          </p>
        </div>
      </section>

      {/* Преимущества */}
      <section className="mb-16 bg-stone-50 py-12">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-center text-2xl font-bold text-stone-800">Почему нас выбирают</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl bg-white p-6 shadow">
              <h3 className="mb-2 font-semibold text-amber-700">Свежие продукты</h3>
              <p className="text-stone-600">Закупаем ингредиенты каждое утро у местных фермеров.</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow">
              <h3 className="mb-2 font-semibold text-amber-700">Домашняя кухня</h3>
              <p className="text-stone-600">Готовим по традиционным рецептам с душой.</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow">
              <h3 className="mb-2 font-semibold text-amber-700">Уютная атмосфера</h3>
              <p className="text-stone-600">Мягкий свет, приятная музыка и тёплый интерьер.</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow">
              <h3 className="mb-2 font-semibold text-amber-700">Быстрое обслуживание</h3>
              <p className="text-stone-600">Ценим ваше время — подаём блюда без долгого ожидания.</p>
            </div>
          </div>
        </div>
      </section>

      <Gallery />
    </div>
  );
}
