"use client";

import { useState, useRef } from "react";
import { X, Play } from "lucide-react"; // Ensure lucide-react is installed

// --- DATA: Replace with your actual Video URLs ---
const itineraries = [
  {
    id: 1,
    title: "DUBAI",
    description:
      "We will then embark on a comprehensive city tour of Dubai. Discover the city's iconic landmarks, including Jumeirah Mosque, Gold Souk, Dubai Mall, and enjoy a scenic drive past Atlantis.",
    videoUrl:
      "https://joy1.videvo.net/videvo_files/video/free/2019-12/large_watermarked/190915_A_04_Drone_13_preview.mp4", // Desert/Dubai vibe
    thumbnail:
      "https://images.unsplash.com/photo-1512453979798-5ea932a23518?w=800&q=90",
  },
  {
    id: 2,
    title: "GOA",
    description:
      "The vibrant destination of India, Goa, offers much more than its famous party scene. With a rich legacy, history, and culture waiting to be discovered, Goa has something for everyone.",
    videoUrl:
      "https://joy1.videvo.net/videvo_files/video/free/2021-04/large_watermarked/210329_06B_Bali_1080p_013_preview.mp4", // Beach vibe
    thumbnail:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=90",
  },
  {
    id: 3,
    title: "BALI",
    description:
      "Bali, with its enchanting beauty, rich culture, and serene beaches, offers an unforgettable experience. Whether you seek adventure or relaxation, Bali has it all.",
    videoUrl:
      "https://joy1.videvo.net/videvo_files/video/free/2019-09/large_watermarked/190828_27_SuperTrees_Drone_19_preview.mp4", // Nature/Temple vibe
    thumbnail:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=90",
  },
];

export default function ExclusiveItinerary() {
  const [activeVideo, setActiveVideo] = useState(null); // State for Popup Video

  return (
    <section className="w-full bg-black py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-800 pb-8">
          <div>
            <p className="text-gray-400 text-sm mb-2">
              Experience luxury, adventure, and culture like never before.
            </p>
            <h2 className="text-white text-4xl md:text-5xl font-bold uppercase tracking-wide">
              EXCLUSIVE ITINERARY
            </h2>
          </div>
          <button className="hidden md:block border border-gray-600 text-gray-300 px-6 py-2 rounded-full text-xs hover:bg-white hover:text-black transition-colors uppercase tracking-widest">
            See More Itinerarys.
          </button>
        </div>

        {/* --- CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {itineraries.map((item) => (
            <VideoCard
              key={item.id}
              item={item}
              onPlay={() => setActiveVideo(item.videoUrl)}
            />
          ))}
        </div>

        {/* Mobile Button (Visible only on mobile) */}
        <div className="mt-10 text-center md:hidden">
          <button className="border border-gray-600 text-gray-300 px-6 py-2 rounded-full text-xs hover:bg-white hover:text-black transition-colors uppercase tracking-widest">
            See More Itinerarys.
          </button>
        </div>
      </div>

      {/* --- VIDEO POPUP MODAL --- */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800">
            {/* Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-20 text-white hover:text-red-500 bg-black/50 rounded-full p-2 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Main Player (With Sound) */}
            <video
              src={activeVideo}
              className="w-full h-full object-contain"
              controls
              autoPlay
            ></video>
          </div>
        </div>
      )}
    </section>
  );
}

// --- INDIVIDUAL CARD COMPONENT ---
function VideoCard({ item, onPlay }) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((err) => console.log("Autoplay prevent", err));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset video
    }
  };

  return (
    <div className="flex flex-col">
      {/* Video/Image Container */}
      <div
        className="relative w-full h-[280px] rounded-[30px] overflow-hidden cursor-pointer group mb-6 bg-gray-900 border border-gray-800"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onPlay}
      >
        {/* 1. Background Image (Visible when NOT hovering) */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay for Logo readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* 2. Hover Video (Muted, Background Play) */}
        <video
          ref={videoRef}
          src={item.videoUrl}
          muted
          loop
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* 3. Logo & Text Overlay (Always Visible Overlay) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          {/* Fake Logo (Replace with <Image> for real logo) */}
          <div className="flex flex-col items-center mb-0">
           <img src="/images/logo.png" alt="Logo" className="object-contain h-20" />
          </div>

          {/* Big Destination Text */}
          <h3 className="text-white text-4xl font-light tracking-[0.3em] uppercase mt-2 drop-shadow-lg font-[family-name:var(--font-geist-mono)]">
            {item.title}
          </h3>
        </div>
      </div>

      {/* Text Content Below Card */}
      <div>
        <button
          onClick={onPlay}
          className="inline-flex items-center gap-2 border border-white/20 px-4 py-1.5 rounded-lg text-white text-sm hover:bg-white hover:text-black transition-colors mb-4"
        >
          <span>Play</span>
        </button>

        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}
