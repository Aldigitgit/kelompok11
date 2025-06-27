import { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../supabase.js';

export default function FaqPageUser() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('faqs')
          .select('*')
          .eq('status', 'Sudah Dijawab') // Hanya yang sudah dijawab
          .order('created_at', { ascending: false });

        if (error) throw error;
        setFaqs(data);
      } catch (err) {
        setError('Gagal memuat data FAQ: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <HelpCircle className="w-8 h-8 mr-3 text-red-600" />
          FAQ – Pertanyaan yang Sering Diajukan
        </h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari pertanyaan atau jawaban..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-red-500 focus:border-red-500 text-gray-700"
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Memuat data FAQ...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : filteredFaqs.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada pertanyaan yang sesuai.</p>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 p-4 rounded-lg bg-gray-50 shadow-sm">
                <p className="font-semibold text-gray-800 mb-2">
                  <HelpCircle className="inline-block w-5 h-5 mr-2 text-red-500" />
                  {faq.question}
                </p>
                <p className="text-gray-700 flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1" />
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
