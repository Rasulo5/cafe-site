import Image from "next/image";

const photos = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1554118174-228a1e683597?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
];

export default function Gallery() {
  return (
    <section className="py-12">
      <h2 className="mb-8 text-center text-2xl font-bold text-stone-800">Фотогалерея</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {photos.map((src, i) => (
          <div
            key={i}
            className="group relative h-48 overflow-hidden rounded-2xl border border-amber-200/70 bg-amber-100"
          >
            <Image
              src={src}
              alt={`Фото интерьера ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
