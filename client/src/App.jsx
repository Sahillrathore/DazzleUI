import React, { useEffect, useState } from 'react'
import Homepage from './pages/Homepage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Elements from './pages/Elements'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import CreatePage from './pages/CreatePage'
import SidebarLayout from './components/SidebarLayout'
import Signup from './pages/Signup'
import ProfilePage from './pages/ProfilePage'
import ParticularElements from './pages/ParticularElements'
import ToastNotification from './components/ToastNotification'
import { useAuth } from './context/authContext'

const App = () => {

  const {notification} = useAuth();

  return (
    <div>
      <Header />
      {
        notification &&
        <ToastNotification />
      }
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />

        {/* Routes with sidebar */}
        <Route element={<SidebarLayout />}>
          <Route path="/elements" element={<Elements />} />
          <Route path="/elements/:type " element={<ParticularElements />} />
          <Route path="/create" element={<ProtectedRoute><CreatePage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App