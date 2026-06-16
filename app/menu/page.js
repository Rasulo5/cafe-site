import MenuList from "@/components/MenuList";

export const metadata = {
  title: "Меню — Тёплый Уголок",
  description:
    "Меню кафе «Тёплый Уголок»: завтраки, супы, салаты, горячие блюда, десерты и напитки. Свежие продукты и вкусные цены.",
};

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-stone-800 sm:text-5xl">Наше Меню</h1>
        <p className="mx-auto mt-3 max-w-xl text-stone-600">
          Выбирайте блюда на свой вкус или закажите любимое блюдо через онлайн.
        </p>
      </header>
      <MenuList />
    </div>
  );
}
