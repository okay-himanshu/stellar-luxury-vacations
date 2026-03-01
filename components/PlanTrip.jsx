"use client";

import Image from "next/image";

export default function PlanTrip() {
  return (
    <section className="relative w-full bg-black py-24 px-6 overflow-hidden">
      {/* --- CUSTOM CSS ANIMATION --- */}
      <style jsx>{`
        /* Yeh animation cheezon ko left-right move karegi */
        @keyframes moveHorizontal {
          0% {
            transform: translateX(-15px);
          }
          50% {
            transform: translateX(15px);
          }
          100% {
            transform: translateX(-15px);
          }
        }

        .animate-horizontal {
          animation: moveHorizontal 5s ease-in-out infinite;
        }
      `}</style>

      {/* --- DECORATION: Hot Air Balloons (SVG Lines) --- */}
      <div className="absolute top-10 left-10 opacity-30 pointer-events-none animate-pulse">
        <svg
          width="60"
          height="80"
          viewBox="0 0 50 70"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="1.5"
        >
          <path d="M25 1 C12 1 1 12 1 25 C1 35 8 45 18 48 L20 55 L30 55 L32 48 C42 45 49 35 49 25 C49 12 38 1 25 1 Z" />
          <path d="M1 25 H49" />
          <path d="M25 1 V55" />
          <rect x="18" y="55" width="14" height="8" rx="1" />
        </svg>
      </div>
      <div className="absolute top-20 left-32 opacity-20 pointer-events-none">
        <svg
          width="40"
          height="55"
          viewBox="0 0 50 70"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="1.5"
        >
          <path d="M25 1 C12 1 1 12 1 25 C1 35 8 45 18 48 L20 55 L30 55 L32 48 C42 45 49 35 49 25 C49 12 38 1 25 1 Z" />
          <rect x="18" y="55" width="14" height="8" rx="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* === LEFT COLUMN: Image Collage === */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4 h-[500px]">
          {/* Big Pill Image */}
          <div className="relative w-full h-full rounded-[100px] overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=600&q=90" // Hiker/Mountain
              alt="Mountain Trek"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Two Stacked Images */}
          <div className="flex flex-col gap-4 h-full">
            {/* Top Image */}
            <div className="relative w-full h-1/2 rounded-[40px] overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&q=90" // Lake/Canoe
                alt="Lake Kayak"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            {/* Bottom Image */}
            <div className="relative w-full h-1/2 rounded-[40px] rounded-br-[100px] overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=90" // Couple/Cinque Terre
                alt="City Couple"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        {/* === CENTER COLUMN: Text Content === */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          <p className="text-gray-400 text-sm tracking-wide mb-2">
            Let&apos;s Go Together
          </p>
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Plan Your Trip <br /> With us
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            At Stellar Luxury Vacations, we understand that every journey is
            unique and deserves careful planning. Our dedicated team is here to
            make your travel dreams a reality. Whether you&apos;re looking for a
            serene beach getaway, an adventurous mountain trek, or a cultural
            city experience.
          </p>

          {/* Features List */}
          <div className="space-y-6 mb-8">
            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#c9a84c] flex-shrink-0"></div>
              <div>
                <h4 className="text-white font-bold text-lg">Exclusive Trip</h4>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                  Experience the world like never before with our exclusive
                  trips designed just for you.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#c9a84c] flex-shrink-0"></div>
              <div>
                <h4 className="text-white font-bold text-lg">
                  Professional Guide
                </h4>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                  Navigating new destinations can be overwhelming, which is why
                  having a professional guide is invaluable.
                </p>
              </div>
            </div>
          </div>

          {/* Button */}
          <button className="bg-[#184e55] hover:bg-[#133d42] text-white px-8 py-3 rounded-full w-fit text-sm transition-colors duration-300">
            Learn More
          </button>
        </div>

        {/* === RIGHT COLUMN: Traveler Image (ANIMATED) === */}
        <div className="lg:col-span-3 relative h-[500px] flex items-end justify-center">
          {/* WRAPPER DIV: Ispe 'animate-horizontal' class lagi hai.
             Iske andar jo bhi hai (Circle, Image, Badge) sab ek saath move karega.
          */}
          <div className="relative w-full h-full flex items-center justify-center animate-horizontal">
            {/* 1. Light Blue Circle Background */}
            <div className="absolute w-[320px] h-[320px] bg-[#e0f2fe] rounded-full z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

            {/* 2. Traveler Image */}
            <div className="relative z-10 w-[100px] h-[100px] flex items-end justify-center animate-bounce">
              <Image
                src="/images/about-slide-img.webp"
                alt="Traveler"
                width={100}
                height={100}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>

            {/* 3. Floating Star Badge */}
            <div className="absolute top-[35%] right-0 z-20 bg-white p-3 rounded-full shadow-xl">
              <div className="flex flex-col items-center justify-center w-12 h-12">
                <span className="text-red-500 text-xl">★</span>
                <span className="text-black font-bold text-xs">4.9k</span>
              </div>
            </div>
          </div>

          {/* White Dot Decoration (Yeh background mein static rahega) */}
          <div className="absolute top-[60%] left-[-20px] w-6 h-6 bg-white rounded-full z-0 shadow-lg"></div>
        </div>
      </div>
    </section>
  );
}
