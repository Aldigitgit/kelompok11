import React, { useState, useEffect } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp, Send, Loader } from 'lucide-react'; // Menambahkan Send dan Loader
import { supabase } from '../supabase.js'; // Pastikan path ini benar

export default function FaqPageUser() {
  const role = localStorage.getItem("role");

      const handleLogout = () => {
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("roleChanged"));
    navigate("/login");
  };

  const [faqs, setFaqs] = useState([]);
  const [loadingFaqs, setLoadingFaqs] = useState(true); // Ganti nama state loading
  const [errorFaqs, setErrorFaqs] = useState(null); // Ganti nama state error
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaqId, setOpenFaqId] = useState(null);

  // State untuk form pertanyaan baru
  const [newQuestion, setNewQuestion] = useState({
    name: '',
    email: '',
    question: '',
  });
  const [submittingQuestion, setSubmittingQuestion] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Fetch FAQs
  useEffect(() => {
    const fetchFaqs = async () => {
      setLoadingFaqs(true);
      setErrorFaqs(null);
      try {
        const { data, error } = await supabase
          .from('faqs')
          .select('id, question, answer, status') // Hanya ambil kolom yang diperlukan
          .eq('status', 'Sudah Dijawab')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setFaqs(data);
      } catch (err) {
        setErrorFaqs('Gagal memuat pertanyaan: ' + err.message);
      } finally {
        setLoadingFaqs(false);
      }
    };

    fetchFaqs();
  }, []);

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (faq.answer && faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleNewQuestionChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitNewQuestion = async (e) => {
    e.preventDefault();
    setSubmittingQuestion(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      if (!newQuestion.name || !newQuestion.email || !newQuestion.question) {
        throw new Error('Harap lengkapi semua bidang.');
      }

      const { error } = await supabase
        .from('faqs')
        .insert([
          {
            question: newQuestion.question,
            answer: null, // Jawaban kosong karena ini pertanyaan baru
            status: 'Belum Dijawab', // Tandai sebagai belum dijawab
            user_name: newQuestion.name, // Opsional: tambahkan kolom ini di DB Anda
            user_email: newQuestion.email, // Opsional: tambahkan kolom ini di DB Anda
          }
        ]);

      if (error) throw error;

      setSubmitSuccess(true);
      setNewQuestion({ name: '', email: '', question: '' }); // Reset form
      setTimeout(() => setSubmitSuccess(false), 5000); // Sembunyikan pesan sukses setelah 5 detik

    } catch (err) {
      setSubmitError('Gagal mengirim pertanyaan: ' + err.message);
    } finally {
      setSubmittingQuestion(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section - Visual Lebih Menarik */}
      <div className="relative bg-gradient-to-br from-red-800 to-red-950 text-white py-24 px-6 sm:px-10 lg:px-20 overflow-hidden shadow-xl">
        <div className="max-w-7xl mx-auto z-10 relative">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-4 leading-tight">
            Punya Pertanyaan? Kami Punya Jawabannya!
          </h1>
          <p className="text-xl sm:text-2xl font-semibold mb-10 opacity-90">
            Temukan informasi yang Anda butuhkan atau ajukan pertanyaan langsung kepada kami.
          </p>

          {/* Search Bar - Lebih Menonjol */}
          <div className="bg-white rounded-xl p-4 shadow-2xl flex items-center w-full max-w-2xl mx-auto">
            <Search className="h-6 w-6 text-gray-500 mr-3 ml-2" />
            <input
              type="text"
              placeholder="Cari pertanyaan yang sering diajukan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 px-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
        {/* Background blobs/shapes (for visual appeal, consistent with Events.js) */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob top-10 left-0"></div>
          <div className="absolute w-72 h-72 bg-orange-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000 top-40 right-20"></div>
          <div className="absolute w-72 h-72 bg-amber-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000 bottom-10 left-40"></div>
        </div>
        {/* Image placeholders similar to the hero section in Events.js */}
        <div className="absolute top-12 right-12 z-0">
          <img
            src="https://images.unsplash.com/photo-1533668875569-8e6d231920b6?auto=format&fit=crop&w=200&q=80"
            alt="Person reading"
            className="w-28 h-28 sm:w-40 sm:h-40 rounded-full object-cover shadow-xl border-4 border-white transform translate-x-16 -translate-y-8"
          />
        </div>
        <div className="absolute bottom-12 right-40 z-0">
          <img
            src="https://images.unsplash.com/photo-1517409226871-3810d7a040b1?auto=format&fit=crop&w=200&q=80"
            alt="Question mark"
            className="w-28 h-28 sm:w-40 sm:h-40 rounded-full object-cover shadow-xl border-4 border-white transform -translate-x-12 translate-y-12"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* FAQ List Section */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Pertanyaan yang Sering Diajukan
        </h2>

        {loadingFaqs ? (
          <p className="text-center text-gray-600 text-lg py-10 flex items-center justify-center">
            <Loader className="w-6 h-6 animate-spin mr-3 text-red-500" /> Memuat FAQ...
          </p>
        ) : errorFaqs ? (
          <p className="text-center text-red-600 text-lg py-10">{errorFaqs}</p>
        ) : filteredFaqs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg py-10">
            Tidak ada pertanyaan yang sesuai dengan pencarian Anda.
          </p>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-xl bg-white shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-red-50 transition duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 rounded-xl"
                >
                  <span className="font-semibold text-lg text-gray-800 flex items-center">
                    <HelpCircle className="w-6 h-6 mr-3 text-red-600 flex-shrink-0" />
                    {faq.question}
                  </span>
                  {openFaqId === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-red-600 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 ml-4" />
                  )}
                </button>
                {openFaqId === faq.id && (
                  <div className="p-5 border-t border-gray-200 bg-gray-50 animate-fadeIn">
                    <p className="text-gray-700 flex items-start">
                      <span className="font-bold mr-2 flex-shrink-0">J:</span>
                      <span className="leading-relaxed">{faq.answer}</span>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Section untuk Pengajuan Pertanyaan Baru */}
        <div className="mt-16 bg-white p-8 rounded-2xl shadow-xl border-t-4 border-red-600">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Masih Ada Pertanyaan? Ajukan Disini!
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Tidak menemukan jawaban yang Anda cari? Kirimkan pertanyaan Anda kepada kami dan tim kami akan segera membantu.
          </p>

          <form onSubmit={handleSubmitNewQuestion} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newQuestion.name}
                onChange={handleNewQuestionChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-gray-800 shadow-sm"
                placeholder="Masukkan nama Anda"
                required
                disabled={submittingQuestion}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Anda</label>
              <input
                type="email"
                id="email"
                name="email"
                value={newQuestion.email}
                onChange={handleNewQuestionChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-gray-800 shadow-sm"
                placeholder="Masukkan email aktif Anda"
                required
                disabled={submittingQuestion}
              />
            </div>
            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">Pertanyaan Anda</label>
              <textarea
                id="question"
                name="question"
                rows="5"
                value={newQuestion.question}
                onChange={handleNewQuestionChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 text-gray-800 shadow-sm resize-y"
                placeholder="Tuliskan pertanyaan Anda di sini..."
                required
                disabled={submittingQuestion}
              ></textarea>
            </div>

            {submitError && (
              <p className="text-red-600 text-center text-sm">{submitError}</p>
            )}
            {submitSuccess && (
              <p className="text-green-600 text-center text-sm">
                Pertanyaan Anda berhasil dikirim! Kami akan segera meresponnya.
              </p>
            )}

            <button
              type="submit"
              className={`w-full py-4 rounded-lg font-bold text-lg transition duration-300 shadow-lg flex items-center justify-center
                ${submittingQuestion ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-700 hover:bg-red-800 text-white'}`}
              disabled={submittingQuestion}
            >
              {submittingQuestion ? (
                <>
                  <Loader className="w-5 h-5 animate-spin mr-3" /> Mengirim...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-3" /> Kirim Pertanyaan
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}