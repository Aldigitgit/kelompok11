import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import MainLayout from "./Components/Mainlayout";
import CustomerManagement from "./pages/CustomerManagement.jsx";
import FaQManagement from "./pages/FaQManagement.jsx"; 
import TrackingManagement from "./pages/TrackingManagement.jsx";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="pelanggan" element={<CustomerManagement />} />
        <Route path="faq" element={<FaQManagement />} /> 
        <Route path="tracking" element={<TrackingManagement />} />
      </Route>
    </Routes>
  );
}

export default App;
