import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const dummyBooks = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    description: "Cara membangun kebiasaan baik dan menghilangkan kebiasaan buruk.",
    price: 120000,
    image: "https://covers.openlibrary.org/b/id/8231996-L.jpg",
  },
  // ... salin semua data dummyBooks dari ProductPage
];

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
}

export default function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = dummyBooks.find((b) => b.id === parseInt(id));

  if (!book) {
    return <div className="text-center py-20 text-xl text-gray-500">Buku tidak ditemukan.</div>;
  }

  return (
    <div className="min-h-screen bg-indigo-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <button
          className="mb-6 text-indigo-600 font-semibold hover:underline"
          onClick={() => navigate(-1)}
        >
          ← Kembali
        </button>
        <div className="flex flex-col md:flex-row gap-8">
          <img src={book.image} alt={book.title} className="w-full md:w-1/2 rounded-xl shadow" />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-indigo-700 mb-2">{book.title}</h1>
            <p className="text-gray-500 italic mb-2">by {book.author}</p>
            <span className="bg-red-200 text-indigo-800 px-3 py-1 rounded-full text-xs font-semibold inline-block mb-3">
              {book.genre}
            </span>
            <p className="text-gray-700 mb-4 leading-relaxed">{book.description}</p>
            <p className="text-2xl font-extrabold text-indigo-600">
              {formatRupiah(book.price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
