"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/effect-coverflow";

const destinations = [
  {
    id: 1,
    name: "Maldives",
    listing: "15 Listing",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    id: 2,
    name: "Thailand",
    listing: "22 Listing",
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
  },
  {
    id: 3,
    name: "Belgium",
    listing: "25 Listing",
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
  },
  {
    id: 4,
    name: "Switzerland",
    listing: "18 Listing",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
  {
    id: 5,
    name: "Dubai",
    listing: "30 Listing",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090",
  },
  {
    id: 6,
    name: "Bali",
    listing: "20 Listing",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
  },
  {
    id: 7,
    name: "Paris",
    listing: "28 Listing",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
  },
];

export default function HotDestination() {
  return (
    <section className="w-full bg-black py-20 overflow-hidden">
      <style jsx global>{`
        .hot-swiper {
          width: 100%;
          padding-top: 50px;
          padding-bottom: 50px;
        }

        .hot-swiper .swiper-wrapper {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .hot-swiper .swiper-slide {
          width: 300px !important;
          height: 480px !important;
          border-radius: 24px;
          transition: all 0.5s ease;
          position: relative;
        }

        /* Inactive Slides */
        .hot-swiper .swiper-slide:not(.swiper-slide-active) {
          filter: blur(4px) brightness(0.9);
          opacity: 0.7;
          transform: scale(0.9);
        }

        /* Active Slide */
        .hot-swiper .swiper-slide-active {
          filter: blur(0px) brightness(1);
          opacity: 1;
          transform: scale(1.1);
          z-index: 10;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }

        /* Content animation */
        .hot-swiper .swiper-slide-active .card-content {
          opacity: 1;
          transform: translateY(0);
        }

        .hot-swiper .swiper-slide:not(.swiper-slide-active) .card-content {
          opacity: 0;
          transform: translateY(20px);
        }
      `}</style>

      {/* Header */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-white font-bold text-4xl md:text-5xl mb-4">
          Hot Destination
        </h2>
        <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">
          Explore Hot Locations with Royal Savoy Holidays
        </p>
        <p className="text-gray-500 max-w-3xl mx-auto text-xs md:text-sm leading-relaxed">
          Discover the most sought-after destinations where luxury meets
          adventure. From pristine beaches to vibrant cityscapes, our prime
          locations promise unforgettable experiences and breathtaking moments.
          Your dream getaway awaits!
        </p>
      </div>

      {/* Slider */}
      <div className="w-full">
        <Swiper
          modules={[EffectCoverflow, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={true}
          loopAdditionalSlides={3}
          spaceBetween={40}
          speed={800}
          // Start from middle slide
          initialSlide={Math.floor(destinations.length / 2)}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          className="hot-swiper"
        >
          {destinations.map((place) => (
            <SwiperSlide key={place.id}>
              <div className="w-full h-full relative overflow-hidden rounded-[24px]">
                {/* Background Image */}
                <Image
                  src={place.image}
                  alt={place.name}
                  fill
                  className="object-cover"
                  sizes="300px"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Content */}
                <div className="card-content absolute bottom-0 left-0 w-full p-6 flex items-end justify-between transition-all duration-500">
                  {/* Left: Name & Listing */}
                  <div className="text-left">
                    <h3 className="text-white text-2xl font-bold">
                      {place.name}
                    </h3>
                    <p className="text-white/60 text-sm mt-1">
                      {place.listing}
                    </p>
                  </div>

                  {/* Right: Button */}
                  <button className="border border-white/40 backdrop-blur-sm hover:bg-white hover:text-black text-white text-xs px-4 py-2 rounded-full transition-all duration-300">
                    View All
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
