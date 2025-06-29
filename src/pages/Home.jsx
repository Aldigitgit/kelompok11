import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import {
  FaBookOpen,
  FaChild,
  FaHeartbeat,
  FaGraduationCap,
  FaPray,
  FaHome,
  FaStore,
  FaPhone,
} from "react-icons/fa";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import NewArrivals from "../Components/NewArrival";
import PopularBooks from "../Components/PopularBooks";
import { Link2 } from "lucide-react";

export default function HomePage() {
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const categories = [
    { name: "Fiction", icon: <FaBookOpen /> },
    { name: "Children", icon: <FaChild /> },
    { name: "Health", icon: <FaHeartbeat /> },
    { name: "Academic", icon: <FaGraduationCap /> },
    { name: "Religious", icon: <FaPray /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("roleChanged"));
    navigate("/login");
  };

  return (
    <div className="font-sans text-gray-800">
      <Navbar role={role} handleLogout={handleLogout} />

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
          
          <Link to="/shop">
            <button className="bg-red-200 hover:bg-red-300 text-red-800 px-6 py-2 rounded-full font-medium transition">
              Explore Now
            </button>
          </Link>
        </div>


        {/* Right Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://i.ibb.co/yFW1T4P4/bg.png"
            alt="Girl Holding Books"
            className="w-64 md:w-80 drop-shadow-xl rounded-lg"
          />
        </div>
      </section>

      {/* New arrival */}

      <NewArrivals></NewArrivals>

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
      <PopularBooks></PopularBooks>

      <Footer></Footer>
    </div>
  );
}
