"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, ArrowUp } from "lucide-react"; // Arrow icon import kiya
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/pagination";

// --- 10 TESTIMONIALS DATA ---
const testimonials = [
  {
    id: 1,
    name: "Adiya Mishra",
    role: "Business Woman",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    rating: 5,
    text: "Just back from our Bali getaway, and I'm still in awe! Savoy Holidays planned everything so perfectly. It felt so relaxing and stress-free. Thank you for making this trip wonderful 💕.",
  },
  {
    id: 2,
    name: "Anam Khan",
    role: "Fashion Designer",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
    rating: 5,
    text: "Our family vacation to Switzerland was a dream come true ❄️. The hotels were cozy, views looked straight out of a postcard. Royal Savoy Holidays, you guys are amazing! ❤️",
  },
  {
    id: 3,
    name: "Anita Singhla",
    role: "Teacher",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80",
    rating: 4,
    text: "I had the best time exploring Japan. Everything was so smooth—the local guides were amazing. Every moment was WOW ✨! Thank you for making this journey unforgettable.",
  },
  {
    id: 4,
    name: "Rahul Verma",
    role: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    rating: 5,
    text: "Maldives was paradise on earth! 🌊 The water villa arrangement was spectacular. Smooth transfers and excellent hospitality. Highly recommended!",
  },
  {
    id: 5,
    name: "Priya Sharma",
    role: "Travel Blogger",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    rating: 5,
    text: "I travel a lot, but the precision Royal Savoy puts into itinerary planning is next level. My Dubai trip was flawless. The desert safari was the highlight! 🐪",
  },
  {
    id: 6,
    name: "Vikram Malhotra",
    role: "Architect",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    rating: 4,
    text: "Great experience in Europe. The hotels were centrally located which made sightseeing very easy. Good value for money packages.",
  },
  {
    id: 7,
    name: "Sneha Patel",
    role: "Doctor",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    rating: 5,
    text: "Our honeymoon in Greece was magical 🌅. Santorinin sunsets and the cruise dinner were perfectly organized. Thanks for the special candlelight dinner surprise!",
  },
  {
    id: 8,
    name: "Arjun Das",
    role: "Photographer",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
    rating: 5,
    text: "As a photographer, I wanted scenic locations. The team curated a custom itinerary for Ladakh that was breathtaking. Every stop was picture perfect 📸.",
  },
  {
    id: 9,
    name: "Meera Reddy",
    role: "Chef",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    rating: 4,
    text: "Thailand food tour was yummy! 🍜 Hotels were clean and luxury. Just a small delay in pickup once, but otherwise a fantastic experience.",
  },
  {
    id: 10,
    name: "Kabir Singh",
    role: "Entrepreneur",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80",
    rating: 5,
    text: "Luxury at its best. Booked a private jet charter and villa stay. Professionalism was top-notch. Will definitely book again for my corporate retreat.",
  },
];

export default function Testimonials() {
  const [showButton, setShowButton] = useState(false);

  // Scroll Button Logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-black py-24 px-4 relative overflow-hidden">
      {/* Custom Styles for Swiper Active Slide Pop-up effect */}
      <style jsx global>{`
        .testimonial-swiper {
          padding-top: 50px !important;
          padding-bottom: 80px !important;
        }

        .testimonial-swiper .swiper-slide {
          transition: all 0.5s ease;
          opacity: 0.5;
          transform: scale(0.9);
        }

        /* Jo Slide Beech me hogi (Active) */
        .testimonial-swiper .swiper-slide-active {
          opacity: 1;
          transform: scale(1.1) translateY(-20px); /* Thoda Upar Uthega */
          z-index: 10;
        }

        /* Active Slide ka Dot Gold hoga */
        .testimonial-swiper .swiper-slide-active .card-dot {
          background-color: #c9a84c;
          border-color: #c9a84c;
        }

        /* Pagination Dots Color override */
        .swiper-pagination-bullet {
          background: gray;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #c9a84c !important;
          opacity: 1;
          width: 12px;
          height: 12px;
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* --- HEADER --- */}
        <div className="text-center mb-10">
          <p className="text-gray-500 text-sm mb-2 uppercase tracking-widest">
            Testimonial
          </p>
          <h2 className="text-white text-3xl md:text-5xl font-bold">
            What Client Say About us
          </h2>
        </div>

        {/* --- BACKGROUND WAVE LINE (Static Decoration) --- */}
        <div className="absolute top-[60%] left-0 w-full hidden md:block pointer-events-none opacity-30">
          <svg viewBox="0 0 1440 320" className="w-full">
            <path
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="10 10"
              d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,138.7C672,117,768,107,864,122.7C960,139,1056,181,1152,192C1248,203,1344,181,1392,170.7L1440,160"
            />
          </svg>
        </div>

        {/* --- SWIPER CAROUSEL --- */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 3000, // 3 Seconds speed
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          className="testimonial-swiper"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="relative bg-[#1c1c1c] p-8 rounded-2xl border border-gray-800 h-full flex flex-col justify-between">
                {/* User Info */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gray-600">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">
                        {item.name}
                      </h4>
                      <p className="text-gray-500 text-xs">{item.role}</p>
                    </div>
                  </div>
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        fill={i < item.rating ? "#c9a84c" : "transparent"}
                        stroke={i < item.rating ? "none" : "#666"}
                      />
                    ))}
                  </div>
                </div>

                {/* Text */}
                <p className="text-gray-400 text-sm leading-relaxed italic">
                  &quot;{item.text}&quot;
                </p>

                {/* --- CONNECTING DOT (Bottom Circle) --- */}
                {/* CSS class "card-dot" handles the color change on active slide */}
                <div className="card-dot absolute left-1/2 transform -translate-x-1/2 -bottom-5 w-8 h-8 rounded-full border-4 border-black bg-white transition-colors duration-300"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* --- SCROLL TO TOP BUTTON (Fixed) --- */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-[#F5E6CA] w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(201,168,76,0.5)] hover:scale-110 transition-transform duration-300 animate-bounce-slow cursor-pointer"
        >
          <ArrowUp className="text-[#c9a84c] font-bold" size={24} />
        </button>
      )}
    </section>
  );
}
