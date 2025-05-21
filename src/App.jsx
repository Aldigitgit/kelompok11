import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import MainLayout from "./Components/Mainlayout";
import CustomerManagement from "./pages/CustomerManagement.jsx";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout></MainLayout>}>
        <Route path="/" element={<Dashboard></Dashboard>}>
          <Route path="pelanggan" element={<CustomerManagement />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
