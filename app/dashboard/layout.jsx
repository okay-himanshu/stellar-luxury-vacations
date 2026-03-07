"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
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
  Loader,
} from "lucide-react";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../context/auth-context";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role, logout, loading } = useAuth();

  const menuItems = [
    {
      name: "Overview",
      path: "/dashboard",
      icon: LayoutDashboard,
      roles: ["admin", "editor"],
    },
    {
      name: "My Profile",
      path: "/dashboard/profile",
      icon: User,
      roles: ["editor", "member", "user"],
    },
    {
      name: "Members",
      path: "/dashboard/member",
      icon: Users,
      roles: ["admin"],
    },
    {
      name: "Locations",
      path: "/dashboard/locations",
      icon: Map,
      roles: ["admin"],
    },
    {
      name: "Hotels & Resorts",
      path: "/dashboard/hotels",
      icon: Hotel,
      roles: ["admin"],
    },
  ];

  const currentMenuItem = [...menuItems]
    .sort((a, b) => b.path.length - a.path.length)
    .find(
      (item) => pathname === item.path || pathname.startsWith(item.path + "/"),
    );

  useEffect(() => {
    if (!role) return;

    if (pathname === "/dashboard" && role === "user") {
      router.push("/dashboard/profile");
      return;
    }

    if (currentMenuItem && !currentMenuItem.roles.includes(role)) {
      router.push(role === "admin" ? "/dashboard" : "/dashboard/profile");
    }
  }, [pathname, currentMenuItem, role, router]);

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center text-[#c9a84c] font-bold">
        <div className="flex flex-col items-center gap-4">
          <Loader size={24} className="ml-2 animate-spin" />
          <p> Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (currentMenuItem && role && !currentMenuItem.roles.includes(role)) {
    return null;
  }

  return (
    <ProtectedRoute allowedRoles={["admin", "editor", "member", "user"]}>
      <div className="flex h-screen w-full bg-black text-white">
        <aside className="w-64 bg-[#111] border-r border-gray-800 flex flex-col hidden md:flex">
          <Link
            href={"/"}
            className="h-20 flex items-center justify-center border-b border-gray-800"
          >
            <h1 className="text-[#c9a84c] text-xl font-bold tracking-widest">
              Dashboard
            </h1>
          </Link>

          <nav className="flex-1 py-6 px-4 space-y-2">
            {menuItems.map((item) => {
              if (!role || !item.roles.includes(role)) return null;

              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#c9a84c] text-black shadow-lg"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <User size={20} />
              </div>
              <div>
                <p className="text-sm font-bold truncate w-40">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-[#c9a84c] uppercase">
                  {role || "Guest"}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 bg-red-900/20 text-red-500 py-2 rounded-lg text-sm hover:bg-red-900/40 transition-colors"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto">
          <header className="h-16 bg-[#111] border-b border-gray-800 flex items-center px-6 md:hidden">
            <span className="text-[#c9a84c] font-bold"> Dashboard</span>
          </header>

          <div className="p-6 md:p-10">{children}</div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
