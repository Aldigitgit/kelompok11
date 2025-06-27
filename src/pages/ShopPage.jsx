import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase.js";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import {
  FiSearch,
  FiShoppingCart,
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
} from "react-icons/fa";

export default function ShopPage() {
  const [category, setCategory] = useState("All");
  const [produkList, setProdukList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("roleChanged"));
    navigate("/login");
  };

  const categories = [
    { name: "Programming", icon: <FaBookOpen /> },
    { name: "Artificial Intelligence", icon: <FaGraduationCap /> },
    { name: "Design", icon: <FaChild /> },
    { name: "Self-Help", icon: <FaHeartbeat /> },
    { name: "Business", icon: <FaStore /> },
    { name: "Marketing", icon: <FaPhone /> },
    { name: "UX/UI", icon: <FaBookOpen /> },
    { name: "Philosophy", icon: <FaPray /> },
    { name: "Psychology", icon: <FaHeartbeat /> },
    { name: "Language", icon: <FaBookOpen /> },
    { name: "Cloud Computing", icon: <FaStore /> },
    { name: "Statistics", icon: <FaGraduationCap /> },
    { name: "Big Data", icon: <FaStore /> },
    { name: "Data Science", icon: <FaStore /> },
    { name: "Career", icon: <FaBookOpen /> },
    { name: "Project Management", icon: <FaBookOpen /> },
  ];

  useEffect(() => {
    fetchProduk();
  }, []);

  const fetchProduk = async () => {
    const { data, error } = await supabase.from("produk").select("*");
    if (error) console.error("Gagal memuat produk:", error);
    else setProdukList(data);
  };

  const filteredProduk = produkList.filter((produk) => {
    const matchesSearch = produk.judul.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "All" || produk.genre === category;
    return matchesSearch && matchesCategory;
  });

  const handleClickDetail = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="font-sans text-gray-800 bg-white">
      <Navbar role={role} handleLogout={handleLogout} />

      {/* Search + Categories */}
      <section className="px-6 py-6 border-b">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-sm"
            />
            <FiSearch className="text-xl text-gray-500" />
          </div>

          <div className="flex gap-4 overflow-x-auto py-2 scrollbar-hide">
            <button
              className={`flex flex-col items-center gap-1 text-sm px-3 py-2 rounded-md transition ${
                category === "All" ? "bg-red-100 text-red-700" : "text-gray-600 hover:text-red-600"
              }`}
              onClick={() => setCategory("All")}
            >
              <div className="text-xl">📚</div>
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                className={`flex flex-col items-center gap-1 text-sm px-3 py-2 rounded-md transition ${
                  category === cat.name ? "bg-red-100 text-red-700" : "text-gray-600 hover:text-red-600"
                }`}
                onClick={() => setCategory(cat.name)}
              >
                <div className="text-xl">{cat.icon}</div>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Book List */}
      <section className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-red-700">Our Book List</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {filteredProduk.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center">No books found.</p>
            ) : (
              filteredProduk.map((produk) => (
                <div
                  key={produk.id}
                  onClick={() => handleClickDetail(produk.id)}
                  className="cursor-pointer bg-white border rounded-lg p-3 shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={produk.url_gambar}
                    alt={produk.judul}
                    className="h-36 w-full object-cover rounded mb-3"
                  />
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">{produk.judul}</h3>
                  <p className="text-xs text-gray-500 mb-1">{produk.genre || "Unknown Genre"}</p>
                  <p className="text-xs text-red-600 font-semibold">
                    Rp {Number(produk.harga).toLocaleString("id-ID")}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
