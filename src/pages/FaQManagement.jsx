import { useState, useMemo } from 'react';
import { Trash2, Reply, HelpCircle, CheckCircle, Clock } from 'lucide-react';

const initialFaqs = [
  { id: 1, question: 'Bagaimana cara memesan buku di Periplus.com?', answer: '', category: 'Pemesanan', status: 'Belum Dijawab' },
  { id: 2, question: 'Apakah saya bisa mengembalikan barang yang sudah dibeli?', answer: 'Ya, Anda bisa melakukan retur dalam waktu 7 hari setelah pembelian, dengan syarat dan ketentuan berlaku.', category: 'Pengembalian', status: 'Sudah Dijawab' },
  { id: 3, question: 'Bagaimana cara melacak pesanan saya?', answer: 'Anda dapat melacak pesanan Anda melalui halaman "Lacak Pesanan" dengan memasukkan nomor invoice Anda.', category: 'Pemesanan', status: 'Sudah Dijawab' },
  { id: 4, question: 'Apakah Periplus melayani pengiriman internasional?', answer: '', category: 'Pengiriman', status: 'Belum Dijawab' },
  { id: 5, question: 'Metode pembayaran apa saja yang tersedia?', answer: 'Kami menerima pembayaran melalui transfer bank, kartu kredit/debit, dan dompet digital tertentu.', category: 'Pembayaran', status: 'Sudah Dijawab' },
  { id: 6, question: 'Bagaimana jika buku yang saya terima rusak?', answer: 'Silakan hubungi layanan pelanggan kami dalam waktu 2x24 jam setelah menerima buku dan kami akan membantu Anda.', category: 'Pengembalian', status: 'Sudah Dijawab' },
  { id: 7, question: 'Bisakah saya mengubah alamat pengiriman setelah pesanan dikonfirmasi?', answer: '', category: 'Pemesanan', status: 'Belum Dijawab' },
  { id: 8, question: 'Apakah ada diskon untuk pembelian dalam jumlah besar?', answer: 'Untuk pembelian dalam jumlah besar, silakan hubungi tim penjualan korporat kami untuk informasi lebih lanjut mengenai diskon khusus.', category: 'Promosi', status: 'Sudah Dijawab' },
];

const FaQManagement = () => {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [newQuestion, setNewQuestion] = useState('');

  const handleAnswer = (id) => {
    const userAnswer = prompt('Masukkan jawaban:');
    if (userAnswer !== null && userAnswer.trim() !== '') {
      setFaqs((prev) =>
        prev.map((faq) => (faq.id === id ? { ...faq, answer: userAnswer, status: 'Sudah Dijawab' } : faq))
      );
    } else if (userAnswer !== null && userAnswer.trim() === '') {
      alert('Jawaban tidak boleh kosong.');
    }
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus pertanyaan ini?')) {
      setFaqs((prev) => prev.filter((faq) => faq.id !== id));
    }
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim() !== '') {
      const newId = faqs.length > 0 ? Math.max(...faqs.map(f => f.id)) + 1 : 1;
      setFaqs((prev) => [
        ...prev,
        { id: newId, question: newQuestion.trim(), answer: '', category: 'Lain-lain', status: 'Belum Dijawab' }
      ]);
      setNewQuestion('');
    } else {
      alert('Pertanyaan tidak boleh kosong.');
    }
  };

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesStatus = filterStatus === 'Semua' || faq.status === filterStatus;
      const matchesCategory = filterCategory === 'Semua' || faq.category === filterCategory;
      const matchesSearch =
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [faqs, filterStatus, filterCategory, searchTerm]);

  const uniqueCategories = useMemo(() => {
    const categories = new Set(initialFaqs.map(faq => faq.category));
    return ['Semua', ...Array.from(categories)];
  }, []);

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