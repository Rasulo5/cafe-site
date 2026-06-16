import Link from "next/link";

const socials = [
  { label: "Telegram", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "WhatsApp", href: "#" },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-amber-200/60 bg-stone-900 text-stone-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
        <div>
          <h3 className="mb-3 text-xl font-bold text-amber-500">🍽️ Тёплый Уголок</h3>
          <p className="text-sm leading-relaxed text-stone-400">
            Уютное кафе домашней кухни. Готовим с любовью каждый день.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-stone-100">Навигация</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/menu" className="transition-colors hover:text-amber-500">Меню</Link></li>
            <li><Link href="/about" className="transition-colors hover:text-amber-500">О кафе</Link></li>
            <li><Link href="/contacts" className="transition-colors hover:text-amber-500">Контакты</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-stone-100">Контакты</h4>
          <p className="text-sm text-stone-400">г. Санкт-Петербург, ул. Уютная, 12</p>
          <p className="text-sm text-stone-400">+7 (812) 123-45-67</p>
          <p className="text-sm text-stone-400">hello@teply-ugolok.ru</p>
          <div className="mt-4 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 transition-colors hover:text-amber-500"
                aria-label={s.label}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-stone-800 py-6 text-center text-sm text-stone-500">
        © {new Date().getFullYear()} Кафе «Тёплый Уголок». Все права защищены.
      </div>
    </footer>
  );
}
