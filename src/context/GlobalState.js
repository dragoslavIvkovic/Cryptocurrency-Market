import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CoinList } from '../api/coinGecko'

const StateContext = React.createContext()

function StateProvider ({ children }) {
  // state of coins and
  const [coins, setCoins] = useState([])

  // fetching product data

  // useEffect(() => {
  //   axios
  //     .get(
  //       'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d'
  //     )
  //     .then(res => {
  //       setCoins(res.data)
  //     })
  //     .catch(error => console.log(error))
  // }, [])

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

  // const getData = async () => {
  //   await axios
  //     .get(
  //       'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d'
  //     )
  //     .then(res => {
  //       setCoins(res.data)
  //     })
  //     .catch(error => console.log(error))
  // }

  // useEffect(() => {
  //   getData()
  // }, [])

  return (
    <StateContext.Provider value={{ coins }}>{children}</StateContext.Provider>
  )
}

export { StateContext, StateProvider }
