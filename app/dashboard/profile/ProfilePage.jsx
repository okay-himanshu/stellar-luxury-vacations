"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Printer } from "lucide-react";

export default function ProfileClient() {
  const [currentRole, setCurrentRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "user";
    setCurrentRole(role);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-4xl animate-pulse">
        <div className="h-8 bg-gray-800 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-800 rounded w-72 mb-8"></div>
        <div className="bg-[#141414] border border-gray-800 rounded-2xl h-96"></div>
      </div>
    );
  }

  const isMember = currentRole === "member" || currentRole === "user";

  return (
    <div className="max-w-4xl">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @media print {
            body * {
              visibility: hidden;
            }
            #printable-profile, #printable-profile * {
              visibility: visible;
              color: #000 !important;
            }
            #printable-profile {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              background: #fff !important;
              box-shadow: none !important;
              border: none !important;
            }
            .print-row-even {
              background-color: #f9fafb !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .print-row-odd {
              background-color: #ffffff !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .print-header {
              background-color: #f3f4f6 !important;
              border-bottom: 1px solid #e5e7eb !important;
              border-left: 4px solid #374151 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .print-hidden {
              display: none !important;
            }
          }
        `,
        }}
      />

      <div className="mb-8 print-hidden">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white tracking-tight">
          Member Profile
        </h1>
        <p className="text-gray-400">View your complete membership details.</p>
      </div>

      {isMember ? (
        <MemberProfileView />
      ) : (
        <div className="p-8 bg-[#141414] border border-gray-800 rounded-2xl text-center text-gray-500">
          This profile view is only available for registered members.
        </div>
      )}
    </div>
  );
}

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

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-[#141414] border border-gray-800 rounded-2xl print-hidden">
        <div className="w-10 h-10 border-4 border-gray-700 border-t-white rounded-full animate-spin mb-4"></div>
        <p className="font-medium text-gray-400 tracking-wide">
          Loading your profile data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-400 font-medium bg-red-900/10 border border-red-900/30 rounded-2xl print-hidden">
        {error}
      </div>
    );
  }

  if (!profile) return null;

  const DataRow = ({ label, value, isEven }) => (
    <div
      className={`flex py-3.5 px-5 text-sm md:text-[15px] transition-colors duration-200 ${
        isEven ? "bg-[#1a1a1a] print-row-even" : "bg-[#111111] print-row-odd"
      }`}
    >
      <div className="w-[45%] md:w-[35%] font-medium text-gray-400">
        {label}
      </div>
      <div className="w-[5%] text-gray-600 text-center">:</div>
      <div className="w-[50%] md:w-[60%] font-semibold text-gray-100">
        {value || "—"}
      </div>
    </div>
  );

  const SectionHeader = ({ title }) => (
    <div className="print-header bg-[#141414] border-b border-gray-800 border-l-4 border-l-gray-300 px-5 py-4 mt-6 first:mt-0">
      <h3 className="text-gray-200 font-bold uppercase text-xs md:text-sm tracking-[0.15em]">
        {title}
      </h3>
    </div>
  );

  return (
    <div
      className="relative w-full bg-[#111111] border border-gray-800 rounded-2xl overflow-hidden"
      id="printable-profile"
    >
      <div className="absolute top-4 right-4 z-10 print-hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#222222] text-gray-300 border border-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
        >
          <Printer size={16} />
          Download / Print
        </button>
      </div>

      <div className="flex flex-col">
        <SectionHeader title="Personal Details" />
        <DataRow label="Package ID" value={profile.packageId} isEven={true} />
        <DataRow label="Name" value={profile.name} isEven={false} />
        <DataRow label="Email" value={profile.email} isEven={true} />
        <DataRow
          label="Date of birth"
          value={formatDate(profile.dob)}
          isEven={false}
        />
        <DataRow
          label="Anniversary Date"
          value={formatDate(profile.anniversaryDate)}
          isEven={true}
        />
        <DataRow
          label="Spouse Name"
          value={profile.spouseName}
          isEven={false}
        />
        <DataRow
          label="Spouse Date of birth"
          value={formatDate(profile.spouseDob)}
          isEven={true}
        />
      </div>

      <div className="flex flex-col">
        <SectionHeader title="Children Details" />
        <div className="bg-[#1a1a1a] print-row-even text-gray-300 py-4 px-5 text-sm md:text-[15px] font-medium leading-relaxed">
          {profile.childrenDetails || "No Children Details Provided"}
        </div>
      </div>

      <div className="flex flex-col">
        <SectionHeader title="Contact Details" />
        <DataRow label="Phone" value={profile.phone} isEven={true} />
        <DataRow
          label="Alternate Phone"
          value={profile.alternatePhone}
          isEven={false}
        />
        <DataRow label="Address" value={profile.address} isEven={true} />
        <DataRow label="City" value={profile.city} isEven={false} />
        <DataRow label="State" value={profile.state} isEven={true} />
      </div>

      <div className="flex flex-col">
        <SectionHeader title="Membership Details" />
        <DataRow
          label="Membership Category"
          value={profile.membershipCategory}
          isEven={true}
        />
        <DataRow
          label="Membership Duration"
          value={profile.membershipDuration}
          isEven={false}
        />

        <DataRow
          label="Membership Amount"
          value={
            profile.membershipAmount
              ? `₹ ${Number(profile.membershipAmount).toLocaleString("en-IN")}`
              : "—"
          }
          isEven={true}
        />
        <DataRow
          label="Paid Amount"
          value={
            profile.paidAmount
              ? `₹ ${Number(profile.paidAmount).toLocaleString("en-IN")}`
              : "—"
          }
          isEven={false}
        />
        <DataRow
          label="Due Amount"
          value={
            profile.dueAmount
              ? `₹ ${Number(profile.dueAmount).toLocaleString("en-IN")}`
              : "—"
          }
          isEven={true}
        />

        <DataRow
          label="Joining Date"
          value={formatDate(profile.joiningDate)}
          isEven={false}
        />
      </div>
    </div>
  );
}
