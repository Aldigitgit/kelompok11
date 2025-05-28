import {Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import MainLayout from './Components/Mainlayout'
import SalesManagement from './pages/SalesManagement.jsx'
import Penjadwalan from './pages/Penjadwalan.jsx'
import IntegrasiStok from './pages/IntegrasiStok.jsx'

function App() {


  return (
    <Routes>
      <Route element={<MainLayout></MainLayout>}>
      <Route path="/" element={<Dashboard></Dashboard>}></Route>
      <Route path="/penjualan" element={<SalesManagement></SalesManagement>}></Route>
      <Route path="/penjadwalan" element={<Penjadwalan></Penjadwalan>}></Route>
      <Route path="/integrasi-stok" element={<IntegrasiStok />} />
      </Route>
      
    </Routes>
  )
}

export default App
