import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css' // <--- Here's the issue!
import App from './App.jsx'
import './index.css'; // <--- THIS IS THE MISSING LINE!  // <--- You have it here too!
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

    <App />
    </BrowserRouter>
  </StrictMode>,
)