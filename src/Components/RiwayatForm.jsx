import { useState, useEffect } from 'react';

const RiwayatForm = ({ addRiwayat, updateRiwayat, editing }) => {
  const [form, setForm] = useState({
    tanggal:'', produk:'', jumlah:'', harga:'', total:'', status:''
  });

  useEffect(() => {
    if (editing) setForm(editing);
    else setForm({ tanggal:'', produk:'', jumlah:'', harga:'', total:'', status:'' });
  }, [editing]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.tanggal || !form.produk || !form.jumlah) return;
    editing ? updateRiwayat(form) : addRiwayat(form);
    setForm({ tanggal:'', produk:'', jumlah:'', harga:'', total:'', status:'' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="date" value={form.tanggal}
        onChange={e => setForm({ ...form, tanggal: e.target.value })} className="w-full p-2 border rounded" />
      <input type="text" placeholder="Produk" value={form.produk}
        onChange={e => setForm({ ...form, produk: e.target.value })} className="w-full p-2 border rounded" />
      <input type="number" placeholder="Jumlah" value={form.jumlah}
        onChange={e => setForm({ ...form, jumlah: e.target.value })} className="w-full p-2 border rounded" />
      <input type="number" placeholder="Harga Satuan" value={form.harga}
        onChange={e => setForm({ ...form, harga: e.target.value })} className="w-full p-2 border rounded" />
      <input type="number" placeholder="Total" value={form.total}
        onChange={e => setForm({ ...form, total: e.target.value })} className="w-full p-2 border rounded" />
      <select value={form.status}
        onChange={e => setForm({ ...form, status: e.target.value })} className="w-full p-2 border rounded">
        <option value="">Pilih Status</option>
        <option value="pending">Pending</option>
        <option value="done">Done</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {editing ? 'Update' : 'Tambah'}
      </button>
    </form>
  );
};

export default RiwayatForm;
