import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function BookstoreDashboard() {
  // Simulasi data realtime pakai useState dan useEffect
  const [stats, setStats] = useState({
    totalBooks: 1280,
    salesToday: 350,
    activeCustomers: 120,
    ongoingPromos: 3,
  });

  const [dailySales, setDailySales] = useState([
    30, 45, 50, 40, 55, 60, 70,
  ]);

  const [genreSales, setGenreSales] = useState({
    Fiction: 350,
    "Self-Help": 200,
    "Science & Tech": 150,
    Romance: 120,
    Mystery: 80,
    Others: 40,
  });

  // Simulate realtime updates (dummy)
  useEffect(() => {
    const interval = setInterval(() => {
      // Update salesToday randomly + dailySales shift for demo
      setStats((prev) => ({
        ...prev,
        salesToday: prev.salesToday + Math.floor(Math.random() * 10),
        activeCustomers: prev.activeCustomers + Math.floor(Math.random() * 3) - 1,
      }));

      setDailySales((prev) => {
        const next = [...prev.slice(1), prev[prev.length - 1] + Math.floor(Math.random() * 10 - 5)];
        return next.map((v) => (v < 0 ? 0 : v));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Data Bar Chart - Penjualan Harian Minggu Ini
  const barData = {
    labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    datasets: [
      {
        label: "Penjualan Harian (Buku)",
        data: dailySales,
        backgroundColor: "rgba(59, 130, 246, 0.7)", // Tailwind blue-500
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Penjualan Harian Minggu Ini" },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Data Doughnut Chart - Genre Populer
  const doughnutData = {
    labels: Object.keys(genreSales),
    datasets: [
      {
        label: "Penjualan per Genre",
        data: Object.values(genreSales),
        backgroundColor: [
          "#3b82f6", // blue-500
          "#f97316", // orange-500
          "#10b981", // green-500
          "#8b5cf6", // purple-500
          "#ef4444", // red-500
          "#9ca3af", // gray-400
        ],
        hoverOffset: 30,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: { position: "right" },
      title: { display: true, text: "Penjualan per Genre" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-white to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-10 text-center">
          Dashboard Bookstore Realtime
        </h1>

        {/* Statistik Utama */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Card Template */}
          {[
            {
              label: "Total Buku",
              value: stats.totalBooks,
              icon: (
                <svg
                  className="w-8 h-8 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 12l9-5-9-5-9 5 9 5z"
                  />
                </svg>
              ),
            },
            {
              label: "Penjualan Hari Ini",
              value: stats.salesToday,
              icon: (
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18M7 18h10" />
                </svg>
              ),
            },
            {
              label: "Pelanggan Aktif",
              value: stats.activeCustomers,
              icon: (
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="7" r="4" />
                  <path d="M5.5 21a6.5 6.5 0 0113 0" />
                </svg>
              ),
            },
            {
              label: "Promo Berjalan",
              value: stats.ongoingPromos,
              icon: (
                <svg
                  className="w-8 h-8 text-pink-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 8v8m0 0l3-3m-3 3l-3-3" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              ),
            },
          ].map(({ label, value, icon }) => (
            <div
              key={label}
              className="flex items-center space-x-4 bg-white rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <div className="p-3 bg-indigo-100 rounded-lg">{icon}</div>
              <div>
                <p className="text-gray-500">{label}</p>
                <p className="text-2xl font-semibold text-indigo-700">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Grafik */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="bg-white rounded-xl shadow p-6">
            <Bar data={barData} options={barOptions} />
          </div>

          <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
