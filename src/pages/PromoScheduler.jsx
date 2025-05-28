import React, { useEffect, useState } from "react";

export default function PromoSchedulerWithNotification() {
  const [promoList, setPromoList] = useState([
    {
      id: 1,
      name: "Diskon Lebaran",
      type: "diskon",
      startDate: "2025-05-27",
      endDate: "2025-05-29",
    },
    {
      id: 2,
      name: "Flash Sale Akhir Bulan",
      type: "flash sale",
      startDate: "2025-05-30",
      endDate: "2025-05-31",
    },
  ]);

  const [activePromos, setActivePromos] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const active = promoList.filter(
      (p) => p.startDate <= today && p.endDate >= today
    );
    setActivePromos(active);

    if (active.length > 0) {
      alert(
        `Notifikasi Promo Aktif:\n${active
          .map((p) => `${p.name} (${p.type}) sampai ${p.endDate}`)
          .join("\n")}`
      );
      console.log(
        "Dummy Email Sent: Promo aktif hari ini:",
        active.map((p) => `${p.name} (${p.type}) sampai ${p.endDate}`).join(", ")
      );
    }
  }, [promoList]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4">Penjadwalan Promo Otomatis</h1>

      <h2 className="text-xl font-semibold mb-3">Promo Terjadwal</h2>
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
                <p className="font-semibold">
                  {name} ({type})
                </p>
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
