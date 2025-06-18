import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleSignIn = (e) => {
  e.preventDefault();
  setError("");

  if (email === "user@example.com" && password === "juju140803@") {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loggedInUserName", "John Doe");
    navigate("/"); // diarahkan ke halaman dashboard
  } else {
    setError("Invalid email or password.");
  }
};

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-2xl flex w-full max-w-5xl overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">
            Sign in
          </h2>

          {/* Social Media Login */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              className="flex items-center justify-center w-12 h-12 rounded-full hover:scale-105 transition"
              style={{ backgroundColor: "#3b5998" }}
            >
              <FaFacebookF className="text-white text-xl" />
            </button>
            <button
              className="flex items-center justify-center w-12 h-12 rounded-full hover:scale-105 transition"
              style={{ backgroundColor: "#db4437" }}
            >
              <FaGooglePlusG className="text-white text-xl" />
            </button>
            <button
              className="flex items-center justify-center w-12 h-12 rounded-full hover:scale-105 transition"
              style={{ backgroundColor: "#0077b5" }}
            >
              <FaLinkedinIn className="text-white text-xl" />
            </button>
          </div>

          <p className="text-center text-gray-500 mb-6">
            atau gunakan akun anda
          </p>

          {/* Login Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-blue-50 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0097A7]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg bg-blue-50 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0097A7]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            <a
              href="#"
              className="block text-sm text-right text-[#0097A7] hover:underline mt-2"
            >
              Lupa kata sandi anda?
            </a>

            <button
              type="submit"
              style={{ backgroundColor: "#03A9F4" }}
              className="w-full text-white py-3 rounded-full text-lg font-semibold hover:opacity-90 transition duration-300"
            >
              SIGN IN
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-[#0097A7] text-white p-10 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl font-bold mb-4">Halo, Teman!</h2>
          <p className="text-lg mb-8 leading-relaxed">
            Daftarkan diri anda dan mulai gunakan layanan kami segera
          </p>
            <button
              type="submit"
              style={{ backgroundColor: "#03A9F4" }}
              className="w-full text-white py-3 rounded-full text-lg font-semibold hover:opacity-90 transition duration-300"
            >
              SIGN UP
            </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
