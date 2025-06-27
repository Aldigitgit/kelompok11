import React from 'react';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Forum() {
  const role = localStorage.getItem("role");

      const handleLogout = () => {
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("roleChanged"));
    navigate("/login");
  };
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-10 lg:px-32 text-gray-800">
        <Navbar role={role} handleLogout={handleLogout} />
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-6">Community Forum</h1>
        <p className="text-lg text-gray-700 mb-4">Connect with fellow readers, share thoughts, and join discussions.</p>
        <p className="italic text-sm text-gray-500">Forum functionality is coming soon...</p>
      </div>
      <Footer></Footer>
    </section>
  );
}
