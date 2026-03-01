"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";

export default function IndiaResortsPage() {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const HOTELS_PER_PAGE = 6;
  const listRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const citiesRes = await axios.get(
          "/api/cities/region?region=India&limit=1000",
        );
        if (citiesRes.data.success) {
          // Robust checking for data structure
          const cityItems = Array.isArray(citiesRes.data.data)
            ? citiesRes.data.data
            : citiesRes.data.data.items;

          if (cityItems) {
            const cityNames = cityItems.map((c) => c.name).sort();
            setCities(cityNames);
          }
        }

        const hotelsRes = await axios.get("/api/hotels");
        if (hotelsRes.data.success) {
          // Robust checking for data structure
          const allHotels = Array.isArray(hotelsRes.data.data)
            ? hotelsRes.data.data
            : hotelsRes.data.data.items;

          if (allHotels) {
            const indianHotels = allHotels.filter(
              (hotel) =>
                hotel.regionType && hotel.regionType.toLowerCase() === "india",
            );

            setHotels(indianHotels);
            setFilteredHotels(indianHotels);
          }
        }
      } catch (err) {
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCityChange = (city) => {
    let updatedCities = [...selectedCities];
    if (updatedCities.includes(city)) {
      updatedCities = updatedCities.filter((c) => c !== city);
    } else {
      updatedCities.push(city);
    }

    setSelectedCities(updatedCities);
    setCurrentPage(1); // Reset page on filter change

    if (updatedCities.length === 0) {
      setFilteredHotels(hotels);
    } else {
      const filtered = hotels.filter((hotel) => {
        const hotelCity =
          hotel.cityId?.name || hotel.location?.city || "Unknown";
        return updatedCities.includes(hotelCity);
      });
      setFilteredHotels(filtered);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredHotels.length / HOTELS_PER_PAGE);
  const indexOfLastHotel = currentPage * HOTELS_PER_PAGE;
  const indexOfFirstHotel = indexOfLastHotel - HOTELS_PER_PAGE;
  const currentHotels = filteredHotels.slice(
    indexOfFirstHotel,
    indexOfLastHotel,
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
      `,
        }}
      />

      <div className="min-h-screen bg-black text-white pt-28 px-6 md:px-12 pb-20 font-sans">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-[40px] md:text-[44px] font-bold mb-12 tracking-tight">
            Best resorts in India
          </h1>

          <div className="flex flex-col md:flex-row gap-12 h-full">
            <aside className="w-full md:w-64 flex-shrink-0">
              <h2 className="text-xl font-bold mb-5">City</h2>

              <div className="max-h-[65vh] overflow-y-auto pr-6 space-y-3.5 custom-scrollbar">
                {loading ? (
                  <p className="text-gray-500 text-sm">Loading cities...</p>
                ) : cities.length === 0 ? (
                  <p className="text-gray-500 text-sm">No cities found.</p>
                ) : (
                  cities.map((city, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="relative flex items-center justify-center w-[14px] h-[14px] rounded-[3px] border border-gray-400 bg-transparent overflow-hidden">
                        <input
                          type="checkbox"
                          className="absolute opacity-0 cursor-pointer w-full h-full"
                          checked={selectedCities.includes(city)}
                          onChange={() => handleCityChange(city)}
                        />
                        {selectedCities.includes(city) && (
                          <div className="absolute inset-0 bg-white border border-white flex items-center justify-center">
                            <svg
                              className="w-2.5 h-2.5 text-black"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                        )}
                      </div>
                      <span className="text-gray-300 text-[14px] leading-none group-hover:text-white transition-colors capitalize">
                        {city}
                      </span>
                    </label>
                  ))
                )}
              </div>
            </aside>

            <div className="hidden md:block w-px bg-gray-800 min-h-[60vh] relative">
              <div className="absolute top-0 left-0 w-[2px] h-32 bg-gray-400 -ml-[0.5px]"></div>
            </div>

            <main className="flex-1" ref={listRef}>
              {error && <p className="text-red-500">{error}</p>}

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 animate-pulse">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className="bg-[#111] h-[350px] rounded-2xl"
                    ></div>
                  ))}
                </div>
              ) : currentHotels.length === 0 ? (
                <div className="flex items-center justify-center h-40 text-gray-500">
                  No resorts found for the selected cities.
                </div>
              ) : (
                <div className="flex flex-col space-y-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                    {currentHotels.map((hotel, index) => (
                      <div
                        key={index}
                        className="bg-black border border-gray-800 rounded-[16px] overflow-hidden hover:border-gray-600 transition-colors duration-300 flex flex-col group"
                      >
                        <div className="relative h-56 w-full overflow-hidden">
                          <Image
                            src={hotel.images?.[0] || "/images/placeholder.jpg"}
                            alt={hotel.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <div className="p-6 flex flex-col flex-1">
                          <h3 className="text-white font-medium text-[17px] leading-tight mb-1 truncate">
                            {hotel.name}
                          </h3>
                          <p className="text-gray-500 text-[14px] mb-8">
                            {hotel.cityId?.name ||
                              hotel.location?.city ||
                              "Unknown Location"}
                          </p>

                          <div className="mt-auto">
                            <Link
                              href={`/hotel/${hotel._id}`}
                              className="inline-block border border-gray-400 text-white text-[13px] font-medium px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300"
                            >
                              View Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Enhanced Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 pt-8 border-t border-gray-800">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 hover:border-gray-400 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-gray-600 transition-all text-white"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      <div className="flex gap-2">
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                              currentPage === i + 1
                                ? "bg-white text-black"
                                : "text-gray-400 hover:text-white hover:bg-gray-800"
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 hover:border-gray-400 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-gray-600 transition-all text-white"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-10 h-10 bg-[#c9a84c] flex items-center justify-center rounded shadow-lg hover:bg-yellow-500 transition-all z-50"
        >
          <ChevronUp className="text-black" size={24} strokeWidth={2.5} />
        </button>
      )}
    </>
  );
}
