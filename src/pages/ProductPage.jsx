import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Pencil, Trash2 } from 'lucide-react';

export default function ProductManagement() {
  const [produk, setProduk] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    judul: '', penulis: '', harga: '', status: '', penerbit: '', tanggal_rilis: '',
    dimensi: '', berat: '', halaman: '', bahasa: '', isbn_13: '', url_gambar: ''
  });

  useEffect(() => {
    fetchProduk();
  }, []);

  const fetchProduk = async () => {
    const { data, error } = await supabase.from('produk').select('*').order('judul', { ascending: true });
    if (error) {
      alert('Gagal ambil data: ' + error.message);
    } else {
      setProduk(data);
    }
  };

  const filteredProduk = produk.filter(p =>
    p.judul.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hargaNumber = parseFloat(form.harga);
    const beratNumber = parseFloat(form.berat);
    const halamanNumber = parseInt(form.halaman);

    if (!form.judul || !form.penulis || isNaN(hargaNumber)) {
      alert('Judul, penulis, dan harga wajib diisi!');
      return;
    }

    const payload = {
      ...form,
      harga: hargaNumber,
      berat: isNaN(beratNumber) ? null : beratNumber,
      halaman: isNaN(halamanNumber) ? null : halamanNumber,
    };

    let error;
    if (editingId) {
      ({ error } = await supabase.from('produk').update(payload).eq('id', editingId));
    } else {
      ({ error } = await supabase.from('produk').insert([payload]));
    }

    if (error) {
      alert('Gagal menyimpan data: ' + error.message);
    } else {
      fetchProduk();
      setForm({
        judul: '', penulis: '', harga: '', status: '', penerbit: '', tanggal_rilis: '',
        dimensi: '', berat: '', halaman: '', bahasa: '', isbn_13: '', url_gambar: ''
      });
      setEditingId(null);
      setShowForm(false);
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Hapus produk ini?')) {
      const { error } = await supabase.from('produk').delete().eq('id', id);
      if (error) alert('Gagal hapus: ' + error.message);
      else fetchProduk();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-red-700 mb-8 text-center">Manajemen Produk</h1>

        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="🔍 Cari produk..."
            className="p-3 border rounded w-1/2 shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => {
              setShowForm(!showForm);
              if (!showForm) {
                setForm({
                  judul: '', penulis: '', harga: '', status: '', penerbit: '', tanggal_rilis: '',
                  dimensi: '', berat: '', halaman: '', bahasa: '', isbn_13: '', url_gambar: ''
                });
                setEditingId(null);
              }
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            {showForm ? 'Batal' : '+ Tambah'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-8 border space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="judul" placeholder="Judul" value={form.judul} onChange={handleChange} className="p-2 border rounded" />
              <input name="penulis" placeholder="Penulis" value={form.penulis} onChange={handleChange} className="p-2 border rounded" />
              <input name="harga" placeholder="Harga" value={form.harga} onChange={handleChange} className="p-2 border rounded" />
              <input name="status" placeholder="Status (tersedia/habis)" value={form.status} onChange={handleChange} className="p-2 border rounded" />
              <input name="penerbit" placeholder="Penerbit" value={form.penerbit} onChange={handleChange} className="p-2 border rounded" />
              <input name="tanggal_rilis" type="date" value={form.tanggal_rilis} onChange={handleChange} className="p-2 border rounded" />
              <input name="dimensi" placeholder="Dimensi (cm)" value={form.dimensi} onChange={handleChange} className="p-2 border rounded" />
              <input name="berat" placeholder="Berat (gram)" value={form.berat} onChange={handleChange} className="p-2 border rounded" />
              <input name="halaman" placeholder="Jumlah Halaman" value={form.halaman} onChange={handleChange} className="p-2 border rounded" />
              <input name="bahasa" placeholder="Bahasa" value={form.bahasa} onChange={handleChange} className="p-2 border rounded" />
              <input name="isbn_13" placeholder="ISBN 13" value={form.isbn_13} onChange={handleChange} className="p-2 border rounded" />
              <input name="url_gambar" placeholder="URL Gambar" value={form.url_gambar} onChange={handleChange} className="p-2 border rounded" />
            </div>
            <button type="submit" className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              {editingId ? 'Perbarui' : 'Simpan'}
            </button>
          </form>
        )}

        {/* TABEL SEMUA KOLOM PRODUK */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-red-200 text-red-800 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Judul</th>
                <th className="px-4 py-3">Penulis</th>
                <th className="px-4 py-3">Harga</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Penerbit</th>
                <th className="px-4 py-3">Rilis</th>
                <th className="px-4 py-3">Dimensi</th>
                <th className="px-4 py-3">Berat</th>
                <th className="px-4 py-3">Halaman</th>
                <th className="px-4 py-3">Bahasa</th>
                <th className="px-4 py-3">ISBN</th>
                <th className="px-4 py-3">Cover</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {filteredProduk.map((item) => (
                <tr key={item.id} className="border-b hover:bg-red-50 transition">
                  <td className="px-4 py-2">{item.judul}</td>
                  <td className="px-4 py-2">{item.penulis}</td>
                  <td className="px-4 py-2">Rp {Number(item.harga).toLocaleString()}</td>
                  <td className="px-4 py-2">{item.status}</td>
                  <td className="px-4 py-2">{item.penerbit}</td>
                  <td className="px-4 py-2">{item.tanggal_rilis}</td>
                  <td className="px-4 py-2">{item.dimensi}</td>
                  <td className="px-4 py-2">{item.berat} g</td>
                  <td className="px-4 py-2">{item.halaman}</td>
                  <td className="px-4 py-2">{item.bahasa}</td>
                  <td className="px-4 py-2">{item.isbn_13}</td>
                  <td className="px-4 py-2">
                    <img src={item.url_gambar} alt="Cover" className="h-12 w-auto" />
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEdit(item)}>
                      <Pencil size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(item.id)}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProduk.length === 0 && (
                <tr>
                  <td colSpan={13} className="text-center py-4 text-gray-500">Tidak ada data produk</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
