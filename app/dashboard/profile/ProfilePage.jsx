"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { User, Shield, Key, CreditCard } from "lucide-react";

export default function ProfileClient() {
  const [currentRole, setCurrentRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("Loading...");

  useEffect(() => {
    // LocalStorage se role nikalna (Ensure "member" is handled)
    const role = localStorage.getItem("userRole") || "user";
    setCurrentRole(role);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-4xl animate-pulse">
        <div className="h-8 bg-gray-800 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-800 rounded w-72 mb-8"></div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[#1c1c1c] border border-gray-800 rounded-xl h-40"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // Roles access logic
  const isUserOrMember = ["admin", "editor", "user", "member"].includes(
    currentRole,
  );
  const isAdminOrUser = ["admin", "user", "member"].includes(currentRole);
  const isAdmin = currentRole === "admin";
  const isMember = currentRole === "member" || currentRole === "user";

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
      <p className="text-gray-400 mb-8">
        Manage your account settings and preferences.
      </p>

      <div className="space-y-6">
        {/* ─── 1. PERSONAL INFO (DYNAMIC SECTION) ─── */}
        {isUserOrMember && (
          <div className="bg-[#1c1c1c] border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-800 flex items-start gap-4">
              <div className="p-3 bg-gray-800 rounded-lg text-[#c9a84c]">
                <User size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {isMember ? "Membership Details" : "Personal Information"}
                </h3>
                <p className="text-gray-400 text-sm">
                  {isMember
                    ? "Your complete Royal Savoy profile."
                    : "Update your personal details."}
                </p>
              </div>
            </div>

            {/* DYNAMIC BODY: Member vs Admin */}
            <div className="p-6 bg-[#111]">
              {isMember ? (
                <MemberProfileView />
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="bg-[#1c1c1c] border border-gray-700 text-white p-3 rounded-lg w-full focus:border-[#c9a84c] outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="bg-[#1c1c1c] border border-gray-700 text-gray-400 p-3 rounded-lg w-full cursor-not-allowed"
                    defaultValue="admin@royal.com"
                    disabled
                  />
                  <button
                    type="button"
                    onClick={() => console.log("Saving:", name)}
                    className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition md:col-span-2 w-fit"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── 2. SECURITY ─── */}
        {isUserOrMember && (
          <div className="bg-[#1c1c1c] border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-800 flex items-start gap-4">
              <div className="p-3 bg-gray-800 rounded-lg text-[#c9a84c]">
                <Key size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Login & Security
                </h3>
                <p className="text-gray-400 text-sm">
                  Change password and 2FA settings.
                </p>
              </div>
            </div>
            <div className="p-6 bg-[#111]">
              <div className="flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => console.log("Change password")}
                  className="flex items-center justify-between bg-[#1c1c1c] border border-gray-700 p-4 rounded-lg hover:border-white transition group"
                >
                  <span className="text-gray-300">Change Password</span>
                  <span className="text-sm bg-gray-800 px-3 py-1 rounded text-white group-hover:bg-[#c9a84c] group-hover:text-black">
                    Update
                  </span>
                </button>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  2-Factor Authentication is Enabled
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── 3. BILLING ─── */}
        {isAdminOrUser &&
          !isMember && ( // Member ki billing unki profile me dikh rahi hai
            <div className="bg-[#1c1c1c] border border-gray-800 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-gray-800 flex items-start gap-4">
                <div className="p-3 bg-gray-800 rounded-lg text-[#c9a84c]">
                  <CreditCard size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Billing & Plans
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Manage membership plans and invoices.
                  </p>
                </div>
              </div>
              <div className="p-6 bg-[#111]">
                <div className="p-4 bg-gray-900/50 rounded-lg border border-dashed border-gray-700 text-center">
                  <p className="text-gray-300 mb-2">
                    Current Plan:{" "}
                    <span className="text-[#c9a84c] font-bold">Gold Admin</span>
                  </p>
                  <button
                    type="button"
                    className="text-sm underline text-blue-400"
                  >
                    View Invoice History
                  </button>
                </div>
              </div>
            </div>
          )}

        {/* ─── 4. ADMIN ZONE ─── */}
        {isAdmin && (
          <div className="bg-[#1c1c1c] border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-800 flex items-start gap-4">
              <div className="p-3 bg-gray-800 rounded-lg text-[#c9a84c]">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Admin Controls</h3>
                <p className="text-gray-400 text-sm">
                  Global system settings and user roles.
                </p>
              </div>
            </div>
            <div className="p-6 bg-[#111]">
              <div className="bg-red-900/10 border border-red-900/30 p-4 rounded-lg">
                <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                  <Shield size={16} /> Restricted Area
                </h4>
                <p className="text-gray-400 text-sm mb-4">
                  You have super-admin privileges. You can manage global API
                  keys and User Roles here.
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="bg-red-600 text-white px-4 py-2 rounded text-xs font-bold hover:bg-red-700"
                  >
                    Manage Roles
                  </button>
                  <button
                    type="button"
                    className="bg-gray-700 text-white px-4 py-2 rounded text-xs font-bold hover:bg-gray-600"
                  >
                    View System Logs
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// SUB-COMPONENT: MEMBER DETAILED PROFILE
// ==========================================

function MemberProfileView() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setProfile(res.data.data);
        }
      } catch (err) {
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  if (loading) {
    return (
      <div className="text-center py-10 font-bold text-[#c9a84c] animate-pulse">
        Loading your profile data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 font-bold">{error}</div>
    );
  }

  if (!profile) return null;

  // Reusable Row Component
  const DataRow = ({ label, value, isDark }) => (
    <div
      className={`flex py-2.5 px-4 text-sm md:text-base ${isDark ? "bg-[#ebe4d3]" : "bg-[#f4f0e6]"} text-[#222]`}
    >
      <div className="w-[35%] md:w-[25%] font-semibold">{label}</div>
      <div className="w-[5%] text-center">:</div>
      <div className="w-[60%] md:w-[70%] font-medium">{value || "-"}</div>
    </div>
  );

  // Section Header Component
  const SectionHeader = ({ title }) => (
    <div className="bg-[#a47b35] text-black font-bold px-4 py-2.5 uppercase text-sm tracking-wide">
      {title}
    </div>
  );

  return (
    <div className="w-full shadow-lg border border-gray-300 rounded overflow-hidden">
      {/* 1. PERSONAL DETAILS */}
      <div className="flex flex-col">
        <SectionHeader title="Personal Details" />
        <DataRow label="Package ID" value={profile.packageId} isDark={false} />
        <DataRow label="Name" value={profile.name} isDark={true} />
        <DataRow label="Email" value={profile.email} isDark={false} />
        <DataRow
          label="Date of birth"
          value={formatDate(profile.dob)}
          isDark={true}
        />
        <DataRow
          label="Anniversary Date"
          value={formatDate(profile.anniversaryDate)}
          isDark={false}
        />
        <DataRow label="Spouse Name" value={profile.spouseName} isDark={true} />
        <DataRow
          label="Spouse Date of birth"
          value={formatDate(profile.spouseDob)}
          isDark={false}
        />
      </div>

      {/* 2. CHILDREN DETAILS */}
      <div className="flex flex-col border-t border-white">
        <SectionHeader title="Children Details" />
        <div className="bg-[#f4f0e6] text-[#222] py-2.5 px-4 text-sm md:text-base font-medium">
          {profile.childrenDetails || "No Children"}
        </div>
      </div>

      {/* 3. CONTACT DETAILS */}
      <div className="flex flex-col border-t border-white">
        <SectionHeader title="Contact Details" />
        <DataRow label="Phone" value={profile.phone} isDark={false} />
        <DataRow
          label="Alternate Phone"
          value={profile.alternatePhone}
          isDark={true}
        />
        <DataRow label="Address" value={profile.address} isDark={false} />
        <DataRow label="City" value={profile.city} isDark={true} />
        <DataRow label="State" value={profile.state} isDark={false} />
      </div>

      {/* 4. MEMBERSHIP DETAILS */}
      <div className="flex flex-col border-t border-white">
        <SectionHeader title="Membership Details" />
        <DataRow
          label="Membership Category"
          value={profile.membershipCategory}
          isDark={false}
        />
        <DataRow
          label="Membership Duration"
          value={profile.membershipDuration}
          isDark={true}
        />
        <DataRow
          label="Membership Amount"
          value={`₹${profile.membershipAmount}`}
          isDark={false}
        />
        <DataRow
          label="Paid Amount"
          value={`₹${profile.paidAmount}`}
          isDark={true}
        />
        <DataRow
          label="Due Amount"
          value={`₹${profile.dueAmount}`}
          isDark={false}
        />
        <DataRow
          label="Joining Date"
          value={formatDate(profile.joiningDate)}
          isDark={true}
        />
      </div>
    </div>
  );
}
