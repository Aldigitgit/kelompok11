import React, { useState } from "react";
import { Pencil, Trash, Plus } from "lucide-react";

const initialOrders = [
  { id: 1, buyer: "Aulia Rahma", book: "Atomic Habits", total: 120000, status: "Diproses" },
  { id: 2, buyer: "Bagas Saputra", book: "Sapiens", total: 150000, status: "Dikirim" },
];

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
}

export default function OrderManagementPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [form, setForm] = useState({ buyer: "", book: "", total: "", status: "Diproses" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const resetForm = () => {
    setForm({ buyer: "", book: "", total: "", status: "Diproses" });
    setEditId(null);
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setOrders((prev) =>
        prev.map((o) => (o.id === editId ? { ...form, id: editId, total: +form.total } : o))
      );
    } else {
      setOrders([...orders, { ...form, id: Date.now(), total: +form.total }]);
    }
    resetForm();
    setShowModal(false);
  };

  const handleEdit = (order) => {
    setForm(order);
    setEditId(order.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white to-blue-100 min-h-screen">
      <div className="mb-4 text-sm text-gray-400">
        Pages/ <span className="text-black font-semibold">Order Management</span>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-700">Daftar Pesanan</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" /> Tambah
        </button>
      </div>

      {/* Tabel Pesanan */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-200 text-left text-gray-700">
            <tr>
              <th className="px-6 py-3">PEMBELI</th>
              <th className="px-6 py-3">JUDUL BUKU</th>
              <th className="px-6 py-3">TOTAL</th>
              <th className="px-6 py-3">STATUS</th>
              <th className="px-6 py-3">AKSI</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-gray-100 hover:bg-blue-50">
                <td className="px-6 py-4">{order.buyer}</td>
                <td className="px-6 py-4">{order.book}</td>
                <td className="px-6 py-4">{formatRupiah(order.total)}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold ${
                      order.status === "Diproses"
                        ? "bg-yellow-200 text-yellow-800"
                        : order.status === "Dikirim"
                        ? "bg-blue-200 text-blue-800"
                        : order.status === "Selesai"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button onClick={() => handleEdit(order)} className="text-blue-600 hover:text-blue-800">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => handleDelete(order.id)} className="text-red-600 hover:text-red-800">
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Pesanan" : "Tambah Pesanan"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nama Pembeli"
                className="w-full p-3 border rounded-xl"
                value={form.buyer}
                onChange={(e) => setForm({ ...form, buyer: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Judul Buku"
                className="w-full p-3 border rounded-xl"
                value={form.book}
                onChange={(e) => setForm({ ...form, book: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Total Harga"
                className="w-full p-3 border rounded-xl"
                value={form.total}
                onChange={(e) => setForm({ ...form, total: e.target.value })}
                required
              />
              <select
                className="w-full p-3 border rounded-xl"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="Diproses">Diproses</option>
                <option value="Dikirim">Dikirim</option>
                <option value="Selesai">Selesai</option>
                <option value="Dibatalkan">Dibatalkan</option>
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 rounded-xl border"
                >
                  Batal
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
