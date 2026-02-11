"use client";

import Image from "next/image";
import { Diamond, Gem } from "lucide-react"; // Ensure you have lucide-react installed

const features = [
  {
    title: "Gift",
    desc: "You can gift your nights to friends and family.",
  },
  {
    title: "Split",
    desc: "You can Split your week can save your unused nights",
  },
  {
    title: "Save",
    desc: "You can save your unused nights and spend your nights, With your loved ones",
  },
  {
    title: "Transfer",
    desc: "You can transfer your package to your nominee or a new guest as you may choose.",
  },
  {
    title: "Advance",
    desc: "You can advance your nights can spend your nights, With your loved ones",
  },
  {
    title: "Air Tickets Discount",
    desc: "Save big on air tickets with our exclusive discounts!",
  },
  {
    title: "Local sightseeing",
    desc: "Explore local wonders with our curated sightseeing tours with pickup and drop service.",
  },
  {
    title: "Family Camp Fire",
    desc: "Create lasting memories with our family campfire experiences.",
  },
  {
    title: "Food Discount",
    desc: "Delight in delicious meals with special food discounts.",
  },
  {
    title: "Banquet hall",
    desc: "Host memorable events in our elegant banquet hall.",
  },
];

export default function TravelFeatures() {
  return (
    <section className="w-full bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* --- HEADER SECTION --- */}
        <div className="text-center mb-16 max-w-4xl">
          {/* Logo Placeholder - Replace src with your actual logo path */}
          <div className="relative w-40 h-20 mx-auto mb-6">
            {/* Agar logo transparent PNG hai toh yahan lagana */}
            {/* <Image src="/path-to-your-logo.png" alt="Royal Savoy Logo" fill className="object-contain" /> */}

            {/* Filhal ke liye main text/icon dikha raha hu taaki khali na lage */}
            <div className="flex flex-col items-center justify-center h-full text-[#c9a84c]">
              <span className="text-5xl">♛</span>
              <span className="text-xs uppercase tracking-widest mt-1">
                Royal Savoy Holidays
              </span>
            </div>
          </div>

          <h2 className="text-white text-3xl md:text-5xl font-bold mb-6">
            Travel in style with Royal Savoy Holidays.
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            At Royal Savoy Holidays, the Royalsavoyholidays redefines travel
            experiences, offering a unique gateway into the enchanting world of
            the international Royalsavoyholidays. With an array of exceptional
            value-added benefits, we&apos;re confident you&apos;ll fall in love
            with the difference we bring to every journey.
          </p>
        </div>

        {/* --- FEATURES GRID --- */}
        {/* Using Flex wrap with center alignment to handle the last row of 2 items perfectly */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 w-full">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center w-full sm:w-[45%] lg:w-[22%]"
            >
              {/* Diamond Icon */}
              <div className="mb-4">
                <Gem strokeWidth={1} className="w-12 h-12 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-white font-bold text-lg mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed max-w-[250px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
