import { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import injectContext, { Context } from './context/AppContext';
import ShowNavbar from './components/ShowNavbar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Private from './pages/Private';
import Login from './pages/Login'
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import PrivateRoute from './utils/PrivateRoute';
import './App.css'


function App() {

  return (
    <>
      <BrowserRouter>
        <ShowNavbar>
          <Navbar />
        </ShowNavbar>
        <Routes>
          <Route path="/signup" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/private" element={<PrivateRoute />}>
            <Route index element={<Private />} />
          </Route>

          <Route path="/home" element={<PrivateRoute />}>
            <Route index element={<Home />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default injectContext(App)
