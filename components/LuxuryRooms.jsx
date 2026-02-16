"use client";

import Image from "next/image";

// Placeholder images for luxury rooms (Replace with your actual images if you have them)
const roomImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=90",
    alt: "Luxury Room with Balcony",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=90",
    alt: "Modern Bedroom Red Accents",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=90",
    alt: "Elegant Suite Neutral Tones",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=90",
    alt: "Twin Bed Luxury Room",
  },
];

export default function LuxuryRooms() {
  return (
    <section className="w-full bg-black py-20 px-6">
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- TEXT CONTENT --- */}
        <div className="text-center mb-16 max-w-5xl mx-auto">
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-8">
            Luxury Spacious Rooms
          </h2>
          
          <div className="space-y-6 text-gray-400 text-sm md:text-base leading-relaxed">
            <p>
              Indulge in the epitome of luxury and comfort with our spacious rooms at Royal Savoy Holidays. 
              Designed to provide a sanctuary of relaxation, our accommodations offer a perfect blend of 
              elegance, style, and functionality. Step into a world of opulence as you enter your expansive 
              room, meticulously crafted to cater to your every need.
            </p>
            <p>
              Experience a sense of grandeur with high ceilings, tasteful furnishings, and sophisticated 
              decor that exude an aura of refinement. Sink into plush bedding and unwind in a haven of 
              tranquility, knowing that every detail has been carefully considered to ensure your utmost comfort.
            </p>
          </div>
        </div>

        {/* --- IMAGE GRID (2x2) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roomImages.map((room) => (
            <div 
              key={room.id} 
              className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-lg group"
            >
              <Image
                src={room.src}
                alt={room.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
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