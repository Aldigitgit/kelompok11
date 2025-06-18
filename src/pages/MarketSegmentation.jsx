import React, { useState } from "react";

export default function MarketSegmentation() {
  const [search, setSearch] = useState("");

  const dataPelanggan = [
    { nama: "Andi Wijaya", umur: 25, gender: "Laki-laki", lokasi: "Jakarta", pendapatan: "Rp 8.000.000", gayaHidup: "Aktif", loyalitas: "Loyal" },
    { nama: "Siti Lestari", umur: 28, gender: "Perempuan", lokasi: "Bandung", pendapatan: "Rp 7.500.000", gayaHidup: "Trendy", loyalitas: "Semi-loyal" },
    { nama: "Budi Hartono", umur: 35, gender: "Laki-laki", lokasi: "Surabaya", pendapatan: "Rp 12.000.000", gayaHidup: "Konservatif", loyalitas: "Loyal" },
    { nama: "Dewi Maharani", umur: 30, gender: "Perempuan", lokasi: "Yogyakarta", pendapatan: "Rp 6.000.000", gayaHidup: "Petualang", loyalitas: "Tidak loyal" },
    { nama: "Joko Santoso", umur: 40, gender: "Laki-laki", lokasi: "Medan", pendapatan: "Rp 10.000.000", gayaHidup: "Konservatif", loyalitas: "Loyal" },
    { nama: "Rina Agustina", umur: 27, gender: "Perempuan", lokasi: "Jakarta", pendapatan: "Rp 9.000.000", gayaHidup: "Trendy", loyalitas: "Semi-loyal" },
    { nama: "Agus Prasetyo", umur: 33, gender: "Laki-laki", lokasi: "Bandung", pendapatan: "Rp 7.000.000", gayaHidup: "Aktif", loyalitas: "Tidak loyal" },
    { nama: "Nina Kurnia", umur: 26, gender: "Perempuan", lokasi: "Surabaya", pendapatan: "Rp 8.500.000", gayaHidup: "Trendy", loyalitas: "Loyal" },
    { nama: "Rudi Saputra", umur: 45, gender: "Laki-laki", lokasi: "Medan", pendapatan: "Rp 11.000.000", gayaHidup: "Konservatif", loyalitas: "Semi-loyal" },
    { nama: "Lina Putri", umur: 29, gender: "Perempuan", lokasi: "Yogyakarta", pendapatan: "Rp 6.500.000", gayaHidup: "Petualang", loyalitas: "Tidak loyal" },
    { nama: "Tommy Gunawan", umur: 31, gender: "Laki-laki", lokasi: "Jakarta", pendapatan: "Rp 9.200.000", gayaHidup: "Aktif", loyalitas: "Loyal" },
    { nama: "Diana Fitria", umur: 24, gender: "Perempuan", lokasi: "Bandung", pendapatan: "Rp 5.500.000", gayaHidup: "Trendy", loyalitas: "Semi-loyal" },
    { nama: "Arif Nugroho", umur: 37, gender: "Laki-laki", lokasi: "Surabaya", pendapatan: "Rp 10.500.000", gayaHidup: "Konservatif", loyalitas: "Loyal" },
    { nama: "Yuli Hartati", umur: 34, gender: "Perempuan", lokasi: "Yogyakarta", pendapatan: "Rp 8.700.000", gayaHidup: "Petualang", loyalitas: "Tidak loyal" },
    { nama: "Fajar Ramadhan", umur: 38, gender: "Laki-laki", lokasi: "Medan", pendapatan: "Rp 9.800.000", gayaHidup: "Aktif", loyalitas: "Loyal" },
    { nama: "Sari Nuraini", umur: 36, gender: "Perempuan", lokasi: "Jakarta", pendapatan: "Rp 10.000.000", gayaHidup: "Trendy", loyalitas: "Semi-loyal" },
    { nama: "Yusuf Hidayat", umur: 41, gender: "Laki-laki", lokasi: "Bandung", pendapatan: "Rp 12.500.000", gayaHidup: "Konservatif", loyalitas: "Tidak loyal" },
    { nama: "Rita Susanti", umur: 33, gender: "Perempuan", lokasi: "Surabaya", pendapatan: "Rp 9.300.000", gayaHidup: "Trendy", loyalitas: "Loyal" },
    { nama: "Fikri Maulana", umur: 29, gender: "Laki-laki", lokasi: "Medan", pendapatan: "Rp 7.700.000", gayaHidup: "Petualang", loyalitas: "Semi-loyal" },
    { nama: "Maya Sari", umur: 27, gender: "Perempuan", lokasi: "Yogyakarta", pendapatan: "Rp 6.800.000", gayaHidup: "Petualang", loyalitas: "Tidak loyal" },
    { nama: "Deni Kurniawan", umur: 32, gender: "Laki-laki", lokasi: "Jakarta", pendapatan: "Rp 8.600.000", gayaHidup: "Aktif", loyalitas: "Loyal" },
    { nama: "Lusi Amalia", umur: 29, gender: "Perempuan", lokasi: "Bandung", pendapatan: "Rp 7.200.000", gayaHidup: "Trendy", loyalitas: "Semi-loyal" },
    { nama: "Reza Pranata", umur: 35, gender: "Laki-laki", lokasi: "Surabaya", pendapatan: "Rp 11.200.000", gayaHidup: "Konservatif", loyalitas: "Tidak loyal" },
    { nama: "Ayu Melati", umur: 28, gender: "Perempuan", lokasi: "Medan", pendapatan: "Rp 9.900.000", gayaHidup: "Petualang", loyalitas: "Loyal" },
    { nama: "Dimas Saputra", umur: 34, gender: "Laki-laki", lokasi: "Jakarta", pendapatan: "Rp 10.300.000", gayaHidup: "Trendy", loyalitas: "Semi-loyal" },
    { nama: "Fitri Handayani", umur: 30, gender: "Perempuan", lokasi: "Yogyakarta", pendapatan: "Rp 7.300.000", gayaHidup: "Aktif", loyalitas: "Tidak loyal" },
    { nama: "Hendra Gunawan", umur: 36, gender: "Laki-laki", lokasi: "Bandung", pendapatan: "Rp 9.700.000", gayaHidup: "Konservatif", loyalitas: "Loyal" },
    { nama: "Indah Kurniasih", umur: 31, gender: "Perempuan", lokasi: "Surabaya", pendapatan: "Rp 8.900.000", gayaHidup: "Trendy", loyalitas: "Semi-loyal" },
    { nama: "Teguh Santoso", umur: 39, gender: "Laki-laki", lokasi: "Medan", pendapatan: "Rp 10.700.000", gayaHidup: "Petualang", loyalitas: "Tidak loyal" },
    { nama: "Rika Sari", umur: 26, gender: "Perempuan", lokasi: "Yogyakarta", pendapatan: "Rp 6.900.000", gayaHidup: "Aktif", loyalitas: "Loyal" },
  ];

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
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-red-700 mb-6">
        Market Segmentation
      </h1>

      <div className="max-w-7xl mx-auto">
        <input
          type="text"
          placeholder="Cari berdasarkan nama pelanggan..."
          className="mb-4 w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow text-sm">
            <thead className="bg-red-200 text-red-800 uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Nama</th>
                <th className="px-4 py-3 text-left">Umur</th>
                <th className="px-4 py-3 text-left">Gender</th>
                <th className="px-4 py-3 text-left">Lokasi</th>
                <th className="px-4 py-3 text-left">Pendapatan</th>
                <th className="px-4 py-3 text-left">Gaya Hidup</th>
                <th className="px-4 py-3 text-left">Loyalitas</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((cust, i) => (
                <tr key={i} className="border-b hover:bg-red-50">
                  <td className="px-4 py-2">{cust.nama}</td>
                  <td className="px-4 py-2">{cust.umur}</td>
                  <td className="px-4 py-2">{cust.gender}</td>
                  <td className="px-4 py-2">{cust.lokasi}</td>
                  <td className="px-4 py-2">{cust.pendapatan}</td>
                  <td className="px-4 py-2">{cust.gayaHidup}</td>
                  <td className="px-4 py-2">
                    <span className={`px-3 py-1 rounded-full font-semibold inline-block text-xs ${getLoyaltyColor(cust.loyalitas)}`}>
                      {cust.loyalitas}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center text-gray-500 mt-4">
              Data tidak ditemukan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
