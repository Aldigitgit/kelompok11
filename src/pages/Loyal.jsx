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

export default function LoyaltyPredictor() {
  const [form, setForm] = useState({
    gender: '',
    lokasi: '',
    gaya_hidup: '',
    umur: '',
    pendapatan: '',
    jumlah: '',
    total: '',
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post('https://01ce51bd8d07.ngrok-free.app/predict', form);
      console.log("Respon dari server:", res.data);
      setResult(res.data); // simpan seluruh response
    } catch (err) {
      alert(err.response?.data?.error || 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  };

  // CHART DATA: berdasarkan probabilities
  const chartData = result && {
    labels: Object.keys(result.probabilities),
    datasets: [
      {
        label: 'Probabilitas Loyalitas',
        data: Object.values(result.probabilities),
        backgroundColor: ['#10b981', '#f87171'], // hijau & merah
        borderColor: ['#065f46', '#991b1b'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Prediksi Loyalitas Pelanggan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select name="gender" value={form.gender} onChange={handleChange} required className="w-full border px-3 py-2 rounded">
          <option value="">Pilih Gender</option>
          <option value="L">Pria</option>
          <option value="P">Wanita</option>
        </select>

        <select name="lokasi" value={form.lokasi} onChange={handleChange} required className="w-full border px-3 py-2 rounded">
          <option value="">Pilih Lokasi</option>
          <option value="Jakarta">Jakarta</option>
          <option value="Surabaya">Surabaya</option>
          <option value="Medan">Medan</option>
          <option value="Bandung">Bandung</option>
          <option value="Yogyakarta">Yogyakarta</option>
        </select>

        <select name="gaya_hidup" value={form.gaya_hidup} onChange={handleChange} required className="w-full border px-3 py-2 rounded">
          <option value="">Pilih Gaya Hidup</option>
          <option value="Aktif">Aktif</option>
          <option value="Konservatif">Konservatif</option>
          <option value="Petualang">Petualang</option>
          <option value="Trendy">Trendy</option>
        </select>

        <input type="number" name="umur" placeholder="Umur" value={form.umur} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <input type="number" name="pendapatan" placeholder="Pendapatan" value={form.pendapatan} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <input type="number" name="jumlah" placeholder="Jumlah Pembelian" value={form.jumlah} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <input type="number" name="total" placeholder="Total Belanja" value={form.total} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />

        <button type="submit" disabled={loading} className="bg-blue-600 text-white font-semibold px-4 py-2 rounded">
          {loading ? "Memproses..." : "Prediksi Loyalitas"}
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="text-green-800 font-bold mb-2">
            Hasil Prediksi: <span className="text-xl">{result.loyalitas}</span>
          </h3>
          <p className="text-sm text-gray-700">Confidence Score: {result.confidence}%</p>

          <div className="mt-4">
            <Pie data={chartData} />
          </div>
        </div>
      )}
    </div>
  );
}