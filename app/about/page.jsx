"use client";

import Image from "next/image";
import { Ticket, LifeBuoy, Compass } from "lucide-react";
import TravelAssociates from "../../components/TravelAssociates";
import Testimonials from "../../components/Testimonials";

export default function AboutUs() {
  return (
    <div className="w-full bg-black min-h-screen overflow-hidden">
      <div className="relative w-full h-[50vh] md:h-[60vh]">
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=90"
          alt="Royal Palace Interior"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 relative">
        <div className="absolute top-0 left-4 md:left-[-40px] transform -rotate-12 animate-float-slow hidden md:block z-10">
          <div className="bg-[#1e293b] p-3 rounded-lg border-2 border-white/20 shadow-xl">
            <Ticket size={40} className="text-blue-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative h-[500px] w-full">
            <div className="absolute top-0 left-0 w-[55%] h-[65%] rounded-[30px] overflow-hidden border-[6px] border-black z-10 shadow-2xl hover:scale-105 transition-transform duration-500">
              <Image
                src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=90"
                alt="Lake View"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-[20%] right-0 w-[50%] h-[45%] rounded-[30px] overflow-hidden border-[6px] border-black z-20 shadow-2xl hover:scale-105 transition-transform duration-500">
              <Image
                src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=600&q=90"
                alt="Friends Trip"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-[5%] w-[65%] h-[35%] rounded-[30px] overflow-hidden border-[6px] border-black z-30 shadow-2xl hover:scale-105 transition-transform duration-500">
              <Image
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=90"
                alt="Coastal View"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="relative">
            <h2 className="text-white text-3xl md:text-5xl font-bold mb-8 leading-tight">
              Welcome to Royal Savoy Holidays,
            </h2>

            <div className="space-y-6 text-gray-400 text-sm md:text-base leading-relaxed text-justify">
              <p>
                At <strong className="text-white">Royal Savoy Holidays</strong>{" "}
                (A unit of SAVOY INN AND SUITES PRIVATE LIMITED) we redefine
                hospitality by delivering world-class experiences both in India
                and internationally. As a premier name in the travel and
                hospitality industry, we pride ourselves on being the best
                holiday provider.
              </p>
              <p>
                Guided by the philosophy that &quot;Customer is God,&quot; we
                place our guests at the heart of everything we do. From opulent
                accommodations to bespoke travel experiences, every detail is
                crafted to exceed expectations.
              </p>
              <p>
                Our mission is simple: to provide our guests with the best
                holiday experiences, blending comfort, sophistication, and
                world-class service. Whether you&apos;re traveling for leisure,
                celebrating life&apos;s milestones, or seeking a tranquil
                escape, Royal Savoy Holidays is your perfect destination.
              </p>
            </div>

            <div className="absolute bottom-[-60px] right-0 animate-bounce-slow hidden md:block">
              <svg width="60" height="40" viewBox="0 0 100 60" fill="none">
                <path d="M10,40 Q50,-10 90,40" fill="#fb923c" />
                <ellipse cx="50" cy="40" rx="45" ry="10" fill="#fb923c" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
          <div className="absolute -bottom-10 -left-10 animate-spin-slow hidden md:block">
            <div className="bg-[#1e293b] p-3 rounded-full border-2 border-white/20 shadow-xl">
              <LifeBuoy size={40} className="text-red-500" />
            </div>
          </div>

          <div>
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-6">
              Why Choose Us
            </h2>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
              At Royal Savoy Holidays, we believe that every journey should be
              exceptional. Our team of passionate travel experts is at your
              service 24/7, ready to assist with every detail of your trip to
              make it as smooth and enjoyable as possible.
            </p>

            <h3 className="text-white font-bold text-lg mb-3">
              Exclusive Value:
            </h3>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Take advantage of our carefully curated holiday deals, exclusive
              discounts, and exciting offers on accommodations, activities, and
              more. With strong ties to leading hotels, airlines, and tour
              operators, we ensure you enjoy premium experiences without
              stretching your budget.
            </p>
          </div>

          <div className="relative w-full h-[500px]">
            <div className="relative w-full h-full rounded-none md:rounded-lg overflow-hidden border border-gray-800 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=90"
                alt="Luxury Interior"
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/40"></div>

              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center w-40 h-40">
                <Image
                  src="/images/logo.png"
                  alt="Royal Savoy Logo"
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 animate-pulse hidden md:block">
              <div className="bg-[#1e293b] p-3 rounded-full border-2 border-white/20 shadow-xl">
                <Compass size={40} className="text-blue-500 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <TravelAssociates shoudlShowVideos={false} />
      <Testimonials />
    </div>
  );
}
