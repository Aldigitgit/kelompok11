import React, { useState } from "react";
import { Link } from "react-router-dom"; // ← WAJIB untuk <Link>

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
  {
    id: 2,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    genre: "History",
    description: "Sejarah manusia dari zaman purba hingga modern.",
    price: 150000,
    image: "https://covers.openlibrary.org/b/id/8319256-L.jpg",
  },
  {
    id: 3,
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    genre: "Self-Help",
    description: "Panduan hidup praktis untuk lebih bahagia dan realistis.",
    price: 110000,
    image: "https://covers.openlibrary.org/b/id/8231998-L.jpg",
  },
  {
    id: 4,
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Programming",
    description: "Panduan menulis kode yang bersih dan mudah dipelihara.",
    price: 200000,
    image: "https://covers.openlibrary.org/b/id/8372252-L.jpg",
  },
  {
    id: 5,
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Productivity",
    description: "Cara fokus tanpa gangguan dan meningkatkan produktivitas.",
    price: 140000,
    image: "https://covers.openlibrary.org/b/id/8232000-L.jpg",
  },
];

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
}

export default function ProductPage() {
  const [filterTitle, setFilterTitle] = useState("");
  const [filterGenre, setFilterGenre] = useState("");

  const genres = Array.from(new Set(dummyBooks.map((b) => b.genre)));

  const filteredBooks = dummyBooks.filter((book) => {
    const matchesTitle = book.title.toLowerCase().includes(filterTitle.toLowerCase());
    const matchesGenre = filterGenre ? book.genre === filterGenre : true;
    return matchesTitle && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-100 py-12 px-6">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-10">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-8 text-center tracking-wide">
          Bookstore - Daftar Buku
        </h1>

        {/* Input pencarian judul */}
        <input
          type="text"
          placeholder="Cari buku berdasarkan judul..."
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
          className="mb-8 w-full md:w-1/2 mx-auto block p-4 rounded-xl border border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 text-lg shadow-sm"
        />

        {/* Filter genre */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            onClick={() => setFilterGenre("")}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              filterGenre === ""
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-indigo-100 text-indigo-700 hover:bg-indigo-300"
            }`}
          >
            Semua Genre
          </button>

          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setFilterGenre(genre)}
              className={`px-5 py-2 rounded-full font-semibold transition ${
                filterGenre === genre
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-indigo-100 text-indigo-700 hover:bg-indigo-300"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Daftar Buku */}
        {filteredBooks.length === 0 ? (
          <p className="text-center text-gray-500 text-xl font-medium">
            Buku tidak ditemukan.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredBooks.map(({ id, title, author, genre, description, price, image }) => (
              <Link key={id} to={`/books/${id}`} className="hover:no-underline">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-indigo-700 mb-1">{title}</h2>
                    <p className="text-sm text-gray-500 italic mb-1">by {author}</p>
                    <span className="inline-block bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      {genre}
                    </span>
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">{description}</p>
                    <p className="text-xl font-extrabold text-indigo-600">{formatRupiah(price)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
