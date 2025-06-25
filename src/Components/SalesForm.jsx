import { useState, useEffect } from 'react';

const SalesForm = ({ addSales, updateSales, editing }) => {
  const [form, setForm] = useState({
    invoice: '',
    pelanggan: '',
    tanggal: '',
    total: '',
    status: ''
  });

  useEffect(() => {
    if (editing) setForm(editing);
    else setForm({ invoice: '', pelanggan: '', tanggal: '', total: '', status: '' });
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.invoice || !form.pelanggan || !form.tanggal || !form.total || !form.status) return;

    editing ? updateSales(form) : addSales(form);
    setForm({ invoice: '', pelanggan: '', tanggal: '', total: '', status: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Invoice"
        className="w-full p-2 border rounded"
        value={form.invoice}
        onChange={e => setForm({ ...form, invoice: e.target.value })}
      />
      <input
        type="text"
        placeholder="Nama Pelanggan"
        className="w-full p-2 border rounded"
        value={form.pelanggan}
        onChange={e => setForm({ ...form, pelanggan: e.target.value })}
      />
      <input
        type="date"
        className="w-full p-2 border rounded"
        value={form.tanggal}
        onChange={e => setForm({ ...form, tanggal: e.target.value })}
      />
      <input
        type="number"
        placeholder="Total"
        className="w-full p-2 border rounded"
        value={form.total}
        onChange={e => setForm({ ...form, total: e.target.value })}
      />
      <select
        className="w-full p-2 border rounded"
        value={form.status}
        onChange={e => setForm({ ...form, status: e.target.value })}
      >
        <option value="">Pilih Status</option>
        <option value="pending">Pending</option>
        <option value="selesai">Selesai</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {editing ? 'Update' : 'Tambah'}
      </button>
    </form>
  );
};

export default SalesForm;
