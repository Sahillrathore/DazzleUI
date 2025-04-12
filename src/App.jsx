import React from 'react'
import Homepage from './pages/Homepage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Elements from './pages/Elements'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import CreatePage from './pages/CreatePage'
import Login from './pages/Login'

const App = () => {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/elements" element={<Elements />} />
        <Route path="/create" element={<ProtectedRoute><CreatePage /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App