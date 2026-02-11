"use client";

import Image from "next/image";

// Data for Logos (Replace src with your actual logo files)
const associates = [
  { id: 1, name: "MakeMyTrip", src: "/images/mmt.webp" },
  { id: 2, name: "Trivago", src: "/images/trivago.webp" },
  { id: 3, name: "Goibibo", src: "/images/goibibo.webp" },
  { id: 4, name: "Booking.com", src: "/images/booking.webp" },
  { id: 5, name: "Agoda", src: "/images/agoda.webp" },
  { id: 6, name: "Travel Boutique", src: "/images/travel.webp" }, // Placeholder for the last one
];

// Data for Text Features
const features = [
  {
    title: "Competetive Pricing",
    desc: "With 500+ suppliers and the purchasing power millions of members",
  },
  {
    title: "Award Winning Service",
    desc: "Fabulous Travel worry free knowing that we're here if you need us, 24 hours a day",
  },
  {
    title: "Worldwide Coverage",
    desc: "1,00,000+ hotels in more than 100+ countries and regions & flights to over 2,000+ citites.",
  },
];

// Data for Circular Videos
const videos = [
  {
    id: 1,
    // Desert/Sand Video
    src: "/videos/2.mp4",
  },
  {
    id: 2,
    // Water/Rocks Video
    src: "/videos/3.mp4",
  },
  {
    id: 3,
    // Field/Walking Video
    src: "/videos/4.mp4",
  },
  {
    id: 4,
    // Snow/Couple Video
    src: "/videos/5.mp4",
  },
];

export default function TravelAssociates() {
  return (
    <section className="w-full bg-black py-20 px-4 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <h2 className="text-white font-bold text-4xl md:text-5xl mb-6">
            Our Travel Associates
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            Travel has helped us to understand the meaning of life and it has
            helped us become better people. Each time we travel, we see the
            world with new eyes.
          </p>
        </div>

        {/* --- LOGOS GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {associates.map((item) => (
            <div
              key={item.id}
              className="bg-white h-[80px] flex items-center justify-center p-4 rounded-sm hover:scale-105 transition-transform duration-300"
            >
              {/* Using standard img tag for logos to ensure fitting without Next.js config issues, 
                  you can switch to next/image if configured */}
              <img
                src={item.src}
                alt={item.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* --- FEATURES TEXT --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="text-left">
              <h3 className="text-[#c9a84c] text-2xl font-bold mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* --- CIRCULAR VIDEOS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="flex justify-center">
              {/* Circle Container */}
              <div className="relative w-[280px] h-[280px] rounded-full overflow-hidden border-4 border-transparent hover:border-[#c9a84c] transition-all duration-500 group">
                <video
                  src={video.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                {/* Optional dark overlay if you want text on top later */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
