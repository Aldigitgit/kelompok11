import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Penjadwalan() {
  const [konten, setKonten] = useState("");
  const [tanggal, setTanggal] = useState(new Date());
  const [jadwal, setJadwal] = useState([]);

  useEffect(() => {
    const dataDisimpan = localStorage.getItem("jadwal");
    if (dataDisimpan) {
      setJadwal(
        JSON.parse(dataDisimpan, (key, value) => {
          if (key === "tanggal") return new Date(value);
          return value;
        })
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("jadwal", JSON.stringify(jadwal));
  }, [jadwal]);

  const handleJadwalkan = () => {
    if (!konten.trim()) return;
    const dataBaru = { id: Date.now(), konten, tanggal };
    setJadwal([...jadwal, dataBaru]);
    setKonten("");
    setTanggal(new Date());
  };

  const handleHapus = (id) => {
    setJadwal(jadwal.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-3xl block font-medium mb-6 text-center text-indigo-700">
        Penjadwalan Posting
      </h1>

      <div className="mb-6">
        <label
          htmlFor="konten"
          className="block text-gray-700 font-semibold mb-2"
        >
          Konten Posting
        </label>
        <textarea
          id="konten"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition"
          rows={5}
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
          className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          popperPlacement="bottom-start"
        />
      </div>

      <button
        onClick={handleJadwalkan}
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-shadow shadow-md"
        aria-label="Jadwalkan Posting"
      >
        Jadwalkan
      </button>

      <h2 className="text-2xl font-semibold mt-10 mb-4 border-b border-indigo-200 pb-2 text-indigo-700">
        Daftar Postingan Terjadwal
      </h2>

      {jadwal.length === 0 ? (
        <p className="text-center text-gray-500 italic">Belum ada jadwal posting.</p>
      ) : (
        <ul className="space-y-4 max-h-80 overflow-y-auto">
          {jadwal.map((item) => (
            <li
              key={item.id}
              className="p-4 border border-gray-200 rounded-lg shadow-sm flex justify-between items-start bg-gray-50 hover:bg-white transition"
            >
              <div>
                <p className="text-gray-800 whitespace-pre-wrap">{item.konten}</p>
                <p className="mt-1 text-sm text-gray-500 flex items-center space-x-1">
                  <span>📅</span>
                  <time>{item.tanggal.toLocaleString()}</time>
                </p>
              </div>
              <button
                onClick={() => handleHapus(item.id)}
                className="text-red-600 hover:text-red-800 font-semibold ml-4 self-start focus:outline-none"
                aria-label={`Hapus posting ${item.konten.substring(0, 15)}...`}
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
