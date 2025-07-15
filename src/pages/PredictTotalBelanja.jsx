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
      const res = await axios.post("https://2c1d9f18f5c6.ngrok-free.app/predict_total_by_id", {
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">🧾 Prediksi Total Belanja Pelanggan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Masukkan Customer ID"
          className="w-full border px-3 py-2 rounded"
          value={id}
          onChange={e => setId(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded font-semibold"
        >
          {loading ? "Memproses..." : "Prediksi"}
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-green-50 p-4 rounded border border-green-200">
          <h3 className="text-green-800 font-bold text-lg mb-2">
            Total Belanja Diprediksi: Rp {result.predicted_total_next_month.toLocaleString()}
          </h3>
          <p className="text-sm text-gray-700 mb-2">Customer ID: {result.customer_id}</p>

          <ul className="text-sm text-gray-700 list-disc pl-5 mb-4">
            {Object.entries(result.feature_used).map(([key, val]) => (
              <li key={key}>{key}: {val}</li>
            ))}
          </ul>

          {/* Chart */}
          <div className="mt-4">
            <Line data={chartData} options={chartOptions} />
          </div>

          {/* Pengetahuan tambahan */}
          <div className="mt-4 p-3 bg-white border rounded text-sm text-gray-800 leading-relaxed">
            <p>
              Prediksi ini dilakukan menggunakan model regresi berdasarkan atribut pelanggan
              seperti umur, pendapatan, gaya hidup, lokasi, dan histori pembelian.
            </p>
            <p className="mt-2">
              Prediksi bermanfaat untuk memahami potensi belanja pelanggan di bulan berikutnya dan bisa
              digunakan untuk strategi pemasaran personal seperti voucher, diskon, atau upselling.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
