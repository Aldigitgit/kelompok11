import React, { useState } from "react";

export default function MarketSegmentation() {
  const [search, setSearch] = useState("");

  const dataPelanggan = [
    {
      nama: "Andi Wijaya",
      umur: 28,
      gender: "Pria",
      lokasi: "Jakarta",
      pendapatan: "Rp 5.000.000",
      gayaHidup: "Pembelajar, digital savvy",
      loyalitas: "Loyal",
    },
    {
      nama: "Siti Rahma",
      umur: 35,
      gender: "Wanita",
      lokasi: "Bandung",
      pendapatan: "Rp 3.500.000",
      gayaHidup: "Ibu rumah tangga, suka parenting",
      loyalitas: "Semi-loyal",
    },
    {
      nama: "Dewi Ayu",
      umur: 21,
      gender: "Wanita",
      lokasi: "Surabaya",
      pendapatan: "Rp 1.200.000",
      gayaHidup: "Mahasiswa, suka novel",
      loyalitas: "Loyal",
    },
    {
      nama: "Budi Santoso",
      umur: 41,
      gender: "Pria",
      lokasi: "Pekanbaru",
      pendapatan: "Rp 8.000.000",
      gayaHidup: "Karyawan, baca bisnis",
      loyalitas: "Tidak loyal",
    },
    {
      nama: "Rina Marlina",
      umur: 30,
      gender: "Wanita",
      lokasi: "Makassar",
      pendapatan: "Rp 6.500.000",
      gayaHidup: "Freelancer, self-help dan spiritual",
      loyalitas: "Semi-loyal",
    },
    {
      nama: "Fajar Hidayat",
      umur: 18,
      gender: "Pria",
      lokasi: "Medan",
      pendapatan: "Rp 1.000.000",
      gayaHidup: "Pelajar, baca buku TOEFL & motivasi",
      loyalitas: "Loyal",
    },
  ];

  const filtered = dataPelanggan.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  const getLoyaltyColor = (loyalty) => {
    switch (loyalty) {
      case "Loyal":
        return "text-green-800 bg-green-100 border border-green-300";
      case "Semi-loyal":
        return "text-yellow-800 bg-yellow-100 border border-yellow-300";
      case "Tidak loyal":
        return "text-red-800 bg-red-100 border border-red-300";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-red-700 mb-8 text-center tracking-tight">
          Segmentasi Pasar Pelanggan
        </h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Cari berdasarkan nama pelanggan..."
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
          <table className="min-w-full text-sm table-auto">
            <thead className="bg-red-200 text-red-800 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Nama</th>
                <th className="px-6 py-4 text-left">Umur</th>
                <th className="px-6 py-4 text-left">Gender</th>
                <th className="px-6 py-4 text-left">Lokasi</th>
                <th className="px-6 py-4 text-left">Pendapatan</th>
                <th className="px-6 py-4 text-left">Gaya Hidup</th>
                <th className="px-6 py-4 text-left">Loyalitas</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {filtered.map((cust, i) => (
                <tr key={i} className="border-b hover:bg-red-50 transition">
                  <td className="px-6 py-3 font-medium">{cust.nama}</td>
                  <td className="px-6 py-3">{cust.umur}</td>
                  <td className="px-6 py-3">{cust.gender}</td>
                  <td className="px-6 py-3">{cust.lokasi}</td>
                  <td className="px-6 py-3">{cust.pendapatan}</td>
                  <td className="px-6 py-3">{cust.gayaHidup}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full font-semibold text-xs ${getLoyaltyColor(
                        cust.loyalitas
                      )}`}
                    >
                      {cust.loyalitas}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              <p className="text-lg">😕 Tidak ada data yang cocok.</p>
              <p className="text-sm mt-1">Coba gunakan kata kunci yang lain.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
