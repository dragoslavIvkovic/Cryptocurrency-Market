import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Coins from './pages/Coins';
import Services from './pages/Services';
import Watchlist from './pages/Watchlist';
import LoginSignup from './pages/LoginSignup';
import CoinDetails from './pages/CoinDetails';
import './_styles/App.scss';

function App () {
  return (
    <>
      <Router>
      <Navbar /> 
        <Switch>
          <Route path='/' exact component={Coins} />
           <Route path="/coin/:coinId">
            <CoinDetails />
          </Route>
          <Route path='/services' component={Services} />
          <Route path='/watchlist' component={Watchlist} />
          <Route path='/login-signup' component={LoginSignup} />
        </Switch>
      </Router>
    </>
  )
}

export default App
