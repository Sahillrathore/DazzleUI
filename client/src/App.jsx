import React, { useEffect, useState } from 'react'
import Homepage from './pages/Homepage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Elements from './pages/Elements'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import CreatePage from './pages/CreatePage'
import SidebarLayout from './components/SidebarLayout'
import Signup from './pages/Signup'
import axios from 'axios';

const App = () => {

  const [user,setUser] = useState();

  useEffect(() => {
    axios.get("http://localhost:5000/auth/user", {
      withCredentials: true,
    })
      .then(res => setUser(res.data.user))
      .catch((err) => console.log(err));

      
    }, []);
    
  return (
    <div>
      <Header user={user}/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />

        {/* Routes with sidebar */}
        <Route element={<SidebarLayout />}>
          <Route path="/elements" element={<Elements />} />
          <Route path="/create" element={<CreatePage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App