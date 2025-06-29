import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleSignIn = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email atau password salah.");
      return;
    }

    // Ambil informasi user dari tabel account (berdasarkan email login)
    const { data: user } = await supabase
      .from("account")
      .select("*")
      .eq("email", email)
      .single();

    if (!user) {
      setError("Akun tidak ditemukan di database.");
      return;
    }

    // Simpan informasi user ke localStorage
    localStorage.setItem("account_id", user.id);
    localStorage.setItem("role", user.role);
    localStorage.setItem("email", user.email);
    window.dispatchEvent(new Event("roleChanged"));

    // Redirect berdasarkan role
    navigate(user.role === "admin" ? "/dashboard" : "/");
  } catch (err) {
    console.error("Unexpected error:", err.message);
    setError("Terjadi kesalahan sistem.");
  }
};


  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-2xl flex w-full max-w-5xl overflow-hidden">
        {/* Kiri - Login */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">Sign in</h2>

          <div className="flex justify-center space-x-4 mb-6">
            <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:scale-105 transition">
              <FaFacebookF className="text-white text-xl" />
            </button>
            <button className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:scale-105 transition">
              <FaGooglePlusG className="text-white text-xl" />
            </button>
            <button className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center hover:scale-105 transition">
              <FaLinkedinIn className="text-white text-xl" />
            </button>
          </div>

          <p className="text-center text-gray-500 mb-6">
            atau gunakan email dan password
          </p>

          <form onSubmit={handleSignIn} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-blue-50 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-blue-50 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="text-right">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Lupa kata sandi?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold hover:bg-blue-600 transition"
            >
              SIGN IN
            </button>
          </form>
        </div>

        {/* Kanan - CTA Daftar */}
        <div className="w-1/2 bg-blue-100 text-blue-800 p-10 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl font-bold mb-4">Halo, Teman!</h2>
          <p className="text-lg mb-8 leading-relaxed">
            Daftarkan dirimu dan mulai gunakan layanan kami
          </p>
          <button
            onClick={handleSignUp}
            className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold hover:bg-blue-600 transition"
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
}
