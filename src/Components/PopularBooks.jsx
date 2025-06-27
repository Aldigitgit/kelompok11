import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom'; // <-- tambahkan ini

export default function PopularBooks() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate(); // <-- tambahkan ini

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from('produk')
        .select('*');

      if (error) {
        console.error('Gagal mengambil data:', error.message);
      } else {
        // Acak array dan ambil 12 buku
        const shuffled = data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 12);
        setBooks(selected);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="py-10 px-6 bg-white">
      <h2 className="text-2xl font-semibold mb-4">Popular Books</h2>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 pb-2">
          {books.map((book) => (
            <div
              key={book.id}
              onClick={() => navigate(`/book/${book.id}`)} // <-- tambahkan ini
              className="min-w-[160px] bg-white rounded-lg shadow-md p-2 hover:scale-105 transition cursor-pointer"
            >
              <img
                src={book.url_gambar}
                alt={book.judul}
                className="mx-auto mb-2 h-40 object-cover rounded"
              />
              <p className="text-sm font-semibold text-center">{book.judul}</p>
              <p className="text-xs text-gray-500 text-center">{book.penerbit}</p>
              <p className="text-[11px] text-gray-600 text-center line-clamp-2">
                oleh {book.penulis}
              </p>
              <p className="text-[13px] font-bold text-center text-red-700 mt-1">
                Rp {parseInt(book.harga).toLocaleString('id-ID')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
