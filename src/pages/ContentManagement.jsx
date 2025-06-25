import React, { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { supabase } from '../supabase';

export default function ContentManagement() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    penulis: '',
    kategori: '',
    harga: '',
    cover: '',
  });

  const fetchBooks = async () => {
    const { data, error } = await supabase.from('books').select('*').order('created_at', { ascending: false });
    if (error) console.error(error);
    else setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book =>
    book.nama.toLowerCase().includes(search.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.nama || !formData.penulis || !formData.kategori || !formData.harga || !formData.cover) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (editingId) {
      const { error } = await supabase
        .from('books')
        .update(formData)
        .eq('id', editingId);
      if (error) console.error(error);
    } else {
      const { error } = await supabase
        .from('books')
        .insert(formData);
      if (error) console.error(error);
    }

    setFormData({ nama: '', penulis: '', kategori: '', harga: '', cover: '' });
    setEditingId(null);
    setShowForm(false);
    fetchBooks();
  };

  const handleEdit = (book) => {
    setFormData(book);
    setEditingId(book.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus buku ini?')) {
      const { error } = await supabase.from('books').delete().eq('id', id);
      if (error) console.error(error);
      else fetchBooks();
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen font-sans">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Cari"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded-md border w-1/3 shadow-sm"
        />
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (!showForm) {
              setFormData({ nama: '', penulis: '', kategori: '', harga: '', cover: '' });
              setEditingId(null);
            }
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          {showForm ? 'Batal' : '+ Tambah'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-4 rounded shadow-md mb-6 border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="nama"
              placeholder="Nama Buku"
              value={formData.nama}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="penulis"
              placeholder="Penulis"
              value={formData.penulis}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="kategori"
              placeholder="Kategori"
              value={formData.kategori}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="harga"
              placeholder="Harga (cth: 125000)"
              value={formData.harga}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="cover"
              placeholder="URL Gambar Cover"
              value={formData.cover}
              onChange={handleInputChange}
              className="p-2 border rounded col-span-full"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {editingId ? 'Perbarui' : 'Simpan'}
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left bg-white rounded-xl shadow-md">
          <thead className="text-xs text-red-800 uppercase bg-red-200">
            <tr>
              <th className="px-6 py-3">Nama</th>
              <th className="px-6 py-3">Penulis</th>
              <th className="px-6 py-3">Kategori</th>
              <th className="px-6 py-3">Harga</th>
              <th className="px-6 py-3">Cover Buku</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {filteredBooks.map((book) => (
              <tr key={book.id} className="border-b hover:bg-red-50">
                <td className="px-6 py-3">{book.nama}</td>
                <td className="px-6 py-3">{book.penulis}</td>
                <td className="px-6 py-3">{book.kategori}</td>
                <td className="px-6 py-3">Rp {Number(book.harga).toLocaleString()}</td>
                <td className="px-6 py-3">
                  <img src={book.cover} alt="Cover Buku" className="h-12 w-auto" />
                </td>
                <td className="px-6 py-3 flex gap-3">
                  <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEdit(book)}>
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(book.id)}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredBooks.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  Tidak ada data buku
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
