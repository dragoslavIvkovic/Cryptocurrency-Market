import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Coins from './pages/Coins';
import Services from './pages/Services';
import Products from './pages/Products';
import SignUp from './pages/SignUp';
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
          <Route path='/products' component={Products} />
          <Route path='/sign-up' component={SignUp} />
        </Switch>
      </Router>
    </>
  )
}

export default App
