"use client";

import Image from "next/image";

export default function LuxuryHeroSection() {
  return (
    <section className="w-full  bg-black flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div className="text-white space-y-5 ">
          {/* Logo */}
          <div>
            <Image
              src="/images/logo-2.png" // 🔥 Replace with your logo path
              alt="Stellar Luxury Vacations"
              width={220}
              height={100}
              className="object-contain"
            />
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-extrabold leading-tight">
            Luxury Awaits with Stellar Luxury Vacations.
          </h1>

          {/* Description */}
          <p className="text-white/70 text-sm leading-relaxed max-w-xl">
            Turn your vacation dreams into reality with Stellar Luxury
            Vacations! Elevate every moment with vacation ownership and unlock a
            world of unforgettable adventures, exceptional stays, and cherished
            memories waiting to be made. Book now and begin your journey to
            unparalleled experiences!
          </p>

          {/* Destinations */}
          <p className="text-white/50 text-sm">
            Dubai, Bali, Singapore, Kashmir, Goa, Jim Corbett etc ...
          </p>
        </div>

        {/* RIGHT VIDEO */}
        <div className="relative w-full h-[300px]  overflow-hidden  shadow-2xl">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/1.mp4" type="video/mp4" />
          </video>

          {/* Optional subtle overlay */}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
      </div>
    </section>
  );
}
