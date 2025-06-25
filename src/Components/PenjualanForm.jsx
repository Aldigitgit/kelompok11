import { useState, useEffect } from 'react';

const PenjualanForm = ({ addPenjualan, updatePenjualan, editing }) => {
  const [form, setForm] = useState({ id_invoice:'', nama_pelanggan:'', tanggal:'', status:'' });

  useEffect(() => {
    if (editing) setForm(editing);
    else setForm({ id_invoice:'', nama_pelanggan:'', tanggal:'', status:'' });
  }, [editing]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.id_invoice || !form.nama_pelanggan || !form.tanggal) return;
    editing ? updatePenjualan(form) : addPenjualan(form);
    setForm({ id_invoice:'', nama_pelanggan:'', tanggal:'', status:'' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="text" placeholder="Invoice ID" value={form.id_invoice}
        onChange={e => setForm({ ...form, id_invoice: e.target.value })} className="w-full p-2 border rounded" />
      <input type="text" placeholder="Nama Pelanggan" value={form.nama_pelanggan}
        onChange={e => setForm({ ...form, nama_pelanggan: e.target.value })} className="w-full p-2 border rounded" />
      <input type="date" value={form.tanggal}
        onChange={e => setForm({ ...form, tanggal: e.target.value })} className="w-full p-2 border rounded" />
      <select value={form.status}
        onChange={e => setForm({ ...form, status: e.target.value })} className="w-full p-2 border rounded">
        <option value="">Pilih Status</option>
        <option value="baru">Baru</option>
        <option value="selesai">Selesai</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {editing ? 'Update' : 'Tambah'}
      </button>
    </form>
  );
};

export default PenjualanForm;
