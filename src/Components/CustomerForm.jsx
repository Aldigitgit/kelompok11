import { useState, useEffect } from 'react';

const CustomerForm = ({ addCustomer, updateCustomer, editing }) => {
  const [form, setForm] = useState({
    nama: '',
    email: '',
    telepon: '',
    status: ''
  });

  useEffect(() => {
    if (editing) setForm(editing);
    else setForm({ nama: '', email: '', telepon: '', status: '' });
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nama || !form.email || !form.telepon || !form.status) return;

    editing ? updateCustomer(form) : addCustomer(form);
    setForm({ nama: '', email: '', telepon: '', status: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Nama"
        className="w-full p-2 border rounded"
        value={form.nama}
        onChange={e => setForm({ ...form, nama: e.target.value })}
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

export default CustomerForm;
