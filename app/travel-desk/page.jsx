"use client";

import Image from "next/image";
import CommonHero from "../../components/CommonHero"; // Ensure path is correct

const travelData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=90", // Airplane
    title: "Turn Your Flights Into Rewards Fast",
    desc: "We Offer Fast Booking, Fantastic Products, and Competitive Pricing & Amazing Experience.",
    subTitle: "Flights Offers",
    subDesc:
      "Collect Miles With Stellar Luxury Vacations And 20+ Partners Flying To 3000 Destinations.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=90", // Bus
    title: "Bus And Volvo",
    desc: "Stellar Luxury Vacations Offers Easy Bus Tickets For UPSRTC Volvo Buses Plying In Several City Routes. You Can Avail The Ongoing Deals And Cash Backs On Bus Reservation.",
    subTitle: "Bus & Volvo Exciting Offers",
    subDesc:
      "On-Time Bookings:- 10 Lakh + Buses | 0 Convention Fees | 24×7 Support Team",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1499353965760-b85389474bef?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Taxi/Cab
    title: "Taxi",
    desc: "Book Our Driver In The City With Stellar Luxury Vacations, We Will Provide Our Clients A Professional Car Driver To Meet Any Travel Need, Be It A Private Party Or A Night On The Town Or A Trip To The Theatre Or Shopping, Sometimes Only The Best Will Do, And For Those Once-In-A Occasions Or Simply To Begin And End The Night Out With A Flourish, Our Clients Can Be Rest Assured That Drive Assist Will Get Them There In VIP Style, Picking Them Up On Time And Dropping Them Safely Home At The End Of The Trip.",
    subTitle: "", // No subtitle for Taxi based on screenshot
    subDesc: "",
  },
];

export default function TravelDesk() {
  return (
    <div className="w-full bg-black min-h-screen">
      {/* 1. REUSABLE HERO SECTION */}
      <CommonHero />

      {/* 2. MAIN CONTENT (Starts below Hero) */}
      <div className="max-w-[1400px] mx-auto px-6 py-20 relative z-10">
        {/* --- HEADER --- */}
        <div className="mb-16">
          <p className="text-gray-400 text-sm mb-2">
            Experience luxury, adventure, and culture like never before.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-800 pb-8">
            <h1 className="text-white text-5xl font-bold uppercase">
              TRAVEL DESK
            </h1>
            <button className="hidden md:block border border-gray-600 text-gray-300 px-8 py-3 rounded-full text-xs hover:bg-white hover:text-black transition-colors uppercase tracking-widest mt-6 md:mt-0">
              CONTACT TRAVEL DESK .
            </button>
          </div>
        </div>

        {/* --- CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {travelData.map((item) => (
            <div key={item.id} className="flex flex-col">
              {/* Image Container */}
              <div className="relative w-full h-[250px] mb-8 overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-white text-2xl font-bold mb-4 leading-tight">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 text-justify">
                  {item.desc}
                </p>

                {/* Sub-Section (Only if exists) */}
                {item.subTitle && (
                  <div className="mt-2">
                    <h4 className="text-white text-xl font-bold mb-2">
                      {item.subTitle}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.subDesc}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Button (Visible only on small screens) */}
        <div className="mt-12 md:hidden">
          <button className="w-full border border-gray-600 text-gray-300 px-8 py-3 rounded-full text-xs hover:bg-white hover:text-black transition-colors uppercase tracking-widest">
            CONTACT TRAVEL DESK .
          </button>
        </div>
      </div>
    </div>
  );
}
