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
              margin-top: 20px !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .print-gold-header {
              background-color: #c9a84c !important;
              color: #000 !important;
              margin-top: 24px !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .print-hidden {
              display: none !important;
            }
            .print-show-all {
              display: block !important;
              opacity: 1 !important;
              visibility: visible !important;
              height: auto !important;
              overflow: visible !important;
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
  const [activeTab, setActiveTab] = useState("personal");

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
    if (!dateString) return "—";
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return "—";
    return `Rs. ${Number(amount).toLocaleString("en-IN")}.00/-`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-[#141414] border border-gray-800 rounded-2xl print-hidden">
        <div className="w-10 h-10 border-4 border-[#c9a84c] border-t-transparent rounded-full animate-spin mb-4"></div>
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
    <div className="print-header bg-[#141414] border-b border-gray-800 border-l-4 border-l-[#c9a84c] px-5 py-4 mt-6 first:mt-0">
      <h3 className="text-[#c9a84c] font-bold uppercase text-xs md:text-sm tracking-[0.15em]">
        {title}
      </h3>
    </div>
  );

  const tabs = [
    { id: "personal", label: "Personal Info" },
    { id: "membership", label: "Membership" },
    { id: "holidays", label: "Holidays" },
    { id: "payments", label: "Payments" },
    { id: "offers", label: "Offers" },
  ];

  return (
    <div
      className="relative w-full bg-[#111111] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl pb-10"
      id="printable-profile"
    >
      {/* ── TOP ACTION BAR ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b border-gray-800 print-hidden gap-4">
        
        {/* TABS NAVIGATION */}
        <div className="flex overflow-x-auto w-full custom-scrollbar gap-2 pb-2 md:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 whitespace-nowrap rounded-lg font-bold text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-[#c9a84c] text-black shadow-[0_0_15px_rgba(201,168,76,0.3)]"
                  : "bg-transparent text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* PRINT BUTTON */}
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 shrink-0 bg-[#1a1a1a] hover:bg-[#c9a84c] hover:text-black text-[#c9a84c] border border-[#c9a84c] px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-300"
        >
          <Printer size={16} />
          Print Profile
        </button>
      </div>

      {/* NOTE: Classes `hidden print-show-all` are used so that inactive tabs 
        are hidden on the screen but forcefully shown when printing the document.
      */}

      {/* ==========================================
          TAB 1: PERSONAL INFO
          ========================================== */}
      <div className={`${activeTab === "personal" ? "block" : "hidden"} print-show-all animate-in fade-in duration-500`}>
        <div className="flex flex-col">
          <SectionHeader title="Personal Details" />
          <DataRow label="Package ID" value={profile.packageId} isEven={true} />
          <DataRow label="Name" value={profile.name} isEven={false} />
          <DataRow label="Email" value={profile.email} isEven={true} />
          <DataRow label="Date of birth" value={formatDate(profile.dob)} isEven={false} />
          <DataRow label="Anniversary Date" value={formatDate(profile.anniversaryDate)} isEven={true} />
          <DataRow label="Spouse Name" value={profile.spouseName} isEven={false} />
          <DataRow label="Spouse Date of birth" value={formatDate(profile.spouseDob)} isEven={true} />
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
          <DataRow label="Alternate Phone" value={profile.alternatePhone} isEven={false} />
          <DataRow label="Address" value={profile.address} isEven={true} />
          <DataRow label="City" value={profile.city} isEven={false} />
          <DataRow label="State" value={profile.state} isEven={true} />
        </div>
      </div>

      {/* ==========================================
          TAB 2: MEMBERSHIP DETAILS
          ========================================== */}
      <div className={`${activeTab === "membership" ? "block" : "hidden"} print-show-all animate-in fade-in duration-500`}>
        <div className="flex flex-col">
          <SectionHeader title="Membership Summary" />
          <DataRow label="Membership Category" value={profile.membershipCategory} isEven={true} />
          <DataRow label="Membership Duration" value={profile.membershipDuration} isEven={false} />
          <DataRow label="Joining Date" value={formatDate(profile.joiningDate)} isEven={true} />
          <DataRow
            label="Membership Amount"
            value={profile.membershipAmount ? formatCurrency(profile.membershipAmount) : "—"}
            isEven={false}
          />
          <DataRow
            label="Paid Amount"
            value={profile.paidAmount ? formatCurrency(profile.paidAmount) : "—"}
            isEven={true}
          />
          <DataRow
            label="Due Amount"
            value={profile.dueAmount ? formatCurrency(profile.dueAmount) : "—"}
            isEven={false}
          />
        </div>
      </div>

      {/* ==========================================
          TAB 3: HOLIDAYS
          ========================================== */}
      <div className={`${activeTab === "holidays" ? "block" : "hidden"} print-show-all animate-in fade-in duration-500`}>
        <div className="mt-6 px-5">
          <div className="print-gold-header bg-[#a67c00] bg-gradient-to-r from-[#8a6300] to-[#c9a84c] text-black px-4 py-3 rounded-t-lg flex flex-col md:flex-row md:justify-between items-start md:items-center">
            <h3 className="font-bold text-sm tracking-wide">MEMBER HOLIDAYS</h3>
            <h3 className="font-bold text-sm tracking-wide mt-1 md:mt-0">
              TOTAL NIGHTS : {profile.totalNights || 0}, USED NIGHTS : {profile.usedNights || 0}, AVAILABLE NIGHTS : {(profile.totalNights || 0) - (profile.usedNights || 0)}
            </h3>
          </div>
          <div className="overflow-x-auto bg-[#f8f5f0] text-black rounded-b-lg border border-[#c9a84c]/30">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-300">
                <tr>
                  <th className="p-3 font-bold">Holidays</th>
                  <th className="p-3 font-bold">Check In</th>
                  <th className="p-3 font-bold">Check Out</th>
                  <th className="p-3 font-bold">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {profile.holidays?.length > 0 ? (
                  profile.holidays.map((holiday, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-[#fcfbf9]"}>
                      <td className="p-3 font-medium">{holiday.nights} Nights</td>
                      <td className="p-3">{formatDate(holiday.checkIn)}</td>
                      <td className="p-3">{formatDate(holiday.checkOut)}</td>
                      <td className="p-3">
                        <p>{holiday.detail}</p>
                        <p className="font-bold text-xs mt-1 text-gray-600">Booked Date : {formatDate(holiday.bookedDate)}</p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-gray-500 bg-white">No holidays booked yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ==========================================
          TAB 4: PAYMENTS
          ========================================== */}
      <div className={`${activeTab === "payments" ? "block" : "hidden"} print-show-all animate-in fade-in duration-500`}>
        
        {/* MEMBERSHIP PAYMENTS TABLE */}
        <div className="mt-6 px-5">
          <div className="print-gold-header bg-[#a67c00] bg-gradient-to-r from-[#8a6300] to-[#c9a84c] text-black px-4 py-3 rounded-t-lg">
            <h3 className="font-bold text-sm tracking-wide">MEMBERSHIP PAYMENT DETAILS</h3>
          </div>
          <div className="overflow-x-auto bg-[#f8f5f0] text-black rounded-b-lg border border-[#c9a84c]/30">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="border-b border-gray-300">
                <tr>
                  <th className="p-3 font-bold">S. No.</th>
                  <th className="p-3 font-bold">Receipt No.</th>
                  <th className="p-3 font-bold">Receipt Date</th>
                  <th className="p-3 font-bold">Mode</th>
                  <th className="p-3 font-bold">Bank</th>
                  <th className="p-3 font-bold">Chq/Card No</th>
                  <th className="p-3 font-bold">Payment Type</th>
                  <th className="p-3 font-bold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {profile.membershipPayments?.length > 0 ? (
                  profile.membershipPayments.map((payment, idx) => (
                    <tr key={idx} className="bg-white">
                      <td className="p-3 text-center">{idx + 1}</td>
                      <td className="p-3">{payment.receiptNo}</td>
                      <td className="p-3">{formatDate(payment.receiptDate)}</td>
                      <td className="p-3">{payment.mode}</td>
                      <td className="p-3">{payment.bank}</td>
                      <td className="p-3">{payment.chequeOrCardNo}</td>
                      <td className="p-3">{payment.paymentType}</td>
                      <td className="p-3">{payment.amount ? `${payment.amount}.00/-` : "—"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-4 text-center text-gray-500 bg-white">No membership payments found</td>
                  </tr>
                )}
              </tbody>
              <tfoot className="bg-[#f4f1ea]">
                <tr>
                  <td colSpan="8" className="p-4 text-right">
                    <div className="flex flex-col gap-1 items-end text-[13px]">
                      <p><span className="font-bold text-gray-700">Total Membership Fee: </span> {formatCurrency(profile.membershipAmount)}</p>
                      <p><span className="font-bold text-gray-700">Amount Paid: </span> {formatCurrency(profile.paidAmount)}</p>
                      <p><span className="font-bold text-gray-700">Amount Due: </span> <span className="text-red-600 font-bold">{formatCurrency(profile.dueAmount)}</span></p>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* AMC PAYMENTS TABLE */}
        <div className="mt-8 px-5">
          <div className="print-gold-header bg-[#a67c00] bg-gradient-to-r from-[#8a6300] to-[#c9a84c] text-black px-4 py-3 rounded-t-lg">
            <h3 className="font-bold text-sm tracking-wide">AMC PAYMENT DETAILS</h3>
          </div>
          <div className="overflow-x-auto bg-[#f8f5f0] text-black rounded-b-lg border border-[#c9a84c]/30">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="border-b border-gray-300">
                <tr>
                  <th className="p-3 font-bold">S. No.</th>
                  <th className="p-3 font-bold">Receipt No.</th>
                  <th className="p-3 font-bold">Receipt Date</th>
                  <th className="p-3 font-bold">Mode</th>
                  <th className="p-3 font-bold">Bank</th>
                  <th className="p-3 font-bold">Chq/Card No</th>
                  <th className="p-3 font-bold">Payment Type</th>
                  <th className="p-3 font-bold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {profile.amcPayments?.length > 0 ? (
                  profile.amcPayments.map((payment, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-[#fcfbf9]"}>
                      <td className="p-3 text-center">{idx + 1}</td>
                      <td className="p-3">{payment.receiptNo}</td>
                      <td className="p-3">{formatDate(payment.receiptDate)}</td>
                      <td className="p-3">{payment.mode}</td>
                      <td className="p-3">{payment.bank}</td>
                      <td className="p-3">{payment.chequeOrCardNo}</td>
                      <td className="p-3">{payment.paymentType}</td>
                      <td className="p-3">{payment.amount ? `${payment.amount}/-` : "—"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-4 text-center text-gray-600 bg-[#f4f1ea]">No AMC payments found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ==========================================
          TAB 5: OFFERS
          ========================================== */}
      <div className={`${activeTab === "offers" ? "block" : "hidden"} print-show-all animate-in fade-in duration-500`}>
        <div className="mt-6 px-5">
          <div className="print-gold-header bg-[#a67c00] bg-gradient-to-r from-[#8a6300] to-[#c9a84c] text-black px-4 py-3 rounded-t-lg">
            <h3 className="font-bold text-sm tracking-wide">AVAILABLE OFFERS</h3>
          </div>
          <div className="overflow-x-auto bg-[#f8f5f0] text-black rounded-b-lg border border-[#c9a84c]/30">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-300">
                <tr>
                  <th className="p-3 font-bold w-[60%]">Offers</th>
                  <th className="p-3 font-bold w-[20%]">Validity</th>
                  <th className="p-3 font-bold w-[20%]">Availability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {profile.offers?.length > 0 ? (
                  profile.offers.map((offer, idx) => {
                    // Dynamic Badge Styling Logic
                    let badgeClass = "bg-black text-white px-4 py-1.5 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wider";
                    
                    if (offer.availability?.toLowerCase() === "active") {
                      badgeClass = "bg-black text-green-400 border border-green-500/30 px-4 py-1.5 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(74,222,128,0.2)]";
                    } else if (offer.availability?.toLowerCase() === "expired") {
                      badgeClass = "bg-black text-red-400 border border-red-500/30 px-4 py-1.5 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wider";
                    } else if (offer.availability?.toLowerCase() === "used") {
                      badgeClass = "bg_gray-300 text-gray-600 px-4 py-1.5 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wider";
                    }

                    return (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-[#fcfbf9]"}>
                        <td className="p-3 uppercase font-medium">{offer.offerName}</td>
                        <td className="p-3">{formatDate(offer.validity)}</td>
                        <td className="p-3">
                          <span className={badgeClass}>
                            {offer.availability || "Unknown"}
                          </span>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan="3" className="p-4 text-center text-gray-500 bg-white">No offers available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}