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
import IntegrasiStok from './pages/IntegrasiStok.jsx';
import AuthPage from './pages/AuthPage.jsx';
import ContactManagement from './pages/ContactManagement.jsx';


function App() {
  return (
    <Routes>
      {/* Halaman Auth/login tidak memakai layout */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Halaman lain memakai MainLayout */}
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
        <Route path="integrasi-stok" element={<IntegrasiStok />} />
        <Route path="kontak" element={<ContactManagement />} /> {/* ✅ Tambahkan ini */}
      </Route>
    </Routes>
  );
}

export default App;
