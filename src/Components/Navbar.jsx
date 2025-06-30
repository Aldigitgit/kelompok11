import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaStore, FaPhone } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { supabase } from "../supabase";

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState(null);
  const dropdownRef = useRef();

  const accountId = localStorage.getItem("account_id");
  const role = localStorage.getItem("role");

  // Ambil data user saat login
  useEffect(() => {
    if (accountId) fetchUserProfile();
  }, [accountId]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("account")
        .select("name, foto_profil")
        .eq("id", accountId)
        .single();

      if (error) {
        console.error("Gagal ambil data akun:", error.message);
      } else {
        setUserData(data);
      }
    } catch (err) {
      console.error("Kesalahan saat ambil data akun:", err.message);
    }
  };

  // Deteksi klik di luar dropdown untuk menutup
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToProfile = () => {
    navigate("/profil");
    setShowDropdown(false);
  };

  const handleLogout = () => {
    // Hapus data dari localStorage
    localStorage.removeItem("account_id");
    localStorage.removeItem("role");

    // Jika kamu menggunakan state global bisa dispatch event
    window.dispatchEvent(new Event("roleChanged"));

    // Redirect ke halaman login
    navigate("/login");
  };

  const photoURL = userData?.foto_profil || "https://via.placeholder.com/40";

  return (
    <header className="w-full bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-red-700 hover:underline">
          PeriPlus
        </Link>

        {/* Navigasi Menu */}
        <nav className="space-x-6 text-sm font-medium flex items-center">
          <Link to="/" className="text-red-700 hover:text-red-800 flex items-center gap-1">
            <FaHome /> Home
          </Link>
          <Link to="/shop" className="text-red-700 hover:text-red-800 flex items-center gap-1">
            <FaStore /> Shop
          </Link>
          <Link to="/contact" className="text-red-700 hover:text-red-800 flex items-center gap-1">
            <FaPhone /> Contact
          </Link>
          <Link to="/UserOrder" className="text-red-700 hover:text-red-800 flex items-center gap-1">
            Riwayat
          </Link>
        </nav>

        {/* Cart dan Profil/Login */}
        <div className="flex items-center gap-4 relative">
          <Link to="/cart" className="text-red-700 hover:text-red-800 text-xl">
            <FiShoppingCart />
          </Link>

          {/* Belum Login */}
          {!accountId ? (
            <button
              onClick={() => navigate("/login")}
              className="text-sm px-4 py-2 rounded-full border border-red-500 text-red-500 hover:bg-red-50 transition"
            >
              Login
            </button>
          ) : role && userData ? (
            // Sudah login dan data user tersedia
            <div className="relative" ref={dropdownRef}>
              <img
                src={photoURL}
                alt="Profile"
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-9 h-9 rounded-full cursor-pointer object-cover border-2 border-red-600"
              />
              {showDropdown && (
                <div className="absolute right-0 top-12 mt-1 bg-white shadow-md rounded-md w-48 text-sm z-50">
                  <div className="px-4 py-3 border-b font-semibold text-gray-700">
                    {userData.name}
                  </div>
                  <button
                    onClick={goToProfile}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    👤 Edit Profil
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Sudah login tapi belum dapat data user
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-full border border-red-500 text-red-500 hover:bg-red-50 transition text-sm"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
