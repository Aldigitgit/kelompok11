import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Produk = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const booksPerPage = 50;

  useEffect(() => {
    fetch("/data/data_buku.json")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      let filtered = books.filter((buku) =>
        buku.judul.toLowerCase().includes(search.toLowerCase())
      );

      if (categoryFilter) {
        filtered = filtered.filter((buku) => buku.kategori === categoryFilter);
      }

      if (yearFilter) {
        filtered = filtered.filter((buku) => String(buku.tahun) === yearFilter);
      }

      setFilteredBooks(filtered);
      setCurrentPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search, categoryFilter, yearFilter, books]);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const kategoriOptions = [...new Set(books.map((b) => b.kategori))];
  const tahunOptions = [...new Set(books.map((b) => b.tahun))].sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">
          Daftar Buku
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul buku..."
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <option value="">Semua Kategori</option>
            {kategoriOptions.map((kategori) => (
              <option key={kategori} value={kategori}>
                {kategori}
              </option>
            ))}
          </select>

          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring--300"
          >
            <option value="">Semua Tahun</option>
            {tahunOptions.map((tahun) => (
              <option key={tahun} value={tahun}>
                {tahun}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentBooks.map((buku) => (
            <div
              key={buku.id}
              className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition border border-gray-100"
            >
              <h2 className="text-lg font-bold text-blue-700 mb-2">
                {buku.judul}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                Penulis: {buku.penulis}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Harga: Rp {buku.harga.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mb-1">Stok: {buku.stok}</p>
              <p className="text-sm text-gray-600 mb-4">Tahun: {buku.tahun}</p>
              <Link
                to={`/produk/${buku.id}`}
                className="inline-block bg-red-500 hover:bg-red-600 text-red-500 font-bold text-sm tracking-wide px-4 py-2 rounded-full shadow-md"
              >
                Detail
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-10">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-white border border-blue-300 text-blue-600 hover:bg-blue-50 disabled:opacity-50"
          >
            Sebelumnya
          </button>
          <p className="text-gray-600">
            Halaman {currentPage} dari {totalPages}
          </p>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default Produk;
