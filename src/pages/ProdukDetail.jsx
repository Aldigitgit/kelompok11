// src/pages/ProdukDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const ProdukDetail = () => {
  const { id } = useParams();
  const [buku, setBuku] = useState(null);
     const role = localStorage.getItem("role");

      const handleLogout = () => {
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("roleChanged"));
    navigate("/login");
  };

  useEffect(() => {
    fetch('/data/data_buku.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id === parseInt(id));
        setBuku(found);
      });
  }, [id]);

  if (!buku) return <p className="p-6">Memuat detail buku...</p>;

  return (
    <div className="p-6">
        <Navbar role={role} handleLogout={handleLogout} />
      <Link to="/produk" className="text-blue-500 hover:underline mb-4 inline-block">← Kembali ke Daftar Buku</Link>
      <div className="flex gap-6">
        <img src={buku.cover} alt={buku.judul} className="w-40 rounded shadow" />
        <div>
          <h1 className="text-2xl font-bold mb-2">{buku.judul}</h1>
          <p className="text-gray-700 mb-1"><strong>Penulis:</strong> {buku.penulis}</p>
          <p className="text-gray-700 mb-1"><strong>Penerbit:</strong> {buku.penerbit}</p>
          <p className="text-gray-700 mb-1"><strong>Tahun Terbit:</strong> {buku.tahun_terbit}</p>
          <p className="text-gray-700 mb-1"><strong>Kategori:</strong> {buku.kategori}</p>
          <p className="text-gray-700 mb-1"><strong>Jumlah Halaman:</strong> {buku.jumlah_halaman}</p>
          <p className="text-gray-700 mb-1"><strong>ISBN:</strong> {buku.isbn}</p>
          <p className="text-gray-700 mb-1"><strong>Harga:</strong> Rp {buku.harga.toLocaleString()}</p>
          <p className="text-gray-700 mb-1"><strong>Stok:</strong> {buku.stok}</p>
          <p className="mt-4 text-gray-800"><strong>Deskripsi:</strong> {buku.deskripsi}</p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ProdukDetail;
