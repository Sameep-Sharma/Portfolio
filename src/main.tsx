import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import SeasonalBackground from './components/SeasonalBackground.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <SeasonalBackground />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
