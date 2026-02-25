"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // 👇 All app-protected areas jahan Header/Footer nahi chahiye
  const HIDE_LAYOUT_ROUTES = ["/dashboard", "/user"];

  const hideLayout = HIDE_LAYOUT_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
