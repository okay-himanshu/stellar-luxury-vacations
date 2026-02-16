"use client";

import Image from "next/image";

const features = [
  "30 Years of luxurious holiday packages accessible",
  "6Nights/7Days at 500+ destinations worldwide",
  "Wide Range of diverse activities",
  "Rs 10k+ discounts on international flights",
  "Complimentary movie tickets, flight assistance, dedicated customized holiday vouchers",
  "Hassle-free concierge at no extra cost",
  "Luscious cuisines",
];

export default function AdditionalFeature() {
  return (
    <section className="w-full bg-black py-20 px-6">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Grid Layout: Left Text | Right Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* === LEFT: TEXT CONTENT === */}
          <div>
            <h2 className="text-white text-3xl md:text-5xl font-bold mb-10">
              Additional Feature
            </h2>
            
            <ul className="space-y-6">
              {features.map((text, index) => (
                <li key={index} className="flex items-start gap-4 text-gray-300 text-sm md:text-base leading-relaxed">
                  <span className="text-white font-bold">{index + 1}.</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* === RIGHT: IMAGE WITH LOGO === */}
          <div className="relative w-full h-[600px] lg:h-[700px] rounded-lg overflow-hidden border border-gray-800 shadow-2xl group">
             
             {/* Background Image (Pool/Resort) */}
             <Image 
                src="https://images.unsplash.com/photo-1571896349842-6e53ce41e887?w=800&q=90" 
                alt="Additional Features Resort"
                fill
                className="object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
             />

             {/* Top Gradient Overlay for Logo Visibility */}
             <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/80 to-transparent"></div>

             {/* Logo Overlay (Top Center) */}
             <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-48 h-48 md:w-64 md:h-64 animate-fade-in-up">
                <Image 
                   src="/images/logo.png" 
                   alt="Royal Savoy Holidays"
                   fill
                   className="object-contain drop-shadow-2xl"
                />
             </div>
          </div>

        </div>

      </div>
    </section>
  );
}