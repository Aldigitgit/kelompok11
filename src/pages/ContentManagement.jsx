import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, X } from 'lucide-react';
// PASTIKAN FILE supabase.js BERADA DI FOLDER YANG SAMA DENGAN FILE INI.
// Mengubah './supabase' menjadi './supabase.js' untuk resolusi yang lebih eksplisit
import { supabase } from '../supabase.js'; 

export default function ContentManagement() {
  const [search, setSearch] = useState("");
  const [content, setContent] = useState([]); // State untuk menyimpan data dari Supabase
  const [loading, setLoading] = useState(true); // State untuk indikator loading
  const [showAddModal, setShowAddModal] = useState(false); // State untuk mengontrol visibilitas modal tambah
  const [newContent, setNewContent] = useState({ // State untuk data baru yang akan ditambahkan
    nama: '',
    penulis: '',
    kategori: '',
    harga: '',
    cover: ''
  });
  const [showEditModal, setShowEditModal] = useState(false); // State untuk mengontrol visibilitas modal edit
  const [editingContent, setEditingContent] = useState(null); // State untuk menyimpan data yang sedang diedit

  // Fungsi untuk mengambil data dari Supabase
  const fetchContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .order('nama', { ascending: true }); // Mengurutkan berdasarkan nama secara ascending

      if (error) {
        console.error('Error fetching content:', error.message);
      } else {
        setContent(data);
      }
    } catch (err) {
      console.error('Unexpected error during fetch:', err);
    } finally {
      setLoading(false);
    }
  };

  // Panggil fetchContent saat komponen pertama kali dimuat
  useEffect(() => {
    fetchContent();

    // Setup real-time listener untuk Supabase
    // Ini akan otomatis memperbarui UI ketika ada perubahan di database
    const subscription = supabase
      .channel('public:content') // Nama channel bisa disesuaikan
      .on('postgres_changes', { event: '*', schema: 'public', table: 'content' }, payload => {
        console.log('Change received!', payload);
        fetchContent(); // Panggil ulang fetchContent untuk mendapatkan data terbaru
      })
      .subscribe();

    // Cleanup subscription saat komponen di-unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []); // [] memastikan efek ini hanya berjalan sekali saat komponen mount

  // Filter data berdasarkan pencarian (nama, penulis, kategori)
  const filteredData = content.filter(item =>
    item.nama.toLowerCase().includes(search.toLowerCase()) ||
    item.penulis.toLowerCase().includes(search.toLowerCase()) ||
    item.kategori.toLowerCase().includes(search.toLowerCase())
  );

  // --- Fungsi untuk Tambah Data ---
  const handleNewContentChange = (e) => {
    const { name, value } = e.target;
    setNewContent(prev => ({ ...prev, [name]: value }));
  };

  const handleAddContent = async () => {
    try {
      const { data, error } = await supabase
        .from('content')
        .insert([newContent])
        .select(); // Mengembalikan data yang baru ditambahkan

      if (error) {
        console.error('Error adding content:', error.message);
        // Tampilkan pesan error ke user jika perlu, bukan hanya console.error
      } else {
        // Data akan diperbarui otomatis oleh real-time listener, jadi tidak perlu setContent lagi di sini
        setNewContent({ // Reset form
          nama: '',
          penulis: '',
          kategori: '',
          harga: '',
          cover: ''
        });
        setShowAddModal(false); // Tutup modal
      }
    } catch (err) {
      console.error('Unexpected error during add:', err);
    }
  };

  // --- Fungsi untuk Edit Data ---
  const handleEdit = (book) => {
    setEditingContent({ ...book }); // Set data buku yang akan diedit
    setShowEditModal(true); // Tampilkan modal edit
  };

  const handleEditingContentChange = (e) => {
    const { name, value } = e.target;
    setEditingContent(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateContent = async () => {
    if (!editingContent || !editingContent.id) return;

    try {
      const { data, error } = await supabase
        .from('content')
        .update({
          nama: editingContent.nama,
          penulis: editingContent.penulis,
          kategori: editingContent.kategori,
          harga: editingContent.harga,
          cover: editingContent.cover
        })
        .eq('id', editingContent.id)
        .select();

      if (error) {
        console.error('Error updating content:', error.message);
      } else {
        // Data akan diperbarui otomatis oleh real-time listener
        setEditingContent(null);
        setShowEditModal(false);
      }
    } catch (err) {
      console.error('Unexpected error during update:', err);
    }
  };

  // --- Fungsi untuk Hapus Data ---
  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus konten ini?")) {
      return; // Batal jika pengguna tidak mengkonfirmasi
    }

    try {
      const { error } = await supabase
        .from('content')
        .delete()
        .eq('id', id); // Hapus baris dengan ID yang sesuai

      if (error) {
        console.error('Error deleting content:', error.message);
      } else {
        // Data akan diperbarui otomatis oleh real-time listener
      }
    } catch (err) {
      console.error('Unexpected error during delete:', err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans antialiased text-gray-800">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-red-700 mb-8 text-center">Manajemen Konten Buku</h1>

        {/* Search Input & Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Cari berdasarkan Nama, Penulis, atau Kategori..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 w-full sm:w-1/3 shadow-sm focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out placeholder-gray-500"
          />
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition duration-200 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2 font-semibold"
          >
            + Tambah Konten
          </button>
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-lg">
            <p className="text-xl text-red-600 font-semibold">Memuat data...</p>
          </div>
        ) : (
          /* Content Table */
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg p-4">
            <table className="min-w-full text-sm text-left text-gray-800">
              <thead className="text-xs text-red-800 uppercase bg-red-100 rounded-t-xl">
                <tr>
                  <th scope="col" className="px-6 py-3 rounded-tl-xl">Nama</th>
                  <th scope="col" className="px-6 py-3">Penulis</th>
                  <th scope="col" className="px-6 py-3">Kategori</th>
                  <th scope="col" className="px-6 py-3">Harga</th>
                  <th scope="col" className="px-6 py-3">Cover Buku</th>
                  <th scope="col" className="px-6 py-3 rounded-tr-xl text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-50">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500 italic">
                      Tidak ada data yang ditemukan. Tambahkan konten baru!
                    </td>
                  </tr>
                ) : (
                  filteredData.map((book) => (
                    <tr key={book.id} className="bg-white hover:bg-red-50 transition duration-150 ease-in-out">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{book.nama}</td>
                      <td className="px-6 py-4">{book.penulis}</td>
                      <td className="px-6 py-4">{book.kategori}</td>
                      <td className="px-6 py-4">{book.harga}</td>
                      <td className="px-6 py-4">
                        {book.cover ? (
                          <img
                            src={book.cover}
                            alt={`Cover Buku ${book.nama}`}
                            className="h-16 w-12 object-cover rounded-md shadow-sm"
                            onError={(e) => {
                              // Fallback jika gambar gagal dimuat
                              e.target.onerror = null; // Mencegah loop error
                              e.target.src = `https://placehold.co/48x64/FF0000/FFFFFF?text=No+Cover`;
                            }}
                          />
                        ) : (
                          <div className="h-16 w-12 bg-gray-200 flex items-center justify-center rounded-md text-xs text-gray-500">No Cover</div>
                        )}
                      </td>
                      <td className="px-6 py-4 flex gap-3 items-center justify-center">
                        <button
                          onClick={() => handleEdit(book)} // Meneruskan seluruh objek book untuk diedit
                          className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out transform hover:scale-110 p-1 rounded-full hover:bg-blue-100"
                          title="Edit Konten"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(book.id)}
                          className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out transform hover:scale-110 p-1 rounded-full hover:bg-red-100"
                          title="Hapus Konten"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Add Content Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative animate-fade-in-up">
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Tambah Konten Baru</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleAddContent(); }} className="space-y-4">
                <div>
                  <label htmlFor="nama-add" className="block text-sm font-medium text-gray-700 mb-1">Nama Buku</label>
                  <input
                    type="text"
                    id="nama-add"
                    name="nama"
                    value={newContent.nama}
                    onChange={handleNewContentChange}
                    className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="penulis-add" className="block text-sm font-medium text-gray-700 mb-1">Penulis</label>
                  <input
                    type="text"
                    id="penulis-add"
                    name="penulis"
                    value={newContent.penulis}
                    onChange={handleNewContentChange}
                    className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="kategori-add" className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <input
                    type="text"
                    id="kategori-add"
                    name="kategori"
                    value={newContent.kategori}
                    onChange={handleNewContentChange}
                    className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="harga-add" className="block text-sm font-medium text-gray-700 mb-1">Harga (contoh: Rp.446.000)</label>
                  <input
                    type="text"
                    id="harga-add"
                    name="harga"
                    value={newContent.harga}
                    onChange={handleNewContentChange}
                    className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cover-add" className="block text-sm font-medium text-gray-700 mb-1">URL Cover Buku</label>
                  <input
                    type="url"
                    id="cover-add"
                    name="cover"
                    value={newContent.cover}
                    onChange={handleNewContentChange}
                    className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    placeholder="https://example.com/cover.png"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-150 ease-in-out font-medium"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150 ease-in-out font-medium"
                  >
                    Tambah
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Content Modal */}
        {showEditModal && editingContent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative animate-fade-in-up">
              <button
                onClick={() => setShowEditModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Konten Buku</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleUpdateContent(); }} className="space-y-4"> {/* Perbaikan di sini: Menambahkan tanda kutip penutup untuk className */}
                <div>
                  <label htmlFor="nama-edit" className="block text-sm font-medium text-gray-700 mb-1">Nama Buku</label>
                  <input
                    type="text"
                    id="nama-edit"
                    name="nama"
                    value={editingContent.nama}
                    onChange={handleEditingContentChange}
                    className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="penulis-edit" className="block text-sm font-medium text-gray-700 mb-1">Penulis</label>
                  <input
                    type="text"
                    id="penulis-edit"
                    name="penulis"
                    value={editingContent.penulis}
                    onChange={handleEditingContentChange}
                    className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="kategori-edit" className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <input
                    type="text"
                    id="kategori-edit"
                    name="kategori"
                    value={editingContent.kategori}
                    onChange={handleEditingContentChange}
                    className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="harga-edit" className="block text-sm font-medium text-gray-700 mb-1">Harga (contoh: Rp.446.000)</label>
                  <input
                    type="text"
                    id="harga-edit"
                    name="harga"
                    value={editingContent.harga}
                    onChange={handleEditingContentChange}
                    className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cover-edit" className="block text-sm font-medium text-gray-700 mb-1">URL Cover Buku</label>
                  <input
                    type="url"
                    id="cover-edit"
                    name="cover"
                    value={editingContent.cover}
                    onChange={handleEditingContentChange}
                    className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    placeholder="https://example.com/cover.png"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-150 ease-in-out font-medium"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 ease-in-out font-medium"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
