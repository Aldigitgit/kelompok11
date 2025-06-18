import { Routes, Route, Navigate } from "react-router-dom";

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

import ProdukDetail from './pages/ProdukDetail.jsx'; // Tambahkan ini
import Penjadwalan from './pages/Penjadwalan.jsx';
import AuthPage from './pages/AuthPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx'; // Tambahkan ini
import AccountManagementPage from './pages/AccountManagement.jsx';
import BookDetailPage from './pages/BookDetailPage.jsx';
import OrderManagementPage from './pages/OrderManagement.jsx';
import ContactManagement from './pages/ContactManagement.jsx';
import MarketSegmentation from './pages/MarketSegmentation.jsx';
import CampaignAnalytics from './pages/CampaignAnalytics.jsx';
import ContentManagement from './pages/ContentManagement.jsx';
import IntegrasiStock from './pages/IntegrasiStock.jsx';
import HomePage from './pages/Home.jsx';
import ShopPage from './pages/ShopPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import CartPage from './pages/CartPage.jsx';

import MainLayout from './Components/Mainlayout.jsx';
import Produk from "./pages/ProductPage.jsx";

function App() {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

  return (
    <Routes>
      {/* Halaman Publik */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Jika sudah login, redirect login/register/auth ke dashboard */}
      {isAuthenticated && (
        <>
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<Navigate to="/" replace />} />
          <Route path="/auth" element={<Navigate to="/" replace />} />
        </>
      )}

      {/* Halaman yang membutuhkan autentikasi */}
      <Route
        path="/"
        element={
          isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="penjualan" element={<SalesManagement />} />
        <Route path="pelanggan" element={<CustomerManagement />} />
        <Route path="riwayat" element={<RiwayatPembelian />} />
        <Route path="review" element={<ReviewPage />} />
        <Route path="faq" element={<FaQManagement />} />
        <Route path="tracking" element={<TrackingManagement />} />
        <Route path="promo" element={<PromoScheduler />} />
        <Route path="promoscheduler" element={<PromoSchedulerWithNotification />} />
        <Route path="produk" element={<Produk></Produk>} />
        <Route path="produk/:id" element={<ProdukDetail />} />
        <Route path="penjadwalan" element={<Penjadwalan />} />
        <Route path="books/:id" element={<BookDetailPage />} />
        <Route path="accountmanagement" element={<AccountManagementPage />} />
        <Route path="ordermanagement" element={<OrderManagementPage />} />
        <Route path="kontak" element={<ContactManagement />} />
        <Route path="market-segmentation" element={<MarketSegmentation />} />
        <Route path="content-management" element={<ContentManagement />} />
        <Route path="campaign-analytics" element={<CampaignAnalytics />} />
        <Route path="integrasi-stok" element={<IntegrasiStock />} />
      </Route>

      {/* Catch all: redirect ke login jika route tidak dikenali */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
