import { useState } from "react";
import { supabase } from "../supabase"; // pastikan ini path yang benar

export default function ProductForm({ onAdd }) {
  const [form, setForm] = useState({
    judul: "",
    penulis: "",
    harga: "",
    status: "",
    penerbit: "",
    tanggal_rilis: "",
    dimensi: "",
    berat: "",
    halaman: "",
    bahasa: "",
    isbn_13: "",
    url_gambar: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("produk").insert([form]);
    if (error) {
      alert("❌ Gagal menyimpan produk: " + error.message);
    } else {
      alert("✅ Produk berhasil ditambahkan!");
      onAdd && onAdd(); // trigger refresh jika perlu
      setForm({
        judul: "",
        penulis: "",
        harga: "",
        status: "",
        penerbit: "",
        tanggal_rilis: "",
        dimensi: "",
        berat: "",
        halaman: "",
        bahasa: "",
        isbn_13: "",
        url_gambar: "",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-red-200 mb-10">
      <h2 className="text-2xl font-bold text-red-700 mb-4 text-center tracking-tight">
        Tambah Produk Baru
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: "judul", label: "Judul Buku" },
          { name: "penulis", label: "Penulis" },
          { name: "harga", label: "Harga", type: "number" },
          { name: "status", label: "Status (Tersedia, Habis, dll)" },
          { name: "penerbit", label: "Penerbit" },
          { name: "tanggal_rilis", label: "Tanggal Rilis", type: "date" },
          { name: "dimensi", label: "Dimensi (cm)" },
          { name: "berat", label: "Berat (gram)", type: "number" },
          { name: "halaman", label: "Jumlah Halaman", type: "number" },
          { name: "bahasa", label: "Bahasa" },
          { name: "isbn_13", label: "ISBN-13" },
          { name: "url_gambar", label: "URL Gambar Sampul" },
        ].map(({ name, label, type = "text" }) => (
          <div key={name} className="col-span-1">
            <input
              type={type}
              name={name}
              placeholder={label}
              value={form[name]}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              required={name !== "url_gambar"}
            />
          </div>
        ))}

        <div className="col-span-1 md:col-span-2 mt-4">
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-full font-semibold hover:opacity-90 transition duration-300"
          >
            Simpan Produk
          </button>
        </div>
      </form>
    </div>
  );
}
