import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { CoinList } from '../api/coinGecko'
import { onSnapshot, doc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../firebase'

const StateContext = createContext()

function StateProvider ({ children }) {
  // state of coins and
  const [coins, setCoins] = useState([])
  const [user, setUser] = useState(null)
  const [watchlist, setWatchlist] = useState([])
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    type: 'success'
  })

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, 'watchlist', user?.uid)
      var unsubscribe = onSnapshot(coinRef, coin => {
        if (coin.exists()) {
          console.log(coin.data().coins)
          setWatchlist(coin.data().coins)
        } else {
          console.log('No Items in Watchlist')
        }
      })

      return () => {
        unsubscribe()
      }
    }
  }, [user])

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) setUser(user)
      else setUser(null)
    })
  }, [])

  console.log(watchlist)

  console.log('user', user)

  const getCoinData = async () => {
    await axios
      .get(CoinList())
      .then(res => {
        setCoins(res.data)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getCoinData()
  }, [])

  return (
    <StateContext.Provider
      value={{ coins, watchlist, setWatchlist, alert, setAlert, user }}
    >
      {children}
    </StateContext.Provider>
  )
}

export { StateContext, StateProvider }
