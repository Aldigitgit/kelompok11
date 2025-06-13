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
<<<<<<< HEAD
import AuthPage from './pages/AuthPage.jsx'; // untuk login page
import AccountManagementPage from './pages/AccountManagement.jsx';
import BookDetailPage from './pages/BookDetailPage.jsx';
import LoginPage from './pages/Loginpage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import OrderManagementPage from './pages/OrderManagement.jsx';
=======
import AuthPage from './pages/AuthPage.jsx';
import ContactManagement from './pages/ContactManagement.jsx';

>>>>>>> 4e26b124f740a9297d0af6904124bcf2c2c49ff3

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
<<<<<<< HEAD
        <Route path="/books/:id" element={<BookDetailPage></BookDetailPage>} />
        <Route path="/AccountManagement" element={<AccountManagementPage></AccountManagementPage>} />
        <Route path="/OrderManagement" element={<OrderManagementPage></OrderManagementPage>} />
        <Route path="/login" element={<LoginPage></LoginPage>} />
        <Route path="/register" element={<RegisterPage></RegisterPage>} />
=======
        <Route path="kontak" element={<ContactManagement />} /> {/* ✅ Tambahkan ini */}
>>>>>>> 4e26b124f740a9297d0af6904124bcf2c2c49ff3
      </Route>
    </Routes>
  );
}

export default App;
