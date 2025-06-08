import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Penjadwalan() {
  const [konten, setKonten] = useState("");
  const [tanggal, setTanggal] = useState(new Date());

  const [jadwal, setJadwal] = useState([
    {
      id: 1,
      konten: "Promo diskon 20% untuk pelanggan baru!",
      tanggal: new Date(new Date().getTime() + 3600 * 1000 * 24), // Besok
    },
    {
      id: 2,
      konten: "Tips sukses jualan online bagi UMKM.",
      tanggal: new Date(new Date().getTime() + 3600 * 1000 * 48), // Lusa
    },
  ]);

  const handleJadwalkan = () => {
    if (!konten.trim()) return;

    const dataBaru = {
      id: Date.now(),
      konten: konten.trim(),
      tanggal,
    };

    setJadwal((prev) => [...prev, dataBaru]);
    setKonten("");
    setTanggal(new Date());
  };

  const handleHapus = (id) => {
    setJadwal((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-medium mb-6 text-center text-indigo-700">
        Penjadwalan Posting
      </h1>

      <div className="mb-6">
        <label htmlFor="konten" className="block text-gray-700 font-semibold mb-2">
          Konten Posting
        </label>
        <textarea
          id="konten"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm resize-none focus:ring-2 focus:ring-indigo-500"
          rows={4}
          placeholder="Tulis konten posting di sini..."
          value={konten}
          onChange={(e) => setKonten(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700">
          Tanggal & Waktu Posting
        </label>
        <DatePicker
          selected={tanggal}
          onChange={(date) => setTanggal(date)}
          showTimeSelect
          dateFormat="Pp"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <button
        onClick={handleJadwalkan}
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300"
        disabled={!konten.trim()}
      >
        Jadwalkan
      </button>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-indigo-700 border-b border-indigo-200 pb-2">
        Daftar Postingan Terjadwal
      </h2>

      {jadwal.length === 0 ? (
        <p className="text-center text-gray-500 italic">Belum ada jadwal posting.</p>
      ) : (
        <ul className="space-y-4 max-h-80 overflow-y-auto">
          {jadwal.map((item) => (
            <li
              key={item.id}
              className="p-4 border border-gray-200 rounded-lg shadow-sm flex justify-between items-start bg-gray-50"
            >
              <div>
                <p className="text-gray-800 whitespace-pre-wrap">{item.konten}</p>
                <p className="mt-1 text-sm text-gray-500">
                  📅{" "}
                  <time>
                    {item.tanggal instanceof Date && !isNaN(item.tanggal)
                      ? item.tanggal.toLocaleString()
                      : "Tanggal tidak valid"}
                  </time>
                </p>
              </div>
              <button
                onClick={() => handleHapus(item.id)}
                className="text-red-600 hover:text-red-800 font-semibold ml-4"
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
