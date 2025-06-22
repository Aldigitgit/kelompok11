import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaGooglePlusG,
  FaLinkedinIn,
} from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    setError("");

    // Logika sederhana: jika sesuai, admin atau user
    if (email === "admin@gmail.com" && password === "123") {
      localStorage.setItem("role", "admin");
      navigate("/");
    } else if (email === "user@gmail.com" && password === "123") {
      localStorage.setItem("role", "user");
      navigate("/home");
    } else {
      setError("Email atau password salah.");
    }
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-2xl flex w-full max-w-5xl overflow-hidden">
        {/* Left - Sign In */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">
            Sign in
          </h2>

          <div className="flex justify-center space-x-4 mb-6">
            <button className="flex items-center justify-center w-12 h-12 rounded-full hover:scale-105 transition bg-blue-600">
              <FaFacebookF className="text-white text-xl" />
            </button>
            <button className="flex items-center justify-center w-12 h-12 rounded-full hover:scale-105 transition bg-red-600">
              <FaGooglePlusG className="text-white text-xl" />
            </button>
            <button className="flex items-center justify-center w-12 h-12 rounded-full hover:scale-105 transition bg-blue-700">
              <FaLinkedinIn className="text-white text-xl" />
            </button>
          </div>

          <p className="text-center text-gray-500 mb-6">
            atau gunakan akun anda
          </p>

          <form onSubmit={handleSignIn} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-blue-50 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-blue-50 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <a
              href="#"
              className="block text-sm text-blue-600 hover:underline text-right"
            >
              Lupa kata sandi?
            </a>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold hover:opacity-90 transition duration-300"
            >
              SIGN IN
            </button>
          </form>
        </div>

        {/* Right - Sign Up CTA */}
        <div className="w-1/2 bg-blue-100 text-blue-800 p-10 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl font-bold mb-4">Halo, Teman!</h2>
          <p className="text-lg mb-8 leading-relaxed">
            Daftarkan diri anda dan mulai gunakan layanan kami segera
          </p>
          <button
            onClick={handleSignUp}
            className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold hover:opacity-90 transition duration-300"
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
