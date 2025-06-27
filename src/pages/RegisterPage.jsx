import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    foto_profil: "",
    wilayah: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password || !form.wilayah) {
      setError("Semua field wajib diisi.");
      return;
    }

    // 1. Daftarkan ke Supabase Auth (opsional, jika kamu pakai auth bawaan)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (authError) {
      setError("Gagal daftar: " + authError.message);
      return;
    }

    const userId = authData.user?.id;

    // 2. Tambahkan ke tabel `account` dengan role default: "user"
    const { error: dbError } = await supabase.from("account").insert({
      id: userId,
      name: form.name,
      email: form.email,
      password: form.password,
      wilayah: form.wilayah,
      foto_profil: form.foto_profil,
      role: "user" // default role
    });

    if (dbError) {
      setError("Gagal menyimpan ke tabel account: " + dbError.message);
      return;
    }

    alert("Registrasi berhasil! Silakan login.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-2xl flex w-full max-w-5xl overflow-hidden">
        {/* Kiri - CTA Login */}
        <div className="w-1/2 bg-blue-100 text-blue-800 p-10 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl font-bold mb-4">Sudah punya akun?</h2>
          <p className="text-lg mb-8 leading-relaxed">
            Masuk sekarang untuk mengakses dashboard dan layanan kami
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold hover:opacity-90 transition duration-300"
          >
            SIGN IN
          </button>
        </div>

        {/* Kanan - Form Register */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Nama Lengkap"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-blue-50"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-blue-50"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-blue-50"
              value={form.password}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="foto_profil"
              placeholder="URL Foto Profil"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-blue-50"
              value={form.foto_profil}
              onChange={handleChange}
            />
            <select
              name="wilayah"
              value={form.wilayah}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-blue-50"
              required
            >
              <option value="">Pilih Wilayah</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Bandung">Bandung</option>
              <option value="Surabaya">Surabaya</option>
              <option value="Pekanbaru">Pekanbaru</option>
              <option value="Medan">Medan</option>
            </select>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold hover:opacity-90 transition duration-300"
            >
              DAFTAR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
