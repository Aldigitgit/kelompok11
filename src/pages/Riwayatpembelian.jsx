import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase.js';

function RiwayatPembelian() {
  const [pembelian, setPembelian] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [form, setForm] = useState({
    tanggal: '',
    produk: '',
    jumlah: 1,
    harga: 0,
    status: 'Selesai',
  });

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('pembelian')
      .select('*')
      .order('tanggal', { ascending: false });

    if (error) console.error(error);
    else setPembelian(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'jumlah' || name === 'harga' ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.tanggal || !form.produk || form.jumlah <= 0 || form.harga <= 0) {
      alert('Semua field wajib diisi dengan benar!');
      return;
    }

    const total = form.jumlah * form.harga;

    const payload = {
      ...form,
      total,
    };

    if (editingData) {
      const { error } = await supabase
        .from('pembelian')
        .update(payload)
        .eq('id', editingData.id);
      if (error) console.error(error);
    } else {
      const { error } = await supabase.from('pembelian').insert(payload);
      if (error) console.error(error);
    }

    setForm({ tanggal: '', produk: '', jumlah: 1, harga: 0, status: 'Selesai' });
    setEditingData(null);
    setShowForm(false);
    fetchData();
  };

  const handleEdit = (item) => {
    setEditingData(item);
    setForm(item);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus pembelian ini?')) {
      const { error } = await supabase.from('pembelian').delete().eq('id', id);
      if (error) console.error(error);
      else fetchData();
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow font-sans">
      <h2 className="text-2xl font-semibold mb-4 text-red-700">Riwayat Pembelian</h2>
      <button
        onClick={() => {
          setShowForm((prev) => !prev);
          if (!showForm) {
            setEditingData(null);
            setForm({ tanggal: '', produk: '', jumlah: 1, harga: 0, status: 'Selesai' });
          }
        }}
        className="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        {showForm ? 'Batal' : '+ Tambah Pembelian'}
      </button>

      {showForm && (
        <div className="mb-6 bg-gray-50 p-4 rounded border">
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div>
              <label className="block text-sm font-medium">Tanggal</label>
              <input
                type="date"
                name="tanggal"
                value={form.tanggal}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Produk</label>
              <input
                type="text"
                name="produk"
                value={form.produk}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Jumlah</label>
              <input
                type="number"
                name="jumlah"
                min="1"
                value={form.jumlah}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Harga (Rp)</label>
              <input
                type="number"
                name="harga"
                min="0"
                value={form.harga}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="Selesai">Selesai</option>
                <option value="Dibatalkan">Dibatalkan</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            {editingData ? 'Perbarui' : 'Simpan'}
          </button>
        </div>
      )}

      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Tanggal</th>
            <th className="p-3 border">Produk</th>
            <th className="p-3 border">Jumlah</th>
            <th className="p-3 border">Harga</th>
            <th className="p-3 border">Total</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pembelian.map((item, index) => (
            <tr key={index} className="text-center hover:bg-gray-50">
              <td className="p-3 border">{item.tanggal}</td>
              <td className="p-3 border">{item.produk}</td>
              <td className="p-3 border">{item.jumlah}</td>
              <td className="p-3 border">Rp{item.harga.toLocaleString()}</td>
              <td className="p-3 border text-right">Rp{Number(item.total).toLocaleString()}</td>
              <td className="p-3 border">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    item.status === 'Selesai'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="p-3 border space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
          {pembelian.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center text-gray-500 py-4">
                Tidak ada data pembelian
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RiwayatPembelian;
  