"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { ChevronUp } from "lucide-react";
import CommonHero from "../../components/CommonHero";

export default function IndiaResortsPage() {
  const [hotels, setHotels] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCityIds, setSelectedCityIds] = useState([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const HOTELS_PER_PAGE = 10;
  const observerTarget = useRef(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchCities = async () => {
    try {
      const res = await axios.get("/api/cities/region?region=India&limit=1000");
      if (res.data.success) {
        const cityItems = Array.isArray(res.data.data.items)
          ? res.data.data.items
          : res.data.data;
        if (cityItems) {
          const sortedCities = [...cityItems].sort((a, b) =>
            a.name.localeCompare(b.name),
          );
          setCities(sortedCities);
        }
      }
    } catch (err) {
      console.error("Failed to fetch cities", err);
    }
  };

  const fetchHotels = useCallback(
    async (currentPage, cityIds, isReset = false) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      if (isReset) {
        setLoadingInitial(true);
        setHotels([]);
      } else {
        setLoadingMore(true);
      }
      setError("");

      try {
        const queryParams = new URLSearchParams({
          regionType: "India",
          page: currentPage,
          limit: HOTELS_PER_PAGE,
        });

        if (cityIds.length > 0) {
          queryParams.append("cityIds", cityIds.join(","));
        }

        const res = await axios.get(`/api/hotels?${queryParams.toString()}`, {
          signal: abortControllerRef.current.signal,
        });

        if (res.data.success) {
          const newHotels = res.data.data.items || [];
          const totalDocs = res.data.data.total || 0;

          setHasMore(currentPage * HOTELS_PER_PAGE < totalDocs);
          setHotels((prev) => (isReset ? newHotels : [...prev, ...newHotels]));
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError("Failed to load resorts. Please try again.");
          console.error("Failed to fetch hotels", err);
        }
      } finally {
        setLoadingInitial(false);
        setLoadingMore(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    fetchHotels(1, selectedCityIds, true);
  }, [selectedCityIds, fetchHotels]);

  useEffect(() => {
    if (page > 1) {
      fetchHotels(page, selectedCityIds, false);
    }
  }, [page, selectedCityIds, fetchHotels]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !loadingInitial &&
          !loadingMore
        ) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current);
    };
  }, [hasMore, loadingInitial, loadingMore]);

  const handleCityChange = (cityId) => {
    setPage(1);
    setSelectedCityIds((prev) =>
      prev.includes(cityId)
        ? prev.filter((id) => id !== cityId)
        : [...prev, cityId],
    );
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.1); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }
        
        .shine-effect {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-25deg);
          z-index: 10;
          transition: all 0.7s ease-in-out;
          pointer-events: none;
        }
        .group:hover .shine-effect {
          left: 200%;
        }
      `,
        }}
      />

      <CommonHero imageSrc="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

      <div className="min-h-screen bg-black text-white pt-8 px-6 md:px-12 pb-20 font-sans relative">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-[40px] md:text-[44px] font-bold mb-12 tracking-tight">
            Best resorts in India
          </h1>

          <div className="flex flex-col md:flex-row gap-12 h-full items-start">
            <aside className="w-full md:w-64 flex-shrink-0 md:sticky md:top-32 self-start">
              <h2 className="text-xl font-bold mb-5">City</h2>
              <div className="max-h-[65vh] overflow-y-auto pr-6 space-y-3.5 custom-scrollbar">
                {cities.length === 0 ? (
                  <p className="text-gray-500 text-sm">Loading cities...</p>
                ) : (
                  cities.map((city) => (
                    <label
                      key={city._id}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="relative flex items-center justify-center w-[14px] h-[14px] rounded-[3px] border border-gray-400 bg-transparent overflow-hidden">
                        <input
                          type="checkbox"
                          className="absolute opacity-0 cursor-pointer w-full h-full"
                          checked={selectedCityIds.includes(city._id)}
                          onChange={() => handleCityChange(city._id)}
                        />
                        {selectedCityIds.includes(city._id) && (
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
                        {city.name}
                      </span>
                    </label>
                  ))
                )}
              </div>
            </aside>

            <main className="flex-1 w-full">
              {error && <p className="text-red-500">{error}</p>}

              {loadingInitial ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 animate-pulse">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div
                      key={n}
                      className="bg-[#111] h-[350px] rounded-2xl"
                    ></div>
                  ))}
                </div>
              ) : hotels.length === 0 ? (
                <div className="flex items-center justify-center h-40 text-gray-500">
                  No resorts found for the selected cities.
                </div>
              ) : (
                <div className="flex flex-col space-y-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                    {hotels.map((hotel, index) => (
                      <div
                        key={`${hotel._id}-${index}`}
                        className="relative bg-black border border-gray-800 rounded-[16px] overflow-hidden hover:border-gray-500 transition-colors duration-500 flex flex-col group"
                      >
                        <div className="shine-effect"></div>

                        <div className="relative h-56 w-full overflow-hidden">
                          <Image
                            src={hotel.images?.[0] || "/images/placeholder.jpg"}
                            alt={hotel.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                        </div>

                        <div className="p-6 flex flex-col flex-1 relative z-20">
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

                  <div
                    ref={observerTarget}
                    className="w-full h-20 flex flex-col items-center justify-center pt-4"
                  >
                    {loadingMore && (
                      <div className="w-8 h-8 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
                    )}
                    {!hasMore && hotels.length > 0 && (
                      <p className="text-gray-500 text-sm mt-2">
                        You have reached the end.
                      </p>
                    )}
                  </div>
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
