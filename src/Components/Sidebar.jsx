import {
  LayoutDashboard, Users, ShoppingCart, Box, BarChart2, Settings,
  LogIn, MessageCircleQuestion, UserPlus, Mail, PieChart
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const menuItems = [
  { name: 'Dashboard', icon: <LayoutDashboard />, path: '/dashboard' },
  // { name: 'Sales Management', icon: <ShoppingCart />, path: '/dashboard/penjualan' },
  // { name: 'Customer Management', icon: <Users />, path: '/dashboard/pelanggan' },
  { name: 'Produk', icon: <Box />, path: '/dashboard/produk' },
  { name: 'FAQ', icon: <MessageCircleQuestion />, path: '/dashboard/faq' },
  { name: 'Kontak', icon: <Mail />, path: '/dashboard/kontak' },
  { name: 'Campaign Analytics', icon: <PieChart />, path: '/dashboard/campaign-analytics' },
  { name: 'Market Segmentation', icon: <BarChart2 />, path: '/dashboard/market-segmentation' },
  { name: 'List Account', icon: <BarChart2 />, path: '/dashboard/ListAccount' },
  { name: 'OrderManagement', icon: <BarChart2 />, path: '/dashboard/OrderManagement' },
]

const accountItems = [
  // { name: 'Pengaturan Akun', icon: <Settings />, path: '/dashboard/accountmanagement' },
]

const Sidebar = () => {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <aside className="bg-white w-64 min-h-screen shadow-md border-r px-6 py-6 fixed hidden md:flex flex-col justify-between text-red-700">
      {/* Logo */}
      <div>
        <div className="mb-10 flex justify-center">
          <Link to="/">
            <img
              src="/logoPeriplus.png"
              alt="PeriPlus Logo"
              className="h-16 w-auto object-contain transition hover:scale-105"
            />
          </Link>
        </div>

        {/* Main Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                isActive(item.path)
                  ? 'bg-red-100 text-red-700 font-semibold shadow-inner'
                  : 'hover:bg-red-50 hover:text-red-600'
              }`}
            >
              <span className="w-5 h-5">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Account Section */}
      <div>
        <nav className="space-y-1">
          {accountItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive(item.path)
                  ? 'bg-red-100 text-red-700 font-semibold shadow-inner'
                  : 'hover:bg-red-50 hover:text-red-600'
              }`}
            >
              <span className="w-5 h-5">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
