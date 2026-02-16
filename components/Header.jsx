"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  // Data for Left Navigation
  const leftNavItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Activities", path: "/activities" },
    { name: "Travel Desk", path: "/travel-desk" },
  ];

  return (
    <nav
      className="w-full h-20 fixed top-0 left-0 z-50 flex items-center justify-between px-10
                    bg-black/30 backdrop-blur-md border-b border-white/10"
    >
      {/* ── Left Nav ── */}
      <ul className="flex items-center gap-9 list-none m-0 p-0">
        {leftNavItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.path}
              className="text-white text-sm font-medium tracking-wide
                         hover:text-[#c9a84c] transition-colors duration-200"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* ── Center Logo (absolutely centered) ── */}
      <Link
        href="/"
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
      </Link>

      {/* ── Right Nav ── */}
      <ul className="flex items-center gap-8 list-none m-0 p-0">
        <li>
          <Link
            href="/membership"
            className="text-white text-sm font-medium tracking-wide
                       hover:text-[#c9a84c] transition-colors duration-200"
          >
            Membership
          </Link>
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
          <Link
            href="/login"
            className="text-white text-sm font-bold tracking-wide
                       hover:text-[#c9a84c] transition-colors duration-200"
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}
