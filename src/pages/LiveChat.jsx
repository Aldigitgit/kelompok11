import React from 'react';

export default function LiveChat() {
  return (
    <section className="bg-gray-100 py-16 px-6 md:px-10 lg:px-32 text-center text-gray-800">
      <h1 className="text-4xl font-bold text-red-600 mb-6">Live Chat</h1>
      <p className="text-lg mb-4">Talk with our team in real-time to get your questions answered.</p>
      <div className="bg-white max-w-xl mx-auto p-6 rounded shadow text-sm">
        <p className="text-gray-600">👩‍💻 Live chat support is available Monday–Friday, 9AM–5PM.</p>
        <p className="text-gray-500 mt-2">In the meantime, you can email us at <a className="text-red-500 underline" href="mailto:support@bacaku.com">support@bacaku.com</a></p>
      </div>
    </section>
  );
}
