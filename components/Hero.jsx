"use client";

import { motion } from "framer-motion";
import { MoveDownRight, MoveUp, MoveUpRight, Play } from "lucide-react";

export default function Hero() {
  // Stagger animation variants for text reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const textRevealVariants = {
    hidden: { y: "120%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }, // Ultra smooth cubic bezier
    },
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-black flex items-center justify-center">
      {/* ── 1. CINEMATIC SLOW ZOOM BACKGROUND VIDEO ── */}
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <video
          src="/videos/3.mp4" /* Tumhara video path */
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* ── 2. VIGNETTE & MOVIE-STYLE GRADIENT OVERLAY ── */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-black/90" />

      {/* ── 3. EDITORIAL VERTICAL ACCENTS (Left & Right) ── */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-12">
        <span className="text-[10px] text-white/50 tracking-[0.3em] -rotate-90 uppercase font-medium whitespace-nowrap">
          Est. 2026
        </span>
        <div className="w-[1px] h-24 bg-white/20" />
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-12">
        <div className="w-[1px] h-24 bg-white/20" />
        <span className="text-[10px] text-white/50 tracking-[0.3em] -rotate-90 uppercase font-medium whitespace-nowrap">
          Worldwide
        </span>
      </div>

      {/* ── 4. MAIN LUXURY CONTENT ── */}
      <div className="relative z-20 flex flex-col items-center text-center w-full px-6 mt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Overline with golden dot */}
          <div className="overflow-hidden mb-6">
            <motion.div
              variants={textRevealVariants}
              className="flex items-center gap-4"
            >
              <span className="w-8 h-[1px] bg-[#c9a84c]" />
              <p className="text-[#c9a84c] text-[10px] md:text-xs font-semibold tracking-[0.4em] uppercase">
                Stellar Luxury Vacations
              </p>
              <span className="w-8 h-[1px] bg-[#c9a84c]" />
            </motion.div>
          </div>

          {/* Huge Masked Title */}
          <div className="overflow-hidden">
            <motion.h1
              variants={textRevealVariants}
              className="text-5xl md:text-7xl lg:text-[100px] text-white font-bold tracking-tighter leading-[0.9]"
            >
              ESCAPE THE
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8 md:mb-12 py-2">
            <motion.h1
              variants={textRevealVariants}
              className="text-5xl md:text-7xl lg:text-[100px] text-white font-light italic font-serif leading-[0.9] text-white/90"
            >
              Ordinary
            </motion.h1>
          </div>

          {/* Description */}
          <div className="overflow-hidden mb-12">
            <motion.p
              variants={textRevealVariants}
              className="text-white text-sm md:text-base max-w-lg mx-auto font-light leading-relaxed tracking-wide"
            >
              We craft bespoke journeys for the discerning traveler. Uncover the
              world’s most pristine destinations with unparalleled elegance and
              world-class hospitality.
            </motion.p>
          </div>

          {/* Interactive Luxury Button */}
          <motion.div
            variants={textRevealVariants}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <a
              href="/india"
              className="group relative px-8 py-4 flex items-center gap-3 overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-full hover:border-[#c9a84c] transition-all duration-500"
            >
              {/* Button Hover Fill Effect */}
              <span className="absolute inset-0 bg-[#c9a84c] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />

              <span className="relative z-10 text-xs font-medium tracking-[0.2em] uppercase group-hover:text-black transition-colors duration-500">
                Discover More
              </span>
              <MoveUpRight
                size={14}
                className="relative z-10 group-hover:text-black transition-colors duration-500"
              />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── 5. BOTTOM GLASS WIDGET & SCROLL INDICATOR ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-0 left-0 w-full px-8 pb-8 flex justify-between items-end z-30"
      >
        {/* Left Widget */}
        <div className="hidden md:flex flex-col gap-1 backdrop-blur-md bg-black/20 p-4 border border-white/10 rounded-lg">
          <span className="text-[#c9a84c] text-[10px] uppercase tracking-widest font-bold">
            Concierge
          </span>
          <span className="text-white text-xs font-light tracking-wide">
            Available 24/7 for Members
          </span>
        </div>

        {/* Scroll Line */}
        <div className="flex flex-col items-center gap-4 absolute left-1/2 -translate-x-1/2 bottom-8">
          <span className="text-[9px] text-white/50 uppercase tracking-[0.3em]">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
            <div className="w-full h-1/2 bg-[#c9a84c] animate-slide-down absolute top-0" />
          </div>
        </div>
      </motion.div>

      {/* Global Style for the scroll line animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes slide-down {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(200%); }
          100% { transform: translateY(200%); }
        }
        .animate-slide-down {
          animation: slide-down 2s cubic-bezier(0.7, 0, 0.3, 1) infinite;
        }
      `,
        }}
      />
    </section>
  );
}
