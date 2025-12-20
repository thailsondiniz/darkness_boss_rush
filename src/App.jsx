import React from 'react'
import './App.css'
import Home from './Home.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Create_Boss from './components/Create_Boss.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} /> 
        <Route path='/create_boss' element={<Create_Boss />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
