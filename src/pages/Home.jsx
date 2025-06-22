import { useState } from "react";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { FaBookOpen, FaChild, FaHeartbeat, FaGraduationCap, FaPray, FaHome, FaStore, FaPhone, FaUser } from "react-icons/fa";
export default function HomePage() {
    const [category, setCategory] = useState("All");

  const categories = [
    { name: "Fiction", icon: <FaBookOpen /> },
    { name: "Children", icon: <FaChild /> },
    { name: "Health", icon: <FaHeartbeat /> },
    { name: "Academic", icon: <FaGraduationCap /> },
    { name: "Religious", icon: <FaPray /> },
  ];

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

      {/* Hero */}
      <section className="bg-[#f9f7fd] py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Text */}
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Discover{" "}
            <span className="text-red-700 bg-red-100 rounded-full px-2">B</span>
            ooks ✏️ <br />
            That Inspire Your World
          </h1>
          <p className="text-gray-600 mb-6 text-sm md:text-base max-w-md">
            Explore a world of stories, knowledge, and inspiration. Discover
            books that ignite your imagination, broaden your perspective, and
            enrich your journey. From timeless classics to modern masterpieces,
            find the perfect read for every moment.
          </p>
          <button className="bg-red-200 hover:bg-red-300 text-red-800 px-6 py-2 rounded-full font-medium transition">
            Explore Now
          </button>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="src/frontend/assets/bg.png"
            alt="Girl Holding Books"
            className="w-64 md:w-80 drop-shadow-xl rounded-lg"
          />
        </div>
      </section>

      {/* Popular book */}

      <section className="py-10 px-6 bg-white">
        <h2 className="text-2xl font-semibold mb-4">New Arrivals</h2>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pb-2">
            {/* New Arrivals Manual Entries */}
            <div className="flex gap-4 pb-2">
              <div className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition">
                <img
                  src="src/frontend/assets/book_1.png"
                  alt="The Silent Observer"
                  className="mx-auto mb-2 h-40 object-cover rounded"
                />
                <p className="text-sm font-semibold text-center">
                  The Silent Observer
                </p>
                <p className="text-xs text-gray-500 text-center">Mystery</p>
                <p className="text-[11px] text-gray-600 text-center">
                  A detective unravels a town’s hidden secrets.
                </p>
                <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                  Rp 95.000
                </p>
              </div>

              <div className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition">
                <img
                  src="src/frontend/assets/book_2.png"
                  alt="Whispers of the Wind"
                  className="mx-auto mb-2 h-40 object-cover rounded"
                />
                <p className="text-sm font-semibold text-center">
                  Whispers of the Wind
                </p>
                <p className="text-xs text-gray-500 text-center">Romance</p>
                <p className="text-[11px] text-gray-600 text-center">
                  A heartfelt tale of love across distances.
                </p>
                <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                  Rp 85.000
                </p>
              </div>

              <div className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition">
                <img
                  src="src/frontend/assets/book_4.png"
                  alt="Code of Tomorrow"
                  className="mx-auto mb-2 h-40 object-cover rounded"
                />
                <p className="text-sm font-semibold text-center">
                  Code of Tomorrow
                </p>
                <p className="text-xs text-gray-500 text-center">Sci-Fi</p>
                <p className="text-[11px] text-gray-600 text-center">
                  In a world run by AIs, one coder holds the key.
                </p>
                <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                  Rp 120.000
                </p>
              </div>

              <div className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition">
                <img
                  src="src/frontend/assets/book_5.png"
                  alt="Code of Tomorrow"
                  className="mx-auto mb-2 h-40 object-cover rounded"
                />
                <p className="text-sm font-semibold text-center">
                  Code of Tomorrow
                </p>
                <p className="text-xs text-gray-500 text-center">Sci-Fi</p>
                <p className="text-[11px] text-gray-600 text-center">
                  In a world run by AIs, one coder holds the key.
                </p>
                <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                  Rp 120.000
                </p>
              </div>

              <div className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition">
                <img
                  src="src/frontend/assets/book_6.png"
                  alt="Code of Tomorrow"
                  className="mx-auto mb-2 h-40 object-cover rounded"
                />
                <p className="text-sm font-semibold text-center">
                  Code of Tomorrow
                </p>
                <p className="text-xs text-gray-500 text-center">Sci-Fi</p>
                <p className="text-[11px] text-gray-600 text-center">
                  In a world run by AIs, one coder holds the key.
                </p>
                <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                  Rp 120.000
                </p>
              </div>

              <div className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition">
                <img
                  src="src/frontend/assets/book_7.png"
                  alt="Code of Tomorrow"
                  className="mx-auto mb-2 h-40 object-cover rounded"
                />
                <p className="text-sm font-semibold text-center">
                  Code of Tomorrow
                </p>
                <p className="text-xs text-gray-500 text-center">Sci-Fi</p>
                <p className="text-[11px] text-gray-600 text-center">
                  In a world run by AIs, one coder holds the key.
                </p>
                <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                  Rp 120.000
                </p>
              </div>

              <div className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition">
                <img
                  src="src/frontend/assets/book_8.png"
                  alt="Code of Tomorrow"
                  className="mx-auto mb-2 h-40 object-cover rounded"
                />
                <p className="text-sm font-semibold text-center">
                  Code of Tomorrow
                </p>
                <p className="text-xs text-gray-500 text-center">Sci-Fi</p>
                <p className="text-[11px] text-gray-600 text-center">
                  In a world run by AIs, one coder holds the key.
                </p>
                <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                  Rp 120.000
                </p>
              </div>

              <div className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition">
                <img
                  src="src/frontend/assets/book_9.png"
                  alt="Code of Tomorrow"
                  className="mx-auto mb-2 h-40 object-cover rounded"
                />
                <p className="text-sm font-semibold text-center">
                  Code of Tomorrow
                </p>
                <p className="text-xs text-gray-500 text-center">Sci-Fi</p>
                <p className="text-[11px] text-gray-600 text-center">
                  In a world run by AIs, one coder holds the key.
                </p>
                <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                  Rp 120.000
                </p>
              </div>

              <div className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition">
                <img
                  src="src/frontend/assets/book_10.png"
                  alt="Code of Tomorrow"
                  className="mx-auto mb-2 h-40 object-cover rounded"
                />
                <p className="text-sm font-semibold text-center">
                  Code of Tomorrow
                </p>
                <p className="text-xs text-gray-500 text-center">Sci-Fi</p>
                <p className="text-[11px] text-gray-600 text-center">
                  In a world run by AIs, one coder holds the key.
                </p>
                <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                  Rp 120.000
                </p>
              </div>

              <div className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition">
                <img
                  src="src/frontend/assets/book_11.png"
                  alt="Code of Tomorrow"
                  className="mx-auto mb-2 h-40 object-cover rounded"
                />
                <p className="text-sm font-semibold text-center">
                  Code of Tomorrow
                </p>
                <p className="text-xs text-gray-500 text-center">Sci-Fi</p>
                <p className="text-[11px] text-gray-600 text-center">
                  In a world run by AIs, one coder holds the key.
                </p>
                <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                  Rp 120.000
                </p>
              </div>

              <div className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition">
                <img
                  src="src/frontend/assets/book_12.png"
                  alt="Code of Tomorrow"
                  className="mx-auto mb-2 h-40 object-cover rounded"
                />
                <p className="text-sm font-semibold text-center">
                  Code of Tomorrow
                </p>
                <p className="text-xs text-gray-500 text-center">Sci-Fi</p>
                <p className="text-[11px] text-gray-600 text-center">
                  In a world run by AIs, one coder holds the key.
                </p>
                <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                  Rp 120.000
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-red-50 py-12 px-6 text-center">
        <h3 className="text-xl font-semibold mb-8">
          Unveiling Our Store's Key Features!
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white p-4 rounded shadow">
            <p className="font-medium">🔄 Easy Return Process</p>
            <p className="text-sm text-gray-600">
              Hassle-free product returns within 7 days
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="font-medium">💳 Secure Payment Options</p>
            <p className="text-sm text-gray-600">
              Multiple safe and fast payment methods
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="font-medium">📞 Live Customer Support</p>
            <p className="text-sm text-gray-600">
              Available to assist 24/7 with your queries
            </p>
          </div>
        </div>
      </section>

      {/* Popular Books */}
      <section className="py-10 px-6 bg-white">
        <h2 className="text-2xl font-semibold mb-4">Popular Books</h2>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pb-2">
            {/* Popular Books Manual Entries */}
            <div className="flex gap-4 pb-2">
              <div className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition">
                <img
                  src="src/frontend/assets/book_13.png"
                  alt="Atomic Habits"
                  className="mx-auto mb-2 h-40 object-cover rounded"
                />
                <p className="text-sm font-semibold text-center">
                  Atomic Habits
                </p>
                <p className="text-xs text-gray-500 text-center">Self-Help</p>
                <p className="text-[11px] text-gray-600 text-center">
                  Small changes that lead to remarkable results.
                </p>
                <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                  Rp 110.000
                </p>
              </div>

              <div className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition">
                <img
                  src="src/frontend/assets/book_13.png"
                  alt="The Alchemist"
                  className="mx-auto mb-2 h-40 object-cover rounded"
                />
                <p className="text-sm font-semibold text-center">
                  The Alchemist
                </p>
                <p className="text-xs text-gray-500 text-center">Fiction</p>
                <p className="text-[11px] text-gray-600 text-center">
                  A journey of dreams and destiny.
                </p>
                <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                  Rp 90.000
                </p>
              </div>

              <div className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition">
                <img
                  src="src/frontend/assets/book_14.png"
                  alt="Educated"
                  className="mx-auto mb-2 h-40 object-cover rounded"
                />
                <p className="text-sm font-semibold text-center">Educated</p>
                <p className="text-xs text-gray-500 text-center">Biography</p>
                <p className="text-[11px] text-gray-600 text-center">
                  One woman’s pursuit of knowledge against all odds.
                </p>
                <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                  Rp 130.000
                </p>
              </div>

              <div className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition">
                <img
                  src="src/frontend/assets/book_15.png"
                  alt="Educated"
                  className="mx-auto mb-2 h-40 object-cover rounded"
                />
                <p className="text-sm font-semibold text-center">Educated</p>
                <p className="text-xs text-gray-500 text-center">Biography</p>
                <p className="text-[11px] text-gray-600 text-center">
                  One woman’s pursuit of knowledge against all odds.
                </p>
                <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                  Rp 130.000
                </p>
              </div>

              <div className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition">
                <img
                  src="src/frontend/assets/book_16.png"
                  alt="Educated"
                  className="mx-auto mb-2 h-40 object-cover rounded"
                />
                <p className="text-sm font-semibold text-center">Educated</p>
                <p className="text-xs text-gray-500 text-center">Biography</p>
                <p className="text-[11px] text-gray-600 text-center">
                  One woman’s pursuit of knowledge against all odds.
                </p>
                <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                  Rp 130.000
                </p>
              </div>

              <div className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition">
                <img
                  src="src/frontend/assets/book_17.png"
                  alt="Educated"
                  className="mx-auto mb-2 h-40 object-cover rounded"
                />
                <p className="text-sm font-semibold text-center">Educated</p>
                <p className="text-xs text-gray-500 text-center">Biography</p>
                <p className="text-[11px] text-gray-600 text-center">
                  One woman’s pursuit of knowledge against all odds.
                </p>
                <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                  Rp 130.000
                </p>
              </div>

              <div className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition">
                <img
                  src="src/frontend/assets/book_18.png"
                  alt="Educated"
                  className="mx-auto mb-2 h-40 object-cover rounded"
                />
                <p className="text-sm font-semibold text-center">Educated</p>
                <p className="text-xs text-gray-500 text-center">Biography</p>
                <p className="text-[11px] text-gray-600 text-center">
                  One woman’s pursuit of knowledge against all odds.
                </p>
                <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                  Rp 130.000
                </p>
              </div>

              <div className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition">
                <img
                  src="src/frontend/assets/book_19.png"
                  alt="Educated"
                  className="mx-auto mb-2 h-40 object-cover rounded"
                />
                <p className="text-sm font-semibold text-center">Educated</p>
                <p className="text-xs text-gray-500 text-center">Biography</p>
                <p className="text-[11px] text-gray-600 text-center">
                  One woman’s pursuit of knowledge against all odds.
                </p>
                <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                  Rp 130.000
                </p>
              </div>

              <div className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition">
                <img
                  src="src/frontend/assets/book_20.png"
                  alt="Educated"
                  className="mx-auto mb-2 h-40 object-cover rounded"
                />
                <p className="text-sm font-semibold text-center">Educated</p>
                <p className="text-xs text-gray-500 text-center">Biography</p>
                <p className="text-[11px] text-gray-600 text-center">
                  One woman’s pursuit of knowledge against all odds.
                </p>
                <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                  Rp 130.000
                </p>
              </div>

              <div className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition">
                <img
                  src="src/frontend/assets/book_21.png"
                  alt="Educated"
                  className="mx-auto mb-2 h-40 object-cover rounded"
                />
                <p className="text-sm font-semibold text-center">Educated</p>
                <p className="text-xs text-gray-500 text-center">Biography</p>
                <p className="text-[11px] text-gray-600 text-center">
                  One woman’s pursuit of knowledge against all odds.
                </p>
                <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                  Rp 130.000
                </p>
              </div>

              <div className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition">
                <img
                  src="src/frontend/assets/book_22.png"
                  alt="Educated"
                  className="mx-auto mb-2 h-40 object-cover rounded"
                />
                <p className="text-sm font-semibold text-center">Educated</p>
                <p className="text-xs text-gray-500 text-center">Biography</p>
                <p className="text-[11px] text-gray-600 text-center">
                  One woman’s pursuit of knowledge against all odds.
                </p>
                <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                  Rp 130.000
                </p>
              </div>

              <div className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition">
                <img
                  src="src/frontend/assets/book_23.png"
                  alt="Educated"
                  className="mx-auto mb-2 h-40 object-cover rounded"
                />
                <p className="text-sm font-semibold text-center">Educated</p>
                <p className="text-xs text-gray-500 text-center">Biography</p>
                <p className="text-[11px] text-gray-600 text-center">
                  One woman’s pursuit of knowledge against all odds.
                </p>
                <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                  Rp 130.000
                </p>
              </div>

              <div className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition">
                <img
                  src="src/frontend/assets/book_24.png"
                  alt="Educated"
                  className="mx-auto mb-2 h-40 object-cover rounded"
                />
                <p className="text-sm font-semibold text-center">Educated</p>
                <p className="text-xs text-gray-500 text-center">Biography</p>
                <p className="text-[11px] text-gray-600 text-center">
                  One woman’s pursuit of knowledge against all odds.
                </p>
                <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                  Rp 130.000
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-10 px-6 mt-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Bacaku</h4>
            <p className="text-gray-600">
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
