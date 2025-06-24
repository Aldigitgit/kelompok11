import React from 'react';

export default function About() {
  return (
    <section className="bg-white py-16 px-6 md:px-10 lg:px-32">
      <div className="max-w-5xl mx-auto text-gray-800">
        <h1 className="text-4xl font-bold text-red-600 mb-6">About Bacaku</h1>
        <p className="text-lg mb-4 leading-relaxed">
          <strong>Bacaku</strong> was founded with one simple goal: to inspire a lifelong love of reading. 
          Since 2025, we’ve helped readers from all walks of life explore new worlds, spark their imagination, and expand their knowledge.
        </p>
        <p className="mb-4 text-gray-600">
          We curate thousands of titles — from bestsellers to hidden gems, from fiction to science, from children’s books to timeless literature.
          Every book is handpicked to deliver value and joy to our community.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">📚 Our Mission</h3>
            <p className="text-sm text-gray-600">To empower minds and hearts through reading. We believe books change people, and people change the world.</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">🌏 Our Vision</h3>
            <p className="text-sm text-gray-600">To become the most reader-centric platform that bridges authors, readers, and knowledge across cultures.</p>
          </div>
        </div>

        <div className="mt-10 text-sm text-gray-500">
          Last updated: June 2025
        </div>
      </div>
    </section>
  );
}
    