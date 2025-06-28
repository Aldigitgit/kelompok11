import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaStore, FaPhone } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { supabase } from "../supabase";

const Navbar = ({ role, handleLogout }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const [userData, setUserData] = useState(null);
  const accountId = localStorage.getItem("account_id");

  useEffect(() => {
    if (accountId) {
      fetchUserProfile();
    }
  }, [accountId]);

const fetchUserProfile = async () => {
  const { data, error } = await supabase
    .from("account")
    .select("name, foto_profil")
    .eq("id", accountId)
    .single();

  console.log("Account ID:", accountId);
  console.log("Supabase error:", error);
  console.log("Fetched user data:", data);

  if (error) {
    console.error("Gagal ambil data akun:", error);
  } else {
    setUserData(data);
  }
};



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

  const photoURL = userData?.foto_profil || "https://via.placeholder.com/40";

  return (
    <header className="w-full bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-red-700 hover:underline">
          PeriPlus
        </Link>

        {/* Menu Navigasi */}
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
          {/* Keranjang */}
          <Link to="/cart" className="text-red-700 hover:text-red-800 text-xl">
            <FiShoppingCart />
          </Link>

          {/* Profil / Login */}
          {!accountId ? (
            <Link
              to="/login"
              className="text-sm px-4 py-2 rounded-full border border-red-500 text-red-500 hover:bg-red-50 transition"
            >
              Login
            </Link>
          ) : role && userData ? (
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
            <div className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-sm">
              Belum Login
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
