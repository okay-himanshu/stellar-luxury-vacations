"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth-context";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
      } else if (allowedRoles.length && !allowedRoles.includes(role)) {
        router.replace("/unauthorized");
      }
    }
  }, [user, role, loading]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-[#c9a84c] text-xl font-bold">
        Verifying Session...
      </div>
    );
  }

  if (!user) return null;
  if (allowedRoles.length && !allowedRoles.includes(role)) return null;

  return children;
}
