import React, { useContext, useState, useEffect } from 'react'
import { StateContext } from '../context/GlobalState'
import { Link, useParams } from 'react-router-dom'
import '../_styles/CoinDetails.scss'
// import CoinProps from './CoinProps';
import { Line, Chart } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import coinGecko from '../api/coinGecko'

import { Box } from '@mui/system'
import { Button, Grid } from '@mui/material'
import axios from 'axios'

function CoinDetails () {
  const { coinId } = useParams()
  const { coins } = useContext(StateContext)
  const [isLoading, setIsLoading] = useState(false)
  const [marketChart, setMarketChart] = useState({})
  const [dayAgo, setDaysAgo] = useState('24h');
  // const [labelsOptions, setLabelsOptions] = useState(7)
  const thisCoin = coins.filter(coin => coin.coinId === coinId)

  // let label = thisCoin.map(names => {
  //   return names.name
  // })

  let dates = [...Array(dayAgo)].map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    return d.toDateString()
  })

  let datesLabel = dates.reverse();


  let hours = [...Array(24)].map((_, i) => {
  const d = new Date();
  let hour = d.getHours() - i;
  return hour < 0 ? 24 - Math.abs(hour) : hour;
})

let hoursLabels = hours.reverse();

  // let dates = [...Array(dayAgo)].map((_, i) => {
  //   const d = new Date()
  //   d.setDate(d.getDate() - i)
  //   return d.toLocaleString().split('.')[0]
  // })
  // let labels = dates.reverse()

  // let dataMap = marketChart.map(x => {
  //   return x.prices
  // })

  // const arr = Object.values(dataMap);

  // console.log(dataMap)
  // console.log(typeof dataMap)

  const getMarketChart = async () => {
    await axios
    coinGecko
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${dayAgo}&interval=daily`
      )
      .then(res => {
        setMarketChart(res.data.prices)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getMarketChart()
  }, [dayAgo])

  const data = {
    labels: dayAgo === "24h" ? hoursLabels : datesLabel ,

    datasets: [
      {
        label: coinId,
        data: marketChart,
        fill: true,
        backgroundColor: 'orange',
        borderColor: 'red',
        tension: 0.1
      }
    ]
  }

  console.log(dayAgo)
  console.log(dayAgo)

  return (
    <Grid className='chart-container'>
      <Grid>
        {' '}
        <Button onClick={e => setDaysAgo("24h")}>1D</Button>
        <Button onClick={e => setDaysAgo(7)}>7D</Button>
        <Button onClick={e => setDaysAgo(14)}>14D</Button>
        <Button onClick={e => setDaysAgo(30)}>1M</Button>
        <Button onClick={e => setDaysAgo(60)}>2M</Button>
        <Button onClick={e => setDaysAgo(90)}>3M</Button>
        
        <Line data={data} />
      </Grid>

      {/* {thisCoin.map(coin => {
          return (
            <ul className="coin__details--container">
              <div
              key={coin.coinId}
              // image={coin.image}
              name={coin.name}
            //   current_price={coin.current_price}
            //   symbol={coin.symbol}
            //  price_change_24h={coin.price_change_percentage_24h}
            //  sparkline_in_7d={coin.sparkline_in_7d.price}
         
            />   
           
             </ul>
          )
        })} */}
    </Grid>
  )
}

export default CoinDetails
