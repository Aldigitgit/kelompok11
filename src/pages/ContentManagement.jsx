import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const dummyData = Array(10).fill({
  nama: "The #1 Dad Book",
  penulis: "James Potterman",
  kategori: "History",
  harga: "Rp.446.000",
  cover: "https://i.ibb.co/MNBcqk0/book-cover.png" // Ganti dengan URL cover kamu jika perlu
});

export default function ContentManagement() {
  const [search, setSearch] = useState("");

  const filteredData = dummyData.filter(item =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-white-100 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Cari"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded-md border w-1/3 shadow-sm"
        />
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          + Tambah
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left bg-white rounded-xl shadow-md">
          <thead className="text-xs text-red-800 uppercase bg-red-200">
            <tr>
              <th className="px-6 py-3">Nama</th>
              <th className="px-6 py-3">Penulis</th>
              <th className="px-6 py-3">Kategori</th>
              <th className="px-6 py-3">Harga</th>
              <th className="px-6 py-3">Cover Buku</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {filteredData.map((book, index) => (
              <tr key={index} className="border-b hover:bg-red-50">
                <td className="px-6 py-3">{book.nama}</td>
                <td className="px-6 py-3">{book.penulis}</td>
                <td className="px-6 py-3">{book.kategori}</td>
                <td className="px-6 py-3">{book.harga}</td>
                <td className="px-6 py-3">
                  <img src={book.cover} alt="Cover Buku" className="h-12 w-auto" />
                </td>
                <td className="px-6 py-3 flex gap-3">
                  <button className="text-blue-500 hover:text-blue-700">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
