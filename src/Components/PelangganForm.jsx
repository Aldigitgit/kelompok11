import { useState, useEffect } from 'react';

const PelangganForm = ({ addPelanggan, updatePelanggan, editing }) => {
  const [form, setForm] = useState({
    nama_pelanggan: '',
    email: '',
    telepon: '',
    status: ''
  });

  useEffect(() => {
    if (editing) {
      setForm(editing);
    } else {
      setForm({ nama_pelanggan: '', email: '', telepon: '', status: '' });
    }
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nama_pelanggan || !form.email || !form.telepon || !form.status) return;

    editing ? updatePelanggan(form) : addPelanggan(form);
    setForm({ nama_pelanggan: '', email: '', telepon: '', status: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Nama Pelanggan"
        className="w-full p-2 border rounded"
        value={form.nama_pelanggan}
        onChange={e => setForm({ ...form, nama_pelanggan: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Telepon"
        className="w-full p-2 border rounded"
        value={form.telepon}
        onChange={e => setForm({ ...form, telepon: e.target.value })}
      />
      <select
        className="w-full p-2 border rounded"
        value={form.status}
        onChange={e => setForm({ ...form, status: e.target.value })}
      >
        <option value="">Pilih Status</option>
        <option value="aktif">Aktif</option>
        <option value="nonaktif">Nonaktif</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {editing ? 'Update' : 'Tambah'}
      </button>
    </form>
  );
};

export default PelangganForm;
