import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Pencil, Trash2 } from 'lucide-react';

export default function AccountManagement() {
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    wilayah: '',
    foto_profil: '',
    role: '',
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const { data, error } = await supabase
      .from('account')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setAccounts(data);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert('Nama dan email wajib diisi!');
      return;
    }

    let error;
    if (editingAccount) {
      ({ error } = await supabase.from('account').update(form).eq('id', editingAccount.id));
    } else {
      ({ error } = await supabase.from('account').insert([form]));
    }

    if (error) {
      alert('Gagal menyimpan data: ' + error.message);
    } else {
      fetchAccounts();
      setForm({
        name: '',
        email: '',
        password: '',
        wilayah: '',
        foto_profil: '',
        role: '',
      });
      setEditingAccount(null);
      setShowForm(false);
    }
  };

  const handleEdit = (item) => {
    const { segmentasi, ...formData } = item; // exclude segmentasi
    setForm(formData);
    setEditingAccount(item);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Hapus akun ini?')) {
      const { error } = await supabase.from('account').delete().eq('id', id);
      if (error) alert('Gagal hapus: ' + error.message);
      else fetchAccounts();
    }
  };

  const filteredAccounts = accounts.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const getBadgeClass = (value) => {
    switch (value?.toLowerCase()) {
      case 'admin':
        return 'bg-blue-100 text-blue-700 border border-blue-300';
      case 'user':
        return 'bg-green-100 text-green-700 border border-green-300';
      default:
        return 'bg-gray-200 text-gray-700 border border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-red-700 mb-8 text-center">
          📋 Manajemen Akun Pengguna
        </h1>

        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="🔍 Cari pengguna..."
            className="p-3 border rounded w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => {
              setShowForm(!showForm);
              if (!showForm) {
                setForm({
                  name: '',
                  email: '',
                  password: '',
                  wilayah: '',
                  foto_profil: '',
                  role: '',
                });
                setEditingAccount(null);
              }
            }}
            className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 font-semibold transition"
          >
            {showForm ? 'Batal' : '➕ Tambah'}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md mb-8 border space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                placeholder="Nama"
                value={form.name}
                onChange={handleChange}
                className="p-3 border rounded"
              />
              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="p-3 border rounded"
              />
              <input
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="p-3 border rounded"
              />
              <input
                name="wilayah"
                placeholder="Wilayah"
                value={form.wilayah}
                onChange={handleChange}
                className="p-3 border rounded"
              />
              <input
                name="foto_profil"
                placeholder="URL Foto Profil"
                value={form.foto_profil}
                onChange={handleChange}
                className="p-3 border rounded"
              />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="p-3 border rounded"
              >
                <option value="">Pilih Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 font-semibold"
            >
              {editingAccount ? '🔄 Perbarui' : '💾 Simpan'}
            </button>
          </form>
        )}

        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
          <table className="min-w-full text-sm table-auto">
            <thead className="bg-red-200 text-red-800 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Nama</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Wilayah</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Foto</th>
                <th className="px-4 py-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {filteredAccounts.map((item) => (
                <tr key={item.id} className="border-b hover:bg-red-50 transition">
                  <td className="px-4 py-2 font-medium">{item.name}</td>
                  <td className="px-4 py-2">{item.email}</td>
                  <td className="px-4 py-2">{item.wilayah}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${getBadgeClass(item.role)}`}
                    >
                      {item.role || '-'}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {item.foto_profil ? (
                      <img
                        src={item.foto_profil}
                        alt="Foto"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400">Tidak ada</span>
                    )}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredAccounts.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    😕 Tidak ada data akun
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
