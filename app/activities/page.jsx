"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import CommonHero from "../../components/CommonHero";

// ================= DATA =================

// Row 1: 3 Cards
const row1Activities = [
  {
    id: 1,
    title: "Desert Safari",
    desc: "A desert safari is a thrilling adventure that offers a unique blend of excitement, cultural experiences, and breathtaking landscapes.",
    thumb:
      "https://images.unsplash.com/photo-1547234935-80c7142ee969?w=800&q=90",
    videoUrl:
      "https://videos.pexels.com/video-files/2040081/2040081-hd_1920_1080_30fps.mp4",
  },
  {
    id: 2,
    title: "Paragliding",
    desc: "Soar through the skies and enjoy breathtaking views with paragliding. Perfect for adventure seekers, it's an unforgettable way to embrace the freedom of flight.",
    thumb:
      "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=90",
    videoUrl:
      "https://videos.pexels.com/video-files/3516345/3516345-hd_1920_1080_30fps.mp4",
  },
  {
    id: 3,
    title: "River Rafting",
    desc: "Dive into the excitement of river rafting! Navigate rapids, bond with your team, and enjoy stunning landscapes. Ideal for thrill-seekers and nature lovers alike.",
    thumb:
      "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800&q=90",
    videoUrl:
      "https://videos.pexels.com/video-files/4067988/4067988-hd_1920_1080_30fps.mp4",
  },
];

// Row 2: Scuba Diving (Text Left, Image Right)
const scubaData = {
  title: "Scuba Diving",
  desc: "Discover the underwater world with scuba diving! Plunge into crystal-clear waters and explore vibrant coral reefs, exotic marine life, and hidden shipwrecks. Whether you're an experienced diver or a curious beginner, scuba diving offers an unparalleled adventure. From the Great Barrier Reef in Australia to the cenotes of Mexico, the best diving spots around the globe await your exploration. Experience the serenity and thrill of being submerged in a different world. Gear up, follow safety protocols, and dive into an unforgettable underwater journey. Book your scuba diving adventure today and immerse yourself in the ocean's wonders!",
  thumb: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=90",
  videoUrl:
    "https://videos.pexels.com/video-files/856973/856973-hd_1920_1080_30fps.mp4",
};

// Row 3: 3 Cards
const row3Activities = [
  {
    id: 4,
    title: "Jet Skiing",
    desc: "Jet skiing combines speed and fun, letting you ride across lakes, rivers, or oceans. Perfect for beginners and pros alike, it's a thrilling way to explore and enjoy the water.",
    thumb:
      "https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?w=800&q=90",
    videoUrl:
      "https://videos.pexels.com/video-files/4823902/4823902-hd_1920_1080_30fps.mp4",
  },
  {
    id: 5,
    title: "Bungy Jumping",
    desc: "Take the leap of faith with bungy jumping! Feel the ultimate adrenaline rush as you dive from incredible heights and experience the thrill of freefall.",
    thumb:
      "https://images.unsplash.com/photo-1625902306208-8f8306354898?w=800&q=90",
    videoUrl:
      "https://videos.pexels.com/video-files/4492776/4492776-hd_1920_1080_25fps.mp4",
  },
  {
    id: 6,
    title: "Surfing",
    desc: "Ride the waves and feel the rush of surfing! Whether you're a pro or a beginner, surfing offers unmatched excitement and connection with the ocean.",
    thumb:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=90",
    videoUrl:
      "https://videos.pexels.com/video-files/2418573/2418573-hd_1920_1080_24fps.mp4",
  },
];

// Row 4: Skydiving (Image Left, Text Right)
const skydivingData = {
  title: "Skydiving",
  desc: "Skydiving is one of the most exhilarating and adrenaline-pumping experiences one can undertake. It involves jumping from an aircraft at high altitudes and free-falling before deploying a parachute to glide safely to the ground. This extreme sport offers a unique blend of adventure, challenge, and breathtaking views, making it a bucket-list activity for thrill-seekers around the world. Here's a detailed look at what makes skydiving such an extraordinary experience.",
  thumb:
    "https://images.unsplash.com/photo-1529528744093-6f8abeee511d?w=800&q=90",
  videoUrl:
    "https://videos.pexels.com/video-files/4607755/4607755-hd_1920_1080_30fps.mp4",
};

// Gallery Images
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&q=90",
    alt: "Hot Air Balloons",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=90",
    alt: "Surfing Wave",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&q=90",
    alt: "Horse Archery",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1625844007086-a5170d4d7d13?w=800&q=90",
    alt: "Waterfall Zipline",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=800&q=90",
    alt: "Golf",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=90",
    alt: "Horse Jumping",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=90",
    alt: "ATV Quad",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=90",
    alt: "Bungee Jump",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=90",
    alt: "Yoga",
  },
];

// ================= COMPONENT: VIDEO CARD (Standard) =================
function VideoCard({ item }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    setIsPlaying(true);
    if (videoRef.current) videoRef.current.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="flex flex-col mb-8">
      <div
        className="relative w-full h-[250px] rounded-[30px] overflow-hidden cursor-pointer bg-gray-900 border border-gray-800"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${isPlaying ? "opacity-0" : "opacity-100"}`}
        >
          <Image
            src={item.thumb}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>
        <video
          ref={videoRef}
          src={item.videoUrl}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-0"}`}
        />
      </div>
      <div className="text-center mt-6 px-2">
        <h3 className="text-white text-3xl font-bold mb-3">{item.title}</h3>
        <p className="text-gray-400 text-xs leading-relaxed opacity-80">
          {item.desc}
        </p>
      </div>
    </div>
  );
}

// ================= COMPONENT: FEATURE ROW (Side-by-Side) =================
function FeatureRow({ data, reverse = false }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    setIsPlaying(true);
    if (videoRef.current) videoRef.current.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className={`flex flex-col lg:flex-row items-center gap-12 mb-32 ${reverse ? "lg:flex-row-reverse" : ""}`}
    >
      {/* Text Section */}
      <div className="flex-1 text-center lg:text-left">
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-6">
          {data.title}
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed text-justify opacity-80">
          {data.desc}
        </p>
      </div>

      {/* Video/Image Section */}
      <div
        className="relative flex-1 w-full h-[350px] lg:h-[400px] rounded-[30px] overflow-hidden cursor-pointer border border-gray-800"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${isPlaying ? "opacity-0" : "opacity-100"}`}
        >
          <Image
            src={data.thumb}
            alt={data.title}
            fill
            className="object-cover"
          />
        </div>
        <video
          ref={videoRef}
          src={data.videoUrl}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-0"}`}
        />
      </div>
    </div>
  );
}

// ================= MAIN PAGE COMPONENT =================
export default function ActivitiesPage() {
  return (
    <div className="w-full bg-black min-h-screen">
      {/* 1. HEADER IMAGE (Palace) */}
      <CommonHero />

      {/* 2. MAIN CONTENT - Starts BELOW the image (No Overlap) */}
      <div className="max-w-[1400px] mx-auto px-6 py-20 relative z-10">
        {/* HEADING */}
        <div className="mb-20">
          <p className="text-gray-300 text-sm mb-2 opacity-80">
            Experience luxury, adventure, and culture like never before.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-800 pb-8">
            <h1 className="text-white text-5xl font-bold">Activities</h1>
            <button className="hidden md:block border border-gray-600 text-gray-300 px-6 py-2 rounded-full text-xs hover:bg-white hover:text-black transition-colors uppercase tracking-widest mt-4 md:mt-0">
              Explore Itineraries ...
            </button>
          </div>
        </div>

        {/* 3. ROW 1: THREE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {row1Activities.map((activity) => (
            <VideoCard key={activity.id} item={activity} />
          ))}
        </div>

        {/* 4. ROW 2: SCUBA DIVING (Text Left, Image Right) */}
        <FeatureRow data={scubaData} reverse={false} />

        {/* 5. ROW 3: THREE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {row3Activities.map((activity) => (
            <VideoCard key={activity.id} item={activity} />
          ))}
        </div>

        {/* 6. ROW 4: SKYDIVING (Image Left, Text Right) */}
        <FeatureRow data={skydivingData} reverse={true} />

        {/* 7. GOOD REASONS TO CHOOSE (Masonry Gallery) */}
        <div className="mb-32">
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 inline-block  pb-1">
            Good Reasons to choose
          </h2>
          <p className="text-gray-400 max-w-5xl text-sm leading-relaxed mb-12 opacity-80 text-justify">
            We believe in responsible tourism and are committed to sustainable
            travel practices. Our partnerships with eco-friendly resorts and our
            focus on community-based tourism initiatives ensure that your luxury
            holiday also contributes positively to the environment and local
            communities.
          </p>
          {/* MASONRY GRID (Exact Layout Match) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              <div className="relative h-[300px] overflow-hidden group">
                <Image
                  src={galleryImages[0].src}
                  alt={galleryImages[0].alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="relative h-[200px] overflow-hidden group">
                <Image
                  src={galleryImages[3].src}
                  alt={galleryImages[3].alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="relative h-[250px] overflow-hidden group">
                <Image
                  src={galleryImages[6].src}
                  alt={galleryImages[6].alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <div className="relative h-[220px] overflow-hidden group">
                <Image
                  src={galleryImages[1].src}
                  alt={galleryImages[1].alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="relative h-[350px] overflow-hidden group">
                <Image
                  src={galleryImages[4].src}
                  alt={galleryImages[4].alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="relative h-[180px]  overflow-hidden group">
                <Image
                  src={galleryImages[7].src}
                  alt={galleryImages[7].alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-4">
              <div className="relative h-[350px]  overflow-hidden group">
                <Image
                  src={galleryImages[2].src}
                  alt={galleryImages[2].alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="relative h-[200px]  overflow-hidden group">
                <Image
                  src={galleryImages[5].src}
                  alt={galleryImages[5].alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="relative h-[200px]  overflow-hidden group">
                <Image
                  src={galleryImages[8].src}
                  alt={galleryImages[8].alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
