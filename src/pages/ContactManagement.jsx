import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const dummyContacts = Array(12).fill({
  nama: "Erlangga Assegaf",
  email: "segap@gmail.com",
  phone: "087873370703",
});

export default function ContactManagement() {
  return (
    <div className="p-6 bg-purple-100 min-h-screen font-sans">
      <h1 className="text-2xl font-bold text-purple-700 mb-4">Daftar Kontak</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left bg-white rounded-xl shadow-md">
          <thead className="text-xs text-purple-800 uppercase bg-purple-200">
            <tr>
              <th className="px-6 py-3">Nama</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {dummyContacts.map((contact, index) => (
              <tr key={index} className="border-b hover:bg-purple-50">
                <td className="px-6 py-3">{contact.nama}</td>
                <td className="px-6 py-3">{contact.email}</td>
                <td className="px-6 py-3">{contact.phone}</td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <button className="text-blue-500 hover:text-blue-700">
                      <Pencil size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
