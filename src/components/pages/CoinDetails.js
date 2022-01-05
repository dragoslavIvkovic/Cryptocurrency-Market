import React, { useContext } from 'react'
import { StateContext } from '../../context/GlobalState'
import { Link, useParams } from 'react-router-dom'
import '../../_styles/CoinDetails.scss'
// import CoinProps from './CoinProps';
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { Box } from '@mui/system'
import { Grid } from '@mui/material'

function CoinDetails ({sparkline_in_7d}) {
  const { coinId } = useParams()
  const { coins } = useContext(StateContext)
  const thisCoin = coins.filter(coin => coin.id === coinId)

  let label = thisCoin.map(names => {
    return names.name
  })


  let dates = [...Array(7)].map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    return d.toLocaleString().split('.')[0]
  })
  let labels = dates.reverse()


  let dataMap = thisCoin.map(x => {
    return x.sparkline_in_7d.price
  })



  
  console.log(dataMap)
  console.log(typeof dataMap)


  const data = {
    labels,
    datasets: [
      {
        label,
        data: dataMap,
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)'
      }
    ]
  }

  return (
    <Box style={{ textAlign: 'center' }} sx={{ width: '50vw' }}>
      <Grid>
        <div>
          <Line data={data} />
        </div>
        {/* {thisCoin.map(coin => {
          return (
            <ul className="coin__details--container">
              <div
              key={coin.id}
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
        <Link to='/'>
          <button className='view-detail-btn'>beck</button>
        </Link>
      </Grid>
    </Box>
  )
}

export default CoinDetails
