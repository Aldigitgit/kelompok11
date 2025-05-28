
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import MainLayout from "./Components/Mainlayout";
import SalesManagement from "./pages/SalesManagement.jsx";
import CustomerManagement from "./pages/CustomerManagement.jsx";
import RiwayatPembelian from "./pages/Riwayatpembelian.jsx";
import ReviewPage from "./pages/ReviewPage.jsx";





function App() {
  return (
    <Routes>
      <Route element={<MainLayout></MainLayout>}>
       <Route path="/penjualan" element={<SalesManagement></SalesManagement>}></Route>
          <Route path="pelanggan" element={<CustomerManagement></CustomerManagement>} />
          <Route path="/riwayat" element={<RiwayatPembelian />} />
          <Route path="/review" element={<ReviewPage />} />
      <Route path="/" element={<Dashboard></Dashboard>}></Route>
      
      
      </Route>
    </Routes>
  );
}

export default App;
