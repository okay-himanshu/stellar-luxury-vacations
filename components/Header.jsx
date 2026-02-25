"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { useAuth } from "../context/auth-context";

export default function Header() {
  const { user, loading, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const leftNavItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Activities", path: "/activities" },
    { name: "Travel Desk", path: "/travel-desk" },
  ];

  const linkStyle =
    "text-white text-sm font-medium tracking-wide hover:text-[#c9a84c] transition-colors duration-200";

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full h-20 fixed top-0 left-0 z-50 flex items-center justify-between px-10 bg-black/30 backdrop-blur-md border-b border-white/10">
      <ul className="flex items-center gap-9 list-none m-0 p-0">
        {leftNavItems.map((item) => (
          <li key={item.name}>
            <Link href={item.path} className={linkStyle}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/"
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center no-underline group"
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

      <ul className="flex items-center gap-8 list-none m-0 p-0">
        <li>
          <Link href="/membership" className={linkStyle}>
            Membership
          </Link>
        </li>
        <li>
          <span
            className={`flex items-center gap-1 ${linkStyle} cursor-pointer`}
          >
            Hotel &amp; Resorts <span className="text-[10px]">▾</span>
          </span>
        </li>
        <li>
          <span
            className={`flex items-center gap-1 ${linkStyle} cursor-pointer`}
          >
            Blogs <span className="text-[10px]">▾</span>
          </span>
        </li>

        <li>
          {!loading &&
            (user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 text-white hover:text-[#c9a84c] transition-colors focus:outline-none"
                >
                  <div className="w-9 h-9 rounded-full bg-[#111] border border-[#c9a84c] flex items-center justify-center">
                    <User size={18} className="text-[#c9a84c]" />
                  </div>
                  <span className="text-sm font-medium hidden md:block capitalize">
                    {user.name ? user.name.split(" ")[0] : "Account"}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-[#1c1c1c] border border-gray-800 rounded-xl shadow-2xl py-2 flex flex-col z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-800 mb-1">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm font-bold text-white truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                      className="px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 flex items-center gap-3 transition-colors"
                    >
                      <LayoutDashboard size={16} className="text-[#c9a84c]" />{" "}
                      Dashboard
                    </Link>

                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        logout();
                      }}
                      className="px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 flex items-center gap-3 text-left w-full transition-colors"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-[#c9a84c] text-black px-5 py-2 rounded-full text-sm font-bold tracking-wide hover:bg-yellow-500 transition-colors duration-200"
              >
                Login
              </Link>
            ))}
        </li>
      </ul>
    </nav>
  );
}
