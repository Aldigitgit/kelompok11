import React from 'react';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function PrivacyPolicy() {
  const role = localStorage.getItem("role");

      const handleLogout = () => {
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("roleChanged"));
    navigate("/login");
  };
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-10 lg:px-32">
        <Navbar role={role} handleLogout={handleLogout} />
      <div className="max-w-4xl mx-auto text-gray-800">
        <h1 className="text-3xl font-bold text-red-600 mb-6">Privacy Policy</h1>
        <p className="mb-4 text-gray-700 leading-relaxed">
          Your privacy matters to us. Bacaku collects only essential personal data to provide a better reading experience and secure transactions.
        </p>

        <div className="space-y-4 text-sm text-gray-600">
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">🔐 What We Collect</h3>
            <ul className="list-disc list-inside">
              <li>Name, Email Address, and Phone Number</li>
              <li>Browsing and Purchase History</li>
              <li>Device and Location Information</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-1">💡 How We Use It</h3>
            <ul className="list-disc list-inside">
              <li>Personalize book recommendations</li>
              <li>Process transactions securely</li>
              <li>Provide customer support and updates</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-1">📤 Sharing Policy</h3>
            <p>We do not sell or share your personal data to third-party advertisers. All data is encrypted and stored securely.</p>
          </div>
        </div>

        <div className="mt-10 text-sm text-gray-500">
          Last updated: June 2025
        </div>
      </div>
      <Footer></Footer>
    </section>

  );
}
    