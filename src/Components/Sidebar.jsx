import {
  LayoutDashboard, Users, ShoppingCart, Box, BarChart2, PieChart,
  MessageCircleQuestion, Mail, List, ClipboardList, Settings
} from 'lucide-react';
import { FaUserTie } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
  { name: 'Karyawan', icon: <FaUserTie size={18} />, path: '/dashboard/employee' },
  { name: 'Customer Management', icon: <Users size={20} />, path: '/dashboard/pelanggan' },
  { name: 'Produk', icon: <Box size={20} />, path: '/dashboard/produk' },
  { name: 'FAQ', icon: <MessageCircleQuestion size={20} />, path: '/dashboard/faq' },
  { name: 'Kontak', icon: <Mail size={20} />, path: '/dashboard/kontak' },
  { name: 'Campaign Analytics', icon: <PieChart size={20} />, path: '/dashboard/campaign-analytics' },
  { name: 'Market Segmentation', icon: <BarChart2 size={20} />, path: '/dashboard/market-segmentation' },
  { name: 'List Account', icon: <List size={20} />, path: '/dashboard/ListAccount' },
  { name: 'Order Management', icon: <ClipboardList size={20} />, path: '/dashboard/OrderManagement' },
];

const accountItems = [
  // { name: 'Pengaturan Akun', icon: <Settings size={20} />, path: '/dashboard/accountmanagement' },
];

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

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

        {/* Menu Utama */}
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

      {/* Bagian Akun */}
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
  );
};

export default Sidebar;
