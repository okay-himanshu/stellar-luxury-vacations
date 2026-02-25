"use client";

import { Users, DollarSign, Calendar, Activity } from "lucide-react";

// --- MOCK ROLE (Must match layout for consistency in testing) ---
const CURRENT_ROLE = "admin";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
      <p className="text-gray-400 mb-8">
        Welcome back, here is what&apos;s happening today.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Common for all */}
        <StatCard
          title="Total Bookings"
          value="1,240"
          icon={Calendar}
          color="bg-blue-500"
        />

        {/* Card 2: Admin/Editor Only */}
        {(CURRENT_ROLE === "admin" || CURRENT_ROLE === "editor") && (
          <StatCard
            title="Active Inquiries"
            value="45"
            icon={Activity}
            color="bg-orange-500"
          />
        )}

        {/* Card 3: Admin Only */}
        {CURRENT_ROLE === "admin" && (
          <StatCard
            title="Total Revenue"
            value="$45,230"
            icon={DollarSign}
            color="bg-green-500"
          />
        )}

        {/* Card 4: Admin Only */}
        {CURRENT_ROLE === "admin" && (
          <StatCard
            title="New Users"
            value="+120"
            icon={Users}
            color="bg-purple-500"
          />
        )}
      </div>

      {/* Restricted Message for standard User */}
      {CURRENT_ROLE === "user" && (
        <div className="mt-8 p-6 bg-[#1c1c1c] rounded-lg border border-gray-800">
          <h3 className="text-white text-lg font-bold">User View</h3>
          <p className="text-gray-400">
            You have limited access. Contact admin for premium features.
          </p>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800 hover:border-[#c9a84c] transition-colors group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-white">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${color} bg-opacity-20 text-white`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}
