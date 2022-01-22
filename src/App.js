import { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Coins from './pages/Coins'

import Watchlist from './pages/Watchlist'

import CoinDetails from './pages/CoinDetails'
import './_styles/App.scss'
import Alert from './components/Auth/Alert'

function App () {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Coins />} />
        <Route path='/coin/:coinId' element={<CoinDetails />} />

        <Route path='/watchlist' element={<Watchlist />} />
      </Routes>
      <Alert />
    </>
  )
}

export default App
