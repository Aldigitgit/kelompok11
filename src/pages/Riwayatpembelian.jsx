import React from 'react';

const data = [
  { tanggal: '28 Mei 2025', produk: 'Buku Anak', jumlah: 1, harga: 50000, status: 'Selesai' },
  { tanggal: '27 Mei 2025', produk: 'Puzzle Edukasi', jumlah: 2, harga: 35000, status: 'Dibatalkan' },
  { tanggal: '25 Mei 2025', produk: 'Stiker', jumlah: 3, harga: 10000, status: 'Selesai' },
];

function RiwayatPembelian() {
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Riwayat Pembelian</h2>
      <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Tambah Pembelian
      </button>
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Tanggal</th>
            <th className="p-3 border">Produk</th>
            <th className="p-3 border">Jumlah</th>
            <th className="p-3 border">Harga</th>
            <th className="p-3 border">Total</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="text-center hover:bg-gray-50">
              <td className="p-3 border">{item.tanggal}</td>
              <td className="p-3 border">{item.produk}</td>
              <td className="p-3 border">{item.jumlah}</td>
              <td className="p-3 border">Rp{item.harga.toLocaleString()}</td>
              <td className="p-3 border">Rp{(item.harga * item.jumlah).toLocaleString()}</td>
              <td className="p-3 border">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    item.status === 'Selesai'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="p-3 border">
                <button className="text-blue-600 hover:underline mr-2">Edit</button>
                <button className="text-red-600 hover:underline">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RiwayatPembelian;
