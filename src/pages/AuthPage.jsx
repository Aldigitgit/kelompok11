import React, { useState } from "react";

export default function AuthPage() {
  const [page, setPage] = useState("login"); // 'login' | 'register' | 'forgot'

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-600 via-pink-500 to-red-500 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10">
        {page === "login" && <LoginForm switchPage={setPage} />}
        {page === "register" && <RegisterForm switchPage={setPage} />}
        {page === "forgot" && <ForgotForm switchPage={setPage} />}
      </div>
    </div>
  );
}

function LoginForm({ switchPage }) {
  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Masuk ke Akunmu</h2>
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="password"
          placeholder="Kata Sandi"
          required
          className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition"
        >
          Masuk
        </button>
      </form>
      <div className="mt-6 flex justify-between text-sm text-pink-600">
        <button
          onClick={() => switchPage("forgot")}
          className="hover:underline focus:outline-none"
        >
          Lupa kata sandi?
        </button>
        <button
          onClick={() => switchPage("register")}
          className="hover:underline focus:outline-none"
        >
          Daftar baru
        </button>
      </div>
    </>
  );
}

function RegisterForm({ switchPage }) {
  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Buat Akun Baru</h2>
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Nama Lengkap"
          required
          className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="password"
          placeholder="Kata Sandi"
          required
          className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
        >
          Daftar
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-purple-600">
        Sudah punya akun?{" "}
        <button
          onClick={() => switchPage("login")}
          className="font-semibold hover:underline focus:outline-none"
        >
          Masuk di sini
        </button>
      </div>
    </>
  );
}

function ForgotForm({ switchPage }) {
  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Reset Kata Sandi</h2>
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Masukkan email untuk reset kata sandi"
          required
          className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
        >
          Kirim Link Reset
        </button>
      </form>
      <div className="mt-6 flex justify-between text-sm text-indigo-600">
        <button
          onClick={() => switchPage("login")}
          className="hover:underline focus:outline-none"
        >
          Kembali ke Masuk
        </button>
        <button
          onClick={() => switchPage("register")}
          className="hover:underline focus:outline-none"
        >
          Daftar baru
        </button>
      </div>
    </>
  );
}
