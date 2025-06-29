import { useState } from "react";
import { supabase } from "../supabase";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function ContactPage() {
  const role = localStorage.getItem("role");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("roleChanged"));
    navigate("/login");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const { error } = await supabase.from("contact_messages").insert([form]);

    if (error) {
      console.error("Gagal kirim pesan:", error);
      setStatus("Gagal mengirim pesan. Silakan coba lagi.");
    } else {
      setStatus("Pesan Anda telah berhasil dikirim!");
      setForm({ name: "", email: "", message: "" });
    }
    setLoading(false);
  };

  return (
    <div className="font-sans text-gray-800">
      <Navbar role={role} handleLogout={handleLogout} />

      <section className="py-16 px-6 md:px-20 bg-[#fff7f7]">
        <h1 className="text-4xl font-bold text-center text-red-700 mb-4">Contact Us</h1>
        <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
          We'd love to hear from you! Have a question or feedback? Let us know below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold text-red-700 mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><strong>📍 Address:</strong> Jl. Buku Cerdas No. 1, Jakarta</li>
              <li><strong>📞 Phone:</strong> +62 812 3456 7890</li>
              <li><strong>📧 Email:</strong> support@periplus.com</li>
              <li><strong>🕐 Hours:</strong> Mon - Fri, 09:00 - 18:00</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-red-200"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-red-200"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-red-200"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {status && <p className="text-sm text-green-600 mt-2">{status}</p>}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
