import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, LineChart, Line, YAxis, PieChart, Pie, Cell, Legend // <--- Pastikan 'Legend' ada di sini
} from 'recharts';// --- Periplus Brand Colors (adjust shades as needed) ---
const PERIPLUS_RED_PRIMARY = "#DA291C"; // Main Periplus red
const PERIPLUS_RED_ACCENT = "#C0392B"; // A darker red for accents/borders
const PERIPLUS_RED_LIGHT = "#FFDADA"; // A very light red for subtle highlights
const POSITIVE_GREEN = "#27AE60"; // For positive changes
const NEGATIVE_RED = "#E74C3C"; // For negative changes (if different from primary red)
const CHART_GREY_TEXT = "#4A5568"; // Dark grey for chart labels/titles

// --- DUMMY DATA ---
const stats = [
  { title: 'Customers Acquired', value: '18.3K', change: '+11.2% vs LY', chartData: [2400, 2800, 3000, 3100, 3300, 3700], icon: '👥' },
  { title: 'Engaged Members', value: '6.2K', change: '+7.9% vs LY', chartData: [1000, 1200, 1150, 1400, 1500, 1600], icon: '❤️' },
  { title: 'Top Genre: Fiction', value: '28%', change: '+3.4% vs LY', chartData: [23, 24, 25, 26, 27, 28], icon: '📚' },
  { title: 'Unsubscribe Rate', value: '0.22%', change: '-0.6% vs LY', chartData: [0.3, 0.28, 0.25, 0.24, 0.23, 0.22], icon: '🚫' },
  { title: 'Revenue (Campaigns)', value: 'Rp 1.52M', change: '+9.7% vs LY', chartData: [1000, 1150, 1200, 1300, 1500, 1520], icon: '💰' }, // Simplified for chart
];

const tableData = [
  { category: 'Fiksi Populer', rank: 1, clickRate: '4.2%', openRate: '26.8%', unsubRate: '0.18%', cySends: '1.1M', yoySends: '+15%', newCust: '3.4K', revenue: 'Rp 500 Juta', changeRevenue: '+Rp 90 Juta' },
  { category: 'Self-Improvement', rank: 2, clickRate: '3.9%', openRate: '25.1%', unsubRate: '0.22%', cySends: '950K', yoySends: '+10%', newCust: '2.1K', revenue: 'Rp 410 Juta', changeRevenue: '+Rp 70 Juta' },
  { category: 'Membership Promo', rank: 3, clickRate: '3.7%', openRate: '23.5%', unsubRate: '0.25%', cySends: '780K', yoySends: '+8%', newCust: '1.5K', revenue: 'Rp 300 Juta', changeRevenue: '+Rp 60 Juta' },
  { category: 'Rekomendasi Personal', rank: 4, clickRate: '4.0%', openRate: '25.7%', unsubRate: '0.19%', cySends: '660K', yoySends: '+12%', newCust: '1.8K', revenue: 'Rp 280 Juta', changeRevenue: '+Rp 55 Juta' },
  { category: 'Promo Akhir Bulan', rank: 5, clickRate: '3.4%', openRate: '22.9%', unsubRate: '0.26%', cySends: '500K', yoySends: '+6%', newCust: '1.2K', revenue: 'Rp 210 Juta', changeRevenue: '+Rp 40 Juta' },
];

const totalCampaignRevenueData = [
  { month: 'Jan', value: 1.2 },
  { month: 'Feb', value: 1.35 },
  { month: 'Mar', value: 1.4 },
  { month: 'Apr', value: 1.55 },
  { month: 'Mei', value: 1.6 },
  { month: 'Jun', value: 1.75 },
];

const audienceDistributionData = [
  { name: 'Pelanggan Aktif', value: 4500 },
  { name: 'Anggota Baru', value: 2000 },
  { name: 'Pelanggan Tidak Aktif', value: 1500 },
  { name: 'Pembeli Fiksi Reguler', value: 3000 },
  { name: 'Pembeli Non-Fiksi', value: 2500 },
];
const AUDIENCE_COLORS = [
  PERIPLUS_RED_PRIMARY, // Red
  "#FF7F50", // Coral
  "#FFD700", // Gold
  "#20B2AA", // LightSeaGreen
  "#6A5ACD", // SlateBlue
];

const upcomingCampaigns = [
  { id: 1, title: "Periplus Mid-Year Sale", date: "2025-07-15", status: "Scheduled", target: "Semua Pelanggan", type: "Discount" },
  { id: 2, title: "Special Offer: New Members", date: "2025-07-20", status: "Active", target: "Anggota Baru", type: "Welcome Gift" },
  { id: 3, title: "Literary Circle Event", date: "2025-07-28", status: "Draft", target: "Pembeli Fiksi Reguler", type: "Event Invitation" },
  { id: 4, title: "Back to School Promo", date: "2025-08-01", status: "Scheduled", target: "Pelanggan Aktif", type: "Discount" },
];

export default function CampaignAnalytics() {
  const [promoForm, setPromoForm] = useState({
    title: '',
    message: '',
    channel: '',
    promoCode: '',
    discountType: '',
    discountValue: '',
    startDate: '',
    endDate: '',
    targetAudience: '',
    sendOption: 'now', // 'now' or 'schedule'
    scheduleDate: '',
    scheduleTime: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setPromoForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSendPromo = (e) => {
    e.preventDefault();
    console.log("Mengirim Promo:", promoForm);
    alert(`Promo '${promoForm.title}' akan dikirim via ${promoForm.channel}!\n\nDetail:\n${JSON.stringify(promoForm, null, 2)}`);
    // Implement API call here
    setPromoForm({ // Reset form after submission
      title: '', message: '', channel: '', promoCode: '', discountType: '', discountValue: '',
      startDate: '', endDate: '', targetAudience: '', sendOption: 'now', scheduleDate: '', scheduleTime: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans text-gray-800">
      

      {/* Main Content */}
      <div className="container mx-auto">
        {/* Section: Key Performance Indicators */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="mr-2">📈</span> Performa Kampanye Utama
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-5 border border-gray-200 transition-all hover:shadow-lg">
              <p className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                <span className="text-lg">{stat.icon}</span> {stat.title}
              </p>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-1">{stat.value}</h2>
              <p className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </p>
              <ResponsiveContainer width="100%" height={60} className="mt-3 -mb-3">
                <LineChart data={stat.chartData.map((v, idx) => ({ index: idx, value: v }))}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={PERIPLUS_RED_PRIMARY}
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: CHART_GREY_TEXT }}
                    labelStyle={{ color: CHART_GREY_TEXT }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>

        {/* Section: Campaign Overview Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">📈</span> Tren Pendapatan Kampanye Keseluruhan
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={totalCampaignRevenueData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: CHART_GREY_TEXT }} />
                <YAxis
                  tickFormatter={(value) => `Rp ${value}M`}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: CHART_GREY_TEXT }}
                />
                <Tooltip
                  formatter={(value) => `Rp ${value} Milyar`}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: CHART_GREY_TEXT }}
                  labelStyle={{ color: CHART_GREY_TEXT }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={PERIPLUS_RED_PRIMARY}
                  strokeWidth={3}
                  dot={{ r: 6, fill: PERIPLUS_RED_PRIMARY, stroke: PERIPLUS_RED_ACCENT, strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">🎯</span> Distribusi Audiens Kampanye
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={audienceDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {audienceDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={AUDIENCE_COLORS[index % AUDIENCE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} Orang`, name]}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: CHART_GREY_TEXT }}
                  labelStyle={{ color: CHART_GREY_TEXT }}
                />
                <Legend
                  align="right"
                  verticalAlign="middle"
                  layout="vertical"
                  iconType="circle"
                  wrapperStyle={{ fontSize: '14px', color: CHART_GREY_TEXT }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Section: Email Send Activity & Upcoming Campaigns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">📧</span> Aktivitas Pengiriman Email (Mingguan)
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={['Sen','Sel','Rab','Kam','Jum','Sab','Min'].map(day => ({ day, value: Math.random() * 100 + 50 }))}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: CHART_GREY_TEXT }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: CHART_GREY_TEXT }} />
                <Tooltip
                  formatter={(value) => `${Math.round(value)} Email`}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: CHART_GREY_TEXT }}
                  labelStyle={{ color: CHART_GREY_TEXT }}
                />
                <Bar dataKey="value" fill={PERIPLUS_RED_PRIMARY} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">🗓️</span> Kampanye Mendatang & Terjadwal
            </h3>
            <ul className="space-y-4">
              {upcomingCampaigns.length > 0 ? (
                upcomingCampaigns.map(campaign => (
                  <li key={campaign.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{campaign.title}</p>
                      <p className="text-sm text-gray-600">
                        Target: {campaign.target} | Tipe: {campaign.type}
                      </p>
                      <p className="text-xs text-gray-500">
                        Jadwal: {new Date(campaign.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      campaign.status === 'Active' ? 'bg-green-100 text-green-700' :
                      campaign.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {campaign.status}
                    </span>
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-500">Tidak ada kampanye mendatang.</p>
              )}
            </ul>
          </div>
        </div>


        {/* Section: Campaign Performance Table */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 overflow-x-auto mb-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <span className="mr-2">📊</span> Performa Kampanye Berdasarkan Kategori & Segmen
            </h3>
            <div className="text-sm text-gray-600">
              Sortir Berdasarkan:
              <select className="border border-gray-300 ml-2 px-3 py-1 rounded-md focus:ring-1 focus:ring-red-500 focus:border-red-500">
                <option>Pendapatan</option>
                <option>Click Rate</option>
                <option>Open Rate</option>
              </select>
            </div>
          </div>
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="text-xs text-gray-600 uppercase bg-gray-50 border-b border-gray-200">
                <th className="p-3 whitespace-nowrap rounded-tl-lg">Kategori Kampanye</th>
                <th className="p-3">Peringkat</th>
                <th className="p-3">Click Rate</th>
                <th className="p-3">Open Rate</th>
                <th className="p-3">Unsub Rate</th>
                <th className="p-3">Email Terkirim</th>
                <th className="p-3">YoY Sends</th>
                <th className="p-3">Customer Baru</th>
                <th className="p-3">Pendapatan</th>
                <th className="p-3 rounded-tr-lg">Perubahan Pendapatan</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-semibold text-gray-900">{item.category}</td>
                  <td className="p-3 text-gray-700">{item.rank}</td>
                  <td className="p-3 text-red-700 font-medium">{item.clickRate}</td>
                  <td className="p-3 text-red-700 font-medium">{item.openRate}</td>
                  <td className="p-3 text-gray-700">{item.unsubRate}</td>
                  <td className="p-3 text-gray-700">{item.cySends}</td>
                  <td className="p-3 text-gray-700">{item.yoySends}</td>
                  <td className="p-3 text-green-700 font-semibold">{item.newCust}</td>
                  <td className="p-3 text-red-800 font-bold">{item.revenue}</td>
                  <td className={`p-3 font-medium ${item.changeRevenue.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{item.changeRevenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section: Kirim Promo Diskon */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-2">🚀</span> Buat & Kirim Kampanye Baru
          </h2>

          <form onSubmit={handleSendPromo} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-5">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Judul Kampanye <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={promoForm.title}
                  onChange={handleFormChange}
                  placeholder="Contoh: Diskon Liburan Periplus!"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Isi Pesan / Deskripsi Kampanye <span className="text-red-500">*</span></label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={promoForm.message}
                  onChange={handleFormChange}
                  placeholder="Ceritakan detail promo Anda di sini..."
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="discountType" className="block text-sm font-medium text-gray-700 mb-1">Jenis Diskon</label>
                  <select
                    id="discountType"
                    name="discountType"
                    value={promoForm.discountType}
                    onChange={handleFormChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  >
                    <option value="">Pilih Jenis</option>
                    <option value="percentage">Persentase (%)</option>
                    <option value="fixedAmount">Jumlah Tetap (Rp)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="discountValue" className="block text-sm font-medium text-gray-700 mb-1">Nilai Diskon</label>
                  <input
                    type="number"
                    id="discountValue"
                    name="discountValue"
                    value={promoForm.discountValue}
                    onChange={handleFormChange}
                    placeholder="Contoh: 20 (untuk 20% / Rp 20.000)"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700 mb-1">Kode Promo (Opsional)</label>
                <input
                  type="text"
                  id="promoCode"
                  name="promoCode"
                  value={promoForm.promoCode}
                  onChange={handleFormChange}
                  placeholder="Contoh: LIBURANSERU"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Berlaku Dari <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={promoForm.startDate}
                    onChange={handleFormChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">Berlaku Sampai <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={promoForm.endDate}
                    onChange={handleFormChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              <div>
                <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-1">Target Audiens <span className="text-red-500">*</span></label>
                <select
                  id="targetAudience"
                  name="targetAudience"
                  value={promoForm.targetAudience}
                  onChange={handleFormChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                >
                  <option value="">Pilih Segmen</option>
                  <option value="all">Semua Pelanggan</option>
                  <option value="new_members">Anggota Baru (30 hari terakhir)</option>
                  <option value="fiction_buyers">Pembeli Fiksi Reguler</option>
                  <option value="non_fiction_buyers">Pembeli Non-Fiksi Reguler</option>
                  <option value="lapsed_customers">Pelanggan Tidak Aktif (3 bulan terakhir)</option>
                  <option value="high_spenders">High Spenders</option>
                </select>
              </div>

              <div>
                <label htmlFor="channel" className="block text-sm font-medium text-gray-700 mb-1">Channel Pengiriman <span className="text-red-500">*</span></label>
                <select
                  id="channel"
                  name="channel"
                  value={promoForm.channel}
                  onChange={handleFormChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                >
                  <option value="">Pilih Channel</option>
                  <option value="Email">Email Marketing</option>
                  <option value="WhatsApp">WhatsApp Blast</option>
                  <option value="SMS">SMS Marketing</option>
                  <option value="InApp">In-App Notification</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Opsi Pengiriman</label>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="sendOption"
                      value="now"
                      checked={promoForm.sendOption === 'now'}
                      onChange={handleFormChange}
                      className="form-radio text-red-600 focus:ring-red-500"
                    />
                    <span className="ml-2 text-gray-700">Kirim Sekarang</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="sendOption"
                      value="schedule"
                      checked={promoForm.sendOption === 'schedule'}
                      onChange={handleFormChange}
                      className="form-radio text-red-600 focus:ring-red-500"
                    />
                    <span className="ml-2 text-gray-700">Jadwalkan</span>
                  </label>
                </div>
              </div>

              {promoForm.sendOption === 'schedule' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="scheduleDate" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Kirim</label>
                    <input
                      type="date"
                      id="scheduleDate"
                      name="scheduleDate"
                      value={promoForm.scheduleDate}
                      onChange={handleFormChange}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="scheduleTime" className="block text-sm font-medium text-gray-700 mb-1">Waktu Kirim</label>
                    <input
                      type="time"
                      id="scheduleTime"
                      name="scheduleTime"
                      value={promoForm.scheduleTime}
                      onChange={handleFormChange}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 mb-1">Upload Gambar/Banner (Opsional)</label>
                <input
                  type="file"
                  id="imageUpload"
                  name="imageUpload"
                  accept="image/*"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => alert("Fitur Preview Sedang Dikembangkan!")} // Dummy preview
                  className="px-5 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-sm font-medium"
                >
                  Preview Kampanye
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-sm font-medium"
                >
                  {promoForm.sendOption === 'now' ? 'Kirim Sekarang' : 'Jadwalkan Kampanye'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}