import React from 'react';

export default function Events() {
  return (
    <section className="bg-white py-16 px-6 md:px-10 lg:px-32 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-red-600 mb-6">Upcoming Events</h1>
        <ul className="space-y-6 text-gray-700">
          <li className="border-l-4 border-red-500 pl-4">
            <p className="font-semibold">📅 July 15, 2025 – Jakarta Book Reading</p>
            <p className="text-sm text-gray-600">A live reading with local authors.</p>
          </li>
          <li className="border-l-4 border-red-500 pl-4">
            <p className="font-semibold">📚 August 20, 2025 – Bandung Author Talk</p>
            <p className="text-sm text-gray-600">Meet and greet with top fiction writers.</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
