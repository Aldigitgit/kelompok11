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
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function BookstoreDashboard() {
  // --- EXISTING STATE ---
  const [stats, setStats] = useState({
    totalBooks: 1280,
    salesToday: 350,
    activeCustomers: 120,
    ongoingPromos: 3,
  });

  const [dailySales, setDailySales] = useState([30, 45, 50, 40, 55, 60, 70]);

  const [genreSales, setGenreSales] = useState({
    Fiction: 350,
    "Self-Help": 200,
    "Science & Tech": 150,
    Romance: 120,
    Mystery: 80,
    Others: 40,
  });

  const [selectedMonth, setSelectedMonth] = useState("Juni");

  const ratingPerMonth = {
    Januari: { 1: 5, 2: 10, 3: 20, 4: 40, 5: 80 },
    Februari: { 1: 4, 2: 9, 3: 22, 4: 55, 5: 90 },
    Maret: { 1: 6, 2: 8, 3: 25, 4: 65, 5: 100 },
    April: { 1: 7, 2: 12, 3: 27, 4: 80, 5: 110 },
    Mei: { 1: 9, 2: 15, 3: 35, 4: 90, 5: 130 },
    Juni: { 1: 12, 2: 25, 3: 65, 4: 120, 5: 220 },
  };

  const [customerRatings, setCustomerRatings] = useState(ratingPerMonth[selectedMonth]);
  // --- END EXISTING STATE ---

  // --- NEW STATE: CUSTOMER REVIEWS & BRANCH REVENUE ---
  const [customerReviews, setCustomerReviews] = useState([
    { id: 1, customerName: "Budi Santoso", bookTitle: "The Great Gatsby", rating: 5, comment: "Buku ini luar biasa, ceritanya sangat menyentuh dan bikin penasaran!", date: "2025-06-29" },
    { id: 2, customerName: "Siti Rahayu", bookTitle: "Atomic Habits", rating: 4, comment: "Sangat inspiratif, memberikan panduan praktis untuk kebiasaan baik yang mudah diikuti.", date: "2025-06-28" },
    { id: 3, customerName: "Ahmad Dani", bookTitle: "Sapiens: A. Brief History of Humankind", rating: 5, comment: "Membuka wawasan baru tentang sejarah manusia dari perspektif yang unik. Wajib dibaca!", date: "2025-06-27" },
    { id: 4, customerName: "Dewi Lestari", bookTitle: "1984", rating: 3, comment: "Cerita bagus dan relevan, tapi alur terasa agak berat dan lambat di beberapa bagian.", date: "2025-06-26" },
    { id: 5, customerName: "Agus Salim", bookTitle: "The Midnight Library", rating: 5, comment: "Fantastis! Membuat saya merenung tentang pilihan hidup dan takdir. Sangat direkomendasikan.", date: "2025-06-25" },
    { id: 6, customerName: "Maya Indah", bookTitle: "Educated", rating: 4, comment: "Kisah inspiratif tentang perjuangan dan pendidikan. Mengharukan sekaligus memotivasi.", date: "2025-06-24" },
  ]);

  const [branchRevenue, setBranchRevenue] = useState({
    "Jakarta (Grand Indo)": 55000000,
    "Bandung (Paris Van Java)": 32000000,
    "Surabaya (Tunjungan Plaza)": 48000000,
    "Yogyakarta (Ambarrukmo)": 28000000,
    "Medan (Center Point)": 22000000,
    "Denpasar (Level 21)": 38000000,
    "Semarang (Paragon)": 25000000,
  });
  // --- END NEW STATE ---

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

  useEffect(() => {
    setCustomerRatings(ratingPerMonth[selectedMonth]);
  }, [selectedMonth]);

  const barData = {
    labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    datasets: [
      {
        label: "Penjualan Harian (Buku)",
        data: dailySales,
        backgroundColor: "rgba(192, 57, 43, 0.8)", // Merah Periplus
        borderRadius: 4, // Rounded bars
      },
    ],
  };

  const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#4A5568" }, // Darker grey for better contrast
      },
      title: {
        display: true,
        color: "#2D3748", // Darker grey for titles
        font: { size: 18, weight: 'bold' }, // Make title bold
        padding: { top: 10, bottom: 20 }
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        bodyColor: '#fff',
        titleColor: '#fff',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#4b5563" }, // Darker grey
        grid: {
          color: "#E2E8F0", // Lighter grid lines
        },
      },
      x: {
        ticks: { color: "#4b5563" }, // Darker grey
        grid: {
          color: "#E2E8F0", // Lighter grid lines
        },
      },
    },
  };

  const barOptions = {
    ...commonChartOptions,
    plugins: {
      ...commonChartOptions.plugins,
      legend: {
        position: "bottom", // Adjust legend position for bar chart
      },
      title: {
        ...commonChartOptions.plugins.title,
        text: "Penjualan Harian Minggu Ini",
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
          "#C0392B", // Merah gelap
          "#E74C3C", // Merah standar
          "#F1C40F", // Kuning (kontras)
          "#27AE60", // Hijau (kontras)
          "#3498DB", // Biru (kontras)
          "#8E44AD", // Ungu (kontras)
        ], // Periplus-inspired colors
        hoverOffset: 30,
      },
    ],
  };

  const doughnutOptions = {
    ...commonChartOptions,
    plugins: {
      ...commonChartOptions.plugins,
      legend: {
        position: "right", // Legend for donut often looks better on the right
      },
      title: {
        ...commonChartOptions.plugins.title,
        text: "Distribusi Penjualan Berdasarkan Genre",
      },
    },
  };

  const doughnutDataRating = {
    labels: ["⭐ 1", "⭐ 2", "⭐ 3", "⭐ 4", "⭐ 5"],
    datasets: [
      {
        label: "Distribusi Rating",
        data: Object.values(customerRatings),
        backgroundColor: ["#E74C3C", "#F39C12", "#F1C40F", "#2ECC71", "#3498DB"], // Colors for ratings (red, orange, yellow, green, blue)
        hoverOffset: 20,
      },
    ],
  };

  const doughnutRatingOptions = {
    ...commonChartOptions,
    plugins: {
      ...commonChartOptions.plugins,
      legend: {
        position: "bottom",
      },
      title: {
        ...commonChartOptions.plugins.title,
        text: "Distribusi Rating Pelanggan",
      },
    },
  };

  const lineData = {
    labels: Object.keys(ratingPerMonth),
    datasets: [
      {
        label: "Rata-Rata Rating",
        data: Object.values(ratingPerMonth).map((ratingObj) => {
          const total = Object.entries(ratingObj).reduce((sum, [key, val]) => sum + parseInt(key) * val, 0);
          const count = Object.values(ratingObj).reduce((a, b) => a + b, 0);
          return (total / count).toFixed(2);
        }),
        fill: false,
        borderColor: "#C0392B", // Merah Periplus
        backgroundColor: "#C0392B",
        tension: 0.3,
      },
    ],
  };

  const lineOptions = {
    ...commonChartOptions,
    plugins: {
      ...commonChartOptions.plugins,
      title: {
        ...commonChartOptions.plugins.title,
        text: "Tren Rata-Rata Rating per Bulan",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: { stepSize: 1, color: "#4b5563" },
        grid: {
          color: "#e5e7eb",
        },
      },
      x: {
        ticks: { color: "#4b5563" },
        grid: {
          color: "#e5e7eb",
        },
      },
    },
  };

  const averageRating = (
    Object.entries(customerRatings).reduce((acc, [rating, count]) => acc + parseInt(rating) * count, 0) /
    Object.values(customerRatings).reduce((a, b) => a + b, 0)
  ).toFixed(1);

  // --- NEW: BRANCH REVENUE CHART DATA & OPTIONS ---
  const branchRevenueData = {
    labels: Object.keys(branchRevenue),
    datasets: [
      {
        label: "Pendapatan Bulanan (IDR)",
        data: Object.values(branchRevenue),
        backgroundColor: "rgba(231, 76, 60, 0.8)", // Merah terang untuk pendapatan cabang
        borderRadius: 4,
      },
    ],
  };

  const branchRevenueOptions = {
    ...commonChartOptions,
    indexAxis: 'y', // Make it a horizontal bar chart
    plugins: {
      ...commonChartOptions.plugins,
      legend: {
        position: "top",
      },
      title: {
        ...commonChartOptions.plugins.title,
        text: "Pendapatan per Cabang Periplus",
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.x !== null) {
              label += new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(context.parsed.x);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: "#4b5563",
          callback: function(value) { // Format x-axis ticks as currency
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
          }
        },
        grid: {
          color: "#E2E8F0",
        },
      },
      y: {
        ticks: { color: "#4b5563" },
        grid: {
          display: false, // No vertical grid lines for horizontal chart
        },
      },
    },
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className={`w-4 h-4 ${i < rating ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
   

      <div className="container mx-auto p-8">
        {/* Key Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {[
            {
              label: "Total Buku Tersedia",
              value: stats.totalBooks,
              icon: (
                <svg className="w-9 h-9 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"> {/* Icon red */}
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l9-5-9-5-9 5 9 5z" />
                </svg>
              ),
              description: "Jumlah keseluruhan buku di inventaris.",
            },
            {
              label: "Penjualan Hari Ini",
              value: stats.salesToday,
              icon: (
                <svg className="w-9 h-9 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"> {/* Icon red */}
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18M7 18h10" />
                </svg>
              ),
              description: "Total buku terjual hari ini.",
            },
            {
              label: "Pelanggan Aktif",
              value: stats.activeCustomers,
              icon: (
                <svg className="w-9 h-9 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"> {/* Icon red */}
                  <circle cx="12" cy="7" r="4" />
                  <path d="M5.5 21a6.5 6.5 0 0113 0" />
                </svg>
              ),
              description: "Jumlah pelanggan yang sedang aktif berinteraksi.",
            },
            {
              label: "Promo Berjalan",
              value: stats.ongoingPromos,
              icon: (
                <svg className="w-9 h-9 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"> {/* Icon red */}
                  <path d="M12 8v8m0 0l3-3m-3 3l-3-3" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              ),
              description: "Jumlah promosi yang sedang berlaku.",
            },
            {
              label: "Rata-Rata Rating",
              value: averageRating,
              icon: (
                <svg className="w-9 h-9 text-yellow-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ),
              description: "Rating pelanggan rata-rata untuk buku.",
            },
          ].map(({ label, value, icon, description }) => (
            <div key={label} className="flex flex-col items-center justify-center space-y-3 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
              <div className="p-4 bg-gray-100 rounded-full flex items-center justify-center">
                {icon}
              </div>
              <p className="text-sm text-gray-600 font-medium">{label}</p>
              <p className="text-3xl font-extrabold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 text-center mt-2">{description}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Daily Sales Bar Chart */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center" style={{ height: '400px' }}>
            <Bar data={barData} options={barOptions} />
          </div>

          {/* Genre Sales Doughnut Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center" style={{ height: '400px' }}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>

        {/* Customer Rating & Trend Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Customer Rating Distribution Doughnut Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center" style={{ height: '400px' }}>
            <div className="mb-4 w-full">
              <label className="block text-gray-700 font-semibold mb-2 text-center">Pilih Bulan untuk Rating Pelanggan:</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700 bg-white transition duration-150 ease-in-out" // Focus ring red
              >
                {Object.keys(ratingPerMonth).map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <Doughnut data={doughnutDataRating} options={doughnutRatingOptions} />
          </div>

          {/* Average Rating Trend Line Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center" style={{ height: '400px' }}>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        {/* NEW SECTION: Customer Reviews & Branch Revenue */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Penilaian Pelanggan Terbaru */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col" style={{ minHeight: '400px' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Penilaian Pelanggan Terbaru</h3>
            <div className="flex-grow overflow-y-auto pr-2"> {/* Added pr-2 for scrollbar space */}
              <ul className="space-y-4">
                {customerReviews.map((review) => (
                  <li key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-md font-semibold text-gray-800">{review.customerName}</p>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-1">"{review.bookTitle}"</p>
                    <div className="flex items-center mb-2">
                      {renderStars(review.rating)}
                      <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {review.comment}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <button className="mt-6 self-center bg-red-600 text-white text-md px-6 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"> {/* Button red */}
              Lihat Semua Ulasan
            </button>
          </div>

          {/* Pendapatan per Cabang Periplus */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center" style={{ height: '400px' }}>
            <Bar data={branchRevenueData} options={branchRevenueOptions} />
          </div>
        </div>

      </div>
    </div>
  );
}