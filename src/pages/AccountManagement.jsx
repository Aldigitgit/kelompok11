import React from 'react';
import { Pencil, Trash, Plus } from 'lucide-react';

const users = [
  {
    id: 1,
    name: 'Andi Wijaya',
    email: 'andi.wijaya@example.com',
    password: '$1$4H4Jtrx.\n$5xa7SwdfEbN7UHYycstClP0',
    segmentation: 'Golden Clover',
  },
  {
    id: 2,
    name: 'Rina Kartika',
    email: 'rina.kartika@example.com',
    password: '$1$aS4jDf7.\n$Pq3zWvdfEbN7UHYzcstAb1',
    segmentation: 'Silver Spine',
  },
  {
    id: 3,
    name: 'Dimas Pratama',
    email: 'dimas.pratama@example.com',
    password: '$1$8jK2Hs4.\n$Kx7yCvdfFbN7UHYzcstDe9',
    segmentation: 'Bronze Leaf',
  },
  {
    id: 4,
    name: 'Siti Aminah',
    email: 'siti.aminah@example.com',
    password: '$1$qWe3Rty.\n$Ax8yCvdfEbN7UHYzcstKl3',
    segmentation: 'Golden Clover',
  },
  {
    id: 5,
    name: 'Budi Hartono',
    email: 'budi.hartono@example.com',
    password: '$1$tYu6Lp9.\n$Zx5yQwdfFbN7UHYzcstPo7',
    segmentation: 'Silver Spine',
  },
  {
    id: 6,
    name: 'Nina Sari',
    email: 'nina.sari@example.com',
    password: '$1$kLp8Mz1.\n$Rx1aDvdfFbN7UHYzcstGy4',
    segmentation: 'Bronze Leaf',
  },
  {
    id: 7,
    name: 'Rizky Ramadhan',
    email: 'rizky.ramadhan@example.com',
    password: '$1$eLk4Sd2.\n$Fx9uTvdfFbN7UHYzcstUy6',
    segmentation: 'Golden Clover',
  },
  {
    id: 8,
    name: 'Mega Lestari',
    email: 'mega.lestari@example.com',
    password: '$1$nJp3Hv6.\n$Wx4rOvdfFbN7UHYzcstQa3',
    segmentation: 'Silver Spine',
  },
  {
    id: 9,
    name: 'Fajar Nugroho',
    email: 'fajar.nugroho@example.com',
    password: '$1$sKv8Tf2.\n$Lx0tVvdfFbN7UHYzcstLi9',
    segmentation: 'Bronze Leaf',
  },
  {
    id: 10,
    name: 'Yuni Astuti',
    email: 'yuni.astuti@example.com',
    password: '$1$cVo7Xm3.\n$Px7eVvdfFbN7UHYzcstGo5',
    segmentation: 'Golden Clover',
  },
  {
    id: 11,
    name: 'Agus Salim',
    email: 'agus.salim@example.com',
    password: '$1$gUt2Af1.\n$Qx9yUvdfFbN7UHYzcstTr2',
    segmentation: 'Bronze Leaf',
  },
  {
    id: 12,
    name: 'Dewi Anggraini',
    email: 'dewi.anggraini@example.com',
    password: '$1$xYa3Uf4.\n$Yx3vCvdfFbN7UHYzcstWi7',
    segmentation: 'Silver Spine',
  },
];

export default function AccountManagementPage() {
  return (
    <div className="p-6 bg-gradient-to-br from-white to-red-100 min-h-screen">
      <div className="mb-4 text-sm text-gray-400">Pages/ <span className="text-black font-semibold">Account Management</span></div>
      <div className="flex justify-between items-center mb-4">
        <input type="text" placeholder="Type here..." className="px-4 py-2 rounded-xl border border-gray-300 w-1/3" />
        <button className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl">
          <Plus className="w-4 h-4 mr-2" />Tambah
        </button>
      </div>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-red-200 text-left text-gray-700">
            <tr>
              <th className="px-6 py-3">NAMA</th>
              <th className="px-6 py-3">EMAIL</th>
              <th className="px-6 py-3">PASSWORD</th>
              <th className="px-6 py-3">SEGMENTATION</th>
              <th className="px-6 py-3">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-100 hover:bg-red-50">
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-pre-wrap">{user.password}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.segmentation}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button className="text-red-600 hover:text-red-800">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center p-4">
          <div className="space-x-2 text-sm">
            {[1, 2, 3, 4, 5, '...', 20].map((num, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded-full ${num === 1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-red-400`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
