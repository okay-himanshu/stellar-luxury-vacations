"use client";

import { useState, useEffect } from "react";
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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress((scrollTop / docHeight) * 100);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const instaImages = [
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=150&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&q=80",
    "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=150&q=80",
    "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=150&q=80",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=150&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=150&q=80",
  ];

  const quickLinks = [
    "Privacy",
    "Terms",
    "Refund",
    "Disclaimer",
    // "News Release",
    // "Client Login",
    // "Staff Login",
    // "Paynow",
  ];

  return (
    <footer className="w-full bg-black pt-20 pb-8 px-4 md:px-8 border-t border-gray-900">
      <div className="max-w-[1400px] mx-auto">
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

        <div className="w-full h-[1px] bg-gray-800 mb-16"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col items-start">
            <div className="mb-6 relative w-[150px] h-[100px]">
              <Image
                src="/images/logo.png"
                alt="logo"
                fill
                className="object-contain object-left"
              />
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Choose{" "}
              <strong className="text-white">Stellar Luxury Vacations</strong>{" "}
              for luxury, service, and experiences that are nothing short of
              extraordinary.
            </p>

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

          <div>
            <h3 className="text-white text-xl font-bold mb-8">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={`/${link.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                    className="flex items-center gap-2 text-gray-400 hover:text-[#c9a84c] transition-colors text-sm"
                  >
                    <ChevronRight size={16} className="text-gray-600" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-xl font-bold mb-8">Address</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Phone className="text-orange-600 mt-1" size={20} />
                <a href="tel:+911169313958" className="text-gray-400 text-sm">
                  +91 1169313958
                </a>{" "}
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-green-600 mt-1" size={20} />
                <div className="flex flex-col text-gray-400 text-sm">
                  <span>
                    <a href="mailto:info@stellarluxuryvacations.com">
                      info@stellarluxuryvacations.com
                    </a>
                  </span>

                  <span>
                    <a href="mailto:reservations@stellarluxuryvacations.com">
                      reservations@stellarluxuryvacations.com
                    </a>
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="text-teal-500 mt-1" size={30} />
                <p className="text-gray-400 text-sm">
                  OFFICE NO. 618C ON SIXTH PLOOR, PLOT NO. 6,JAINA TOWER-2,
                  JANAK PURI, NEW DELHI-110058
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white text-xl font-bold mb-8">
              Instagram Post
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {instaImages.map((src, i) => (
                <div
                  key={i}
                  className="relative w-full aspect-square rounded-md overflow-hidden cursor-pointer group"
                >
                  <Image
                    src={src}
                    alt="Instagram"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-white/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <Instagram
                      className="text-[#c9a84c] drop-shadow-md"
                      size={24}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-900 gap-6">
          <p className="text-gray-500 text-xs text-center md:text-left">
            Copyright { new Date().getFullYear() } Stellar Luxury Vacations.
            All Rights Reserved.
          </p>

          {/* <div className="flex items-center gap-4">
            <span className="text-white text-sm">We Accept</span>
            <div className="flex gap-2">
              <PaymentIcon
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                alt="Mastercard"
              />
              <PaymentIcon
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Visa_Inc._logo_%282005%E2%80%932014%29.svg/1920px-Visa_Inc._logo_%282005%E2%80%932014%29.svg.png?20170118154621"
                alt="Visa"
              />
              <PaymentIcon
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                alt="Paypal"
              />
              <PaymentIcon
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/3840px-Apple_Pay_logo.svg.png"
                alt="Apple Pay"
                invert
              />
            </div>
          </div> */}
        </div>

        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 flex items-center justify-center hover:scale-110 transition-transform group"
          aria-label="Scroll to top"
        >
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-lg"
            viewBox="0 0 36 36"
          >
            <path
              className="text-gray-800"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-[#c9a84c] transition-all duration-300 ease-out"
              strokeWidth="2.5"
              strokeDasharray="100, 100"
              strokeDashoffset={100 - scrollProgress}
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute bg-[#F5E6CA] w-10 h-10 rounded-full flex items-center justify-center shadow-inner group-hover:bg-[#c9a84c] transition-colors duration-300">
            <ArrowUp
              className="text-[#c9a84c] group-hover:text-white font-bold transition-colors duration-300"
              size={20}
            />
          </div>
        </button>
      </div>
    </footer>
  );
}

function PaymentIcon({ src, alt, invert = false }) {
  return (
    <div className="bg-white h-8 w-12 rounded flex items-center justify-center p-1">
      <img
        src={src}
        alt={alt}
        className={`max-h-full max-w-full object-contain ${invert ? "invert" : ""}`}
      />
    </div>
  );
}
