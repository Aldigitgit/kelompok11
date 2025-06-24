import React, { useState } from "react";
import {
  FiSearch,
  FiShoppingCart
} from "react-icons/fi";
import {
  FaBookOpen,
  FaChild,
  FaHeartbeat,
  FaGraduationCap,
  FaPray,
  FaHome,
  FaStore,
  FaPhone,
  FaUser
} from "react-icons/fa";

export default function CartPage() {
  const [category, setCategory] = useState("All");

  const categories = [
    { name: "Fiction", icon: <FaBookOpen /> },
    { name: "Children", icon: <FaChild /> },
    { name: "Health", icon: <FaHeartbeat /> },
    { name: "Academic", icon: <FaGraduationCap /> },
    { name: "Religious", icon: <FaPray /> },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 shadow bg-white sticky top-0 z-50">
        <div className="text-2xl font-bold text-red-700">PeriPlus</div>
        <nav className="space-x-6 text-sm font-medium hidden md:flex items-center">
          <a href="/" className="hover:text-red-700 transition flex items-center gap-1">
            <FaHome /> Home
          </a>
          <a href="/shop" className="hover  :text-red-700 transition flex items-center gap-1">
            <FaStore /> Shop
          </a>
          <a href="/contact" className="hover:text-red-700 transition flex items-center gap-1">
            <FaPhone /> Contact
          </a>
        </nav>
        <div className="space-x-3 flex items-center">
          <a href="/cart" className="text-red-600 hover:text-red-700 transition text-xl">
            <FiShoppingCart />
          </a>
        </div>
      </header>

      {/* Cart List */}
      <main className="px-6 md:px-16 py-10">
        <h2 className="text-3xl font-bold mb-6">
          Cart <span className="text-red-600">List</span>
        </h2>

        <div className="mb-10 bg-white rounded-lg shadow p-5">
          {/* Dummy product row */}
          <div className="flex flex-col sm:flex-row justify-between items-center border-b pb-4 gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <img
                src="src\frontend\assets\book_1.png"
                alt="Book"
                className="w-20 h-28 object-cover rounded"
              />
              <div>
                <p className="font-semibold text-lg">Mystic Tales</p>
                <p className="text-sm text-gray-500">Category: Fiction</p>
                <p className="text-sm text-gray-600 mt-1">Qty: 1</p>
              </div>
            </div>
            <p className="font-semibold text-lg text-red-600">$15.00</p>
          </div>
        </div>

        {/* Cart Total */}
        <h2 className="text-3xl font-bold mb-4">
          Cart <span className="text-red-600">Total</span>
        </h2>

        <div className="bg-white p-6 rounded shadow max-w-md">
          <div className="flex justify-between mb-2 text-base">
            <span className="font-medium">SubTotal:</span>
            <span>$15.00</span>
          </div>
          <div className="flex justify-between mb-2 text-base">
            <span className="font-medium">Shipping Fee:</span>
            <span>$2.00</span>
          </div>
          <div className="flex justify-between border-t pt-2 mt-2 text-lg">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold">$17.00</span>
          </div>

          <button className="w-full mt-6 bg-red-600 text-white py-3 rounded-full hover:bg-red-700 transition font-semibold">
            Proceed to Checkout
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-10 px-6 mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-semibold mb-2 text-red-600">PeriPlus</h4>
            <p className="text-gray-600 text-sm">
              Discover books that ignite your imagination
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Learn More</h4>
            <ul className="space-y-1 text-gray-600">
              <li>About</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Community</h4>
            <ul className="space-y-1 text-gray-600">
              <li>Blog</li>
              <li>Events</li>
              <li>Forum</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contact Us</h4>
            <ul className="space-y-1 text-gray-600">
              <li>Help Center</li>
              <li>Live Chat</li>
              <li>support@periplus.com</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 text-xs text-gray-500">
          © 2025 PeriPlus. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
