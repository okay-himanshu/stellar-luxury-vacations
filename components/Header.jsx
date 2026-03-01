"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../context/auth-context";

export default function Header() {
  const { user, loading, logout } = useAuth();

  // Desktop Dropdown States
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Mobile Menu States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileHotelsOpen, setIsMobileHotelsOpen] = useState(false);

  const leftNavItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Activities", path: "/activities" },
    { name: "Travel Desk", path: "/travel-desk" },
  ];

  const hotelLinks = [
    { name: "India", path: "/india" },
    { name: "International", path: "/international" },
    { name: "Internal Exchange", path: "/internal-exchange" },
  ];

  const linkStyle =
    "text-white text-sm font-medium tracking-wide hover:text-[#c9a84c] transition-colors duration-200";

  // Close desktop user dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="w-full h-20 fixed top-0 left-0 z-50 flex items-center justify-between px-6 lg:px-10 bg-black/30 backdrop-blur-md border-b border-white/10">
        {/* ================= DESKTOP LEFT NAV ================= */}
        <ul className="hidden lg:flex items-center gap-9 list-none m-0 p-0">
          {leftNavItems.map((item) => (
            <li key={item.name}>
              <Link href={item.path} className={linkStyle}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* ================= LOGO ================= */}
        <Link
          href="/"
          className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 flex flex-col items-center no-underline group z-50"
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

        {/* ================= MOBILE MENU BUTTON ================= */}
        <div className="lg:hidden flex items-center z-50">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-white hover:text-[#c9a84c] transition-colors p-2 focus:outline-none"
          >
            <Menu size={28} />
          </button>
        </div>

        {/* ================= DESKTOP RIGHT NAV ================= */}
        <ul className="hidden lg:flex items-center gap-8 list-none m-0 p-0">
          <li>
            <Link href="/membership" className={linkStyle}>
              Membership
            </Link>
          </li>

          {/* Desktop Hotels Dropdown */}
          <li className="relative group py-6">
            <span className="flex items-center gap-1 text-white text-sm font-medium tracking-wide group-hover:text-[#c9a84c] transition-colors duration-200 cursor-pointer border-b-2 border-transparent group-hover:border-[#c9a84c] pb-1">
              Hotel &amp; Resorts
              <ChevronDown
                size={12}
                className="group-hover:rotate-180 transition-transform duration-300"
              />
            </span>

            <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-52 bg-[#141414] border border-gray-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-2">
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#141414] border-l border-t border-gray-800 rotate-45"></div>

              <ul className="relative z-10 flex flex-col space-y-1">
                {hotelLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="flex items-center px-4 py-3 text-sm text-gray-300 hover:text-[#c9a84c] hover:bg-white/5 rounded-lg transition-colors group/link"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover/link:bg-[#c9a84c] mr-3 transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          <li>
            <span
              className={`flex items-center gap-1 ${linkStyle} cursor-pointer`}
            >
              Blogs <ChevronDown size={12} />
            </span>
          </li>

          {/* Desktop Auth Section */}
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
                        <LayoutDashboard size={16} className="text-[#c9a84c]" />
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

      {/* ================= MOBILE DRAWER MENU ================= */}

      {/* Background Overlay */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Drawer Panel (Right to Left) */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-[#111] border-l border-gray-800 z-[70] transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <span className="text-lg font-bold text-[#c9a84c]">Menu</span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X size={24} />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex-1 overflow-y-auto py-6 px-6 space-y-6">
          <ul className="flex flex-col space-y-5">
            {/* Left Nav Items */}
            {leftNavItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white text-lg font-medium hover:text-[#c9a84c] transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}

            <li>
              <Link
                href="/membership"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white text-lg font-medium hover:text-[#c9a84c] transition-colors"
              >
                Membership
              </Link>
            </li>

            {/* Mobile Hotels Accordion */}
            <li className="flex flex-col">
              <button
                onClick={() => setIsMobileHotelsOpen(!isMobileHotelsOpen)}
                className="flex items-center justify-between text-white text-lg font-medium hover:text-[#c9a84c] transition-colors"
              >
                Hotel & Resorts
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${
                    isMobileHotelsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Accordion Content */}
              <div
                className={`flex flex-col space-y-3 pl-4 mt-3 border-l-2 border-gray-800 overflow-hidden transition-all duration-300 ${
                  isMobileHotelsOpen
                    ? "max-h-48 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {hotelLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-400 text-base hover:text-[#c9a84c] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </li>

            <li>
              <Link
                href="/blogs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white text-lg font-medium hover:text-[#c9a84c] transition-colors"
              >
                Blogs
              </Link>
            </li>
          </ul>
        </div>

        {/* Drawer Footer (Auth) */}
        <div className="p-6 border-t border-gray-800 bg-[#0a0a0a]">
          {!loading &&
            (user ? (
              <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#111] border border-[#c9a84c] flex items-center justify-center">
                    <User size={20} className="text-[#c9a84c]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm capitalize">
                      {user.name || "Account"}
                    </span>
                    <span className="text-gray-400 text-xs truncate max-w-[200px]">
                      {user.email}
                    </span>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors py-2"
                >
                  <LayoutDashboard size={18} className="text-[#c9a84c]" />
                  Dashboard
                </Link>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                  }}
                  className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors py-2 text-left w-full"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex justify-center w-full bg-[#c9a84c] text-black py-3 rounded-xl text-base font-bold tracking-wide hover:bg-yellow-500 transition-colors"
              >
                Login
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
