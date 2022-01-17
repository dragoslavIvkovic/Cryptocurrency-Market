import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CoinList } from '../api/coinGecko'

const StateContext = React.createContext()

function StateProvider ({ children }) {
  // state of coins and
  const [coins, setCoins] = useState([]);
  const [watchlist,setWatchlist] = useState([ localStorage.getItem("watchList")])
  



   const  getCoinData = async () => {
     await axios.get(CoinList())
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
     getCoinData();
  }, []);


    useEffect(() => {
    localStorage.setItem("watchList", watchlist);
  }, [watchlist]);


  return (
    <StateContext.Provider value={{ coins,watchlist,setWatchlist }}>{children}</StateContext.Provider>
  )
}

export { StateContext, StateProvider }
