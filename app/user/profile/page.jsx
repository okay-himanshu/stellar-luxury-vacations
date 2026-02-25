"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function UserProfilePage() {
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
    return new Date(dateString).toLocaleDateString("en-GB", options); // e.g., 21 May, 1985
  };

  if (loading)
    return (
      <div className="text-center mt-20 font-bold text-gray-500">
        Loading your profile...
      </div>
    );
  if (error)
    return (
      <div className="text-center mt-20 text-red-500 font-bold">{error}</div>
    );
  if (!profile) return null;

  // Reusable Row Component for the exact screenshot look
  const DataRow = ({ label, value, isDark }) => (
    <div
      className={`flex py-3 px-4 ${isDark ? "bg-[#ebe4d3]" : "bg-[#f4f0e6]"} text-[#222]`}
    >
      <div className="w-[30%] md:w-[25%] font-medium">{label}</div>
      <div className="w-[5%] text-center">:</div>
      <div className="w-[65%] md:w-[70%]">{value || "-"}</div>
    </div>
  );

  // Section Header Component
  const SectionHeader = ({ title }) => (
    <div className="bg-[#a47b35] text-black font-bold px-4 py-3 uppercase text-sm md:text-base tracking-wide">
      {title}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto shadow-xl border border-gray-300">
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
        <div className="bg-[#f4f0e6] text-[#222] py-3 px-4">
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
          value={profile.membershipAmount}
          isDark={false}
        />
        <DataRow label="Paid Amount" value={profile.paidAmount} isDark={true} />
        <DataRow label="Due Amount" value={profile.dueAmount} isDark={false} />
        <DataRow
          label="Joining Date"
          value={formatDate(profile.joiningDate)}
          isDark={true}
        />
      </div>
    </div>
  );
}
