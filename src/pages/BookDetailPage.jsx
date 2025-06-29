import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produk, setProduk] = useState(null);
  const [rekomendasi, setRekomendasi] = useState([]);
  const [loading, setLoading] = useState(true);

  const accountId = localStorage.getItem("account_id");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchProduk = async () => {
      const { data, error } = await supabase
        .from("produk")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setProduk(data);
      setLoading(false);
    };
    fetchProduk();
  }, [id]);

  useEffect(() => {
    const fetchRekomendasi = async () => {
      const { data } = await supabase
        .from("produk")
        .select("*")
        .neq("id", id)
        .limit(6);
      setRekomendasi(data || []);
    };
    fetchRekomendasi();
  }, [id]);

  const handleAddToCart = async () => {
    if (!accountId) return navigate("/login");

    const { data: exist } = await supabase
      .from("cart_items")
      .select("*")
      .eq("account_id", accountId)
      .eq("produk_id", produk.id)
      .maybeSingle();

    if (exist) {
      await supabase
        .from("cart_items")
        .update({ quantity: exist.quantity + 1 })
        .eq("id", exist.id);
    } else {
      await supabase
        .from("cart_items")
        .insert({ account_id: accountId, produk_id: produk.id, quantity: 1 });
    }

    alert("Ditambahkan ke keranjang");
    navigate("/cart");
  };

const handleCheckout = () => {
  if (!produk) {
    alert("Produk belum dimuat.");
    return;
  }
  navigate("/checkout", {
    state: {
      cartItems: [
        {
          id: produk.id,
          quantity: 1,
          produk: produk,
        },
      ],
      total: produk.harga,
    },
  });
};


  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!produk) return <div className="p-10 text-red-600">Produk tidak ditemukan.</div>;

  return (
    <div className="bg-gray-50">
      <Navbar role={role} />

      {/* Konten Produk */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gambar & Detail */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={produk.url_gambar}
              alt={produk.judul}
              className="w-full md:w-[350px] h-[350px] object-cover rounded-lg border"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{produk.judul}</h1>
              <p className="text-gray-600 text-sm mb-2">Penulis: {produk.penulis}</p>
              <p className="text-gray-600 text-sm mb-2">Penerbit: {produk.penerbit}</p>
              <p className="text-gray-600 text-sm mb-2">Bahasa: {produk.bahasa}</p>
              <p className="text-gray-600 text-sm mb-2">Halaman: {produk.halaman}</p>
              <p className="text-gray-600 text-sm mb-2">ISBN: {produk.isbn_13}</p>
              <p className="text-gray-600 text-sm mb-2">Berat: {produk.berat} gram</p>
              <p className="text-red-600 text-2xl font-bold mt-4">
                Rp {parseInt(produk.harga).toLocaleString("id-ID")}
              </p>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAddToCart}
                  className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 font-semibold"
                >
                  🛒 Tambah ke Keranjang
                </button>
                <button
                  onClick={handleCheckout}
                  className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 font-semibold"
                >
                  Beli Sekarang
                </button>
              </div>
            </div>
          </div>

          {/* Deskripsi Produk */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold border-b pb-2 mb-3">Deskripsi Produk</h2>
            <div className="text-gray-700 text-sm whitespace-pre-wrap">
              📘 Judul: {produk.judul}
              <br />📏 Dimensi: {produk.dimensi}
              <br />📚 Halaman: {produk.halaman}
              <br />📦 Berat: {produk.berat} gram
              <br />🔤 Bahasa: {produk.bahasa}
              <br />🧾 ISBN: {produk.isbn_13}
              <br />
              <br />
              Buku ini sangat cocok untuk pembaca yang ingin memperluas wawasan. Desain cover menarik dan konten berkualitas.
            </div>
          </div>
        </div>

        {/* Rekomendasi */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-3">📚 Rekomendasi Lainnya</h3>
          <div className="space-y-4">
            {rekomendasi.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/book/${item.id}`)}
                className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition"
              >
                <img
                  src={item.url_gambar}
                  alt={item.judul}
                  className="w-[60px] h-[60px] object-cover rounded border"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{item.judul}</span>
                  <span className="text-red-600 text-sm font-bold">
                    Rp {parseInt(item.harga).toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
