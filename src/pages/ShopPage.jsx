import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase.js";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FiSearch } from "react-icons/fi";
import {
  FaBookOpen,
  FaChild,
  FaHeartbeat,
  FaGraduationCap,
  FaPray,
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
    <div className="font-sans text-gray-800 bg-gray-50">
      <Navbar role={role} handleLogout={handleLogout} />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-center py-12 mb-6">
        <h1 className="text-3xl font-bold mb-2">Temukan Buku Favoritmu</h1>
        <p className="text-sm">Eksplorasi kategori, cari buku impianmu, dan mulai membaca hari ini!</p>
      </section>

      {/* Search + Categories */}
      <section className="px-6 py-6 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <input
              type="text"
              placeholder="Cari judul buku..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            />
            <FiSearch className="text-xl text-gray-500" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 text-center">
            <button
              className={`flex flex-col items-center gap-1 p-3 rounded-lg transition ${
                category === "All" ? "bg-red-100 text-red-700" : "text-gray-600 hover:text-red-600"
              }`}
              onClick={() => setCategory("All")}
            >
              <div className="text-xl">📚</div>
              <span className="text-xs">All</span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                className={`flex flex-col items-center gap-1 p-3 rounded-lg transition ${
                  category === cat.name ? "bg-red-100 text-red-700" : "text-gray-600 hover:text-red-600"
                }`}
                onClick={() => setCategory(cat.name)}
              >
                <div className="text-xl">{cat.icon}</div>
                <span className="text-xs text-center leading-tight">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Produk Grid */}
      <section className="px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-red-700">📖 Daftar Buku</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredProduk.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center">Tidak ada buku ditemukan.</p>
            ) : (
              filteredProduk.map((produk) => (
                <div
                  key={produk.id}
                  onClick={() => handleClickDetail(produk.id)}
                  className="cursor-pointer bg-white border rounded-lg p-3 shadow hover:shadow-lg transition flex flex-col"
                >
                  <img
                    src={produk.url_gambar}
                    alt={produk.judul}
                    className="h-36 w-full object-cover rounded mb-2"
                  />
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{produk.judul}</h3>
                  <p className="text-xs text-gray-500">{produk.genre || "Unknown Genre"}</p>
                  <p className="text-xs text-red-600 font-bold mt-1">
                    Rp {Number(produk.harga).toLocaleString("id-ID")}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}