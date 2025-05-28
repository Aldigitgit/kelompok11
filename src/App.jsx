
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import MainLayout from "./Components/Mainlayout";
import SalesManagement from "./pages/SalesManagement.jsx";
import CustomerManagement from "./pages/CustomerManagement.jsx";
import RiwayatPembelian from "./pages/Riwayatpembelian.jsx";
import ReviewPage from "./pages/ReviewPage.jsx";




import FaQManagement from "./pages/FaQManagement.jsx"; 
import TrackingManagement from "./pages/TrackingManagement.jsx";
import PromoScheduler from "./pages/PenjadwalPromo.jsx";
import PromoSchedulerWithNotification from "./pages/PromoScheduler.jsx";
import ProductPage from "./pages/Produk.jsx";
import {Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import MainLayout from './Components/Mainlayout'
import SalesManagement from './pages/SalesManagement.jsx'
import Penjadwalan from './pages/Penjadwalan.jsx'
import IntegrasiStok from './pages/IntegrasiStok.jsx'

function App() {
  return (
    <Routes>
       <Route path="/penjualan" element={<SalesManagement></SalesManagement>}></Route>
          <Route path="pelanggan" element={<CustomerManagement></CustomerManagement>} />
          <Route path="/riwayat" element={<RiwayatPembelian />} />
          <Route path="/review" element={<ReviewPage />} />
      <Route path="/" element={<Dashboard></Dashboard>}></Route>
      <Route path="/Promo" element={<PromoScheduler></PromoScheduler>}></Route>
      <Route path="/PromoScheduler" element={<PromoSchedulerWithNotification></PromoSchedulerWithNotification>}></Route>
      <Route path="/Produk" element={<ProductPage></ProductPage>}></Route>
      <Route path="/Auth" element={<AuthPage></AuthPage>}></Route>
      <Route path="/penjualan" element={<SalesManagement></SalesManagement>}></Route>
      <Route path="/penjadwalan" element={<Penjadwalan></Penjadwalan>}></Route>
      <Route path="/integrasi-stok" element={<IntegrasiStok />} />
        <Route index element={<Dashboard />} />
        <Route path="pelanggan" element={<CustomerManagement />} />
        <Route path="faq" element={<FaQManagement />} /> 
        <Route path="tracking" element={<TrackingManagement />} />
   
      
    </Routes>
  );
}

export default App;
