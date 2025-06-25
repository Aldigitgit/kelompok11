import React, { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { supabase } from '../supabase.js';

export default function ContactManagement() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ nama: '', email: '', phone: '' });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchContacts = async () => {
    const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
    if (error) console.error(error);
    else setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.nama || !formData.email || !formData.phone) {
      alert('Semua field wajib diisi');
      return;
    }

    if (editingId) {
      const { error } = await supabase.from('contacts').update(formData).eq('id', editingId);
      if (error) console.error(error);
    } else {
      const { error } = await supabase.from('contacts').insert(formData);
      if (error) console.error(error);
    }

    setFormData({ nama: '', email: '', phone: '' });
    setEditingId(null);
    setShowForm(false);
    fetchContacts();
  };

  const handleEdit = (contact) => {
    setFormData(contact);
    setEditingId(contact.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus kontak ini?')) {
      const { error } = await supabase.from('contacts').delete().eq('id', id);
      if (error) console.error(error);
      else fetchContacts();
    }
  };

  return (
    <div className="p-6 bg-red-100 min-h-screen font-sans">
      <h1 className="text-2xl font-bold text-red-700 mb-6">Daftar Kontak</h1>

      <button
        onClick={() => {
          setShowForm(prev => !prev);
          if (!showForm) {
            setEditingId(null);
            setFormData({ nama: '', email: '', phone: '' });
          }
        }}
        className="mb-4 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
      >
        {showForm ? 'Batal' : 'Tambah Kontak'}
      </button>

      {showForm && (
        <div className="mb-6 bg-white border border-red-200 p-4 rounded shadow">
          <div className="grid grid-cols-1 gap-4 mb-3">
            <input
              type="text"
              name="nama"
              placeholder="Nama"
              value={formData.nama}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            />
            <input
              type="text"
              name="phone"
              placeholder="Telepon"
              value={formData.phone}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {editingId ? 'Perbarui' : 'Simpan'}
          </button>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-red-800 uppercase bg-red-200">
            <tr>
              <th className="px-6 py-3">Nama</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {contacts.map((contact) => (
              <tr key={contact.id} className="border-b hover:bg-red-50">
                <td className="px-6 py-3">{contact.nama}</td>
                <td className="px-6 py-3">{contact.email}</td>
                <td className="px-6 py-3">{contact.phone}</td>
                <td className="px-6 py-3 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(contact)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  Tidak ada data kontak
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
