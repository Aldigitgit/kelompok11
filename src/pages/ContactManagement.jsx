import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Pencil, Trash2 } from "lucide-react";

export default function AdminContactManagement() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      alert("Gagal mengambil data.");
      console.error(error.message);
    } else {
      setMessages(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus pesan ini?")) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) alert("Gagal menghapus data.");
    else fetchMessages();
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("contact_messages")
      .update({ message: editingText })
      .eq("id", editingId);
    if (error) {
      alert("Gagal memperbarui pesan.");
    } else {
      setEditingId(null);
      setEditingText("");
      fetchMessages();
    }
  };

  const filteredMessages = messages.filter((msg) =>
    msg.name.toLowerCase().includes(search.toLowerCase()) ||
    msg.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-white min-h-screen font-sans">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Cari nama atau email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded-md border w-1/3 shadow-sm"
        />
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-500">Memuat pesan...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left bg-white rounded-xl shadow-md">
            <thead className="text-xs text-red-800 uppercase bg-red-200">
              <tr>
                <th className="px-6 py-3">Nama</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Tanggal</th>
                <th className="px-6 py-3">Pesan</th>
                <th className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    Tidak ada pesan masuk.
                  </td>
                </tr>
              ) : (
                filteredMessages.map((msg) => (
                  <tr key={msg.id} className="border-b hover:bg-red-50">
                    <td className="px-6 py-3">{msg.name}</td>
                    <td className="px-6 py-3">{msg.email}</td>
                    <td className="px-6 py-3">
                      {new Date(msg.created_at).toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-3">
                      {editingId === msg.id ? (
                        <div>
                          <textarea
                            className="w-full border rounded p-2 text-sm mb-2"
                            rows="3"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={handleUpdate}
                              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                            >
                              Simpan
                            </button>
                            <button
                              onClick={() => {
                                setEditingId(null);
                                setEditingText("");
                              }}
                              className="text-sm text-gray-600 underline"
                            >
                              Batal
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm line-clamp-3">{msg.message}</p>
                      )}
                    </td>
                    <td className="px-6 py-3 flex gap-3 items-start">
                      {editingId === msg.id ? null : (
                        <>
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => {
                              setEditingId(msg.id);
                              setEditingText(msg.message);
                            }}
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(msg.id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
  