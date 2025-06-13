import React from 'react';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full flex overflow-hidden">
        {/* Left Image */}
        <div className="w-1/2 p-6 hidden md:block">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/reading-books-5179942-4338793.png"
            alt="Register Illustration"
            className="object-contain h-full"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Daftar Akun Periplus</h2>
          <form className="space-y-4">
            <input type="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded-lg" />
            <input type="text" placeholder="Nama Lengkap" className="w-full p-3 border border-gray-300 rounded-lg" />
            <input type="password" placeholder="Kata Sandi" className="w-full p-3 border border-gray-300 rounded-lg" />
            <input type="password" placeholder="Konfirmasi Kata Sandi" className="w-full p-3 border border-gray-300 rounded-lg" />

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
            >
              Daftar
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Sudah punya akun? <a href="/login" className="text-purple-600 hover:underline">Masuk</a>
          </p>
        </div>
      </div>
    </div>
  );
}
