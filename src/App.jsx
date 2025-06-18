// App.jsx
import { Routes, Route } from 'react-router-dom';


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

import RegisterPage from './pages/RegisterPage.jsx';
import OrderManagementPage from './pages/OrderManagement.jsx';
import ContactManagement from './pages/ContactManagement.jsx';
import MainLayout from './Components/Mainlayout.jsx';
import MarketSegmentation from './pages/MarketSegmentation.jsx';
import CampaignAnalytics from './pages/CampaignAnalytics.jsx';
import ContentManagement from './pages/ContentManagement.jsx';
import HomePage from './pages/Home.jsx';
import ShopPage from './pages/ShopPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import CartPage from './pages/CartPage.jsx';



function App() {
  return (
    <Routes>
      {/* user */}
       <Route path="/home" element={<HomePage></HomePage>} />
       <Route path="/Shop" element={<ShopPage></ShopPage>} />
       <Route path="/Contact" element={<ContactPage></ContactPage>} />
        <Route path="/Cart" element={<CartPage></CartPage>} />
      {/* Halaman di luar layout utama */}
      <Route path="/auth" element={<AuthPage />} />
      {/* <Route path="/login" element={} /> */}
      <Route path="/register" element={<RegisterPage />} />

      {/* Halaman dengan layout utama */}
      <Route path="/" element={<MainLayout></MainLayout>}>
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

        <Route path="MarketSegmentation" element={<MarketSegmentation></MarketSegmentation>} />
        <Route path="ContentManagement" element={<ContentManagement></ContentManagement>} />
        <Route path="CampaignAnalytics" element={<CampaignAnalytics></CampaignAnalytics>} />
       
        {/* <Route path="MarketSEgementation" element={} /> */}
      </Route>
    </Routes>
  );
}

export default App;
