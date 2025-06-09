import { useState } from 'react'
import './App.css'
import AppRoutes from './routes/appRoutes'
import Navbar from './components/common/Navbar'

function App() {

  return (
    <div className='w-screen min-h-screen'>
      <Navbar/>
      <AppRoutes/>
    </div>
  )
}

export default App
