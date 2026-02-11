"use client";

import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  ArrowUp,
} from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Instagram Placeholder Images
  const instaImages = [
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=150&q=80", // Paris
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&q=80", // Beach
    "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=150&q=80", // Venice
    "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=150&q=80", // Travel
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=150&q=80", // Switzerland
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=150&q=80", // Resort
  ];

  const quickLinks = [
    "Privacy",
    "Terms & Conditions",
    "Refund",
    "Disclaimer",
    "News Release",
    "Client Login",
    "Staff Login",
    "Paynow",
  ];

  return (
    <footer className="w-full bg-black pt-20 pb-8 px-4 md:px-8 border-t border-gray-900">
      <div className="max-w-[1400px] mx-auto">
        {/* --- NEWSLETTER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">
              Get Updated The Latest <br /> Newsletter
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter Email"
              className="bg-white text-black px-6 py-4 rounded-full w-full sm:w-[300px] outline-none focus:ring-2 focus:ring-[#c9a84c]"
            />
            <button className="bg-[#184e55] hover:bg-[#133d42] text-white px-8 py-4 rounded-full font-medium transition-colors uppercase tracking-wide text-sm whitespace-nowrap">
              Subscribe Now
            </button>
          </div>
        </div>

        {/* --- DIVIDER LINE --- */}
        <div className="w-full h-[1px] bg-gray-800 mb-16"></div>

        {/* --- MAIN GRID CONTENT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* COLUMN 1: Brand Info */}
          <div className="flex flex-col items-start">
            {/* Logo Placeholder */}
            <Image
              src={"/images/logo.png"}
              alt="logo"
              width={150}
              height={50}
            />

            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Choose{" "}
              <strong className="text-white">Royal Savoy Holidays</strong> for
              luxury, service, and experiences that are nothing short of
              extraordinary.
            </p>

            {/* Social Icons (Gold Color) */}
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram, Youtube].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-[#c9a84c] hover:text-white transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                ),
              )}
            </div>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div>
            <h3 className="text-white text-xl font-bold mb-8">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-gray-400 hover:text-[#c9a84c] transition-colors text-sm"
                  >
                    <ChevronRight size={16} className="text-gray-600" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Address */}
          <div>
            <h3 className="text-white text-xl font-bold mb-8">Address</h3>
            <div className="space-y-6">
              {/* Phone - Orange Icon */}
              <div className="flex items-start gap-4">
                <Phone className="text-orange-600 mt-1" size={20} />
                <span className="text-gray-400 text-sm">01204566747</span>
              </div>

              {/* Email - Green Icon */}
              <div className="flex items-start gap-4">
                <Mail className="text-green-600 mt-1" size={20} />
                <div className="flex flex-col text-gray-400 text-sm">
                  <span>info@royalsavoyholidays.com</span>
                  <span>support@royalsavoyholidays.com</span>
                </div>
              </div>

              {/* Address - Teal Icon */}
              <div className="flex items-start gap-4">
                <MapPin className="text-teal-500 mt-1" size={20} />
                <p className="text-gray-400 text-sm">
                  C-277 Second Floor <br />
                  Sector 63, UP 201301
                </p>
              </div>
            </div>
          </div>

          {/* COLUMN 4: Instagram Post */}
          <div>
            <h3 className="text-white text-xl font-bold mb-8">
              Instagram Post
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {instaImages.map((src, i) => (
                <div
                  key={i}
                  className="relative w-full aspect-square rounded-md overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={src}
                    alt="Instagram"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-900 gap-6">
          <p className="text-gray-500 text-xs text-center md:text-left">
            Copyright 2024 Royal Savoy Holidays. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-white text-sm">We Accept</span>
            {/* Payment Icons Row */}
            <div className="flex gap-2">
              <PaymentIcon
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                alt="Mastercard"
              />
              <PaymentIcon
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                alt="Visa"
              />
              <PaymentIcon
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                alt="Paypal"
              />
              <PaymentIcon
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="Apple Pay"
                invert
              />
            </div>
          </div>
        </div>

        {/* --- SCROLL TOP BUTTON --- */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-[#F5E6CA] w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          <ArrowUp className="text-[#c9a84c] font-bold" size={20} />
        </button>
      </div>
    </footer>
  );
}

// Helper Component for Payment Icons
function PaymentIcon({ src, alt, invert = false }) {
  return (
    <div className="bg-white h-8 w-12 rounded flex items-center justify-center p-1">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`max-h-full max-w-full object-contain ${invert ? "invert" : ""}`}
      />
    </div>
  );
}
