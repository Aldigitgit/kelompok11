import { useEffect, useState } from 'react';
import { Pencil, Trash, Plus } from 'lucide-react';
import { supabase } from '../supabase';

export default function AccountManagementPage() {
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState('');
  const [editingAccount, setEditingAccount] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    wilayah: '',
    foto_profil: '',
    role: '',
  });
  const [showForm, setShowForm] = useState(false);

  const fetchAccounts = async () => {
    const { data, error } = await supabase
      .from('account')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      alert('Gagal mengambil data: ' + error.message);
      console.error(error);
    } else {
      setAccounts(data);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const filteredAccounts = accounts.filter(acc =>
    acc.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async () => {
    const { name, email, password, wilayah, foto_profil, role } = form;
    if (!name || !email || !password || !wilayah || !foto_profil || !role) {
      return alert('Semua field wajib diisi.');
    }

    if (editingAccount) {
      const { error } = await supabase
        .from('account')
        .update(form)
        .eq('id', editingAccount.id);
      if (error) return alert('Gagal update data.');
    } else {
      const { error } = await supabase.from('account').insert([form]);
      if (error) return alert('Gagal tambah data.');
    }

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
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus akun ini?')) return;
    const { error } = await supabase.from('account').delete().eq('id', id);
    if (error) return alert('Gagal hapus data.');
    fetchAccounts();
  };

  const handleEdit = (acc) => {
    setForm(acc);
    setEditingAccount(acc);
    setShowForm(true);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white to-red-100 min-h-screen font-sans">
  
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Cari nama..."
          className="px-4 py-2 rounded-xl border border-gray-300 w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingAccount(null);
            setForm({
              name: '',
              email: '',
              password: '',
              wilayah: '',
              foto_profil: '',
              role: '',
            });
          }}
          className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
        >
          <Plus className="w-4 h-4 mr-2" /> {showForm ? 'Batal' : 'Tambah'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nama"
              className="p-2 border rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="p-2 border rounded"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Password"
              className="p-2 border rounded"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <input
              type="text"
              placeholder="Wilayah"
              className="p-2 border rounded"
              value={form.wilayah}
              onChange={(e) => setForm({ ...form, wilayah: e.target.value })}
            />
            <input
              type="text"
              placeholder="Foto Profil (URL)"
              className="p-2 border rounded"
              value={form.foto_profil}
              onChange={(e) => setForm({ ...form, foto_profil: e.target.value })}
            />
            <input
              type="text"
              placeholder="Role (admin/user)"
              className="p-2 border rounded"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {editingAccount ? 'Perbarui' : 'Simpan'}
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-red-200 text-left text-gray-700">
            <tr>
              <th className="px-6 py-3">NAMA</th>
              <th className="px-6 py-3">EMAIL</th>
              <th className="px-6 py-3">WILAYAH</th>
              <th className="px-6 py-3">FOTO</th>
              <th className="px-6 py-3">ROLE</th>
              <th className="px-6 py-3">AKSI</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((acc) => (
              <tr key={acc.id} className="border-t border-gray-100 hover:bg-red-50">
                <td className="px-6 py-4 whitespace-nowrap">{acc.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{acc.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{acc.wilayah}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {acc.foto_profil ? (
                    <img src={acc.foto_profil} alt="foto" className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <span className="text-gray-400 italic">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">{acc.role}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button className="text-red-600 hover:text-red-800" onClick={() => handleEdit(acc)}>
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(acc.id)}>
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredAccounts.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  Tidak ada akun ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
