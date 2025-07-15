import React, { useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PredictByCustomerId() {
  const [id, setId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post("https://e2338038c8c9.ngrok-free.app/predict_by_id", {
        customer_id: id
      });
      setResult(res.data);
    } catch (err) {
      alert(err.response?.data?.error || 'Gagal memprediksi.');
    } finally {
      setLoading(false);
    }
  };

  const chartData = result && {
    labels: Object.keys(result.probabilities),
    datasets: [
      {
        label: 'Probabilitas Loyalitas',
        data: Object.values(result.probabilities),
        backgroundColor: ['#10b981', '#f87171', '#60a5fa', '#facc15'],
        borderColor: ['#065f46', '#991b1b', '#2563eb', '#ca8a04'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">🔍 Prediksi Loyalitas Berdasarkan Customer ID</h2>

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
          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded w-full"
        >
          {loading ? "Memproses..." : "Prediksi"}
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-green-50 p-4 rounded border border-green-200">
          <h3 className="text-green-800 font-bold text-lg mb-2">
            Prediksi Loyalitas: {result.loyalitas}
          </h3>
          <p className="text-sm text-gray-700 mb-2">
            Confidence: {result.confidence}% <br />
            Customer ID: {result.customer_id}
          </p>

          {/* Informasi fitur customer */}
          {result.feature_used && (
            <div className="mt-4 p-3 bg-white border border-gray-200 rounded text-sm">
              <h4 className="font-semibold text-gray-800 mb-2">📋 Informasi Pelanggan</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Gender: {result.feature_used.gender}</li>
                <li>Lokasi: {result.feature_used.lokasi}</li>
                <li>Gaya Hidup: {result.feature_used.gaya_hidup}</li>
                <li>Umur: {result.feature_used.umur}</li>
                <li>Pendapatan: {result.feature_used.pendapatan}</li>
                <li>Jumlah Pembelian: {result.feature_used.jumlah}</li>
              </ul>
            </div>
          )}

          {/* Chart */}
          <div className="mt-4">
            <Pie data={chartData} />
          </div>

          {/* Insight */}
          <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200 text-sm text-gray-800">
            <h4 className="font-semibold text-blue-800 mb-2">📘 Insight Loyalitas</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Loyal</strong>: Sering membeli & potensi pembelian tinggi.</li>
              <li><strong>Tidak Loyal</strong>: Perlu strategi retensi (promo, reminder, dsb).</li>
              <li><strong>Confidence</strong>: Tingkat keyakinan model terhadap prediksi.</li>
              <li>Saran: Optimalkan dengan rekomendasi buku atau email marketing personal.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
