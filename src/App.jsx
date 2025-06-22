import { useState } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/common/Navbar'
import { useLocation } from 'react-router'

function App() {
  const location = useLocation()

  const isClientPreviewPage = location.pathname.startsWith("/preview/")

  return (
    <div className="w-screen min-h-screen">
      {!isClientPreviewPage && <Navbar />}
      <AppRoutes />
    </div>
  );
}

export default App
