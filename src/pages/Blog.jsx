import React from 'react';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Blog() {
  const role = localStorage.getItem("role");

      const handleLogout = () => {
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("roleChanged"));
    navigate("/login");
  };
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-10 lg:px-32 text-gray-800">
        <Navbar role={role} handleLogout={handleLogout} />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-red-600 mb-6">Bacaku Blog</h1>
        <p className="text-lg text-gray-700 mb-8">Stories, insights, and book-related articles to feed your mind.</p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white shadow hover:shadow-md rounded p-6 transition">
            <h2 className="text-xl font-semibold mb-2">📖 The Science Behind Reading Habits</h2>
            <p className="text-sm text-gray-600">Explore why we love stories and how reading affects your brain.</p>
          </div>
          <div className="bg-white shadow hover:shadow-md rounded p-6 transition">
            <h2 className="text-xl font-semibold mb-2">🔥 Top 10 Books to Read This Year</h2>
            <p className="text-sm text-gray-600">A carefully curated list for 2025.</p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </section>
  );
}
