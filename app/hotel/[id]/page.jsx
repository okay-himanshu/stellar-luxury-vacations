"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { MapPin, ExternalLink } from "lucide-react";
import CommonHero from "../../../components/CommonHero";

export default function HotelDetailsPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =====================================================
     FETCH HOTEL
  ===================================================== */
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`/api/hotels/${id}`);

        if (res.data.success) {
          setHotel(res.data.data);
        }
      } catch (err) {
        setError("Failed to load hotel details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchHotel();
  }, [id]);

  /* =====================================================
     LOADING
  ===================================================== */
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#c9a84c] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */
  if (error || !hotel) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white space-y-4">
        <p className="text-red-500 font-bold text-xl">
          {error || "Hotel not found"}
        </p>

        <Link href="/" className="text-[#c9a84c] hover:underline">
          Go back to Home
        </Link>
      </div>
    );
  }

  /* =====================================================
     LOCATION DATA
  ===================================================== */
  const cityName = hotel.cityId?.name || "";
  const countryName = hotel.countryId?.name || "";

  const mapSearchQuery = encodeURIComponent(
    `${hotel.name} ${cityName} ${countryName}`,
  );

  /**
   * ✅ PRIORITY:
   * 1. lat/lng (exact map)
   * 2. fallback search query
   */
  const mapSrc =
    hotel.location?.lat && hotel.location?.lng
      ? `https://www.google.com/maps?q=${hotel.location.lat},${hotel.location.lng}&z=15&output=embed`
      : `https://www.google.com/maps?q=${mapSearchQuery}&z=14&output=embed`;

  /* =====================================================
     UI
  ===================================================== */
  return (
    <>
      <CommonHero />

      <div className="min-h-screen bg-black text-white pt-28 px-6 md:px-12 pb-20 font-sans">
        <div className="max-w-[1200px] mx-auto">
          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-[40px] font-bold mb-2">
              {hotel.name} {cityName && `- ${cityName}`}
            </h1>

            <h2 className="text-lg md:text-xl text-gray-300">{cityName}</h2>
          </div>

          {/* IMAGES */}
          {hotel.images?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {hotel.images.slice(0, 4).map((img, index) => (
                <div
                  key={index}
                  className="relative w-full h-[250px] md:h-[350px] overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`${hotel.name} view ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          )}

          {/* DESCRIPTION */}
          {hotel.description && (
            <div className="mb-14">
              <p className="text-gray-300 text-[16px] md:text-[17px] leading-relaxed text-justify">
                {hotel.description}
              </p>
            </div>
          )}

          {/* MAP SECTION */}
          <div>
            <h3 className="text-[#3a6b7e] text-3xl font-bold mb-6">Map</h3>

            <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden border border-gray-800 relative bg-[#111]">
              {/* GOOGLE MAP */}
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={mapSrc}
              />

              {/* OPEN IN GOOGLE MAPS BUTTON */}
              {hotel.location?.mapUrl && (
                <a
                  href={hotel.location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-[#c9a84c] hover:text-black transition border border-white/10 shadow-lg"
                >
                  <MapPin size={16} />
                  Open in Google Maps
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
