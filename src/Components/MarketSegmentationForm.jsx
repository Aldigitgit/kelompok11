import { useState, useEffect } from 'react';

const MarketSegmentationForm = ({ addSegment, updateSegment, editing }) => {
  const [form, setForm] = useState({
    nama: '',
    umur: '',
    gender: '',
    lokasi: '',
    pendapatan: '',
    gaya_hidup: '',
    loyalitas: ''
  });

  useEffect(() => {
    if (editing) setForm(editing);
    else setForm({
      nama:'', umur:'', gender:'', lokasi:'', pendapatan:'', gaya_hidup:'', loyalitas:''
    });
  }, [editing]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.nama || !form.umur) return;
    editing ? updateSegment(form) : addSegment(form);
    setForm({ nama:'', umur:'', gender:'', lokasi:'', pendapatan:'', gaya_hidup:'', loyalitas:'' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="text" placeholder="Nama" value={form.nama}
        onChange={e => setForm({ ...form, nama: e.target.value })} className="w-full p-2 border rounded" />
      <input type="number" placeholder="Umur" value={form.umur}
        onChange={e => setForm({ ...form, umur: e.target.value })} className="w-full p-2 border rounded" />
      <select value={form.gender}
        onChange={e => setForm({ ...form, gender: e.target.value })} className="w-full p-2 border rounded">
        <option value="">Jenis Kelamin</option>
        <option value="L">Laki-laki</option>
        <option value="P">Perempuan</option>
      </select>
      <input type="text" placeholder="Lokasi" value={form.lokasi}
        onChange={e => setForm({ ...form, lokasi: e.target.value })} className="w-full p-2 border rounded" />
      <input type="number" placeholder="Pendapatan" value={form.pendapatan}
        onChange={e => setForm({ ...form, pendapatan: e.target.value })} className="w-full p-2 border rounded" />
      <input type="text" placeholder="Gaya Hidup" value={form.gaya_hidup}
        onChange={e => setForm({ ...form, gaya_hidup: e.target.value })} className="w-full p-2 border rounded" />
      <input type="text" placeholder="Loyalitas" value={form.loyalitas}
        onChange={e => setForm({ ...form, loyalitas: e.target.value })} className="w-full p-2 border rounded" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {editing ? 'Update' : 'Tambah'}
      </button>
    </form>
  );
};

export default MarketSegmentationForm;
