import React, { useState } from "react";

const initialDataStok = [
  {
    jenis: "Novel",
    stok: 120,
    color: "text-green-600",
    changeColor: "text-green-400",
    change: 0,
  },
  {
    jenis: "Buku Anak",
    stok: 85,
    color: "text-blue-600",
    changeColor: "text-red-400",
    change: 0,
  },
  {
    jenis: "Buku Nonfiksi",
    stok: 60,
    color: "text-red-600",
    changeColor: "text-green-400",
    change: 0,
  },
  {
    jenis: "Buku Pelajaran",
    stok: 200,
    color: "text-purple-600",
    changeColor: "text-green-400",
    change: 0,
  },
  {
    jenis: "Buku Komik",
    stok: 150,
    color: "text-yellow-600",
    changeColor: "text-gray-400",
    change: 0,
  },
];

export default function StokDashboard() {
  const [dataStok, setDataStok] = useState(initialDataStok);
  const [jenis, setJenis] = useState(initialDataStok[0].jenis);
  const [jumlah, setJumlah] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const jumlahAngka = parseInt(jumlah, 10);
    if (isNaN(jumlahAngka) || jumlahAngka <= 0) return;

    setDataStok((prevData) =>
      prevData.map((item) => {
        if (item.jenis === jenis) {
          const newStok = item.stok + jumlahAngka;
          const changeValue = jumlahAngka;
          return {
            ...item,
            stok: newStok,
            change: changeValue,
            changeColor: changeValue >= 0 ? "text-green-400" : "text-red-400",
          };
        }
        return item;
      })
    );
    setJumlah("");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Card list */}
      <div className="flex flex-wrap gap-4 mb-8 max-w-full justify-center">
        {dataStok.map((item, index) => (
          <div
            key={index}
            className="flex-1 min-w-[220px] max-w-xs bg-white rounded-xl shadow p-4"
          >
            <p className="text-sm text-gray-500 mb-1">Stok {item.jenis}</p>
            <div className="text-xl font-bold flex items-center space-x-2">
              <span className={item.color}>{item.stok}</span>
              <span className={`text-sm font-semibold ${item.changeColor}`}>
                {item.change > 0
                  ? `+${item.change}`
                  : item.change === 0
                  ? ""
                  : item.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Form tambah stok */}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white rounded-xl shadow p-8"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Tambah Stok Buku
        </h2>

        <div className="mb-6">
          <label
            htmlFor="jenis"
            className="block text-base font-medium mb-2 text-gray-700"
          >
            Pilih Jenis Buku
          </label>
          <select
            id="jenis"
            value={jenis}
            onChange={(e) => setJenis(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            {dataStok.map((item) => (
              <option key={item.jenis} value={item.jenis}>
                {item.jenis}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="jumlah"
            className="block text-base font-medium mb-2 text-gray-700"
          >
            Jumlah Tambah Stok
          </label>
          <input
            id="jumlah"
            type="number"
            min="1"
            value={jumlah}
            onChange={(e) => setJumlah(e.target.value)}
            placeholder="Masukkan jumlah"
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
        >
          Tambah Stok
        </button>
      </form>
    </div>
  );
}
