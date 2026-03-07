"use client";

import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth-context"; // 👈 IMPORTANT
import { AlertCircle } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth(); // 👈 Context login function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        const token = res.data.data.token;
        const user = res.data.data.user;

        // 👇 SINGLE SOURCE OF TRUTH
        login(token, user);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-[#1c1c1c] border border-gray-800 rounded-2xl w-full max-w-md p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-[#c9a84c] text-3xl font-bold tracking-widest mb-2">
            Stellar Luxury Vacations
          </h1>
          <p className="text-gray-400 text-sm">Secure Portal Login</p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-400 p-3 rounded-lg flex items-center gap-2 mb-6 text-sm">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111] border border-gray-700 p-3 rounded-lg text-white outline-none focus:border-[#c9a84c]"
              placeholder="e.g. user@royalsavoy.com"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#111] border border-gray-700 p-3 rounded-lg text-white outline-none focus:border-[#c9a84c]"
              placeholder="Enter your password"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-[#c9a84c] text-black font-bold py-3.5 rounded-lg hover:bg-yellow-500 disabled:opacity-50 transition text-lg mt-4"
          >
            {loading ? "Authenticating..." : "Secure Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
