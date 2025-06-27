import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Pencil, Trash2 } from 'lucide-react';

export default function ProductManagement() {
  const [produk, setProduk] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    judul: '',
    penulis: '',
    harga: '',
    penerbit: '',
    url_gambar: '',
  });

  // Ambil data dari tabel Supabase
  const fetchProduk = async () => {
    const { data, error } = await supabase.from('produk').select('*').order('judul', { ascending: true });
    if (error) {
      alert('Gagal mengambil data: ' + error.message);
    } else {
      setProduk(data);
    }
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  // Filter pencarian
  const filteredProduk = produk.filter(p =>
    p.judul.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hargaNumber = parseFloat(form.harga);

    if (!form.judul || !form.penulis || !form.penerbit || !form.url_gambar || isNaN(hargaNumber)) {
      alert('Semua field wajib diisi dan harga harus berupa angka!');
      return;
    }

    const payload = {
      judul: form.judul,
      penulis: form.penulis,
      harga: hargaNumber,
      penerbit: form.penerbit,
      url_gambar: form.url_gambar,
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
      setForm({ judul: '', penulis: '', harga: '', penerbit: '', url_gambar: '' });
      setEditingId(null);
      setShowForm(false);
    }
  };

  const handleEdit = (data) => {
    setForm(data);
    setEditingId(data.id);
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

        {/* Pencarian dan Tombol Tambah */}
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
                setForm({ judul: '', penulis: '', harga: '', penerbit: '', url_gambar: '' });
                setEditingId(null);
              }
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            {showForm ? 'Batal' : '+ Tambah'}
          </button>
        </div>

        {/* Form Tambah/Edit */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-8 border space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="judul"
                placeholder="Judul Buku"
                className="p-2 border rounded"
                value={form.judul}
                onChange={handleChange}
              />
              <input
                type="text"
                name="penulis"
                placeholder="Penulis"
                className="p-2 border rounded"
                value={form.penulis}
                onChange={handleChange}
              />
              <input
                type="text"
                name="penerbit"
                placeholder="Penerbit"
                className="p-2 border rounded"
                value={form.penerbit}
                onChange={handleChange}
              />
              <input
                type="text"
                name="harga"
                placeholder="Harga"
                className="p-2 border rounded"
                value={form.harga}
                onChange={handleChange}
              />
              <input
                type="text"
                name="url_gambar"
                placeholder="URL Gambar Produk"
                className="p-2 border rounded col-span-full"
                value={form.url_gambar}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editingId ? 'Perbarui' : 'Simpan'}
            </button>
          </form>
        )}

        {/* Tabel Produk */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-red-200 text-red-800 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Judul</th>
                <th className="px-6 py-3 text-left">Penulis</th>
                <th className="px-6 py-3 text-left">Penerbit</th>
                <th className="px-6 py-3 text-left">Harga</th>
                <th className="px-6 py-3 text-left">Cover</th>
                <th className="px-6 py-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {filteredProduk.map((item) => (
                <tr key={item.id} className="border-b hover:bg-red-50 transition">
                  <td className="px-6 py-3">{item.judul}</td>
                  <td className="px-6 py-3">{item.penulis}</td>
                  <td className="px-6 py-3">{item.penerbit}</td>
                  <td className="px-6 py-3">Rp {Number(item.harga).toLocaleString()}</td>
                  <td className="px-6 py-3">
                    <img src={item.url_gambar} alt="Cover" className="h-12 w-auto" />
                  </td>
                  <td className="px-6 py-3 flex gap-2">
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
                  <td colSpan={6} className="text-center py-4 text-gray-500">Tidak ada data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
