"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import {
  Plus,
  Trash2,
  X,
  Edit,
  Eye,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Search,
} from "lucide-react";

export default function MembersDashboard() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const ITEMS_PER_PAGE = 10;

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editId, setEditId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initial State updated to include new arrays
  const initialForm = {
    packageId: "",
    password: "",
    name: "",
    email: "",
    dob: "",
    anniversaryDate: "",
    spouseName: "",
    spouseDob: "",
    childrenDetails: "",
    phone: "",
    alternatePhone: "",
    address: "",
    city: "",
    state: "",
    membershipCategory: "",
    membershipDuration: "",
    membershipAmount: "",
    paidAmount: "",
    dueAmount: "",
    joiningDate: "",
    totalNights: 0,
    usedNights: 0,
    holidays: [],
    membershipPayments: [],
    amcPayments: [],
    offers: [],
  };

  const [formData, setFormData] = useState(initialForm);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  // Auto calculate Due Amount
  useEffect(() => {
    const total = Number(formData.membershipAmount) || 0;
    const paid = Number(formData.paidAmount) || 0;
    setFormData((prev) => ({ ...prev, dueAmount: total - paid }));
  }, [formData.membershipAmount, formData.paidAmount]);

  // Data Fetching Function
  const fetchData = async (page = 1, search = "") => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/members?page=${page}&limit=${ITEMS_PER_PAGE}&search=${search}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.data.success) {
        setMembers(res.data.data.items);
        setTotalPages(res.data.data.totalPages);
      }
    } catch (err) {
      setError("Failed to load members.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, searchTerm);
  }, [currentPage]);

  // Debounced Search
  const debouncedFetch = useCallback(
    debounce((query) => {
      setCurrentPage(1);
      fetchData(1, query);
    }, 500),
    [],
  );

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    debouncedFetch(val);
  };

  const displayDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle Form Modal Open
  const openFormModal = (mode, member = null) => {
    setModalMode(mode);
    setError("");
    if (member) {
      setEditId(member._id);
      const formatDate = (dateString) =>
        dateString ? new Date(dateString).toISOString().split("T")[0] : "";

      setFormData({
        packageId: member.packageId || "",
        password: "", // Clear password on edit
        name: member.name || "",
        email: member.email || "",
        dob: formatDate(member.dob),
        anniversaryDate: formatDate(member.anniversaryDate),
        spouseName: member.spouseName || "",
        spouseDob: formatDate(member.spouseDob),
        childrenDetails: member.childrenDetails || "",
        phone: member.phone || "",
        alternatePhone: member.alternatePhone || "",
        address: member.address || "",
        city: member.city || "",
        state: member.state || "",
        membershipCategory: member.membershipCategory || "",
        membershipDuration: member.membershipDuration || "",
        membershipAmount: member.membershipAmount || "",
        paidAmount: member.paidAmount || "",
        dueAmount: member.dueAmount || "",
        joiningDate: formatDate(member.joiningDate),

        // New Array Data Population
        totalNights: member.totalNights || 0,
        usedNights: member.usedNights || 0,
        holidays:
          member.holidays?.map((h) => ({
            ...h,
            checkIn: formatDate(h.checkIn),
            checkOut: formatDate(h.checkOut),
            bookedDate: formatDate(h.bookedDate),
          })) || [],
        membershipPayments:
          member.membershipPayments?.map((p) => ({
            ...p,
            receiptDate: formatDate(p.receiptDate),
          })) || [],
        amcPayments:
          member.amcPayments?.map((p) => ({
            ...p,
            receiptDate: formatDate(p.receiptDate),
          })) || [],
        offers:
          member.offers?.map((o) => ({
            ...o,
            validity: formatDate(o.validity),
          })) || [],
      });
    } else {
      setEditId(null);
      setFormData(initialForm);
    }
    setIsFormModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this member?")) return;
    try {
      await axios.delete(`/api/members?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData(currentPage, searchTerm);
    } catch (err) {
      setError("Failed to delete member.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (modalMode === "edit") {
        await axios.put(`/api/members?id=${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("/api/members", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setIsFormModalOpen(false);
      fetchData(currentPage, searchTerm);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- ARRAY HANDLERS (HOLIDAYS, PAYMENTS, OFFERS) ---
  const handleArrayChange = (arrayName, index, field, value) => {
    const newArray = [...formData[arrayName]];
    newArray[index][field] = value;
    setFormData({ ...formData, [arrayName]: newArray });
  };

  const addArrayItem = (arrayName, template) => {
    setFormData({
      ...formData,
      [arrayName]: [...formData[arrayName], template],
    });
  };

  const removeArrayItem = (arrayName, index) => {
    const newArray = formData[arrayName].filter((_, i) => i !== index);
    setFormData({ ...formData, [arrayName]: newArray });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6 font-sans">
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <UserCheck className="text-[#c9a84c]" size={32} /> User Memberships
        </h1>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by ID, Name, Phone..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-[#111] border border-gray-700 p-2 pl-10 rounded-lg text-white outline-none focus:border-[#c9a84c]"
            />
          </div>

          <button
            onClick={() => openFormModal("add")}
            className="flex items-center gap-2 bg-[#c9a84c] text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 transition whitespace-nowrap"
          >
            <Plus size={18} /> Add Member
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-400 p-4 rounded-lg flex items-center gap-2">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      {/* TABLE */}
      {loading && members.length === 0 ? (
        <div className="text-white p-10 font-bold text-center">
          Loading Data...
        </div>
      ) : (
        <div className="bg-[#1c1c1c] border border-gray-800 rounded-xl overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#111] text-gray-400 text-xs uppercase tracking-wider">
                <th className="p-4">Package ID</th>
                <th className="p-4">Name & Contact</th>
                <th className="p-4">Category & Date</th>
                <th className="p-4">Financials</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 divide-y divide-gray-800">
              {members.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    No members found matching your search.
                  </td>
                </tr>
              )}
              {members.map((member) => (
                <tr
                  key={member._id}
                  className="hover:bg-gray-800/30 transition"
                >
                  <td className="p-4 font-bold text-[#c9a84c]">
                    {member.packageId}
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-white">{member.name}</p>
                    <p className="text-xs text-gray-400">
                      {member.phone} • {member.email}
                    </p>
                  </td>
                  <td className="p-4 text-sm">
                    {member.membershipCategory}{" "}
                    <span className="text-xs text-gray-500">
                      ({member.membershipDuration})
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      Joined: {displayDate(member.joiningDate)}
                    </p>
                  </td>
                  <td className="p-4 text-sm">
                    <p>Total: ₹{member.membershipAmount}</p>
                    <p className="text-red-400 text-xs font-bold">
                      Due: ₹{member.dueAmount}
                    </p>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openFormModal("view", member)}
                        className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => openFormModal("edit", member)}
                        className="p-2 text-green-400 hover:bg-green-400/10 rounded-lg transition"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(member._id)}
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
      )}

      {/* ==========================================
          FORM MODAL (WITH NEW SECTIONS)
          ========================================== */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1c1c1c] border border-gray-800 rounded-xl w-full max-w-6xl p-6 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button
              onClick={() => setIsFormModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-4 capitalize">
              {modalMode} Membership Details
            </h2>

            {error && (
              <div className="mb-4 text-red-400 bg-red-900/20 p-3 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* --- SECTION 1: PERSONAL DETAILS --- */}
              <div>
                <h3 className="text-lg font-bold text-[#c9a84c] mb-4 border-l-4 border-[#c9a84c] pl-3">
                  Personal Details & Login
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">
                      Package ID *
                    </label>
                    <input
                      disabled={modalMode === "view" || modalMode === "edit"}
                      required
                      type="text"
                      value={formData.packageId}
                      onChange={(e) =>
                        setFormData({ ...formData, packageId: e.target.value })
                      }
                      className="w-full bg-[#111] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#c9a84c] uppercase disabled:opacity-50"
                      placeholder="e.g. CIH1234567"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">
                      Account Password {modalMode === "add" && "*"}
                    </label>
                    <input
                      disabled={modalMode === "view"}
                      required={modalMode === "add"}
                      type="text"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full bg-[#111] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#c9a84c] disabled:opacity-50"
                      placeholder={
                        modalMode === "edit"
                          ? "Leave blank to keep current"
                          : "Set password"
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">
                      Full Name *
                    </label>
                    <input
                      disabled={modalMode === "view"}
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-[#111] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#c9a84c] disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">
                      Email *
                    </label>
                    <input
                      disabled={modalMode === "view"}
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-[#111] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#c9a84c] disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">
                      Date of Birth
                    </label>
                    <input
                      disabled={modalMode === "view"}
                      type="date"
                      value={formData.dob}
                      onChange={(e) =>
                        setFormData({ ...formData, dob: e.target.value })
                      }
                      className="w-full bg-[#111] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#c9a84c] disabled:opacity-50 [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">
                      Anniversary Date
                    </label>
                    <input
                      disabled={modalMode === "view"}
                      type="date"
                      value={formData.anniversaryDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          anniversaryDate: e.target.value,
                        })
                      }
                      className="w-full bg-[#111] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#c9a84c] disabled:opacity-50 [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">
                      Spouse Name
                    </label>
                    <input
                      disabled={modalMode === "view"}
                      type="text"
                      value={formData.spouseName}
                      onChange={(e) =>
                        setFormData({ ...formData, spouseName: e.target.value })
                      }
                      className="w-full bg-[#111] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#c9a84c] disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">
                      Spouse Date of Birth
                    </label>
                    <input
                      disabled={modalMode === "view"}
                      type="date"
                      value={formData.spouseDob}
                      onChange={(e) =>
                        setFormData({ ...formData, spouseDob: e.target.value })
                      }
                      className="w-full bg-[#111] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#c9a84c] disabled:opacity-50 [color-scheme:dark]"
                    />
                  </div>
                </div>
              </div>

              {/* --- SECTION 2: MEMBERSHIP & BILLING --- */}
              <div>
                <h3 className="text-lg font-bold text-[#c9a84c] mb-4 border-l-4 border-[#c9a84c] pl-3">
                  Membership & Core Billing
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">
                      Membership Category *
                    </label>
                    <input
                      disabled={modalMode === "view"}
                      required
                      type="text"
                      value={formData.membershipCategory}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          membershipCategory: e.target.value,
                        })
                      }
                      className="w-full bg-[#111] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#c9a84c] disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">
                      Duration *
                    </label>
                    <input
                      disabled={modalMode === "view"}
                      required
                      type="text"
                      value={formData.membershipDuration}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          membershipDuration: e.target.value,
                        })
                      }
                      className="w-full bg-[#111] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#c9a84c] disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">
                      Joining Date *
                    </label>
                    <input
                      disabled={modalMode === "view"}
                      required
                      type="date"
                      value={formData.joiningDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          joiningDate: e.target.value,
                        })
                      }
                      className="w-full bg-[#111] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#c9a84c] disabled:opacity-50 [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">
                      Total Membership Amt (₹) *
                    </label>
                    <input
                      disabled={modalMode === "view"}
                      required
                      type="number"
                      value={formData.membershipAmount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          membershipAmount: e.target.value,
                        })
                      }
                      className="w-full bg-[#111] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#c9a84c] disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">
                      Paid Amt (₹) *
                    </label>
                    <input
                      disabled={modalMode === "view"}
                      required
                      type="number"
                      value={formData.paidAmount}
                      onChange={(e) =>
                        setFormData({ ...formData, paidAmount: e.target.value })
                      }
                      className="w-full bg-[#111] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#c9a84c] disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-red-400 text-xs mb-1">
                      Due Amt (₹)
                    </label>
                    <input
                      disabled
                      type="number"
                      value={formData.dueAmount}
                      className="w-full bg-red-900/20 border border-red-900/50 p-2.5 rounded text-red-400 font-bold outline-none cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* --- SECTION 3: HOLIDAY DETAILS --- */}
              <div>
                <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
                  <h3 className="text-lg font-bold text-[#c9a84c]">
                    Member Holidays
                  </h3>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm text-gray-400">
                      Total Nights:{" "}
                      <input
                        type="number"
                        disabled={modalMode === "view"}
                        value={formData.totalNights}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            totalNights: Number(e.target.value),
                          })
                        }
                        className="w-16 bg-[#111] border border-gray-700 rounded p-1 text-white text-center"
                      />
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-400">
                      Used Nights:{" "}
                      <input
                        type="number"
                        disabled={modalMode === "view"}
                        value={formData.usedNights}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            usedNights: Number(e.target.value),
                          })
                        }
                        className="w-16 bg-[#111] border border-gray-700 rounded p-1 text-white text-center"
                      />
                    </label>
                    <div className="text-sm font-bold text-[#c9a84c] flex items-center">
                      Available: {formData.totalNights - formData.usedNights}
                    </div>
                  </div>
                </div>

                {formData.holidays.map((h, i) => (
                  <div
                    key={i}
                    className="flex gap-2 items-end mb-2 bg-[#111] p-2 rounded border border-gray-800"
                  >
                    <div className="w-20">
                      <label className="text-[10px] text-gray-500 block">
                        Nights
                      </label>
                      <input
                        disabled={modalMode === "view"}
                        type="number"
                        value={h.nights}
                        onChange={(e) =>
                          handleArrayChange(
                            "holidays",
                            i,
                            "nights",
                            e.target.value,
                          )
                        }
                        className="w-full bg-[#1c1c1c] text-white p-2 rounded text-sm outline-none focus:border-[#c9a84c]"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-[10px] text-gray-500 block">
                        Check In
                      </label>
                      <input
                        disabled={modalMode === "view"}
                        type="date"
                        value={h.checkIn}
                        onChange={(e) =>
                          handleArrayChange(
                            "holidays",
                            i,
                            "checkIn",
                            e.target.value,
                          )
                        }
                        className="w-full bg-[#1c1c1c] text-white p-2 rounded text-sm [color-scheme:dark]"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-[10px] text-gray-500 block">
                        Check Out
                      </label>
                      <input
                        disabled={modalMode === "view"}
                        type="date"
                        value={h.checkOut}
                        onChange={(e) =>
                          handleArrayChange(
                            "holidays",
                            i,
                            "checkOut",
                            e.target.value,
                          )
                        }
                        className="w-full bg-[#1c1c1c] text-white p-2 rounded text-sm [color-scheme:dark]"
                      />
                    </div>
                    <div className="flex-[2]">
                      <label className="text-[10px] text-gray-500 block">
                        Resort Detail
                      </label>
                      <input
                        disabled={modalMode === "view"}
                        type="text"
                        value={h.detail}
                        onChange={(e) =>
                          handleArrayChange(
                            "holidays",
                            i,
                            "detail",
                            e.target.value,
                          )
                        }
                        className="w-full bg-[#1c1c1c] text-white p-2 rounded text-sm outline-none"
                        placeholder="Goa Resort..."
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-[10px] text-gray-500 block">
                        Booked Date
                      </label>
                      <input
                        disabled={modalMode === "view"}
                        type="date"
                        value={h.bookedDate}
                        onChange={(e) =>
                          handleArrayChange(
                            "holidays",
                            i,
                            "bookedDate",
                            e.target.value,
                          )
                        }
                        className="w-full bg-[#1c1c1c] text-white p-2 rounded text-sm [color-scheme:dark]"
                      />
                    </div>
                    {modalMode !== "view" && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("holidays", i)}
                        className="p-2 text-red-500 hover:bg-red-900/20 rounded mb-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
                {modalMode !== "view" && (
                  <button
                    type="button"
                    onClick={() =>
                      addArrayItem("holidays", {
                        nights: "",
                        checkIn: "",
                        checkOut: "",
                        detail: "",
                        bookedDate: "",
                      })
                    }
                    className="mt-2 text-sm text-[#c9a84c] flex items-center gap-1 hover:text-white"
                  >
                    <Plus size={14} /> Add Holiday Record
                  </button>
                )}
              </div>

              {/* --- SECTION 4: MEMBERSHIP PAYMENT DETAILS --- */}
              <div>
                <h3 className="text-lg font-bold text-[#c9a84c] mb-2 border-b border-gray-800 pb-2">
                  Membership Payment Details
                </h3>
                {formData.membershipPayments.map((p, i) => (
                  <div
                    key={i}
                    className="flex gap-2 items-end mb-2 bg-[#111] p-2 rounded border border-gray-800"
                  >
                    <div className="flex-[1.5]">
                      <label className="text-[10px] text-gray-500 block">
                        Receipt No.
                      </label>
                      <input
                        disabled={modalMode === "view"}
                        type="text"
                        value={p.receiptNo}
                        onChange={(e) =>
                          handleArrayChange(
                            "membershipPayments",
                            i,
                            "receiptNo",
                            e.target.value,
                          )
                        }
                        className="w-full bg-[#1c1c1c] text-white p-2 rounded text-sm outline-none"
                      />
                    </div>
                    <div className="flex-[1]">
                      <label className="text-[10px] text-gray-500 block">
                        Date
                      </label>
                      <input
                        disabled={modalMode === "view"}
                        type="date"
                        value={p.receiptDate}
                        onChange={(e) =>
                          handleArrayChange(
                            "membershipPayments",
                            i,
                            "receiptDate",
                            e.target.value,
                          )
                        }
                        className="w-full bg-[#1c1c1c] text-white p-2 rounded text-sm [color-scheme:dark]"
                      />
                    </div>
                    <div className="flex-[1]">
                      <label className="text-[10px] text-gray-500 block">
                        Mode
                      </label>
                      <input
                        disabled={modalMode === "view"}
                        type="text"
                        value={p.mode}
                        onChange={(e) =>
                          handleArrayChange(
                            "membershipPayments",
                            i,
                            "mode",
                            e.target.value,
                          )
                        }
                        className="w-full bg-[#1c1c1c] text-white p-2 rounded text-sm outline-none"
                        placeholder="Debit Card"
                      />
                    </div>
                    <div className="flex-[1.5]">
                      <label className="text-[10px] text-gray-500 block">
                        Bank
                      </label>
                      <input
                        disabled={modalMode === "view"}
                        type="text"
                        value={p.bank}
                        onChange={(e) =>
                          handleArrayChange(
                            "membershipPayments",
                            i,
                            "bank",
                            e.target.value,
                          )
                        }
                        className="w-full bg-[#1c1c1c] text-white p-2 rounded text-sm outline-none"
                      />
                    </div>
                    <div className="flex-[1]">
                      <label className="text-[10px] text-gray-500 block">
                        Card/Chq No
                      </label>
                      <input
                        disabled={modalMode === "view"}
                        type="text"
                        value={p.chequeOrCardNo}
                        onChange={(e) =>
                          handleArrayChange(
                            "membershipPayments",
                            i,
                            "chequeOrCardNo",
                            e.target.value,
                          )
                        }
                        className="w-full bg-[#1c1c1c] text-white p-2 rounded text-sm outline-none"
                      />
                    </div>
                    <div className="flex-[1]">
                      <label className="text-[10px] text-gray-500 block">
                        Type
                      </label>
                      <input
                        disabled={modalMode === "view"}
                        type="text"
                        value={p.paymentType}
                        onChange={(e) =>
                          handleArrayChange(
                            "membershipPayments",
                            i,
                            "paymentType",
                            e.target.value,
                          )
                        }
                        className="w-full bg-[#1c1c1c] text-white p-2 rounded text-sm outline-none"
                      />
                    </div>
                    <div className="flex-[1]">
                      <label className="text-[10px] text-gray-500 block">
                        Amount
                      </label>
                      <input
                        disabled={modalMode === "view"}
                        type="number"
                        value={p.amount}
                        onChange={(e) =>
                          handleArrayChange(
                            "membershipPayments",
                            i,
                            "amount",
                            e.target.value,
                          )
                        }
                        className="w-full bg-[#1c1c1c] text-white p-2 rounded text-sm outline-none"
                      />
                    </div>
                    {modalMode !== "view" && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("membershipPayments", i)}
                        className="p-2 text-red-500 hover:bg-red-900/20 rounded mb-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
                {modalMode !== "view" && (
                  <button
                    type="button"
                    onClick={() =>
                      addArrayItem("membershipPayments", {
                        receiptNo: "",
                        receiptDate: "",
                        mode: "",
                        bank: "",
                        chequeOrCardNo: "",
                        paymentType: "Package Amount",
                        amount: "",
                      })
                    }
                    className="mt-2 text-sm text-[#c9a84c] flex items-center gap-1 hover:text-white"
                  >
                    <Plus size={14} /> Add Payment Record
                  </button>
                )}
              </div>

              {/* --- SECTION 5: AMC PAYMENT DETAILS --- */}
              <div>
                <h3 className="text-lg font-bold text-[#c9a84c] mb-2 border-b border-gray-800 pb-2">
                  AMC Payment Details
                </h3>
                {formData.amcPayments.map((p, i) => (
                  <div
                    key={i}
                    className="flex gap-2 items-end mb-2 bg-[#111] p-2 rounded border border-gray-800"
                  >
                    <div className="flex-[1.5]">
                      <label className="text-[10px] text-gray-500 block">
                        Receipt No.
                      </label>
                      <input
                        disabled={modalMode === "view"}
                        type="text"
                        value={p.receiptNo}
                        onChange={(e) =>
                          handleArrayChange(
                            "amcPayments",
                            i,
                            "receiptNo",
                            e.target.value,
                          )
                        }
                        className="w-full bg-[#1c1c1c] text-white p-2 rounded text-sm outline-none"
                      />
                    </div>
                    <div className="flex-[1]">
                      <label className="text-[10px] text-gray-500 block">
                        Date
                      </label>
                      <input
                        disabled={modalMode === "view"}
                        type="date"
                        value={p.receiptDate}
                        onChange={(e) =>
                          handleArrayChange(
                            "amcPayments",
                            i,
                            "receiptDate",
                            e.target.value,
                          )
                        }
                        className="w-full bg-[#1c1c1c] text-white p-2 rounded text-sm [color-scheme:dark]"
                      />
                    </div>
                    <div className="flex-[1]">
                      <label className="text-[10px] text-gray-500 block">
                        Mode
                      </label>
                      <input
                        disabled={modalMode === "view"}
                        type="text"
                        value={p.mode}
                        onChange={(e) =>
                          handleArrayChange(
                            "amcPayments",
                            i,
                            "mode",
                            e.target.value,
                          )
                        }
                        className="w-full bg-[#1c1c1c] text-white p-2 rounded text-sm outline-none"
                      />
                    </div>
                    <div className="flex-[1.5]">
                      <label className="text-[10px] text-gray-500 block">
                        Bank
                      </label>
                      <input
                        disabled={modalMode === "view"}
                        type="text"
                        value={p.bank}
                        onChange={(e) =>
                          handleArrayChange(
                            "amcPayments",
                            i,
                            "bank",
                            e.target.value,
                          )
                        }
                        className="w-full bg-[#1c1c1c] text-white p-2 rounded text-sm outline-none"
                      />
                    </div>
                    <div className="flex-[1]">
                      <label className="text-[10px] text-gray-500 block">
                        Card/Chq No
                      </label>
                      <input
                        disabled={modalMode === "view"}
                        type="text"
                        value={p.chequeOrCardNo}
                        onChange={(e) =>
                          handleArrayChange(
                            "amcPayments",
                            i,
                            "chequeOrCardNo",
                            e.target.value,
                          )
                        }
                        className="w-full bg-[#1c1c1c] text-white p-2 rounded text-sm outline-none"
                      />
                    </div>
                    <div className="flex-[1]">
                      <label className="text-[10px] text-gray-500 block">
                        Type
                      </label>
                      <input
                        disabled={modalMode === "view"}
                        type="text"
                        value={p.paymentType}
                        onChange={(e) =>
                          handleArrayChange(
                            "amcPayments",
                            i,
                            "paymentType",
                            e.target.value,
                          )
                        }
                        className="w-full bg-[#1c1c1c] text-white p-2 rounded text-sm outline-none"
                      />
                    </div>
                    <div className="flex-[1]">
                      <label className="text-[10px] text-gray-500 block">
                        Amount
                      </label>
                      <input
                        disabled={modalMode === "view"}
                        type="number"
                        value={p.amount}
                        onChange={(e) =>
                          handleArrayChange(
                            "amcPayments",
                            i,
                            "amount",
                            e.target.value,
                          )
                        }
                        className="w-full bg-[#1c1c1c] text-white p-2 rounded text-sm outline-none"
                      />
                    </div>
                    {modalMode !== "view" && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("amcPayments", i)}
                        className="p-2 text-red-500 hover:bg-red-900/20 rounded mb-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
                {modalMode !== "view" && (
                  <button
                    type="button"
                    onClick={() =>
                      addArrayItem("amcPayments", {
                        receiptNo: "",
                        receiptDate: "",
                        mode: "",
                        bank: "",
                        chequeOrCardNo: "",
                        paymentType: "AMC",
                        amount: "",
                      })
                    }
                    className="mt-2 text-sm text-[#c9a84c] flex items-center gap-1 hover:text-white"
                  >
                    <Plus size={14} /> Add AMC Record
                  </button>
                )}
              </div>

              {/* --- SECTION 6: OFFERS --- */}
              <div>
                <h3 className="text-lg font-bold text-[#c9a84c] mb-2 border-b border-gray-800 pb-2">
                  Offers
                </h3>
                {formData.offers.map((o, i) => (
                  <div
                    key={i}
                    className="flex gap-2 items-end mb-2 bg-[#111] p-2 rounded border border-gray-800"
                  >
                    <div className="flex-[2]">
                      <label className="text-[10px] text-gray-500 block">
                        Offer Details
                      </label>
                      <input
                        disabled={modalMode === "view"}
                        type="text"
                        value={o.offerName}
                        onChange={(e) =>
                          handleArrayChange(
                            "offers",
                            i,
                            "offerName",
                            e.target.value,
                          )
                        }
                        className="w-full bg-[#1c1c1c] text-white p-2 rounded text-sm outline-none"
                        placeholder="1 NIGHT IN INDIA..."
                      />
                    </div>
                    <div className="flex-[1]">
                      <label className="text-[10px] text-gray-500 block">
                        Validity Date
                      </label>
                      <input
                        disabled={modalMode === "view"}
                        type="date"
                        value={o.validity}
                        onChange={(e) =>
                          handleArrayChange(
                            "offers",
                            i,
                            "validity",
                            e.target.value,
                          )
                        }
                        className="w-full bg-[#1c1c1c] text-white p-2 rounded text-sm [color-scheme:dark]"
                      />
                    </div>
                    <div className="flex-[1]">
                      <label className="text-[10px] text-gray-500 block">
                        Status
                      </label>
                      <select
                        disabled={modalMode === "view"}
                        value={o.availability}
                        onChange={(e) =>
                          handleArrayChange(
                            "offers",
                            i,
                            "availability",
                            e.target.value,
                          )
                        }
                        className="w-full bg-[#1c1c1c] text-white p-2 rounded text-sm outline-none border border-transparent focus:border-[#c9a84c]"
                      >
                        <option value="Active">Active</option>
                        <option value="Expired">Expired</option>
                        <option value="Used">Used</option>
                      </select>
                    </div>
                    {modalMode !== "view" && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("offers", i)}
                        className="p-2 text-red-500 hover:bg-red-900/20 rounded mb-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
                {modalMode !== "view" && (
                  <button
                    type="button"
                    onClick={() =>
                      addArrayItem("offers", {
                        offerName: "",
                        validity: "",
                        availability: "Active",
                      })
                    }
                    className="mt-2 text-sm text-[#c9a84c] flex items-center gap-1 hover:text-white"
                  >
                    <Plus size={14} /> Add Offer
                  </button>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              {modalMode !== "view" && (
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-[#c9a84c] text-black font-bold py-4 rounded-xl hover:bg-yellow-500 disabled:opacity-50 mt-4 transition text-lg"
                >
                  {isSubmitting
                    ? "Processing..."
                    : modalMode === "edit"
                      ? "Update Member"
                      : "Save Member Details"}
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
