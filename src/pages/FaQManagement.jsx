import { useState, useEffect, useMemo, useCallback } from 'react';
import { Trash2, Reply, HelpCircle, CheckCircle, Clock, User, Mail, PlusCircle, Search } from 'lucide-react'; // Menambahkan ikon baru
import { supabase } from '../supabase.js'; // <--- Perhatikan '../'

const FaQManagement = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterStatus, setFilterStatus] = useState('Semua');
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');

  const [newQuestionInput, setNewQuestionInput] = useState({ // Mengubah nama state
    question: '',
    category: 'Umum' // Default category for new questions
  });

  // --- Fungsi untuk Mengambil Data FAQ dari Supabase ---
  const fetchFaqs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Menambahkan kolom user_name dan user_email
      const { data, error } = await supabase
        .from('faqs')
        .select('id, question, answer, status, category, created_at, user_name, user_email') // Tambahkan user_name dan user_email
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }
      setFaqs(data);
    } catch (err) {
      console.error("Error fetching FAQs:", err.message);
      setError("Gagal memuat FAQ: " + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  // --- Fungsi untuk Menjawab FAQ ---
  const handleAnswer = async (id) => {
    const faqToAnswer = faqs.find(faq => faq.id === id);
    if (!faqToAnswer) return;

    // Prefill prompt with existing answer if available
    const userAnswer = prompt('Masukkan jawaban:', faqToAnswer.answer || '');
    
    if (userAnswer === null) { // User clicked cancel
      return;
    }
    
    if (userAnswer.trim() === '') {
      alert('Jawaban tidak boleh kosong.');
      return;
    }

    try {
      const { error } = await supabase
        .from('faqs')
        .update({ answer: userAnswer.trim(), status: 'Sudah Dijawab' })
        .eq('id', id);

      if (error) {
        throw error;
      }
      setFaqs((prev) =>
        prev.map((faq) =>
          faq.id === id ? { ...faq, answer: userAnswer.trim(), status: 'Sudah Dijawab' } : faq
        )
      );
      alert('Jawaban berhasil diperbarui!');
    } catch (err) {
      console.error("Error updating FAQ:", err.message);
      alert("Gagal memperbarui jawaban: " + err.message);
    }
  };

  // --- Fungsi untuk Menghapus FAQ ---
  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus pertanyaan ini secara permanen?')) {
      try {
        const { error } = await supabase
          .from('faqs')
          .delete()
          .eq('id', id);

        if (error) {
          throw error;
        }
        setFaqs((prev) => prev.filter((faq) => faq.id !== id));
        alert('Pertanyaan berhasil dihapus!');
      } catch (err) {
        console.error("Error deleting FAQ:", err.message);
        alert("Gagal menghapus pertanyaan: " + err.message);
      }
    }
  };

  // --- Fungsi untuk Menambah Pertanyaan Baru (dari sisi admin/management) ---
  const handleAddQuestion = async () => {
    if (newQuestionInput.question.trim() === '') {
      alert('Pertanyaan tidak boleh kosong.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('faqs')
        .insert([
          {
            question: newQuestionInput.question.trim(),
            answer: '', // Kosong secara default
            category: newQuestionInput.category,
            status: 'Sudah Dijawab', // Admin langsung memasukkan FAQ yang sudah dijawab
            user_name: 'Admin', // Default user for admin added FAQ
            user_email: 'admin@periplus.com' // Default email for admin added FAQ
          },
        ])
        .select();

      if (error) {
        throw error;
      }
      if (data && data.length > 0) {
        setFaqs((prev) => [data[0], ...prev]); // Tambahkan di awal daftar
      }
      setNewQuestionInput({ question: '', category: 'Umum' }); // Reset form
      alert('Pertanyaan baru berhasil ditambahkan!');
    } catch (err) {
      console.error("Error adding new FAQ:", err.message);
      alert("Gagal menambah pertanyaan: " + err.message);
    }
  };

  // --- Filter dan Pencarian ---
  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesStatus = filterStatus === 'Semua' || faq.status === filterStatus;
      const matchesCategory = filterCategory === 'Semua' || (faq.category === filterCategory); // Check for undefined category
      const matchesSearch =
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (faq.answer && faq.answer.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (faq.user_name && faq.user_name.toLowerCase().includes(searchTerm.toLowerCase())); // Search by user name too

      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [faqs, filterStatus, filterCategory, searchTerm]);

  // Ambil kategori unik dari FAQ yang ada untuk dropdown filter
  const uniqueCategories = useMemo(() => {
    const categories = new Set(faqs.map(faq => faq.category).filter(Boolean)); // Filter out null/undefined
    return ['Semua', 'Umum', 'Event', 'Produk', 'Layanan', ...Array.from(categories)].filter((value, index, self) => self.indexOf(value) === index).sort(); // Remove duplicates and sort
  }, [faqs]);

  // --- Kondisi Loading dan Error ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">Memuat FAQ...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-red-600">Error: {error}</p>
      </div>
    );
  }

  // --- Render UI Utama ---
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header / Hero Section */}
      <div className="bg-gradient-to-r from-red-700 to-red-900 text-white py-16 px-6 sm:px-10 lg:px-20 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 sm:mb-0 flex items-center">
            <HelpCircle className="w-12 h-12 mr-4" />
            Manajemen FAQ
          </h1>
          <p className="text-lg opacity-90 text-center sm:text-right">
            Kelola pertanyaan dan jawaban untuk pengguna Anda.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Form Tambah Pertanyaan Baru */}
        <div className="bg-white p-8 rounded-2xl shadow-xl mb-10 border-t-4 border-red-600">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <PlusCircle className="w-8 h-8 mr-3 text-red-600" /> Tambah FAQ Baru
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Ketik pertanyaan baru di sini..."
              className="flex-grow border border-gray-300 p-4 rounded-lg focus:ring-red-500 focus:border-red-500 text-gray-800 shadow-sm"
              value={newQuestionInput.question}
              onChange={(e) => setNewQuestionInput(prev => ({ ...prev, question: e.target.value }))}
            />
            <select
              className="w-full md:w-auto border border-gray-300 p-4 rounded-lg text-gray-800 focus:ring-red-500 focus:border-red-500 bg-white shadow-sm"
              value={newQuestionInput.category}
              onChange={(e) => setNewQuestionInput(prev => ({ ...prev, category: e.target.value }))}
            >
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button
              onClick={handleAddQuestion}
              className="px-8 py-4 bg-red-700 text-white rounded-lg font-bold text-lg hover:bg-red-800 transition-colors duration-300 shadow-md flex items-center justify-center"
            >
              <PlusCircle className="w-5 h-5 mr-2" /> Tambah FAQ
            </button>
          </div>
        </div>

        {/* Filter dan Pencarian */}
        <div className="bg-white p-8 rounded-2xl shadow-xl mb-10 flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2">
              <label htmlFor="filterStatus" className="font-medium text-gray-700 text-lg">Status:</label>
              <select
                id="filterStatus"
                className="border border-gray-300 px-4 py-2 rounded-lg text-gray-700 focus:ring-red-500 focus:border-red-500 bg-white shadow-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="Semua">Semua</option>
                <option value="Sudah Dijawab">Sudah Dijawab</option>
                <option value="Belum Dijawab">Belum Dijawab</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="filterCategory" className="font-medium text-gray-700 text-lg">Kategori:</label>
              <select
                id="filterCategory"
                className="border border-gray-300 px-4 py-2 rounded-lg text-gray-700 focus:ring-red-500 focus:border-red-500 bg-white shadow-sm"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {uniqueCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full lg:w-1/3 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari pertanyaan, jawaban, atau pengirim..."
              className="w-full border border-gray-300 pl-12 pr-4 py-3 rounded-lg focus:ring-red-500 focus:border-red-500 text-gray-800 placeholder-gray-500 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Daftar FAQ */}
        {filteredFaqs.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center py-10 text-gray-500 text-xl">
            Tidak ada FAQ yang ditemukan sesuai kriteria.
          </div>
        ) : (
          <div className="space-y-6">
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="border border-gray-200 p-6 rounded-2xl shadow-md bg-white flex flex-col md:flex-row justify-between items-start md:items-center transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex-grow mb-4 md:mb-0">
                  <p className="font-bold text-lg text-gray-900 mb-2 flex items-center">
                    <HelpCircle className="w-6 h-6 mr-3 text-red-600 flex-shrink-0" /> {faq.question}
                  </p>
                  <p className="text-sm text-gray-600 mb-2 ml-9 flex items-center">
                    <User className="w-4 h-4 mr-2 text-gray-500" /> Dari: <span className="font-semibold ml-1">{faq.user_name || 'Anonim'}</span>
                    {faq.user_email && <><Mail className="w-4 h-4 ml-4 mr-2 text-gray-500" /> <span className="font-semibold">{faq.user_email}</span></>}
                  </p>
                  <p className="text-sm text-gray-500 ml-9 mb-2 flex items-center">
                    Kategori: <span className="font-semibold text-gray-700 ml-1 bg-gray-100 px-2 py-0.5 rounded-full text-xs">{faq.category || 'Tidak Diketahui'}</span>
                  </p>
                  {faq.answer ? (
                    <p className="text-base text-gray-700 mt-3 ml-9 flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-1" />
                      <span className="font-medium">Jawaban:</span> <span className="ml-2">{faq.answer}</span>
                    </p>
                  ) : (
                    <p className="text-base text-red-600 mt-3 ml-9 italic flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-red-500" /> Belum dijawab
                    </p>
                  )}
                   <p className="text-xs text-gray-400 mt-2 ml-9">
                     Dibuat pada: {new Date(faq.created_at).toLocaleString('id-ID')}
                   </p>
                </div>
                <div className="flex gap-4 mt-4 md:mt-0 md:ml-6 flex-shrink-0">
                  <button
                    onClick={() => handleAnswer(faq.id)}
                    className="flex items-center justify-center p-3 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
                    title="Jawab / Edit Jawaban"
                  >
                    <Reply size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="flex items-center justify-center p-3 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-sm"
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