import { useState } from "react";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { FaBookOpen, FaChild, FaHeartbeat, FaGraduationCap, FaPray, FaHome, FaStore, FaPhone, FaUser } from "react-icons/fa";
export default function ContactPage() {
  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}
            <header className="flex items-center justify-between px-6 py-4 shadow bg-white sticky top-0 z-50">
              <div className="text-2xl font-bold text-red-700">PeriPlus</div>
              <nav className="space-x-6 text-sm font-medium flex items-center">
                <a href="/home" className="hover:text-red-700 transition flex items-center gap-1">
                  <FaHome /> Home
                </a>
                <a href="/shop" className="hover:text-red-700 transition flex items-center gap-1">
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

      {/* Contact Section */}
      <section className="py-16 px-6 md:px-20 bg-[#fff7f7]">
        <h1 className="text-4xl font-bold text-center text-red-700 mb-4">Contact Us</h1>
        <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
          We'd love to hear from you! Whether you have a question about our products, pricing, or anything else, our team is ready to answer all your questions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><strong>📍 Address:</strong> Jl. Buku Cerdas No. 1, Jakarta</li>
              <li><strong>📞 Phone:</strong> +62 812 3456 7890</li>
              <li><strong>📧 Email:</strong> support@periplus.com</li>
              <li><strong>🕐 Hours:</strong> Mon - Fri, 09:00 - 18:00</li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-red-200"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-red-200"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Message</label>
                <textarea
                  rows="4"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-red-200"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-10 px-6 mt-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Bacaku</h4>
            <p className="text-gray-600">Discover books that ignite your imagination</p>
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
              <li>support@bacaku.com</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 text-xs text-gray-500">
          © 2025 Bacaku. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
