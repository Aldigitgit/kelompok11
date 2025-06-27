import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase"; // pastikan path ini benar

export default function Footer() {
  const [question, setQuestion] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question.trim() === "") return;

    const { error } = await supabase.from("faqs").insert([
      { question: question.trim(), answer: "", category: "Publik", status: "Belum Dijawab" }
    ]);

    if (!error) {
      setSuccess(true);
      setQuestion("");
      setTimeout(() => setSuccess(false), 3000);
    } else {
      alert("❌ Gagal kirim pertanyaan: " + error.message);
    }
  };

  return (
    <footer className="bg-gray-100 py-10 px-6 mt-10">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 className="font-semibold mb-2">Bacaku</h4>
          <p className="text-gray-600">Discover books that ignite your imagination</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Learn More</h4>
          <ul className="space-y-1 text-gray-600">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/faqUser">FAQ</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Community</h4>
          <ul className="space-y-1 text-gray-600">
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/forum">Forum</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact Us</h4>
          <ul className="space-y-1 text-gray-600">
            <li><Link to="/help-center">Help Center</Link></li>
            <li><Link to="/live-chat">Live Chat</Link></li>
            <li><a href="mailto:support@bacaku.com">support@bacaku.com</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-12 border-t pt-8">
        <h4 className="text-center text-lg font-semibold text-gray-700 mb-4">
          Ada pertanyaan? Kirimkan ke kami 👇
        </h4>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center gap-3 px-4"
        >
          <input
            type="text"
            placeholder="Tulis pertanyaanmu..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 text-gray-700"
            required
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
          >
            Kirim
          </button>
        </form>
        {success && (
          <p className="text-center text-green-600 mt-3 text-sm">
            ✅ Pertanyaanmu telah dikirim!
          </p>
        )}
      </div>

      <div className="text-center mt-8 text-xs text-gray-500">
        © 2025 Bacaku. All rights reserved.
      </div>
    </footer>
  );
}
