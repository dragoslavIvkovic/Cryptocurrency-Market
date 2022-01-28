import React, { useContext, useEffect, useState } from 'react'

import { StateContext } from '../context/GlobalState'
import '../_styles/Coin.scss'
import { Link } from 'react-router-dom'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Image,
  Typography,
  Box,
  Grid,
  TextField,
  Container,
  Stack,
  FormControl,
  Button,
  Tooltip,
  InputAdornment,
  InputBase,
  IconButton
} from '@mui/material'
import {
  StarBorder,
  Info,
  ArrowDropUp,
  ArrowDropDown,
  Search,
  Star
} from '@mui/icons-material'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { styled } from '@mui/material/styles'

const InfoIconGray = styled(Info)(({ theme }) => ({
  ...theme.typography.body2,
  fill: '#3861FB'
}))

function Coins () {
  const [search, setSearch] = useState('')
  const { coins, watchlist, setWatchlist, user, setAlert } = useContext(
    StateContext
  )

  const filteredCoins = coins.filter(
    coin =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase()) ||
      coin.id.toLowerCase().includes(search.toLowerCase())
  )

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const addToWatchlist = async row => {
    const coinRef = doc(db, 'watchlist', user.uid)

    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, row?.id] : [row?.id] },
        { merge: true }
      )

      setAlert({
        open: true,
        message: `${row.name} Added to the Watchlist !`,
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

  const removeFromWatchlist = async row => {
    const coinRef = doc(db, 'watchlist', user.uid)
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter(wish => wish !== row?.id) },
        { merge: true }
      )

      setAlert({
        open: true,
        message: `${row.name} Removed from the Watchlist !`,
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
    
    <Container sx={{ width: '80vw', marginTop: '5rem' }} className=''>
      <Grid align='center' mb={2}>
        <FormControl>
          <Typography className='coin-text'>Search a currency</Typography>

          <Paper
            elevation={3}
            component='form'
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 400
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder='Search'
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleChange}
              className='coin-search'
            />
            <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
              <Search />
            </IconButton>
          </Paper>
        </FormControl>
      </Grid>

      <TableContainer elevation={3} component={Paper}>
        <Table stickyHeader aria-label='sticky table' >
          <TableHead >
            <TableRow>
              <TableCell>
                <Tooltip title='Login to add watchlist'>
                  <StarBorder sx={{fill:"#3861FB", ml: '10px' }} />
                </Tooltip>
              </TableCell>
              <TableCell align='left'>Name</TableCell>
              <TableCell align='left'>Price</TableCell>
              <TableCell align='left'>24h %</TableCell>
              <TableCell align='left' sx={{ whiteSpace: 'nowrap' }}>
                Total Volume
                <Tooltip title='A measure of how much of a cryptocurrency was traded in the last 24 hours.'>
                  <InfoIconGray />
                </Tooltip>
              </TableCell>
              <TableCell align='left' sx={{ whiteSpace: 'nowrap' }}>
                Market Cap
                <Tooltip
                  title="The total market value of a cryptocurrency's circulating supply.
                   It is analogous to the free-float capitalization in the stock market.
                   Market Cap = Current Price x Circulating Supply."
                >
                  <InfoIconGray />
                </Tooltip>
              </TableCell>
              <TableCell align='left'>
                Circulating Supply
                <Tooltip title='The amount of coins that are circulating in the market and are in public hands. It is analogous to the flowing shares in the stock market.'>
                  <InfoIconGray />
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCoins.map(row => (
              <TableRow
                className='table-row'
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='left' component='th' scope='row'>
                  {user &&
                    (watchlist.indexOf(row.id) === -1 ? (
                      <Tooltip title='Add to Watchlist '>
                        <IconButton>
                          <StarBorder sx={{fill:"#3861FB"}} onClick={() => addToWatchlist(row)} />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title='Remove from watchlist'>
                        <IconButton>
                          <Star onClick={() => removeFromWatchlist(row)} sx={{fill:"#3861FB"}} />
                        </IconButton>
                      </Tooltip>
                    ))}
                </TableCell>
                <TableCell
                  component='th'
                  scope='row'
                  justifyContent='center'
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <img
                    src={row.image}
                    alt='alt'
                    style={{
                      width: '50px',
                      height: '50px'
                    }}
                  />
                  <Typography mx={1} className='coin_name'>
                    {row.name}
                  </Typography>
                  <Typography className='coin_symbol'>{row.symbol}</Typography>
                  <Link mx={1} className='link__details' to={`/coin/${row.id}`}>
                    <Button className='btn-buy__coin'>Buy</Button>
                  </Link>
                </TableCell>
                <TableCell align='left'>
                  <Typography
                    className='coin_price'
                    style={{ fontWeight: 700 }}
                  >
                    {row.current_price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    })}
                  </Typography>
                </TableCell>
                <TableCell align='left'>
                  {row.price_change_24h < 0 ? (
                    <Typography
                      style={{
                        color: 'white',
                        backgroundColor: '#F40D30',
                        borderRadius: '8px',
                        padding: '5px 10px 5px 10px',
                        whiteSpace: 'nowrap',
                        fontWeight: '600'
                      }}
                    >
                      <ArrowDropDown sx={{ fill: 'white' }} />
                      {row.price_change_24h?.toFixed(2)}%
                    </Typography>
                  ) : (
                    <Typography
                      style={{
                        color: 'white',
                        backgroundColor: '#16C784',
                        borderRadius: '8px',
                        padding: '5px 10px 5px 10px',
                        whiteSpace: 'nowrap',
                        fontWeight: '600'
                      }}
                    >
                      <ArrowDropUp style={{ fill: 'white' }} />
                      {row.price_change_24h?.toFixed(2)}%
                    </Typography>
                  )}
                </TableCell>
              
                <TableCell align='left'>
                  <Typography sx={{ fontWeight: '600' }}>
                    {row.total_volume}
                  </Typography>{' '}
                </TableCell>
                  <TableCell align='left'>
                  <Typography sx={{ fontWeight: '600',color:"#F40D30" }}>
                    {row.market_cap}
                  </Typography>{' '}
                </TableCell>
                <TableCell align='left' className='circulating_supply'>
                  <Typography
                    style={{ fontWeight: 600, marginRight: '10px' }}
                    className='coin-circulating_supply'
                  >
                    {row.circulating_supply}
                  </Typography>

                  <Typography
                    style={{ fontWeight: 600 }}
                    className='coin-symbol'
                  >
                    {row.symbol}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Coins
