
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import MainLayout from "./Components/Mainlayout";
import SalesManagement from "./pages/SalesManagement.jsx";
import CustomerManagement from "./pages/CustomerManagement.jsx";
import PromoScheduler from "./pages/PenjadwalPromo.jsx";
import PromoSchedulerWithNotification from "./pages/PromoScheduler.jsx";
import ProductPage from "./pages/Produk.jsx";
import AuthPage from "./pages/AuthPage.jsx";





function App() {
  return (
    <Routes>
      <Route element={<MainLayout></MainLayout>}>
       <Route path="/penjualan" element={<SalesManagement></SalesManagement>}></Route>
          <Route path="/pelanggan" element={<CustomerManagement></CustomerManagement>} />
      <Route path="/" element={<Dashboard></Dashboard>}></Route>
      <Route path="/Promo" element={<PromoScheduler></PromoScheduler>}></Route>
      <Route path="/PromoScheduler" element={<PromoSchedulerWithNotification></PromoSchedulerWithNotification>}></Route>
      <Route path="/Produk" element={<ProductPage></ProductPage>}></Route>
      <Route path="/Auth" element={<AuthPage></AuthPage>}></Route>
      
      </Route>
    </Routes>
  );
}

export default App;
