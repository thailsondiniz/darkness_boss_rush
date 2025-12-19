import React from 'react'
import './App.css'
import Home from './Home.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} /> 
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
