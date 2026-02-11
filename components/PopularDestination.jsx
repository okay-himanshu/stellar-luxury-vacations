"use client";

import Image from "next/image";

// Matching images based on your screenshot
const destinations = [
  {
    id: 1,
    alt: "Desert Resort",
    src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=90", // Desert Aerial
  },
  {
    id: 2,
    alt: "Maldives Island",
    src: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=90", // Island Atoll
  },
  {
    id: 3,
    alt: "Luxury Beach Palace",
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=90", // Hotel Palace
  },
  {
    id: 4,
    alt: "Hill Station Villas",
    src: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?w=800&q=90", // Green Resort
  },
  {
    id: 5,
    alt: "Jungle Bamboo Resort",
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=90", // Bamboo Villa
  },
  {
    id: 6,
    alt: "Snow Mountain Resort",
    src: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=800&q=90", // Snow Cabins
  },
];

export default function PopularDestinations() {
  return (
    <section className="w-full bg-black py-24 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <p className="text-gray-400 text-sm tracking-wide mb-2">
            Best Place For You
          </p>
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-6">
            Most Popular Destinations
          </h2>
          <p className="text-gray-500 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            With access to the world&apos;s top destinations, luxury hotels,
            airlines, and local experiences, your travel possibilities are
            endless.
          </p>
        </div>

        {/* --- IMAGE GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((item) => (
            <div
              key={item.id}
              className="relative h-[250px] md:h-[300px] w-full overflow-hidden rounded-lg group cursor-pointer"
            >
              {/* Image with Zoom Hover Effect */}
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Optional: Subtle Overlay on Hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
    