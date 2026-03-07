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
  Edit2,
  ChevronDown,
} from "lucide-react";

export default function LocationsDashboard() {
  const [activeTab, setActiveTab] = useState("countries");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const [countries, setCountries] = useState([]);
  const [countryPage, setCountryPage] = useState(1);
  const [countryTotalPages, setCountryTotalPages] = useState(1);
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);

  const [cities, setCities] = useState([]);
  const [cityPage, setCityPage] = useState(1);
  const [cityTotalPages, setCityTotalPages] = useState(1);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [cityToEdit, setCityToEdit] = useState(null);
  const [allCountriesForDropdown, setAllCountriesForDropdown] = useState([]);

  const ITEMS_PER_PAGE = 5;

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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Locations Management</h1>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-400 p-4 rounded-lg flex items-center gap-2">
          <AlertCircle size={20} /> {error}
        </div>
      )}

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

      {activeTab === "countries" && (
        <div className="bg-[#1c1c1c] border border-gray-800 rounded-xl overflow-hidden flex flex-col">
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
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
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

          <Pagination
            currentPage={countryPage}
            totalPages={countryTotalPages}
            onPageChange={setCountryPage}
          />
        </div>
      )}

      {activeTab === "cities" && (
        <div className="bg-[#1c1c1c] border border-gray-800 rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#111]">
            <p className="text-gray-400 text-sm">
              Manage all cities under their respective countries.
            </p>
            <button
              onClick={() => {
                setCityToEdit(null);
                setIsCityModalOpen(true);
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-500 transition text-sm"
            >
              <Plus size={16} /> Add City
            </button>
          </div>

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
                  <th className="p-4 font-medium border-b border-gray-800">
                    Region Types
                  </th>
                  <th className="p-4 font-medium border-b border-gray-800 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-300 divide-y divide-gray-800">
                {cities.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-500">
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
                    <td className="p-4 text-gray-400">
                      <div className="flex flex-wrap gap-1">
                        {city.regionType && city.regionType.length > 0 ? (
                          city.regionType.map((rt, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-700 px-2 py-1 rounded text-[10px] uppercase"
                            >
                              {rt}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-600 text-xs">
                            Unassigned
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setCityToEdit(city);
                          setIsCityModalOpen(true);
                        }}
                        className="text-gray-500 hover:text-blue-500 p-2 rounded-lg hover:bg-blue-500/10 transition"
                      >
                        <Edit2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={cityPage}
            totalPages={cityTotalPages}
            onPageChange={setCityPage}
          />
        </div>
      )}

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
        <CityModal
          countries={allCountriesForDropdown}
          cityToEdit={cityToEdit}
          onClose={() => {
            setIsCityModalOpen(false);
            setCityToEdit(null);
          }}
          onSuccess={() => {
            fetchCities(cityPage);
            setIsCityModalOpen(false);
            setCityToEdit(null);
          }}
        />
      )}
    </div>
  );
}

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

function AddCountryModal({ onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const token = localStorage.getItem("token");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      const res = await axios.post(
        "/api/countries",
        { name, code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.data.success) onSuccess();
    } catch (error) {
      console.log(error);
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

function CityModal({ countries, cityToEdit, onClose, onSuccess }) {
  const [name, setName] = useState(cityToEdit?.name || "");
  const [countryId, setCountryId] = useState(cityToEdit?.countryId?._id || "");
  const [regionType, setRegionType] = useState(cityToEdit?.regionType || []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const token = localStorage.getItem("token");

  const regionOptions = ["India", "International", "Internal Exchange"];

  const toggleRegion = (option) => {
    if (regionType.includes(option)) {
      setRegionType(regionType.filter((r) => r !== option));
    } else {
      setRegionType([...regionType, option]);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (regionType.length === 0) {
      setErr("Please select at least one Region Type.");
      return;
    }

    setLoading(true);
    setErr("");
    try {
      if (cityToEdit) {
        const res = await axios.put(
          `/api/cities?id=${cityToEdit._id}`,
          {
            name,
            countryId,
            regionType,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (res.data.success) onSuccess();
      } else {
        const res = await axios.post(
          "/api/cities",
          {
            name,
            countryId,
            regionType,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.data.success) onSuccess();
      }
    } catch (error) {
      setErr(
        error.response?.data?.error ||
          `Error ${cityToEdit ? "updating" : "adding"} city`,
      );
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
        <h2 className="text-xl font-bold text-white mb-6">
          {cityToEdit ? "Edit City" : "Add New City"}
        </h2>

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

          <div className="relative">
            <label className="block text-gray-400 text-sm mb-2">
              Region Type
            </label>
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-[#111] border border-gray-700 p-3 rounded focus:border-blue-400 outline-none cursor-pointer flex justify-between items-center"
            >
              <span
                className={
                  regionType.length === 0 ? "text-gray-500" : "text-white"
                }
              >
                {regionType.length > 0
                  ? regionType.join(", ")
                  : "-- Select Region Types --"}
              </span>
              <ChevronDown
                size={18}
                className={`text-gray-400 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {isDropdownOpen && (
              <div className="absolute z-50 w-full mt-1 bg-[#1c1c1c] border border-gray-700 rounded shadow-xl overflow-hidden">
                {regionOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => toggleRegion(option)}
                    className="px-4 py-3 hover:bg-gray-800 cursor-pointer flex items-center gap-3 transition-colors"
                  >
                    <div className="w-4 h-4 border border-gray-500 rounded-sm flex items-center justify-center">
                      {regionType.includes(option) && (
                        <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        regionType.includes(option)
                          ? "text-white font-medium"
                          : "text-gray-400"
                      }`}
                    >
                      {option}
                    </span>
                  </div>
                ))}
              </div>
            )}
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
            {loading ? "Saving..." : cityToEdit ? "Update City" : "Save City"}
          </button>
        </form>
      </div>
    </div>
  );
}
