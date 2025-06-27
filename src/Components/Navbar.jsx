import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaStore, FaPhone } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';

const Navbar = ({ role, handleLogout }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow bg-white sticky top-0 z-50">
      <div className="text-2xl font-bold text-red-700">PeriPlus</div>

      <nav className="space-x-6 text-sm font-medium flex items-center">
        <Link
          to="/"
          className="!text-red-700 hover:!text-red-800 transition flex items-center gap-1"
        >
          <FaHome /> Home
        </Link>
        <Link
          to="/shop"
          className="!text-red-700 hover:!text-red-800 transition flex items-center gap-1"
        >
          <FaStore /> Shop
        </Link>
        <Link
          to="/contact"
          className="!text-red-700 hover:!text-red-800 transition flex items-center gap-1"
        >
          <FaPhone /> Contact
        </Link>
         <Link
          to="/UserOrder"
          className="!text-red-700 hover:!text-red-800 transition flex items-center gap-1"
        >
          <FaPhone /> Riwayat pesanan
        </Link>
      </nav>

      <div className="space-x-3 flex items-center">
        <Link
          to="/cart"
          className="!text-red-700 hover:text-red-800 transition text-xl"
        >
          <FiShoppingCart />
        </Link>

        {role && (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white text-sm px-4 py-2 rounded-full hover:bg-red-700 transition"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
