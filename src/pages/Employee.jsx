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

export default function EmployeeDashboard() {
  // Dummy Data (replace with actual API calls in a real app)
  const [stats, setStats] = useState({
    totalEmployees: 1250,
    newHiresMonth: 25,
    departuresMonth: 5,
    avgTenureYears: 3.8,
    pendingLeaveRequests: 15,
  });

  const [departmentData] = useState({
    labels: ["Pemasaran", "IT", "Keuangan", "Operasional", "HRD", "Penjualan"],
    datasets: [{
      label: "Jumlah Karyawan",
      data: [200, 350, 150, 300, 50, 200],
      backgroundColor: [
        '#004d40', // Dark Green (Periplus feel)
        '#0277bd', // Dark Blue
        '#d84315', // Dark Orange
        '#5e35b1', // Dark Purple
        '#c2185b', // Dark Pink
        '#00838f', // Teal
      ],
      hoverOffset: 10,
    }],
  });

  const [jobLevelData] = useState({
    labels: ["Staff", "Supervisor", "Manager", "Senior Manager", "Director"],
    datasets: [{
      label: "Jumlah Karyawan",
      data: [700, 300, 180, 50, 20],
      backgroundColor: '#004d40', // Consistent Periplus accent
    }],
  });

  const [turnoverData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    datasets: [
      {
        label: "Karyawan Masuk",
        data: [10, 15, 12, 18, 20, 25],
        borderColor: '#38A169', // Green for positive
        backgroundColor: '#38A169',
        tension: 0.3,
      },
      {
        label: "Karyawan Keluar",
        data: [3, 5, 4, 6, 5, 5],
        borderColor: '#E53E3E', // Red for negative
        backgroundColor: '#E53E3E',
        tension: 0.3,
      },
    ],
  });

  const [recentHires] = useState([
    { name: "Andi Wijaya", department: "IT", joinDate: "2025-06-28" },
    { name: "Budi Santoso", department: "Pemasaran", joinDate: "2025-06-25" },
    { name: "Citra Dewi", department: "Keuangan", joinDate: "2025-06-20" },
    { name: "Dwi Putra", department: "Operasional", joinDate: "2025-06-15" },
  ]);

  // --- NEW STATE FOR ANNOUNCEMENTS ---
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "Libur Nasional Idul Adha", date: "2025-06-16", target: "Seluruh Karyawan", content: "Mohon diperhatikan bahwa kantor akan libur pada tanggal 16 Juni 2025 dalam rangka Hari Raya Idul Adha." },
    { id: 2, title: "Evaluasi Kinerja Q2", date: "2025-06-10", target: "Divisi Pemasaran, IT", content: "Seluruh karyawan Divisi Pemasaran dan IT diwajibkan mengisi formulir evaluasi kinerja Q2 paling lambat 15 Juni 2025." },
    { id: 3, title: "Pelatihan Keterampilan Digital", date: "2025-06-05", target: "Seluruh Karyawan", content: "Dapatkan kesempatan mengikuti pelatihan keterampilan digital gratis pada tanggal 20 Juni 2025. Daftarkan diri Anda sekarang!" },
  ]);

  const [showNewAnnouncementModal, setShowNewAnnouncementModal] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    target: "all", // 'all' or 'specific'
    selectedDivisions: [],
  });

  const availableDivisions = ["Pemasaran", "IT", "Keuangan", "Operasional", "HRD", "Penjualan"];

  const handleNewAnnouncementChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement((prev) => ({ ...prev, [name]: value }));
  };

  const handleDivisionChange = (division) => {
    setNewAnnouncement((prev) => {
      const updatedDivisions = prev.selectedDivisions.includes(division)
        ? prev.selectedDivisions.filter((div) => div !== division)
        : [...prev.selectedDivisions, division];
      return { ...prev, selectedDivisions: updatedDivisions };
    });
  };

  const handleSubmitNewAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.content) {
      alert("Judul dan Isi Pengumuman harus diisi!");
      return;
    }

    const targetText = newAnnouncement.target === 'all'
      ? "Seluruh Karyawan"
      : newAnnouncement.selectedDivisions.length > 0
        ? `Divisi ${newAnnouncement.selectedDivisions.join(', ')}`
        : "Tidak ada divisi yang dipilih";

    const newId = announcements.length > 0 ? Math.max(...announcements.map(a => a.id)) + 1 : 1;

    setAnnouncements((prev) => [
      {
        id: newId,
        title: newAnnouncement.title,
        content: newAnnouncement.content,
        date: new Date().toISOString().slice(0, 10), // Current date as YYYY-MM-DD
        target: targetText,
      },
      ...prev, // Add new announcement to the top
    ]);

    // Reset form and close modal
    setNewAnnouncement({ title: "", content: "", target: "all", selectedDivisions: [] });
    setShowNewAnnouncementModal(false);
  };
  // --- END NEW STATE FOR ANNOUNCEMENTS ---


  // Chart Options - tailored for Periplus aesthetic
  const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom', // Consistent legend position
        labels: {
          color: '#4A5568', // Darker grey for labels
          font: {
            size: 12,
          }
        },
      },
      title: {
        display: true,
        font: {
          size: 18,
          weight: 'bold',
          color: '#2D3748', // Even darker grey for titles
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        bodyColor: '#fff',
        titleColor: '#fff',
      }
    },
    scales: {
      x: {
        ticks: { color: '#4A5568' },
        grid: { color: '#E2E8F0', drawOnChartArea: true, drawTicks: false }, // Light grey grid
      },
      y: {
        ticks: { color: '#4A5568' },
        grid: { color: '#E2E8F0', drawOnChartArea: true, drawTicks: false },
        beginAtZero: true,
      },
    }
  };

  const donutOptions = {
    ...commonChartOptions,
    plugins: {
      ...commonChartOptions.plugins,
      legend: {
        position: 'right', // Legend for donut often looks better on the right
      }
    }
  };

  const lineOptions = {
    ...commonChartOptions,
    scales: {
      x: {
        ...commonChartOptions.scales.x,
      },
      y: {
        ...commonChartOptions.scales.y,
        min: 0,
        max: 30, // Adjust based on expected max turnover
      },
    },
  };

  const barOptions = {
    ...commonChartOptions,
    indexAxis: 'y', // For horizontal bar chart
    scales: {
      x: {
        ...commonChartOptions.scales.x,
      },
      y: {
        ...commonChartOptions.scales.y,
        grid: {
          display: false // No horizontal grid lines for horizontal bar chart
        }
      },
    },
  };


  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Top Header/Navbar */}
      <header className="bg-white shadow-sm py-4 px-8 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center">
          <img src="https://via.placeholder.com/40x40/004d40/ffffff?text=P" alt="Periplus Logo" className="h-10 mr-4" /> {/* Placeholder for your logo */}
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Karyawan</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari karyawan..."
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <img src="https://via.placeholder.com/32x32/A0AEC0/ffffff?text=JD" alt="User Avatar" className="rounded-full w-8 h-8" />
            <span className="font-medium text-gray-700">John Doe</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-8">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          {[
            {
              label: "Total Karyawan",
              value: stats.totalEmployees,
              icon: (
                <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M7 20v-2a3 3 0 00-5.356-1.857M7 20H2m12-7a3 3 0 11-6 0 3 3 0 016 0zm-3 8a3 3 0 100-6 3 3 0 000 6z"></path></svg>
              ),
            },
            {
              label: "Karyawan Baru",
              value: stats.newHiresMonth,
              icon: (
                <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM12 14c-1.478 0-2.91-0.293-4.242-0.849M12 14c1.478 0 2.91 0.293 4.242-0.849M12 14v4m0 0h-4m4 0h4"></path></svg>
              ),
            },
            {
              label: "Karyawan Keluar",
              value: stats.departuresMonth,
              icon: (
                <svg className="w-8 h-8 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1 8a4 4 0 100-8 4 4 0 000 8z"></path></svg>
              ),
            },
            {
              label: "Rata-rata Masa Kerja",
              value: `${stats.avgTenureYears} Tahun`,
              icon: (
                <svg className="w-8 h-8 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              ),
            },
            {
              label: "Permintaan Cuti",
              value: stats.pendingLeaveRequests,
              icon: (
                <svg className="w-8 h-8 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
              ),
            },
          ].map((card, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300">
              <div className="p-3 rounded-full bg-gray-100">{card.icon}</div>
              <div>
                <p className="text-sm font-medium text-gray-500">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Employee Distribution by Department (Donut Chart) */}
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md flex flex-col justify-center items-center" style={{ minHeight: '380px' }}>
            <Doughnut data={departmentData} options={{ ...donutOptions, plugins: { ...donutOptions.plugins, title: { ...donutOptions.plugins.title, text: "Distribusi Karyawan per Departemen" } } }} />
          </div>

          {/* Employee Distribution by Job Level (Horizontal Bar Chart) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md flex flex-col justify-center items-center" style={{ minHeight: '380px' }}>
            <Bar data={jobLevelData} options={{ ...barOptions, plugins: { ...barOptions.plugins, title: { ...barOptions.plugins.title, text: "Jumlah Karyawan per Tingkat Jabatan" } } }} />
          </div>
        </div>

        {/* Turnover Trend and Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Employee Turnover Trend (Line Chart) */}
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-center items-center" style={{ minHeight: '380px' }}>
            <Line data={turnoverData} options={{ ...lineOptions, plugins: { ...lineOptions.plugins, title: { ...lineOptions.plugins.title, text: "Tren Karyawan Masuk & Keluar (Bulanan)" } } }} />
          </div>

          {/* Recent Hires and Announcements Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col" style={{ minHeight: '180px' }}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Karyawan Baru Terakhir</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {recentHires.map((hire, index) => (
                  <li key={index} className="flex justify-between items-center pb-1 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-medium">{hire.name}</p>
                      <p className="text-xs text-gray-500">{hire.department}</p>
                    </div>
                    <span className="text-xs text-gray-500">{hire.joinDate}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-4 text-sm text-blue-700 hover:underline self-start">Lihat Semua Karyawan</button>
            </div>

            {/* Announcements Card - with "New Announcement" button and modal trigger */}
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col" style={{ minHeight: '180px' }}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Pengumuman Kantor</h3>
                <button
                  onClick={() => setShowNewAnnouncementModal(true)}
                  className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                  <span>Baru</span>
                </button>
              </div>
              <ul className="space-y-3 text-sm text-gray-600 flex-grow overflow-y-auto">
                {announcements.map((ann) => (
                  <li key={ann.id} className="pb-2 border-b border-gray-100 last:border-b-0">
                    <p className="font-medium text-gray-800 flex justify-between items-center">
                      <span>{ann.title}</span>
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{ann.date}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Untuk: {ann.target}</p>
                    {/* Optionally show content on hover or click for full view */}
                    {/* <p className="text-xs text-gray-500 mt-1 line-clamp-2">{ann.content}</p> */}
                  </li>
                ))}
              </ul>
              <button className="mt-4 text-sm text-blue-700 hover:underline self-start">Lihat Semua Pengumuman</button>
            </div>
          </div>
        </div>
      </div>

      {/* New Announcement Modal */}
      {showNewAnnouncementModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg relative">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Buat Pengumuman Baru</h2>
            <button
              onClick={() => setShowNewAnnouncementModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <div className="mb-4">
              <label htmlFor="announcementTitle" className="block text-sm font-medium text-gray-700 mb-2">Judul Pengumuman</label>
              <input
                type="text"
                id="announcementTitle"
                name="title"
                value={newAnnouncement.title}
                onChange={handleNewAnnouncementChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Mis: Pemberitahuan Libur Imlek"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="announcementContent" className="block text-sm font-medium text-gray-700 mb-2">Isi Pengumuman</label>
              <textarea
                id="announcementContent"
                name="content"
                value={newAnnouncement.content}
                onChange={handleNewAnnouncementChange}
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-y"
                placeholder="Tulis detail pengumuman di sini..."
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Audiens</label>
              <div className="flex items-center space-x-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="target"
                    value="all"
                    checked={newAnnouncement.target === "all"}
                    onChange={handleNewAnnouncementChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2 text-gray-800">Seluruh Karyawan</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="target"
                    value="specific"
                    checked={newAnnouncement.target === "specific"}
                    onChange={handleNewAnnouncementChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2 text-gray-800">Divisi Tertentu</span>
                </label>
              </div>

              {newAnnouncement.target === "specific" && (
                <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                  <p className="text-sm font-medium text-gray-700 mb-2">Pilih Divisi:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {availableDivisions.map((division) => (
                      <label key={division} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={newAnnouncement.selectedDivisions.includes(division)}
                          onChange={() => handleDivisionChange(division)}
                          className="form-checkbox text-blue-600 rounded"
                        />
                        <span className="ml-2 text-gray-800">{division}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowNewAnnouncementModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                Batal
              </button>
              <button
                onClick={handleSubmitNewAnnouncement}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Kirim Pengumuman
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}