"use client";

import Image from "next/image";

export default function MembershipBenefits() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-20 relative z-10">
      
      {/* Grid Layout: Left Image | Right Text */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* === LEFT SIDE: IMAGE WITH LOGO === */}
        <div className="relative w-full h-[500px] lg:h-[600px] rounded-lg overflow-hidden border border-gray-800 shadow-2xl group">
           {/* Background Palace Image */}
           <Image 
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=90" 
              alt="Luxury Membership"
              fill
              className="object-cover brightness-50 group-hover:scale-105 transition-transform duration-700"
           />
           
           {/* Logo Overlay (Centered) */}
           <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="relative w-48 h-48 md:w-64 md:h-64 animate-fade-in-up">
                 <Image 
                   src="/images/logo.png" 
                   alt="Royal Savoy Holidays"
                   fill
                   className="object-contain drop-shadow-2xl"
                 />
              </div>
           </div>
        </div>

        {/* === RIGHT SIDE: CONTENT === */}
        <div>
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-8 leading-tight">
            Membership Benefits Of Royal Savoy Holidays
          </h2>

          <div className="space-y-6 text-gray-400 text-sm md:text-base leading-relaxed text-justify">
            <p>
              As a valued member of Royal Savoy Holidays, you gain access to an array of 
              exclusive benefits that enhance your travel experiences. Enjoy priority booking and 
              early access to the most sought-after destinations, ensuring you secure your dream 
              vacation. Our dedicated concierge service is at your disposal, ready to assist with 
              personalized recommendations, reservations, and any travel-related queries.
            </p>

            <p>
              Take advantage of special discounts and upgrades on accommodations, flights, and 
              activities, making your journeys even more luxurious. Additionally, indulge in unique 
              member-only experiences, such as private tours, VIP access to attractions, and 
              curated events, creating cherished memories for you and your loved ones. 
            </p>

            <p>
              With our membership, you are part of a global community of discerning travelers, 
              opening doors to new connections and shared adventures. Embrace the world with Royal 
              Savoy Holidays and unlock a realm of extraordinary privileges and unforgettable moments.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}