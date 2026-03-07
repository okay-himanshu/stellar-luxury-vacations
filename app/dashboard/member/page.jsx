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
  };

  const [formData, setFormData] = useState(initialForm);
  const token = localStorage.getItem("token");

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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  // Initial load and Page Change
  useEffect(() => {
    fetchData(currentPage, searchTerm);
  }, [currentPage]);

  // --- LODASH DEBOUNCE SEARCH ---
  // Using useCallback to ensure the debounced function is not recreated on every render
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

  // Format date for display in table
  const displayDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
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
        password: "", // Always clear password on edit open for security
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
      });
    } else {
      setEditId(null);
      // Auto Assign Package ID text for new member (Actual ID generated on backend)
      setFormData({ ...initialForm, packageId: "Auto-Generated on Save" });
    }
    setIsFormModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this member?")) return;
    try {
      await axios.delete(`/api/members?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post("/api/members", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <UserCheck className="text-[#c9a84c]" size={32} /> User Memberships
        </h1>

        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Debounced Search Bar */}
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

          {/* Pagination */}
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
          FORM MODAL
          ========================================== */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1c1c1c] border border-gray-800 rounded-xl w-full max-w-5xl p-6 relative max-h-[90vh] overflow-y-auto custom-scrollbar">
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

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* --- SECTION 1: PERSONAL DETAILS --- */}
              <div>
                <h3 className="text-lg font-bold text-[#c9a84c] mb-4 bg-[#111] p-2 rounded">
                  Personal Details & Login
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">
                      Package ID *
                    </label>
                    <input
                      disabled
                      type="text"
                      value={formData.packageId}
                      className="w-full bg-[#111] border border-gray-700 p-2.5 rounded text-white outline-none cursor-not-allowed uppercase font-bold text-[#c9a84c]"
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
                          : "Set user password"
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

                  {/* NOTE: [color-scheme:dark] class added to fix black icon on dark mode */}
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
                  <div className="md:col-span-1">
                    <label className="block text-gray-400 text-xs mb-1">
                      Children Details
                    </label>
                    <input
                      disabled={modalMode === "view"}
                      type="text"
                      value={formData.childrenDetails}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          childrenDetails: e.target.value,
                        })
                      }
                      className="w-full bg-[#111] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#c9a84c] disabled:opacity-50"
                      placeholder="e.g. No Children"
                    />
                  </div>
                </div>
              </div>

              {/* --- SECTION 2: CONTACT DETAILS --- */}
              <div>
                <h3 className="text-lg font-bold text-[#c9a84c] mb-4 bg-[#111] p-2 rounded">
                  Contact Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">
                      Phone *
                    </label>
                    <input
                      disabled={modalMode === "view"}
                      required
                      type="text"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-[#111] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#c9a84c] disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">
                      Alternate Phone
                    </label>
                    <input
                      disabled={modalMode === "view"}
                      type="text"
                      value={formData.alternatePhone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          alternatePhone: e.target.value,
                        })
                      }
                      className="w-full bg-[#111] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#c9a84c] disabled:opacity-50"
                    />
                  </div>
                  <div className="md:col-span-3">
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
                      className="w-full bg-[#111] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#c9a84c] disabled:opacity-50"
                      placeholder="e.g. A-2 Gayatri Vihar..."
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">
                      City
                    </label>
                    <input
                      disabled={modalMode === "view"}
                      type="text"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className="w-full bg-[#111] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#c9a84c] disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">
                      State
                    </label>
                    <input
                      disabled={modalMode === "view"}
                      type="text"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
                      }
                      className="w-full bg-[#111] border border-gray-700 p-2.5 rounded text-white outline-none focus:border-[#c9a84c] disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* --- SECTION 3: MEMBERSHIP DETAILS --- */}
              <div>
                <h3 className="text-lg font-bold text-[#c9a84c] mb-4 bg-[#111] p-2 rounded">
                  Membership Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      placeholder="e.g. Studio"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">
                      Membership Duration *
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
                      placeholder="e.g. 5 Year"
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
                      Membership Amount (₹) *
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
                      Paid Amount (₹) *
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
                      Due Amount (₹) - Auto Calculated
                    </label>
                    <input
                      disabled
                      type="number"
                      value={formData.dueAmount}
                      className="w-full bg-red-900/20 border border-red-900/50 p-2.5 rounded text-red-400 outline-none cursor-not-allowed font-bold"
                    />
                  </div>
                </div>
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
