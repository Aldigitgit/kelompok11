import React, { useState } from "react";

export default function PromoScheduler() {
  const [promoName, setPromoName] = useState("");
  const [promoType, setPromoType] = useState("diskon");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [promoList, setPromoList] = useState([]);

  const handleAddPromo = () => {
    if (!promoName || !startDate || !endDate) {
      alert("Mohon isi semua field");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      alert("Tanggal mulai harus sebelum tanggal berakhir");
      return;
    }

    const newPromo = {
      id: Date.now(),
      name: promoName,
      type: promoType,
      startDate,
      endDate,
    };

    setPromoList([...promoList, newPromo]);
    setPromoName("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4">Penjadwalan Promo Otomatis</h1>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Nama Promo:</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={promoName}
          onChange={(e) => setPromoName(e.target.value)}
          placeholder="Misal: Diskon Lebaran"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Tipe Promo:</label>
        <select
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={promoType}
          onChange={(e) => setPromoType(e.target.value)}
        >
          <option value="diskon">Diskon</option>
          <option value="flash sale">Flash Sale</option>
        </select>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold">Tanggal Mulai:</label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Tanggal Berakhir:</label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={handleAddPromo}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Jadwalkan Promo
      </button>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-3">Daftar Promo Terjadwal</h2>
      {promoList.length === 0 ? (
        <p className="text-gray-500">Belum ada promo terjadwal.</p>
      ) : (
        <ul className="space-y-3">
          {promoList.map(({ id, name, type, startDate, endDate }) => (
            <li
              key={id}
              className="border p-3 rounded-md bg-gray-50 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{name} ({type})</p>
                <p className="text-sm text-gray-600">
                  {startDate} sampai {endDate}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
