import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function MarketSegmentationDynamic() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSegmentasi = async () => {
      // Ambil semua akun
      const { data: accounts, error: accErr } = await supabase
        .from("account")
        .select("id, name, email, wilayah, created_at");

      if (accErr) {
        console.error("Gagal ambil akun:", accErr.message);
        return;
      }

      const now = new Date();
      const twelveMonthsAgo = new Date(now.setFullYear(now.getFullYear() - 1));

      // Ambil semua orders 12 bulan terakhir
      const { data: orders, error: orderErr } = await supabase
        .from("orders")
        .select("account_id, total, created_at")
        .gte("created_at", twelveMonthsAgo.toISOString());

      if (orderErr) {
        console.error("Gagal ambil orders:", orderErr.message);
        return;
      }

      // Gabungkan dan hitung total per user
      const result = accounts.map((acc) => {
        const orderUser = orders.filter((o) => o.account_id === acc.id);
        const total = orderUser.reduce((sum, o) => sum + o.total, 0);

        let segmentasi = "Silver";
        if (total >= 5000000) segmentasi = "Platinum";
        else if (total >= 2000000) segmentasi = "Gold";

        return {
          ...acc,
          totalTransaksi: total,
          segmentasi,
        };
      });

      setData(result);
    };

    fetchSegmentasi();
  }, []);

  const getSegmentColor = (level) => {
    switch (level) {
      case "Platinum":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "Gold":
        return "bg-orange-100 text-orange-800 border border-orange-300";
      case "Silver":
        return "bg-gray-100 text-gray-800 border border-gray-300";
      default:
        return "";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Segmentasi Pelanggan Berdasarkan Total Transaksi
      </h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-red-200 text-red-800 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Nama</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Wilayah</th>
              <th className="px-6 py-4 text-left">Total Transaksi</th>
              <th className="px-6 py-4 text-left">Segmentasi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, i) => (
              <tr key={i} className="border-b hover:bg-red-50 transition">
                <td className="px-6 py-3">{user.name}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.wilayah}</td>
                <td className="px-6 py-3">
                  Rp {user.totalTransaksi.toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 rounded-full font-semibold text-xs ${getSegmentColor(
                      user.segmentasi
                    )}`}
                  >
                    {user.segmentasi}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            <p className="text-lg">Data pelanggan belum tersedia.</p>
          </div>
        )}
      </div>
    </div>
  );
}
