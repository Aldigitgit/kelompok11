import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produk, setProduk] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ambil data produk berdasarkan ID dari URL
  useEffect(() => {
    const fetchProdukById = async () => {
      const { data, error } = await supabase
        .from("produk")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Gagal mengambil detail produk:", error.message);
      } else {
        setProduk(data);
      }
      setLoading(false);
    };

    fetchProdukById();
  }, [id]);

  // Tombol "Beli Sekarang" langsung menuju halaman checkout
  const handleCheckout = () => {
    navigate("/checkout", { state: { produk } });
  };

  // Tombol "Tambah ke Keranjang"
  const handleAddToCart = async () => {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      alert("Harap login terlebih dahulu.");
      return;
    }

    try {
      // Cek apakah produk sudah ada di keranjang
      const { data: existing, error: fetchError } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", userId)
        .eq("produk_id", produk.id)
        .maybeSingle();

      if (fetchError) {
        console.error("Supabase error saat fetch keranjang:", fetchError);
        alert("Terjadi kesalahan saat mengecek keranjang.");
        return;
      }

      if (existing) {
        // Jika sudah ada, tambahkan quantity
        const { error: updateError } = await supabase
          .from("cart_items")
          .update({ quantity: existing.quantity + 1 })
          .eq("id", existing.id);

        if (updateError) {
          console.error("Gagal update quantity:", updateError);
          alert("Gagal menambahkan jumlah.");
          return;
        }
      } else {
        // Jika belum ada, tambahkan entry baru
        const { error: insertError } = await supabase
          .from("cart_items")
          .insert({
            user_id: userId,
            produk_id: produk.id,
            quantity: 1,
          });

        if (insertError) {
          console.error("Gagal insert ke keranjang:", insertError);
          alert("Gagal menambahkan ke keranjang.");
          return;
        }
      }

      alert("Berhasil ditambahkan ke keranjang!");
      navigate("/cart");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Terjadi kesalahan tak terduga.");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!produk) return <div className="p-6 text-red-600">Produk tidak ditemukan.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img
        src={produk.url_gambar}
        alt={produk.judul}
        className="w-full max-h-[400px] object-cover rounded mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{produk.judul}</h1>
      <p className="text-sm text-gray-600 mb-1">Penulis: {produk.penulis}</p>
      <p className="text-sm text-gray-600 mb-1">Penerbit: {produk.penerbit}</p>
      <p className="text-sm text-gray-600 mb-1">Halaman: {produk.halaman}</p>
      <p className="text-sm text-red-700 font-bold text-lg mt-4">
        Rp {parseInt(produk.harga).toLocaleString("id-ID")}
      </p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleAddToCart}
          className="bg-yellow-500 text-white py-2 px-6 rounded hover:bg-yellow-600 transition font-semibold"
        >
          Tambah ke Keranjang
        </button>

        <button
          onClick={handleCheckout}
          className="bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 transition font-semibold"
        >
          Beli Sekarang
        </button>
      </div>
    </div>
  );
}
