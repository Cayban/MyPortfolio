import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import Portfolio from './portfolio'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Portfolio />
    </BrowserRouter>
  </StrictMode>
)