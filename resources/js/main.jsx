import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Prevent default scroll behavior for the 3D experience
document.documentElement.style.overflow = 'hidden';
document.body.style.overflow = 'hidden';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
