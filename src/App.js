import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Coins from './pages/Coins';
import Services from './pages/Services';
import Watchlist from './pages/Watchlist';

import CoinDetails from './pages/CoinDetails';
import './_styles/App.scss';



function App () {

 
 

  return (
    <>
    
      <Navbar /> 
        <Routes>
          <Route path='/'  element={<Coins/>} />
           <Route path="/coin/:coinId" element={<CoinDetails />}/>
        
          <Route path='/services' element={<Services/>} />
          <Route path='/watchlist' element={<Watchlist/>} />
         
        </Routes>
     
    </>
  )
}

export default App
