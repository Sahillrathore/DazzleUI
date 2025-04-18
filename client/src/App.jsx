import React from 'react'
import Homepage from './pages/Homepage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Elements from './pages/Elements'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import CreatePage from './pages/CreatePage'
import Login from './pages/Login'
import SidebarLayout from './components/SidebarLayout'
import Signup from './pages/Signup'

const App = () => {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/elements" element={<Elements />} /> */}
        {/* <Route path="/create" element={<ProtectedRoute><CreatePage /></ProtectedRoute>} /> */}
        <Route path="/signup" element={<Signup />} />

        {/* Routes with sidebar */}
        <Route element={<SidebarLayout />}>
          <Route path="/elements" element={<Elements />} />
          <Route path="/create" element={<ProtectedRoute><CreatePage /></ProtectedRoute>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App