import { useState, useEffect, useMemo, useCallback } from 'react';
import { Trash2, Reply, HelpCircle, CheckCircle, Clock } from 'lucide-react';
import { supabase } from '../supabase.js';// <--- Perhatikan '../'

const FaQManagement = () => {
  // State untuk menyimpan data FAQ dari Supabase
  const [faqs, setFaqs] = useState([]);
  // State untuk indikator loading saat mengambil data
  const [loading, setLoading] = useState(true);
  // State untuk menyimpan pesan error jika terjadi masalah
  const [error, setError] = useState(null);

  // State untuk filter dan pencarian
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');

  // State untuk input pertanyaan baru
  const [newQuestion, setNewQuestion] = useState('');

  // --- Fungsi untuk Mengambil Data FAQ dari Supabase ---
  // useCallback digunakan untuk mencegah fungsi ini dibuat ulang setiap render,
  // yang bisa menyebabkan masalah dengan useEffect.
  const fetchFaqs = useCallback(async () => {
    setLoading(true); // Set loading ke true saat memulai fetch
    setError(null);   // Reset error sebelumnya
    try {
      // Mengambil data dari tabel 'faqs' di Supabase
      // .select('*') berarti ambil semua kolom
      // .order('created_at', { ascending: false }) mengurutkan dari yang terbaru
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        // Jika ada error dari Supabase, lempar error tersebut
        throw error;
      }
      setFaqs(data); // Update state faqs dengan data yang diterima
    } catch (err) {
      console.error("Error fetching FAQs:", err.message);
      setError("Gagal memuat FAQ: " + err.message); // Set pesan error
    } finally {
      setLoading(false); // Set loading ke false setelah fetch selesai (berhasil/gagal)
    }
  }, []); // Dependensi kosong karena fungsi ini tidak bergantung pada state/props lain yang berubah

  // useEffect untuk memanggil fetchFaqs saat komponen pertama kali dimuat
  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]); // fetchFaqs adalah dependensi di sini (karena menggunakan useCallback)

  // --- Fungsi untuk Menjawab FAQ ---
  const handleAnswer = async (id) => {
    const userAnswer = prompt('Masukkan jawaban:');
    if (userAnswer !== null && userAnswer.trim() !== '') {
      try {
        // Memperbarui baris di tabel 'faqs' berdasarkan 'id'
        const { error } = await supabase
          .from('faqs')
          .update({ answer: userAnswer.trim(), status: 'Sudah Dijawab' })
          .eq('id', id); // .eq() digunakan untuk mencari baris dengan ID yang sesuai

        if (error) {
          throw error;
        }
        // Jika update di Supabase berhasil, perbarui state lokal
        setFaqs((prev) =>
          prev.map((faq) =>
            faq.id === id ? { ...faq, answer: userAnswer.trim(), status: 'Sudah Dijawab' } : faq
          )
        );
      } catch (err) {
        console.error("Error updating FAQ:", err.message);
        alert("Gagal memperbarui jawaban: " + err.message);
      }
    } else if (userAnswer !== null && userAnswer.trim() === '') {
      alert('Jawaban tidak boleh kosong.');
    }
  };

  // --- Fungsi untuk Menghapus FAQ ---
  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus pertanyaan ini?')) {
      try {
        // Menghapus baris dari tabel 'faqs' berdasarkan 'id'
        const { error } = await supabase
          .from('faqs')
          .delete()
          .eq('id', id);

        if (error) {
          throw error;
        }
        // Jika delete di Supabase berhasil, perbarui state lokal
        setFaqs((prev) => prev.filter((faq) => faq.id !== id));
      } catch (err) {
        console.error("Error deleting FAQ:", err.message);
        alert("Gagal menghapus pertanyaan: " + err.message);
      }
    }
  };

  // --- Fungsi untuk Menambah Pertanyaan Baru ---
  const handleAddQuestion = async () => {
    if (newQuestion.trim() !== '') {
      try {
        // Menambahkan baris baru ke tabel 'faqs'
        // .select() digunakan untuk mengembalikan data dari baris yang baru di-insert,
        // termasuk ID yang dihasilkan oleh database.
        const { data, error } = await supabase
          .from('faqs')
          .insert([
            { question: newQuestion.trim(), answer: '', category: 'Lain-lain', status: 'Belum Dijawab' },
          ])
          .select();

        if (error) {
          throw error;
        }
        // Jika insert di Supabase berhasil, perbarui state lokal
        // data[0] karena insert mengembalikan array (walaupun hanya satu item)
        if (data && data.length > 0) {
            setFaqs((prev) => [data[0], ...prev]); // Tambahkan item baru ke awal daftar
        }
        setNewQuestion(''); // Kosongkan input setelah berhasil menambah
      } catch (err) {
        console.error("Error adding new FAQ:", err.message);
        alert("Gagal menambah pertanyaan: " + err.message);
      }
    } else {
      alert('Pertanyaan tidak boleh kosong.');
    }
  };

  // --- Filter dan Pencarian ---
  // useMemo digunakan untuk mengoptimalkan kinerja dengan hanya menghitung ulang
  // filteredFaqs jika dependensi berubah.
  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesStatus = filterStatus === 'Semua' || faq.status === filterStatus;
      const matchesCategory = filterCategory === 'Semua' || faq.category === filterCategory;
      const matchesSearch =
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [faqs, filterStatus, filterCategory, searchTerm]); // Dependensi

  // Ambil kategori unik dari FAQ yang ada untuk dropdown filter
  const uniqueCategories = useMemo(() => {
    const categories = new Set(faqs.map(faq => faq.category));
    return ['Semua', ...Array.from(categories)];
  }, [faqs]); // Bergantung pada 'faqs' agar kategori dinamis

  // --- Kondisi Loading dan Error ---
  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">Memuat FAQ...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">Error: {error}</p>
      </div>
    );
  }

  // --- Render UI Utama ---
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <HelpCircle className="w-8 h-8 mr-3 text-blue-600" /> Manajemen FAQ
        </h1>

        {/* Input untuk menambah pertanyaan baru */}
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Tambah Pertanyaan Baru</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Ketik pertanyaan baru di sini..."
              className="flex-grow border border-gray-300 p-3 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
            <button
              onClick={handleAddQuestion}
              className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Tambah FAQ
            </button>
          </div>
        </div>

        {/* Area Filter dan Pencarian */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <label htmlFor="filterStatus" className="font-medium text-gray-700">Status:</label>
              <select
                id="filterStatus"
                className="border border-gray-300 px-3 py-2 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="Semua">Semua</option>
                <option value="Sudah Dijawab">Sudah Dijawab</option>
                <option value="Belum Dijawab">Belum Dijawab</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="filterCategory" className="font-medium text-gray-700">Kategori:</label>
              <select
                id="filterCategory"
                className="border border-gray-300 px-3 py-2 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {uniqueCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <input
              type="text"
              placeholder="Cari pertanyaan atau jawaban..."
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Daftar FAQ */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-lg">
            Tidak ada FAQ yang ditemukan sesuai kriteria.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="border border-gray-200 p-5 rounded-lg shadow-md bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex-grow mb-3 sm:mb-0">
                  <p className="font-semibold text-lg text-gray-800 flex items-center">
                    <HelpCircle className="w-5 h-5 mr-2 text-gray-600" /> {faq.question}
                  </p>
                  <p className="text-sm text-gray-500 mt-1 ml-7">Kategori: <span className="font-medium">{faq.category}</span></p>
                  {faq.answer ? (
                    <p className="text-base text-green-700 mt-2 ml-7 flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-1" /> Jawaban: <span className="font-normal text-gray-700 ml-1">{faq.answer}</span>
                    </p>
                  ) : (
                    <p className="text-base text-red-600 mt-2 ml-7 italic flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-red-500" /> Belum dijawab
                    </p>
                  )}
                </div>
                <div className="flex gap-3 mt-4 sm:mt-0 sm:ml-4">
                  <button
                    onClick={() => handleAnswer(faq.id)}
                    className="flex items-center justify-center p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    title="Jawab Pertanyaan"
                  >
                    <Reply size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="flex items-center justify-center p-3 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    title="Hapus Pertanyaan"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FaQManagement;