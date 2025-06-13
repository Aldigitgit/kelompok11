// App.jsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from "./components/MainLayout";

// Pages
import Dashboard from './pages/Dashboard.jsx';
import SalesManagement from './pages/SalesManagement.jsx';
import CustomerManagement from './pages/CustomerManagement.jsx';
import RiwayatPembelian from './pages/Riwayatpembelian.jsx';
import ReviewPage from './pages/ReviewPage.jsx';
import FaQManagement from './pages/FaQManagement.jsx';
import TrackingManagement from './pages/TrackingManagement.jsx';
import PromoScheduler from './pages/PenjadwalPromo.jsx';
import PromoSchedulerWithNotification from './pages/PromoScheduler.jsx';
import ProductPage from './pages/Produk.jsx';
import Penjadwalan from './pages/Penjadwalan.jsx';
import AuthPage from './pages/AuthPage.jsx';
import AccountManagementPage from './pages/AccountManagement.jsx';
import BookDetailPage from './pages/BookDetailPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import OrderManagementPage from './pages/OrderManagement.jsx';
import ContactManagement from './pages/ContactManagement.jsx';

function App() {
  return (
    <Routes>
      {/* Halaman di luar layout utama */}
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Halaman dengan layout utama */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="penjualan" element={<SalesManagement />} />
        <Route path="pelanggan" element={<CustomerManagement />} />
        <Route path="riwayat" element={<RiwayatPembelian />} />
        <Route path="review" element={<ReviewPage />} />
        <Route path="faq" element={<FaQManagement />} />
        <Route path="tracking" element={<TrackingManagement />} />
        <Route path="promo" element={<PromoScheduler />} />
        <Route path="promoscheduler" element={<PromoSchedulerWithNotification />} />
        <Route path="produk" element={<ProductPage />} />
        <Route path="penjadwalan" element={<Penjadwalan />} />
        <Route path="books/:id" element={<BookDetailPage />} />
        <Route path="accountmanagement" element={<AccountManagementPage />} />
        <Route path="ordermanagement" element={<OrderManagementPage />} />
        <Route path="kontak" element={<ContactManagement />} />
      </Route>
    </Routes>
  );
}

export default App;
