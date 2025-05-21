import {Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import MainLayout from './Components/Mainlayout'

function App() {


  return (
    <Routes>
      <Route element={<MainLayout></MainLayout>}>
      <Route path="/" element={<Dashboard></Dashboard>}></Route>
      </Route>
      
    </Routes>
  )
}

export default App
