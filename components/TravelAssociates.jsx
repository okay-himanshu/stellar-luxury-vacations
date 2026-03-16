"use client";

import Image from "next/image";

const associates = [
  { id: 1, name: "MakeMyTrip", src: "/images/mmt.webp" },
  { id: 2, name: "Trivago", src: "/images/trivago.webp" },
  { id: 3, name: "Goibibo", src: "/images/goibibo.webp" },
  { id: 4, name: "Booking.com", src: "/images/booking.webp" },
  { id: 5, name: "Agoda", src: "/images/agoda.webp" },
  { id: 6, name: "Travel Boutique", src: "/images/travel.webp" },
];

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

const videos = [
  {
    id: 1,
    src: "/videos/2.mp4",
  },
  {
    id: 2,
    src: "/videos/3.mp4",
  },
  {
    id: 3,
    src: "/videos/4.mp4",
  },
  {
    id: 4,
    src: "/videos/5.mp4",
  },
];

export default function TravelAssociates({ shoudlShowVideos = true }) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `,
        }}
      />

      <section className="w-full bg-black px-4 md:px-12 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          {/* --- HEADER --- */}
          <div className="text-center mb-16">
            <h2 className="text-white font-bold text-4xl md:text-5xl mb-6 mt-20">
              Our Travel Partners
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
              Travel has helped us to understand the meaning of life and it has
              helped us become better people. Each time we travel, we see the
              world with new eyes.
            </p>
          </div>

          {/* --- INFINITE LOGOS SLIDER --- */}
          <div className="relative w-full mb-20 overflow-hidden group">
            {/* Adding fade gradient on edges for premium look (optional but looks great) */}
            <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

            <div className="animate-marquee gap-6">
              {/* Array ko 2 baar map kiya taaki loop seamless (bina jhatke ke) chal sake */}
              {[...associates, ...associates].map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="w-[180px] md:w-[220px] flex-shrink-0 bg-white h-[80px] flex items-center justify-center p-4 rounded-sm transition-transform duration-300 hover:scale-[1.03] cursor-pointer"
                >
                  <img
                    src={item.src}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

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
          {shoudlShowVideos && (
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
          )}
        </div>
      </section>
    </>
  );
}
