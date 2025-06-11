import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Box,
  BarChart2,
  Settings,
  LogIn,
  MessageCircleQuestion,
  UserPlus,
  ClipboardList,
  PackageCheck,
} from 'lucide-react'

import { Link, useLocation } from 'react-router-dom'

const menuItems = [
  { name: 'Dashboard', icon: <LayoutDashboard />, path: '/' },
  { name: 'Penjualan', icon: <ShoppingCart />, path: '/penjualan' },
  { name: 'Pelanggan', icon: <Users />, path: '/pelanggan' },
  { name: 'Riwayat Pembelian', icon: <ClipboardList />, path: '/riwayat' },
  { name: 'Review Pembelian', icon: <PackageCheck />, path: '/review' },
  { name: 'Produk', icon: <Box />, path: '/produk' },
  { name: 'Jadwal Posting', icon: <ClipboardList />, path: '/penjadwalan' },
  { name: 'Integrasi Stok', icon: <Box />, path: '/integrasi-stok' },
  { name: 'FAQ', icon: <MessageCircleQuestion />, path: '/faq' },
  { name: 'Tracking Order', icon: <ShoppingCart />, path: '/tracking' },
  { name: 'Contact', icon: <ShoppingCart />, path: '/kontak' },
]

const accountItems = [
  { name: 'Pengaturan Akun', icon: <Settings />, path: '/akun' },
  { name: 'Sign In', icon: <LogIn />, path: '/signin' },
  { name: 'Sign Up', icon: <UserPlus />, path: '/signup' },
]

const Sidebar = () => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <aside className="bg-white w-64 h-screen shadow-lg px-4 py-6 hidden md:block">
      <div className="text-xl font-bold mb-8 text-purple-700">
        UMKM CRM
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-100 transition ${
              isActive(item.path)
                ? 'bg-purple-200 text-purple-800 font-semibold'
                : 'text-gray-700'
            }`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-8 text-xs font-semibold text-gray-500">AKUN</div>
      <nav className="mt-2 space-y-1">
        {accountItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-100 transition ${
              isActive(item.path)
                ? 'bg-purple-200 text-purple-800 font-semibold'
                : 'text-gray-700'
            }`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
