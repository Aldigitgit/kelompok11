  import { useState, useEffect } from 'react';

  const AccountForm = ({ addAccount, updateAccount, editingAccount }) => {
    const [form, setForm] = useState({ name: '', email: '', password: '', segmentasion: '' });

    useEffect(() => {
      if (editingAccount) setForm(editingAccount);
      else setForm({ name: '', email: '', password: '', segmentasion: '' });
    }, [editingAccount]);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!form.name || !form.email || !form.password || !form.segmentasion) return;

      editingAccount ? updateAccount(form) : addAccount(form);
      setForm({ name: '', email: '', password: '', segmentasion: '' });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Nama"
          className="w-full p-2 border rounded"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <select
          className="w-full p-2 border rounded"
          value={form.segmentasion}
          onChange={e => setForm({ ...form, segmentasion: e.target.value })}
        >
          <option value="">Pilih segmentasion</option>
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
          <option value="Bronze">Bronze</option>
        </select>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          {editingAccount ? 'Perbarui' : 'Tambah'}
        </button>
      </form>
    );
  };

  export default AccountForm;
