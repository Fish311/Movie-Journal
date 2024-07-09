import React, { useState, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import './App.css'
import { UserContext } from './context/UserProvider'
import Auth from './components/Auth'
import Public from './components/Public'
import Profile from './components/Profile'
import Watchlist from './components/Watchlist'

function App() {
  const { token, logout } = useContext(UserContext)

  return (
    <>
      <Router>
        {token &&
          <nav>
            <Link className="nav-text" to="/profile">
              Profile
            </Link>
            <Link className="nav-text" to="/public">
              Public
            </Link>
            <Link className="nav-text" to="/watchlist">
              Watchlist
            </Link>
            <button onClick={logout}>Logout</button>
          </nav>
        }
        <Routes>
          <Route path="/" element={token ? <Navigate to="/profile" /> : <Auth />} />
          <Route path="/profile" element={!token ? <Navigate to="/" /> : <Profile />} />
          <Route path="/public" element={!token ? <Navigate to="/" /> : <Public />} />
          <Route path="/watchlist" element={!token ? <Navigate to="/" /> : <Watchlist />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
