import React from 'react';

export default function HelpCenter() {
  return (
    <section className="bg-white py-16 px-6 md:px-10 lg:px-32 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-red-600 mb-6">Help Center</h1>
        <p className="mb-4 text-gray-700">Need assistance? Browse our help topics below.</p>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-semibold text-gray-700 mb-2">📦 Orders & Shipping</h3>
            <ul className="list-disc list-inside">
              <li>Track your order</li>
              <li>Shipping costs & ETA</li>
              <li>Return policy</li>
            </ul>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-semibold text-gray-700 mb-2">🔐 Account & Security</h3>
            <ul className="list-disc list-inside">
              <li>Reset password</li>
              <li>Two-factor authentication</li>
              <li>Delete account</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
