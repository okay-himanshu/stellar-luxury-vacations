"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Plus,
  Trash2,
  MapPin,
  X,
  UploadCloud,
  Link as LinkIcon,
  Edit,
  Eye,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function HotelsDashboard() {
  const [hotels, setHotels] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editId, setEditId] = useState(null);

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);

  // Updated Form State to include description
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    countryId: "",
    cityId: "",
    regionType: "India",
    address: "",
    lat: "",
    lng: "",
    mapUrl: "",
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [locationMode, setLocationMode] = useState("auto");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  // --- DATA FETCHING ---
  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const [resHotels, resCountries, resCities] = await Promise.all([
        axios.get(`/api/hotels?page=${page}&limit=${ITEMS_PER_PAGE}`),
        axios.get("/api/countries?limit=0"),
        axios.get("/api/cities?limit=0"),
      ]);

      if (resHotels.data.success) {
        // Fix: Checking if the array is directly inside data or inside data.items
        const hotelData = Array.isArray(resHotels.data.data)
          ? resHotels.data.data
          : resHotels.data.data.items;

        setHotels(hotelData || []);

        // Handling total pages dynamically if missing in new response structure
        setTotalPages(
          resHotels.data.totalPages || resHotels.data.data.totalPages || 1,
        );
      }

      if (resCountries.data.success) {
        const countryData = Array.isArray(resCountries.data.data)
          ? resCountries.data.data
          : resCountries.data.data.items;
        setCountries(countryData || []);
      }

      if (resCities.data.success) {
        const cityData = Array.isArray(resCities.data.data)
          ? resCities.data.data
          : resCities.data.data.items;
        setCities(cityData || []);
      }
    } catch (err) {
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const filteredCities = cities.filter(
    (c) =>
      c.countryId?._id === formData.countryId ||
      c.countryId === formData.countryId,
  );

  // --- HANDLERS ---
  const openFormModal = (mode, hotel = null) => {
    setModalMode(mode);
    setError("");
    setSelectedImages([]);

    if (hotel) {
      setEditId(hotel._id);
      setFormData({
        name: hotel.name,
        description: hotel.description || "",
        countryId: hotel.countryId?._id || "",
        cityId: hotel.cityId?._id || "",
        regionType: hotel.regionType || "India",
        address: hotel.location?.address || "",
        lat: hotel.location?.lat || "",
        lng: hotel.location?.lng || "",
        mapUrl: hotel.location?.mapUrl || "",
      });
      setLocationMode(hotel.location?.mapUrl ? "link" : "auto");
      setExistingImages(hotel.images || []);
    } else {
      setEditId(null);
      setFormData({
        name: "",
        description: "",
        countryId: "",
        cityId: "",
        regionType: "India",
        address: "",
        lat: "",
        lng: "",
        mapUrl: "",
      });
      setExistingImages([]);
    }
    setIsFormModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this hotel?")) return;
    try {
      await axios.delete(`/api/hotels?id=${id}`);
      fetchData(currentPage);
    } catch (err) {
      setError("Failed to delete hotel.");
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedImages.length > 4)
      return alert("Maximum 4 images allowed.");
    setSelectedImages([...selectedImages, ...files]);
  };

  const removeSelectedImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Frontend Validation
    if (!formData.name.trim()) return setError("Hotel name is required.");
    if (!formData.description.trim())
      return setError("Description is required.");
    if (!formData.countryId) return setError("Please select a country.");
    if (!formData.cityId) return setError("Please select a city.");
    if (modalMode === "add" && selectedImages.length === 0)
      return setError("Please upload at least 1 image.");

    setIsSubmitting(true);
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });
    selectedImages.forEach((img) => data.append("images", img));

    try {
      if (modalMode === "edit") {
        await axios.put(`/api/hotels?id=${editId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("/api/hotels", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setIsFormModalOpen(false);
      fetchData(currentPage);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openGallery = (images) => {
    setGalleryImages(images);
    setIsGalleryOpen(true);
  };

  if (loading)
    return <div className="text-white p-10 font-bold">Loading Hotels...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-white">Hotels & Resorts</h1>
        <button
          onClick={() => openFormModal("add")}
          className="flex items-center gap-2 bg-[#c9a84c] text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 transition"
        >
          <Plus size={18} /> Add New Hotel
        </button>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* TABLE */}
      <div className="bg-[#1c1c1c] border border-gray-800 rounded-xl overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#111] text-gray-400 text-xs uppercase tracking-wider">
              <th className="p-4">Image</th>
              <th className="p-4">Hotel Info</th>
              <th className="p-4">Location</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 divide-y divide-gray-800">
            {hotels?.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">
                  No hotels added yet.
                </td>
              </tr>
            )}
            {hotels?.map((hotel) => (
              <tr key={hotel._id} className="hover:bg-gray-800/30">
                <td className="p-4">
                  {hotel.images && hotel.images.length > 0 ? (
                    <div
                      className="relative w-16 h-16 rounded-lg overflow-hidden cursor-pointer border border-gray-700 hover:border-[#c9a84c] transition group"
                      onClick={() => openGallery(hotel.images)}
                    >
                      <img
                        src={hotel.images[0]}
                        alt="hotel"
                        className="w-full h-full object-cover"
                      />
                      {hotel.images.length > 1 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-sm backdrop-blur-[1px] group-hover:bg-black/40 transition">
                          +{hotel.images.length - 1}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                      <ImageIcon size={20} className="text-gray-500" />
                    </div>
                  )}
                </td>

                <td className="p-4">
                  <p className="font-bold text-white text-lg">{hotel.name}</p>
                  <span className="bg-gray-800 px-2 py-1 rounded text-xs text-[#c9a84c] mt-1 inline-block">
                    {hotel.regionType}
                  </span>
                </td>

                <td className="p-4 text-sm text-gray-400">
                  <p>
                    {hotel.cityId?.name}, {hotel.countryId?.name}
                  </p>
                </td>

                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openFormModal("view", hotel)}
                      className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => openFormModal("edit", hotel)}
                      className="p-2 text-green-400 hover:bg-green-400/10 rounded-lg transition"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(hotel._id)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="p-4 bg-[#111] border-t border-gray-800 flex items-center justify-between">
            <span className="text-sm text-gray-400">
              Page <span className="text-white font-bold">{currentPage}</span>{" "}
              of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((c) => c - 1)}
                className="p-2 bg-[#1c1c1c] border border-gray-700 rounded hover:bg-gray-800 disabled:opacity-30 text-white"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((c) => c + 1)}
                className="p-2 bg-[#1c1c1c] border border-gray-700 rounded hover:bg-gray-800 disabled:opacity-30 text-white"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ==========================================
          GALLERY MODAL
          ========================================== */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-4">
          <button
            onClick={() => setIsGalleryOpen(false)}
            className="absolute top-6 right-6 text-white bg-gray-800 p-2 rounded-full hover:bg-red-500 transition"
          >
            <X size={24} />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 max-w-5xl w-full max-h-[80vh] overflow-y-auto p-4 custom-scrollbar">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden border border-gray-700 shadow-2xl"
              >
                <img
                  src={img}
                  alt={`Gallery ${idx}`}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          FORM MODAL (ADD / EDIT / VIEW)
          ========================================== */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1c1c1c] border border-gray-800 rounded-xl w-full max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button
              onClick={() => setIsFormModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-4 capitalize">
              {modalMode} Hotel Details
            </h2>

            {error && (
              <div className="mb-4 text-red-400 bg-red-900/20 p-3 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* --- BASIC INFO --- */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-gray-400 text-sm mb-1">
                    Hotel Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    disabled={modalMode === "view"}
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-[#111] border border-gray-700 p-3 rounded text-white outline-none focus:border-[#c9a84c] disabled:opacity-50"
                    placeholder="e.g. The Taj Mahal Palace"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Region Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    disabled={modalMode === "view"}
                    required
                    value={formData.regionType}
                    onChange={(e) =>
                      setFormData({ ...formData, regionType: e.target.value })
                    }
                    className="w-full bg-[#111] border border-gray-700 p-3 rounded text-white outline-none focus:border-[#c9a84c] disabled:opacity-50"
                  >
                    <option value="India">India</option>
                    <option value="International">International</option>
                    <option value="International Exchange">
                      International Exchange
                    </option>
                  </select>
                </div>

                {/* --- DESCRIPTION TEXTAREA --- */}
                <div className="md:col-span-3">
                  <label className="block text-gray-400 text-sm mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    disabled={modalMode === "view"}
                    required
                    rows="4"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full bg-[#111] border border-gray-700 p-3 rounded text-white outline-none focus:border-[#c9a84c] disabled:opacity-50 resize-y"
                    placeholder="Enter detailed description about the hotel/resort..."
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    disabled={modalMode === "view"}
                    required
                    value={formData.countryId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        countryId: e.target.value,
                        cityId: "",
                      })
                    }
                    className="w-full bg-[#111] border border-gray-700 p-3 rounded text-white outline-none focus:border-[#c9a84c] disabled:opacity-50"
                  >
                    <option value="" disabled>
                      Select Country
                    </option>
                    {countries.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-400 text-sm mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    disabled={modalMode === "view" || !formData.countryId}
                    required
                    value={formData.cityId}
                    onChange={(e) =>
                      setFormData({ ...formData, cityId: e.target.value })
                    }
                    className="w-full bg-[#111] border border-gray-700 p-3 rounded text-white outline-none focus:border-[#c9a84c] disabled:opacity-50"
                  >
                    <option value="" disabled>
                      Select City
                    </option>
                    {filteredCities.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* --- LOCATION TOGGLE --- */}
              <div className="bg-[#111] p-4 rounded-lg border border-gray-800">
                <div className="flex gap-4 mb-4 border-b border-gray-800 pb-2">
                  <button
                    type="button"
                    onClick={() =>
                      modalMode !== "view" && setLocationMode("auto")
                    }
                    className={`flex items-center gap-2 text-sm font-bold ${locationMode === "auto" ? "text-blue-400" : "text-gray-500"}`}
                  >
                    <MapPin size={16} /> Address / Lat-Lng
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      modalMode !== "view" && setLocationMode("link")
                    }
                    className={`flex items-center gap-2 text-sm font-bold ${locationMode === "link" ? "text-[#c9a84c]" : "text-gray-500"}`}
                  >
                    <LinkIcon size={16} /> Paste Map Link
                  </button>
                </div>

                {locationMode === "auto" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-xs mb-1">
                        Full Address
                      </label>
                      <input
                        disabled={modalMode === "view"}
                        type="text"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        className="w-full bg-[#1c1c1c] border border-gray-700 p-3 rounded text-white disabled:opacity-50 outline-none focus:border-[#c9a84c]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">
                        Latitude
                      </label>
                      <input
                        disabled={modalMode === "view"}
                        type="number"
                        step="any"
                        value={formData.lat}
                        onChange={(e) =>
                          setFormData({ ...formData, lat: e.target.value })
                        }
                        className="w-full bg-[#1c1c1c] border border-gray-700 p-3 rounded text-white disabled:opacity-50 outline-none focus:border-[#c9a84c]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-1">
                        Longitude
                      </label>
                      <input
                        disabled={modalMode === "view"}
                        type="number"
                        step="any"
                        value={formData.lng}
                        onChange={(e) =>
                          setFormData({ ...formData, lng: e.target.value })
                        }
                        className="w-full bg-[#1c1c1c] border border-gray-700 p-3 rounded text-white disabled:opacity-50 outline-none focus:border-[#c9a84c]"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">
                      Google Maps Shared Link
                    </label>
                    <input
                      disabled={modalMode === "view"}
                      type="url"
                      value={formData.mapUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, mapUrl: e.target.value })
                      }
                      className="w-full bg-[#1c1c1c] border border-gray-700 p-3 rounded text-white outline-none disabled:opacity-50 focus:border-[#c9a84c]"
                    />
                  </div>
                )}
              </div>

              {/* --- IMAGES SECTION --- */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Hotel Images{" "}
                  <span className="text-red-500">
                    {modalMode === "add" ? "*" : ""}
                  </span>
                </label>

                {existingImages.length > 0 && selectedImages.length === 0 && (
                  <div className="mb-4">
                    {modalMode !== "view" && (
                      <p className="text-xs text-gray-500 mb-2">
                        Current Saved Images (Uploading new images will replace
                        these):
                      </p>
                    )}
                    <div className="grid grid-cols-4 gap-4">
                      {existingImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="aspect-square bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
                        >
                          <img
                            src={img}
                            alt="saved"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {modalMode !== "view" && (
                  <>
                    <input
                      type="file"
                      ref={fileInputRef}
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <div
                      onClick={() => fileInputRef.current.click()}
                      className="w-full border-2 border-dashed border-gray-700 bg-[#111] hover:bg-gray-800 transition p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer text-gray-400"
                    >
                      <UploadCloud size={32} className="mb-2 text-[#c9a84c]" />
                      <p className="text-sm">
                        Click to select new images (Max 4)
                      </p>
                    </div>
                  </>
                )}

                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    {selectedImages.map((file, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeSelectedImage(idx)}
                          className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full hover:bg-red-500"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ACTION BUTTON */}
              {modalMode !== "view" && (
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-[#c9a84c] text-black font-bold py-4 rounded-xl hover:bg-yellow-500 disabled:opacity-50 mt-4 transition text-lg"
                >
                  {isSubmitting
                    ? "Processing..."
                    : modalMode === "edit"
                      ? "Update Hotel"
                      : "Save New Hotel"}
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
