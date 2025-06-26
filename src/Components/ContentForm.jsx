import { useState, useEffect } from 'react';

const ContentForm = ({ addContent, updateContent, editing }) => {
  const [form, setForm] = useState({
    nama:'', penulis:'', kategori:'', harga:'', cover:''
  });

  useEffect(() => {
    if (editing) setForm(editing);
    else setForm({ nama:'', penulis:'', kategori:'', harga:'', cover:'' });
  }, [editing]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.nama || !form.penulis || !form.kategori) return;
    editing ? updateContent(form) : addContent(form);
    setForm({ nama:'', penulis:'', kategori:'', harga:'', cover:'' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="text" placeholder="Nama" value={form.nama}
        onChange={e => setForm({ ...form, nama: e.target.value })} className="w-full p-2 border rounded" />
      <input type="text" placeholder="Penulis" value={form.penulis}
        onChange={e => setForm({ ...form, penulis: e.target.value })} className="w-full p-2 border rounded" />
      <input type="text" placeholder="Kategori" value={form.kategori}
        onChange={e => setForm({ ...form, kategori: e.target.value })} className="w-full p-2 border rounded" />
      <input type="number" placeholder="Harga" value={form.harga}
        onChange={e => setForm({ ...form, harga: e.target.value })} className="w-full p-2 border rounded" />
      <input type="text" placeholder="Cover URL" value={form.cover}
        onChange={e => setForm({ ...form, cover: e.target.value })} className="w-full p-2 border rounded" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {editing ? 'Update' : 'Tambah'}
      </button>
    </form>
  );
};

export default ContentForm;
