"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Trash2,
  Plus,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function LocationsDashboard() {
  // Global States
  const [activeTab, setActiveTab] = useState("countries"); // "countries" or "cities"
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Country States
  const [countries, setCountries] = useState([]);
  const [countryPage, setCountryPage] = useState(1);
  const [countryTotalPages, setCountryTotalPages] = useState(1);
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);

  // City States
  const [cities, setCities] = useState([]);
  const [cityPage, setCityPage] = useState(1);
  const [cityTotalPages, setCityTotalPages] = useState(1);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [allCountriesForDropdown, setAllCountriesForDropdown] = useState([]);

  const ITEMS_PER_PAGE = 5;

  // --- DATA FETCHING ---
  const fetchCountries = async (page = 1) => {
    try {
      const res = await axios.get(
        `/api/countries?page=${page}&limit=${ITEMS_PER_PAGE}`,
      );
      if (res.data.success) {
        setCountries(res.data.data.items);
        setCountryTotalPages(res.data.data.totalPages);
      }
    } catch (err) {
      setError("Failed to load countries");
    }
  };

  const fetchCities = async (page = 1) => {
    try {
      const res = await axios.get(
        `/api/cities?page=${page}&limit=${ITEMS_PER_PAGE}`,
      );
      if (res.data.success) {
        setCities(res.data.data.items);
        setCityTotalPages(res.data.data.totalPages);
      }
    } catch (err) {
      setError("Failed to load cities");
    }
  };

  const fetchAllCountries = async () => {
    try {
      const res = await axios.get(`/api/countries?limit=0`);
      if (res.data.success) setAllCountriesForDropdown(res.data.data.items);
    } catch (err) {
      console.error("Dropdown error", err);
    }
  };

  useEffect(() => {
    const initFetch = async () => {
      setLoading(true);
      await Promise.all([
        fetchCountries(countryPage),
        fetchCities(cityPage),
        fetchAllCountries(),
      ]);
      setLoading(false);
    };
    initFetch();
  }, [countryPage, cityPage]);

  if (loading)
    return (
      <div className="text-white p-10 font-bold">Loading dashboard...</div>
    );

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Locations Management</h1>
      </div>

      {/* ERROR ALERT */}
      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-400 p-4 rounded-lg flex items-center gap-2">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      {/* TABS NAVIGATION */}
      <div className="flex border-b border-gray-800">
        <button
          onClick={() => setActiveTab("countries")}
          className={`px-6 py-3 font-bold text-sm transition-colors relative ${
            activeTab === "countries"
              ? "text-[#c9a84c]"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          COUNTRIES
          {activeTab === "countries" && (
            <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#c9a84c]"></div>
          )}
        </button>

        <button
          onClick={() => setActiveTab("cities")}
          className={`px-6 py-3 font-bold text-sm transition-colors relative ${
            activeTab === "cities"
              ? "text-blue-400"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          CITIES
          {activeTab === "cities" && (
            <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-blue-400"></div>
          )}
        </button>
      </div>

      {/* =========================================
          TAB 1: COUNTRIES CONTENT
          ========================================= */}
      {activeTab === "countries" && (
        <div className="bg-[#1c1c1c] border border-gray-800 rounded-xl overflow-hidden flex flex-col">
          {/* Action Bar */}
          <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#111]">
            <p className="text-gray-400 text-sm">
              Manage all operating countries.
            </p>
            <button
              onClick={() => setIsCountryModalOpen(true)}
              className="flex items-center gap-2 bg-[#c9a84c] text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 transition text-sm"
            >
              <Plus size={16} /> Add Country
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto min-h-[350px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1a1a1a] text-gray-400 text-xs uppercase tracking-wider">
                  <th className="p-4 font-medium border-b border-gray-800">
                    Country Name
                  </th>
                  <th className="p-4 font-medium border-b border-gray-800">
                    Code
                  </th>
                  <th className="p-4 font-medium border-b border-gray-800 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-300 divide-y divide-gray-800">
                {countries.length === 0 && (
                  <tr>
                    <td colSpan="3" className="p-8 text-center text-gray-500">
                      No countries found. Add one to get started.
                    </td>
                  </tr>
                )}
                {countries.map((c) => (
                  <tr key={c._id} className="hover:bg-gray-800/30 transition">
                    <td className="p-4 font-medium text-white">{c.name}</td>
                    <td className="p-4">
                      <span className="bg-gray-800 px-2 py-1 rounded text-xs uppercase">
                        {c.code}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={async () => {
                          if (!confirm("Delete this country?")) return;
                          try {
                            await axios.delete(`/api/countries`, {
                              params: { id: c._id },
                            });
                            fetchCountries(countryPage);
                            fetchAllCountries();
                          } catch (err) {
                            setError(
                              err.response?.data?.error || "Error deleting",
                            );
                          }
                        }}
                        className="text-gray-500 hover:text-red-500 p-2 rounded-lg hover:bg-red-500/10 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination for Countries */}
          <Pagination
            currentPage={countryPage}
            totalPages={countryTotalPages}
            onPageChange={setCountryPage}
          />
        </div>
      )}

      {/* =========================================
          TAB 2: CITIES CONTENT
          ========================================= */}
      {activeTab === "cities" && (
        <div className="bg-[#1c1c1c] border border-gray-800 rounded-xl overflow-hidden flex flex-col">
          {/* Action Bar */}
          <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#111]">
            <p className="text-gray-400 text-sm">
              Manage all cities under their respective countries.
            </p>
            <button
              onClick={() => setIsCityModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-500 transition text-sm"
            >
              <Plus size={16} /> Add City
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto min-h-[350px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1a1a1a] text-gray-400 text-xs uppercase tracking-wider">
                  <th className="p-4 font-medium border-b border-gray-800">
                    City Name
                  </th>
                  <th className="p-4 font-medium border-b border-gray-800">
                    Linked Country
                  </th>
                  <th className="p-4 font-medium border-b border-gray-800 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-300 divide-y divide-gray-800">
                {cities.length === 0 && (
                  <tr>
                    <td colSpan="3" className="p-8 text-center text-gray-500">
                      No cities found. Add one to get started.
                    </td>
                  </tr>
                )}
                {cities.map((city) => (
                  <tr
                    key={city._id}
                    className="hover:bg-gray-800/30 transition"
                  >
                    <td className="p-4 font-medium text-white">{city.name}</td>
                    <td className="p-4 text-gray-400">
                      <span className="bg-gray-800 px-2 py-1 rounded text-xs">
                        {city.countryId?.name || "Unassigned"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={async () => {
                          if (!confirm("Delete this city?")) return;
                          try {
                            await axios.delete(`/api/cities`, {
                              params: { id: city._id },
                            });
                            fetchCities(cityPage);
                          } catch (err) {
                            setError("Error deleting city");
                          }
                        }}
                        className="text-gray-500 hover:text-red-500 p-2 rounded-lg hover:bg-red-500/10 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination for Cities */}
          <Pagination
            currentPage={cityPage}
            totalPages={cityTotalPages}
            onPageChange={setCityPage}
          />
        </div>
      )}

      {/* =========================================
          MODALS
          ========================================= */}
      {isCountryModalOpen && (
        <AddCountryModal
          onClose={() => setIsCountryModalOpen(false)}
          onSuccess={() => {
            fetchCountries(countryPage);
            fetchAllCountries();
            setIsCountryModalOpen(false);
          }}
        />
      )}

      {isCityModalOpen && (
        <AddCityModal
          countries={allCountriesForDropdown}
          onClose={() => setIsCityModalOpen(false)}
          onSuccess={() => {
            fetchCities(cityPage);
            setIsCityModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

// ==========================================
// REUSABLE COMPONENTS
// ==========================================

// Frontend Pagination Component (Visually attached to the bottom of the table)
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="p-4 bg-[#111] border-t border-gray-800 flex items-center justify-between">
      <span className="text-sm text-gray-400">
        Showing Page <span className="text-white font-bold">{currentPage}</span>{" "}
        of <span className="text-white font-bold">{totalPages}</span>
      </span>
      <div className="flex gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-2 bg-[#1c1c1c] border border-gray-700 rounded hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-all"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-2 bg-[#1c1c1c] border border-gray-700 rounded hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-all"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// Add Country Modal
function AddCountryModal({ onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      const res = await axios.post("/api/countries", { name, code });
      if (res.data.success) onSuccess();
    } catch (error) {
      setErr(error.response?.data?.error || "Error adding country");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1c1c1c] border border-gray-800 rounded-xl w-full max-w-md p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold text-white mb-6">Add New Country</h2>

        {err && (
          <div className="mb-4 text-red-400 text-sm bg-red-900/20 p-3 rounded">
            {err}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Country Name
            </label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#111] border border-gray-700 p-3 rounded text-white focus:border-[#c9a84c] outline-none"
              placeholder="e.g. India"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Country Code
            </label>
            <input
              required
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-[#111] border border-gray-700 p-3 rounded text-white focus:border-[#c9a84c] outline-none uppercase"
              placeholder="e.g. IN"
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-[#c9a84c] text-black font-bold py-3 rounded hover:bg-yellow-500 disabled:opacity-50 mt-4 transition"
          >
            {loading ? "Saving..." : "Save Country"}
          </button>
        </form>
      </div>
    </div>
  );
}

// Add City Modal
function AddCityModal({ countries, onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      const res = await axios.post("/api/cities", { name, countryId });
      if (res.data.success) onSuccess();
    } catch (error) {
      setErr(error.response?.data?.error || "Error adding city");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1c1c1c] border border-gray-800 rounded-xl w-full max-w-md p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold text-white mb-6">Add New City</h2>

        {err && (
          <div className="mb-4 text-red-400 text-sm bg-red-900/20 p-3 rounded">
            {err}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Select Country
            </label>
            <select
              required
              value={countryId}
              onChange={(e) => setCountryId(e.target.value)}
              className="w-full bg-[#111] border border-gray-700 p-3 rounded text-white focus:border-blue-400 outline-none"
            >
              <option value="" disabled>
                -- Choose a Country --
              </option>
              {countries.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              City Name
            </label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#111] border border-gray-700 p-3 rounded text-white focus:border-blue-400 outline-none"
              placeholder="e.g. Mumbai"
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-500 disabled:opacity-50 mt-4 transition"
          >
            {loading ? "Saving..." : "Save City"}
          </button>
        </form>
      </div>
    </div>
  );
}
