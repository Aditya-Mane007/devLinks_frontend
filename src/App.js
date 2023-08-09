import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from './Pages/Login'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify"
import Register from './Pages/Register'
import Home from './Pages/Home'
import Links from './Pages/Links'
import Profile from './Pages/Profile'
import Preview from './Pages/Preview'
import SharPage from './Pages/SharPage'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/:username/links" element={<Links />} />
          <Route path="/:username/profile" element={<Profile />} />
          <Route path='/:username/preview' element={<Preview />} />
          <Route path='/:username' element={<SharPage />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right"
        autoClose={1100}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
    </>
  )
}

export default App