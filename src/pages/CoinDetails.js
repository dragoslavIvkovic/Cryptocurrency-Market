import React, { useContext, useState, useEffect } from 'react'
import { StateContext } from '../context/GlobalState'
import { Link, useParams } from 'react-router-dom'
import '../_styles/CoinDetails.scss'
// import CoinProps from './CoinProps';
import { Line, Chart } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import coinGecko from '../api/coinGecko'

import { Box } from '@mui/system'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Drawer,
  Grid,
  Paper,
  Stack,CardMedia,
  Typography,CardHeader
} from '@mui/material'
import axios from 'axios'

function CoinDetails () {
  const { coinId } = useParams()
  const { coins } = useContext(StateContext)
  const [isLoading, setIsLoading] = useState(false)
  const [marketChart, setMarketChart] = useState({})
  const [dayAgo, setDaysAgo] = useState('24h');
  const [cryptData, setCryptData] = useState();
  

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

  let datesLabel = dates.reverse()

  let hours = [...Array(24)].map((_, i) => {
    const d = new Date()
    let hour = d.getHours() - i
    return hour < 0 ? 24 - Math.abs(hour) : hour
  })

  let hoursLabels = hours.reverse()

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


  const getCryptoData = async () => {
    await axios
    coinGecko
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinId}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`
      )
      .then(res => {
        setCryptData(res.data)
        console.log("xx" ,res.data)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getCryptoData()
  }, [])



  const data = {
    labels: dayAgo === '24h' ? hoursLabels : datesLabel,

    datasets: [
      {
        label: coinId,
        data: marketChart,
        fill: true,
        backgroundColor: 'transparent',
        borderColor: 'red',
        tension: 1,
        pointHoverRadius: 5
      }
    ]
  }
// console.log(cryptData)


  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          float: 'right',
          mr: '3vw'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row'
          }}
          className='data-container'
        >
          <Grid className='box-data' elevation={3}>
              {/* <Typography>{cryptData.tickers[1]}</Typography> */}
            
            
          </Grid>
          <Grid elevation={3} className='box-data'>
            <Typography>1</Typography>
          </Grid>
          <Grid elevation={3} className='box-data'>
            <Typography>1</Typography>
          </Grid>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Paper elevation={3} className='chart-box'>
            {' '}
            <Button className='btn-days' onClick={e => setDaysAgo('24h')}>
              1D
            </Button>
            <Button className='btn-days' onClick={e => setDaysAgo(7)}>
              7D
            </Button>
            <Button className='btn-days' onClick={e => setDaysAgo(14)}>
              14D
            </Button>
            <Button onClick={e => setDaysAgo(30)}>1M</Button>
            <Button onClick={e => setDaysAgo(60)}>2M</Button>
            <Button onClick={e => setDaysAgo(90)}>3M</Button>
            <Line data={data} className='chart-data' />
          </Paper>
        </Box>
      </Box>


      <Box  sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
         
        }}>
         <Card sx={{ width:"1/4", mx:"2vw",mt:"2vh",height:"90%" }}>
      <CardHeader
       
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
    
    </Card>
      </Box>
    </Box>
  )
}

export default CoinDetails
