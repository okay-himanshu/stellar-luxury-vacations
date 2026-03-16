import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

import LayoutWrapper from "../components/LayoutWrapper";
import { AuthProvider } from "../context/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
export const metadata = {
  title: "Stellar Luxury Vacations | Home",
  description:
    "Explore luxury travel experiences with Stellar Luxury Vacations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          ${inter.variable} 
          antialiased
        `}
      >
        <AuthProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
