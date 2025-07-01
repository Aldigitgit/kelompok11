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

  // Warna badge untuk segmentasi
  const segmentasiBadge = {
    Silver: "bg-gray-100 text-gray-700 border-gray-300",
    Gold: "bg-yellow-200 text-yellow-800 border-yellow-400",
    Platinum: "bg-indigo-100 text-indigo-700 border-indigo-400",
  };

  // Ambil data user
  useEffect(() => {
    if (accountId) fetchUserProfile();
  }, [accountId]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("account")
        .select("name, foto_profil, segmentasi")
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

  // Tutup dropdown jika klik di luar
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
    localStorage.removeItem("account_id");
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("roleChanged"));
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

        {/* Menu */}
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

        {/* Cart & User */}
        <div className="flex items-center gap-4 relative">
          <Link to="/cart" className="text-red-700 hover:text-red-800 text-xl">
            <FiShoppingCart />
          </Link>

          {/* Login/Logout/Profile */}
          {!accountId ? (
            <button
              onClick={() => navigate("/login")}
              className="text-sm px-4 py-2 rounded-full border border-red-500 text-red-500 hover:bg-red-50 transition"
            >
              Login
            </button>
          ) : role && userData ? (
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center gap-2">
                <img
                  src={photoURL}
                  alt="Profile"
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-9 h-9 rounded-full cursor-pointer object-cover border-2 border-red-600"
                />
                {userData.segmentasi && (
                  <Link
                    to="/membership"
                    className={`text-xs px-2 py-1 rounded-full border cursor-pointer hover:underline ${
                      segmentasiBadge[userData.segmentasi] || "bg-gray-200 text-gray-700 border-gray-300"
                    }`}
                  >
                    {userData.segmentasi}
                  </Link>
                )}
              </div>

              {showDropdown && (
                <div className="absolute right-0 top-12 mt-1 bg-white shadow-md rounded-md w-48 text-sm z-50">
                  <div className="px-4 py-3 border-b text-gray-700">
                    <div className="font-semibold">{userData.name}</div>
                    {userData.segmentasi && (
                      <Link
                        to="/membership"
                        className={`inline-block mt-1 px-2 py-1 text-xs rounded-full border font-medium hover:underline ${
                          segmentasiBadge[userData.segmentasi]
                        }`}
                      >
                        {userData.segmentasi}
                      </Link>
                    )}
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
