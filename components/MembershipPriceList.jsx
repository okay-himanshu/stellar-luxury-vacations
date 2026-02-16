"use client";

import { Check, X } from "lucide-react";

const features = [
  { text: "When the resorts are not packed", status: [true, true, true, true] },
  { text: "If you love the Monsoon season", status: [true, true, true, true] },
  { text: "During the work week", status: [true, true, true, false] },
  { text: "During Non-Peak Season", status: [true, true, true, false] },
  { text: "During School / College Vacations", status: [true, true, false, false] },
  { text: "On National Holidays", status: [true, true, false, false] },
  { text: "During Festival", status: [true, true, false, false] },
  { text: "Any time of the year", status: [true, false, false, false] },
  { text: "On Special Days i.e. New Year's Eve", status: [true, false, false, false] },
];

const prices = [
  {
    title: "Package Price\n(30Yrs S1 Standard Room)",
    values: ["Rs: 10.78 Lakhs", "Rs: 9.83 Lakhs", "Rs: 7.45 Lakhs", "Rs: 5.30 Lakhs"],
  },
  {
    title: "Package Price\n(30Yrs S2 Standard Room)",
    values: ["Rs: 12.38 Lakhs", "Rs: 10.89 Lakhs", "Rs: 9.86 Lakhs", "Rs: 7.65 Lakhs"],
  },
];

export default function MembershipPriceList() {
  return (
    <section className="w-full bg-black py-20 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        
        {/* --- HEADING --- */}
        <h2 className="text-white text-3xl md:text-5xl font-bold text-center mb-16">
          Membership Price List
        </h2>

        {/* --- TABLE CONTAINER (Scrollable on mobile) --- */}
        <div className="overflow-x-auto pb-8">
          <div className="min-w-[900px]"> {/* Ensures table doesn't squish on mobile */}
            
            {/* TABLE HEADER */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 border-b border-gray-800 pb-6 mb-6">
              <div className="text-white text-xl font-medium">When do you prefer to holiday</div>
              <div className="text-white text-xl text-center">High-Peak</div>
              <div className="text-white text-xl text-center">Peak</div>
              <div className="text-white text-xl text-center">Mid</div>
              <div className="text-white text-xl text-center">Off</div>
            </div>

            {/* FEATURE ROWS */}
            <div className="space-y-6 mb-8">
              {features.map((item, i) => (
                <div key={i} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 items-center">
                  <div className="text-gray-300 text-base">{item.text}</div>
                  
                  {/* Status Icons Columns */}
                  {item.status.map((isActive, idx) => (
                    <div key={idx} className="flex justify-center">
                      {isActive ? (
                        <Check className="text-[#a3e635] w-8 h-8 font-bold" strokeWidth={4} /> // Neon Green Check
                      ) : (
                        <X className="text-red-500 w-8 h-8 font-bold" strokeWidth={4} /> // Red Cross
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* DIVIDER LINE */}
            <div className="w-full h-px bg-gray-600 mb-8"></div>

            {/* PRICING ROWS */}
            <div className="space-y-8">
              {prices.map((pkg, i) => (
                <div key={i} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 items-center">
                  <div className="text-white text-lg font-medium whitespace-pre-line">
                    {pkg.title}
                  </div>
                  {pkg.values.map((price, idx) => (
                    <div key={idx} className="text-gray-300 text-center text-lg font-medium">
                      {price}
                    </div>
                  ))}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* --- FOOTER NOTES --- */}
        <div className="mt-16 space-y-8 text-left">
          
          {/* Payment */}
          <div>
            <h3 className="text-white text-xl font-bold mb-2">Payment</h3>
            <p className="text-gray-400 text-sm">
              Mode of payment Draft, Cheque or Credit Card in Favor of Royal Savoy Holidays Pvt. Ltd.
            </p>
          </div>

          {/* NOTE */}
          <div>
            <h3 className="text-white text-xl font-bold mb-2">NOTE</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-4xl">
              In addition to the prices mentioned above, the member would have to pay an Annual Subscription Fee every year (irrespective of the usage). The Annual Subscription Fee S2 Apartment Rs. 29,800/- and S1 Apartment Rs. 19,500/-.
            </p>
          </div>

          <p className="text-gray-500 text-xs italic">*Terms and Conditions apply.</p>

        </div>

      </div>
    </section>
  );
}