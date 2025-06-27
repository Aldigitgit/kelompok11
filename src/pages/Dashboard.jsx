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

  useEffect(() => {
    const interval = setInterval(() => {
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

  const barData = {
    labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    datasets: [
      {
        label: "Penjualan Harian (Buku)",
        data: dailySales,
        backgroundColor: "rgba(238, 35, 35, 0.7)", // merah soft (red-400)
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "red" },
      },
      title: {
        display: true,
        text: "Penjualan Harian Minggu Ini",
        color: "grey",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "red" },
      },
      x: {
        ticks: { color: "red" },
      },
    },
  };

  const doughnutData = {
    labels: Object.keys(genreSales),
    datasets: [
      {
        label: "Penjualan per Genre",
        data: Object.values(genreSales),
        backgroundColor: [
          "#f87171", // red-400
          "#fb923c", // orange-400
          "#facc15", // yellow-400
          "#34d399", // green-400
          "#60a5fa", // blue-400
          "#a3a3a3", // gray-400
        ],
        hoverOffset: 30,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: { color: "red" },
      },
      title: {
        display: true,
        text: "Penjualan per Genre",
        color: "grey",
        font: { size: 18 },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-white to-indigo-50 p-8 text-black-700">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Dashboard Bookstore Realtime
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {[
            {
              label: "Total Buku",
              value: stats.totalBooks,
              icon: (
                <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l9-5-9-5-9 5 9 5z" />
                </svg>
              ),
            },
            {
              label: "Penjualan Hari Ini",
              value: stats.salesToday,
              icon: (
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18M7 18h10" />
                </svg>
              ),
            },
            {
              label: "Pelanggan Aktif",
              value: stats.activeCustomers,
              icon: (
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="12" cy="7" r="4" />
                  <path d="M5.5 21a6.5 6.5 0 0113 0" />
                </svg>
              ),
            },
            {
              label: "Promo Berjalan",
              value: stats.ongoingPromos,
              icon: (
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M12 8v8m0 0l3-3m-3 3l-3-3" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              ),
            },
          ].map(({ label, value, icon }) => (
            <div key={label} className="flex items-center space-x-4 bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
              <div className="p-3 bg-indigo-100 rounded-lg">{icon}</div>
              <div>
                <p className="text-grey-700">{label}</p>
                <p className="text-2xl font-semibold text-grey-700">{value}</p>
              </div>
            </div>
          ))}
        </div>

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
