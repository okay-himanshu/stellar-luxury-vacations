"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const activities = [
  {
    id: 1,
    title: "Airbirds",
    image:
      "https://images.unsplash.com/photo-1559628129-67cf63b72248?w=1200&q=90",
  },
  {
    id: 2,
    title: "Wildlife",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=90",
  },
  {
    id: 3,
    title: "Walking",
    image:
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1200&q=90",
  },
  {
    id: 4,
    title: "Cruises",
    image:
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1200&q=90",
  },
  {
    id: 5,
    title: "Hiking",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=90",
  },
  {
    id: 6,
    title: "Camping",
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=90",
  },
  {
    id: 7,
    title: "Kayaking",
    image:
      "https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=1200&q=90",
  },
  {
    id: 8,
    title: "Surfing",
    image:
      "https://images.unsplash.com/photo-1551524358-f34c0214781d?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 9,
    title: "Diving",
    image:
      "https://images.unsplash.com/photo-1682686581030-7fa4ea2b96c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function ArcCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [dragStartX, setDragStartX] = useState(0);
  const totalItems = activities.length;

  // Render 7 items: 5 visible + 1 buffer each side for smooth enter/exit
  const renderCount = 7;

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % totalItems);
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, totalItems]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") goTo("prev");
      if (e.key === "ArrowRight") goTo("next");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Get items with offsets from -3 to +3
  const getVisibleItems = () => {
    const items = [];
    const half = Math.floor(renderCount / 2);
    for (let i = -half; i <= half; i++) {
      const index =
        (((activeIndex + i) % totalItems) + totalItems) % totalItems;
      items.push({
        ...activities[index],
        offset: i,
        uniqueKey: `${index}-${i}`,
      });
    }
    return items;
  };

  const getCardProps = (offset) => {
    const absOffset = Math.abs(offset);
    const xSpacing = 260;
    const x = offset * xSpacing;
    const curveStrength = 15;
    const y = curveStrength * offset * offset;
    const scale = 1 - absOffset * 0.08;
    const rotate = offset * 3;
    const zIndex = renderCount - absOffset;

    // Fade out the buffer cards (offset ±3)
    const opacity = absOffset >= 3 ? 0 : 1;

    return { x, y, scale, rotate, zIndex, opacity };
  };

  const goTo = (dir) => {
    setIsAutoPlaying(false);
    setDirection(dir === "next" ? 1 : -1);
    if (dir === "next") {
      setActiveIndex((prev) => (prev + 1) % totalItems);
    } else {
      setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
    }
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleDragStart = (e) => {
    const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
  };

  const handleDragEnd = (e) => {
    const clientX =
      e.type === "touchend" ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStartX - clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo("next");
      else goTo("prev");
    }
  };

  const visibleItems = getVisibleItems();

  // Entry/exit positions based on direction
  const enterX = direction === 1 ? 260 * 4 : -260 * 4;
  const exitX = direction === 1 ? -260 * 4 : 260 * 4;

  return (
    <section className="min-h-screen w-full bg-black flex flex-col justify-center py-20 relative overflow-hidden select-none">
      {/* Header */}
      <div className="text-center mb-24 z-10 relative">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white/60 tracking-[4px] uppercase text-xs sm:text-sm mb-4"
        >
          Wonderful Place For You
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white font-extrabold text-4xl sm:text-[60px] tracking-tight"
        >
          EXPERIENCE THE WORLD
        </motion.h2>
      </div>

      {/* Arc Carousel */}
      <div
        className="relative w-full flex justify-center"
        style={{ height: "480px" }}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        <div className="relative w-full h-full flex items-start justify-center">
          <AnimatePresence initial={false} mode="popLayout">
            {visibleItems.map((item) => {
              const { x, y, scale, rotate, zIndex, opacity } = getCardProps(
                item.offset,
              );
              const isActive = item.offset === 0;

              return (
                <motion.div
                  key={item.id}
                  className="absolute cursor-pointer"
                  style={{ zIndex, width: "240px", height: "340px" }}
                  // Animate to arc position
                  animate={{
                    x,
                    y,
                    scale,
                    rotate,
                    opacity,
                  }}
                  // Enter from the far side (based on direction)
                  initial={{
                    x: enterX,
                    y: curveY(enterX / 260),
                    scale: 0.7,
                    rotate: direction * 10,
                    opacity: 0,
                  }}
                  // Exit to the opposite far side
                  exit={{
                    x: exitX,
                    y: curveY(exitX / 260),
                    scale: 0.7,
                    rotate: -direction * 10,
                    opacity: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 22,
                    mass: 0.9,
                  }}
                  onClick={() => {
                    if (!isActive) {
                      const targetIdx = activities.findIndex(
                        (a) => a.id === item.id,
                      );
                      const diff = targetIdx - activeIndex;
                      setDirection(diff > 0 ? 1 : -1);
                      setIsAutoPlaying(false);
                      setActiveIndex(targetIdx);
                      setTimeout(() => setIsAutoPlaying(true), 5000);
                    }
                  }}
                  whileHover={!isActive ? { scale: scale + 0.03 } : {}}
                >
                  <motion.div
                    className="relative w-full h-full rounded-[24px] overflow-hidden"
                    animate={{
                      boxShadow: isActive
                        ? "0 25px 50px -12px rgba(201, 168, 76, 0.35), 0 15px 30px -8px rgba(0, 0, 0, 0.5)"
                        : "0 15px 35px -8px rgba(0, 0, 0, 0.4)",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="240px"
                      draggable={false}
                    />

                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background: isActive
                          ? "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)"
                          : "linear-gradient(to top, rgba(0,0,0,0.1) 0%, transparent 40%)",
                      }}
                      transition={{ duration: 0.4 }}
                    />

                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-5 text-center"
                      animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : 15,
                      }}
                      transition={{ duration: 0.3, delay: isActive ? 0.15 : 0 }}
                    >
                      <h3 className="text-white text-xl font-bold tracking-wide">
                        {item.title}
                      </h3>
                      <p className="text-[#c9a84c] text-xs mt-1.5 font-medium tracking-widest uppercase">
                        See More →
                      </p>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="absolute -inset-[3px] rounded-[27px] border-2 border-[#c9a84c] pointer-events-none"
                    animate={{
                      opacity: isActive ? 0.6 : 0,
                      scale: isActive ? 1 : 0.95,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center items-center gap-8 mt-8 z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => goTo("prev")}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-[#c9a84c] hover:bg-[#c9a84c]/10 transition-colors duration-300"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </motion.button>

        <div className="flex gap-2">
          {activities.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                const diff = index - activeIndex;
                setDirection(diff > 0 ? 1 : -1);
                setIsAutoPlaying(false);
                setActiveIndex(index);
                setTimeout(() => setIsAutoPlaying(true), 5000);
              }}
              className="rounded-full"
              animate={{
                width: index === activeIndex ? 32 : 12,
                height: 12,
                backgroundColor:
                  index === activeIndex ? "#c9a84c" : "rgba(255,255,255,0.3)",
              }}
              whileHover={{
                backgroundColor:
                  index === activeIndex ? "#c9a84c" : "rgba(255,255,255,0.5)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => goTo("next")}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-[#c9a84c] hover:bg-[#c9a84c]/10 transition-colors duration-300"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </motion.button>
      </div>
    </section>
  );
}

// Helper: calculate Y on arc for any offset position
function curveY(offset) {
  return 15 * offset * offset;
}
