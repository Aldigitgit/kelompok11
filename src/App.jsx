import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages Umum
import HomePage from './pages/Home.jsx';
import ShopPage from './pages/ShopPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import CartPage from './pages/CartPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import LoginPage from './pages/Loginpage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

// Layout dan Komponen
import MainLayout from './Components/Mainlayout.jsx';

// Pages Admin
import Dashboard from './pages/Dashboard.jsx';
import SalesManagement from './pages/SalesManagement.jsx';
import CustomerManagement from './pages/CustomerManagement.jsx';
import RiwayatPembelian from './pages/Riwayatpembelian.jsx';
import ReviewPage from './pages/ReviewPage.jsx';
import FaQManagement from './pages/FaQManagement.jsx';
import TrackingManagement from './pages/TrackingManagement.jsx';
import PromoScheduler from './pages/PenjadwalPromo.jsx';
import PromoSchedulerWithNotification from './pages/PromoScheduler.jsx';
import Produk from "./pages/ProductPage.jsx";
import ProdukDetail from './pages/ProdukDetail.jsx';
import Penjadwalan from './pages/Penjadwalan.jsx';
import BookDetailPage from './pages/BookDetailPage.jsx';
import AccountManagementPage from './pages/AccountManagement.jsx';
import OrderManagementPage from './pages/OrderManagement.jsx';
import ContactManagement from './pages/ContactManagement.jsx';
import MarketSegmentation from './pages/MarketSegmentation.jsx';
import CampaignAnalytics from './pages/CampaignAnalytics.jsx';
import ContentManagement from './pages/ContentManagement.jsx';
import IntegrasiStock from './pages/IntegrasiStock.jsx';
import About from "./pages/About.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import Terms from "./pages/Terms.jsx";
import Blog from "./pages/Blog.jsx";
import Events from "./pages/Event.jsx";
import Forum from "./pages/Forum.jsx";
import HelpCenter from "./pages/HelpCenter.jsx";
import LiveChat from "./pages/LiveChat.jsx";

function App() {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const isAuthenticated = role === "admin" || role === "user";

  // Dengarkan event perubahan role
  useEffect(() => {
    const updateRole = () => {
      setRole(localStorage.getItem("role"));
    };

    // Custom Event listener untuk roleChanged
    window.addEventListener("roleChanged", updateRole);

    // Optional: jalankan sekali saat pertama render
    updateRole();

    return () => {
      window.removeEventListener("roleChanged", updateRole);
    };
  }, []);

  return (
    <Routes>
      {/* ---------------- PUBLIC PAGES ---------------- */}
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/events" element={<Events />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/help-center" element={<HelpCenter />} />
      <Route path="/live-chat" element={<LiveChat />} />

      {/* ------------- REDIRECT SETELAH LOGIN ------------- */}
      {isAuthenticated && (
        <>
          <Route path="/login" element={<Navigate to={role === "admin" ? "/dashboard" : "/"} replace />} />
          <Route path="/register" element={<Navigate to={role === "admin" ? "/dashboard" : "/"} replace />} />
          <Route path="/auth" element={<Navigate to={role === "admin" ? "/dashboard" : "/"} replace />} />
        </>
      )}

      {/* ---------------- ADMIN DASHBOARD ---------------- */}
      {role === "admin" && (
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="penjualan" element={<SalesManagement />} />
          <Route path="pelanggan" element={<CustomerManagement />} />
          <Route path="riwayat" element={<RiwayatPembelian />} />
          <Route path="review" element={<ReviewPage />} />
          <Route path="faq" element={<FaQManagement />} />
          <Route path="tracking" element={<TrackingManagement />} />
          <Route path="promo" element={<PromoScheduler />} />
          <Route path="promoscheduler" element={<PromoSchedulerWithNotification />} />
          <Route path="produk" element={<Produk />} />
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
      )}

      {/* ---------------- CATCH ALL ROUTE ---------------- */}
      <Route
        path="*"
        element={
          <Navigate
            to={
              isAuthenticated
                ? role === "admin"
                  ? "/dashboard"
                  : "/"
                : "/login"
            }
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;
