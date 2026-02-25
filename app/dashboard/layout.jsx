"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Settings,
  FileText,
  LogOut,
  Users,
  Shield,
  Map,
  Hotel,
} from "lucide-react";

// 👉 1. Context aur ProtectedRoute import karo (Path apne folder structure ke hisaab se theek kar lena)
import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../context/auth-context";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  // 👉 2. Auth Context se asali User, Role aur Logout function nikalo
  const { user, role, logout, loading } = useAuth();

  // Define Menu Items with Access Roles
  const menuItems = [
    {
      name: "Overview",
      path: "/dashboard",
      icon: LayoutDashboard,
      roles: ["admin", "editor", "member", "user"], // Sab allowed hain
    },
    {
      name: "My Profile",
      path: "/dashboard/profile",
      icon: User,
      roles: ["admin", "editor", "member", "user"], // Sab allowed hain
    },
    {
      name: "Members",
      path: "/dashboard/member",
      icon: Users,
      roles: ["admin"], // Only Admin
    },
    {
      name: "Locations",
      path: "/dashboard/locations",
      icon: Map,
      roles: ["admin"], // Only Admin
    },
    {
      name: "Hotels & Resorts",
      path: "/dashboard/hotels",
      icon: Hotel,
      roles: ["admin"], // Only Admin
    },
    {
      name: "Content Mgmt",
      path: "/dashboard/content",
      icon: FileText,
      roles: ["admin", "editor"], // Admin & Editor
    },
    {
      name: "System Settings",
      path: "/dashboard/settings",
      icon: Settings,
      roles: ["admin"], // Only Admin
    },
  ];

  // Hydration aur loading fix
  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center text-[#c9a84c] font-bold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    // 👉 3. Poore Layout ko ProtectedRoute mein wrap kar diya
    <ProtectedRoute allowedRoles={["admin", "editor", "member", "user"]}>
      <div className="flex h-screen w-full bg-black text-white">
        {/* --- SIDEBAR --- */}
        <aside className="w-64 bg-[#111] border-r border-gray-800 flex flex-col hidden md:flex">
          {/* Logo Area */}
          <Link
            href={"/"}
            className="h-20 flex items-center justify-center border-b border-gray-800"
          >
            <h1 className="text-[#c9a84c] text-xl font-bold tracking-widest">
              ROYAL ADMIN
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-4 space-y-2">
            {menuItems.map((item) => {
              // 👉 4. Ab condition asali ROLE pe chalegi
              if (!role || !item.roles.includes(role)) return null;

              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                    ${
                      isActive
                        ? "bg-[#c9a84c] text-black shadow-lg"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }
                  `}
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Info Footer */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <User size={20} />
              </div>
              <div>
                {/* 👉 5. Dynamic User Name aur Role */}
                <p className="text-sm font-bold truncate w-40">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-[#c9a84c] uppercase">
                  {role || "Guest"}
                </p>
              </div>
            </div>

            {/* 👉 6. Asali Logout Function Attach kar diya */}
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 bg-red-900/20 text-red-500 py-2 rounded-lg text-sm hover:bg-red-900/40 transition-colors"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 overflow-y-auto">
          {/* Mobile Header */}
          <header className="h-16 bg-[#111] border-b border-gray-800 flex items-center px-6 md:hidden">
            <span className="text-[#c9a84c] font-bold">Royal Admin</span>
          </header>

          <div className="p-6 md:p-10">{children}</div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
