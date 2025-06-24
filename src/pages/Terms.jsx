import React from 'react';

export default function Terms() {
  return (
    <section className="bg-white py-16 px-6 md:px-10 lg:px-32">
      <div className="max-w-4xl mx-auto text-gray-800">
        <h1 className="text-3xl font-bold text-red-600 mb-6">Terms & Conditions</h1>
        <p className="mb-6 text-gray-700 leading-relaxed">
          By accessing Bacaku’s platform, you agree to the following terms. Please read them carefully to understand your rights and responsibilities.
        </p>

        <div className="space-y-6 text-sm text-gray-600">
          <div>
            <h3 className="font-semibold text-gray-700">1. Account Registration</h3>
            <p>You must provide accurate personal information and keep your credentials secure. You are responsible for all activity under your account.</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">2. Content Ownership</h3>
            <p>All content including book listings, descriptions, and images are property of Bacaku or its partners. Unauthorized use is prohibited.</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">3. Limitations of Use</h3>
            <p>You may not resell, duplicate, or exploit the platform for any commercial purpose without written consent.</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">4. Termination</h3>
            <p>We reserve the right to suspend or terminate your account for violation of terms or malicious activity.</p>
          </div>
        </div>

        <div className="mt-10 text-sm text-gray-500">
          Last updated: June 2025
        </div>
      </div>
    </section>
  );
}
