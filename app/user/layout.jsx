"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/auth-context";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
        return;
      }

      if (allowedRoles.length && !allowedRoles.includes(role)) {
        router.replace("/login");
        return;
      }
    }
  }, [user, role, loading]);


  if (loading) return null;


  if (!user) return null;
  if (allowedRoles.length && !allowedRoles.includes(role)) return null;

  return children;
}
