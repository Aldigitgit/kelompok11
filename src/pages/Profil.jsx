import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    wilayah: "",
    foto_profil: "",
  });
  const [message, setMessage] = useState("");
  const accountId = localStorage.getItem("account_id");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!accountId) return;
      const { data, error } = await supabase
        .from("account")
        .select("name, email, wilayah, foto_profil, created_at")
        .eq("id", accountId)
        .single();

      if (error) {
        console.error("Gagal memuat profil:", error);
      } else {
        setUserData(data);
        setForm({
          name: data.name,
          email: data.email,
          wilayah: data.wilayah || "",
          foto_profil: data.foto_profil || "",
        });
      }
    };

    fetchProfile();
  }, [accountId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("account")
      .update({
        name: form.name,
        email: form.email,
        wilayah: form.wilayah,
        foto_profil: form.foto_profil,
      })
      .eq("id", accountId);

    if (error) {
      console.error("Gagal memperbarui profil:", error);
      setMessage("❌ Gagal memperbarui profil.");
    } else {
      setMessage("✅ Profil berhasil diperbarui.");
    }
  };

  if (!userData) {
    return (
      <div className="p-6 text-center text-gray-500">
        Memuat data profil...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-red-700">Profil Saya</h1>
      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        {/* Foto Profil */}
        <div className="flex items-center space-x-4">
          <img
            src={form.foto_profil || "https://via.placeholder.com/100"}
            alt="Foto Profil"
            className="w-24 h-24 rounded-full object-cover border-2 border-red-500"
          />
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">
              URL Foto Profil
            </label>
            <input
              type="text"
              name="foto_profil"
              value={form.foto_profil}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md text-sm"
              placeholder="https://..."
            />
          </div>
        </div>

        {/* Nama */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Nama</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md text-sm"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md text-sm"
          />
        </div>

        {/* Wilayah */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Wilayah</label>
          <input
            type="text"
            name="wilayah"
            value={form.wilayah}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md text-sm"
          />
        </div>

        {/* Tanggal dibuat */}
        <p className="text-sm text-gray-400">
          Akun dibuat pada:{" "}
          {new Date(userData.created_at).toLocaleDateString("id-ID")}
        </p>

        {/* Button Update */}
        <div className="flex justify-between items-center">
          {message && (
            <p
              className={`text-sm ${
                message.includes("berhasil") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
          <button
            onClick={handleUpdate}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
