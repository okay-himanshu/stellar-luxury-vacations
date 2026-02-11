"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const slides = [
  {
    subtitle: "Get unforgetable pleasure with us",
    title: ["Explore beauty of", "the whole world"],
    bgLeft:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1400&q=80",
    bgRight:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
  },
  {
    subtitle: "Luxury stays at breathtaking destinations",
    title: ["Discover hidden", "paradises"],
    bgLeft:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1400&q=80",
    bgRight:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
  },
  {
    subtitle: "Your journey begins with a single step",
    title: ["Travel beyond", "your imagination"],
    bgLeft:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1400&q=80",
    bgRight:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=80",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section
      className="relative w-full overflow-hidden pt-20"
      style={{ height: "100vh", minHeight: "600px" }}
    >
      {/* ── Left BG: animates per slide ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`left-bg-${current}`}
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: `url('${slide.bgLeft}')` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* ── Right BG: animates per slide (diagonal clip) ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`right-bg-${current}`}
          className="absolute top-0 right-0 h-full bg-cover bg-center z-10"
          style={{
            width: "58%",
            backgroundImage: `url('${slide.bgRight}')`,
            clipPath: "polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-black/45" />
        </motion.div>
      </AnimatePresence>

      {/* ── Right Panel: Logo (same diagonal clip, always visible) ── */}
      <div
        className="absolute top-0 right-0 h-full z-20 flex items-center justify-center"
        style={{
          width: "58%",
          clipPath: "polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)",
          paddingLeft: "13%",
        }}
      >
        <div className="flex flex-col items-center text-center">
          <Image
            src="/images/logo.png"
            alt="Royal Savoy Holidays"
            width={160}
            height={160}
            className="object-contain"
            priority
          />
          <span
            className="text-[#c9a84c] text-[26px] font-bold tracking-[2px] leading-snug mt-3"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Royal Savoy Holidays
          </span>
          <span className="text-[#cccccc] text-[9px] tracking-[3px] uppercase mt-1.5">
            Open your wings, discover the world
          </span>
        </div>
      </div>

      {/* ── Vertical Divider Lines ── */}
      <div className="absolute right-14 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
        <span className="block w-0.5 h-10 bg-white/50" />
        <span className="block w-0.5 h-10 bg-white/50" />
      </div>

      {/* ── Left Text Content ── */}
      <div
        className="absolute left-0 top-0 h-full z-30 flex flex-col justify-center pl-16"
        style={{ width: "48%" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${current}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="text-white/90 text-[15px] font-normal tracking-wide mb-4"
            >
              {slide.subtitle}
            </motion.p>

            {/* Title lines */}
            {slide.title.map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.18 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-white font-extrabold leading-[1.05] block"
                style={{ fontSize: "clamp(42px, 5.2vw, 72px)" }}
              >
                {line}
              </motion.span>
            ))}

            {/* Explore Button */}
            <motion.a
              href="#"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42, ease: "easeOut" }}
              className="mt-10 inline-flex items-center justify-center w-44 h-[52px]
                         bg-[#111111] text-white text-[15px] font-semibold tracking-wide
                         rounded-full hover:bg-[#2a2a2a] hover:scale-105
                         transition-all duration-200"
            >
              Explore
            </motion.a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
