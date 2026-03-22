"use client";

import Image from "next/image";
import { Ticket, LifeBuoy, Compass } from "lucide-react";
import TravelAssociates from "../../components/TravelAssociates";
import Testimonials from "../../components/Testimonials";

export default function AboutUs() {
  return (
    <div className="w-full bg-black min-h-screen overflow-hidden font-sans">
      {/* --- HERO IMAGE SECTION --- */}
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
        {/* Floating Icon 1 */}
        <div className="absolute top-0 left-4 md:left-[-40px] transform -rotate-12 animate-float-slow hidden md:block z-10">
          <div className="bg-[#1e293b] p-3 rounded-lg border-2 border-[#c9a84c]/30 shadow-xl">
            <Ticket size={40} className="text-[#c9a84c]" />
          </div>
        </div>

        {/* --- SECTION 1: ABOUT US --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          {/* Image Collage */}
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

          {/* About Content */}
          <div className="relative">
            <h2 className="text-white text-3xl md:text-5xl font-bold mb-4 leading-tight">
              About Us
            </h2>
            <h3 className="text-xl md:text-2xl text-[#c9a84c] font-medium mb-1">
              Stellar Luxury Vacations
            </h3>
            <p className="text-gray-500 text-sm italic mb-8">
              (A Brand of Stellarinn Vacation Club and Hospitality Pvt. Ltd.)
            </p>

            <div className="space-y-5 text-gray-300 text-[15px] md:text-base leading-relaxed text-justify">
              <p>
                <strong className="text-white">
                  Stellar Luxury Vacations (SLV)
                </strong>{" "}
                is a modern vacation ownership and holiday membership company
                committed to providing families with memorable travel
                experiences across premium destinations in India and abroad. Our
                goal is to make luxury vacations structured, reliable, and
                accessible for families who value comfort, quality, and
                long-term holiday planning.
              </p>
              <p>
                Built on a foundation of hospitality expertise and professional
                service standards, SLV focuses on delivering well-organized
                vacation solutions through trusted resort and hotel
                partnerships. Our vacation ownership model is designed to give
                members the flexibility to enjoy holidays every year while
                benefiting from carefully selected properties and destinations.
              </p>
              <p>
                At Stellar Luxury Vacations, we believe that holidays are more
                than just trips — they are moments that bring families together,
                create lifelong memories, and strengthen relationships. That is
                why we focus on providing transparent policies, dependable
                service, and a customer-first approach in everything we do.
              </p>
              <p>
                With a dedicated support team and an expanding network of
                partner resorts, SLV continues to grow as a trusted name in
                vacation membership services. Our mission is simple: to make
                every holiday comfortable, memorable, and truly enjoyable for
                our members.
              </p>
              <p className="text-[#c9a84c] font-semibold text-lg italic text-center pt-4">
                "Stellar Luxury Vacations — Where Trust Meets True Ownership"
              </p>
            </div>

            {/* Abstract Graphic */}
            <div className="absolute bottom-[-60px] right-0 animate-bounce-slow hidden md:block">
              <svg width="60" height="40" viewBox="0 0 100 60" fill="none">
                <path d="M10,40 Q50,-10 90,40" fill="#c9a84c" />
                <ellipse cx="50" cy="40" rx="45" ry="10" fill="#c9a84c" />
              </svg>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: WHY CHOOSE US --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative mt-20">
          {/* Floating Icon 2 */}
          <div className="absolute -bottom-10 -left-10 animate-spin-slow hidden md:block z-10">
            <div className="bg-[#1e293b] p-3 rounded-full border-2 border-[#c9a84c]/30 shadow-xl">
              <LifeBuoy size={40} className="text-[#c9a84c]" />
            </div>
          </div>

          {/* Why Choose Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-6">
              Why Choose Stellar Luxury Vacations
            </h2>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8">
              At Stellar Luxury Vacations, we believe that a holiday should be
              comfortable, memorable, and completely stress-free. Our vacation
              ownership model is designed to give families the freedom to
              travel, explore new destinations, and create lifelong memories
              with confidence and convenience.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-[#c9a84c] font-bold text-lg mb-2 flex items-center gap-2">
                  <span>1.</span> Trusted Vacation Ownership Concept
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed pl-5">
                  Our structured vacation ownership model allows members to
                  enjoy planned holidays every year while benefiting from
                  long-term travel value and organized holiday planning.
                </p>
              </div>

              <div>
                <h3 className="text-[#c9a84c] font-bold text-lg mb-2 flex items-center gap-2">
                  <span>2.</span> Premium Resort & Hotel Access
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed pl-5">
                  Members get access to carefully selected partner resorts and
                  hotels across popular destinations in India and selected
                  international locations, ensuring quality, comfort, and
                  reliable hospitality.
                </p>
              </div>

              <div>
                <h3 className="text-[#c9a84c] font-bold text-lg mb-2 flex items-center gap-2">
                  <span>3.</span> Flexible Holiday Planning
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed pl-5">
                  We understand that every family has different travel
                  preferences. Our system is designed to offer flexibility in
                  choosing destinations, travel dates, and resort options based
                  on availability.
                </p>
              </div>

              <div>
                <h3 className="text-[#c9a84c] font-bold text-lg mb-2 flex items-center gap-2">
                  <span>4.</span> Transparent Policies
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed pl-5">
                  We believe trust comes from clarity. Our booking, refund, and
                  membership policies are clearly defined to ensure members feel
                  secure and confident while planning their vacations.
                </p>
              </div>

              <div>
                <h3 className="text-[#c9a84c] font-bold text-lg mb-2 flex items-center gap-2">
                  <span>5.</span> Dedicated Member Support
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed pl-5">
                  Our professional support team assists members throughout their
                  travel journey — from holiday planning and booking assistance
                  to ensuring a smooth vacation experience.
                </p>
              </div>

              <div>
                <h3 className="text-[#c9a84c] font-bold text-lg mb-2 flex items-center gap-2">
                  <span>6.</span> Designed for Indian Families
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed pl-5">
                  Our vacation plans are thoughtfully structured to match the
                  travel preferences and holiday patterns of Indian families,
                  making vacations easier, organized, and enjoyable.
                </p>
              </div>
            </div>

            <div className="mt-10 p-6 bg-[#111] rounded-xl border border-gray-800 border-l-4 border-l-[#c9a84c]">
              <h3 className="text-white font-bold text-xl mb-3">Our Promise</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                At Stellar Luxury Vacations, we don’t just offer holiday plans —
                we create opportunities for families to travel, relax, and
                celebrate life together.
              </p>
            </div>
          </div>

          {/* Large Image Right Side */}
          <div className="relative w-full h-[500px] lg:h-[700px] order-1 lg:order-2">
            <div className="relative w-full h-full rounded-none md:rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=90"
                alt="Luxury Interior"
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/40"></div>

              {/* Replace with your logo if needed */}
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center w-40 h-40">
                <Image
                  src="/images/logo.png"
                  alt="Stellar Luxury Vacations Logo"
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
            </div>

            {/* Floating Icon 3 */}
            <div className="absolute -bottom-6 -right-6 animate-pulse hidden md:block">
              <div className="bg-[#1e293b] p-3 rounded-full border-2 border-[#c9a84c]/30 shadow-xl">
                <Compass size={40} className="text-[#c9a84c] fill-current" />
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
