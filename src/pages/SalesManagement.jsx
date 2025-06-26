import { useEffect, useState } from "react";
import { supabase } from "../supabase.js";

function formatCurrency(num) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num);
}

export default function SalesManagement() {
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSale, setEditingSale] = useState(null);
  const [formData, setFormData] = useState({
    invoice: "",
    pelanggan: "",
    tanggal: "",
    total: "",
    status: "Belum Lunas",
  });

  const fetchSales = async () => {
    const { data, error } = await supabase.from("sales").select("*").order("created_at", { ascending: false });
    if (error) console.error(error);
    else setSales(data);
  };

  const fetchCustomers = async () => {
    const { data, error } = await supabase.from("customer").select("*");
    if (error) console.error(error);
    else setCustomers(data);
  };

  useEffect(() => {
    fetchSales();
    fetchCustomers();
  }, []);

  const getCustomerName = (id) => {
    const cust = customers.find((c) => c.id === id);
    return cust ? cust.nama : "-";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.invoice || !formData.pelanggan || !formData.tanggal || !formData.total) {
      alert("Semua field wajib diisi!");
      return;
    }

    const payload = {
      invoice: formData.invoice,
      pelanggan: Number(formData.pelanggan),
      tanggal: formData.tanggal,
      total: Number(formData.total),
      status: formData.status,
    };

    if (editingSale) {
      const { error } = await supabase.from("sales").update(payload).eq("id", editingSale.id);
      if (error) return console.error(error);
    } else {
      const { error } = await supabase.from("sales").insert(payload);
      if (error) return console.error(error);
    }

    setFormData({ invoice: "", pelanggan: "", tanggal: "", total: "", status: "Belum Lunas" });
    setShowForm(false);
    setEditingSale(null);
    fetchSales();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus penjualan ini?")) {
      const { error } = await supabase.from("sales").delete().eq("id", id);
      if (error) console.error(error);
      else fetchSales();
    }
  };

  const handleEdit = (sale) => {
    setEditingSale(sale);
    setFormData({
      invoice: sale.invoice,
      pelanggan: sale.pelanggan,
      tanggal: sale.tanggal,
      total: sale.total,
      status: sale.status,
    });
    setShowForm(true);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Management Penjualan</h1>

      <button
        onClick={() => {
          setShowForm((prev) => !prev);
          if (!showForm) setEditingSale(null);
        }}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        {showForm ? "Batal Tambah/Edit" : "Tambah Penjualan"}
      </button>

      {showForm && (
        <div className="mb-6 p-4 border border-gray-300 rounded shadow-sm bg-white">
          <div className="mb-2">
            <label className="block font-medium mb-1">Nomor Invoice</label>
            <input
              type="text"
              name="invoice"
              value={formData.invoice}
              onChange={handleInputChange}
              placeholder="Misal: INV-003"
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-2">
            <label className="block font-medium mb-1">Pelanggan</label>
            <select
              name="pelanggan"
              value={formData.pelanggan}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">-- Pilih Pelanggan --</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nama}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label className="block font-medium mb-1">Tanggal</label>
            <input
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-2">
            <label className="block font-medium mb-1">Total (Rp)</label>
            <input
              type="number"
              name="total"
              value={formData.total}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="Belum Lunas">Belum Lunas</option>
              <option value="Lunas">Lunas</option>
              <option value="Batal">Batal</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            {editingSale ? "Perbarui" : "Simpan"}
          </button>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pelanggan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sales.map((sale) => (
              <tr key={sale.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{sale.invoice}</td>
                <td className="px-6 py-4">{getCustomerName(sale.pelanggan)}</td>
                <td className="px-6 py-4">{sale.tanggal}</td>
                <td className="px-6 py-4 text-right">{formatCurrency(sale.total)}</td>
                <td className="px-6 py-4 text-center">
                  {sale.status === "Lunas" ? (
                    <span className="inline-flex px-2 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Lunas
                    </span>
                  ) : sale.status === "Belum Lunas" ? (
                    <span className="inline-flex px-2 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Belum Lunas
                    </span>
                  ) : (
                    <span className="inline-flex px-2 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                      Batal
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(sale)}
                    className="text-indigo-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(sale.id)}
                    className="text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {sales.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  Tidak ada data penjualan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
