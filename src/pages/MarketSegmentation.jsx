import React, { useState } from "react";

export default function MarketSegmentation() {
  const [search, setSearch] = useState("");

  const dataPelanggan = [/* ... (data pelanggan dari sebelumnya, sama persis) ... */];

  const filtered = dataPelanggan.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  const getLoyaltyColor = (loyalty) => {
    switch (loyalty) {
      case "Loyal":
        return "text-green-700 bg-green-100";
      case "Semi-loyal":
        return "text-yellow-700 bg-yellow-100";
      case "Tidak loyal":
        return "text-red-700 bg-red-100";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-red-700 mb-8 text-center tracking-tight">
          Market Segmentation
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

        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="min-w-full text-sm">
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
