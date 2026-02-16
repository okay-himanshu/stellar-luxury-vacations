"use client";

import Image from "next/image";

const roomData = [
  {
    id: 1,
    title: "S1 Standard Room",
    description:
      "This Room Type Is Equivalent To 1 Room And Can Accommodation 2 Adults And 2 Kids Below 6 Years.",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=90", // Single Bed / Modern
    features: [
      "Comfortable Beds: Cozy beds with fresh linens.",
      "Flat-Screen TV: Cable or satellite channels.",
      "Climate Control: Air conditioning and heating.",
      "Wi-Fi: Complimentary high-speed internet.",
      "Work Desk: Available for productivity.",
      "Coffee/Tea Maker: Brew fresh coffee or tea.",
      "Mini Refrigerator: Keep snacks and drinks cool.",
      "Private Bathroom: Equipped with shower or bathtub and complimentary toiletries.",
      "Hairdryer: Available to save space in your luggage.",
      "Room Service: Available at some locations.",
    ],
  },
  {
    id: 2,
    title: "S2 Standard Room",
    description:
      "This Room Type Is Significantly Larger To 2 Room And Can Accommodation 4 Adults And 2 Kids Below 6 Years.",
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=90", // Twin Beds
    features: [
      "Comfortable Beds: Cozy beds with fresh linens for a good night's sleep.",
      "Flat-Screen TV: Cable or satellite channels.",
      "Climate Control: Air conditioning and heating.",
      "Wi-Fi: Complimentary high-speed internet.",
      "Work Desk: Available for productivity.",
      "Coffee/Tea Maker: Brew fresh coffee or tea.",
      "Mini Refrigerator: Keep snacks and drinks cool.",
      "Private Bathroom: Equipped with shower or bathtub and complimentary toiletries.",
      "Hairdryer: Available to save space in your luggage.",
      "Room Service: Available at some locations.",
    ],
  },
];

export default function SeasonsApartment() {
  return (
    <section className="w-full bg-black py-20 px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-3">
            Seasons & Apartment
          </h2>
          <p className="text-gray-500 text-xs md:text-sm uppercase tracking-[0.2em]">
            Apartment Categories (Business Price List)
          </p>
        </div>

        {/* --- ROOMS GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {roomData.map((room) => (
            <div
              key={room.id}
              className="flex flex-col items-center text-center"
            >
              {/* IMAGE CARD with GLOW EFFECT */}
              <div className="relative w-full h-[350px] md:h-[450px] rounded-[30px] overflow-hidden mb-10 border border-gray-800 shadow-[0_0_30px_rgba(255,255,255,0.1)] group">
                <Image
                  src={room.image}
                  alt={room.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              </div>

              {/* TITLE & DESC */}
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">
                {room.title}
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed max-w-lg mb-8 mx-auto border-b border-gray-800 pb-8">
                {room.description}
              </p>

              {/* FEATURES LIST */}
              <ul className="space-y-3">
                {room.features.map((feature, index) => (
                  <li
                    key={index}
                    className="text-gray-400 text-xs md:text-sm leading-relaxed"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
