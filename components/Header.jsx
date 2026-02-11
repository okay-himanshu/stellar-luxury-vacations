"use client";

import Image from "next/image";

export default function Header() {
  return (
    <nav
      className="w-full h-20 fixed top-0 left-0 z-50 flex items-center justify-between px-10
                    bg-black/30 backdrop-blur-md border-b border-white/10"
    >
      {/* ── Left Nav ── */}
      <ul className="flex items-center gap-9 list-none m-0 p-0">
        {["Home", "About Us", "Activities", "Travel Desk"].map((item) => (
          <li key={item}>
            <a
              href="#"
              className="text-white text-sm font-medium tracking-wide
                         hover:text-[#c9a84c] transition-colors duration-200"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      {/* ── Center Logo (absolutely centered) ── */}
      <a
        href="#"
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center
                   no-underline group"
      >
        <Image
          src="/images/logo.png"
          alt="Royal Savoy Holidays"
          width={68}
          height={68}
          className="object-contain group-hover:scale-105 transition-transform duration-300"
          priority
        />
      </a>

      {/* ── Right Nav ── */}
      <ul className="flex items-center gap-8 list-none m-0 p-0">
        <li>
          <a
            href="#"
            className="text-white text-sm font-medium tracking-wide
                       hover:text-[#c9a84c] transition-colors duration-200"
          >
            Membership
          </a>
        </li>
        <li>
          <span
            className="flex items-center gap-1 text-white text-sm font-medium tracking-wide
                       hover:text-[#c9a84c] transition-colors duration-200 cursor-pointer"
          >
            Hotel &amp; Resorts <span className="text-[10px]">▾</span>
          </span>
        </li>
        <li>
          <span
            className="flex items-center gap-1 text-white text-sm font-medium tracking-wide
                       hover:text-[#c9a84c] transition-colors duration-200 cursor-pointer"
          >
            Blogs <span className="text-[10px]">▾</span>
          </span>
        </li>
        <li>
          <a
            href="#"
            className="text-white text-sm font-bold tracking-wide
                       hover:text-[#c9a84c] transition-colors duration-200"
          >
            Login
          </a>
        </li>
      </ul>
    </nav>
  );
}
