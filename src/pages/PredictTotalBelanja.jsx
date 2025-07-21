import React, { useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function PredictTotalByCustomerId() {
  const [id, setId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post("https://c03919eb6110.ngrok-free.app/predict_total_by_id", {
        customer_id: parseInt(id)
      });
      setResult(res.data);
    } catch (err) {
      alert(err.response?.data?.error || 'Gagal memprediksi total.');
    } finally {
      setLoading(false);
    }
  };

  // ====================
  // LINE CHART CONFIG
  // ====================
  const chartData = result && {
    labels: ['Sebelumnya', 'Prediksi Bulan Berikutnya'],
    datasets: [
      {
        label: 'Total Belanja',
        data: [
          result.feature_used.total || result.feature_used.jumlah * result.feature_used.harga || 0,
          result.predicted_total_next_month
        ],
        fill: false,
        borderColor: '#10b981',
        backgroundColor: '#10b981',
        tension: 0.3,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
   <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-md border border-gray-200">
  <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
    🧾 Prediksi Total Belanja Pelanggan
  </h2>

  <form onSubmit={handleSubmit} className="space-y-4">
    <input
      type="number"
      placeholder="Masukkan Customer ID"
      className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
      value={id}
      onChange={e => setId(e.target.value)}
      required
    />
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold transition"
    >
      {loading ? "Memproses..." : "Prediksi"}
    </button>
  </form>

  {result && (
    <div className="mt-8 bg-green-50 p-6 rounded-lg border border-green-200 shadow-sm">
      <h3 className="text-green-800 font-bold text-lg mb-3">
        💰 Total Belanja Diprediksi: Rp {result.predicted_total_next_month.toLocaleString()}
      </h3>
      <p className="text-sm text-gray-700 mb-2">
         Customer ID: <span className="font-semibold">{result.customer_id}</span>
      </p>

      <ul className="text-sm text-gray-700 list-disc pl-5 mb-4 space-y-1">
        {Object.entries(result.feature_used).map(([key, val]) => (
          <li key={key}>
            {key.replace(/_/g, ' ')}: <span className="font-medium">{val}</span>
          </li>
        ))}
      </ul>

      {/* Chart */}
      <div className="mt-5">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">📊 Visualisasi</h4>
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Insight */}
      <div className="mt-6 p-4 bg-white border border-green-300 rounded-md text-sm text-gray-800 leading-relaxed shadow-sm">
        <h4 className="font-semibold mb-2">🔍 Customer Insight</h4>
        <p>
          Prediksi ini dilakukan menggunakan model regresi berdasarkan atribut pelanggan seperti umur,
          pendapatan, gaya hidup, lokasi, dan histori pembelian.
        </p>
        <p className="mt-2">
          Prediksi ini bermanfaat untuk memahami potensi belanja pelanggan di bulan berikutnya dan bisa
          digunakan untuk strategi pemasaran personal seperti:
        </p>
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>📩 Voucher diskon untuk pelanggan potensial</li>
          <li>🎯 Rekomendasi produk berdasarkan gaya hidup</li>
          <li>💡 Upselling ke pelanggan loyal</li>
        </ul>
      </div>
    </div>
  )}
</div>

  );
}
