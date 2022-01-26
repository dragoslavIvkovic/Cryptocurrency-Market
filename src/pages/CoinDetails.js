import React, { useContext, useState, useEffect } from 'react'
import { StateContext } from '../context/GlobalState'
import { Link, useParams } from 'react-router-dom'
import '../_styles/CoinDetails.scss'
// import CoinProps from './CoinProps';
import { Line, Chart } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import coinGecko from '../api/coinGecko'
import StarBorderIcon from '@mui/icons-material/StarBorder'

import { borderRadius, Box } from '@mui/system'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Drawer,
  Grid,
  Paper,
  Divider,
  CardMedia,
  Typography,
  CardHeader,
  BorderLinearProgress,
  Tooltip,
  TableRow,
  IconButton,
  Stack
} from '@mui/material'
import axios from 'axios'

import {
  ArrowDropUp,
  ArrowDropDown,
  SentimentSatisfiedRounded,
  SentimentNeutralRounded,
  SentimentDissatisfiedRounded,
  Star,
  Info,
  InsertLink
} from '@mui/icons-material'

import { SingleCoin, HistoricalChart, CryptoNews } from '../api/coinGecko'
import { makeStyles } from '@material-ui/core/styles'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import StarBorder from '@mui/icons-material/StarBorder'
import { styled } from '@mui/material/styles'

const StackItem = styled(Stack)(({ theme }) => ({
  ...theme.typography.body2,
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'center'
}))
const StackColumn = styled(Stack)(({ theme }) => ({
  ...theme.typography.body2,
  justifyContent: 'space-between',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'white',
  marginTop: '2vh',
  margin: '1vw',
  borderRadius: '8px'
}))

const TypoChangeRed = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: 'white',
  backgroundColor: '#F40D30',
  borderRadius: '8px',
  padding: '5px 10px 5px 10px',
  whiteSpace: 'nowrap',
  fontWeight: '600'
}))

const TypoChangeGreen = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: 'white',
  backgroundColor: '#16C784',
  borderRadius: '8px',
  padding: '5px 10px 5px 10px',
  whiteSpace: 'nowrap',
  fontWeight: '600'
}))

const InfoIconGray = styled(Info)(({ theme }) => ({
  ...theme.typography.body2,
  fill: 'gray'
}))
const TypographyNormal = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
 fontWeight: '900', fontSize: '0.8vw', textTransform:'uppercase',marginBottom:"10px",
 alignItems: 'center'
}))
const DataBox = styled(Grid)(({ theme }) => ({
  ...theme.typography.body2,
  height:" 21vh",
  borderRadius: "8px",
  margin: "1vw",
  width: "19vw",
  // box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  backgroundColor: "white",
  padding:"1rem",
  m:"1rem"
}))
const Btn = styled(Button)(({ theme }) => ({
  ...theme.typography.body2,
    fontWeight: "bold",
  fontSize: "1em",
   ':hover': {
    color: "white",
    backgroundColor: 'red',
  },
  ":focus" : {
     color: "white",
    backgroundColor: 'red',
  }
  
}))



function CoinDetails () {

  const { coinId } = useParams()
  const { coins, watchlist, setWatchlist, user, setAlert } = useContext(
    StateContext
  )
  const [isLoading, setIsLoading] = useState(false)
  const [marketChart, setMarketChart] = useState({})
  const [dayAgo, setDaysAgo] = useState('24h')
  const [cryptData, setCryptData] = useState({})
  const [cryptoNews, setCryptNews] = useState({})
  // const [cryptoSymbol, setCryptoSymbol] = useState()

  const thisCoin = coins.filter(coin => coin.coinId === coinId)
  console.log('cryptData', cryptData)

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

  const getMarketChart = async () => {
    await axios
      .get(HistoricalChart(coinId, dayAgo))
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
      .get(SingleCoin(coinId))
      .then(res => {
        setCryptData(res.data)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getCryptoData()
  }, [])

  const getNews = async () => {
    await axios
      .get(CryptoNews(coinId))
      .then(res => {
        setCryptNews(res.data)
      })
      .catch(error => console.log(error))
  }
  useEffect(() => {
    getNews()
  }, [])

  let colorTrustScore = cryptData.tickers?.[0].trust_score

  const data = {
    labels: dayAgo === '24h' ? hoursLabels : datesLabel,

    datasets: [
      {
        label: `${coinId} price change in $`,

        data: marketChart,
        fill: true,
        backgroundColor: 'rgba(255,0,0,0.5)',
        borderColor: 'red',

        pointHoverRadius: 5
      }
    ]
  }

  const addToWatchlist = async cryptData => {
    const coinRef = doc(db, 'watchlist', user.uid)

    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, cryptData?.id] : [cryptData?.id] },
        { merge: true }
      )

      setAlert({
        open: true,
        message: `${cryptData.name} Added to the Watchlist !`,
        type: 'success'
      })
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error'
      })
    }
  }

  const removeFromWatchlist = async cryptData => {
    const coinRef = doc(db, 'watchlist', user.uid)
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter(wish => wish !== cryptData?.id) },
        { merge: true }
      )

      setAlert({
        open: true,
        message: `${cryptData.name} Removed from the Watchlist !`,
        type: 'success'
      })
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error'
      })
    }
  }

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
        <StackItem>
          <DataBox elevation={1} >
            <Stack direction='column'
              alignItems='center'
              sx={{ color: 'gray', justifyContent: 'space-between' }}
            >
              <StackItem >
                <TypographyNormal>
                  {cryptData.name}
                </TypographyNormal>
                <TypographyNormal mx={2}>Price</TypographyNormal>
                <TypographyNormal>
                  ({cryptData.symbol})
                </TypographyNormal>
              </StackItem>

              <StackItem mb={1}>
                {colorTrustScore === 'green' ? (
                  <SentimentSatisfiedRounded style={{ fill: 'green' }} />
                ) : colorTrustScore === 'yellow' ? (
                  <SentimentNeutralRounded style={{ fill: 'yellow' }} />
                ) : (
                  <SentimentDissatisfiedRounded style={{ fill: 'red' }} />
                )}
                <Typography>Trust score</Typography>
              </StackItem>
            </Stack>
            <StackItem mb={1}>
              <Typography
                sx={{ fontSize: '1.5vw', fontWeight: '700', mr: '0.5vw' }}
              >
                {cryptData?.market_data?.current_price?.usd.toLocaleString(
                  'en-US',
                  {
                    style: 'currency',
                    currency: 'USD'
                  }
                )}
              </Typography>
              <Typography>
                {cryptData.market_data?.price_change_24h < 0 ? (
                  <TypoChangeRed>
                    <ArrowDropDown sx={{ fill: 'white' }} />
                    {cryptData.market_data?.price_change_24h?.toFixed(2)}%
                  </TypoChangeRed>
                ) : (
                  <TypoChangeGreen>
                    <ArrowDropUp style={{ fill: 'white' }} />
                    {cryptData.market_data?.price_change_24h?.toFixed(2)}%
                  </TypoChangeGreen>
                )}
              </Typography>
            </StackItem>
            <StackItem>
              <Typography sx={{ color: 'red', fontWeight: '700' }}>
                Low:
                {cryptData.market_data?.low_24h?.usd.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD'
                })}
              </Typography>
              <Typography sx={{ color: 'green', fontWeight: '700' }}>
                High:
                {cryptData.market_data?.high_24h?.usd.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD'
                })}
              </Typography>
            </StackItem>
          </DataBox>

          <DataBox elevation={1} >
            <TypographyNormal align='center'>
              Converted value
            </TypographyNormal>
            <Box
              display='flex'
              flexDirection='column'
              align='center'
              sx={{ justifyContent: 'space-between' }}
            >
              <StackItem></StackItem>

              <StackItem>
                <TypographyNormal>
                  
                  {cryptData?.tickers?.[0]?.converted_last?.btc}
                </TypographyNormal>
                <Divider sx={{ width: '40%', display: 'inline' }}></Divider>
                <Typography
                  sx={{
                    fontWeight: '900',
                    fontSize: '1vw',
                    color: 'text.secondary'
                  }}
                >
                  BTC
                </Typography>
              </StackItem>
              <StackItem>
                <TypographyNormal>
                  
                  {cryptData?.tickers?.[0]?.converted_last?.eth}
                </TypographyNormal>
                <Divider sx={{ width: '40%', display: 'inline' }}></Divider>
                <Typography
                  sx={{
                    fontWeight: '900',
                    fontSize: '1vw',
                    color: 'text.secondary'
                  }}
                >
                  ETH
                </Typography>
              </StackItem>
              <StackItem>
                <TypographyNormal>
                  
                  {cryptData?.tickers?.[0]?.converted_last?.usd}
                </TypographyNormal>
                <Divider sx={{ width: '40%', display: 'inline' }}></Divider>
                <Typography
                  sx={{
                    fontWeight: '900',
                    fontSize: '1vw',
                    color: 'text.secondary'
                  }}
                >
                  USD
                </Typography>
              </StackItem>
            </Box>
          </DataBox>
          <DataBox elevation={1} >
            <StackItem>
              <Typography
                sx={{ fontWeight: '700', fontSize: '0.7vw', color: '#B8B8B8' }}
              >
                Market Cap:
                <Tooltip
                  title="The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market.

Market Cap = Current Price x Circulating Supply."
                >
                  <InfoIconGray />
                </Tooltip>
              </Typography>
              <Typography
                sx={{ fontWeight: '700', fontSize: '0.7vw', color: '#B8B8B8' }}
              >
                Fully Diluted Market Cap:
                <Tooltip
                  title='The market cap if the max supply was in circulation.
Fully-diluted market cap (FDMC) = price x max supply. If max supply is null, FDMC = price x total supply. if max supply and total supply are infinite or not available, fully-diluted market cap shows.'
                >
                  <InfoIconGray />
                </Tooltip>
              </Typography>
            </StackItem>
            <StackItem>
              <TypographyNormal>
                {cryptData.market_data?.market_cap?.usd.toLocaleString(
                  'en-US',
                  {
                    style: 'currency',
                    currency: 'USD'
                  }
                )}
              </TypographyNormal>
              <TypographyNormal>
                {cryptData.market_data?.fully_diluted_valuation?.usd?.toLocaleString(
                  'en-US',
                  {
                    style: 'currency',
                    currency: 'USD'
                  }
                )}
              </TypographyNormal>
            </StackItem>
            <StackItem>
              <Typography
                sx={{ fontWeight: '700', fontSize: '0.7vw', color: '#B8B8B8' }}
              >
                Volume:
                <Tooltip title='A measure of how much of a cryptocurrency was traded in the last 24 hours.'>
                  <InfoIconGray />
                </Tooltip>
              </Typography>
              <Typography
                sx={{ fontWeight: '700', fontSize: '0.7vw', color: '#B8B8B8' }}
              >
                Circulating Supply:
                <Tooltip title='The amount of coins that are circulating in the market and are in public hands. It is analogous to the flowing shares in the stock marke'>
                  <InfoIconGray />
                </Tooltip>
              </Typography>
            </StackItem>
            <StackItem>
              <StackItem>
                <TypographyNormal>
                  {cryptData.market_data?.total_volume?.usd.toLocaleString(
                    'en-US',
                    {
                      style: 'currency',
                      currency: 'USD'
                    }
                  )}
                </TypographyNormal>
               
              </StackItem>

              <TypographyNormal>
                {cryptData.market_data?.circulating_supply?.toLocaleString(
                  'en-US',
                  {
                    style: 'currency',
                    currency: 'USD'
                  }
                )}
              </TypographyNormal>
            </StackItem>
            <StackItem>
              <Typography
                sx={{ fontWeight: '700', fontSize: '0.7vw', color: '#B8B8B8' }}
              >
                Max Supply :
                <Tooltip
                  title="The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market.
Market Cap = Current Price x Circulating Supply."
                >
                  <InfoIconGray />
                </Tooltip>
              </Typography>
              <Typography
                sx={{ fontWeight: '700', fontSize: '0.7vw', color: '#B8B8B8' }}
              >
                Total Supply:
                <Tooltip
                  title='The amount of coins that have been already created, minus any coins that have been burned. It is analogous to the outstanding shares in the stock market.
If this data has not been submitted by the project or verified by the CMC team, total supply shows - -.'
                >
                  <InfoIconGray />
                </Tooltip>
              </Typography>
            </StackItem>
            <StackItem>
              <StackItem>
                <TypographyNormal>
                  {cryptData.market_data?.max_supply}
                </TypographyNormal>
              </StackItem>

              <TypographyNormal>
                {cryptData.market_data?.total_supply}
              </TypographyNormal>
            </StackItem>
          </DataBox>
        </StackItem>

        <StackItem>
          <Paper
            sx={{ backgroundColor: 'white' }}
            elevation={1}
            className='chart-box'
          >
            <Btn className='btn-days' onClick={e => setDaysAgo('24h')}>
              1D
            </Btn>
            <Btn className='btn-days' onClick={e => setDaysAgo(7)}>
              7D
            </Btn>
            <Btn className='btn-days' onClick={e => setDaysAgo(14)}>
              14D
            </Btn>
            <Btn onClick={e => setDaysAgo(30)}>1M</Btn>
            <Btn onClick={e => setDaysAgo(60)}>2M</Btn>
            <Btn onClick={e => setDaysAgo(90)}>3M</Btn>
            <Line data={data} className='chart-data' />
          </Paper>
        </StackItem>
      </Box>

      <StackColumn>
        <StackItem>
          <img
            sx={{ width: '1vw', margin: 'auto' }}
            src={cryptData?.image?.small}
            alt={coinId}
          />
          <Typography
            sx={{ fontWeight: '900', fontSize: '3vw', mx: '0.5vw' }}
            align='center'
          >
            {cryptData.name}
          </Typography>
          <Typography
            align='center'
            sx={{
              textTransform: 'uppercase',
              fontWeight: '500',
              fontSize: '1.2vw',
              mr: '0.5vw',
              backgroundColor: '#d3d3d3',
              borderRadius: '8px',
              padding: '2px',
              bottom: ' 0'
            }}
          >
            {cryptData.symbol}
          </Typography>

          {user &&
            (watchlist.indexOf(cryptData.id) === -1 ? (
              <Tooltip title='Add to Watchlist '>
                <IconButton>
                  <StarBorder onClick={() => addToWatchlist(cryptData)} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title='Remove from watchlist'>
                <IconButton>
                  <Star onClick={() => removeFromWatchlist(cryptData)} />
                </IconButton>
              </Tooltip>
            ))}
        </StackItem>
        <StackItem>
          <Typography
            align='center'
            sx={{
              fontSize: '1.2vw',
              fontWeight: '700',
              backgroundColor: '#d3d3d3',
              borderRadius: '8px',
              padding: '2px',
              mr: '1vw'
            }}
          >
            Rank:{cryptData.market_cap_rank}
          </Typography>
        </StackItem>

        <CardContent>
          {/* <Typography variant='body2' color='text.secondary'>
            `
            {cryptData?.description?.en
              .substring(0, 300).
             replace( /(<([^>]+)>)/ig, '')}
            `
          </Typography> */}
          <StackItem >
            <a
              href={cryptData?.links?.homepage[0]}
              target='_blank'
              rel='noreferrer noopener'
            >
              Read more on official {coinId} website - link <InsertLink />
            </a>
            <a
              href={cryptData.links?.official_forum_url}
              target='_blank'
              rel='noreferrer noopener'
            >
              Official {coinId} forum <InsertLink />
            </a>
          </StackItem>
        </CardContent>
        <Box sx={{ 
 
  borderRadius: '8px',
  padding: '5px 10px 5px 10px',
  whiteSpace: 'nowrap',
  fontWeight: '600', backgroundColor: '#3861FB', mb:"0.5vh"}}>
   <a
          href={cryptData.tickers?.[0]?.trade_url}
          align='center'
          target='_blank'
          rel='noreferrer noopener' 
         className="link-trade"
        >
          TRADE
        </a></Box>
       
      </StackColumn>

      <StackColumn>
        <Grid>
         
          {cryptoNews.articles?.slice(0,3).map(article => (
            <Grid mb={1}>
              <TypographyNormal
            
              >{article?.title}</TypographyNormal>
              <StackItem>
                
                <CardMedia
                  component='img'
                  height='40'
                  width='40'
                  image={article?.urlToImage}
                  alt='x'
                 
                />
             
                  {/* <Typography ml={2}>
                    {article?.description.substring(0, 200).
              replace( /(<([^>]+)>)/ig, '')}
                  </Typography> */}
              
              </StackItem>

            </Grid>
          ))}
        </Grid>
      </StackColumn>
    </Box>
  )
}

export default CoinDetails
